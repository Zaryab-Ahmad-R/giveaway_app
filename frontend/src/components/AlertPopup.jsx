import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function AlertPopup({ type = "success", message = "", onClose }) {

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => onClose(), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 
            ${type === "success" ? "bg-green-500" : "bg-red-500"}
            text-white px-6 py-8 rounded-xl shadow-lg font-semibold flex items-center justify-between w-[90%] sm:w-auto md:py-8`}
        >
          <span>{message}</span>
          <button
            onClick={onClose}
            className="ml-4 bg-white/20 px-2 py-1 rounded-md hover:bg-white/30 transition"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
