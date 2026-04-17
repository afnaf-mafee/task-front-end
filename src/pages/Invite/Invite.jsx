import React from "react";
import { Gift, DollarSign, Share2, Copy } from "lucide-react";
import toast from "react-hot-toast";
import GlassCard from "../../components/GlassCard/GlassCard";
import GlassWithOutBorder from "../../components/GlassCard/GlassWithOutBorder";
import useAuthData from "../../hooks/useAuthData";

const Invite = () => {

  const {user} = useAuthData()
  // const referralLink = `http://www.vistatrust.online/signup?invite=${user?.userId}`;
  const referralLink = `http://localhost:5173/signup?invite=${user?.userId}`;
  const referralCode = user?.userId;

  // ✅ Copy Function
  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied ✅");
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="min-h-full px-4 py-6 text-white font-urbanist">
      {/* HEADER */}
      <div className="text-center ">
        <div
          className="w-24 h-24 mx-auto rounded-full
          bg-white/5 backdrop-blur-xl
          flex items-center justify-center
          border border-white/20 shadow-lg"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/6453/6453565.png"
            width={65}
          />
        </div>

        <p className="text-sm opacity-70 mt-4">
          After each successful invitation of a new user
        </p>

        <h2 className="text-3xl font-bold mt-2">Cash Rewards</h2>
      </div>

      {/* INVITE EARNING */}
      {/* <div className="glass-card space-y-5">
        <div className="flex items-center gap-2 text-indigo-300 font-semibold">
          <DollarSign size={18} />
          Invitation Earnings
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="reward-box">
            <h3 className="text-xl font-bold">৳122</h3>
            <p className="text-xs opacity-70">Invite Reward</p>
          </div>

          <div className="reward-box">
            <h3 className="text-xl font-bold">৳122</h3>
            <p className="text-xs opacity-70">Stage Reward</p>
          </div>
        </div>
      </div> */}

      {/* REFERRAL LINK */}
      <GlassCard className="mt-2 relative">
        {/* Title */}
        <div className="flex items-center gap-2 text-indigo-300 font-semibold">
          <Share2 size={18} />
          Referral Link
        </div>

        {/* Referral Link Box */}
        <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-xl px-3 py-3 relative z-10">
          <p className="text-xs truncate ">{referralLink}</p>

          {/* Copy Button */}
          <button
            onClick={() => handleCopy(referralLink)}
            className="glass-button cursor-pointer"
          >
            <Copy size={16} /> Copy
          </button>
        </div>

        {/* Referral Code */}
        <div className="relative z-10">
          <p className="text-sm opacity-60 mb-2">Referral Code</p>

          <div className="flex justify-between items-center border border-dashed border-indigo-400/40 rounded-xl px-4 py-3 bg-white/5">
            <span className="tracking-widest font-semibold text-indigo-300">
              {referralCode}
            </span>

            {/* Copy Icon */}
            <Copy
              onClick={() => handleCopy(referralCode)}
              className="cursor-pointer text-indigo-300 hover:scale-110 transition"
            />
          </div>
        </div>
      </GlassCard>

      {/* NOTICE */}
      <div className="relative mt-6 text-center text-sm text-indigo-200/80 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20 p-4 shadow-inner">
        💡 Invite friends to link WhatsApp for at least 24 hours, you will get
        referral bonus and 20% commissions.
      </div>

      {/* SHARE */}
      <GlassWithOutBorder className="mt-6">
        <h3 className="text-indigo-300 font-semibold mb-4">Share to Earn</h3>

        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            {
              name: "WhatsApp",
              img: "https://cdn-icons-png.flaticon.com/512/15713/15713434.png",
            },
            {
              name: "Telegram",
              img: "https://cdn-icons-png.flaticon.com/512/2111/2111646.png",
            },
            {
              name: "Facebook",
              img: "https://cdn-icons-png.flaticon.com/512/733/733547.png",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="share-btn flex flex-col justify-center items-center cursor-pointer"
            >
              <img src={item.img} className="w-8 mx-auto mb-2" />
              <p className="text-[14px]">{item.name}</p>
            </div>
          ))}
        </div>
      </GlassWithOutBorder>
    </div>
  );
};

export default Invite;
