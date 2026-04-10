import React, { useState } from 'react';
import { usePlayerStore } from '../../store/usePlayerStore';
import { Home, Compass, Clock, Library, Search, Activity, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ setView }) => {
    const { likedSongs, setTrack, currentTrack, isPlaying, setQueue } = usePlayerStore();
    const [activeTab, setActiveTab] = useState('Home');

    // ✅ Navigation Handler
    const handleNav = (label) => {
        setActiveTab(label);
        if (setView) setView(label.toLowerCase());
    };

    // ✅ Track Selection from Library
    const handleLibraryPlay = (song) => {
        setQueue(likedSongs);
        setTrack(song);
    };

    const navItems = [
        { icon: <Home size={18} strokeWidth={1.5} />, label: 'Home' },
        { icon: <Search size={18} strokeWidth={1.5} />, label: 'Search' },
        { icon: <Compass size={18} strokeWidth={1.5} />, label: 'Explore' },
        { icon: <Clock size={18} strokeWidth={1.5} />, label: 'History' },
        { icon: <Heart size={18} strokeWidth={1.5} />, label: 'Liked' }
    ];

    return (
        <motion.div
            className="relative h-screen bg-black flex flex-col items-center py-8 z-[110] group/sidebar transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] border-r border-white/[0.03] shrink-0 overflow-hidden"
            initial={{ width: '70px' }}
            whileHover={{ width: '260px' }}
        >
            {/* 🌌 LOGO SECTION - Data Core Aesthetic */}
            <div
                className="mb-12 flex flex-col items-center justify-center w-full cursor-pointer px-4 h-12"
                onClick={() => handleNav('Home')}
            >
                <div className="flex items-center justify-start w-full ml-2">
                    {/* The Data Core Icon */}
                    <div className="relative flex items-center justify-center w-8 h-8 shrink-0">
                        {/* Outer Rotating Ring */}
                        <motion.div
                            className="absolute inset-0 border border-dashed border-zinc-500 rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{
                                repeat: Infinity,
                                duration: isPlaying ? 3 : 8,
                                ease: "linear"
                            }}
                        />
                        {/* Inner Solid Pulsing Core */}
                        <motion.div
                            className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                            animate={isPlaying ? { scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] } : { scale: 1 }}
                            transition={{ repeat: Infinity, duration: 1 }}
                        />
                        {/* Scanning Line (Only when playing) */}
                        {isPlaying && (
                            <motion.div
                                className="absolute w-full h-[1px] bg-white/40"
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            />
                        )}
                    </div>

                    {/* Logo Text */}
                    <motion.div
                        className="hidden group-hover/sidebar:flex flex-col leading-none ml-5"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <span className="font-black italic tracking-tighter text-2xl text-white whitespace-nowrap uppercase">
                            Levels
                        </span>
                        <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-[7px] font-mono text-zinc-500 tracking-[0.4em] uppercase whitespace-nowrap">
                                Core_v2.0
                            </span>
                            <div className="h-[3px] w-[3px] rounded-full bg-green-500 animate-pulse" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* 📍 FUNCTIONAL NAVIGATION */}
            <nav className="w-full space-y-2 px-3">
                {navItems.map((item) => (
                    <button
                        key={item.label}
                        onClick={() => handleNav(item.label)}
                        className={`relative w-full flex items-center h-12 rounded-xl transition-all duration-500 overflow-hidden group/item ${activeTab === item.label ? 'text-white' : 'text-zinc-600 hover:text-zinc-300'
                            }`}
                    >
                        <div className="min-w-[46px] flex justify-center z-10">
                            {item.icon}
                        </div>
                        <span className="opacity-0 group-hover/sidebar:opacity-100 transition-all duration-500 text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap ml-4">
                            {item.label}
                        </span>

                        {activeTab === item.label && (
                            <motion.div
                                layoutId="navGlow"
                                className="absolute inset-0 bg-white/[0.07] border-l-2 border-white z-0"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                    </button>
                ))}
            </nav>

            <div className="my-10 w-[1px] h-12 bg-gradient-to-b from-transparent via-zinc-800 to-transparent group-hover/sidebar:w-3/4 group-hover/sidebar:h-[1px] transition-all duration-500" />

            {/* 📀 DYNAMIC LIBRARY (Liked Songs) */}
            <div className="flex-1 w-full flex flex-col overflow-hidden px-3">
                <div
                    className="flex items-center h-8 mb-4 cursor-pointer hover:bg-white/5 rounded-lg transition-colors"
                    onClick={() => handleNav('Liked')}
                >
                    <div className="min-w-[46px] flex justify-center">
                        <Library size={18} strokeWidth={1.5} className={activeTab === 'Liked' ? "text-white" : "text-zinc-400"} />
                    </div>
                    <span className="opacity-0 group-hover/sidebar:opacity-100 text-[9px] font-mono text-zinc-500 uppercase tracking-widest ml-4 whitespace-nowrap">
                        Library // {likedSongs.length} Tracks
                    </span>
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar space-y-4">
                    {likedSongs.map((song) => {
                        const isCurrent = currentTrack?.id === song.id;
                        return (
                            <button
                                key={song.id}
                                onClick={() => handleLibraryPlay(song)}
                                className="group/song flex items-center w-full transition-transform active:scale-95"
                            >
                                <div className="relative min-w-[46px] flex justify-center">
                                    <img
                                        src={song.cover}
                                        className={`h-10 w-10 rounded-sm object-cover transition-all duration-700 ${isCurrent
                                            ? 'scale-110 brightness-110 shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                                            : 'grayscale hover:grayscale-0 opacity-60 hover:opacity-100'
                                            }`}
                                        alt={song.title}
                                    />
                                    {isCurrent && (
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                            <div className="flex gap-[2px] items-end h-3">
                                                <motion.div animate={{ height: [2, 8, 2] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-[1.5px] bg-white" />
                                                <motion.div animate={{ height: [4, 10, 4] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }} className="w-[1.5px] bg-white" />
                                                <motion.div animate={{ height: [2, 8, 2] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }} className="w-[1.5px] bg-white" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="opacity-0 group-hover/sidebar:opacity-100 transition-all duration-500 pl-4 text-left overflow-hidden">
                                    <p className={`text-[10px] font-black truncate uppercase italic tracking-tight ${isCurrent ? 'text-white' : 'text-zinc-400'}`}>
                                        {song.title}
                                    </p>
                                    <p className="text-[8px] text-zinc-600 truncate uppercase font-mono mt-0.5">
                                        {song.artist}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* 🔋 SYSTEM STATUS POD */}
            <div className="w-full p-4 mt-auto">
                <div className="flex items-center overflow-hidden h-10 rounded-xl bg-zinc-900/30 border border-white/[0.02]">
                    <div className="min-w-[38px] flex justify-center">
                        {isPlaying ? (
                            <Activity size={14} className="text-white animate-pulse" />
                        ) : (
                            <div className="h-1.5 w-1.5 bg-zinc-700 rounded-full" />
                        )}
                    </div>
                    <div className="opacity-0 group-hover/sidebar:opacity-100 flex flex-col transition-all duration-500">
                        <span className="text-[8px] font-mono text-white uppercase tracking-widest whitespace-nowrap">
                            {isPlaying ? 'Audio_Streaming' : 'System_Standby'}
                        </span>
                        <span className="text-[6px] font-mono text-zinc-600 uppercase">Buffer: 100%</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Sidebar;