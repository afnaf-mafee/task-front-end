import { Link, useLocation } from "react-router-dom";

function HomeIcon({ active }) {
  const c = active ? "#c4b5fd" : "rgba(255,255,255,0.4)";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z"
        fill={active ? "rgba(167,139,250,0.25)" : "none"}
        stroke={c} strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M9 21V12h6v9" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}
function TeamIcon({ active }) {
  const c = active ? "#c4b5fd" : "rgba(255,255,255,0.4)";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      {/* Center person */}
      <circle cx="12" cy="8" r="4" fill={active ? "rgba(167,139,250,0.2)" : "none"} stroke={c} strokeWidth="1.6"/>
      <path d="M4 20c0-4 16-4 16 0" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>

      {/* Left person */}
      <circle cx="6" cy="10" r="3" fill={active ? "rgba(167,139,250,0.2)" : "none"} stroke={c} strokeWidth="1.6"/>
      <path d="M2 20c0-3 8-3 8 0" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>

      {/* Right person */}
      <circle cx="18" cy="10" r="3" fill={active ? "rgba(167,139,250,0.2)" : "none"} stroke={c} strokeWidth="1.6"/>
      <path d="M14 20c0-3 8-3 8 0" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}
function SupportIcon({ active }) {
  const c = active ? "#c4b5fd" : "rgba(255,255,255,0.4)";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      {/* Headset */}
      <path
        d="M4 12a8 8 0 0116 0v4a4 4 0 01-8 0"
        stroke={c}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Ear pieces */}
      <rect x="3" y="12" width="2" height="4" rx="1" fill={c} />
      <rect x="19" y="12" width="2" height="4" rx="1" fill={c} />
      {/* Chat bubble */}
      <path
        d="M8 10h8v4H8z"
        fill={active ? "rgba(167,139,250,0.2)" : "none"}
        stroke={c}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* Chat lines */}
      <path d="M9 11h6" stroke={c} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M9 13h4" stroke={c} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}
function AccountIcon({ active }) {
  const c = active ? "#c4b5fd" : "rgba(255,255,255,0.4)";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4"
        fill={active ? "rgba(167,139,250,0.2)" : "none"}
        stroke={c} strokeWidth="1.6"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

const NAV = [
  { id: "home", label: "Home", path: "/", Icon: HomeIcon },
  { id: "teams", label: "Teams", path: "/invite", Icon: TeamIcon },
  { id: "support", label: "Support", path: "/support", Icon: SupportIcon },
  { id: "account", label: "Account", path: "/account", Icon: AccountIcon },
];
export default function FloatingFooter() {
  const location = useLocation();

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 100,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 360,
          padding: "0 12px 16px",
          pointerEvents: "auto",
        }}
      >
        <div
          style={{
            position: "relative",
            borderRadius: 28,
            overflow: "hidden",
          }}
        >
          {/* Glass Layers */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(30,20,60,0.55)",
              backdropFilter: "blur(32px) saturate(200%)",
              WebkitBackdropFilter: "blur(32px) saturate(200%)",
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))",
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 28,
              border: "0.5px solid rgba(255,255,255,0.2)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
            }}
          />

          {/* NAV */}
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              padding: "10px 4px 14px",
            }}
          >
            {NAV.map(({ id, label, path, Icon }) => {
              const isActive = location.pathname === path;

              return (
                <Link
                  key={id}
                  to={path}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                    textDecoration: "none",
                    background: isActive
                      ? "rgba(167,139,250,0.12)"
                      : "transparent",
                    borderRadius: 16,
                    padding: "7px 14px 5px",
                  }}
                >
                  <Icon active={isActive} />

                  <span
                    style={{
                      fontSize: 13,
                      color: isActive
                        ? "#c4b5fd"
                        : "rgba(255,255,255,0.38)",
                    }}
                  >
                    {label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}