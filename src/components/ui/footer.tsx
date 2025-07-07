"use client";

import { Mail, MapPin, Phone, Instagram, Facebook } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-red-800 text-white py-10 px-6 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo e Descrição */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Exata Administradora</h2>
          <p className="text-sm text-zinc-200">
            Atuamos com excelência em Santos-SP desde 2014, oferecendo gestão de imóveis com proximidade real.
          </p>
        </div>

        {/* Navegação */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold">Navegação</h3>
          <Link href="/properties" className="text-sm hover:underline">Ver Imóveis</Link>
          <Link href="/contato" className="text-sm hover:underline">Entre em Contato</Link>
          <a
            href="https://wa.me/5513974173786?text=Oi%2C%20tenho%20interesse!"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:underline"
          >
            WhatsApp
          </a>
        </div>

        {/* Contato */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold">Contato</h3>
          <div className="flex items-center gap-2 text-sm">
            <MapPin size={16} /> Santos - SP
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone size={16} /> (13) 97417-3786
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail size={16} /> contato@exataadm.com.br
          </div>
          <div className="flex gap-3 mt-2">
            <a href="#" className="hover:text-zinc-300"><Instagram size={18} /></a>
            <a href="#" className="hover:text-zinc-300"><Facebook size={18} /></a>
          </div>
        </div>
      </div>

      {/* Créditos */}
      <div className="mt-10 border-t pt-4 text-xs text-center text-zinc-200">
        &copy; {new Date().getFullYear()} Exata Administradora. Todos os direitos reservados.
      </div>
    </footer>
  );
}
