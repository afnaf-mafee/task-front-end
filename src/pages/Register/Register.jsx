import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useCreateUserMutation } from "../../redux/services/auth/authApiService";
import { ImSpinner2 } from "react-icons/im";
import toast from "react-hot-toast";
const Register = () => {
  const [activeTab, setActiveTab] = useState("phone");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    const res = await createUser(data).unwrap();
    console.log("API Response:", res);

    if (res.success) {
      toast.success(res.message || "Account Created Successfully ✅");
    } else {
      toast.error(res.message || "Registration Failed ❌");
    }
  } catch (error) {
    console.log("Error:", error);
    toast.error(error?.data?.message || "Registration Failed ❌");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 font-urbanist">
      <div className="w-[380px] bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-center py-10 text-white">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-sm opacity-90">Join thousands earning daily</p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setActiveTab("email")}
              className={`flex-1 py-2 rounded-lg cursor-pointer font-medium ${
                activeTab === "email"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600"
              }`}
            >
              Email
            </button>

            <button
              onClick={() => setActiveTab("phone")}
              className={`flex-1 py-2 rounded-lg cursor-pointer font-medium ${
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
                  placeholder="Enter your phone number"
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
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email required",
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
                placeholder="Create a password"
                {...register("password", {
                  required: "Password required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="input pr-12"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-blue-500"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>

              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                {...register("confirmPassword", {
                  required: "Confirm password required",
                  validate: (value) =>
                    value === password || "Password doesn't match",
                })}
                className="input pr-12"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-blue-500"
              >
                {showConfirmPassword ? (
                  <FiEyeOff size={20} />
                ) : (
                  <FiEye size={20} />
                )}
              </button>

              {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword.message}</p>
              )}
            </div>
            {/* Invitation Code */}
            <input
              type="text"
              defaultValue="ID7564E5"
              {...register("invite")}
              className="input bg-blue-50 text-blue-600 font-semibold"
            />

            {/* Fake Captcha */}
            <div className="bg-gray-900 text-white rounded-lg py-3 text-center text-sm">
              ✔ Success! (Captcha Verified)
            </div>

            {/* Submit */}
            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-xl cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-105 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading && <ImSpinner2 className="animate-spin" size={20} />}
              {isLoading ? "Creating..." : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center font-semibold text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-blue-600 font-semibold cursor-pointer"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
