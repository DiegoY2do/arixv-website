"use client";

import { useState } from "react";
import Link from "next/link";

interface ContactProps {
  dict: {
    badge: string;
    title: string;
    description: string;
    form: {
      namePlaceholder: string;
      emailPlaceholder: string;
      servicePlaceholder: string;
      messagePlaceholder: string;
      submitText: string;
      submittingText: string;
      privacyLabel: string;
      privacyLink: string;
    };
    contactInfo: {
      email: string;
      social: string;
    };
  };
  lang: string;
}

export default function Contact({ dict, lang }: ContactProps) {
  const socialLinks = [
    { name: "Instagram", url: "https://www.instagram.com/arixv21/" },
    { name: "Facebook", url: "https://www.facebook.com/profile.php?id=61572553050464" },
    { name: "WhatsApp", url: "https://api.whatsapp.com/send/?phone=525621434770&text=Hola%2C+estoy+interesado+en+desarrollar+un+sitio+web+y+me+gustar%C3%ADa+conocer+c%C3%B3mo+pueden+ayudarme.&type=phone_number&app_absent=0" }
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
    privacyAccepted: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // CONEXIÓN REAL AL BACKEND
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error del servidor');
      }

      // ÉXITO: Limpiamos el formulario y mostramos alerta
      setFormData({
        name: "",
        email: "",
        service: "",
        message: "",
        privacyAccepted: false,
      });
      
      alert("¡Mensaje enviado con éxito! Revisaremos tu solicitud.");

    } catch (error) {
      console.error('Error de envío:', error);
      alert("Hubo un problema enviando el mensaje. Por favor, intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="relative w-full py-24 lg:py-40 bg-[#DBE9EE]/20">
      
      {/* CUADRÍCULA TÉCNICA */}
      <div className="absolute top-0 left-0 w-full sm:w-3/4 lg:w-1/2 h-full pointer-events-none z-0 bg-[linear-gradient(to_right,#4F6D7A15_1px,transparent_1px),linear-gradient(to_bottom,#4F6D7A15_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_right,black_10%,transparent_100%)]" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* COLUMNA IZQUIERDA: Información Editorial */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="mb-10 inline-flex items-center gap-3 px-5 py-2.5 border border-[#E11D48]/30 bg-white text-[10px] uppercase tracking-[0.3em] font-bold text-[#E11D48] w-fit">
              <span className="w-2 h-2 bg-[#E11D48] animate-pulse" />
              {dict.badge}
            </div>
            
            <h2 className="text-6xl font-bold tracking-tighter text-[#0b0f14] lg:text-8xl leading-[0.9] mb-10">
              {dict.title}
            </h2>
            
            <p className="text-2xl leading-relaxed text-[#4F6D7A] font-light mb-16 max-w-md border-l-2 border-[#E11D48] pl-6">
              {dict.description}
            </p>

            <div className="space-y-12 pt-12 border-t border-zinc-300">
              <div className="group">
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-[#E11D48] block mb-4">Email //</span>
                <a href="mailto:contacto@arixv.com.mx" className="text-3xl font-bold text-[#0b0f14] hover:text-[#E11D48] transition-colors duration-500 block">
                  contacto@arixv.com.mx
                </a>
              </div>
              
              <div className="space-y-6">
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-400 block">Social //</span>
                
                <div className="flex flex-wrap gap-x-10 gap-y-4">
                  {socialLinks.map((social) => (
                    <a 
                      key={social.name} 
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm font-black uppercase tracking-widest text-[#0b0f14] hover:text-[#E11D48] transition-colors relative pb-2 overflow-hidden group"
                    >
                      {social.name}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E11D48] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: Formulario Sólido */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="flex flex-col border border-zinc-300 bg-white shadow-[20px_20px_0px_0px_rgba(11,15,20,0.03)]">
              
              <div className="border-b border-zinc-300">
                <input 
                  type="text" 
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={dict.form.namePlaceholder}
                  className="w-full bg-transparent px-10 py-8 text-xl text-[#0b0f14] placeholder:text-zinc-400 focus:outline-none focus:bg-zinc-50 transition-all rounded-none border-l-4 border-l-transparent focus:border-l-[#E11D48]"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="border-b border-zinc-300">
                <input 
                  type="email" 
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={dict.form.emailPlaceholder}
                  className="w-full bg-transparent px-10 py-8 text-xl text-[#0b0f14] placeholder:text-zinc-400 focus:outline-none focus:bg-zinc-50 transition-all rounded-none border-l-4 border-l-transparent focus:border-l-[#E11D48]"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="border-b border-zinc-300">
                <input 
                  type="text" 
                  name="service"
                  id="service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  placeholder={dict.form.servicePlaceholder}
                  className="w-full bg-transparent px-10 py-8 text-xl text-[#0b0f14] placeholder:text-zinc-400 focus:outline-none focus:bg-zinc-50 transition-all rounded-none border-l-4 border-l-transparent focus:border-l-[#E11D48]"
                  disabled={isSubmitting}
                />
              </div>

              <div className="border-b border-zinc-300">
                <textarea 
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={dict.form.messagePlaceholder}
                  rows={5}
                  className="w-full bg-transparent px-10 py-8 text-xl text-[#0b0f14] placeholder:text-zinc-400 focus:outline-none focus:bg-zinc-50 transition-all resize-none rounded-none border-l-4 border-l-transparent focus:border-l-[#E11D48]"
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>

              {/* CHECKBOX DE VERIFICACIÓN BRUTALISTA */}
              <div className="px-10 py-6 bg-zinc-50/50 border-b border-zinc-300">
                <label className="flex items-start sm:items-center gap-4 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-6 h-6 shrink-0 mt-0.5 sm:mt-0">
                    <input 
                      type="checkbox" 
                      name="privacy"
                      id="privacy"
                      required
                      checked={formData.privacyAccepted}
                      onChange={(e) => setFormData({ ...formData, privacyAccepted: e.target.checked })}
                      className="peer sr-only" 
                      disabled={isSubmitting}
                    />
                    <div className="w-full h-full border-2 border-zinc-300 bg-white peer-checked:bg-[#E11D48] peer-checked:border-[#E11D48] transition-colors duration-200" />
                    <svg className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-zinc-500 select-none">
                    {dict.form.privacyLabel}
                    <Link href={`/${lang}/privacidad`} className="text-[#E11D48] hover:underline underline-offset-4 decoration-2">
                      {dict.form.privacyLink}
                    </Link>
                    .
                  </span>
                </label>
              </div>

              {/* BOTÓN DE SUBMIT DINÁMICO */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="relative w-full h-24 bg-[#0b0f14] text-white text-xs font-black uppercase tracking-[0.5em] transition-all hover:bg-[#E11D48] active:bg-black disabled:bg-zinc-300 disabled:text-zinc-500 disabled:cursor-not-allowed overflow-hidden flex items-center justify-center"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-zinc-500 animate-ping rounded-full" />
                    {dict.form.submittingText}
                  </span>
                ) : (
                  dict.form.submitText
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}