import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { useLoginUserMutation } from "../../redux/services/auth/authApiService";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Login = () => {
  const [activeTab, setActiveTab] = useState("email");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const loginData =
        activeTab === "phone"
          ? { phone: data.phone, password: data.password }
          : { email: data.email, password: data.password };

      const res = await loginUser(loginData).unwrap();

      dispatch(
        setCredentials({
          user: res.user,
          token: res.token,
          invite: res.user?.invite || "",
        }),
      );

      toast.success("Login Success 🚀");

      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="font-urbanist text-white w-full min-h-screen bg-white/5 backdrop-blur-xl bg-gradient-to-br from-[#1e1b4b] via-[#0f172a] to-[#1a1035]">
      <div className="bg-gradient-to-br from-purple-700 to-indigo-900 py-10 text-center">
        <h1 className="text-3xl font-black tracking-tight">Welcome Back</h1>
        <p className="text-sm text-gray-200">Login to continue your journey</p>
      </div>

      <div className="p-6 space-y-5">
        {/* Tabs */}
        <div className="flex bg-white/5 backdrop-blur-md rounded-xl p-1">
          {["email", "phone"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg font-semibold transition cursor-pointer ${
                activeTab === tab
                  ? "bg-purple-600 text-white shadow"
                  : "text-gray-300"
              }`}
            >
              {tab === "email" ? "Email" : "Phone"}
            </button>
          ))}
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4   rounded-md "
        >
          {/* Email / Phone */}
          {activeTab === "phone" ? (
            <div>
              <input
                {...register("phone", { required: "Phone required" })}
                placeholder="Enter phone number"
                className="inputGlass"
              />
              {errors.phone && <p className="error">{errors.phone.message}</p>}
            </div>
          ) : (
            <div>
              <input
                {...register("email", { required: "Email required" })}
                placeholder="Enter email"
                className="inputGlass text-[18px]"
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>
          )}

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password required",
              })}
              placeholder="Password"
              className="inputGlass pr-12 text-[18px]"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 cursor-pointer"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>

            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </div>

          {/* Remember */}
          <div className="flex justify-between text-sm text-gray-300">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>

            <span className="text-purple-400 cursor-pointer">
              Forgot Password?
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

          {/* Submit Button */}
          <button
            disabled={isLoading}
            className="w-full py-4 cursor-pointer rounded-2xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 transition-all flex justify-center items-center gap-2 shadow-lg"
          >
            {isLoading && <ImSpinner2 className="animate-spin" size={20} />}
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-purple-400 font-bold">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
