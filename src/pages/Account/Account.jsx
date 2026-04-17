import React, { useEffect, useState } from "react";
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
  Copy,
} from "lucide-react";
import useAuthData from "../../hooks/useAuthData";
import { useGetUserBalanceQuery } from "../../redux/services/auth/authApiService";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { data, useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/auth/authSlice";
import { useGetOfferQuery } from "../../redux/services/offer/offerApiServices";
import { Modal } from "antd";
import { TbCreditCardPay } from "react-icons/tb";
import { TfiGift } from "react-icons/tfi";
import { HiOutlineGiftTop } from "react-icons/hi2";
import { useGetNotificationsQuery } from "../../redux/services/notification/notificationApiServices";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const Account = () => {
  const { user } = useAuthData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openNotification, setOpenNotification] = useState(false);

  const [openOffer, setOpenOffer] = useState(false);
  const [accountOffer, setAccountOffer] = useState(null);
  const {
    data: balanceData,
    isLoading,
    isFetching,
  } = useGetUserBalanceQuery(user?.userId, { skip: !user?.userId });
  const { data: offer } = useGetOfferQuery();
  const { data: notificationData } = useGetNotificationsQuery(user?.userId);
  console.log(notificationData);

  const offerData = offer?.data || [];
  const balance = balanceData?.available_balance ?? 0;
  const loading = isLoading || isFetching;

  // logout
  const handleLogout = () => {
    dispatch(logout()); // ✅ clear redux + localStorage
    navigate("/login"); // ✅ redirect user
  };
  const filteredNotifications = notificationData?.data?.filter(
    (item) =>
      item.userId === "all" ||
      item.userId === user?.userId ||
      (Array.isArray(item.userIds) && item.userIds.includes(user?.userId)),
  );
  // copy userId to clipboard
  const copyUserId = () => {
    if (user?.userId) {
      navigator.clipboard.writeText(user.userId);
      toast.success("User ID copied!");
    }
  };
  // ✅ Filter Offer For Home
  useEffect(() => {
    if (!offerData.length) return;

    const filteredOffer = offerData.find((item) => item.showOn === "Home");
    

    if (filteredOffer) {
      setAccountOffer(filteredOffer);
      // setOpenOffer(true);
    }
  }, [offerData]);
  return (
    <div className="min-h-screen bg-[#0f0e21] flex justify-center text-white">
      <div className="w-full max-w-md bg-gradient-to-br from-[#1e1b4b] via-[#0f172a] to-[#1a1035] shadow-2xl rounded-[40px] relative">
        {/* Header Section */}
        <div className="relative bg-gradient-to-br from-purple-700 to-indigo-900 pt-8 pb-24 px-6 rounded-b-[40px] overflow-hidden">
          {/* Small box grid background */}
          <div className="absolute inset-0 grid grid-cols-20 grid-rows-20 opacity-6 pointer-events-none">
            {Array.from({ length: 400 }).map((_, i) => (
              <div key={i} className="border border-white/20"></div>
            ))}
          </div>

          {/* Header content */}
          <div className="relative z-10 flex justify-between items-center mb-6">
            <h1 className="text-white text-xl font-bold">
              {loading ? <Skeleton className="w-32 h-6" /> : "My Profile"}
            </h1>
            <div className="flex gap-3">
              <div onClick={() => navigate("/invoice")} className="bg-white/20 p-2 rounded-full text-white cursor-pointer hover:bg-white/30">
                <Clock size={20} />
              </div>
              <div
                onClick={() => setOpenNotification(true)}
                className="bg-white/20 p-2 rounded-full text-white relative cursor-pointer hover:bg-white/30"
              >
                <Bell size={20} />

                {/* unread notification dot */}
                <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 flex items-center justify-center bg-yellow-400 text-black text-[10px] font-bold rounded-full border border-white shadow-lg animate-pulse font-bold">
                  {filteredNotifications?.length}
                </span>
              </div>
            </div>
          </div>

          {/* Profile info */}
          <div className="relative z-10 flex items-center gap-4">
            <div className="relative">
              {/* Avatar */}
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

              {/* Online Dot */}
              {!loading && (
                <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              )}

              {/* 🔥 Floating Level Badge */}
              {!loading && (
                <div
                  className="absolute -top-3 -right-3 px-3 py-1 rounded-full 
    bg-gradient-to-r  via-pink-500 to-purple-600  
    text-white text-[10px] font-extrabold tracking-wide 
    shadow-[0_0_12px_rgba(236,72,153,0.8)] 
    animate-bounce border border-white/30 backdrop-blur-md"
                >
                  ⭐ LEVEL 1
                </div>
              )}
            </div>

            <div>
              <h2 className="text-white font-bold text-lg truncate w-48 tracking-tight">
                {loading ? (
                  <Skeleton className="w-32 h-5" />
                ) : user?.email ? (
                  user.email
                ) : user?.phone ? (
                  user.phone
                ) : (
                  "No contact info"
                )}
              </h2>

              {/* User ID */}
              <div
                onClick={copyUserId}
                className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 mt-1 border border-white/20 w-fit cursor-pointer select-none"
              >
                {loading ? (
                  <Skeleton className="w-12 h-4" />
                ) : (
                  <>
                    <strong className="text-white text-[18px] font-semibold">
                      {user?.userId}
                    </strong>
                    <span className="text text-[10px]">
                      <Copy size={16} />
                    </span>
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
                <span className="text-gray-200 text-sm font-medium">
                  Account Balance
                </span>
              </div>
              {/* <span className="bg-purple-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                LEVEL ONE
              </span> */}
            </div>

            {/* Balance + Withdraw */}
            <div className="flex justify-between items-center mb-5">
              {loading ? (
                <Skeleton className="w-32 h-10" />
              ) : (
                <span className="text-3xl font-black text-white tracking-tighter">
                  {balance} $
                </span>
              )}

              <button
                className="ml-3 px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-500 text-white text-sm font-bold rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => navigate("/withdraw")}
              >
                Withdraw
              </button>
            </div>

            {/* Optional Section */}
            <div className="flex border-t border-gray-600 pt-4">
              {/* Withdraw Button */}{" "}
              <button
                className="w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-bold rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => navigate("/deposit")}
              >
                {" "}
                Deposit
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-2 px-4 mt-8 text-center">
          {[
            {
              icon: <Wallet size={24} className="text-orange-400" />,
              label: "Payments",
              color: "bg-white/5",
              link: "/invoice",
            },
            {
              icon: <TfiGift size={24} className="text-green-500" />,

              label: "Offers",
              color: "bg-white/5",
              link: "/offers",
            },
            {
              icon: <TbCreditCardPay size={24} className="text-red-400" />,

              label: "Payouts",
              color: "bg-white/5",
              link: "/all-withdraw",
            },
            {
              icon: <Trophy size={24} className="text-yellow-400" />,
              label: "Ranking",
              color: "bg-white/5",
            },
          ].map((item, idx) => (
            <div
              onClick={() => navigate(item?.link)}
              key={idx}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div
                className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-2 shadow-md group-hover:scale-105 transition-transform`}
              >
                {item.icon}
              </div>
              <span className="text-[11px] font-bold text-gray-200">
                {item.label}
              </span>
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
              loading ? <Skeleton key={idx} className="w-full h-16" /> : null,
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
          <button
            onClick={handleLogout}
            className=" cursor-pointer relative z-10 w-full flex items-center justify-center gap-2 px-4 py-4 rounded-2xl text-white font-black bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 hover:shadow-[0_0_20px_rgba(139,92,246,0.7)] transition-all duration-300 active:scale-95"
          >
            Log out
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* ✅ Account Offer Modal */}
      <Modal
        open={openOffer}
        footer={null}
        centered
        width={300}
        onCancel={() => setOpenOffer(false)}
      >
        {accountOffer && (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">{accountOffer.title}</h2>

            {accountOffer.image && (
              <img
                src={accountOffer.image}
                alt="offer"
                className="w-full rounded-lg mb-3"
              />
            )}

            <p>{accountOffer.description}</p>
          </div>
        )}
      </Modal>

      {/* 🔔 Notification Modal */}
      <Modal
        open={openNotification}
        footer={null}
        centered
        width={340}
        onCancel={() => setOpenNotification(false)}
      >
        <div className="space-y-3 max-h-[300px] overflow-y-auto">
          {filteredNotifications ? (
            filteredNotifications?.map((item) => (
              <div
                key={item._id}
                className="relative rounded-2xl bg-gradient-to-br from-white/5 to-white/10 
  border border-white/10 backdrop-blur-md shadow-lg  
 "
              >
                {/* Purple accent line */}
                <div
                  className="absolute left-0 top-3 bottom-3 w-[4px] rounded-r-full  font-urbanist
    bg-gradient-to-b from-[#8c20fa] to-[#6135f7]"
                ></div>

                {/* Content */}
                <div className="pl-4">
                  {/* Title */}
                  <h4 className="font-bold text-purple-900 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#8c20fa] animate-pulse"></span>
                    {item.title}
                  </h4>

                  {/* Message */}
                  <p className="text-gray-800  mt-1 leading-relaxed">
                    {item.message}
                  </p>

                  {/* Time */}
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-[10px] text-gray-500">
                      {dayjs(item.createdAt)
                        .tz("Asia/Dhaka")
                        .format("DD MMM YYYY • hh:mm A")}
                    </p>

                    {/* Badge (optional) */}
                    <span
                      className="text-[10px] px-2 py-[2px] rounded-full 
        bg-gradient-to-r from-[#8c20fa] to-[#6135f7] text-white"
                    >
                      New
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 text-sm">
              No notifications found
            </p>
          )}
        </div>
      </Modal>
    </div>
  );
};

const Skeleton = ({ className }) => (
  <span
    className={`animate-pulse bg-gray-600/50 rounded-md inline-block ${className}`}
  />
);

const ServiceItem = ({ icon, title, subtitle, bg }) => (
  <div className="flex items-center justify-between p-5 hover:bg-white/10 transition-colors cursor-pointer group">
    <div className="flex items-center gap-4">
      <div
        className={`${bg} p-3 rounded-2xl group-hover:scale-110 transition-transform`}
      >
        {React.cloneElement(icon, { size: 22 })}
      </div>
      <div>
        <p className="text-sm font-bold text-white leading-tight">{title}</p>
        <p className="text-xs text-gray-300 font-medium">{subtitle}</p>
      </div>
    </div>
    <ArrowRight
      size={18}
      className="text-gray-400 group-hover:text-red-400 transition-colors"
    />
  </div>
);

export default Account;
