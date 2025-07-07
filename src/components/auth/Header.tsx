import ExataLogo from "@/components/ui/new-exata-logo.svg";

export function Header() {
  return (
    <header className="w-full h-12 px-4 md:px-20 top-0 flex items-end justify-center">
      <div className="w-full max-w-[1440px] flex items-center justify-end pb-1 mt-[0.75rem]">
        <div className={`fixed mt-6 cursor-pointer w-fit flex mr-[3.5rem]`}>
          <div>
            <ExataLogo className="cursor-pointer mt-[-0.28rem] text-red-600 w-[1.875rem] h-[1.875rem]" />
            <div className="bg-red-600 w-[1rem] h-[0.25rem] absolute left-1 bottom-[0.33rem] z-20"></div>
          </div>
          <h1 className="text-red-600 font-bold text-lg h-full self-end pb-[0.05rem] absolute left-[3.1rem] -translate-x-1/2 bottom-0 z-30 pointer-events-none">
            XATA
          </h1>
        </div>
      </div>
    </header>
  );
}
