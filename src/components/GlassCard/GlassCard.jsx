export default function GlassCard({ children, style }) {
  return (
    <div
      style={{
        borderRadius: 20,
        background: "rgba(255,255,255,0.06)",
        border: "0.5px solid rgba(255,255,255,0.14)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10)",
        padding: "14px 16px",
        marginTop:"24px" ,
        ...style,
      }}
    >
      {" "}
      {children}{" "}
    </div>
  );
}
