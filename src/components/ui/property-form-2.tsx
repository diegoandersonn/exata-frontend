import { PropertyFormProps } from "@/types/property-form";
import { useState } from "react";
import { toast } from "react-toastify";

export default function PropertyForm2({
  index,
  form,
  setForm,
  triedNext,
  handleChange,
}: PropertyFormProps) {
  const [cepError, setCepError] = useState<boolean>(false);

  return (
    <div className={`${index === 1 ? "block" : "hidden"} space-y-3`}>
      {/* Tipo do imóvel */}
      <div className="bg-white rounded-lg w-full h-fit p-6">
        <div className="flex justify-between mt-4">
          <div className="w-[31.5%]">
            <label className="block text-[0.9rem] font-medium mb-1">CEP</label>
            <input
              type="text"
              name="cep"
              value={form.cep}
              onChange={async (e) => {
                let value = e.target.value.replace(/\D/g, ""); // só números

                // limita a 8 dígitos
                if (value.length > 8) value = value.substring(0, 8);

                // aplica máscara 99999-999
                if (value.length > 5) {
                  value = value.replace(/(\d{5})(\d{1,3})/, "$1-$2");
                }

                // atualiza o form
                setForm((prev) => ({ ...prev, cep: value }));

                // dispara busca se tiver 8 dígitos
                const numericCep = value.replace(/\D/g, "");
                if (numericCep.length === 8) {
                  try {
                    const response = await fetch(
                      `https://viacep.com.br/ws/${numericCep}/json/`
                    );
                    const data = await response.json();

                    if (data.erro) {
                      toast.error("CEP não encontrado.");
                      setCepError(true);
                      return;
                    } else {
                      setCepError(false);
                    }

                    setForm((prev) => ({
                      ...prev,
                      street: data.logradouro,
                      neighborhood: data.bairro,
                      city: data.localidade,
                      state: data.uf,
                    }));
                  } catch (error) {
                  }
                }
              }}
              placeholder="00000-000"
              maxLength={9} // 8 dígitos + o "-"
              className={`${
                (triedNext && !form.cep) || cepError ? "border-red-500" : ""
              } w-full border rounded px-3 py-2 mb-1 text-black`}
              required
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg w-full h-fit p-6">
        <div className="flex justify-between mt-4">
          <div className="w-[31.5%]">
            <label className="block text-[0.9rem] font-medium mb-1">
              Logradouro
            </label>
            <input
              type="text"
              name="street"
              value={form.street}
              onChange={handleChange}
              disabled
              className={`${
                triedNext && !form.street ? "border-red-500" : ""
              } w-full border rounded px-3 py-2 mb-1 text-gray-500`}
            />
          </div>

          <div className="w-[31.5%]">
            <label className="block text-[0.9rem] font-medium mb-1">
              Número
            </label>
            <input
              type="number"
              name="number"
              value={form.number}
              onChange={handleChange}
              className={`${
                triedNext && !form.number ? "border-red-500" : ""
              } w-full border rounded px-3 py-2 mb-1`}
              min={0}
              placeholder="0"
              required
            />
          </div>

          <div className="w-[31.5%]">
            <label className="block text-[0.9rem] font-medium mb-1">
              Complemento
            </label>
            <input
              type="text"
              name="complement"
              value={form.complement}
              onChange={handleChange}
              placeholder="Digite aqui"
              className={`${
                triedNext && !form.complement ? "border-red-500" : ""
              } w-full border rounded px-3 py-2 mb-1 text-black`}
            />
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <div className="w-[31.5%]">
            <label className="block text-[0.9rem] font-medium mb-1">
              Bairro
            </label>
            <input
              type="text"
              name="neighborhood"
              value={form.neighborhood}
              onChange={handleChange}
              disabled
              className={`${
                triedNext && !form.neighborhood ? "border-red-500" : ""
              } w-full border rounded px-3 py-2 mb-1 text-gray-500`}
            />
          </div>

          <div className="w-[31.5%]">
            <label className="block text-[0.9rem] font-medium mb-1">
              Cidade
            </label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              disabled
              className={`${
                triedNext && !form.city ? "border-red-500" : ""
              } w-full border rounded px-3 py-2 mb-1 text-gray-500`}
            />
          </div>

          <div className="w-[31.5%]">
            <label className="block text-[0.9rem] font-medium mb-1">UF</label>
            <input
              type="text"
              name="state"
              value={form.state}
              onChange={handleChange}
              disabled
              className={`${
                triedNext && !form.state ? "border-red-500" : ""
              } w-full border rounded px-3 py-2 mb-1 text-gray-500`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
