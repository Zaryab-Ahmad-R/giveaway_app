import { useForm } from "react-hook-form";
import { useState } from "react";
import AlertPopup from "../components/AlertPopup";

export default function RegistrationForm() {
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          facebookASK: data.facebookASK,
          facebookPost: data.facebookPost,
          friendsAskF: data.friendsAskF,
          sharePostF: data.sharePostF,
          instagramASK: data.instagramASK,
          instagramPost: data.instagramPost,
          friendsAskI: data.friendsAskI,
          sharePostI: data.sharePostI,
          instagramHandle: data.instagramHandle,
          facebookProfile: data.facebookProfile,
          city: data.city,
        }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Something went wrong");

      setMessage(`✅ ${result.message}`);
      reset();
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <section className="md:w-[75%] w-[100%] mx-auto bg-[#5A9690] shadow-md rounded-2xl p-6 mt-5">
      <h2 className="text-2xl font-bold mb-4 text-center text-[#E0D9D9]">Register for the Giveaway</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border rounded h-12 p-2 text-[#E0D9D9] font-semibold outline-none"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-white text-sm mt-1 font-semibold">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full border rounded h-12 p-5 text-[#E0D9D9] font-semibold outline-none mx-auto"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{11,15}$/,
                message: "Enter a valid phone number",
              },
            })}
          />
          {errors.phone && (
            <p className="text-white text-sm mt-1 font-semibold">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Have you followed us on Facebook?"
            className="w-full border rounded h-12 p-5 text-[#E0D9D9] font-semibold outline-none"
            {...register("facebookASK", {
              required: "Required",
              pattern: {
                value: /^yes$/i,
                message: "Follow first to continue. Write Yes if already followed.",
              },
            })}
          />
          {errors.facebookASK && (
            <p className="text-white text-sm mt-1 font-semibold">{errors.facebookASK.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Have you liked our last post on Facebook?"
            className="w-full border rounded h-12 p-5 text-[#E0D9D9] font-semibold outline-none"
            {...register("facebookPost", {
              required: "Required",
              pattern: {
                value: /^yes$/i,
                message: "Like first to continue. Write Yes if already liked.",
              },
            })}
          />
          {errors.facebookPost && (
            <p className="text-white text-sm mt-1 font-semibold">{errors.facebookPost.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Have you mentioned 3 friends on last post on Facebook?"
            className="w-full border rounded h-16 p-3 text-[#E0D9D9] font-semibold outline-none sm:text-base leading-2"
            {...register("friendsAskF", {
              required: "Required",
              pattern: {
                value: /^yes$/i,
                message: "Mention first to continue. Write Yes if already mentioned.",
              },
            })}
          />
          {errors.friendsAskF && (
            <p className="text-white text-sm mt-1 font-semibold">{errors.friendsAskF.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Have you shared our last post on Facebook?"
            className="w-full border rounded h-12 p-5 text-[#E0D9D9] font-semibold outline-none"
            {...register("sharePostF", {
              required: "Required",
              pattern: {
                value: /^yes$/i,
                message: "Share first to continue. Write Yes if already shared.",
              },
            })}
          />
          {errors.sharePostF && (
            <p className="text-white text-sm mt-1 font-semibold">{errors.sharePostF.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Have you followed us on Instagram?"
            className="w-full border rounded h-12 p-5 text-[#E0D9D9] font-semibold outline-none"
            {...register("instagramASK", {
              required: "Required",
              pattern: {
                value: /^yes$/i,
                message: "Follow first to continue. Write Yes if already followed.",
              },
            })}
          />
          {errors.instagramASK && (
            <p className="text-white text-sm mt-1 font-semibold">{errors.instagramASK.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Have you liked our last post on Instagram?"
            className="w-full border rounded h-12 p-5 text-[#E0D9D9] font-semibold outline-none"
            {...register("instagramPost", {
              required: "Required",
              pattern: {
                value: /^yes$/i,
                message: "Like first to continue. Write Yes if already liked.",
              },
            })}
          />
          {errors.instagramPost && (
            <p className="text-white text-sm mt-1 font-semibold">{errors.instagramPost.message}</p>
          )}
        </div>

         <div>
          <input
            type="text"
            placeholder="Have you mentioned 3 friends on last post on Instagram?"
            className="w-full border rounded h-16 p-3 text-[#E0D9D9] font-semibold outline-none sm:text-base leading-2"
            {...register("friendsAskI", {
              required: "Required",
              pattern: {
                value: /^yes$/i,
                message: "Mention first to continue. Write Yes if already mentioned.",
              },
            })}
          />
          {errors.friendsAskI && (
            <p className="text-white text-sm mt-1 font-semibold">{errors.friendsAskI.message}</p>
          )}
        </div>

         <div>
          <input
            type="text"
            placeholder="Have you shared our last post on Instagram?"
            className="w-full border rounded h-12 p-5 text-[#E0D9D9] font-semibold outline-none"
            {...register("sharePostI", {
              required: "Required",
              pattern: {
                value: /^yes$/i,
                message: "Share first to continue. Write Yes if already shared.",
              },
            })}
          />
          {errors.sharePostI && (
            <p className="text-white text-sm mt-1 font-semibold">{errors.sharePostI.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Your Instagram Handle"
            className="w-full border rounded h-12 p-5 text-[#E0D9D9] font-semibold outline-none"
            {...register("instagramHandle", {
              required: "Required",
              pattern: {
                message: "Write your instagram handle.",
              },
            })}
          />
          {errors.instagramHandle && (
            <p className="text-white text-sm mt-1 font-semibold">{errors.instagramHandle.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Your Facebook Profile"
            className="w-full border rounded h-12 p-5 text-[#E0D9D9] font-semibold outline-none"
            {...register("facebookProfile", {
              required: "Required",
              pattern: {
                message: "Write your facebook profile.",
              },
            })}
          />
          {errors.facebookProfile && (
            <p className="text-white text-sm mt-1 font-semibold">{errors.facebookProfile.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Enter your city"
            className="w-full border rounded h-12 p-5 text-[#E0D9D9] font-semibold outline-none"
            {...register("city", {
              required: true,
              pattern: {
                required: "Required",
                message: "Enter your city",
              },
            })}
          />
          {errors.city && (
            <p className="text-white text-sm mt-1 font-semibold">{errors.city.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full text-white rounded-lg py-2 transition-colors h-10 ${isSubmitting
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
            }`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      <AlertPopup
        type={message.startsWith("✅") ? "success" : "error"}
        message={message}
        onClose={() => setMessage("")}
      />
    </section>
  );
}
