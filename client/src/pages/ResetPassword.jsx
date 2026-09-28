import { useForm } from "react-hook-form";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useResetPasswordMutation } from "../features/auth/authApiSlice";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (formData) => {
    setServerError("");
    try {
      await resetPassword({ token, password: formData.password }).unwrap();
      navigate("/login");
    } catch (err) {
      setServerError(
        err.data?.message || "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <div
      style={{ background: "var(--bg-secondary)" }}
      className="min-h-screen flex items-center justify-center px-4"
    >
      <div
        className="w-full max-w-md rounded-2xl shadow-xl p-8 space-y-6 border"
        style={{
          background: "var(--bg-card)",
          borderColor: "var(--border-color)",
          color: "var(--text-primary)",
        }}
      >
        <div className="text-center">
          <h2
            style={{ color: "var(--text-primary)" }}
            className="text-3xl font-bold"
          >
            Reset Password
          </h2>
          <p className="mt-2" style={{ color: "var(--text-secondary)" }}>
            Enter your new password below
          </p>
        </div>

        {serverError && (
          <div className="p-3 bg-red-100 border border-red-300 text-red-700 text-sm rounded-xl text-center">
            {serverError}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              style={{
                background: "var(--bg-secondary)",
                color: "var(--text-primary)",
                borderColor: "var(--border-color)",
              }}
              className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              Confirm New Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              style={{
                background: "var(--bg-secondary)",
                color: "var(--text-primary)",
                borderColor: "var(--border-color)",
              }}
              className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all disabled:opacity-60"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p
          className="text-center text-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          Remembered your password?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-bold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
