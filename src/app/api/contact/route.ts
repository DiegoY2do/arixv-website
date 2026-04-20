import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Sanitización básica para evitar inyección XSS en el correo
const sanitizeHTML = (text: string) => {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};


const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW_MS = 60000; 
const MAX_REQUESTS_PER_WINDOW = 3; 

const checkRateLimit = (ip: string) => {
  const now = Date.now();
  const windowData = rateLimitMap.get(ip);

  if (!windowData) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (now - windowData.lastReset > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (windowData.count >= MAX_REQUESTS_PER_WINDOW) {
    return false; 
  }

  windowData.count += 1;
  return true;
};

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'ip-desconocida';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Por favor, intenta de nuevo en un minuto.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, service, message, privacyAccepted } = body;

    if (!name || name.trim().length < 2 || name.length > 100) {
      return NextResponse.json({ error: 'Nombre inválido.' }, { status: 400 });
    }
    if (!email || !isValidEmail(email) || email.length > 100) {
      return NextResponse.json({ error: 'Correo electrónico inválido.' }, { status: 400 });
    }
    if (!message || message.trim().length < 10 || message.length > 2000) {
      return NextResponse.json({ error: 'El mensaje debe tener entre 10 y 2000 caracteres.' }, { status: 400 });
    }
    if (privacyAccepted !== true) {
      return NextResponse.json({ error: 'Debes aceptar la política de privacidad.' }, { status: 400 });
    }

    const safeName = sanitizeHTML(name.trim());
    const safeEmail = sanitizeHTML(email.trim());
    const safeService = service ? sanitizeHTML(service.trim()) : 'No especificado';
    const safeMessage = sanitizeHTML(message.trim());

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("FALTAN VARIABLES DE ENTORNO SMTP");
      return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true, 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"ARIXV Web" <${process.env.SMTP_USER}>`, 
      to: 'contacto@arixv.com.mx', 
      replyTo: safeEmail, 
      subject: `Nuevo Lead ARIXV: ${safeService} - ${safeName}`,
      html: `
        <div style="font-family: 'Space Grotesk', sans-serif; color: #05080a; padding: 30px; background-color: #f4f4f5; max-width: 600px; margin: 0 auto; border: 1px solid #e4e4e7;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #E11D48; margin: 0; font-size: 24px; letter-spacing: 2px;">NUEVO LEAD // ARIXV</h1>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #E11D48; margin-bottom: 20px;">
            <p style="margin: 0 0 10px 0;"><strong>Nombre:</strong> ${safeName}</p>
            <p style="margin: 0 0 10px 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: #E11D48;">${safeEmail}</a></p>
            <p style="margin: 0;"><strong>Servicio de interés:</strong> ${safeService}</p>
          </div>

          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e4e4e7;">
            <h3 style="color: #05080a; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-top: 0;">Mensaje del cliente:</h3>
            <p style="white-space: pre-wrap; margin: 0; color: #3f3f46; line-height: 1.6;">${safeMessage}</p>
          </div>
          
          <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #71717a;">
            <p>Este correo fue enviado desde el formulario de contacto de arixv.com.mx</p>
            <p>Política de privacidad aceptada: Sí</p>
            <p>IP Registrada: ${ip}</p>
          </div>
        </div>
      `,
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Correo enviado correctamente' });
    
  } catch (error) {
    console.error('Error enviando correo:', error);
  
    return NextResponse.json(
      { error: 'Hubo un problema al procesar tu solicitud. Intenta más tarde.' },
      { status: 500 }
    );
  }
}