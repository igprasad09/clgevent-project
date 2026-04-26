import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, GraduationCap, Trophy, Microscope, Mic, ArrowRight } from 'lucide-react';

const events = [
  {
    id: 0,
    icon: <GraduationCap className="w-8 h-8" />,
    iconText: <img src="/kannada.png" className='w-8' alt="K" />,
    iconBg: "rgba(59, 109, 17, 0.25)",
    badgeColor: "#84cc41",
    title: "Kannada Habba",
    badge: "Cultural",
    date: "May 05, 2026",
    venue: "BCA Open Hall Auditorium",
    time: "10:00 AM",
    desc: "Our culture is our pride — let's celebrate it with full energy. This is not just a fest, it's a celebration of who we are. KANNADIGA!",
    highlights: ["Banner Presentation", "Prize Distribution", "Fun Games", "Open Dance"],
    reg: "Register for Kannada Habba"
  },
  {
    id: 1, 
    icon: <Trophy className="w-8 h-8" />,
    iconText: <img src="/food.png" alt="🍕" />,
    iconBg: "rgba(24, 95, 165, 0.35)",
    badgeColor: "#60a5fa",
    title: "Food Fest & PUBG",
    badge: "Gaming",
    date: "May 06, 2026",
    venue: "College LH-1 & LH-2",
    time: "11:00 AM",
    desc: "Food Fest — good food is the foundation of genuine happiness. PUBG — Fear the zone, trust your squad, and dominate the match. Food Fest Rules: 1) Hygiene 2) Fireless food 3) Cleanliness.",
    highlights: ["Food Fest", "PUBG Tournament", "Fun Games"],
    reg: "Register for PUBG"
  },
  {
    id: 2,
    icon: <Microscope className="w-8 h-8" />,
    iconText: "🎓",
    iconBg: "rgba(163, 45, 45, 0.35)",
    badgeColor: "#fb7185",
    title: "Graduation Day",
    badge: "Graduate",
    date: "May 07, 2026",
    venue: "BCA Auditorium",
    time: "10:00 AM",
    desc: "Graduation Day is not just the end of a chapter — it is the beginning of a new journey filled with dreams, challenges, and endless possibilities.",
    highlights: ["Graduation Ceremony"],
    reg: "Life Begins"
  },
  {
    id: 3, 
    icon: <Mic className="w-8 h-8" />,
    iconText: "🎤",
    iconBg: "rgba(186, 122, 34, 0.25)",
    badgeColor: "#fbbf24",
    title: "Annual Day",
    badge: "Final Goodbye",
    date: "May 08, 2026",
    venue: "BCA Open Hall",
    time: "10:00 AM",
    desc: "SNJPSNMS Trust Degree College proudly celebrates the spirit of excellence, unity, and growth.",
    highlights: ["Solo Singing", "Group Dance", "Stand-up Jokes", "Skit"],
    reg: "Register for Dance"
  }
];

const EventPortal = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [stars, setStars] = useState([]);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Generate star positions
    const newStars = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2.5 + 0.5,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3
    }));
    setStars(newStars);

    // Single Splash screen timer (3.5 seconds)
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  // Shared animation config for the cinematic blur
  const cinematicBlur = {
    initial: { scale: 0.85, opacity: 0, filter: "blur(12px)" },
    animate: { scale: 1, opacity: 1, filter: "blur(0px)" },
    exit: { scale: 1.1, opacity: 0, filter: "blur(12px)" },
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    style: { willChange: "transform, filter", transform: "translateZ(0)" }
  };

  return (
    <div className="min-h-screen bg-[#0a1a2e] font-sans text-slate-100 overflow-x-hidden relative">
      
      {/* --- SINGLE SPLASH SCREEN --- */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash-container"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center  from-[#1a3a5c] via-[#0d2137] to-[#0a1a2e]"
          >
            <motion.div
              {...cinematicBlur}
              className="flex flex-col items-center px-4 text-center"
            >
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-[#f7c948]/80 overflow-hidden mb-6 shadow-[0_0_50px_rgba(247,201,72,0.25)] bg-[#1a3a5c]">
                <img 
                  src="/s.jpeg" 
                  alt="Welcome" 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                />
                <div style={{ display: 'none' }} className="w-full h-full items-center justify-center text-6xl">🕉️</div>
              </div>
              <h1 className="font-serif text-[#f7c948] text-3xl md:text-5xl font-bold leading-tight mb-3">
                SNJPSNMS Trust
              </h1>
              <p className="text-white/60 tracking-[0.2em] md:tracking-[0.3em] uppercase text-xs md:text-sm">
                Degree College Nidsoshi
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN APP --- */}
      <AnimatePresence mode="wait">
        {!showSplash && !selectedEvent ? (
          /* HERO / HOME PAGE */
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-screen flex flex-col justify-center items-center p-8  from-[#1a3a5c] via-[#0d2137] to-[#0a1a2e] text-center overflow-hidden"
          >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
              {stars.map((star) => (
                <motion.div
                  key={star.id}
                  className="absolute bg-[#f7c948] rounded-full"
                  style={{
                    width: star.size,
                    height: star.size,
                    top: `${star.top}%`,
                    left: `${star.left}%`,
                  }}
                  animate={{ opacity: [0.2, 0.8, 0.2] }}
                  transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }}
                />
              ))}
              <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[#f7c948]/10 blur-3xl animate-pulse" />
              <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#f7c948]/5 blur-3xl animate-pulse" />
            </div>

            {/* Logo Section */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex flex-col md:flex-row items-center gap-5 mb-6 z-10 pt-10"
            >
              <div className="w-20 h-20 rounded-full bg-[#f7c948]/20 border-2 border-[#f7c948]/40 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(247,201,72,0.2)]">
                 <img className='w-full h-full object-cover rounded-full' src="/clglogo.jpeg" alt="College Logo" />
              </div>
              <div className="text-center md:text-left">
                <h1 className="font-serif text-[#f7c948] text-2xl md:text-3xl font-bold leading-tight">
                  SNJPSNMS Trust<br />Degree College Nidsoshi
                </h1>
                <p className="text-white/50 text-xs tracking-widest uppercase mt-1">Learn · Lead · Succeed</p>
              </div>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/60 italic text-sm mb-6 z-10"
            >
              "In these 3 years, this moment will be a memory... Let's make it unforgettable"
            </motion.p>

            <div className="w-20 h-0.5  from-transparent via-[#f7c948] to-transparent mb-8 z-10" />

            <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mb-6 z-10">Select an event to view details</p>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl z-10 pb-10">
              {events.map((event, idx) => (
                <motion.button
                  key={event.id}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  onClick={() => setSelectedEvent(event)}
                  className="group relative flex items-center gap-4 p-5 bg-white/5 border border-[#f7c948]/20 rounded-xl text-left transition-all hover:bg-[#f7c948]/10 hover:border-[#f7c948]/60 hover:shadow-2xl hover:shadow-[#f7c948]/10"
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl group-hover:rotate-[-5deg] transition-transform overflow-hidden" style={{ background: event.iconBg }}>
                    {event.iconText}
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-sm tracking-wide">{event.title}</h3>
                    <p className="text-white/40 text-[11px] mt-0.5">{event.date}</p>
                    <span className="text-[#f7c948]/50 text-[11px] group-hover:text-[#f7c948] transition-colors">see details →</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : !showSplash && selectedEvent ? (
          /* DETAIL PAGE (DARK THEME) */
          <motion.div
            key="details"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            className="flex flex-col min-h-screen from-[#0d2137] to-[#0a1a2e]"
          >
            {/* Top Bar */}
            <div className="bg-white/5 border-b border-white/5 px-6 py-4 flex items-center gap-4 backdrop-blur-sm sticky top-0 z-20">
              <button 
                onClick={() => setSelectedEvent(null)}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#f7c948]/10 border border-[#f7c948]/40 rounded-lg text-[#f7c948] text-sm font-medium hover:bg-[#f7c948]/20 transition-colors"
              >
                <ChevronLeft size={16} /> Back
              </button>
              <h2 className="font-serif text-[#f7c948] font-bold text-lg">{selectedEvent.title}</h2>
            </div>

            {/* Content Body */}
            <div className="flex-1 p-6 md:p-10 max-w-4xl mx-auto w-full">
              <div className="flex items-center gap-5 mb-8 pb-8 border-b border-white/10">
                <motion.div 
                  initial={{ scale: 0.5 }} 
                  animate={{ scale: 1 }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border border-white/10 shadow-lg shadow-black/20 overflow-hidden" 
                  style={{ background: selectedEvent.iconBg }}
                >
                  {selectedEvent.iconText}
                </motion.div>
                <div>
                  <h1 className="font-serif text-white text-3xl font-bold">{selectedEvent.title}</h1>
                  <span 
                    className="inline-block mt-2 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/5 border border-white/10" 
                    style={{ color: selectedEvent.badgeColor }}
                  >
                    {selectedEvent.badge}
                  </span>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { label: "Date", val: selectedEvent.date },
                  { label: "Venue", val: selectedEvent.venue },
                  { label: "Time", val: selectedEvent.time }
                ].map((info, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors shadow-lg shadow-black/10"
                  >
                    <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest">{info.label}</p>
                    <p className="text-white font-semibold text-sm mt-1">{info.val}</p>
                  </motion.div>
                ))}
              </div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-white/70 leading-relaxed mb-10 text-[15px]"
              >
                {selectedEvent.desc}
              </motion.p>

              <h4 className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-4">Event Highlights</h4>
              <div className="flex flex-wrap gap-3 mb-12">
                {selectedEvent.highlights.map((h, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-white/5 border border-white/10 text-white/90 rounded-full text-xs font-medium cursor-default hover:bg-[#f7c948] hover:text-[#0a1a2e] hover:border-[#f7c948] transition-all"
                  >
                    {h}
                  </motion.span>
                ))}
              </div>

              {/* --- CONDITIONALLY RENDERED REGISTRATION BUTTON --- */}
              {(selectedEvent.id === 1 || selectedEvent.id === 3) && (
                <motion.button
                  whileHover={{ y: -3, boxShadow: '0 10px 25px -5px rgba(247, 201, 72, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="w-full sm:w-auto px-10 py-4 bg-[#f7c948] text-[#0d2137] rounded-xl font-bold tracking-wide transition-all flex items-center justify-center gap-2 hover:bg-[#ffdb69]"
                >
                  {selectedEvent.reg} <ArrowRight size={18} />
                </motion.button>
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default EventPortal;