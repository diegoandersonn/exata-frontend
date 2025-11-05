"use client";

import { Mail, MapPin, Phone, Hash } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contato" className="bg-red-800 text-white p-4 mt-10 scroll-mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mt-6">
        {/* Logo e Descrição */}
        <div className="flex flex-col gap-4">
          <h2 className="sm:text-xs md:text-sm xl:text-lg font-bold">
            Exata Administradora
          </h2>
          <p className="text-xs xl:text-lg text-zinc-200">
            Atuamos com excelência em Santos-SP desde 2014, oferecendo gestão de
            imóveis com proximidade real.
          </p>
        </div>

        {/* Navegação */}
        <div className="hidden sm:flex flex-col gap-3">
          <h3 className="sm:text-xs md:text-sm xl:text-lg font-semibold">
            Navegação
          </h3>
          <Link
            href="/properties"
            className="text-xs xl:text-lg hover:underline"
          >
            Ver Imóveis
          </Link>
          <Link href="/contato" className="text-xs xl:text-lg hover:underline">
            Entre em Contato
          </Link>
          <a
            href="https://wa.me/5513974173786?text=Oi%2C%20tenho%20interesse!"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs xl:text-lg hover:underline"
          >
            WhatsApp
          </a>
        </div>

        {/* Contato */}
        <div className="flex items-start justify-between md:flex-col gap-3">
          <h3 className="hidden sm:flex md:text-sm xl:text-lg font-semibold">
            Contato
          </h3>
          <div className="flex items-center gap-2 text-xs xl:text-lg flex-col md:flex-row">
            <MapPin size={24} />
            <p className="hidden sm:flex">Santos - SP</p>
          </div>
          <div className="flex items-center gap-2 text-xs xl:text-lg flex-col md:flex-row">
            <Phone size={24} />
            <p className="hidden sm:flex">(13) 97417-3786</p>
          </div>
          <div className="flex items-center gap-2 text-xs xl:text-lg flex-col md:flex-row">
            <Mail size={24} />
            <p className="hidden sm:flex">contato@exataadm.com.br</p>
          </div>
          <div className="flex items-center gap-2 text-xs xl:text-lg flex-col md:flex-row">
            <Hash size={24} />
            <p className="hidden sm:flex">@exataadm</p>
          </div>
        </div>
      </div>

      {/* Créditos */}
      <div className="mt-10 border-t pt-4 text-xs text-center text-zinc-200">
        &copy; {new Date().getFullYear()} Exata Administradora. Todos os
        direitos reservados.
      </div>
    </footer>
  );
}
