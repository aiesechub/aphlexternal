import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import imgConf from "./assets/images/eventPhotos/photo_2026-04-01 20.23.59.jpeg";
import imgYouth from "./assets/images/eventPhotos/photo_2026-04-01 20.37.58.jpeg";
import imgGlobal from "./assets/images/eventPhotos/photo_2026-04-01 20.36.11.jpeg";
import imgOpp from "./assets/images/eventPhotos/photo_2026-04-01 20.32.05.jpeg";

const PartnerWithUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
  });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");
    try {
      // Google Sheets Integration here
      const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID";
      const RANGE = "Sheet1!A:D";
      const ACCESS_TOKEN = "YOUR_ACCESS_TOKEN";

      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}:append?valueInputOption=USER_ENTERED`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
          body: JSON.stringify({
            values: [
              [formData.name, formData.email, formData.company, formData.phone],
            ],
          }),
        },
      );

      if (response.ok) {
        setStatus("Success! We will reach out soon.");
        setFormData({ name: "", email: "", company: "", phone: "" });
      } else {
        setStatus("Error submitting form. Please check your credentials.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Error submitting form.");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-[#FFFBEB] text-black relative flex flex-col items-center py-20 px-6 overflow-x-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(3,126,243,0.15)_0%,transparent_100%)] pointer-events-none" />

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
        className="relative z-10 w-full max-w-5xl mx-auto space-y-12 mt-10"
      >
        <div className="text-center space-y-6">
          <h1
            className="font-barabara text-5xl md:text-7xl uppercase tracking-widest text-[#037ef3]"
            style={{ textShadow: "4px 4px 0px rgba(0,0,0,1)" }}
          >
            Partner With Us
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-black">
            Let's create impact for Filipino youth — together.
          </h2>
        </div>

        <div className="space-y-6 text-lg md:text-xl text-black/80 font-light leading-relaxed">
          <p>
            At AIESEC, we collaborate with organizations that want to engage,
            develop, and empower the next generation of leaders. From national
            initiatives to global experiences, there are many ways to get
            involved — depending on what matters most to you.
          </p>
          <p>Here are some of the ways partners typically work with us:</p>
        </div>

        <div className="h-px bg-black/20 w-full" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl overflow-hidden border-2 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] flex flex-col"
          >
            <div className="h-64 bg-[#FFD100]/20 relative border-b-2 border-black overflow-hidden">
              <img
                src={imgConf}
                alt="National Conferences"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col bg-white">
              <h3 className="text-2xl font-bold mb-3 text-black">
                National Conferences
              </h3>
              <p className="text-lg text-black/80 font-light leading-relaxed">
                Be part of our largest internal gatherings, bringing together
                100+ members from 8+ local committees nationwide for leadership
                development, alignment, and growth.
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl overflow-hidden border-2 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] flex flex-col"
          >
            <div className="h-64 bg-[#00A651]/20 relative border-b-2 border-black overflow-hidden">
              <img
                src={imgYouth}
                alt="Youth-Centric Events"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col bg-white">
              <h3 className="text-2xl font-bold mb-3 text-black">
                Youth-Centric Events
              </h3>
              <p className="text-lg text-black/80 font-light leading-relaxed">
                Engage directly with young people through our flagship
                initiatives like AIESEC Fair and YouthSpeak Forum — designed to
                spark conversations and connect brands with youth.
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl overflow-hidden border-2 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] flex flex-col"
          >
            <div className="h-64 bg-[#009BD6]/20 relative border-b-2 border-black overflow-hidden">
              <img
                src={imgGlobal}
                alt="Global Exchange Support"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col bg-white">
              <h3 className="text-2xl font-bold mb-3 text-black">
                Global Exchange Support
              </h3>
              <p className="text-lg text-black/80 font-light leading-relaxed">
                Support international exchange experiences through services like
                flights, insurance, or accommodation — helping make
                opportunities more accessible.
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl overflow-hidden border-2 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] flex flex-col"
          >
            <div className="h-64 bg-[#EF3340]/20 relative border-b-2 border-black overflow-hidden">
              <img
                src={imgOpp}
                alt="Opportunity Provision"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col bg-white">
              <h3 className="text-2xl font-bold mb-3 text-black">
                Opportunity Provision
              </h3>
              <p className="text-lg text-black/80 font-light leading-relaxed">
                Work with us to bring in international volunteers driving impact
                in local communities aligned with the UN Sustainable Development
                Goals, or global interns ready to contribute their skills and
                perspectives to your organization.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="h-px bg-black/20 w-full" />

        <div className="space-y-6 text-center pt-4 pb-12">
          <h2 className="text-3xl font-bold text-black">
            Curious to explore more?
          </h2>
          <p className="text-lg md:text-xl text-black/80 font-light leading-relaxed max-w-2xl mx-auto">
            If any of these sound interesting — or if you're simply curious
            about what we've done and what's possible —
          </p>
          <p className="text-lg md:text-xl text-black/80 font-light leading-relaxed max-w-2xl mx-auto">
            Leave your details and our team will reach out within 24-48 hours
            for a quick chat.
          </p>
          <p className="text-lg md:text-xl text-black/80 font-light leading-relaxed max-w-2xl mx-auto pb-4">
            No pressure, just a conversation to explore how we can potentially
            work together — whether locally, or even at a regional or global
            level.
          </p>

          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto space-y-4 text-left"
          >
            <div>
              <label className="block text-sm font-bold text-[#037ef3] mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-white border border-black/20 rounded-md px-4 py-2 text-black focus:outline-none focus:border-[#037ef3] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#037ef3] mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white border border-black/20 rounded-md px-4 py-2 text-black focus:outline-none focus:border-[#037ef3] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#037ef3] mb-1">
                Company
              </label>
              <input
                type="text"
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
                className="w-full bg-white border border-black/20 rounded-md px-4 py-2 text-black focus:outline-none focus:border-[#037ef3] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#037ef3] mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-white border border-black/20 rounded-md px-4 py-2 text-black focus:outline-none focus:border-[#037ef3] transition-colors"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="relative group inline-block w-full mt-4"
            >
              <div className="absolute inset-0 translate-x-[6px] translate-y-[6px] bg-[#FFD100] rounded-lg" />
              <div className="absolute inset-0 translate-x-[3px] translate-y-[3px] bg-black rounded-lg" />
              <div className="relative bg-[#037ef3] border-2 border-black px-8 py-3 rounded-lg group-hover:-translate-y-1 group-hover:-translate-x-1 transition-transform duration-200 text-center">
                <span className="font-barabara text-white uppercase tracking-widest text-lg">
                  Submit
                </span>
              </div>
            </motion.button>
            {status && (
              <p className="text-center text-sm mt-4 text-[#00A651]">
                {status}
              </p>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default PartnerWithUs;
