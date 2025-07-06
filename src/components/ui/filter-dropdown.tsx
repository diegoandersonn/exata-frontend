import { X } from "lucide-react";

type Props = {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
};

export default function FilterDropdown({ isActive, setIsActive }: Props) {
  return (
    <div
      data-active={isActive}
      className="fixed mt-12 z-50 flex items-center justify-center data-[active=true]:visible invisible"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Filtros</h2>
          <X
            className="hover:scale-110 cursor-pointer"
            onClick={() => setIsActive(!isActive)}
          />
        </div>
        <form className="flex flex-col gap-4">
          <label className="flex flex-col">
            <span className="mb-2">Tipo de Imóvel</span>
            <select className="border border-gray-300 rounded p-2">
              <option value="">Todos</option>
              <option value="casa">Casa</option>
              <option value="apartamento">Apartamento</option>
            </select>
          </label>
          <label className="flex flex-col">
            <span className="mb-2">Número de Quartos</span>
            <input
              type="number"
              placeholder="0"
              className="border border-gray-300 rounded p-2"
            />
          </label>
          <button
            type="submit"
            className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors duration-300"
          >
            Aplicar Filtros
          </button>
        </form>
      </div>
    </div>
  );
}
