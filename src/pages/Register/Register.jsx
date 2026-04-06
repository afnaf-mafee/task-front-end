import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import { useCreateUserMutation } from "../../redux/services/auth/authApiService";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Register = () => {
  const [activeTab, setActiveTab] = useState("phone");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createUser, { isLoading }] = useCreateUserMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      // Trim email and phone
      if (data.email) data.email = data.email.trim();
      if (data.phone) data.phone = data.phone.trim();

      const res = await createUser(data).unwrap();

      if (res.success) {
        dispatch(setCredentials({ user: res.user, token: res.token }));

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
    <div className=" flex justify-center items-center font-urbanist text-white ">
      <div className="w-full max-w-md rounded-[40px] overflow-hidden shadow-2xl bg-gradient-to-br from-[#1e1b4b] via-[#0f172a] to-[#1a1035]">
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
                className={`flex-1 py-2 rounded-lg font-semibold  cursor-pointer transition ${
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
                      "Enter your number like 01712345678. (+88 not allowed)",
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
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
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

            {/* Invite Code */}
            <input
              defaultValue="ID7564E5"
              {...register("invite")}
              className="inputGlass text-purple-300 font-bold"
            />

            {/* Captcha */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl py-3 text-center text-sm">
              ✔ Captcha Verified
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
