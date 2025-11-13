import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AlertPopup from "../components/AlertPopup";
import Footer from "../components/Footer"

export default function ClaimPrize() {

  useEffect(() => {
    document.title = "Zainverse - Claim Prize";
  }, []);


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    setMessage("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/claim`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          city: data.city,
          bankName: data.bankName,
          accountNumber: data.accountNumber,
          iban: data.iban || "",
        }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Something went wrong");

      setMessage(`✅ ${result.message}`);
      reset();
    } catch (err) {
      console.error(err);
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#2F5755]">
        <Navbar />
        <section className="md:w-[75%] w-100% mx-auto bg-[#5A9690] shadow-md rounded-2xl p-6 mt-5">
          <h2 className="text-2xl font-bold mb-4 text-center text-[#E0D9D9]">
            Claim Your Prize
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded h-12 p-2 text-[#E0D9D9] font-semibold outline-none"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-white text-sm mt-1 font-semibold">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full border rounded h-12 p-5 text-[#E0D9D9] font-semibold outline-none"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{11,15}$/,
                    message: "Enter a valid phone number",
                  },
                })}
              />
              {errors.phone && (
                <p className="text-white text-sm mt-1 font-semibold">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* City */}
            <div>
              <input
                type="text"
                placeholder="Your City"
                className="w-full border rounded h-12 p-5 text-[#E0D9D9] font-semibold outline-none"
                {...register("city", {
                  required: "City is required",
                })}
              />
              {errors.city && (
                <p className="text-white text-sm mt-1 font-semibold">
                  {errors.city.message}
                </p>
              )}
            </div>

            {/* Bank Name */}
            <div>
              <input
                type="text"
                placeholder="Bank Name"
                className="w-full border rounded h-12 p-5 text-[#E0D9D9] font-semibold outline-none"
                {...register("bankName", {
                  required: "Bank name is required",
                })}
              />
              {errors.bankName && (
                <p className="text-white text-sm mt-1 font-semibold">
                  {errors.bankName.message}
                </p>
              )}
            </div>

            {/* Account Number */}
            <div>
              <input
                type="text"
                placeholder="Account Number"
                className="w-full border rounded h-12 p-5 text-[#E0D9D9] font-semibold outline-none"
                {...register("accountNumber", {
                  required: "Account number is required",
                })}
              />
              {errors.accountNumber && (
                <p className="text-white text-sm mt-1 font-semibold">
                  {errors.accountNumber.message}
                </p>
              )}
            </div>

            {/* IBAN (optional) */}
            <div>
              <input
                type="text"
                placeholder="IBAN (Optional)"
                className="w-full border rounded h-12 p-5 text-[#E0D9D9] font-semibold outline-none"
                {...register("iban")}
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full text-white rounded-lg py-5 transition-colors h-10 ${isSubmitting
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
                }`}
            >
              {isSubmitting ? "Submitting..." : "Claim Prize"}
            </button>
          </form>

          <AlertPopup
            type={message.startsWith("✅") ? "success" : "error"}
            message={message}
            onClose={() => setMessage("")}
          />
        </section>
        <Footer/>
      </div>
    </>
  );
}
