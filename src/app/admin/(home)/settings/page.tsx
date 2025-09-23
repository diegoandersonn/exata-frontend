"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { MapPin, Instagram, Phone, Eye, EyeOff } from "lucide-react";

export default function Settings() {
  const [distance, setDistance] = useState<number>(20);
  const [address, setAddress] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [whatsapp, setWhatsapp] = useState<string>("");
  const [showAddress, setShowAddress] = useState<boolean>(true);

  useEffect(() => {
    console.log("Settings component mounted");
  }, []);

  const handleSave = () => {
    toast.success("Configuração salva com sucesso!");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Configurações</h1>

      <div className="mb-4">
        <label htmlFor="distance" className="block text-sm font-medium mb-2">
          Distância máxima para indicação (km):
        </label>
        <input
          id="distance"
          type="number"
          value={distance}
          onChange={(e) => setDistance(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          min="1"
          max="100"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-medium mb-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-500" />
            Endereço
          </div>
        </label>
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Digite o endereço"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="instagram" className="block text-sm font-medium mb-2">
          <div className="flex items-center gap-2">
            <Instagram className="w-4 h-4 text-pink-500" />
            Instagram
          </div>
        </label>
        <input
          id="instagram"
          type="text"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          placeholder="@seudominio"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="whatsapp" className="block text-sm font-medium mb-2">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-green-600" />
            WhatsApp
          </div>
        </label>
        <input
          id="whatsapp"
          type="text"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          placeholder="(00) 00000-0000"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>

      <div className="mb-6 flex items-center justify-between">
        <span className="text-sm font-medium">Mostrar endereço dos imóveis</span>
        <button
          type="button"
          onClick={() => setShowAddress((prev) => !prev)}
          className="flex items-center justify-center w-12 h-6 rounded-full bg-gray-300 relative"
        >
          <div
            className={`absolute left-0 top-0 h-6 w-6 bg-white rounded-full shadow transform transition ${
              showAddress ? "translate-x-6 bg-green-500" : "translate-x-0"
            }`}
          ></div>
          {showAddress ? (
            <Eye className="absolute right-1 w-3 h-3 text-white" />
          ) : (
            <EyeOff className="absolute right-1 w-3 h-3 text-gray-500" />
          )}
        </button>
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
      >
        Salvar
      </button>
    </div>
  );
}
