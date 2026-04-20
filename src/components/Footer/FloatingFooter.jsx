import { Link, useLocation } from "react-router-dom";

/* ================= ICONS ================= */

function HomeIcon({ active }) {
  const c = active ? "#c4b5fd" : "rgba(255,255,255,0.4)";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z"
        fill={active ? "rgba(167,139,250,0.25)" : "none"}
        stroke={c}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9 21V12h6v9"
        stroke={c}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TeamIcon({ active }) {
  const c = active ? "#c4b5fd" : "rgba(255,255,255,0.4)";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4"
        fill={active ? "rgba(167,139,250,0.2)" : "none"}
        stroke={c} strokeWidth="1.6"/>
      <path d="M4 20c0-4 16-4 16 0"
        stroke={c} strokeWidth="1.6" strokeLinecap="round"/>

      <circle cx="6" cy="10" r="3"
        fill={active ? "rgba(167,139,250,0.2)" : "none"}
        stroke={c} strokeWidth="1.6"/>
      <path d="M2 20c0-3 8-3 8 0"
        stroke={c} strokeWidth="1.6" strokeLinecap="round"/>

      <circle cx="18" cy="10" r="3"
        fill={active ? "rgba(167,139,250,0.2)" : "none"}
        stroke={c} strokeWidth="1.6"/>
      <path d="M14 20c0-3 8-3 8 0"
        stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

function SupportIcon({ active }) {
  const c = active ? "#c4b5fd" : "rgba(255,255,255,0.4)";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 12a8 8 0 0116 0v4a4 4 0 01-8 0"
        stroke={c}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <rect x="3" y="12" width="2" height="4" rx="1" fill={c}/>
      <rect x="19" y="12" width="2" height="4" rx="1" fill={c}/>
      <path
        d="M8 10h8v4H8z"
        fill={active ? "rgba(167,139,250,0.2)" : "none"}
        stroke={c}
        strokeWidth="1.6"
      />
      <path d="M9 11h6" stroke={c} strokeWidth="1.2"/>
      <path d="M9 13h4" stroke={c} strokeWidth="1.2"/>
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
      <path
        d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
        stroke={c}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function VideoIcon({ active }) {
  const c = active ? "#c4b5fd" : "rgba(255,255,255,0.4)";

  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      {/* video frame */}
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="3"
        fill={active ? "rgba(167,139,250,0.15)" : "none"}
        stroke={c}
        strokeWidth="1.6"
      />

      {/* play button */}
      <path
        d="M10 9l5 3-5 3V9z"
        fill={c}
      />
    </svg>
  );
}

/* ================= NAV ================= */

const NAV = [
  { id: "home", label: "Home", path: "/", Icon: HomeIcon },
  { id: "teams", label: "Teams", path: "/invite", Icon: TeamIcon },
  { id: "support", label: "Support", path: "/support", Icon: SupportIcon },
   { id: "tutorial", label: "Tutorial", path: "/tutorial", Icon: VideoIcon },
  { id: "account", label: "Account", path: "/account", Icon: AccountIcon },
 
];

export default function FloatingFooter() {
  const location = useLocation();

  return (
    <div  className="fixed bottom-3 left-0 w-full flex justify-center pointer-events-none z-[9999] px-2">

      <div className="w-full   pointer-events-auto ">

        {/* Glass Container */}
        <div className="relative rounded-[28px] overflow-hidden  " >

          {/* glass blur */}
          <div className="absolute inset-0  backdrop-blur-3xl "/>

         

          {/* border + shadow */}
          <div className="absolute inset-0 rounded-[28px] border border-white/20 shadow-[0_8px_40px_rgba(0,0,0,0.35)]"/>

          {/* NAV */}
          <div className="relative flex justify-around items-center  pt-2 pb-3 px-2 ">

            {NAV.map(({ id, label, path, Icon }) => {
              const isActive = location.pathname === path;

              return (
                <Link
                  key={id}
                  to={path}
                  className={`flex flex-col items-center gap-1 rounded-xl px-3 py-1 transition-all duration-300
                  ${
                    isActive
                      ? "bg-purple-400/10 text-white"
                      : "text-white/70"
                  }`}
                >
                  <Icon active={isActive} />

                  <span className="text-[13px]">
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