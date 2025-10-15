import Image from "next/image";
// import { useState } from "react";

interface PropertyForm3Props {
  index: number;
  mainImagePreview: string | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  otherImagesPreview: string[];
  setOtherImagesPreview?: React.Dispatch<React.SetStateAction<string[]>>; // Adicione esta prop para permitir remoção
  setMainImagePreview?: React.Dispatch<React.SetStateAction<string | null>>; // Para remover a principal
}

export default function PropertyForm3({
  index,
  mainImagePreview,
  handleFileChange,
  otherImagesPreview,
  setOtherImagesPreview,
  setMainImagePreview,
}: PropertyForm3Props) {
  // Função para remover imagem extra
  const handleRemoveOtherImage = (idx: number) => {
    if (setOtherImagesPreview) {
      setOtherImagesPreview((prev) => prev.filter((_, i) => i !== idx));
    }
  };

  // Função para remover imagem principal
  const handleRemoveMainImage = () => {
    if (setMainImagePreview) {
      setMainImagePreview(null);
    }
  };

  return (
    <div className={`${index === 2 ? "block" : "hidden"} space-y-3`}>
      {/* Foto Principal */}
      <div className="bg-white rounded-lg w-full h-[11.5rem] p-6">
        <div
          className={`w-full h-full flex flex-col items-center justify-center transition-all ${
            mainImagePreview ? "" : "border-dashed border-2 border-gray-300"
          }`}
        >
          <label
            htmlFor="mainImage"
            className="cursor-pointer text-gray-500 hover:text-gray-600 flex flex-col items-center gap-2"
          >
            {!mainImagePreview && <span>+ Adicione a foto principal</span>}
            <input
              id="mainImage"
              type="file"
              accept="image/*"
              name="mainImage"
              onChange={handleFileChange}
              required
              className="hidden"
            />
          </label>

          {mainImagePreview && (
            <div className="relative group mt-3">
              <Image
                src={mainImagePreview}
                alt="Pré-visualização da foto principal"
                width={144}
                height={144}
                className="rounded max-h-36 object-contain border border-gray-300 transition-opacity group-hover:opacity-50"
              />
              {setMainImagePreview && (
                <button
                  type="button"
                  onClick={handleRemoveMainImage}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  tabIndex={-1}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={40}
                    height={40}
                    fill="none"
                    viewBox="0 0 24 24"
                    className="text-gray-500 bg-white/80 rounded-full p-2"
                  >
                    <path
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 6l12 12M6 18L18 6"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Outras Fotos */}
      <div className="bg-white rounded-lg w-full h-[11.5rem] p-6">
        <div
          className={`w-full h-full flex flex-col items-center justify-center transition-all ${
            otherImagesPreview.length > 0
              ? ""
              : "border-dashed border-2 border-gray-300"
          }`}
        >
          <label
            htmlFor="otherImages"
            className="cursor-pointer text-gray-500 hover:text-gray-600 flex flex-col items-center gap-2"
          >
            {otherImagesPreview.length === 0 && (
              <span>+ Adicione as outras fotos</span>
            )}
            <input
              id="otherImages"
              type="file"
              accept="image/*"
              name="otherImages"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {otherImagesPreview.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3 max-h-36 overflow-auto">
              {otherImagesPreview.map((src, idx) => (
                <div key={idx} className="relative group">
                  <Image
                    src={src}
                    alt={`Pré-visualização ${idx + 1}`}
                    width={96}
                    height={96}
                    className="rounded max-h-24 object-contain border border-gray-300 transition-opacity group-hover:opacity-50"
                  />
                  {setOtherImagesPreview && (
                    <button
                      type="button"
                      onClick={() => handleRemoveOtherImage(idx)}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      tabIndex={-1}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={32}
                        height={32}
                        fill="none"
                        viewBox="0 0 24 24"
                        className="text-gray-500 bg-white/80 rounded-full p-1"
                      >
                        <path
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 6l12 12M6 18L18 6"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              {/* Quadradinho para adicionar mais imagens */}
              <label
                htmlFor="otherImages"
                className="flex items-center justify-center w-[96px] h-[96px] border-2 border-dashed border-gray-300 rounded cursor-pointer text-3xl text-gray-400 hover:text-gray-600 transition-colors"
                style={{ minWidth: 96, minHeight: 96 }}
              >
                +
                <input
                  id="otherImages"
                  type="file"
                  accept="image/*"
                  name="otherImages"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
