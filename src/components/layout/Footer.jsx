import React, { useState } from 'react';

const Footer = () => {
    const [copied, setCopied] = useState(false);
    const email = "shashanksharma55204@gmail.com";

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <footer className="mt-40 border-t border-white/10 bg-black pt-20 pb-12 px-8 relative overflow-hidden">
            {/* BACKGROUND WATERMARK */}
            <div className="absolute -bottom-6 -right-6 font-black italic text-[10vw] text-white/[0.01] leading-none select-none pointer-events-none uppercase">
                LVL.
            </div>

            <div className="max-w-[1800px] mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12">

                    {/* CORE IDENTITY */}
                    <div className="max-w-md space-y-10">
                        <div>
                            <h2 className="text-4xl font-black italic tracking-tighter text-white mb-4">
                                LEVELS<span className="text-zinc-700">.</span>
                            </h2>
                            <div className="h-px w-16 bg-white/20 mb-6" />
                            <p className="text-[10px] font-mono text-zinc-500 uppercase leading-relaxed tracking-[0.3em]">
                                Digital Audio Infrastructure <br />
                                Architecture: MERN_STACK_V7
                            </p>
                        </div>

                        <div className="pt-8 border-t border-white/5">
                            <span className="block text-[9px] font-mono text-zinc-600 uppercase tracking-[0.4em] mb-4">Lead_Architect</span>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white/90">
                                    Shashank Sharma
                                </h3>
                                <p className="text-[11px] font-mono text-zinc-500 uppercase leading-relaxed tracking-widest max-w-xs">
                                    Full Stack Developer specializing in technocratic interfaces and AI-integrated systems.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* COMMUNICATION PROTOCOLS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 border-l border-white/5 pl-8">
                        <div className="space-y-6">
                            <span className="block text-[9px] font-mono text-zinc-600 uppercase tracking-[0.4em]">Comm_Protocols</span>
                            <div className="space-y-4">
                                <a
                                    href="https://www.linkedin.com/in/shashank-sharma-9b7b2b257/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col gap-1 w-fit"
                                >
                                    <span className="text-xs font-bold italic text-zinc-400 group-hover:text-white transition-colors duration-500 tracking-widest uppercase">
                                        LINKEDIN_SIGNAL // @SHASHANK
                                    </span>
                                    <div className="w-4 group-hover:w-full h-[1px] bg-white/40 transition-all duration-700" />
                                </a>

                                {/* NO-SHIFT COPY BUTTON */}
                                <button
                                    onClick={handleCopy}
                                    className="group flex flex-col gap-1 w-[350px] text-left outline-none"
                                >
                                    <div className="relative h-4 overflow-hidden">
                                        {/* Original Email */}
                                        <span className={`absolute inset-0 text-[10px] md:text-xs font-bold italic transition-all duration-500 tracking-tight uppercase ${copied ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100 text-zinc-400 group-hover:text-white'}`}>
                                            UPLINK // {email}
                                        </span>

                                        {/* Copied Message (Slides in from bottom) */}
                                        <span className={`absolute inset-0 text-[10px] md:text-xs font-bold italic transition-all duration-500 tracking-tight uppercase text-green-400 ${copied ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                                            UPLINK // COPIED TO CLIPBOARD
                                        </span>
                                    </div>
                                    <div className={`h-[1px] transition-all duration-700 ${copied ? 'w-full bg-green-500' : 'w-4 group-hover:w-full bg-white/40'}`} />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <span className="block text-[9px] font-mono text-zinc-600 uppercase tracking-[0.4em]">Engine_Health</span>
                            <div className="space-y-2">
                                <div className="flex items-center gap-4">
                                    <div className="h-1 w-1 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase">CORE_STABLE</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BOTTOM BAR */}
                <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[9px] font-mono text-zinc-800 uppercase tracking-[0.5em]">
                        © 2026_LEVELS_LABS
                    </p>
                    <div className="flex gap-1">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="w-1 h-1 bg-zinc-900 rounded-full" />
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;