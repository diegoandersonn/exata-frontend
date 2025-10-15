export function formatCurrency(value: string | number): string {
  const num =
    typeof value === "number"
      ? value
      : parseFloat(String(value).replace(",", "."));
  if (isNaN(num)) return "";
  return num.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
