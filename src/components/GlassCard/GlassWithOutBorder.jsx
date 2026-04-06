export default function GlassWithOutBorder({ children, className }) {
  return (
    <div
      className={`
      bg-white/5 backdrop-blur-xl rounded-3xl shadow-xl p-4 
        ${className || ""}
      `}
    >
      {/* Gradient Glow Border */}
      <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-500/10 blur opacity-30"></div>

      {/* Card Content */}
      <div className="relative ">{children}</div>
    </div>
  );
}
