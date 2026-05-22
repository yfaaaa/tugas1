export default function Input({
  label,
  type = "text",
  placeholder,
  onChange,
  required = true,
}) {
  return (
    <div className="w-full space-y-1 text-left">
      <label className="text-sm font-medium text-white/60">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        className="w-full p-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-blue-500 backdrop-blur-md transition"
      />
    </div>
  );
}
