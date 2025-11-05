"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const forceBackground =
    pathname.includes("/property") || pathname.includes("/properties");
  const showBackground = scrolled || forceBackground;

  const makeSectionHandler = (sectionId: string) =>
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      router.push(`/#${sectionId}`);
    };

  const handleGoToContato = makeSectionHandler("contato");
  const handleGoToNps = makeSectionHandler("nps");
  const handleGoToFeedbacks = makeSectionHandler("feedbacks");
  const handleGoToSobreNos = makeSectionHandler("sobre-nos");
  return (
    <header
      className={`fixed top-0 w-full z-50 px-6 py-1 lg:px-10 lg:py-2 flex justify-between items-center transition-all duration-300 ${
        showBackground ? "bg-red-800 shadow-md" : "bg-transparent"
      }`}
    >
      <Image
        id="exata-logo"
        src="/exata-logo.svg"
        alt="Logo da Exata administradora de bens, um E vermelho representando a inicial da empresa, com um fundo branco."
        title="Logo da Exata"
        width={60}
        height={60}
        className="invert cursor-pointer"
        onClick={() => router.push("/")}
      />
      <nav className="flex gap-3 lg:gap-6 text-xs lg:text-sm font-semibold">
        <Link href="#sobre-nos" onClick={handleGoToSobreNos} className="text-white hover:underline transition">Quem somos</Link>
        <Link href="/properties" className="text-white hover:underline transition">Apartamentos</Link>
        <Link href="#feedbacks" onClick={handleGoToFeedbacks} className="text-white hover:underline transition">Feedbacks</Link>
        <Link href="#nps" onClick={handleGoToNps} className="text-white hover:underline transition">Nos avalie</Link>
        <Link href="#contato" onClick={handleGoToContato} className="text-white hover:underline transition">Contato</Link>
      </nav>
    </header>
  );
}
