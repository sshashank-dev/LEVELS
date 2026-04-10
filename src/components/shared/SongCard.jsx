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











// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Sidebar from './components/layout/Sidebar';
// import PlayerBar from './components/player/PlayerBar';
// import Footer from './components/layout/Footer';
// import Hero from './components/layout/Hero';
// import SongCard from './components/shared/SongCard';
// import CartoonMascot from './components/shared/CartoonMascot';
// import { searchGlobalSongs } from './services/saavnApi';
// import { FEATURED_CONTENT } from './constants/featuredData';
// import { usePlayerStore } from './store/usePlayerStore';
// import { Search, User } from 'lucide-react';

// const SLOW_EASE = [0.19, 1, 0.22, 1];

// function App() {
//   const [view, setView] = useState("home");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const mainRef = useRef(null);

//   const likedSongs = usePlayerStore((state) => state.likedSongs);

//   useEffect(() => {
//     const el = mainRef.current;
//     if (!el) return;
//     const onScroll = () => setIsScrolled(el.scrollTop > 30);
//     el.addEventListener('scroll', onScroll);
//     return () => el.removeEventListener('scroll', onScroll);
//   }, []);

//   useEffect(() => {
//     const timer = setTimeout(async () => {
//       if (searchQuery.length > 2) {
//         setView("search");
//         const songs = await searchGlobalSongs(searchQuery);
//         setSearchResults(songs || []);
//       } else if (searchQuery.length === 0 && view === "search") {
//         setView("home");
//       }
//     }, 500);
//     return () => clearTimeout(timer);
//   }, [searchQuery]);

//   return (
//     <div className="flex h-screen w-full bg-black text-white overflow-hidden font-sans select-none">

//       {/* SIDEBAR */}
//       <Sidebar setView={setView} activeView={view} />

//       <div className="flex-1 flex flex-col relative min-w-0">

//         {/* 🛸 FLOATING CURVED HEADER */}
//         {/* We use left-1/2 and -translate-x-1/2 to center it in the remaining space */}
//         {/* 🛸 FLOATING HEADER WITH MANUAL RIGHT GAP */}
//         <header
//           className={`fixed top-0 z-[60] h-20 transition-all duration-1000 
  
//   /* 🛠️ ALIGNMENT & WIDTH */
//   left-[260px]      /* Starts exactly at the sidebar edge */
//   w-[calc(100%-260px-260px)]  /* The '40px' at the end is your manual right gap */
  
//   flex items-center px-8 
//   rounded-br-[40px] /* Only curve the right side to keep the left flush */
//   rounded-bl-[40px]
//   border-r border-b border-white/5
//   ${isScrolled ? 'glass-header shadow-2xl' : 'bg-transparent border-transparent'}`}
//           style={{ overflow: 'visible' }}
//         >
//           <div className="w-full flex items-center justify-between">

//             <div className="flex-shrink-0 text-[9px] font-black tracking-[0.4em] text-white/20 uppercase whitespace-nowrap">
//               Core_System
//             </div>

//             {/* EXTENDED SEARCHBAR */}
//             <div className="flex-1 relative group mx-10" style={{ overflow: 'visible' }}>
//               <div className="absolute inset-x-0 bottom-full pointer-events-none overflow-visible">
//                 <CartoonMascot type="gopher" isActive={searchQuery.length > 0} />
//               </div>

//               <div className="relative z-10 w-full">
//                 <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={14} />
//                 <input
//                   type="text"
//                   placeholder="SEARCH_DATABASE"
//                   className="w-full bg-white/[0.03] border border-white/5 rounded-full py-3 pl-12 pr-6 text-[10px] font-bold tracking-widest outline-none transition-all duration-700 focus:bg-white/[0.08]"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="flex-shrink-0">
//               <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 cursor-pointer">
//                 <User size={16} className="text-zinc-500" />
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* MAIN CONTENT */}
//         <main
//           id="main-content-area"
//           ref={mainRef}
//           className="flex-1 overflow-y-auto no-scrollbar pt-32 pb-44 relative bg-black"
//         >
//           <div className="px-10 max-w-7xl mx-auto w-full">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={view}
//                 initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
//                 animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//                 exit={{ opacity: 0, y: -40, filter: "blur(20px)" }}
//                 transition={{ duration: 0.9, ease: SLOW_EASE }}
//               >
//                 {view === "home" && (
//                   <div className="space-y-24">
//                     <Hero />
//                     {Object.entries(FEATURED_CONTENT).map(([category, songs]) => (
//                       <section key={category}>
//                         <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-10">{category.replace(/_/g, ' ')}</h2>
//                         <div className="flex overflow-x-auto gap-8 pb-4 no-scrollbar">
//                           {songs.map((song) => (
//                             <div key={song.id} className="flex-shrink-0 w-[220px]">
//                               <SongCard track={song} collection={songs} />
//                             </div>
//                           ))}
//                         </div>
//                       </section>
//                     ))}
//                   </div>
//                 )}

//                 {/* (Keep your search/liked logic here) */}

//                 <Footer />
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </main>
//       </div>

//       <PlayerBar />
//     </div>
//   );
// }

// export default App;
