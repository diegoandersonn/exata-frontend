"use client";
import useSendNPS from "@/hooks/use-sendNps";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

type Mood = 1 | 2 | 3 | 4 | 5;

const MOODS: Array<{ value: Mood; emoji: string; label: string }> = [
  { value: 1, emoji: "😞", label: "Muito ruim" },
  { value: 2, emoji: "🙁", label: "Ruim" },
  { value: 3, emoji: "😐", label: "Médio" },
  { value: 4, emoji: "🙂", label: "Bom" },
  { value: 5, emoji: "😁", label: "Excelente" },
];

export default function NPS() {
  const [score, setScore] = useState<Mood | null>(3);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [comment, setComment] = useState("");
  const { mutateAsync } = useSendNPS();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const current = useMemo(
    () => MOODS.find((m) => m.value === score) ?? MOODS[2],
    [score]
  );

  async function save() {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await mutateAsync({ score: score!, comment });
      toast.success("Avaliação enviada com sucesso!");
      setHasSubmitted(true);
    } catch (error) {
      toast.error("Erro ao enviar avaliação. Tente novamente mais tarde.");
    } finally {
      // desbloqueia o botão apenas depois do toast ser disparado
      setIsSubmitting(false);
    }
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!score) return;
    save();
  }

  return (
    <div className="w-full flex items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold">Como você nos avaliaria?</h1>
          <p className="mt-2 text-sm text-gray-500">
            Sua opinião é valiosa para nos ajudar a entender melhor suas
            necessidades e adaptar nossos serviços de acordo.
          </p>
        </div>

        {!hasSubmitted && (
          <>
            <div className="flex items-center justify-center">
              <div className="relative flex items-center gap-4">
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20">
                  <div className="h-20 w-20 rounded-full border" />
                </div>

                {MOODS.map((m) => {
                  const isActive = m.value === score;
                  return (
                    <button
                      key={m.value}
                      type="button"
                      aria-pressed={isActive}
                      aria-label={m.label}
                      onClick={() => setScore(m.value)}
                      className={[
                        "relative grid place-items-center h-12 w-12 sm:h-14 sm:w-14 rounded-full transition-all",
                        "hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-600 focus-visible:ring-red-600",
                        isActive
                          ? "scale-110 shadow-md ring-2 ring-red-600"
                          : "opacity-70 hover:opacity-100",
                      ].join(" ")}
                    >
                      <span className="text-2xl sm:text-3xl" aria-hidden>
                        {m.emoji}
                      </span>
                      {isActive && (
                        <span className="pointer-events-none absolute -z-10 h-16 w-16 sm:h-20 sm:w-20 rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium shadow-sm border">
                {current.label}
              </span>
            </div>
            <form onSubmit={onSubmit} className="mt-6">
              <label htmlFor="nps-comment" className="sr-only">
                Adicione um comentário
              </label>
              <textarea
                id="nps-comment"
                rows={5}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Adicione um comentário..."
                className="w-full rounded-xl border border-gray-200 bg-white p-4 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-red-600 focus-visible:ring-red-600 focus:border-red-600 resize-none"
              />
              <button
                type="submit"
                disabled={!score || isSubmitting}
                className={`mt-5 w-full rounded-xl py-3 text-sm font-semibold text-white shadow disabled:opacity-60 transition ${
                  isSubmitting
                    ? "bg-red-800 cursor-wait"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {isSubmitting ? "Carregando..." : "Enviar avaliação"}
              </button>
            </form>
          </>
        )}

        {hasSubmitted && (
          <div className="w-full flex items-center justify-center p-8">
            <p className="text-lg font-semibold">
              ❤️ Muito obrigado pelo seu feedback!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
