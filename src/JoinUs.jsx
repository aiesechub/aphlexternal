import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Briefcase,
  BookOpen,
  Menu,
  X,
  Users,
  ArrowRight,
  Globe,
  Star,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

// Asset imports
import aiesecWhiteLogo from "./assets/logos/aiesec-white-logo.png";

// --- UNCHANGED NAVBAR COMPONENT ---
const Navbar = ({ currentPage = "Join Us" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: "Join AIESEC", href: "/join" },
    { name: "AIESEC Products", href: "/products" },
    { name: "Partner with Us", href: "/partner" },
  ];

  const tilts = ["-rotate-2", "rotate-1", "-rotate-1"];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 w-full px-6 py-5"
      style={{
        zIndex: 9999,
        background: scrolled
          ? "linear-gradient(to bottom, rgba(255,251,235,1) 0%, rgba(255,251,235,0.8) 70%, transparent 100%)"
          : "transparent",
        transition: "background 0.4s ease",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center">
        <Link to="/" className="cursor-pointer mr-auto relative">
          <motion.div
            className="relative"
            initial={{ rotate: -3 }}
            whileHover={{ rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="absolute inset-0 translate-x-[5px] translate-y-[5px] bg-black rounded-lg" />
            <div className="relative bg-[#037ef3] px-4 py-2 rounded-lg border-2 border-black">
              <motion.img
                src={aiesecWhiteLogo}
                alt="AIESEC PH"
                className="h-10 w-auto object-contain"
                initial={{ rotate: 3 }}
                whileHover={{ rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </div>
          </motion.div>
        </Link>

        <div className="hidden md:flex items-center gap-6 ml-auto">
          {navLinks.map((item, i) => {
            const isActive = item.name === currentPage;
            return (
              <Link key={item.name} to={item.href} className="relative group">
                <div className="absolute inset-0 translate-x-[3px] translate-y-[3px] bg-black rounded-md" />
                <div className="absolute inset-0 translate-x-[1px] translate-y-[1px] bg-[#FFD100] rounded-md border border-black" />
                <div
                  className={`relative border-2 border-black px-3 py-1 rounded-md transition-all duration-200 ${
                    isActive ? "bg-white rotate-0" : `bg-white ${tilts[i]} group-hover:rotate-0`
                  }`}
                >
                  <span
                    className={`font-barabara text-[10px] sm:text-xs uppercase tracking-wide transition-colors duration-200 ${
                      isActive ? "text-[#037ef3]" : "text-black group-hover:text-[#037ef3]"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-1.5 border-2 border-black bg-white rounded-md shadow-[2px_2px_0px_#000] ml-auto"
        >
          {isOpen ? <X size={20} className="text-black" /> : <Menu size={20} className="text-black" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 w-full bg-[#FFFBEB] border-b-4 border-black p-4 space-y-3 shadow-xl"
          >
            {navLinks.map((item) => {
              const isActive = item.name === currentPage;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block font-barabara border-2 border-black p-3 text-center uppercase tracking-widest text-sm shadow-[3px_3px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-[0px_0px_0px_#000] transition-all ${
                    isActive ? "bg-white text-[#037ef3]" : "bg-white text-black"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- JOIN US COMPONENT (NO FOOTER) ---
export default function JoinUs() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const membershipBenefits = [
    "Activating Leadership",
    "Living Diversity",
    "Enjoying Participation",
    "Acting Sustainably",
    "Demonstrating Integrity",
    "Striving for Excellence",
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden font-sans relative">
      <Navbar currentPage="Join AIESEC" />
      
      {/* White Subtle Dot Pattern Overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.07) 1.5px, transparent 1.5px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center space-y-8"
          >
            <motion.div 
              initial={{ rotate: -2 }} 
              whileHover={{ rotate: 0 }} 
              className="inline-block bg-[#037ef3] text-white px-6 py-2 rounded-xl border-4 border-black shadow-[4px_4px_0px_#000] font-barabara text-xs uppercase tracking-widest"
            >
              Start Your Journey Today
            </motion.div>
            
            <h1 className="font-pipanganan text-6xl md:text-8xl uppercase tracking-tighter leading-none text-black">
              JOIN THE <br />
              <span 
                className="text-[#037ef3]" 
                style={{ WebkitTextStroke: "1.5px black", color: "transparent" }}
              >
                MOVEMENT
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl font-medium text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Whether you want to lead a local chapter or embark on a global adventure, 
              your AIESEC story starts here.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Selection Layout */}
      <section className="px-6 pb-24 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-stretch">
          
          {/* Membership Card */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="group relative flex flex-col"
            onMouseEnter={() => setHoveredCard('member')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute inset-0 translate-x-[10px] translate-y-[10px] bg-black rounded-[40px]" />
            <div className="relative h-full bg-white border-4 border-black rounded-[40px] p-8 md:p-12 flex flex-col hover:-translate-y-2 hover:-translate-x-2 transition-transform duration-300">
              <div className="flex justify-between items-start mb-10">
                <div className="p-5 bg-[#FFD100] rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000]">
                  <Users size={40} className="text-black" />
                </div>
                <Zap className={`text-[#FFD100] transition-all duration-500 ${hoveredCard === 'member' ? 'rotate-12 scale-125' : ''}`} size={32} />
              </div>

              <h2 className="font-pipanganan text-4xl md:text-5xl uppercase mb-6 leading-none">
                Become a <br /><span className="text-[#FFD100]" style={{ WebkitTextStroke: "1px black", color: "#FFD100" }}>Member</span>
              </h2>
              
              <p className="text-gray-700 font-medium text-lg mb-8 flex-grow">
                Join our local entities across the Philippines. Develop your leadership by managing teams, 
                facilitating international exchanges, and creating impact.
              </p>

              <div className="space-y-4 mb-10">
                {membershipBenefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 font-bold text-sm uppercase tracking-wide">
                    <CheckCircle2 size={20} className="text-[#037ef3]" />
                    {benefit}
                  </div>
                ))}
              </div>

              <Link 
                to="/apply-membership"
                className="w-full bg-black text-white font-barabara py-5 rounded-2xl uppercase tracking-[0.2em] text-center border-2 border-black hover:bg-[#037ef3] transition-colors shadow-[6px_6px_0px_#FFD100]"
              >
                Apply for Membership
              </Link>
            </div>
          </motion.div>

          {/* Exchange Card */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="group relative flex flex-col"
            onMouseEnter={() => setHoveredCard('exchange')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute inset-0 translate-x-[10px] translate-y-[10px] bg-[#037ef3] rounded-[40px] border-4 border-black" />
            <div className="relative h-full bg-white border-4 border-black rounded-[40px] p-8 md:p-12 flex flex-col hover:-translate-y-2 hover:-translate-x-2 transition-transform duration-300">
              <div className="flex justify-between items-start mb-10">
                <div className="p-5 bg-black rounded-2xl border-2 border-black shadow-[4px_4px_0px_#037ef3]">
                  <Globe size={40} className="text-white" />
                </div>
                <Star className={`text-[#037ef3] transition-all duration-500 ${hoveredCard === 'exchange' ? 'rotate-12 scale-125' : ''}`} size={32} />
              </div>

              <h2 className="font-pipanganan text-4xl md:text-5xl uppercase mb-6 leading-none">
                Go on an <br /><span className="text-[#037ef3]">Exchange</span>
              </h2>
              
              <p className="text-gray-700 font-medium text-lg mb-8 flex-grow">
                Looking to travel or grow your career? Explore professional internships, 
                teaching placements, and volunteer projects around the world.
              </p>

              <div className="grid grid-cols-1 gap-4 mb-10">
                {[
                  { icon: Heart, label: "Volunteer", color: "#EF3340" },
                  { icon: Briefcase, label: "Talent", color: "#52BCC6" },
                  { icon: BookOpen, label: "Teacher", color: "#F58220" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 border-2 border-black rounded-xl bg-gray-50">
                    <item.icon size={20} style={{ color: item.color }} />
                    <span className="font-bold uppercase text-xs tracking-widest">Global {item.label}</span>
                  </div>
                ))}
              </div>

              <Link 
                to="/products"
                className="w-full bg-[#037ef3] text-white font-barabara py-5 rounded-2xl uppercase tracking-[0.2em] text-center border-2 border-black hover:bg-black transition-colors shadow-[6px_6px_0px_#000]"
              >
                Explore Products <ArrowRight className="inline-block ml-2" size={20} />
              </Link>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}