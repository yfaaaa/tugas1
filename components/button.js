export default function Button({
  children,
  type = "submit",
  variant = "primary",
}) {
  const colors = {
    primary: "bg-blue-600 hover:bg-blue-700",
    success: "bg-green-600 hover:bg-green-700",
    danger: "bg-red-600 hover:bg-red-700",
  };

  return (
    <button
      type={type}
      className={`w-full py-3 ${colors[variant]} rounded-xl font-semibold text-white tracking-wide shadow-lg transition transform active:scale-95`}
    >
      {children}
    </button>
  );
}
