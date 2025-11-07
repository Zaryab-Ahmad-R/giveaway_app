import { useEffect } from "react";
import { useForm } from "react-hook-form";

const API_BASE = import.meta.env.VITE_API_URL;

export default function SettingsForm({ token }) {
  const { register, handleSubmit, setValue } = useForm();

  // Fetch current settings
  useEffect(() => {
    fetch(`${API_BASE}/api/settings`)
      .then((res) => res.json())
      .then((data) => {
        setValue("registrationEnabled", data.registrationEnabled);
        setValue("blockStart", data.blockStart);
        setValue("blockEnd", data.blockEnd);
      });
  }, []);

  const onSubmit = async (data) => {
    const res = await fetch(`${API_BASE}/api/settings`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (res.ok) alert("✅ Settings updated successfully!");
    else alert("❌ Failed to update settings.");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-[#3f7a74] p-6 rounded-xl space-y-4 w-full max-w-md mx-auto"
    >
      <div className="flex items-center justify-between">
        <label className="font-semibold">Enable Registration</label>
        <input type="checkbox" {...register("registrationEnabled")} />
      </div>

      <div>
        <label className="block font-semibold mb-1">Block Start Time (HH:MM)</label>
        <input
          type="time"
          {...register("blockStart")}
          className="w-full p-2 rounded bg-[#2d5c57] text-white"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Block End Time (HH:MM)</label>
        <input
          type="time"
          {...register("blockEnd")}
          className="w-full p-2 rounded bg-[#2d5c57] text-white"
        />
      </div>

      <button
        type="submit"
        className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-semibold"
      >
        💾 Save Settings
      </button>
    </form>
  );
}
