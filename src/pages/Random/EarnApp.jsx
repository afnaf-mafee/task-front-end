import { useState } from "react";

// ── SVG Icons ─────────────────────────────────────────────────────────────────

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
function TasksIcon({ active }) {
  const c = active ? "#c4b5fd" : "rgba(255,255,255,0.4)";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="16" height="16" rx="3"
        fill={active ? "rgba(167,139,250,0.2)" : "none"}
        stroke={c} strokeWidth="1.6"/>
      <path d="M8 12l2.5 2.5L16 9" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function WalletIcon({ active }) {
  const c = active ? "#c4b5fd" : "rgba(255,255,255,0.4)";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="7" width="20" height="14" rx="3"
        fill={active ? "rgba(167,139,250,0.2)" : "none"}
        stroke={c} strokeWidth="1.6"/>
      <circle cx="16" cy="14" r="1.2" fill={c}/>
      <path d="M2 11h20M6 7V5a2 2 0 012-2h8a2 2 0 012 2v2" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
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
  { id: "home",    label: "Home",    Icon: HomeIcon    },
  { id: "tasks",   label: "Tasks",   Icon: TasksIcon   },
  { id: "wallet",  label: "Wallet",  Icon: WalletIcon  },
  { id: "account", label: "Account", Icon: AccountIcon },
];

// ── Apple Glass Footer ────────────────────────────────────────────────────────

function GlassFooter({ active, onChange }) {
  return (
    <div style={{ padding: "0 12px 16px" }}>
      <div style={{ position: "relative", borderRadius: 28, overflow: "hidden" }}>

        {/* Layer 1 — frosted glass base */}
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(30,20,60,0.55)",
          backdropFilter: "blur(32px) saturate(200%) brightness(1.1)",
          WebkitBackdropFilter: "blur(32px) saturate(200%) brightness(1.1)",
        }} />

        {/* Layer 2 — subtle tint overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
        }} />

        {/* Layer 3 — border glow */}
        <div style={{
          position: "absolute", inset: 0,
          borderRadius: 28,
          border: "0.5px solid rgba(255,255,255,0.2)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15), 0 8px 40px rgba(0,0,0,0.35)",
        }} />

        {/* Layer 4 — specular top sheen */}
        <div style={{
          position: "absolute", top: 0, left: "8%", right: "8%", height: "45%",
          background: "linear-gradient(180deg, rgba(255,255,255,0.09) 0%, transparent 100%)",
          borderRadius: "28px 28px 50% 50%",
          pointerEvents: "none",
        }} />

        {/* Nav items */}
        <div style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "10px 4px 14px",
        }}>
          {NAV.map(({ id, label, Icon }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => onChange(id)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  background: isActive ? "rgba(167,139,250,0.12)" : "transparent",
                  border: isActive ? "0.5px solid rgba(167,139,250,0.25)" : "0.5px solid transparent",
                  borderRadius: 16,
                  padding: "7px 14px 5px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  minWidth: 60,
                }}
              >
                <Icon active={isActive} />
                <span style={{
                  fontSize: 10,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#c4b5fd" : "rgba(255,255,255,0.38)",
                  letterSpacing: "0.3px",
                  transition: "color 0.2s",
                }}>
                  {label}
                </span>
                {isActive && (
                  <div style={{
                    width: 4, height: 4, borderRadius: "50%",
                    background: "linear-gradient(135deg,#a78bfa,#38bdf8)",
                    marginTop: 1,
                  }} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Reusable Glass Card ───────────────────────────────────────────────────────

function GlassCard({ children, style }) {
  return (
    <div style={{
      borderRadius: 20,
      background: "rgba(255,255,255,0.06)",
      border: "0.5px solid rgba(255,255,255,0.14)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10)",
      padding: "14px 16px",
      ...style,
    }}>
      {children}
    </div>
  );
}

// ── Task Card ─────────────────────────────────────────────────────────────────

const TASKS_DATA = [
  { id: 1, icon: "🎮", title: "Play Game for 10 min",      reward: 1.00, label: "Play Now",      gradient: "linear-gradient(135deg,#7c3aed,#4f46e5)" },
  { id: 2, icon: "📷", title: "Submit a 30s Video Review", reward: 2.50, label: "Submit Review", gradient: "linear-gradient(135deg,#06b6d4,#3b82f6)" },
];

// ── Pages ─────────────────────────────────────────────────────────────────────

function HomePage({ balance, completed, onAction }) {
  return (
    <div style={{ flex:1, overflowY:"auto", padding:"24px 16px 0", display:"flex", flexDirection:"column", gap:14 }}>
      {/* Balance */}
      <GlassCard style={{ display:"flex", alignItems:"center", gap:12 }}>
        <div style={{
          width:40, height:40, borderRadius:"50%",
          background:"linear-gradient(135deg,#7c3aed,#4f46e5)",
          display:"flex", alignItems:"center", justifyContent:"center",
          color:"white", fontWeight:700, fontSize:14,
          border:"2px solid rgba(167,139,250,0.5)", flexShrink:0,
        }}>U</div>
        <span style={{ color:"white", fontWeight:600, fontSize:15 }}>
          Balance: <span style={{ color:"#4ade80", fontWeight:800 }}>${balance.toFixed(2)}</span>
        </span>
      </GlassCard>

      {/* Greeting */}
      <div>
        <h1 style={{ color:"white", fontSize:24, fontWeight:800, margin:0 }}>Welcome, User!</h1>
        <p style={{ color:"rgba(255,255,255,0.45)", fontSize:13, marginTop:3, marginBottom:0 }}>Complete tasks and earn rewards</p>
      </div>

      <p style={{ color:"rgba(255,255,255,0.5)", fontSize:10, fontWeight:700, letterSpacing:"1.4px", textTransform:"uppercase", margin:0 }}>Today's Tasks</p>

      {TASKS_DATA.map(task => (
        <div key={task.id} style={{ position:"relative", borderRadius:18, overflow:"hidden" }}>
          <div style={{
            background: task.gradient,
            borderRadius:18, padding:"14px 16px",
            display:"flex", alignItems:"center", gap:12,
            boxShadow:"inset 0 1px 0 rgba(255,255,255,0.2)",
          }}>
            <div style={{
              width:48, height:48, borderRadius:14, fontSize:22,
              background:"rgba(255,255,255,0.18)",
              display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
            }}>{task.icon}</div>
            <div style={{ flex:1 }}>
              <p style={{ color:"white", fontWeight:700, fontSize:13, margin:0 }}>{task.title}</p>
              <p style={{ color:"rgba(255,255,255,0.95)", fontWeight:800, fontSize:20, margin:"2px 0 0" }}>${task.reward.toFixed(2)}</p>
            </div>
            <button
              onClick={() => onAction(task)}
              disabled={completed.includes(task.id)}
              style={{
                background:"rgba(255,255,255,0.88)", border:"none", borderRadius:12,
                padding:"8px 14px", color:"#312e81", fontWeight:700, fontSize:12,
                cursor: completed.includes(task.id) ? "default" : "pointer",
                opacity: completed.includes(task.id) ? 0.5 : 1,
                whiteSpace:"nowrap",
              }}
            >
              {completed.includes(task.id) ? "✅ Done" : task.label}
            </button>
          </div>
        </div>
      ))}

      {/* Progress */}
      <GlassCard style={{ display:"flex", alignItems:"center", gap:10 }}>
        <span style={{ color:"rgba(255,255,255,0.55)", fontSize:13, whiteSpace:"nowrap" }}>
          Daily Progress: {completed.length}/{TASKS_DATA.length}
        </span>
        <div style={{ flex:1, height:6, background:"rgba(255,255,255,0.1)", borderRadius:99, overflow:"hidden" }}>
          <div style={{
            height:"100%",
            width:`${(completed.length / TASKS_DATA.length) * 100}%`,
            background:"linear-gradient(90deg,#facc15,#f97316)",
            borderRadius:99,
            transition:"width 0.7s cubic-bezier(.34,1.56,.64,1)",
          }} />
        </div>
        <span style={{ fontSize:16 }}>⭐</span>
      </GlassCard>
    </div>
  );
}

function TasksPage({ completed, onAction }) {
  return (
    <div style={{ flex:1, overflowY:"auto", padding:"24px 16px 0", display:"flex", flexDirection:"column", gap:12 }}>
      <h1 style={{ color:"white", fontSize:22, fontWeight:800, margin:0 }}>All Tasks</h1>
      <p style={{ color:"rgba(255,255,255,0.45)", fontSize:13, margin:"0 0 4px" }}>Earn by completing challenges</p>
      {TASKS_DATA.map(task => (
        <GlassCard key={task.id} style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{
            width:46, height:46, borderRadius:14, fontSize:20,
            background: task.gradient,
            display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
          }}>{task.icon}</div>
          <div style={{ flex:1 }}>
            <p style={{ color:"white", fontWeight:600, fontSize:14, margin:0 }}>{task.title}</p>
            <p style={{ color:"#4ade80", fontWeight:700, fontSize:16, margin:"3px 0 0" }}>${task.reward.toFixed(2)}</p>
          </div>
          <button
            onClick={() => onAction(task)}
            disabled={completed.includes(task.id)}
            style={{
              background: completed.includes(task.id) ? "rgba(74,222,128,0.12)" : "rgba(167,139,250,0.18)",
              border: `0.5px solid ${completed.includes(task.id) ? "rgba(74,222,128,0.4)" : "rgba(167,139,250,0.4)"}`,
              borderRadius:10, padding:"7px 14px",
              color: completed.includes(task.id) ? "#4ade80" : "#c4b5fd",
              fontWeight:600, fontSize:12, cursor:"pointer",
            }}
          >
            {completed.includes(task.id) ? "Done" : "Start"}
          </button>
        </GlassCard>
      ))}
    </div>
  );
}

function WalletPage({ balance }) {
  const history = [
    { label:"Video Review",   amount:2.50, time:"2h ago"    },
    { label:"Game Session",   amount:1.00, time:"5h ago"    },
    { label:"Sign-up Bonus",  amount:5.00, time:"Yesterday" },
    { label:"Referral Reward",amount:7.00, time:"3 days ago"},
  ];
  return (
    <div style={{ flex:1, overflowY:"auto", padding:"24px 16px 0", display:"flex", flexDirection:"column", gap:14 }}>
      <GlassCard style={{
        textAlign:"center",
        background:"linear-gradient(135deg,rgba(99,102,241,0.28),rgba(6,182,212,0.18))",
        border:"0.5px solid rgba(167,139,250,0.3)",
      }}>
        <p style={{ color:"rgba(255,255,255,0.55)", fontSize:11, letterSpacing:"1.4px", textTransform:"uppercase", margin:"0 0 6px" }}>Total Balance</p>
        <p style={{ color:"white", fontSize:40, fontWeight:800, margin:0 }}>${balance.toFixed(2)}</p>
        <button style={{
          marginTop:14, background:"linear-gradient(135deg,#7c3aed,#4f46e5)",
          border:"none", borderRadius:12, padding:"10px 32px",
          color:"white", fontWeight:700, fontSize:14, cursor:"pointer",
          boxShadow:"0 4px 20px rgba(99,102,241,0.45)",
        }}>Withdraw</button>
      </GlassCard>
      <p style={{ color:"rgba(255,255,255,0.5)", fontSize:10, fontWeight:700, letterSpacing:"1.4px", textTransform:"uppercase", margin:0 }}>Recent Activity</p>
      {history.map((h, i) => (
        <GlassCard key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 16px" }}>
          <div>
            <p style={{ color:"white", fontWeight:600, fontSize:14, margin:0 }}>{h.label}</p>
            <p style={{ color:"rgba(255,255,255,0.38)", fontSize:12, margin:"2px 0 0" }}>{h.time}</p>
          </div>
          <span style={{ color:"#4ade80", fontWeight:700, fontSize:16 }}>+${h.amount.toFixed(2)}</span>
        </GlassCard>
      ))}
    </div>
  );
}

function AccountPage() {
  const items = [
    { label:"Edit Profile",    danger:false },
    { label:"Notifications",   danger:false },
    { label:"Privacy",         danger:false },
    { label:"Help & Support",  danger:false },
    { label:"Log Out",         danger:true  },
  ];
  return (
    <div style={{ flex:1, overflowY:"auto", padding:"24px 16px 0", display:"flex", flexDirection:"column", gap:12 }}>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:10, paddingBottom:8 }}>
        <div style={{
          width:72, height:72, borderRadius:"50%",
          background:"linear-gradient(135deg,#7c3aed,#4f46e5)",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:28, color:"white", fontWeight:700,
          border:"3px solid rgba(167,139,250,0.5)",
          boxShadow:"0 0 0 6px rgba(124,58,237,0.12)",
        }}>U</div>
        <p style={{ color:"white", fontWeight:700, fontSize:18, margin:0 }}>User Name</p>
        <p style={{ color:"rgba(255,255,255,0.42)", fontSize:13, margin:0 }}>user@example.com</p>
      </div>
      {items.map((item, i) => (
        <GlassCard key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer" }}>
          <span style={{ color: item.danger ? "#f87171" : "white", fontWeight:500, fontSize:14 }}>{item.label}</span>
          <span style={{ color:"rgba(255,255,255,0.25)", fontSize:18 }}>›</span>
        </GlassCard>
      ))}
    </div>
  );
}

// ── Root App ──────────────────────────────────────────────────────────────────

export default function EarnApp() {
  const [balance, setBalance]     = useState(15.50);
  const [completed, setCompleted] = useState([]);
  const [page, setPage]           = useState("home");

  const handleAction = (task) => {
    if (completed.includes(task.id)) return;
    setBalance(b => parseFloat((b + task.reward).toFixed(2)));
    setCompleted(c => [...c, task.id]);
  };

  const renderPage = () => {
    switch (page) {
      case "home":    return <HomePage   balance={balance} completed={completed} onAction={handleAction} />;
      case "tasks":   return <TasksPage  completed={completed} onAction={handleAction} />;
      case "wallet":  return <WalletPage balance={balance} />;
      case "account": return <AccountPage />;
    }
  };

  return (
    <div style={{
      minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      background:"#0a0614",
      fontFamily:"-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
    }}>
      {/* Phone shell */}
      <div style={{
        width:360, height:720, borderRadius:44, overflow:"hidden",
        background:"linear-gradient(160deg,#1e1b4b 0%,#0f172a 55%,#1a1035 100%)",
        boxShadow:"0 0 100px rgba(99,102,241,0.18), 0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)",
        display:"flex", flexDirection:"column", position:"relative",
      }}>
        {/* Ambient blobs */}
        <div style={{ position:"absolute", top:-50, right:-50, width:200, height:200, borderRadius:"50%", background:"rgba(124,58,237,0.15)", filter:"blur(60px)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:180, left:-40, width:150, height:150, borderRadius:"50%", background:"rgba(6,182,212,0.08)", filter:"blur(50px)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:120, right:-30, width:130, height:130, borderRadius:"50%", background:"rgba(99,102,241,0.1)", filter:"blur(40px)", pointerEvents:"none" }} />

        {/* Status bar */}
        <div style={{ display:"flex", justifyContent:"space-between", padding:"14px 24px 0", position:"relative", zIndex:1 }}>
          <span style={{ color:"rgba(255,255,255,0.65)", fontSize:12, fontWeight:600 }}>9:41</span>
          <div style={{ display:"flex", gap:5, alignItems:"center" }}>
            <span style={{ color:"rgba(255,255,255,0.5)", fontSize:11 }}>▲▲▲</span>
          </div>
        </div>

        {/* Page content */}
        {/* <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", position:"relative", zIndex:1 }}>
          {renderPage()}
        </div> */}

        {/* ✅ Apple Glass Footer — rendered on EVERY page */}
        <div style={{ position:"relative", zIndex:10 }}>
          <GlassFooter active={page} onChange={setPage} />
        </div>
      </div>
    </div>
  );
}