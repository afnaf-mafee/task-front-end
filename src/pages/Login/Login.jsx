import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { useLoginUserMutation } from "../../redux/services/auth/authApiService";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/features/auth/authSlice";
import toast from "react-hot-toast";
const Login = () => {
  const [activeTab, setActiveTab] = useState("phone");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

const onSubmit = async (data) => {
    try {
      const loginData = activeTab === "phone"
        ? { phone: data.phone, password: data.password }
        : { email: data.email, password: data.password };

      // .unwrap() allows you to use standard try/catch logic with RTK Query
      const res = await loginUser(loginData).unwrap();
      const user = res?.user
      

      // 💡 Dispatch to Redux (this also triggers the localStorage save)
      dispatch(setCredentials({ 
       user
      }));

      toast.success("Login Success!");
      // navigate("/dashboard");

    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div>
      <div className=" bg-white rounded-3xl shadow-xl overflow-hidden h-screen">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-center py-10 text-white">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-sm opacity-90">Login to your account</p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setActiveTab("email")}
              className={`flex-1 py-2 cursor-pointer rounded-lg font-medium ${
                activeTab === "email"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600"
              }`}
            >
              Email
            </button>

            <button
              onClick={() => setActiveTab("phone")}
              className={`flex-1 cursor-pointer py-2 rounded-lg font-medium ${
                activeTab === "phone"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600"
              }`}
            >
              Phone
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email / Phone */}
            {activeTab === "phone" ? (
              <div>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  {...register("phone", {
                    required: "Phone is required",
                  })}
                  className="input"
                />
                {errors.phone && (
                  <p className="error">{errors.phone.message}</p>
                )}
              </div>
            ) : (
              <div>
                <input
                  type="email"
                  placeholder="Enter email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  className="input"
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
                placeholder="Password"
                {...register("password", {
                  required: "Password required",
                })}
                className="input pr-12"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500 transition"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>

              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>

            {/* Remember + Forgot */}
            <div className="flex justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>

              <span className="text-blue-600 cursor-pointer">
                Forgot Password?
              </span>
            </div>

            {/* Captcha */}
            <div className="bg-gray-900 text-white rounded-lg py-3 text-center text-sm">
              ✔ Success! (Captcha Verified)
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-xl cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-105 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading && <ImSpinner2 className="animate-spin" size={20} />}
              {isLoading ? "Login..." : "Login"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm font-semibold text-gray-500">
            Don’t have an account?{" "}
            <Link
              to={"/signup"}
              className="text-blue-600 font-semibold cursor-pointer"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
