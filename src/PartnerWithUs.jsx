import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Briefcase, Users, Globe, Zap, Menu, X, 
  CheckCircle2, Send, Phone, Mail, Building2, User 
} from "lucide-react";
import { Link } from "react-router-dom";

// Asset imports
import aiesecWhiteLogo from "./assets/logos/aiesec-white-logo.png";
import imgConf from "./assets/images/eventPhotos/photo_2026-04-01 20.23.59.jpeg";
import imgYouth from "./assets/images/eventPhotos/photo_2026-04-01 20.37.58.jpeg";
import imgGlobal from "./assets/images/eventPhotos/photo_2026-04-01 20.36.11.jpeg";
import imgOpp from "./assets/images/eventPhotos/photo_2026-04-01 20.32.05.jpeg";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyxq54cMPE9C5bvI8xVfRZXzUkJW21orH_PYWlA2sTUCVDIACMkfjDY2cfQv1Jx4LCv3g/exec";

const opportunities = [
  {
    title: "National Conferences",
    desc: "Be part of our largest internal gatherings, bringing together 100+ members from 8+ local committees nationwide for leadership development and alignment.",
    img: imgConf,
    color: "#FFD100",
    icon: Users,
    badge: "100+ Delegates",
  },
  {
    title: "Youth-Centric Events",
    desc: "Engage directly with young people through flagship initiatives like AIESEC Fair and YouthSpeak Forum — designed to connect brands with Gen Z.",
    img: imgYouth,
    color: "#52BCC6",
    icon: Zap,
    badge: "Flagship Events",
  },
  {
    title: "Global Exchange",
    desc: "Support international exchange experiences through services like flights, insurance, or accommodation — helping make travel more accessible.",
    img: imgGlobal,
    color: "#037ef3",
    icon: Globe,
    badge: "Logistics Support",
  },
  {
    title: "Opportunity Provision",
    desc: "Bring in international volunteers driving impact in local communities or global interns ready to contribute professional value to your organization.",
    img: imgOpp,
    color: "#EF3340",
    icon: Briefcase,
    badge: "SDG Aligned",
  },
];

const Navbar = ({ currentPage = "Partner with Us" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: "Join AIESEC", href: "/join" },
    { name: "Explore Opportunities", href: "/products" },
    { name: "Partner with Us", href: "/partner" },
  ];

  const tilts = ["-rotate-2", "rotate-1", "-rotate-1"];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full px-6 py-5 transition-all duration-300" style={{
      zIndex: 9999,
      background: scrolled ? "linear-gradient(to bottom, rgba(255,251,235,1) 0%, rgba(255,251,235,0.8) 70%, transparent 100%)" : "transparent",
    }}>
      <div className="max-w-7xl mx-auto flex items-center">
        <Link to="/" className="cursor-pointer mr-auto relative">
          <motion.div initial={{ rotate: -3 }} whileHover={{ rotate: 0 }} className="relative">
            <div className="absolute inset-0 translate-x-[5px] translate-y-[5px] bg-black rounded-lg" />
            <div className="relative bg-[#037ef3] px-4 py-2 rounded-lg border-2 border-black">
              <img src={aiesecWhiteLogo} alt="AIESEC PH" className="h-10 w-auto object-contain" />
            </div>
          </motion.div>
        </Link>
        <div className="hidden md:flex items-center gap-6 ml-auto">
          {navLinks.map((item, i) => (
            <Link key={item.name} to={item.href} className="relative group">
              <div className="absolute inset-0 translate-x-[3px] translate-y-[3px] bg-black rounded-md" />
              <div className="absolute inset-0 translate-x-[1px] translate-y-[1px] bg-[#FFD100] rounded-md border border-black" />
              <div className={`relative border-2 border-black px-3 py-1 rounded-md bg-white transition-all ${item.name === currentPage ? 'rotate-0' : tilts[i]} group-hover:rotate-0`}>
                <span className={`font-barabara text-[10px] sm:text-xs uppercase tracking-wide transition-colors ${item.name === currentPage ? 'text-[#037ef3]' : 'text-black group-hover:text-[#037ef3]'}`}>
                  {item.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-1.5 border-2 border-black bg-white rounded-md shadow-[2px_2px_0px_#000] ml-auto">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="md:hidden absolute top-full left-0 w-full bg-[#FFFBEB] border-b-4 border-black p-4 space-y-3 shadow-xl">
            {navLinks.map((item) => (
              <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)} className={`block font-barabara border-2 border-black p-3 text-center uppercase text-sm shadow-[3px_3px_0px_#000] bg-white ${item.name === currentPage ? 'text-[#037ef3]' : 'text-black'}`}>
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const PartnerWithUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", phone: "" });
  const [submitState, setSubmitState] = useState("idle");

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitState("submitting");
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setSubmitState("success");
      setFormData({ name: "", email: "", company: "", phone: "" });
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 relative flex flex-col items-center pt-32 pb-20 px-6 overflow-x-hidden font-sans">
      <Navbar currentPage="Partner with Us" />

      {/* Modern Dotted Background */}
      <div className="fixed inset-0 pointer-events-none" style={{
        zIndex: 0,
        backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.07) 1.5px, transparent 1.5px)",
        backgroundSize: "30px 30px",
      }} />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-7xl mx-auto space-y-20">
        
        {/* HERO SECTION */}
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <motion.div initial={{ rotate: -2 }} whileHover={{ rotate: 0 }} className="inline-block bg-[#037ef3] text-white px-6 py-2 rounded-xl border-4 border-black shadow-[4px_4px_0px_#000] font-barabara text-xs uppercase tracking-widest">
            Hand in hand for the youth
          </motion.div>
          <h1 className="font-pipanganan text-6xl md:text-8xl uppercase tracking-tighter leading-none text-black">
            PARTNER <br />
            <span className="text-[#FFD100]" style={{ WebkitTextStroke: "2px black", color: "#FFD100" }}>WITH</span>{" "}
            <span className="text-[#037ef3]" style={{ WebkitTextStroke: "2px black", color: "transparent" }}>AIESEC</span>
          </h1>
          <p className="text-xl md:text-2xl font-medium text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Let's create impact for Filipino youth. We develop the leaders your organization needs for tomorrow.
          </p>
        </div>

        {/* CARDS GRID */}
        <section className="space-y-12">
          <div className="flex items-center gap-6">
            <h2 className="font-pipanganan text-4xl uppercase text-black shrink-0">Ways to Partner</h2>
            <div className="h-1 w-full bg-black/10 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {opportunities.map((opp, index) => (
              <motion.div key={index} whileHover={{ y: -10 }} className="group relative flex flex-col">
                <div className="absolute inset-0 translate-x-[8px] translate-y-[8px] bg-black rounded-[32px]" />
                <div className="relative bg-white border-4 border-black rounded-[32px] overflow-hidden flex flex-col h-full group-hover:-translate-y-2 group-hover:-translate-x-2 transition-transform duration-300">
                  <div className="h-64 relative overflow-hidden border-b-4 border-black">
                    <img src={opp.img} alt={opp.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="absolute top-6 left-6 bg-white border-2 border-black px-4 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-widest shadow-[3px_3px_0px_#000]">
                      {opp.badge}
                    </div>
                  </div>
                  <div className="p-8 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl border-2 border-black" style={{ backgroundColor: opp.color }}>
                        <opp.icon size={24} className="text-black" />
                      </div>
                      <h3 className="font-pipanganan text-3xl uppercase leading-none">{opp.title}</h3>
                    </div>
                    <p className="text-gray-600 font-medium leading-relaxed text-lg">
                      {opp.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FORM SECTION - REWORKED WITH NEW COLOR THEME */}
        <section className="relative">
          {/* Light Teal Offset Shadow */}
          <div className="absolute inset-0 translate-x-[12px] translate-y-[12px] bg-[#8CC7C4] rounded-[40px] border-4 border-black" />
          
          <div className="relative bg-[#FFF6F6] border-4 border-black rounded-[40px] overflow-hidden grid lg:grid-cols-5 gap-0 shadow-2xl">
            
            {/* Left side: Context - Dark Teal Background */}
            <div className="lg:col-span-2 bg-[#2C687B] p-10 md:p-14 text-[#FFF6F6] flex flex-col justify-between border-r-0 lg:border-r-4 border-black">
              <div className="space-y-8">
                <h2 className="font-pipanganan text-5xl uppercase leading-none">
                  READY TO <br />
                  {/* Light Teal Accent Text */}
                  <span className="text-[#E2CEB1]">EXPLORE?</span>
                </h2>
                <div className="space-y-6 text-[#FFF6F6]/90 font-medium text-lg">
                  <p>Drop your details and let's start a conversation about what's possible.</p>
                  <ul className="space-y-4">
                    {/* Deep Red Checkmarks */}
                    <li className="flex items-center gap-3"><CheckCircle2 className="text-[#E2CEB1]" /> Response in 24-48 hours</li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="text-[#E2CEB1]" /> Tailored collaboration</li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="text-[#E2CEB1]" /> Global & Local Reach</li>
                  </ul>
                </div>
              </div>
              <div className="pt-12 flex gap-4 opacity-50">
                <Globe size={20} /> <Users size={20} /> <Briefcase size={20} />
              </div>
            </div>

            {/* Right side: Form - Light Pink Background */}
            <div className="lg:col-span-3 p-10 md:p-14 bg-[#FFF6F6]">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black tracking-widest flex items-center gap-2 text-[#2C687B]"><User size={14}/> Full Name</label>
                    <input name="name" required value={formData.name} onChange={handleChange} placeholder="Juana Dela Cruz" className="w-full bg-white border-2 border-black p-4 rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#8CC7C4]/40 transition-all outline-none font-bold text-black" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black tracking-widest flex items-center gap-2 text-[#2C687B]"><Mail size={14}/> Email Address</label>
                    <input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="juana@email.com" className="w-full bg-white border-2 border-black p-4 rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#8CC7C4]/40 transition-all outline-none font-bold text-black" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black tracking-widest flex items-center gap-2 text-[#2C687B]"><Building2 size={14}/> Organization</label>
                    <input name="company" required value={formData.company} onChange={handleChange} placeholder="Company Name" className="w-full bg-white border-2 border-black p-4 rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#8CC7C4]/40 transition-all outline-none font-bold text-black" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black tracking-widest flex items-center gap-2 text-[#2C687B]"><Phone size={14}/> Phone Number</label>
                    <input name="phone" required value={formData.phone} onChange={handleChange} placeholder="+63 9XX XXX XXXX" className="w-full bg-white border-2 border-black p-4 rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#8CC7C4]/40 transition-all outline-none font-bold text-black" />
                  </div>
                </div>

                {/* Deep Red Button */}
                <motion.button 
                  whileTap={{ scale: 0.98 }}
                  disabled={submitState === "submitting"}
                  className={`w-full py-5 rounded-2xl font-barabara text-xl uppercase tracking-widest border-4 border-black transition-all flex items-center justify-center gap-3 shadow-[6px_6px_0px_#000]
                    ${submitState === "success" 
                      ? "bg-[#8CC7C4] text-[#2C687B]" 
                      : "bg-[#E2CEB1] text-white hover:bg-[#2C687B]"}`}
                >
                  {submitState === "submitting" ? "Sending..." : submitState === "success" ? "✓ Message Sent!" : "Submit Details"}
                  <Send size={20} />
                </motion.button>

                {submitState === "error" && (
                  <p className="text-[#DB1A1A] font-bold text-center uppercase text-xs tracking-widest">Error sending message. Please try again.</p>
                )}
              </form>
            </div>
          </div>
        </section>

      </motion.div>
    </div>
  );
};

export default PartnerWithUs;