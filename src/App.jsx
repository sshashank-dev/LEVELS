import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/layout/Sidebar';
import PlayerBar from './components/player/PlayerBar';
import Footer from './components/layout/Footer';
import Hero from './components/layout/Hero';
import SongCard from './components/shared/SongCard';
import LegendComponent from './components/shared/LegendComponent';

import { searchGlobalSongs } from './services/saavnApi';
import { FEATURED_CONTENT } from './constants/featuredData';
import { usePlayerStore } from './store/usePlayerStore';
import { Search, User } from 'lucide-react';

const SLOW_EASE = [0.19, 1, 0.22, 1];

function App() {
  const [view, setView] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const mainRef = useRef(null);

  const likedSongs = usePlayerStore((state) => state.likedSongs);

  const handleNavigation = (targetView) => {
    setSearchQuery("");
    setSearchResults([]);
    setView(targetView);

    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    // Optimization: throttling the state update to prevent UI jitter
    const onScroll = () => {
      const scrolled = el.scrollTop > 30;
      setIsScrolled(prev => prev !== scrolled ? scrolled : prev);
    };
    // Optimization: passive listener for smoother touch/scroll response
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.length > 2) {
        setView("search");
        const songs = await searchGlobalSongs(searchQuery);
        setSearchResults(songs || []);
      } else if (searchQuery.length === 0 && view === "search") {
        setView("home");
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, view]);

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden font-sans select-none antialiased">

      <Sidebar setView={handleNavigation} activeView={view} />

      <div className="flex-1 flex flex-col relative min-w-0">

        <header
          className={`fixed top-0 z-[60] h-20 transition-all duration-700 
          left-[260px] 
          w-[calc(100%-260px-260px)] 
          flex items-center px-8 
          rounded-br-[40px] 
          rounded-bl-[40px]
          border-x border-b
          will-change-transform transform-gpu
          ${isScrolled
              ? 'bg-white/[0.15] backdrop-blur-[40px] saturate-[200%] border-white/20 shadow-[0_25px_50px_-12px_rgba(255,255,255,0.1)]'
              : 'bg-white/[0.08] backdrop-blur-[20px] saturate-[150%] border-white/10'
            }`}
          style={{ overflow: 'visible' }}
        >
          <div className="w-full flex items-center justify-between">
            <div className="flex-shrink-0 text-[10px] font-black tracking-[0.5em] text-white/60 uppercase whitespace-nowrap">
              CORE_SYSTEM
            </div>

            <div className="flex-1 relative group mx-10">
              <div className="relative z-10 w-full">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40" size={14} />
                <input
                  type="text"
                  placeholder="SEARCH_DATABASE"
                  className="w-full bg-black/20 backdrop-blur-md border border-white/10 rounded-full py-3 pl-12 pr-6 text-[10px] font-bold tracking-widest outline-none transition-all duration-700 
                  focus:bg-black/40 focus:border-white/30 placeholder:text-white/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full border border-white/20 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer">
                <User size={18} className="text-white/80" />
              </div>
            </div>
          </div>
        </header>

        <main
          id="main-content-area"
          ref={mainRef}
          className="flex-1 overflow-y-auto no-scrollbar pt-32 pb-44 relative bg-black transform-gpu will-change-scroll"
        >
          <div className="px-10 max-w-7xl mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                transition={{ duration: 0.7, ease: SLOW_EASE }}
                className="transform-gpu"
              >
                {view === "home" && (
                  <div className="space-y-24">
                    <Hero />

                    {Object.entries(FEATURED_CONTENT).map(([category, songs]) => (
                      <section key={category}>
                        <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-10 opacity-70">
                          {category.replace(/_/g, ' ')}
                        </h2>
                        <div className="horizontal-glide-container no-scrollbar">
                          {songs.map((song) => (
                            <div key={song.id} className="glide-item w-[220px]">
                              <SongCard track={song} collection={songs} />
                            </div>
                          ))}
                          <div className="flex-shrink-0 w-10" />
                        </div>
                      </section>
                    ))}

                    <div className="pt-20 border-t border-white/5">
                      <div className="flex flex-col items-center mb-24 text-center">
                        <span className="text-[10px] font-mono tracking-[0.8em] text-white/20 uppercase mb-4">Establishing_Connection</span>
                        <h2 className="text-5xl font-black italic uppercase tracking-tighter">Immortal_Vanguards</h2>
                      </div>
                      <LegendComponent />
                    </div>

                    <div className="py-12 border-t border-white/5 opacity-40">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 max-w-5xl">
                        <div className="space-y-2">
                          <p className="text-[9px] font-mono tracking-[0.4em] uppercase text-white/40">Manifesto_Protocol // 047</p>
                          <h4 className="text-sm font-bold tracking-widest uppercase max-w-md leading-relaxed">
                            "Music is the only frequency that survives the flesh. We do not lose artists; we archive their souls into the master signal."
                          </h4>
                        </div>
                        <div className="flex gap-4 items-center">
                          <div className="w-12 h-[1px] bg-white/20" />
                          <span className="text-[9px] font-mono tracking-[0.3em] uppercase">Archive_Confirmed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {view === "search" && (
                  <section className="min-h-screen">
                    <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-12">Search_Results</h1>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                      {searchResults.length > 0 ? (
                        searchResults.map((song) => (
                          <SongCard key={song.id} track={song} collection={searchResults} />
                        ))
                      ) : (
                        <p className="text-white/20 font-bold tracking-widest uppercase">No_Data_Found</p>
                      )}
                    </div>
                  </section>
                )}

                {view === "liked" && (
                  <section className="min-h-screen">
                    <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-12">Saved_Tracks</h1>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                      {likedSongs.map((song) => (
                        <SongCard key={song.id} track={song} collection={likedSongs} />
                      ))}
                    </div>
                  </section>
                )}

                <Footer />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
      <PlayerBar />
    </div>
  );
}

export default App;
