import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import { useCreateUserMutation } from "../../redux/services/auth/authApiService";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Register = () => {
  const [activeTab, setActiveTab] = useState("email");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const invite = query.get("invite") || "";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createUser, { isLoading }] = useCreateUserMutation();
  const isInviteFromQuery = Boolean(query.get("invite"));
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      invite: invite,
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      if (data.email) data.email = data.email.trim();
      if (data.phone) data.phone = data.phone.trim();

      const res = await createUser(data).unwrap();

      if (res.success) {
        dispatch(
          setCredentials({
            user: res.user,
            token: res.token,
            invite: res?.invite,
          }),
        );

        toast.success("Account Created Successfully 🚀");

        setTimeout(() => {
          navigate("/home", { replace: true });
        }, 1200);
      }
    } catch (err) {
      toast.error(err?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="flex justify-center  font-urbanist text-white w-full min-h-screen bg-gradient-to-br from-[#1e1b4b] via-[#0f172a] to-[#1a1035]">
      <div className="w-full rounded-[40px] overflow-hidden shadow-2xl ">
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-700 to-indigo-900 text-center py-10">
          <h1 className="text-3xl font-black">Create Account</h1>
          <p className="text-gray-200 text-sm">Join thousands earning daily</p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Tabs */}
          <div className="flex bg-white/5 backdrop-blur-md rounded-xl p-1">
            {["email", "phone"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 rounded-lg font-semibold cursor-pointer transition ${
                  activeTab === tab
                    ? "bg-purple-600 text-white shadow"
                    : "text-gray-300"
                }`}
              >
                {tab === "email" ? "Email" : "Phone"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email / Phone */}
            {activeTab === "phone" ? (
              <div>
                <input
                  {...register("phone", {
                    required: "Phone required",
                    validate: (value) =>
                      !value.startsWith("+880") ||
                      "Enter like 01712345678. (+88 not allowed)",
                  })}
                  placeholder="Enter phone number"
                  className="inputGlass"
                />
                {errors.phone && (
                  <p className="error">{errors.phone.message}</p>
                )}
              </div>
            ) : (
              <div>
                <input
                  {...register("email", { required: "Email required" })}
                  type="email"
                  placeholder="Enter email"
                  className="inputGlass"
                />
                {errors.email && (
                  <p className="error">{errors.email.message}</p>
                )}
              </div>
            )}

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                {...register("password", {
                  required: "Password required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                className="inputGlass pr-12"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>

              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                {...register("confirmPassword", {
                  required: "Confirm password required",
                  validate: (value) =>
                    value === password || "Password doesn't match",
                })}
                className="inputGlass pr-12"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>

              {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Invite Code (AUTO FILLED) */}
            <div className="relative">
              <input
                {...register("invite")}
                className="inputGlass text-purple-300 font-bold pr-24"
                placeholder="Invite code"
                readOnly={isInviteFromQuery}
              />

              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold px-2 py-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-lg animate-pulse">
                InviteId
              </span>
            </div>

            {/* Captcha */}
            <div className="relative overflow-hidden bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-pink-500/20 border border-white/20 rounded-xl py-3 text-center text-sm font-semibold">
              {/* animated shine overlay */}
              <div className="absolute inset-0 -translate-x-full animate-[shine_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

              {/* content */}
              <div className="flex items-center justify-center gap-2 text-white">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>

                <span className="text-green-300">
                  {" "}
                  <span className="text-green-400 font-bold">✔</span> Captcha
                  Verified{" "}
                </span>
              </div>
            </div>

            {/* Submit */}
            <button
              disabled={isLoading}
              className="w-full py-4 cursor-pointer rounded-2xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 transition-all flex justify-center items-center gap-2 shadow-lg"
            >
              {isLoading && <ImSpinner2 className="animate-spin" size={20} />}
              {isLoading ? "Creating..." : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-400 font-bold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
