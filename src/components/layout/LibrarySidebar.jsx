import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Play, BarChart2 } from 'lucide-react';
import { usePlayerStore } from '../../store/usePlayerStore';

const LibrarySidebar = () => {
    const { likedSongs, currentTrack, setTrack, isPlaying } = usePlayerStore();

    return (
        <div className="flex-1 flex flex-col min-h-0 bg-zinc-900/20 rounded-3xl border border-white/5 mt-4 overflow-hidden">
            <div className="p-5 flex items-center justify-between border-b border-white/5">
                <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase font-bold">Data_Library</span>
                <span className="text-[10px] font-mono text-system-accent">{likedSongs.length}</span>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                {likedSongs.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center p-8 opacity-20 italic">
                        <p className="text-[9px] uppercase tracking-widest text-center">No_Data_Stored</p>
                    </div>
                ) : (
                    <div className="space-y-1">
                        {likedSongs.map((song, index) => {
                            const isCurrent = currentTrack?.id === song.id;
                            return (
                                <motion.div
                                    key={song.id}
                                    onClick={() => setTrack(song)}
                                    className={`group flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all
                    ${isCurrent ? 'bg-system-accent/10' : 'hover:bg-white/5'}`}
                                >
                                    <span className="text-[9px] font-mono text-zinc-600 w-4">
                                        {(index + 1).toString().padStart(2, '0')}
                                    </span>

                                    <div className="relative h-8 w-8 rounded-lg overflow-hidden flex-shrink-0">
                                        <img src={song.cover} className="w-full h-full object-cover" />
                                        {isCurrent && isPlaying && (
                                            <div className="absolute inset-0 bg-system-accent/40 flex items-center justify-center">
                                                <BarChart2 size={12} className="text-white animate-pulse" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 truncate">
                                        <p className={`text-xs font-bold truncate uppercase ${isCurrent ? 'text-system-accent' : 'text-zinc-200'}`}>
                                            {song.title}
                                        </p>
                                        <p className="text-[9px] text-zinc-600 uppercase tracking-tighter">
                                            {song.artist}
                                        </p>
                                    </div>

                                    <Heart
                                        size={12}
                                        className={`opacity-0 group-hover:opacity-100 transition-opacity ${isCurrent ? 'opacity-100 text-system-accent' : 'text-zinc-500'}`}
                                        fill={isCurrent ? "currentColor" : "none"}
                                    />
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LibrarySidebar;