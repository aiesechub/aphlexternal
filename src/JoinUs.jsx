import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const JoinUs = () => {
  return (
    <div className="min-h-screen bg-[#FFFBEB] text-black relative flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background gradients or similar style */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(3,126,243,0.15)_0%,transparent_100%)] pointer-events-none" />

      <div className="absolute top-6 left-6 z-10">
        <Link
          to="/"
          className="flex items-center gap-2 text-black/60 hover:text-[#037ef3] transition-colors"
        >
          <ArrowLeft size={24} />
          <span className="font-barabara uppercase tracking-widest text-sm">
            Back to Home
          </span>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-2xl mx-auto text-center space-y-8"
      >
        <h1
          className="font-barabara text-5xl md:text-7xl uppercase tracking-widest text-[#037ef3]"
          style={{ textShadow: "4px 4px 0px rgba(0,0,0,1)" }}
        >
          Join Us
        </h1>
        <p className="text-xl md:text-2xl text-black/80 font-light max-w-lg mx-auto leading-relaxed">
          Ready to take the first step towards a global experience? Fill out the
          form below to begin your journey with AIESEC.
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block mt-8"
        >
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScW7VpsBPzeg3YjYIEHcEfqyTFlIIqY2FHHjTT95bZG_ZGEhw/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group inline-block"
          >
            <div className="absolute inset-0 translate-x-[6px] translate-y-[6px] bg-[#FFD100] rounded-lg" />
            <div className="absolute inset-0 translate-x-[3px] translate-y-[3px] bg-black rounded-lg" />
            <div className="relative bg-[#037ef3] border-2 border-black px-8 py-4 rounded-lg group-hover:-translate-y-1 group-hover:-translate-x-1 transition-transform duration-200">
              <span className="font-barabara text-white uppercase tracking-widest text-xl">
                Go to Application Form
              </span>
            </div>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default JoinUs;
