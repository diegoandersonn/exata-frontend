export default function FeedbackCard({
  feedback,
  rating,
}: {
  feedback?: string;
  rating?: number;
}) {
  return (
    <div className="w-auto max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center gap-4 transition hover:shadow-xl md:p-8 border-2 border-red-500">
      <div>
        <div className="flex space-x-1 mb-2">
          {[...Array(5)].map((_, i) => {
            const isFilled = typeof rating === "number" && rating > i;
            return (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill={isFilled ? "#ff0000" : "#d1d5db"}
                className="w-5 h-5"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
              </svg>
            );
          })}
        </div>
        <span className="text-3xl text-gray-300 absolute left-0 -top-2 select-none">
        </span>
        {feedback ? (
          <span className="text-gray-800 line-clamp-6">"{feedback}"</span>
        ) : ( 
          <span className="text-gray-400 line-clamp-5">Este é um exemplo de feedback.</span>
        )}
        <span className="text-3xl text-gray-300 absolute right-0 -bottom-2 select-none">
        </span>
      </div>
    </div>
  );
}
