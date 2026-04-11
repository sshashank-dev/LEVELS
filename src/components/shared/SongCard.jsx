import React, { memo, useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Heart, Music } from 'lucide-react';
import { usePlayerStore } from '../../store/usePlayerStore';

const SongCard = memo(({ track, collection = [] }) => {
    const setTrack = usePlayerStore((state) => state.setTrack);
    const setQueue = usePlayerStore((state) => state.setQueue);
    const togglePlay = usePlayerStore((state) => state.togglePlay);
    const toggleLike = usePlayerStore((state) => state.toggleLike);
    const currentTrackId = usePlayerStore((state) => state.currentTrack?.id);
    const isPlaying = usePlayerStore((state) => state.isPlaying);
    const likedSongs = usePlayerStore((state) => state.likedSongs);

    const isLiked = likedSongs?.some(s => s.id === track?.id) || false;
    const [imgSrc, setImgSrc] = useState(track?.cover);

    useEffect(() => {
        setImgSrc(track?.cover);
    }, [track?.cover]);

    const isCurrent = currentTrackId === track?.id;
    const isActuallyPlaying = isCurrent && isPlaying;

    const handlePlay = (e) => {
        e.stopPropagation();
        if (isCurrent) {
            togglePlay();
        } else {
            setQueue(collection);
            setTrack(track);
        }
    };

    const cleanTitle = (title) => {
        if (!title) return "Unknown Track";
        return title.split(/\(|\{|\[|feat\.|ft\./i)[0].trim();
    };

    const overlayStyle = useMemo(() => {
        return isActuallyPlaying
            ? "bg-gradient-to-t from-black/80 via-black/20 to-transparent"
            : "bg-gradient-to-t from-black/60 via-transparent to-transparent";
    }, [isActuallyPlaying]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -10, scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            // --- FIX IS HERE: added overflow-hidden and isolate ---
            className={`group relative p-4 rounded-[2rem] border transition-all duration-500 cursor-pointer 
            overflow-hidden isolate
            ${isCurrent
                    ? 'bg-zinc-800/40 border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)]'
                    : 'bg-zinc-900/20 border-white/5 hover:bg-zinc-800/30 hover:border-white/10'
                }`}
            onClick={() => {
                setQueue(collection);
                setTrack(track);
            }}
        >
            {/* Image Container */}
            <div className="relative aspect-square mb-5 rounded-[1.5rem] overflow-hidden bg-zinc-900 shadow-2xl flex items-center justify-center isolate">
                {imgSrc ? (
                    <img
                        src={imgSrc}
                        loading="lazy"
                        alt={track?.title}
                        className={`object-cover w-full h-full transition-transform duration-700 ease-out
                        ${isActuallyPlaying ? 'scale-110 saturate-110' : 'grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110'}`}
                        onError={() => setImgSrc(null)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
                        <Music size={32} className="text-zinc-600 opacity-60" />
                    </div>
                )}

                <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${overlayStyle}`} />

                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 
                    ${isCurrent ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handlePlay}
                        className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                    >
                        {isActuallyPlaying ? <Pause fill="black" size={24} /> : <Play fill="black" size={24} className="ml-1" />}
                    </motion.button>
                </div>
            </div>

            <div className="px-2 pb-2">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                        <h3 className={`font-black truncate text-sm uppercase italic tracking-tight
                            ${isCurrent ? 'text-blue-400' : 'text-zinc-100 group-hover:text-white'}`}>
                            {cleanTitle(track?.title)}
                        </h3>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] mt-1 truncate font-mono">
                            {track?.artist || "Unknown Artist"}
                        </p>
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(track);
                        }}
                        className={`transition-all duration-300
                            ${isLiked ? 'text-red-500 scale-110' : 'text-zinc-600 hover:text-white hover:scale-110'}`}
                    >
                        <Heart size={16} fill={isLiked ? "currentColor" : "none"} strokeWidth={isLiked ? 0 : 2} />
                    </button>
                </div>
            </div>

            {isCurrent && (
                <div className="absolute top-6 right-6">
                    <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </div>
                </div>
            )}
        </motion.div>
    );
});

export default SongCard;









