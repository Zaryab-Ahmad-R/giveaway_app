import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const API_BASE = import.meta.env.VITE_API_URL;

export default function AdminLogin() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
      document.title = "Zainverse - Login";
    }, []);

  

 const onSubmit = async (data) => {
    setMessage("");
    try {
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: data.password }),
      });

      const body = await res.json();
      if (!res.ok) throw new Error(body.message || "Login failed");

      // save token and navigate
      localStorage.setItem("adminToken", body.token);
      navigate("/admin");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen bg-[#5A9690]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#3f7a74] p-8 rounded-2xl shadow-lg w-80 text-white space-y-5"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>

        <div>
          <input
            type="password"
            placeholder="Enter admin password"
            className="w-full p-3 rounded-md text-black outline-none"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-200 text-sm mt-1 font-semibold">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 rounded-md transition-colors ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isSubmitting ? "Checking..." : "Login"}
        </button>

        {message && (
          <p className="text-center text-white mt-2 font-semibold">{message}</p>
        )}
      </form>
    </section>
  );
}
