import React from 'react';
import { motion } from 'framer-motion';
import { Quote, ShieldCheck, Zap } from 'lucide-react';

const LEGENDS = [
    {
        name: "Tupac Shakur",
        tag: "THE_PROPHET",
        lifespan: "1971 - 1996",
        image: "https://images.unsplash.com/photo-1595123550441-d377e017de6a?q=80&w=2000", // Placeholder for Pac style visual
        quote: "Reality is wrong. Dreams are for real.",
        bio: "REVOLUTIONARY POET. ARCHITECT OF WEST COAST REALISM. HIS WORDS OPERATED AS A GLOBAL FREQUENCY FOR THE DISPOSSESSED.",
        accent: "border-amber-500/50"
    },
    {
        name: "Sidhu Moose Wala",
        tag: "THE_LEGACY",
        lifespan: "1993 - 2022",
        // Use this direct link for a high-impact visual
        image: "https://tse2.mm.bing.net/th/id/OIP.yNf5zGFh1KgugO58zk8XyAHaNK?rs=1&pid=ImgDetMain&o=7&rm=3",
        quote: "Duniya maut nu yaad rakhdi ae, assi maut nu jeende haan.",
        bio: "CULTURAL ICON. REDEFINED THE PUNJABI FRONTIER. A GLOBAL FORCE WHOSE SONIC FOOTPRINT REMAINS INDELIBLE IN THE CORE SYSTEM.",
        accent: "border-red-500/50"
    },
];

const LegendComponent = () => {
    return (
        <section className="py-20 space-y-32">
            {LEGENDS.map((legend, index) => (
                <motion.div
                    key={legend.name}
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                    className={`relative flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
                >
                    {/* Visual Dossier Side */}
                    <div className="relative w-full lg:w-1/2 aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 group">
                        <motion.img
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 1.5 }}
                            src={legend.image}
                            className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 transition-all duration-1000"
                            alt={legend.name}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                        {/* Overlay Data */}
                        <div className="absolute top-10 left-10 flex flex-col gap-2">
                            <span className="px-4 py-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-[10px] font-mono tracking-[0.4em] text-white/40">
                                ARCHIVE_REF: 00{index + 1}
                            </span>
                        </div>

                        <div className="absolute bottom-10 left-10 right-10">
                            <h3 className="text-6xl font-black italic uppercase tracking-tighter text-white">
                                {legend.name}
                            </h3>
                        </div>
                    </div>

                    {/* Information Side */}
                    <div className="w-full lg:w-1/2 space-y-8 px-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <ShieldCheck size={18} className="text-white/20" />
                                <span className="text-xs font-mono tracking-[0.5em] text-white/30 uppercase">LEGACY_CONFIRMED</span>
                            </div>
                            <h4 className="text-2xl font-black uppercase italic tracking-widest text-white/80">
                                {legend.tag}
                            </h4>
                            <p className="text-sm font-mono text-white/20 tracking-widest">{legend.lifespan}</p>
                        </div>

                        <div className={`p-8 bg-white/[0.02] border-l-4 ${legend.accent} rounded-r-3xl space-y-6 backdrop-blur-sm`}>
                            <Quote className="text-white/10" size={40} />
                            <p className="text-2xl font-bold italic leading-tight text-white/90 uppercase tracking-tight">
                                "{legend.quote}"
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 border-t border-white/5 pt-8">
                            <div className="space-y-2">
                                <p className="text-[9px] font-mono text-white/20 uppercase tracking-[0.3em]">Biography_Data</p>
                                <p className="text-[11px] font-bold text-zinc-500 leading-relaxed uppercase tracking-wider">
                                    {legend.bio}
                                </p>
                            </div>
                            <div className="flex flex-col justify-center items-end opacity-20">
                                <Zap size={60} strokeWidth={1} />
                                <span className="text-[8px] font-mono tracking-[1em] mr-[-1em]">IMMORTAL</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </section>
    );
};

export default LegendComponent;