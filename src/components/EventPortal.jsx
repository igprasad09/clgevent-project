import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronLeft, GraduationCap, Trophy, Microscope, Mic, ArrowRight, X, Trash2, Eye, EyeOff, Plus, CheckCircle2, AlertCircle } from 'lucide-react';

// --- FIREBASE SETUP ---
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8g5mGqxct2zKtLkUX7RwHcygwRqeSUC8",
  authDomain: "clgevents-project.firebaseapp.com",
  projectId: "clgevents-project",
  storageBucket: "clgevents-project.firebasestorage.app",
  messagingSenderId: "733990987634",
  appId: "1:733990987634:web:41412295510de0bc2f5feb",
  measurementId: "G-GG71Z1ZBN3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- EVENT DATA ---
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
    iconText: <img src="/food.png" className='w-8' alt="🍕" />,
    iconBg: "rgba(24, 95, 165, 0.35)",
    badgeColor: "#60a5fa",
    title: "Food Fest & PUBG",
    badge: "Gaming & Food",
    date: "May 06, 2026",
    venue: "College LH-1 & LH-2",
    time: "11:00 AM",
    desc: "Food Fest — good food is the foundation of genuine happiness. PUBG — Fear the zone, trust your squad, and dominate the match. Food Fest Rules: 1) Hygiene 2) Fireless food 3) Cleanliness.",
    highlights: ["Food Fest", "PUBG Tournament", "Fun Games"],
    reg: "Register (PUBG / Food Fest)"
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
    reg: "Register for Annual Day"
  }
];

// --- 3D INTERACTIVE CARD COMPONENT ---
const EventCard3D = ({ event, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xPct = (e.clientX - rect.left) / width - 0.5;
    const yPct = (e.clientY - rect.top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div style={{ perspective: 1000 }} className="w-full h-full">
      <motion.button
        onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={() => onClick(event)}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.05, z: 50 }} whileTap={{ scale: 0.95 }}
        className="w-full group relative flex items-center gap-4 p-5 bg-white/5 border border-[#f7c948]/20 rounded-xl text-left transition-colors hover:bg-white/10 hover:shadow-[0_20px_40px_rgba(247,201,72,0.15)]"
      >
        <motion.div 
          layoutId={`icon-container-${event.id}`}
          className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl group-hover:rotate-[-5deg] transition-transform overflow-hidden shrink-0 shadow-lg" 
          style={{ background: event.iconBg, transform: "translateZ(40px)" }}
        >
          <motion.div layoutId={`icon-text-${event.id}`}>{event.iconText}</motion.div>
        </motion.div>
        
        <div className="flex-1" style={{ transform: "translateZ(20px)" }}>
          <motion.h3 layoutId={`title-${event.id}`} className="text-white font-medium text-sm tracking-wide drop-shadow-md">{event.title}</motion.h3>
          <p className="text-white/50 text-[11px] mt-0.5">{event.date}</p>
          <span className="text-[#f7c948]/70 text-[11px] group-hover:text-[#f7c948] transition-colors inline-block mt-1">see details →</span>
        </div>
      </motion.button>
    </motion.div>
  );
};

// --- CONFETTI COMPONENT ---
const PartyConfetti = () => {
  const colors = ['#f7c948', '#60a5fa', '#fb7185', '#fbbf24', '#ffffff', '#84cc41'];
  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden flex items-center justify-center">
      {Array.from({ length: 80 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity: 0,
            scale: Math.random() * 1.5 + 0.5,
            x: (Math.random() - 0.5) * window.innerWidth,
            y: (Math.random() - 0.5) * window.innerHeight - 200, // Shoots mostly upwards
            rotate: Math.random() * 360
          }}
          transition={{ duration: 1.5 + Math.random() * 2, ease: "easeOut" }}
          className="absolute w-3 h-3 rounded-full"
          style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)] }}
        />
      ))}
    </div>
  );
};


const EventPortal = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [stars, setStars] = useState([]);
  const [showSplash, setShowSplash] = useState(true);
  
  // Registration Modals State
  const [regModalType, setRegModalType] = useState('none'); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Display Tabs for Event 1
  const [activeTab, setActiveTab] = useState('pubg'); 
  
  // Revealed Phones State
  const [revealedPhones, setRevealedPhones] = useState(new Set());

  // --- NEW: Custom Toast & Confetti State ---
  const [toast, setToast] = useState(null); // { message: string, type: 'success' | 'error' }
  const [showConfetti, setShowConfetti] = useState(false);

  // Database States
  const [pubgTeams, setPubgTeams] = useState([]);
  const [foodFestTeams, setFoodFestTeams] = useState([]);
  const [annualDayRegs, setAnnualDayRegs] = useState([]);

  // Form States
  const [pubgData, setPubgData] = useState({
    teamName: '', players: [{ name: '', phone: '' }, { name: '', phone: '' }, { name: '', phone: '' }, { name: '', phone: '' }]
  });
  
  const [foodData, setFoodData] = useState({
    teamName: '', players: [{ name: '', phone: '' }] 
  });

  const [annualData, setAnnualData] = useState({
    participantName: '', phone: '', category: 'Solo Singing'
  });

  // --- HELPER: Trigger Animations ---
  const showToastMsg = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500); // Auto-hide after 3.5s
  };

  const triggerPartyPop = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000); // Hide after animation finishes
  };

  // --- PREVENT BACKGROUND SCROLLING WHEN MODAL IS OPEN ---
  useEffect(() => {
    if (regModalType !== 'none') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [regModalType]);

  // --- FETCH DATA FROM FIREBASE ---
  useEffect(() => {
    const unsubPubg = onSnapshot(collection(db, "pubgTeams"), (snap) => setPubgTeams(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
    const unsubFood = onSnapshot(collection(db, "foodFestTeams"), (snap) => setFoodFestTeams(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
    const unsubAnnual = onSnapshot(collection(db, "annualDayRegs"), (snap) => setAnnualDayRegs(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
    
    return () => { unsubPubg(); unsubFood(); unsubAnnual(); };
  }, []);

  // Browser Back Button Support
  useEffect(() => {
    const handlePopState = () => { if (!window.location.hash) setSelectedEvent(null); };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openEventDetails = (event) => {
    window.history.pushState({ eventId: event.id }, '', `#event-${event.id}`);
    setSelectedEvent(event);
    setRevealedPhones(new Set()); 
  };

  const closeEventDetails = () => {
    if (window.location.hash) window.history.back();
    else setSelectedEvent(null);
  };

  // Splash Screen Background Stars
  useEffect(() => {
    const newStars = Array.from({ length: 40 }).map((_, i) => ({
      id: i, size: Math.random() * 2.5 + 0.5, top: Math.random() * 100, left: Math.random() * 100, delay: Math.random() * 3, duration: 2 + Math.random() * 3
    }));
    setStars(newStars);
    setTimeout(() => setShowSplash(false), 3500);
  }, []);

  // --- SUBMISSION HANDLERS ---
  const handleSubmit = async (e, collectionName, dataToSubmit, resetStateFn, resetDefault) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, collectionName), dataToSubmit);
      setRegModalType('none');
      resetStateFn(resetDefault);
      showToastMsg("Registration successful! 🎉", "success");
      triggerPartyPop();
    } catch (error) {
      console.error("Registration error: ", error);
      showToastMsg("Error registering. Try again.", "error");
    }
    setIsSubmitting(false);
  };

  // --- DELETION & PRIVACY HANDLERS ---
  const handleDeleteRecord = async (collectionName, id) => {
    const enteredPassword = window.prompt("Enter admin password to remove this record:");
    if (enteredPassword === null) return; 
    if (enteredPassword === "2000") {
      try {
        await deleteDoc(doc(db, collectionName, id));
        showToastMsg("Record removed successfully.", "success");
      } catch (error) { showToastMsg("Failed to remove. Check permissions.", "error"); }
    } else {
      showToastMsg("Incorrect password.", "error");
    }
  };

  const handleRevealToggle = (id) => {
    if (revealedPhones.has(id)) {
      const newSet = new Set(revealedPhones);
      newSet.delete(id);
      setRevealedPhones(newSet);
    } else {
      const pass = window.prompt("Enter admin password to view phone numbers:");
      if (pass === "2000") {
        setRevealedPhones(prev => new Set(prev).add(id));
      } else if (pass !== null) {
        showToastMsg("Incorrect password.", "error");
      }
    }
  };

  // --- DYNAMIC FOOD FEST FORM HELPERS ---
  const addFoodMember = () => {
    setFoodData(prev => ({ ...prev, players: [...prev.players, { name: '', phone: '' }] }));
  };
  const removeFoodMember = (index) => {
    setFoodData(prev => ({ ...prev, players: prev.players.filter((_, i) => i !== index) }));
  };

  return (
    <>
      {/* --- CONFETTI ANIMATION --- */}
      {showConfetti && <PartyConfetti />}

      {/* --- ANIMATED TOAST NOTIFICATION --- */}
      <div className="fixed bottom-10 left-0 right-0 flex justify-center z-[200] pointer-events-none">
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ type: "spring", bounce: 0.4 }}
              className={`flex items-center gap-3 px-6 py-4 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)] font-bold tracking-wide pointer-events-auto ${
                toast.type === 'success' ? 'bg-[#84cc41] text-[#0a1a2e]' : 'bg-[#fb7185] text-white'
              }`}
            >
              {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- REGISTRATION MODALS --- */}
      <AnimatePresence>
        {regModalType !== 'none' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-[#0d2137] border border-[#f7c948]/30 p-6 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[#f7c948] font-serif text-2xl font-bold">
                  {regModalType === 'select_event1' ? "Choose Event" : 
                   regModalType === 'pubg' ? "PUBG Registration" : 
                   regModalType === 'food' ? "Food Fest Registration" : "Annual Day Registration"}
                </h2>
                <button onClick={() => setRegModalType('none')} className="text-white/60 hover:text-white"><X size={24} /></button>
              </div>

              {/* SELECTION MODAL (Event 1) */}
              {regModalType === 'select_event1' && (
                <div className="flex flex-col gap-4">
                  <button onClick={() => setRegModalType('pubg')} className="p-5 bg-white/5 border border-white/10 rounded-xl hover:border-[#60a5fa] hover:bg-[#60a5fa]/10 transition-all text-left">
                    <h3 className="text-[#60a5fa] font-bold text-lg mb-1">🎮 PUBG Tournament</h3>
                    <p className="text-sm text-white/60">Register your 4-player squad for the battle royale.</p>
                  </button>
                  <button onClick={() => setRegModalType('food')} className="p-5 bg-white/5 border border-white/10 rounded-xl hover:border-[#fbbf24] hover:bg-[#fbbf24]/10 transition-all text-left">
                    <h3 className="text-[#fbbf24] font-bold text-lg mb-1">🍕 Food Fest</h3>
                    <p className="text-sm text-white/60">Register your team to set up a food stall.</p>
                  </button>
                </div>
              )}
              
              {/* PUBG FORM */}
              {regModalType === 'pubg' && (
                <form onSubmit={(e) => handleSubmit(e, "pubgTeams", pubgData, setPubgData, {teamName: '', players: [{name:'', phone:''},{name:'', phone:''},{name:'', phone:''},{name:'', phone:''}]})} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Team Name</label>
                    <input required type="text" value={pubgData.teamName} onChange={(e) => setPubgData({...pubgData, teamName: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-[#f7c948]" placeholder="Enter Squad Name" />
                  </div>
                  {pubgData.players.map((player, index) => (
                    <div key={index} className="p-4 bg-white/5 rounded-xl border border-white/5">
                      <h4 className="text-[#f7c948]/80 text-sm font-bold mb-3 uppercase">Player {index + 1} {index === 0 && "(Captain)"}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input required type="text" value={player.name} onChange={(e) => { const p = [...pubgData.players]; p[index].name = e.target.value; setPubgData({...pubgData, players: p}); }} className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-sm text-white focus:border-[#f7c948]" placeholder="Full Name" />
                        <input required type="tel" value={player.phone} onChange={(e) => { const p = [...pubgData.players]; p[index].phone = e.target.value; setPubgData({...pubgData, players: p}); }} className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-sm text-white focus:border-[#f7c948]" placeholder="Phone Number" />
                      </div>
                    </div>
                  ))}
                  <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-[#f7c948] text-[#0a1a2e] rounded-xl font-bold hover:bg-[#ffdb69] transition-colors">{isSubmitting ? "Registering..." : "Submit Registration"}</button>
                </form>
              )}

              {/* FOOD FEST FORM (Dynamic) */}
              {regModalType === 'food' && (
                <form onSubmit={(e) => handleSubmit(e, "foodFestTeams", foodData, setFoodData, {teamName: '', players: [{name:'', phone:''}]})} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Stall / Team Name</label>
                    <input required type="text" value={foodData.teamName} onChange={(e) => setFoodData({...foodData, teamName: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-[#f7c948]" placeholder="Enter Stall Name" />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-white/80">Team Members</label>
                    {foodData.players.map((player, index) => (
                      <div key={index} className="flex flex-col sm:flex-row gap-3 p-3 bg-white/5 rounded-lg border border-white/5 relative">
                        <input required type="text" value={player.name} onChange={(e) => { const p = [...foodData.players]; p[index].name = e.target.value; setFoodData({...foodData, players: p}); }} className="flex-1 bg-black/20 border border-white/10 rounded-lg p-2 text-sm text-white focus:border-[#f7c948]" placeholder="Full Name" />
                        <input required type="tel" value={player.phone} onChange={(e) => { const p = [...foodData.players]; p[index].phone = e.target.value; setFoodData({...foodData, players: p}); }} className="flex-1 bg-black/20 border border-white/10 rounded-lg p-2 text-sm text-white focus:border-[#f7c948]" placeholder="Phone Number" />
                        {index > 0 && (
                          <button type="button" onClick={() => removeFoodMember(index)} className="text-red-400 hover:text-red-300 p-2">
                            <X size={18} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={addFoodMember} className="flex items-center gap-2 text-sm text-[#f7c948] hover:text-[#ffdb69] font-medium mt-2">
                      <Plus size={16} /> Add another member
                    </button>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-[#f7c948] text-[#0a1a2e] rounded-xl font-bold hover:bg-[#ffdb69] transition-colors">{isSubmitting ? "Registering..." : "Submit Registration"}</button>
                </form>
              )}

              {/* ANNUAL DAY FORM */}
              {regModalType === 'annual' && (
                <form onSubmit={(e) => handleSubmit(e, "annualDayRegs", annualData, setAnnualData, {participantName: '', phone: '', category: 'Solo Singing'})} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Category / Event</label>
                    <select value={annualData.category} onChange={(e) => setAnnualData({...annualData, category: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-[#f7c948]">
                      {events[3].highlights.map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Participant / Group Name</label>
                    <input required type="text" value={annualData.participantName} onChange={(e) => setAnnualData({...annualData, participantName: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-[#f7c948]" placeholder="Enter Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Phone Number</label>
                    <input required type="tel" value={annualData.phone} onChange={(e) => setAnnualData({...annualData, phone: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-[#f7c948]" placeholder="Enter Phone Number" />
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-[#f7c948] text-[#0a1a2e] rounded-xl font-bold hover:bg-[#ffdb69] transition-colors">{isSubmitting ? "Registering..." : "Submit Registration"}</button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN APP CONTAINER --- */}
      <div style={{ perspective: 1500 }} className="min-h-screen bg-[#0a1a2e] font-sans text-slate-100 overflow-x-hidden relative">
        
        {/* --- SPLASH SCREEN --- */}
        <AnimatePresence>
          {showSplash && (
            <motion.div exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }} transition={{ duration: 0.8 }} className="fixed inset-0 z-50 flex flex-col items-center justify-center from-[#1a3a5c] via-[#0d2137] to-[#0a1a2e]">
              <motion.div className="flex flex-col items-center px-4 text-center">
                <motion.div initial={{ rotateY: 180, scale: 0.5, opacity: 0 }} animate={{ rotateY: 0, scale: 1, opacity: 1 }} transition={{ duration: 1.5, type: "spring", bounce: 0.4 }} className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-[#f7c948]/80 overflow-hidden mb-6 shadow-[0_0_80px_rgba(247,201,72,0.3)] bg-[#1a3a5c]">
                  <img src="/s.jpeg" alt="Welcome" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                </motion.div>
                <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="font-serif text-[#f7c948] text-3xl md:text-5xl font-bold leading-tight mb-3 drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">SNJPSNMS Trust</motion.h1>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-white/60 tracking-[0.2em] md:tracking-[0.3em] uppercase text-xs md:text-sm">Degree College Nidsoshi</motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- PAGE CONTENT --- */}
        <AnimatePresence mode="wait">
          {!showSplash && !selectedEvent ? (
            /* HOME PAGE */
            <motion.div key="home" initial={{ opacity: 0, rotateX: 10, z: -200 }} animate={{ opacity: 1, rotateX: 0, z: 0 }} exit={{ opacity: 0, rotateY: -15, z: -300, filter: "blur(8px)" }} transition={{ duration: 0.6 }} className="relative min-h-screen flex flex-col justify-center items-center p-8 from-[#1a3a5c] via-[#0d2137] to-[#0a1a2e] text-center overflow-hidden">
               <div className="absolute inset-0 pointer-events-none">
                {stars.map((star) => ( <motion.div key={star.id} className="absolute bg-[#f7c948] rounded-full" style={{ width: star.size, height: star.size, top: `${star.top}%`, left: `${star.left}%` }} animate={{ opacity: [0.1, 0.8, 0.1], scale: [1, 1.5, 1] }} transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }} /> ))}
                <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-[#f7c948]/5 blur-[100px] animate-pulse" />
              </div>
              <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-col md:flex-row items-center gap-5 mb-6 z-10 pt-10">
                <div className="w-24 h-24 rounded-full bg-[#f7c948]/10 border-2 border-[#f7c948]/30 flex items-center justify-center p-1 shadow-[0_0_30px_rgba(247,201,72,0.15)]"><img className='w-full h-full object-cover rounded-full' src="/clglogo.jpeg" alt="Logo" /></div>
                <div className="text-center md:text-left">
                  <h1 className="font-serif text-[#f7c948] text-2xl md:text-4xl font-bold leading-tight">SNJPSNMS Trust</h1>
                  <p className="text-white/70 text-sm md:text-md tracking-widest uppercase mt-2">Degree College Nidsoshi</p>
                </div>
              </motion.div>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#f7c948]/50 to-transparent mb-10 z-10" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl z-10 pb-10">
                {events.map((event, idx) => ( <motion.div key={event.id} initial={{ opacity: 0, y: 40, rotateX: 20 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: 0.3 + idx * 0.1 }}><EventCard3D event={event} onClick={openEventDetails} /></motion.div> ))}
              </div>
            </motion.div>

          ) : !showSplash && selectedEvent ? (

            /* DETAIL PAGE */
            <motion.div key="details" initial={{ opacity: 0, rotateY: 20, x: 100, z: -200 }} animate={{ opacity: 1, rotateY: 0, x: 0, z: 0 }} exit={{ opacity: 0, rotateY: 20, x: 100, z: -200 }} transition={{ duration: 0.5 }} className="flex flex-col min-h-screen bg-gradient-to-b from-[#0d2137] to-[#0a1a2e] relative z-20">
              {/* Top Bar */}
              <div className="bg-white/5 border-b border-white/5 px-6 py-4 flex items-center gap-4 backdrop-blur-md sticky top-0 z-30 shadow-xl">
                <button onClick={closeEventDetails} className="flex items-center gap-2 px-4 py-2 bg-[#f7c948]/10 border border-[#f7c948]/30 rounded-xl text-[#f7c948] text-sm font-semibold hover:bg-[#f7c948]/20 transition-all"><ChevronLeft size={18} /> Back</button>
                <h2 className="font-serif text-[#f7c948] font-bold text-lg hidden sm:block">{selectedEvent.title}</h2>
              </div>

              <div className="flex-1 p-6 md:p-10 max-w-4xl mx-auto w-full">
                {/* Event Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10 pb-10 border-b border-white/10">
                  <motion.div layoutId={`icon-container-${selectedEvent.id}`} className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden shrink-0" style={{ background: selectedEvent.iconBg }}><motion.div layoutId={`icon-text-${selectedEvent.id}`}>{selectedEvent.iconText}</motion.div></motion.div>
                  <div>
                    <motion.h1 layoutId={`title-${selectedEvent.id}`} className="font-serif text-white text-4xl font-bold mb-2">{selectedEvent.title}</motion.h1>
                    <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest shadow-inner" style={{ backgroundColor: selectedEvent.badgeColor + '20', color: selectedEvent.badgeColor, border: `1px solid ${selectedEvent.badgeColor}50` }}>{selectedEvent.badge}</motion.span>
                  </div>
                </div>

                {/* Event Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                  {[{ label: "Date", val: selectedEvent.date }, { label: "Venue", val: selectedEvent.venue }, { label: "Time", val: selectedEvent.time }].map((info, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }} className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                      <p className="text-[10px] text-[#f7c948] uppercase font-bold tracking-widest mb-1">{info.label}</p>
                      <p className="text-white font-medium text-sm">{info.val}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-white/80 leading-relaxed mb-12 text-[16px]">{selectedEvent.desc}</motion.p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-3 mb-16">
                  {selectedEvent.highlights.map((h, i) => (
                    <motion.span key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 + i * 0.05 }} className="px-5 py-2.5 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 text-white rounded-full text-sm font-medium">{h}</motion.span>
                  ))}
                </div>

                {/* Dynamic Registration Buttons */}
                {selectedEvent.id === 1 && (
                  <motion.button onClick={() => setRegModalType('select_event1')} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="w-full sm:w-auto px-12 py-5 bg-gradient-to-r from-[#f7c948] to-[#ffdb69] text-[#0a1a2e] rounded-2xl font-bold text-lg tracking-wide shadow-xl flex items-center justify-center gap-3 mb-16">
                    {selectedEvent.reg} <ArrowRight size={20} />
                  </motion.button>
                )}

                {selectedEvent.id === 3 && (
                  <motion.button onClick={() => setRegModalType('annual')} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="w-full sm:w-auto px-12 py-5 bg-gradient-to-r from-[#f7c948] to-[#ffdb69] text-[#0a1a2e] rounded-2xl font-bold text-lg tracking-wide shadow-xl flex items-center justify-center gap-3">
                    {selectedEvent.reg} <ArrowRight size={20} />
                  </motion.button>
                )}

                {/* --- REGISTERED TEAMS DISPLAY AREA --- */}

                {/* Event 1: PUBG & FOOD FEST TABS */}
                {selectedEvent.id === 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-10 border-t border-white/10 pt-10">
                    <div className="flex gap-4 mb-8">
                      <button onClick={() => setActiveTab('pubg')} className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${activeTab === 'pubg' ? 'bg-[#60a5fa] text-[#0a1a2e]' : 'bg-white/5 text-white/50 hover:text-white'}`}>PUBG Squads ({pubgTeams.length})</button>
                      <button onClick={() => setActiveTab('food')} className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${activeTab === 'food' ? 'bg-[#fbbf24] text-[#0a1a2e]' : 'bg-white/5 text-white/50 hover:text-white'}`}>Food Teams ({foodFestTeams.length})</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeTab === 'pubg' && pubgTeams.map((team, idx) => (
                        <div key={team.id || idx} className="bg-white/5 border border-white/10 rounded-xl p-5 relative group">
                          <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                            <h4 className="text-white text-lg font-bold flex items-center gap-2"><Trophy size={18} className="text-[#60a5fa]" /> {team.teamName}</h4>
                            <div className="flex gap-2">
                              <button onClick={() => handleRevealToggle(team.id)} className="text-white/40 hover:text-[#f7c948] p-1.5 rounded-lg bg-white/5">{revealedPhones.has(team.id) ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                              <button onClick={() => handleDeleteRecord('pubgTeams', team.id)} className="text-white/40 hover:text-red-400 p-1.5 rounded-lg bg-white/5"><Trash2 size={16} /></button>
                            </div>
                          </div>
                          <ul className="space-y-2">
                            {team.players?.map((p, i) => (
                              <li key={i} className="flex justify-between items-center text-sm">
                                <span className="text-white/80"><span className="text-white/40 mr-2">{i+1}.</span> {p.name}</span>
                                <span className="text-white/40 text-xs font-mono">{revealedPhones.has(team.id) ? p.phone : "••••••••••"}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}

                      {activeTab === 'food' && foodFestTeams.map((team, idx) => (
                        <div key={team.id || idx} className="bg-white/5 border border-white/10 rounded-xl p-5 relative group">
                          <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                            <h4 className="text-white text-lg font-bold flex items-center gap-2"><span className="text-xl">🍕</span> {team.teamName}</h4>
                            <div className="flex gap-2">
                              <button onClick={() => handleRevealToggle(team.id)} className="text-white/40 hover:text-[#f7c948] p-1.5 rounded-lg bg-white/5">{revealedPhones.has(team.id) ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                              <button onClick={() => handleDeleteRecord('foodFestTeams', team.id)} className="text-white/40 hover:text-red-400 p-1.5 rounded-lg bg-white/5"><Trash2 size={16} /></button>
                            </div>
                          </div>
                          <ul className="space-y-2">
                            {team.players?.map((p, i) => (
                              <li key={i} className="flex justify-between items-center text-sm">
                                <span className="text-white/80"><span className="text-white/40 mr-2">{i+1}.</span> {p.name}</span>
                                <span className="text-white/40 text-xs font-mono">{revealedPhones.has(team.id) ? p.phone : "••••••••••"}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Event 3: ANNUAL DAY REGISTRATIONS */}
                {selectedEvent.id === 3 && annualDayRegs.length > 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-10 border-t border-white/10 pt-10">
                    <h3 className="font-serif text-[#f7c948] text-2xl font-bold mb-6">Registered Performances ({annualDayRegs.length})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {annualDayRegs.map((reg, idx) => (
                        <div key={reg.id || idx} className="bg-white/5 border border-white/10 rounded-xl p-5 relative group flex flex-col">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <span className="text-[#fbbf24] text-xs font-bold uppercase tracking-widest bg-[#fbbf24]/10 px-2 py-1 rounded">{reg.category}</span>
                              <h4 className="text-white text-lg font-bold mt-2">{reg.participantName}</h4>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => handleRevealToggle(reg.id)} className="text-white/40 hover:text-[#f7c948] p-1.5 rounded-lg bg-white/5">{revealedPhones.has(reg.id) ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                              <button onClick={() => handleDeleteRecord('annualDayRegs', reg.id)} className="text-white/40 hover:text-red-400 p-1.5 rounded-lg bg-white/5"><Trash2 size={16} /></button>
                            </div>
                          </div>
                          <div className="mt-auto pt-4 border-t border-white/10">
                             <p className="text-sm text-white/50 flex justify-between">
                               Contact: <span className="font-mono">{revealedPhones.has(reg.id) ? reg.phone : "••••••••••"}</span>
                             </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
};

export default EventPortal;