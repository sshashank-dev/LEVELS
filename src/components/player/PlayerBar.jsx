import React, { useEffect, useState, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from 'lucide-react'; // Added Heart
import { usePlayerStore } from '../../store/usePlayerStore';
import { motion } from 'framer-motion';

// --- COLOR EXTRACTION HOOK (STABLE) ---
const useDynamicColor = (imageUrl) => {
    const [color, setColor] = useState('255, 255, 255');
    useEffect(() => {
        if (!imageUrl) return;
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = imageUrl;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            canvas.width = 1; canvas.height = 1;
            ctx.drawImage(img, 0, 0, 1, 1);
            const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
            setColor(`${r}, ${g}, ${b}`);
        };
    }, [imageUrl]);
    return color;
};

const PlayerBar = () => {
    const {
        currentTrack, isPlaying, togglePlay, playNext, playPrevious,
        volume, setVolume, howl,
        likedSongs, toggleLike // Added from your store
    } = usePlayerStore();

    const dynamicColor = useDynamicColor(currentTrack?.cover);
    const [localTime, setLocalTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    // Check if current track is liked
    const isLiked = likedSongs?.some(s => s.id === currentTrack?.id);

    const timeRef = useRef(0);

    useEffect(() => {
        if (!howl) return;
        const updateDuration = () => {
            const d = howl.duration();
            if (d && d !== Infinity) setDuration(d);
        };
        howl.on('load', updateDuration);
        howl.on('play', updateDuration);
        if (howl.state() === 'loaded') updateDuration();
        return () => {
            howl.off('load', updateDuration);
            howl.off('play', updateDuration);
        };
    }, [howl]);

    useEffect(() => {
        let interval;
        const sync = () => {
            if (howl && howl.playing() && !isDragging) {
                const seek = howl.seek();
                if (typeof seek === 'number') {
                    setLocalTime(seek);
                }
            }
        };
        if (isPlaying && !isDragging) {
            interval = setInterval(sync, 100);
        }
        return () => clearInterval(interval);
    }, [howl, isPlaying, isDragging]);

    const format = (s) => {
        if (!s || isNaN(s)) return "0:00";
        const mins = Math.floor(s / 60);
        const secs = Math.floor(s % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const progressPercent = duration > 0 ? (localTime / duration) * 100 : 0;

    const handleScrubChange = (e) => {
        setIsDragging(true);
        setLocalTime(parseFloat(e.target.value));
    };

    const handleScrubEnd = (e) => {
        const newPos = parseFloat(e.target.value);
        if (howl) {
            howl.seek(newPos);
        }
        setTimeout(() => setIsDragging(false), 200);
    };

    if (!currentTrack) return null;

    return (
        <motion.div
            initial={{ y: 120, scale: 0.9 }}
            animate={{ y: 0, scale: 1 }}
            className="fixed bottom-10 inset-x-0 z-[100] flex justify-center px-6 pointer-events-none"
        >
            <div className="relative group pointer-events-auto">
                <div className="absolute -inset-[1.5px] rounded-[3rem] overflow-hidden opacity-40 group-hover:opacity-80 transition-opacity duration-1000">
                    <div
                        className="absolute inset-0 transition-all duration-300"
                        style={{
                            background: `rgb(${dynamicColor})`,
                            clipPath: `inset(0 ${100 - progressPercent}% 0 0)`,
                            filter: 'blur(4px)'
                        }}
                    />
                </div>

                <div
                    className="relative flex items-center backdrop-blur-[40px] saturate-[200%] rounded-[3rem] p-2 pr-8 gap-8 border border-white/30 transition-all duration-1000 shadow-2xl"
                    style={{
                        backgroundColor: `rgba(${dynamicColor}, 0.12)`,
                        boxShadow: `0 20px 50px rgba(${dynamicColor}, 0.2)`
                    }}
                >
                    {/* LEFT: INFO */}
                    <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16">
                            <motion.div
                                animate={isPlaying ? { rotate: 360 } : {}}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="w-full h-full rounded-full border-2 border-white/40 shadow-xl overflow-hidden"
                            >
                                <img src={currentTrack.cover} alt="" className="w-full h-full object-cover" />
                            </motion.div>
                        </div>
                        <div className="flex flex-col max-w-[150px]">
                            <h4 className="text-sm font-black text-white truncate italic uppercase tracking-tighter">
                                {currentTrack.title}
                            </h4>
                            <p className="text-[10px] text-white/50 font-mono tracking-widest uppercase truncate">
                                {currentTrack.artist}
                            </p>
                        </div>

                        {/* --- NEW LIKE BUTTON --- */}
                        <motion.button
                            whileTap={{ scale: 0.7 }}
                            onClick={() => toggleLike(currentTrack)}
                            className={`ml-2 transition-colors duration-300 ${isLiked ? 'text-red-500' : 'text-white/20 hover:text-white/60'}`}
                        >
                            <Heart size={18} fill={isLiked ? "currentColor" : "none"} strokeWidth={2.5} />
                        </motion.button>
                        {/* ----------------------- */}
                    </div>

                    {/* CENTER: CONTROLS */}
                    <div className="flex items-center gap-6">
                        <button onClick={playPrevious} className="text-white/40 hover:text-white transition-all active:scale-75">
                            <SkipBack size={20} fill="currentColor" />
                        </button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={togglePlay}
                            className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-black shadow-lg"
                        >
                            {isPlaying ? <Pause size={28} fill="black" /> : <Play size={28} fill="black" className="ml-1" />}
                        </motion.button>
                        <button onClick={playNext} className="text-white/40 hover:text-white transition-all active:scale-75">
                            <SkipForward size={20} fill="currentColor" />
                        </button>
                    </div>

                    {/* RIGHT: SCRUBBER */}
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end gap-1 group/scrub">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono text-white/80 tracking-tighter">
                                    {format(localTime)} <span className="text-white/30">/ {format(duration)}</span>
                                </span>
                            </div>
                            <div className="w-24 h-1 bg-white/10 rounded-full relative overflow-visible group-hover/scrub:w-32 transition-all duration-500">
                                <div
                                    className="absolute inset-y-0 left-0 transition-all duration-150 rounded-full pointer-events-none"
                                    style={{
                                        width: `${progressPercent}%`,
                                        backgroundColor: `rgb(${dynamicColor})`,
                                        boxShadow: `0 0 10px rgb(${dynamicColor})`
                                    }}
                                />
                                <input
                                    type="range"
                                    min="0"
                                    max={duration || 0}
                                    step="0.1"
                                    value={localTime}
                                    onChange={handleScrubChange}
                                    onMouseUp={handleScrubEnd}
                                    onTouchEnd={handleScrubEnd}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
                                />
                            </div>
                        </div>

                        {/* VOLUME */}
                        <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full border border-white/10">
                            <Volume2 size={16} className="text-white/60" />
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={(e) => setVolume(parseFloat(e.target.value))}
                                className="w-16 h-1 accent-white bg-white/10 rounded-full appearance-none cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PlayerBar;