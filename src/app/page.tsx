import Image from "next/image";
import santosFoto from "../../public/orla-de-santos.jpeg";

export default function Home() {
  return (
    <>
      <div className="w-full h-full flex relative overflow-hidden">
        <div className="absolute w-full h-screen bg-gradient-to-b from-red-500 to-red-800 opacity-50 z-10"></div>
        <div className="z-10 text-white m-[6rem] w-1/2 flex flex-col">
          <h1 className="text-5xl font-extrabold mb-6">Exata</h1>
          <h3 className="text-lg leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A qui
            reiciendis, vitae quam et fugiat ipsum. Cumque, fugit blanditiis
            velit quasi enim, assumenda dolore nulla sunt quibusdam, modi
            explicabo doloremque!
          </h3>
          <button className="p-8 w-48 h-8 rounded-3xl border-none font-bold bg-white text-zinc-400 flex items-center justify-center hover:bg-transparent hover:text-white transition-colors duration-300 hover:scale-110"> 
            Saiba mais!
          </button>
        </div>
        <Image
          src={santosFoto}
          alt="Santos"
          className="absolute object-cover w-screen h-screen max-w-full"
        />
      </div>
      <div className="w-screen h-screen">oii</div>
    </>
  );
}
