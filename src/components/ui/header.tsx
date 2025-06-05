"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 w-full z-50 px-6 py-3 lg:px-12 lg:py-6 flex justify-between items-center transition-all duration-300 ${
        scrolled ? "bg-red-800 shadow-md" : "bg-transparent"
      }`}
    >
      <Image
        id="exata-logo-v2"
        src="/exata-logo-v2.png"
        alt="Logo da Exata administradora de bens, um E vermelho representando a inicial da empresa, com um fundo branco."
        title="Logo da Exata"
        width={60}
        height={60}
      />
      <nav className="flex gap-3 lg:gap-6 text-xs lg:text-sm font-semibold">
        <Link href="#" className="text-white hover:text-red-500 transition">
          Quem somos
        </Link>
        <Link href="#" className="text-white hover:text-red-500 transition">
          Serviços
        </Link>
        <Link href="#" className="text-white hover:text-red-500 transition">
          Contato
        </Link>
      </nav>
    </header>
  );
}
