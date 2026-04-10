import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, Share2 } from 'lucide-react';
import { usePlayerStore } from '../../store/usePlayerStore';

const MetadataSidebar = () => {
    const { currentTrack, isMetadataOpen, toggleMetadata, isPlaying } = usePlayerStore();

    return (
        <AnimatePresence>
            {isMetadataOpen && (
                <motion.aside initial={{ x: 400, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 400, opacity: 0 }} transition={{ type: 'spring', damping: 25 }} className="w-85 h-screen border-l border-system-border bg-system-bg p-8 flex flex-col gap-10 shadow-[-20px_0_40px_rgba(0,0,0,0.5)] z-50">
                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                        <span className="text-[10px] font-mono tracking-[0.4em] text-system-accent uppercase font-black">System_Metadata</span>
                        <X size={20} className="cursor-pointer text-zinc-500 hover:text-white" onClick={toggleMetadata} />
                    </div>
                    <div className="aspect-square rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl group relative">
                        <img src={currentTrack?.cover} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="flex items-end justify-center gap-1.5 h-12">
                        {[...Array(12)].map((_, i) => (
                            <motion.div key={i} animate={{ height: isPlaying ? [10, 45, 15, 35, 10] : 4 }} transition={{ duration: 0.6 + Math.random(), repeat: Infinity }} className="w-2 bg-system-accent/40 rounded-full" />
                        ))}
                    </div>
                    <div className="space-y-4">
                        <div className="p-5 bg-zinc-900/50 rounded-2xl border border-white/5"><p className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold mb-1">Bitrate / Codec</p><p className="font-mono text-sm text-white tracking-tighter">320 KBPS // MPEG_LAYER_3</p></div>
                        <div className="p-5 bg-zinc-900/50 rounded-2xl border border-white/5"><p className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold mb-1">Audio Protocol</p><p className="font-mono text-sm text-white tracking-tighter">STEREO // 44.1 KHZ</p></div>
                    </div>
                    <button className="mt-auto w-full py-4 bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] rounded-2xl hover:bg-system-accent hover:text-white transition-all">Download Metadata</button>
                </motion.aside>
            )}
        </AnimatePresence>
    );
};

export default MetadataSidebar;