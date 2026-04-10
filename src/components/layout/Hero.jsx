import React, { useState, useEffect } from 'react';
import { Activity, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- FULL DATASET (5 SLIDES) ---
const TRENDING_SLIDES = [
    {
        id: 1,
        title: "Global Connectivity",
        subtitle: "NETWORK_PEAK",
        description: "STREAMING HIGH-FIDELITY NODES ACROSS THE PRIMARY CORE. CURRENTLY HITTING 1.2M LISTENER NODES.",
        image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070",
        stat: "1.2M_NODES",
        color: "text-blue-500",
        accent: "bg-blue-500"
    },
    {
        id: 2,
        title: "Midnight Resonance",
        subtitle: "BASS_SYNC",
        description: "LOW-LATENCY FREQUENCY MODULATION. OPTIMIZED FOR LATE-NIGHT IMMERSIVE AUDIO ENVIRONMENTS.",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070",
        stat: "100%_LOAD",
        color: "text-purple-500",
        accent: "bg-purple-500"
    },
    {
        id: 3,
        title: "Synthetic Waves",
        subtitle: "NEURAL_SYNTH",
        description: "ALGORITHMIC FREQUENCY TRENDING ACROSS 48 GLOBAL HIGH-FIDELITY REGIONS.",
        image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070",
        stat: "+45%_GROWTH",
        color: "text-emerald-500",
        accent: "bg-emerald-500"
    },
    {
        id: 4,
        title: "Sonic Aperture",
        subtitle: "MASTER_STREAM",
        description: "DIRECT-TO-NODE MASTERING ENABLED. EXPERIENCE AUDIO EXACTLY AS INTENDED BY THE CREATORS.",
        image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070",
        stat: "320KBPS_HD",
        color: "text-amber-500",
        accent: "bg-amber-500"
    },
    {
        id: 5,
        title: "Binary Beats",
        subtitle: "LOGIC_CORE",
        description: "MINIMALIST PERCUSSION LOOPS DESIGNED FOR DEEP FOCUS AND MAXIMUM DEVELOPER OUTPUT.",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070",
        stat: "128_BPM",
        color: "text-rose-500",
        accent: "bg-rose-500"
    }
];

const Hero = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            // This logic ensures it loops through ALL slides (length of 5)
            setCurrent((prev) => (prev + 1) % TRENDING_SLIDES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const slide = TRENDING_SLIDES[current];

    return (
        <div className="relative w-full h-[500px] rounded-[3rem] overflow-hidden border border-white/5 bg-black group shadow-2xl">

            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, filter: "blur(15px)" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    {/* Background with Zoom Effect */}
                    <motion.img
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 5, ease: "linear" }}
                        src={slide.image}
                        className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale-[0.3]"
                        alt="Hero"
                    />

                    {/* Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-10" />

                    {/* Content Section */}
                    <div className="relative z-20 h-full flex flex-col justify-end p-16 space-y-8">

                        {/* Status Badges */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-4"
                        >
                            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                                <Activity size={12} className={slide.color} />
                                <span className={`font-mono text-[10px] uppercase tracking-[0.3em] font-black ${slide.color}`}>
                                    {slide.subtitle}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-white/20 font-mono text-[9px] uppercase tracking-[0.2em] border-l border-white/10 pl-4">
                                <Globe size={10} />
                                NODE_0{current + 1}
                            </div>
                        </motion.div>

                        {/* Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-8xl font-black italic tracking-tighter uppercase leading-[0.85] text-white max-w-4xl"
                        >
                            {slide.title}
                        </motion.h1>

                        {/* Telemetry Info */}
                        <div className="flex items-end gap-12 pb-4">
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="max-w-md text-zinc-500 text-[10px] font-bold leading-relaxed tracking-[0.05em] uppercase border-l border-white/10 pl-6"
                            >
                                {slide.description}
                            </motion.p>

                            <div className="flex flex-col border-l border-white/10 pl-6">
                                <span className="text-[9px] font-mono text-white/20 tracking-[0.3em] uppercase mb-1">Status_Report</span>
                                <span className={`text-2xl font-black italic tracking-tighter ${slide.color}`}>{slide.stat}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Pagination & Timer Bar */}
            <div className="absolute bottom-12 right-16 flex flex-col items-end gap-6 z-40">
                <div className="flex items-center gap-3">
                    {/* Mapping all 5 buttons */}
                    {TRENDING_SLIDES.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`h-1 transition-all duration-700 rounded-full ${i === current ? 'w-16 bg-white' : 'w-4 bg-white/10 hover:bg-white/30'}`}
                        />
                    ))}
                </div>

                <div className="w-48 h-[1px] bg-white/5 overflow-hidden rounded-full">
                    <motion.div
                        key={current}
                        initial={{ x: "-100%" }}
                        animate={{ x: "0%" }}
                        transition={{ duration: 5, ease: "linear" }}
                        className={`w-full h-full opacity-50 ${slide.accent.replace('text-', 'bg-')}`}
                    />
                </div>
            </div>

            {/* Corner System Feed */}
            <div className="absolute top-12 right-12 text-right font-mono text-[9px] text-white/10 uppercase tracking-[0.5em] hidden lg:block z-40">
                <p className="text-white/30">System: Synchronized</p>
                <p>Uplink: Core_v3</p>
                <p className="mt-4 animate-pulse text-white/20 tracking-[0.2em]">0{current + 1} / 0{TRENDING_SLIDES.length}</p>
            </div>
        </div>
    );
};

export default Hero;