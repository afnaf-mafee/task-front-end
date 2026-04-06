export default function GlassCardV2({ children, style }) {
  return (
    <div
      style={{
        borderRadius: 20,
        background: "rgba(255,255,255,0.03)",
        border: "0.5px solid rgba(255,255,255,0.14)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
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