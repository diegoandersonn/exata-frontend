import Image from "next/image";

export function Header() {
    return (
        <header className="w-full h-12 px-4 md:px-20 top-0 flex items-end justify-center">
            <div className="w-full max-w-[1440px] flex items-center justify-end pb-1 mt-[0.75rem]">
               <Image
               id="exata-logo-v2"
               src="/exata-logo-v2.png"
               alt="Logo da Exata administradora de bens, um E vermelho representando a inicial da empresa, com um fundo branco."
               title="Logo da Exata"
               width={32}
               height={30}
               className="w-auto h-auto"
               />
            </div>
        </header>
    )
}