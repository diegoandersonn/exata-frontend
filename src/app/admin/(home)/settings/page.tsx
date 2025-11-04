"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { MapPin, Hash, Phone, Eye, EyeOff, Mail } from "lucide-react";
import useGetHome from "@/hooks/use-getHome";
import useUpdateHome from "@/hooks/use-updateHome";

export default function Settings() {
  const [distance, setDistance] = useState<number>(20);
  const [address, setAddress] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [whatsapp, setWhatsapp] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [showAddress, setShowAddress] = useState<boolean>(true);

  const { home } = useGetHome();
  const updateHome = useUpdateHome();
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    if (home?.[0]) {
      setDistance(Number(home[0].distancia) || 20);
      setAddress(home[0].endereco || "");
      setInstagram(home[0].instagram || "");
      setWhatsapp(home[0].whatsapp || "");
      setEmail(home[0].email || "");
    }
  }, [home]);

  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      updateHome.mutate(
      {
        distancia: distance,
        endereco: address,
        instagram,
        telefone: whatsapp,
        email: email,
      },
      {
        onSuccess: () => toast.success("Configurações salvas com sucesso!"),
        onError: () => toast.error("Erro ao salvar configurações."),
      }
    );
    } catch {
      toast.error("Erro ao salvar. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className=" w-full flex flex-col items-center justify-center">
      <header className="mb-6 mt-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Configurações</h1>
      </header>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8 space-y-4">
        {/* Distância */}
        <section>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Recomendações</h2>
          <div className="grid grid-cols-1 gap-4">
            <label htmlFor="distance" className="text-sm text-gray-600">Distância máxima para indicação (km)</label>
            <div className="relative">
              <input
                id="distance"
                type="number"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full pl-4 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                min={1}
                max={100}
              />
            </div>
            <p className="text-xs text-gray-400">Usamos este raio para priorizar imóveis próximos.</p>
          </div>
        </section>

        {/* Contato e Endereço */}
        <section>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Contato e endereço</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label htmlFor="address" className="text-sm text-gray-600">Endereço</label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
                <input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Digite o endereço completo"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="instagram" className="text-sm text-gray-600">Instagram</label>
              <div className="relative mt-1">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-500" />
                <input
                  id="instagram"
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="@seudominio"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="whatsapp" className="text-sm text-gray-600">WhatsApp</label>
              <div className="relative mt-1">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-600" />
                <input
                  id="whatsapp"
                  type="tel"
                  inputMode="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="(00) 00000-0000"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="email" className="text-sm text-gray-600">E-mail</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@dominio.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Preferências */}
        <section>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Preferências</h2>
          <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div>
              <p className="text-sm font-medium text-gray-700">Mostrar endereço dos imóveis</p>
              <p className="text-xs text-gray-500">Controla a exibição do endereço completo nas listagens.</p>
            </div>
            <button
              type="button"
              aria-pressed={showAddress}
              onClick={() => setShowAddress((prev) => !prev)}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${showAddress ? "bg-green-500" : "bg-gray-300"}`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition ${showAddress ? "translate-x-6" : "translate-x-1"}`}
              />
              {showAddress ? (
                <Eye className="absolute right-1 w-3 h-3 text-white" />
              ) : (
                <EyeOff className="absolute right-1 w-3 h-3 text-white" />
              )}
            </button>
          </div>
        </section>

        <div className="pt-2">
          <button
            onClick={handleSave}
            className="w-full bg-red-600 text-white py-2.5 px-4 rounded-xl hover:bg-red-700 transition shadow-sm disabled:opacity-60"
            disabled={isSaving}
          >
            {isSaving ? "Carregando..." : "Salvar alterações"}
          </button>
        </div>
      </div>
    </div>
  );
}
