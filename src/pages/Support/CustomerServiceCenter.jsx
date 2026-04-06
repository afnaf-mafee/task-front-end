import React from "react";
import {
  Headset,
  MessageCircle,
  Zap,
  Send,
  BookOpen,
  Bell,
} from "lucide-react";
import { motion } from "framer-motion";
import GlassCard from "../../components/GlassCard/GlassCard";
const CustomerServiceCenter = () => {
  return (
    <div className="min-h-full text-white px-4 py-6 relative font-urbanist">
      {/* HEADER GRADIENT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-gradient-to-b from-indigo-600/80 to-purple-700/40
  backdrop-blur-xl rounded-3xl p-6 text-center shadow-xl
  border border-white/10"
      >
        <div className="inline-flex items-center bg-white/10 backdrop-blur-md px-3 py-1 rounded-full mb-4">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
          <span className="text-xs">Online Service</span>
        </div>

        <h1 className="text-xl font-bold mb-1">Customer Service Center</h1>

        <p className="text-white/60 text-sm mb-6">We are here to help you</p>

        {/* Floating Icons */}
        <div className="flex justify-center gap-4">
          {[Headset, MessageCircle, Zap].map((Icon, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -8, 0],
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
              className="w-12 h-12 rounded-full
      bg-white/10 backdrop-blur-xl
      flex items-center justify-center
      shadow-lg shadow-indigo-500/20"
            >
              <Icon size={22} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* SUPPORT CARD */}
      <GlassCard className="mt-6 relative p-5 space-y-6">
        {/* Top Section: Avatar + Info */}
        <div className="flex gap-4 items-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden border border-indigo-400">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                alt="Support"
                className="w-full h-full"
              />
            </div>

            {/* Online Badge */}
            <div
              className="absolute -bottom-1 left-1/2 -translate-x-1/2
        bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-full"
            >
              <span className="text-[10px] text-green-400 font-bold">
                Online
              </span>
            </div>
          </div>

          {/* Info Text */}
          <div>
            <h2 className="font-bold text-lg leading-tight">
              HI~ I am online customer service!
            </h2>
            <p className="text-white/50 text-xs my-3">
              Contact customer service if you have any questions~
            </p>
          </div>
        </div>

        {/* Contact Button */}
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 25px rgba(99,102,241,0.6)",
          }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "0px 0px 10px rgba(99,102,241,0.3)",
              "0px 0px 25px rgba(99,102,241,0.6)",
              "0px 0px 10px rgba(99,102,241,0.3)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-full py-3 rounded-full font-bold
      bg-gradient-to-r from-indigo-500 to-purple-600 relative z-10"
        >
          Contact Now ⚡
        </motion.button>
      </GlassCard>

      {/* QUICK SERVICES */}
      <div className="mt-8">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-12 bg-white/20" />
          <span className="text-indigo-400 text-sm font-bold uppercase">
            Quick Services
          </span>
          <div className="h-px w-12 bg-white/20" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <ServiceCard
            icon={<Send size={20} />}
            title="telegram group"
            desc="Join community"
          />

          <ServiceCard
            icon={<Send size={20} />}
            title="telegram channel"
            desc="Latest updates"
          />

          <ServiceCard
            icon={<BookOpen size={20} />}
            title="Platform Guide"
            desc="Learn system"
          />
        </div>

        {/* 24/7 Banner */}
        <div
          className="mt-6 bg-white/5 backdrop-blur-xl
          border border-white/10
          rounded-xl p-3 flex items-center gap-3"
        >
          <div className="bg-indigo-500/20 p-2 rounded-full">
            <Bell size={18} className="text-indigo-400" />
          </div>

          <span className="text-sm text-white/70">
            7×24 hours online, always at your service
          </span>
        </div>
      </div>
    </div>
  );
};

const ServiceCard = ({ icon, title, desc }) => (
  <div
    className="bg-white/5 backdrop-blur-xl
    border border-white/10
    rounded-2xl p-4 text-center
    hover:bg-white/10 transition"
  >
    <div
      className="w-10 h-10 mx-auto rounded-xl
      flex items-center justify-center
      bg-gradient-to-br from-indigo-500 to-purple-600
      shadow-lg shadow-indigo-500/30 mb-3"
    >
      {icon}
    </div>

    <h3 className="text-xs font-bold uppercase mb-1">{title}</h3>

    {/* <p className="text-[10px] text-white/50 mb-3">{desc}</p> */}

    <button
      className="text-[10px] font-bold ppy-1 rounded-full
      text-indigo-300 "
    >
      Join Now →
    </button>
  </div>
);

export default CustomerServiceCenter;
