import React from "react";
import {
  ArrowRight,
  Wallet,
  TrendingUp,
  ClipboardList,
  Trophy,
  MessageCircle,
  Users,
  Lock,
  Bell,
  Clock,
} from "lucide-react";
import useAuthData from "../../hooks/useAuthData";
import { useGetUserBalanceQuery } from "../../redux/services/auth/authApiService";
import toast from "react-hot-toast";

const Account = () => {
  const { user } = useAuthData();
  const { data: balanceData, isLoading, isFetching } = useGetUserBalanceQuery(
    user?.userId,
    { skip: !user?.userId }
  );

  const balance = balanceData?.available_balance ?? 0;
  const loading = isLoading || isFetching;

  return (
    <div className="min-h-screen bg-[#0f0e21] flex justify-center text-white">
      <div className="w-full max-w-md bg-gradient-to-br from-[#1e1b4b] via-[#0f172a] to-[#1a1035] shadow-2xl rounded-[40px] relative">
        {/* Header Section */}
        <div className="bg-gradient-to-br from-purple-700 to-indigo-900 pt-8 pb-24 px-6 rounded-b-[40px] relative">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-white text-xl font-bold">
              {loading ? <Skeleton className="w-32 h-6" /> : "My Profile"}
            </h1>
            <div className="flex gap-3">
              <div className="bg-white/20 p-2 rounded-full text-white cursor-pointer hover:bg-white/30">
                <Clock size={20} />
              </div>
              <div className="bg-white/20 p-2 rounded-full text-white relative cursor-pointer hover:bg-white/30">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full border border-white"></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 bg-pink-300 rounded-full border-2 border-white overflow-hidden shadow-inner">
                {loading ? (
                  <Skeleton className="w-full h-full rounded-full" />
                ) : (
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              {!loading && (
                <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div>
              <h2 className="text-white font-bold text-lg truncate w-48 tracking-tight">
                {loading ? <Skeleton className="w-32 h-5" /> : user?.email}
              </h2>
              <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 mt-1 border border-white/20 w-fit">
                {loading ? (
                  <Skeleton className="w-12 h-4" />
                ) : (
                  <>
                    <strong className="text-white text-xs font-semibold">
                      {user?.userId}
                    </strong>
                    <span className="text-yellow-300 text-[10px]">🎫</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Balance Card Section */}
     <div className="px-4 relative z-10 -mt-12">
  <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-xl p-6 border-l-[6px] border-purple-600">
    {/* Header */}
    <div className="flex justify-between items-center mb-3">
      <div className="flex items-center gap-2">
        <span className="text-gray-200 text-sm font-medium">Account Balance</span>
      </div>
      <span className="bg-purple-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
        LEVEL ONE
      </span>
    </div>

    {/* Balance */}
    <div className="mb-5 flex items-baseline gap-2">
      {loading ? (
        <Skeleton className="w-32 h-10" />
      ) : (
        <span className="text-5xl font-black text-white tracking-tighter">
          {balance} $
        </span>
      )}
    </div>

    {/* Cash Value & Today */}
    <div className="flex border-t border-gray-600 pt-4 mb-6">
      <div className="w-1/2 border-r border-gray-600">
        <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Cash Value</p>
        <p className="font-extrabold text-white text-xl">
          {loading ? <Skeleton className="w-12 h-6 inline-block" /> : "24.4"}{" "}
          <span className="text-base font-normal">৳</span>
        </p>
      </div>
      <div className="w-1/2 pl-6">
        <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Today</p>
        <p className="font-extrabold text-purple-500 text-xl">
          {loading ? <Skeleton className="w-10 h-6" /> : "+20.00"}
        </p>
      </div>
    </div>

    {/* Withdraw Button */}
    <button
      className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-bold rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={() => toast.success('Taka Nen')}
    >
      Withdraw
    </button>
  </div>
</div>

        {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-2 px-4 mt-8 text-center">
  {[
    {
      icon: <Wallet size={24} className="text-orange-400" />,
      label: "Withdraw",
      color: "bg-white/5",
    },
    {
      icon: <TrendingUp size={24} className="text-green-400" />,
      label: "Revenue",
      color: "bg-white/5",
    },
    {
      icon: <ClipboardList size={24} className="text-red-400" />,
      label: "Orders",
      color: "bg-white/5",
    },
    {
      icon: <Trophy size={24} className="text-yellow-400" />,
      label: "Ranking",
      color: "bg-white/5",
    },
  ].map((item, idx) => (
    <div key={idx} className="flex flex-col items-center group cursor-pointer">
      <div
        className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-2 shadow-md group-hover:scale-105 transition-transform`}
      >
        {item.icon}
      </div>
      <span className="text-[11px] font-bold text-gray-200">{item.label}</span>
    </div>
  ))}
</div>
        {/* More Services */}
        <div className="mt-10 px-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-6 bg-purple-600 rounded-full"></div>
            <h3 className="font-black text-gray-200 text-lg">
              {loading ? <Skeleton className="w-24 h-5" /> : "More Services"}
            </h3>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-gray-700 divide-y divide-gray-700 overflow-hidden shadow-sm">
            {[1, 2, 3].map((_, idx) =>
              loading ? (
                <Skeleton key={idx} className="w-full h-16" />
              ) : null
            )}
            {!loading && (
              <>
                <ServiceItem
                  icon={<MessageCircle className="text-blue-400" />}
                  bg="bg-white/7"
                  title="Bound WhatsApp number"
                  subtitle="WhatsApp"
                />
                <ServiceItem
                  icon={<Users className="text-green-400" />}
                  bg="bg-white/7"
                  title="My lower level"
                  subtitle="Team"
                />
                <ServiceItem
                  icon={<Lock className="text-orange-400" />}
                  bg="bg-white/7"
                  title="Change Password"
                  subtitle="Security"
                />
              </>
            )}
          </div>
        </div>

        {/* Logout */}
        <div className="p-6 mt-4 pb-10">
          <button className="relative z-10 w-full flex items-center justify-center gap-2 px-4 py-4 rounded-2xl text-white font-black bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 hover:shadow-[0_0_20px_rgba(139,92,246,0.7)] transition-all duration-300 active:scale-95">
            Log out
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-600/50 rounded-md ${className}`}></div>
);

const ServiceItem = ({ icon, title, subtitle, bg }) => (
  <div className="flex items-center justify-between p-5 hover:bg-white/10 transition-colors cursor-pointer group">
    <div className="flex items-center gap-4">
      <div className={`${bg} p-3 rounded-2xl group-hover:scale-110 transition-transform`}>
        {React.cloneElement(icon, { size: 22 })}
      </div>
      <div>
        <p className="text-sm font-bold text-white leading-tight">{title}</p>
        <p className="text-xs text-gray-300 font-medium">{subtitle}</p>
      </div>
    </div>
    <ArrowRight size={18} className="text-gray-400 group-hover:text-red-400 transition-colors" />
  </div>
);

export default Account;