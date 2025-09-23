import { X } from "lucide-react";
import { useState } from "react";

type Props = {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
  onFilter: (filters: {
    tipo?: string;
    quartos?: number;
    bairro?: string;
  }) => void;
  bairros: string[];
};

export default function FilterDropdown({
  isActive,
  setIsActive,
  onFilter,
  bairros,
}: Props) {
  const [tipo, setTipo] = useState("todos");
  const [quartos, setQuartos] = useState("");
  const [bairro, setBairro] = useState("todos");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({
      tipo: tipo === "todos" ? undefined : tipo,
      quartos: quartos ? parseInt(quartos) : undefined,
      bairro: bairro === "todos" ? undefined : bairro,
    });
    setIsActive(false);
  };

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
            onClick={() => setIsActive(false)}
          />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col">
            <span className="mb-2">Tipo de Imóvel</span>
            <select
              className="border border-gray-300 rounded p-2"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="Casa">Casa</option>
              <option value="Apartamento">Apartamento</option>
            </select>
          </label>
          <label className="flex flex-col">
            <span className="mb-2">Número de Quartos</span>
            <input
              type="number"
              placeholder="0"
              value={quartos}
              onChange={(e) => setQuartos(e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-2">Bairro</span>
            <select
              className="border border-gray-300 rounded p-2"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
            >
              <option value="todos">Todos</option>
              {bairros.map((bairro, index) => (
                <option key={index} value={bairro}>
                  {bairro}
                </option>
              ))}
            </select>
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
