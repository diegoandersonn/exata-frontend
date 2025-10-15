import Image from "next/image";

interface PropertyForm3Props {
  index: number;
  mainImagePreview: string | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  otherImagesPreview: string[];
}

export default function PropertyForm3({
  index,
  mainImagePreview,
  handleFileChange,
  otherImagesPreview,
}: PropertyForm3Props) {
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
            <Image
              src={mainImagePreview}
              alt="Pré-visualização da foto principal"
              width={144}
              height={144}
              className="mt-3 rounded max-h-36 object-contain border border-gray-300"
            />
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
                <Image
                  key={idx}
                  src={src}
                  alt={`Pré-visualização ${idx + 1}`}
                  width={96}
                  height={96}
                  className="rounded max-h-24 object-contain border border-gray-300"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
