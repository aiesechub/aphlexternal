import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, Briefcase, BookOpen, Menu, X, PlaneLanding, 
  PlaneTakeoff, ArrowRight, Sparkles, Search, MapPin, ExternalLink, Filter, Loader2
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

// Asset imports
import aiesecWhiteLogo from "./assets/logos/aiesec-white-logo.png";

// Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const Navbar = ({ currentPage = "AIESEC Products" }) => {
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

const programsData = [
  {
    title: "Global Volunteer",
    shortTitle: "Volunteer",
    trait: "Bayanihan",
    color: "#EF3340",
    icon: Heart,
    incoming: {
      title: "Come to the Philippines",
      desc: "Travel to the Philippines! Immerse yourself in the warm Filipino culture, live with locals, and contribute to grassroots community projects aligned with the UN SDGs.",
      action: "Discover PH Projects",
    },
    outgoing: {
      title: "Filipinos Going Abroad",
      desc: "Hey, Filipinos! Take your 'Bayanihan' spirit abroad. Travel to a new country, immerse yourself in a different culture, and volunteer for sustainable development projects around the world.",
      action: "Volunteer Abroad",
    },
  },
  {
    title: "Global Talent",
    shortTitle: "Talent",
    trait: "Diskarte",
    color: "#52BCC6",
    icon: Briefcase,
    incoming: {
      title: "Intern in the Philippines",
      desc: "Boost your career in the Pearl of the Orient. Come to the Philippines for professional internships in fast-growing startups or multinationals, and experience our vibrant, resilient work culture.",
      action: "Find PH Internships",
    },
    outgoing: {
      title: "Filipinos Going Abroad",
      desc: "Filipino talents, the world is yours. Kickstart your global career with professional internships across the globe and gain the competitive edge you need in the corporate world.",
      action: "Intern Abroad",
    },
  },
  {
    title: "Global Teacher",
    shortTitle: "Teacher",
    trait: "Pag-aaruga",
    color: "#F58220",
    icon: BookOpen,
    incoming: {
      title: "Teach in the Philippines",
      desc: "Share your language, culture, and expertise with Filipino students! Experience the world-renowned hospitality of our schools and local communities while growing as an educator.",
      action: "Teach in PH",
    },
    outgoing: {
      title: "Filipinos Going Abroad",
      desc: "Filipino educators, take your 'Pag-aaruga' globally. Impact educational systems in different countries, shape the minds of the next generation, and grow your teaching career abroad.",
      action: "Teach Abroad",
    },
  },
];

// program_id → shortTitle mapping (adjust IDs to match your DB)
const PROGRAM_ID_MAP = {
  1: "Volunteer",
  2: "Talent",
  3: "Teacher",
};

export default function OurProducts() {
  const [activeTab, setActiveTab] = useState(0);

  // Database Filters States
  const [dbProgramFilter, setDbProgramFilter] = useState("Volunteer");
  const [searchQuery, setSearchQuery] = useState("");

  // Supabase data states
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const activeProgram = programsData[activeTab];
  const databaseRef = useRef(null);
  const location = useLocation();

  // Fetch opportunities from Supabase
  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: sbError } = await supabase
          .from("opportunities")
          .select("opportunity_id, title, location, direction, external_link, program_id")
          .eq("is_active", true)
          .order("created_at", { ascending: false });

        if (sbError) throw sbError;

        // Normalize data to match the shape the UI expects
        const normalized = (data || []).map((row) => ({
          id: row.opportunity_id,
          title: row.title,
          location: row.location,
          direction: row.direction,
          link: row.external_link || "#",
          program: PROGRAM_ID_MAP[row.program_id] ?? "Volunteer",
        }));

        setOpportunities(normalized);
      } catch (err) {
        console.error("Error fetching opportunities:", err);
        setError("Failed to load opportunities. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  // Sync URL query params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const programQuery = searchParams.get("program");
    const searchQueryParam = searchParams.get("search");

    if (programQuery) {
      const foundIndex = programsData.findIndex(
        (program) =>
          program.shortTitle.toLowerCase() === programQuery.toLowerCase(),
      );
      if (foundIndex !== -1) {
        setActiveTab(foundIndex);
        setDbProgramFilter(programsData[foundIndex].shortTitle);
      }
    }

    if (searchQueryParam) {
      setSearchQuery(searchQueryParam);
    }
  }, [location.search]);

  // Sync Top Tabs with Database Filters
  const handleTabChange = (index) => {
    setActiveTab(index);
    setDbProgramFilter(programsData[index].shortTitle);
  };

  // Handle Card Action Clicks
  const handleActionClick = (direction) => {
    setDbProgramFilter(activeProgram.shortTitle);
    setDbDirectionFilter(direction);
    databaseRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Filter Logic
  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesProgram = dbProgramFilter === "All" || opp.program === dbProgramFilter;
    const matchesDirection = true;
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesProgram && matchesDirection && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden font-sans">
      <Navbar currentPage="AIESEC Products" />

      {/* Subtle Dot Pattern Overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.05) 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-12 px-6 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-pipanganan text-5xl md:text-7xl text-black tracking-wider uppercase drop-shadow-[4px_4px_0px_rgba(0,0,0,0.15)] leading-none mb-4">
              CHOOSE YOUR <span className="text-[#FFD100]" style={{ WebkitTextStroke: "2px black", color: "transparent" }}>ADVENTURE</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Tabs System */}
      <section className="px-6 relative z-20 mb-8">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4 md:gap-6">
          {programsData.map((program, index) => {
            const isActive = activeTab === index;
            return (
              <button
                key={index}
                onClick={() => handleTabChange(index)}
                className="relative group outline-none"
              >
                <div className="absolute inset-0 translate-x-[4px] translate-y-[4px] bg-black rounded-xl transition-transform" />
                <div
                  className={`relative border-4 border-black px-6 py-3 rounded-xl font-barabara text-sm md:text-base uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${
                    isActive ? "-translate-y-1 -translate-x-1 text-white" : "bg-white text-black hover:-translate-y-1 hover:-translate-x-1"
                  }`}
                  style={{ backgroundColor: isActive ? program.color : "white" }}
                >
                  <program.icon size={18} className={isActive ? "text-white" : "text-black"} />
                  {program.shortTitle}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Program Display Content */}
      <section className="px-6 relative z-10 min-h-[400px]">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              {/* Background Blob */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[120%] opacity-[0.08] blur-3xl rounded-full pointer-events-none transition-colors duration-500"
                style={{ backgroundColor: activeProgram.color }}
              />

              <div className="text-center mb-10 relative z-10">
                <div className="inline-block border-2 border-black px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-xs bg-white mb-2" style={{ boxShadow: "2px 2px 0px #000" }}>
                  Trait: {activeProgram.trait}
                </div>
                <h3
                  className="font-pipanganan text-4xl md:text-5xl uppercase leading-none drop-shadow-[2px_2px_0px_rgba(0,0,0,0.1)] transition-colors duration-500"
                  style={{ color: activeProgram.color }}
                >
                  {activeProgram.title}
                </h3>
              </div>

              {/* Grid for Incoming / Outgoing */}
              <div className="grid md:grid-cols-2 gap-8 relative z-10">

                {/* Incoming Card */}
                <div className="group relative h-full flex flex-col">
                  <div className="absolute inset-0 translate-x-[6px] translate-y-[6px] bg-black rounded-3xl" />
                  <div className="relative bg-white border-4 border-black rounded-3xl p-6 md:p-8 flex flex-col h-full hover:-translate-y-2 hover:-translate-x-2 transition-transform duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-gray-100 rounded-xl border-2 border-black">
                        <PlaneLanding size={24} className="text-black" />
                      </div>
                      <h4 className="font-barabara text-xl md:text-2xl uppercase tracking-wide">
                        Incoming to PH
                      </h4>
                    </div>
                    <h5 className="text-lg font-bold mb-3" style={{ color: activeProgram.color }}>
                      {activeProgram.incoming.title}
                    </h5>
                    <p className="text-gray-600 font-medium leading-relaxed mb-8 flex-grow">
                      {activeProgram.incoming.desc}
                    </p>
                    <button
                      onClick={() => handleActionClick("Incoming")}
                      className="w-full text-white font-barabara text-sm md:text-base py-3 rounded-xl uppercase tracking-widest border-2 border-black flex items-center justify-center gap-2 hover:bg-black transition-colors"
                      style={{ backgroundColor: activeProgram.color, boxShadow: "4px 4px 0px #000" }}
                    >
                      {activeProgram.incoming.action} <ArrowRight size={18} />
                    </button>
                  </div>
                </div>

                {/* Outgoing Card */}
                <div className="group relative h-full flex flex-col">
                  <div className="absolute inset-0 translate-x-[6px] translate-y-[6px] bg-black rounded-3xl" />
                  <div className="relative bg-white border-4 border-black rounded-3xl p-6 md:p-8 flex flex-col h-full hover:-translate-y-2 hover:-translate-x-2 transition-transform duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-gray-100 rounded-xl border-2 border-black">
                        <PlaneTakeoff size={24} className="text-black" />
                      </div>
                      <h4 className="font-barabara text-xl md:text-2xl uppercase tracking-wide">
                        Outgoing from PH
                      </h4>
                    </div>
                    <h5 className="text-lg font-bold mb-3" style={{ color: activeProgram.color }}>
                      {activeProgram.outgoing.title}
                    </h5>
                    <p className="text-gray-600 font-medium leading-relaxed mb-8 flex-grow">
                      {activeProgram.outgoing.desc}
                    </p>
                    <button
                      onClick={() => window.open('https://aiesec.org/search', '_blank')}
                      className="w-full text-black font-barabara text-sm md:text-base py-3 rounded-xl uppercase tracking-widest border-2 border-black flex items-center justify-center gap-2 bg-white transition-colors hover:bg-gray-50"
                      style={{ boxShadow: `4px 4px 0px ${activeProgram.color}` }}
                    >
                      {activeProgram.outgoing.action} <ArrowRight size={18} />
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Opportunities Database Section */}
      <section ref={databaseRef} className="py-24 px-6 relative z-10 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white border-4 border-black rounded-3xl p-6 md:p-10 shadow-[8px_8px_0px_#000]">

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
              <div>
                <h2 className="font-pipanganan text-4xl text-black uppercase tracking-wide mb-2">
                  Search for <span className="text-[#037ef3]">PH Opportunities</span>
                </h2>
                <p className="text-gray-600 font-medium">Explore and filter all available opportunities below.</p>
              </div>

              {/* Search Bar */}
              <div className="w-full md:w-auto relative group">
                <div className="absolute inset-0 translate-x-[3px] translate-y-[3px] bg-black rounded-xl" />
                <div className="relative flex items-center bg-white border-2 border-black rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#FFD100]">
                  <div className="pl-4 pr-2 py-3 bg-white">
                    <Search size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by title or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full md:w-64 py-3 pr-4 outline-none text-black font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Filters Row */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 pb-6 border-b-2 border-gray-200">
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-gray-500" />
                <span className="font-bold uppercase tracking-wider text-sm mr-2">Program:</span>
                <div className="flex bg-gray-100 border-2 border-black rounded-lg p-1">
                  {["All", "Volunteer", "Talent", "Teacher"].map((prog) => (
                    <button
                      key={prog}
                      onClick={() => setDbProgramFilter(prog)}
                      className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase transition-all ${
                        dbProgramFilter === prog ? "bg-white border-2 border-black shadow-[2px_2px_0px_#000] text-black" : "text-gray-500 hover:text-black border-2 border-transparent"
                      }`}
                    >
                      {prog}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Data Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Loading State */}
              {loading && (
                <div className="col-span-full py-16 flex flex-col items-center justify-center gap-4">
                  <Loader2 size={40} className="text-[#037ef3] animate-spin" />
                  <p className="text-gray-500 font-medium">Loading opportunities...</p>
                </div>
              )}

              {/* Error State */}
              {!loading && error && (
                <div className="col-span-full py-12 text-center border-2 border-dashed border-red-300 rounded-xl">
                  <p className="text-red-500 font-bold">{error}</p>
                </div>
              )}

              {/* Results */}
              {!loading && !error && (
                <AnimatePresence>
                  {filteredOpportunities.length > 0 ? (
                    filteredOpportunities.map((opp) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        key={opp.id}
                        className="group relative"
                      >
                        <div className="absolute inset-0 translate-x-[4px] translate-y-[4px] bg-black rounded-xl transition-transform" />
                        <div className="relative bg-white border-2 border-black p-5 rounded-xl h-full flex flex-col hover:-translate-y-1 hover:-translate-x-1 transition-transform">

                          <div className="flex justify-between items-start mb-4">
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 border-2 border-black rounded-md ${
                              opp.program === "Volunteer" ? "bg-[#EF3340] text-white" :
                              opp.program === "Talent" ? "bg-[#52BCC6] text-white" :
                              "bg-[#F58220] text-white"
                            }`}>
                              {opp.program}
                            </span>
                            <span className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
                              {opp.direction === "Incoming" ? <PlaneLanding size={14}/> : <PlaneTakeoff size={14}/>}
                              {opp.direction}
                            </span>
                          </div>

                          <h4 className="font-bold text-lg mb-2 leading-tight">{opp.title}</h4>

                          <div className="flex items-center gap-1 text-gray-600 mb-6 flex-grow">
                            <MapPin size={16} />
                            <span className="text-sm font-medium">{opp.location}</span>
                          </div>

                          <a
                            href={opp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-auto w-full border-2 border-black py-2 rounded-lg font-bold text-sm uppercase flex items-center justify-center gap-2 hover:bg-black hover:text-[#FFD100] transition-colors"
                          >
                            Go to Opportunity <ExternalLink size={16} />
                          </a>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full py-12 text-center border-2 border-dashed border-gray-300 rounded-xl">
                      <Search size={40} className="mx-auto text-gray-300 mb-4" />
                      <h3 className="text-xl font-bold text-gray-400">No opportunities found</h3>
                      <p className="text-gray-500 mt-2">Try adjusting your filters or search query.</p>
                    </div>
                  )}
                </AnimatePresence>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}