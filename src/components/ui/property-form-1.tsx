import { PropertyTypeEnum } from "@/types/property-type-enum";
import { AdjustmentTypeEnum } from "@/types/adjustment-type-enum";
import { PropertyForm1Props } from "@/types/property-form-1";

export default function PropertyForm1({
  index,
  form,
  setForm,
  triedNext,
  handleChange,
}: PropertyForm1Props) {
  return (
    <div className={`${index === 0 ? "block" : "hidden"} space-y-3`}>
      {/* Tipo do imóvel */}
      <div className="bg-white rounded-lg w-full h-fit p-6">
        <h2 className="text-base font-medium">Dados principais</h2>
        <div className="flex justify-between mt-4">
          <div className="w-[31.5%]">
            <label className="block text-[0.9rem] font-medium mb-1">
              Título do imóvel
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Digite aqui"
              className={`${
                triedNext && !form.name ? "border-red-500" : ""
              } w-full border rounded px-3 py-2 mb-1 text-black`}
              required
            />
          </div>

          <div className="w-[31.5%]">
            <label className="block text-[0.9rem] font-medium mb-1">
              Tipo do imóvel
            </label>
            <select
              name="propertyType"
              value={form.propertyType}
              onChange={handleChange}
              className={`${
                triedNext && !form.propertyType ? "border-red-500" : ""
              } w-full border rounded px-3 py-2 mb-1`}
              required
            >
              <option value="">Selecione</option>
              <option value={PropertyTypeEnum.apartment}>Apartamento</option>
              <option value={PropertyTypeEnum.house}>Casa</option>
            </select>
          </div>

          <div className="w-[31.5%]">
            <label className="block text-[0.9rem] font-medium mb-1">
              Prazo do contrato
            </label>
            <input
              type="text"
              name="prazo"
              value={form.prazo}
              onChange={handleChange}
              onBlur={(e) => {
                const rawValue = e.target.value.trim().toLowerCase();

                // Se já estiver no formato correto (ex: "12 meses")
                if (/^\d+\s*meses$/.test(rawValue)) return;

                // Tenta extrair só o número
                const numberOnly = rawValue.match(/\d+/)?.[0] || "";

                if (numberOnly) {
                  setForm((prev: PropertyForm1Props["form"]) => ({
                    ...prev,
                    prazo: `${numberOnly} meses`,
                  }));
                } else {
                  // Se não tiver número válido, limpa
                  setForm((prev: PropertyForm1Props["form"]) => ({
                    ...prev,
                    prazo: "",
                  }));
                }
              }}
              placeholder="0 meses"
              className={`${
                triedNext && !form.prazo ? "border-red-500" : ""
              } w-full border rounded px-3 py-2 mb-1 text-black`}
              required
            />
          </div>
        </div>

        <div className="flex justify-between mt-4">
          {/* Dormitórios */}
          <div className="w-[31.5%]">
            <label className="block text-[0.9rem] font-medium mb-1">
              Dormitório(s)
            </label>
            <input
              type="number"
              name="bedrooms"
              value={form.bedrooms}
              onChange={handleChange}
              className={`${
                triedNext && !form.bedrooms ? "border-red-500" : ""
              } w-full border rounded px-3 py-2 mb-1`}
              min={0}
              placeholder="0"
              required
            />
          </div>

          {/* Banheiros */}
          <div className="w-[31.5%]">
            <label className="block text-[0.9rem] font-medium mb-1">
              Banheiro(s)
            </label>
            <input
              type="number"
              name="bathrooms"
              value={form.bathrooms}
              onChange={handleChange}
              className={`${
                triedNext && !form.bathrooms ? "border-red-500" : ""
              } w-full border rounded px-3 py-2 mb-1`}
              min={0}
              placeholder="0"
              required
            />
          </div>

          {/* Garagens */}
          <div className="w-[31.5%]">
            <label className="block text-[0.9rem] font-medium mb-1">
              Garagem(ns)
            </label>
            <input
              type="number"
              name="garages"
              value={form.garages}
              onChange={handleChange}
              className={`${
                triedNext && !form.garages ? "border-red-500" : ""
              } w-full border rounded px-3 py-2 mb-1`}
              min={0}
              placeholder="0"
              required
            />
          </div>
        </div>
      </div>

      {/* <div className="bg-white rounded-lg w-full h-fit flex p-6 justify-between"></div> */}

      <div className="bg-white rounded-lg w-full h-fit p-6">
        <h2 className="text-base font-medium">Valores</h2>
        {/* Aluguel */}
        <div className="flex justify-between mt-4">
          <div className="w-[31.5%]">
            <label className="block text-[0.9rem] font-medium mb-1">
              Aluguel (R$)
            </label>
            <input
              type="text"
              name="rent"
              value={form.rent}
              onChange={handleChange}
              onBlur={(e) => {
                const value = e.target.value.trim();

                // Substitui ponto por nada e vírgula por ponto temporariamente para parseFloat
                const normalized = value.replace(/\./g, "").replace(",", ".");

                const parsed = parseFloat(normalized);

                if (isNaN(parsed)) {
                  setForm((prev: PropertyForm1Props["form"]) => ({
                    ...prev,
                    rent: "",
                  }));
                  return;
                }

                // Formata no padrão pt-BR com separador de milhar (.) e decimal (,)
                const formatted = parsed.toLocaleString("pt-BR", {
                  minimumFractionDigits: value.includes(",") ? 2 : 2,
                  maximumFractionDigits: 2,
                });

                setForm((prev: PropertyForm1Props["form"]) => ({
                  ...prev,
                  rent: formatted,
                }));
              }}
              placeholder="0,00"
              className={`${
                triedNext && !form.rent ? "border-red-500" : ""
              } w-full border rounded px-3 py-2 mb-1`}
              required
            />
          </div>

          {/* Taxa */}
          <div className="w-[31.5%]">
            <label className="block text-[0.9rem] font-medium mb-1">
              IPTU (R$)
            </label>
            <input
              type="text"
              name="tax"
              value={form.tax}
              onChange={handleChange}
              onBlur={(e) => {
                const value = e.target.value.trim();

                // Substitui milhar e decimal para permitir o parseFloat
                const normalized = value.replace(/\./g, "").replace(",", ".");

                const parsed = parseFloat(normalized);

                if (isNaN(parsed)) {
                  setForm((prev: PropertyForm1Props["form"]) => ({
                    ...prev,
                    tax: "",
                  }));
                  return;
                }

                const formatted = parsed.toLocaleString("pt-BR", {
                  minimumFractionDigits: value.includes(",") ? 2 : 2,
                  maximumFractionDigits: 2,
                });

                setForm((prev: PropertyForm1Props["form"]) => ({
                  ...prev,
                  tax: formatted,
                }));
              }}
              placeholder="0,00"
              className={`${
                triedNext && !form.tax ? "border-red-500" : ""
              } w-full border rounded px-3 py-2 mb-1`}
              required
            />
          </div>

          {/* Aluguel + IPTU */}
          <div className="w-[31.5%]">
            <label className="block text-[0.9rem] font-medium mb-1">
              Aluguel + IPTU (R$)
            </label>
            <input
              type="text"
              name="rentWithTax"
              value={(() => {
                const parseCurrency = (val: string) => {
                  if (!val) return 0;
                  const normalized = val.replace(/\./g, "").replace(",", ".");
                  const parsed = parseFloat(normalized);
                  return isNaN(parsed) ? 0 : parsed;
                };

                const total =
                  parseCurrency(form.rent) + parseCurrency(form.tax);

                return total.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                });
              })()}
              disabled
              placeholder="0,00"
              className={`${
                triedNext && (!form.rent || !form.tax) ? "border-red-500" : ""
              } w-full border rounded px-3 py-2 mb-1 text-gray-500`}
              required
              min={0}
              step="0.01"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg w-full h-fit p-6 gap-4">
        <h2 className="text-base font-medium mb-4">Extras</h2>
        <div className="flex justify-between flex-wrap">
          <div className="w-[31.5%]">
            <label className="block text-[0.9rem] font-medium mb-1">
              Tipo de Reajuste
            </label>
            <select
              name="reajusteType"
              value={form.reajusteType}
              onChange={handleChange}
              className={`${
                triedNext && !form.reajusteType ? "border-red-500" : ""
              } w-full border rounded px-3 py-2 mb-1 text-black`}
              required
            >
              <option value="">Selecione</option>
              <option value={AdjustmentTypeEnum.annual}>Anual</option>
              <option value={AdjustmentTypeEnum.semiannual}>Semestral</option>
              <option value={AdjustmentTypeEnum.biennial}>Bianual</option>
            </select>
          </div>
          <div className="w-[31.5%]">
            <label className="block text-[0.9rem] font-medium mb-1">
              Horário de Visita
            </label>
            <input
              type="text"
              name="horarioVisita"
              value={form.horarioVisita}
              onChange={handleChange}
              onBlur={(e) => {
                const val = e.target.value.trim();

                // Expressão regular para capturar até 4 horários (HHMM ou HH:MM)
                const timeRegex = /(\d{1,2}):?(\d{2})?/g;

                const matches: { hour: string; minute: string }[] = [];
                let match;
                while ((match = timeRegex.exec(val)) !== null) {
                  matches.push({
                    hour: match[1],
                    minute: match[2] || "00",
                  });
                  if (matches.length === 4) break;
                }

                // Se não conseguir 2 ou 4 horários, tenta fallback com grupos de 3-4 dígitos
                if (matches.length !== 2 && matches.length !== 4) {
                  const digits = val.match(/\d{3,4}/g);
                  if (!digits || (digits.length !== 2 && digits.length !== 4)) {
                    setForm((prev: PropertyForm1Props["form"]) => ({
                      ...prev,
                      horarioVisita: "",
                    }));
                    return;
                  }

                  matches.length = 0; // limpa
                  digits.forEach((d) => {
                    matches.push({
                      hour: d.slice(0, 2),
                      minute: d.slice(2) || "00",
                    });
                  });
                }

                function formatTime(hm: { hour: string; minute: string }) {
                  const h = hm.hour.padStart(2, "0");
                  const m = hm.minute.padEnd(2, "0");

                  const hourNum = parseInt(h, 10);
                  const minNum = parseInt(m, 10);

                  if (
                    hourNum < 0 ||
                    hourNum > 23 ||
                    minNum < 0 ||
                    minNum > 59
                  ) {
                    return null;
                  }

                  return `${h}:${m}`;
                }

                const formattedTimes = matches.map(formatTime);

                if (formattedTimes.some((t) => t === null)) {
                  setForm((prev: PropertyForm1Props["form"]) => ({
                    ...prev,
                    horarioVisita: "",
                  }));
                  return;
                }

                let final = `${formattedTimes[0]} - ${formattedTimes[1]}`;
                if (formattedTimes.length === 4) {
                  final += ` | ${formattedTimes[2]} - ${formattedTimes[3]}`;
                }

                setForm((prev: PropertyForm1Props["form"]) => ({
                  ...prev,
                  horarioVisita: final,
                }));
              }}
              placeholder="00:00 - 00:00 | 00:00 - 00:00"
              className={`${
                triedNext && !form.horarioVisita ? "border-red-500" : ""
              } w-full border rounded px-3 py-2 mb-1 text-black`}
              required
            />
          </div>

          <div className="w-[31.5%]">
            <label className="block text-[0.9rem] font-medium mb-1">
              Área (m²)
            </label>
            <input
              type="number"
              name="area"
              value={form.area}
              onChange={handleChange}
              className={`${
                triedNext && !form.area ? "border-red-500" : ""
              } w-full border rounded px-3 py-2 mb-1 text-black`}
              placeholder="0"
              min={0}
              required
            />
          </div>
          <div className="w-full mt-3">
            <label className="block text-[0.9rem] font-medium mb-1">
              Descrição
            </label>
            <input
              type="text"
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              className={`${
                triedNext && !form.descricao ? "border-red-500" : ""
              } w-full border rounded px-3 py-2 mb-1 text-black`}
              placeholder="Digite aqui"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}
