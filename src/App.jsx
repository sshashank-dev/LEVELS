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

// const BASE_URL = "https://cupggwutgyknrblyuhrb.supabase.co/storage/v1/object/public/music-storage";

// export const FEATURED_CONTENT = {
//     trending: [
//         { id: "tr-1", title: "Thunder", artist: "Imagine Dragons", cover: "https://lh3.googleusercontent.com/weYQWfEwWNPOuAm34geXN1LkSYPlsJay78NnQgHC3PKsyZcdvBHIsMtqoFh3rioA4XgMdHMQd3h6vH6mbA=w544-h544-l90-rj", url: `${BASE_URL}/Thunder(PagaiWorld.com).mp3` },
//         { id: "tr-2", title: "Starboy", artist: "The Weeknd", cover: "https://lh3.googleusercontent.com/dcxXIIlest09vnvKznWM9VWQXu1EL7lKxBzXGzwgmVjmMNBm1dEWT_0qn1xrEZYyKF_qRE1TLq8P_JY_mQ=w544-h544-l90-rj", url: `${BASE_URL}/starboy.mp3` },
//         { id: "tr-3", title: "Blinding Lights", artist: "The Weeknd", cover: "https://lh3.googleusercontent.com/R_cjQK3wwLPEzri1jerx-79zgzGocoKvwGU3NMONaTsaMM0Idd641pfB8r5jgfpn6I8JAoFtf9RBIcI=w544-h544-l90-rj", url: `${BASE_URL}/blinding_lights.mp3` },
//         { id: "tr-4", title: "Espresso", artist: "Sabrina Carpenter", cover: "https://lh3.googleusercontent.com/bTWlZSenrOAYgH4r6NAzyDraWQR_wLl3OuRexJ_8h3NZUVHEilRSzUmKNa9YMOFSVcF0YtOuzKdXrt2UHg=w544-h544-l90-rj", url: `${BASE_URL}/espresso.mp3` },
//         { id: "tr-5", title: "One Thing at a Time", artist: "Morgan Wallen", cover: "https://yt3.googleusercontent.com/Nnk7caTufpVARS9zmqKZ_YUTPflx_hVNhgr62yMj0W0OiW2VxY60utZh2fJUo7yurw93vrHxqYCr_TSu=w544-h544-l90-rj", url: `${BASE_URL}/one_thing.mp3` },
//         { id: "tr-6", title: "Houdini", artist: "Dua Lipa", cover: "https://lh3.googleusercontent.com/5d51ZlGjNP_Gss3Z3RKP7B98ASQ7pxvp4XI3IAQ3kniFFjgLPDPnR6_K3tYZGoMVvfJYXBtu3awwsTI=w544-h544-l90-rj", url: `${BASE_URL}/houdini.mp3` },
//         { id: "tr-7", title: "Cruel Summer", artist: "Taylor Swift", cover: "https://lh3.googleusercontent.com/OhxDTHQOQzSrcdgH9hzqzp1v22GYDE-QKnkryvCeq4ddx-3K3_c8oDXN0E6NvHlMn1q4XV59aHr0oL4f=w544-h544-l90-rj", url: `${BASE_URL}/cruel_summer.mp3` },
//         { id: "tr-8", title: "Heat Waves", artist: "Glass Animals", cover: "https://lh3.googleusercontent.com/w9WrUTZckeY-PCYJsytiVyw5tVCtFsirBtnYGRvSIby3oRjYXHaszrbJsyfmZ6mdbE2UB-c7iqjJdR0=w544-h544-l90-rj", url: `${BASE_URL}/heat_waves.mp3` },
//     ],

//     punjabi_explosive: [
//         { id: "pj-1", title: "Winning Speech", artist: "Karan Aujla", cover: "https://lh3.googleusercontent.com/mnu2kpE-hPCxQJ33mntkFMt5kmXuUqba4v1BuPvxdVaPB229swK_bujTrkHYrvJJtjGO86lqJ1G5jR0=w544-h544-l90-rj", url: `${BASE_URL}/winning_stepper.mp3` },
//         { id: "pj-2", title: "Softly", artist: "Karan Aujla", cover: "https://lh3.googleusercontent.com/CwS-QQuTf5ggHK9A9-5Pvn1CQyyALQfNHWP5hl40a6v33HS55zpUAbaT6R3nrnN2DuJTh1vlfTtN5DpO=w544-h544-l90-rj", url: `${BASE_URL}/softly.mp3` },
//         { id: "pj-3", title: "Elevated", artist: "Shubh", cover: "https://lh3.googleusercontent.com/uRTguCSN0CdMXt_KOPW1X5-aM1-VLpQrPamWLD6CnHhx0xAI0NgEzw_gFXdOXtSnx00AZwvPlNjpPFA=w544-h544-l90-rj", url: `${BASE_URL}/elevated.mp3` },
//         { id: "pj-4", title: "MIllionaire ", artist: "Yo Yo Honey Singh ", cover: "https://lh3.googleusercontent.com/0Xeyqa11v6fdHI-GkU1ReWrF21yDokQ8hRZ0utN6NAmLt6WMZMmayuCG6fvu_1-zIHb86RsDg3qctKun=w544-h544-l90-rj", url: `${BASE_URL}/wbb.mp3` },
//         { id: "pj-5", title: "Ranjha", artist: "Diljit Doshanjh", cover: "https://lh3.googleusercontent.com/kGqJYCs_2WyoG13fKUaSimYnmbKysJ_LFCDlBH0j_R_Wqo5WJnReKmPIdKQKMoP0z6-TaxOPywMnGtqs=w544-h544-l90-rj", url: `${BASE_URL}/90_north.mp3` },
//         { id: "pj-6", title: "Check It Out", artist: "Parmish Verma", cover: "https://lh3.googleusercontent.com/7Tn3UO7quV1UhDBW6-h7YzcYNrskDu5DKyiYqrzAa_aFlN_WGhaxhyQsYTB2LVmr8KnP8MwNYs_GrqKr=w544-h544-l90-rj", url: `${BASE_URL}/check_it_out.mp3` },
//         { id: "pj-7", title: "Cheques", artist: "Shubh", cover: "https://lh3.googleusercontent.com/V_w7m2kuoVshpqcS1-RlEl-aONMQcGjP84WSo1tJS5IU8IDCr0v0s0NBMMGrLXtlL4CNjUKEdXcN3gAy=w544-h544-l90-rj", url: `${BASE_URL}/cheques.mp3` },
//         { id: "pj-8", title: "The Last Ride", artist: "Sidhu Moose Wala", cover: "https://lh3.googleusercontent.com/Wk0x2bqdrV9ZymibzotFfSfT0G3nCdi1hFNWnQj4xebMge3dfuY6WdWcpYQmCMB_8Ih-zLqeWf3PVxVR=w544-h544-l90-rj", url: `${BASE_URL}/last_ride.mp3` },
//     ],

//     bollywood_essentials: [
//         { id: "bol-1", title: "Arjan Vailly", artist: "Bhupinder Babbal", cover: "https://lh3.googleusercontent.com/02xLoCOZmap3ihA_v28cqFz1zBcE9cMzfwzJHzsgwxyGklT0rRWkfUqztPCgAx7CdBtVM5MahamnGuJw=w544-h544-l90-rj", url: `${BASE_URL}/arjan_vailly.mp3` },
//         { id: "bol-2", title: "Sun Raha Hai  ", artist: "Ankit  Tiwari", cover: "https://lh3.googleusercontent.com/3q33amH9hzn1dO8IeAX7TMb1QtEVfvVbqd2eSCaelOXNVmfMjbpDYdqD2HSiXtNP6i5Es7oynkWU2NfOXA=w544-h544-l90-rj", url: `${BASE_URL}/tere_hawaale.mp3` },
//         { id: "bol-3", title: "Kesariya", artist: "Arijit Singh", cover: "https://lh3.googleusercontent.com/CH0SThQN0HOk2eV81GGA-Tiftn58G48iy8lEyKNXJjbDSI9ApKKnmt4ncwr5gO_mZoQvFF3HPfHtky1Y=w544-h544-l90-rj", url: `${BASE_URL}/kesariya.mp3` },
//         { id: "bol-4", title: "Challa", artist: "Rabbi", cover: "https://lh3.googleusercontent.com/dxcXpGafDnBLlt5DnG-AWrYo6GofdKJn1fWfBJp3A9k8VhDFbl5HsUmtiXlBWo52C_GFzYDR3Oe9E4w=w544-h544-l90-rj", url: `${BASE_URL}/chaleya.mp3` },
//         { id: "bol-5", title: "Mann Mera", artist: "Gajendra Verma", cover: "https://lh3.googleusercontent.com/slFe--bLqjahnjNVZlpxMV19CBNMvy3Dc5hQkDIcRL56PCxUrOy7xAPdA9_i4UE0MesnN93v8t3O8cxJUA=w544-h544-l90-rj", url: `${BASE_URL}/satranga.mp3` },
//         { id: "bol-6", title: "Tere Liye  ", artist: "Atif Aslam Yagnik", cover: "https://lh3.googleusercontent.com/8rcPUY_axCJpmXE7z1tW3ipwgiVVJBmkH05BZTbzUkQ1zYooRjIb2Zfoqj9_hdQPIp0wuV3NJmMbLVA=w544-h544-l90-rj", url: `${BASE_URL}/agar_tum.mp3` },
//         { id: "bol-7", title: "Heeriye", artist: "Arijit Singh", cover: "https://lh3.googleusercontent.com/IUaNm7SOpB6sip0Q_VCWbLLaQ_rnqgH4gy7_i_7GwWFsDFR3BK6CzAQJpg7IN2UUqGgE79lAeBEYTxh18A=w544-h544-l90-rj", url: `${BASE_URL}/heeriye.mp3` },
//         { id: "bol-8", title: "O Maahi", artist: "Arijit Singh", cover: "https://lh3.googleusercontent.com/olTad2rSFdiV02kmWaC_xYlKkZiB6nV7279LAf1r6uar7rcyojJ4WoCc9A6kY9Cf5ecp-yUk0-NGy1c=w544-h544-l90-rj", url: `${BASE_URL}/o_maahi.mp3` },
//     ],

//     atmospheric: [
//         { id: "atm-1", title: "After Dark", artist: "Mr.Kitty", cover: "https://lh3.googleusercontent.com/b92yfjtgYeBaZDIzQViE8zlfsDwvImUJuGqwIBOQmyxrcG1cvyVdJKzuIiZLKU_aBM_X4h43rXgUkjMD=w544-h544-l90-rj", url: `${BASE_URL}/after_dark.mp3` },
//         { id: "atm-2", title: "Nightcall", artist: "Kavinsky", cover: "https://lh3.googleusercontent.com/FzXe6xIBzYoS63IhWzAAXzZEmiKxpbkom3uRcQyJz-_igaUHE-tBmfdDq9jFz4ZrFrGzOGcloB4EjsFh2w=w544-h544-l90-rj", url: `${BASE_URL}/nightcall.mp3` },
//         { id: "atm-3", title: "Resonance", artist: "HOME", cover: "https://lh3.googleusercontent.com/bupAOW6tBmZ62Jww-mnaPAa4Ko8C6sTPkAxKmBnP0DvgwmjSj0Z1sxPVZtM5cVJpFHQQBViBpOKnJsol=w544-h544-l90-rj", url: `${BASE_URL}/resonance.mp3` },
//         { id: "atm-4", title: "Space Song", artist: "Beach House", cover: "https://lh3.googleusercontent.com/tfz2ujV-2YUBVvhUXdOnm6x8yuOWl_1gJwg-X_6sk4L7M4SYdIWBC7m33Tu6kTiqDfIcSAXncFoe8e4=w544-h544-l90-rj", url: `${BASE_URL}/space_song.mp3` },
//         { id: "atm-5", title: "Midnight City", artist: "M83", cover: "https://lh3.googleusercontent.com/FtKxpe4wQSomNk3HGvUMyqHTyy6h56Oey4dJhPJeioRIMCvXVj1pRCHo1zBCTYYoRXQEVgNDfhB1Hg2O=w544-h544-l90-rj", url: `${BASE_URL}/midnight_city.mp3` },
//         { id: "atm-6", title: "Luxury", artist: "Jeona", cover: "https://lh3.googleusercontent.com/lFhQ9nrIvVbqcb67kSGWJc4jeYmtBq7n9fqfVieaHQDTR6vVYy-XGl1JDuVMdQezO-pCYzhMbFpNZBGVJw=w544-h544-l90-rj", url: `${BASE_URL}/luxury.mp3` },
//         { id: "atm-7", title: "Transgender", artist: "Crystal Castles", cover: "https://lh3.googleusercontent.com/ZbvxiwFlAgLDlnvc0mn_RRb4n6tS7ydND0Ho--74mHlTJn0KhiZrrWKnBrIzl81Qk1YDRAVeGWL8n82w3g=w544-h544-l90-rj", url: `${BASE_URL}/transgender.mp3` },
//         { id: "atm-8", title: "Iris", artist: "Pastel Ghost", cover: "https://lh3.googleusercontent.com/n8xOB4pimrX6g_hJBl3te8l1N8vOl2Lp_1pqAfPpv9bs8WmfBPL6Hpf20eKGPPEGqMDH4OpJM30RpMZx=w544-h544-l90-rj", url: `${BASE_URL}/iris.mp3` },
//     ],
// };