// import React, { useEffect, useState, useRef } from 'react';
// import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from 'lucide-react';
// import { usePlayerStore } from '../../store/usePlayerStore';
// import { motion, AnimatePresence } from 'framer-motion';

// // --- IMPROVED COLOR EXTRACTION HOOK ---
// const useDynamicColor = (imageUrl) => {
//     const [color, setColor] = useState('120, 120, 120'); // Neutral default

//     useEffect(() => {
//         if (!imageUrl) return;

//         const img = new Image();
//         // 1. Set crossOrigin BEFORE src
//         img.crossOrigin = "anonymous";

//         // 2. Add cache-buster to force a fresh fetch with CORS headers
//         // This prevents the browser from using a cached version that lacks permissions
//         const cacheBuster = imageUrl.includes('?') ? '&' : '?';
//         img.src = `${imageUrl}${cacheBuster}t=${new Date().getTime()}`;

//         img.onload = () => {
//             try {
//                 const canvas = document.createElement('canvas');
//                 const ctx = canvas.getContext('2d', { willReadFrequently: true });
//                 canvas.width = 1;
//                 canvas.height = 1;

//                 // Draw the image into a 1x1 pixel to get the average color
//                 ctx.drawImage(img, 0, 0, 1, 1);
//                 const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;

//                 // Only update if the pixel isn't fully transparent
//                 if (a > 0) {
//                     setColor(`${r}, ${g}, ${b}`);
//                 }
//             } catch (err) {
//                 console.error("Canvas error (likely CORS):", err);
//             }
//         };
//     }, [imageUrl]);

//     return color;
// };

// const PlayerBar = () => {
//     const {
//         currentTrack, isPlaying, togglePlay, playNext, playPrevious,
//         volume, setVolume, howl,
//         likedSongs, toggleLike
//     } = usePlayerStore();

//     const dynamicColor = useDynamicColor(currentTrack?.cover);
//     const [localTime, setLocalTime] = useState(0);
//     const [duration, setDuration] = useState(0);
//     const [isDragging, setIsDragging] = useState(false);

//     const isLiked = likedSongs?.some(s => s.id === currentTrack?.id);

//     // Sync Duration
//     useEffect(() => {
//         if (!howl) return;
//         const updateDuration = () => {
//             const d = howl.duration();
//             if (d && d !== Infinity) setDuration(d);
//         };
//         howl.on('load', updateDuration);
//         howl.on('play', updateDuration);
//         if (howl.state() === 'loaded') updateDuration();

//         return () => {
//             howl.off('load', updateDuration);
//             howl.off('play', updateDuration);
//         };
//     }, [howl]);

//     // Sync Seek Position
//     useEffect(() => {
//         let interval;
//         const sync = () => {
//             if (howl && howl.playing() && !isDragging) {
//                 const seek = howl.seek();
//                 if (typeof seek === 'number') setLocalTime(seek);
//             }
//         };
//         if (isPlaying && !isDragging) {
//             interval = setInterval(sync, 100);
//         }
//         return () => clearInterval(interval);
//     }, [howl, isPlaying, isDragging]);

//     const format = (s) => {
//         if (!s || isNaN(s)) return "0:00";
//         const mins = Math.floor(s / 60);
//         const secs = Math.floor(s % 60);
//         return `${mins}:${secs.toString().padStart(2, '0')}`;
//     };

//     const progressPercent = duration > 0 ? (localTime / duration) * 100 : 0;

//     const handleScrubChange = (e) => {
//         setIsDragging(true);
//         setLocalTime(parseFloat(e.target.value));
//     };

//     const handleScrubEnd = (e) => {
//         const newPos = parseFloat(e.target.value);
//         if (howl) howl.seek(newPos);
//         setTimeout(() => setIsDragging(false), 200);
//     };

//     if (!currentTrack) return null;

//     return (
//         <motion.div
//             initial={{ y: 120, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             className="fixed bottom-10 inset-x-0 z-[100] flex justify-center px-6 pointer-events-none"
//         >
//             <div className="relative group pointer-events-auto">
//                 {/* DYNAMIC GLOW BORDER */}
//                 <div className="absolute -inset-[2px] rounded-[3rem] overflow-hidden opacity-50 group-hover:opacity-100 transition-opacity duration-700">
//                     <div
//                         className="absolute inset-0 transition-all duration-1000 ease-out"
//                         style={{
//                             background: `rgb(${dynamicColor})`,
//                             clipPath: `inset(0 ${100 - progressPercent}% 0 0)`,
//                             filter: 'blur(8px)'
//                         }}
//                     />
//                 </div>

//                 {/* MAIN PLAYER BODY */}
//                 <div
//                     className="relative flex items-center backdrop-blur-3xl saturate-150 rounded-[3rem] p-2 pr-8 gap-8 border border-white/20 transition-colors duration-1000 shadow-2xl"
//                     style={{
//                         backgroundColor: `rgba(${dynamicColor}, 0.15)`,
//                         boxShadow: `0 20px 50px rgba(${dynamicColor}, 0.3)`
//                     }}
//                 >
//                     {/* LEFT: ALBUM ART & INFO */}
//                     <div className="flex items-center gap-4">
//                         <div className="relative w-16 h-16 ml-1">
//                             <motion.div
//                                 animate={isPlaying ? { rotate: 360 } : {}}
//                                 transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
//                                 className="w-full h-full rounded-full border-2 border-white/30 shadow-lg overflow-hidden"
//                             >
//                                 <img src={currentTrack.cover} alt="" className="w-full h-full object-cover" />
//                             </motion.div>
//                         </div>

//                         <div className="flex flex-col max-w-[140px]">
//                             <h4 className="text-sm font-bold text-white truncate italic uppercase tracking-tight">
//                                 {currentTrack.title}
//                             </h4>
//                             <p className="text-[10px] text-white/60 font-mono tracking-widest uppercase truncate">
//                                 {currentTrack.artist}
//                             </p>
//                         </div>

//                         <motion.button
//                             whileTap={{ scale: 0.8 }}
//                             onClick={() => toggleLike(currentTrack)}
//                             className={`ml-2 transition-colors ${isLiked ? 'text-red-500' : 'text-white/20 hover:text-white/50'}`}
//                         >
//                             <Heart size={18} fill={isLiked ? "currentColor" : "none"} strokeWidth={2.5} />
//                         </motion.button>
//                     </div>

//                     {/* CENTER: CONTROLS */}
//                     <div className="flex items-center gap-6">
//                         <button onClick={playPrevious} className="text-white/40 hover:text-white transition-all active:scale-90">
//                             <SkipBack size={22} fill="currentColor" />
//                         </button>

//                         <motion.button
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.9 }}
//                             onClick={togglePlay}
//                             className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-black shadow-xl"
//                         >
//                             {isPlaying ? <Pause size={28} fill="black" /> : <Play size={28} fill="black" className="ml-1" />}
//                         </motion.button>

//                         <button onClick={playNext} className="text-white/40 hover:text-white transition-all active:scale-90">
//                             <SkipForward size={22} fill="currentColor" />
//                         </button>
//                     </div>

//                     {/* RIGHT: SCRUBBER & VOLUME */}
//                     <div className="flex items-center gap-6">
//                         <div className="flex flex-col items-end gap-1 group/scrub">
//                             <span className="text-[10px] font-mono text-white/70">
//                                 {format(localTime)} <span className="text-white/30">/ {format(duration)}</span>
//                             </span>

//                             <div className="w-24 h-1.5 bg-white/10 rounded-full relative group-hover/scrub:w-32 transition-all duration-500">
//                                 <div
//                                     className="absolute inset-y-0 left-0 rounded-full pointer-events-none transition-[width] duration-150"
//                                     style={{
//                                         width: `${progressPercent}%`,
//                                         backgroundColor: `rgb(${dynamicColor})`,
//                                         boxShadow: `0 0 12px rgb(${dynamicColor})`
//                                     }}
//                                 />
//                                 <input
//                                     type="range"
//                                     min="0"
//                                     max={duration || 0}
//                                     step="0.1"
//                                     value={localTime}
//                                     onChange={handleScrubChange}
//                                     onMouseUp={handleScrubEnd}
//                                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
//                                 />
//                             </div>
//                         </div>

//                         {/* VOLUME SLIDER */}
//                         <div className="flex items-center gap-3 bg-white/5 hover:bg-white/10 px-3 py-2 rounded-full border border-white/5 transition-colors">
//                             <Volume2 size={14} className="text-white/50" />
//                             <input
//                                 type="range"
//                                 min="0"
//                                 max="1"
//                                 step="0.01"
//                                 value={volume}
//                                 onChange={(e) => setVolume(parseFloat(e.target.value))}
//                                 className="w-12 h-1 accent-white cursor-pointer appearance-none bg-white/20 rounded-full"
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </motion.div>
//     );
// };

// export default PlayerBar;





import React, { useEffect, useState } from 'react';
import {
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Volume2,
    Heart
} from 'lucide-react';

import { usePlayerStore } from '../../store/usePlayerStore';
import { motion } from 'framer-motion';


// --- DYNAMIC COLOR EXTRACTION ---
const useDynamicColor = (imageUrl) => {

    const [color, setColor] = useState('120,120,120');

    useEffect(() => {

        if (!imageUrl) return;

        const img = new Image();

        img.crossOrigin = "anonymous";

        const cacheBuster = imageUrl.includes('?')
            ? '&'
            : '?';

        img.src =
            `${imageUrl}${cacheBuster}t=${Date.now()}`;


        img.onload = () => {

            try {

                const canvas =
                    document.createElement('canvas');

                const ctx =
                    canvas.getContext(
                        '2d',
                        {
                            willReadFrequently: true
                        }
                    );


                canvas.width = 1;
                canvas.height = 1;


                ctx.drawImage(
                    img,
                    0,
                    0,
                    1,
                    1
                );


                const [
                    r,
                    g,
                    b,
                    a
                ] =
                    ctx
                        .getImageData(
                            0,
                            0,
                            1,
                            1
                        )
                        .data;


                if (a > 0) {

                    setColor(
                        `${r},${g},${b}`
                    );

                }


            } catch (err) {

                console.error(
                    "Canvas error:",
                    err
                );

            }

        };


    }, [imageUrl]);


    return color;

};





const PlayerBar = () => {


    const {

        currentTrack,

        isPlaying,

        togglePlay,

        playNext,

        playPrevious,

        volume,

        setVolume,

        howl,

        likedSongs,

        toggleLike


    } = usePlayerStore();



    const dynamicColor =
        useDynamicColor(
            currentTrack?.cover
        );



    const [
        localTime,
        setLocalTime
    ] = useState(0);



    const [
        duration,
        setDuration
    ] = useState(0);



    const [
        isDragging,
        setIsDragging
    ] = useState(false);




    const isLiked =
        likedSongs?.some(
            s => s.id === currentTrack?.id
        );




    useEffect(() => {

        if (!howl) return;


        const updateDuration = () => {

            const d =
                howl.duration();


            if (
                d &&
                d !== Infinity
            ) {

                setDuration(d);

            }

        };


        howl.on(
            'load',
            updateDuration
        );


        howl.on(
            'play',
            updateDuration
        );


        if (
            howl.state() === 'loaded'
        ) {

            updateDuration();

        }


        return () => {

            howl.off(
                'load',
                updateDuration
            );


            howl.off(
                'play',
                updateDuration
            );

        };


    }, [howl]);




    useEffect(() => {


        let interval;


        const sync = () => {


            if (
                howl &&
                howl.playing() &&
                !isDragging
            ) {


                const seek =
                    howl.seek();



                if (
                    typeof seek === "number"
                ) {

                    setLocalTime(seek);

                }

            }


        };



        if (
            isPlaying &&
            !isDragging
        ) {


            interval =
                setInterval(
                    sync,
                    100
                );


        }



        return () =>
            clearInterval(interval);



    }, [
        howl,
        isPlaying,
        isDragging
    ]);




    const format = (s) => {

        if (
            !s ||
            isNaN(s)
        )

            return "0:00";


        const mins =
            Math.floor(
                s / 60
            );


        const secs =
            Math.floor(
                s % 60
            );


        return `${mins}:${secs
            .toString()
            .padStart(2, '0')}`;

    };




    const progressPercent =
        duration > 0
            ?
            (localTime / duration) * 100
            :
            0;




    const handleScrubChange = (e) => {

        setIsDragging(true);

        setLocalTime(
            Number(e.target.value)
        );

    };




    const handleScrubEnd = (e) => {

        const newPos =
            Number(e.target.value);


        if (howl)
            howl.seek(newPos);


        setTimeout(
            () => setIsDragging(false),
            200
        );

    };



    if (!currentTrack)
        return null;



    return (

        <motion.div

            initial={{
                y: 120,
                opacity: 0
            }}

            animate={{
                y: 0,
                opacity: 1
            }}

            className="
            fixed
         bottom-24
         lg:bottom-10
            inset-x-0
        z-[120]
            flex
            justify-center
            px-3
            lg:px-6
            pointer-events-none
            "

        >


            <div
                className="
                relative
                group
                pointer-events-auto
                w-full
                lg:w-auto
                ">





                {/* GLOW */}

                <div
                    className="
                    absolute
                    -inset-[2px]
                    rounded-[2rem]
                    lg:rounded-[3rem]
                    overflow-hidden
                    opacity-50
                    group-hover:opacity-100
                    transition-opacity
                    duration-700
                    "
                >

                    <div

                        className="
                        absolute
                        inset-0
                        transition-all
                        duration-1000
                        "

                        style={{

                            background:
                                `rgb(${dynamicColor})`,

                            clipPath:
                                `inset(0 ${100 - progressPercent}% 0 0)`,

                            filter:
                                "blur(8px)"

                        }}

                    />

                </div>





                {/* PLAYER BODY */}

                <div

                    className="
                    relative
                    flex
                    items-center
                    backdrop-blur-3xl
                    saturate-150
                    rounded-[2rem]
                    lg:rounded-[3rem]
                    p-2
                    lg:pr-8
                    gap-3
                    lg:gap-8
                    border
                    border-white/20
                    shadow-2xl
                    w-full
                    lg:w-auto
                    overflow-hidden
                    "

                    style={{

                        backgroundColor:
                            `rgba(${dynamicColor},0.15)`,

                        boxShadow:
                            `0 20px 50px rgba(${dynamicColor},0.3)`

                    }}

                >




                    {/* LEFT SIDE */}

                    <div

                        className="
                    flex
                    items-center
                    gap-2
                    lg:gap-4
                    min-w-0
                    flex-1
                    lg:flex-none
                    "

                    >



                        {/* COVER */}

                        <div

                            className="
                        w-12
                        h-12
                        lg:w-16
                        lg:h-16
                        rounded-full
                        overflow-hidden
                        border-2
                        border-white/30
                        shrink-0
                        "

                        >

                            <motion.img

                                src={currentTrack.cover}

                                alt=""

                                animate={
                                    isPlaying
                                        ?
                                        {
                                            rotate: 360
                                        }
                                        :
                                        {}
                                }

                                transition={{
                                    duration: 12,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}

                                className="
                            w-full
                            h-full
                            object-cover
                            "

                            />

                        </div>





                        {/* TITLE */}

                        <div

                            className="
                        min-w-0
                        w-[65px]
                        sm:w-[90px]
                        lg:w-auto
                        lg:max-w-[140px]
                        "

                        >

                            <h4

                                className="
                            text-xs
                            lg:text-sm
                            font-bold
                            text-white
                            truncate
                            italic
                            uppercase
                            "

                            >

                                {currentTrack.title}

                            </h4>


                            <p

                                className="
                            text-[9px]
                            lg:text-[10px]
                            text-white/60
                            truncate
                            uppercase
                            "

                            >

                                {currentTrack.artist}

                            </p>


                        </div>





                        {/* LIKE BUTTON */}

                        <motion.button

                            whileTap={{
                                scale: .8
                            }}

                            onClick={() =>
                                toggleLike(currentTrack)
                            }


                            className={`

                        shrink-0
                        p-1
                        z-20

                        ${isLiked

                                    ?

                                    "text-red-500"

                                    :

                                    "text-white/30 hover:text-white/70"

                                }

                        `}

                        >

                            <Heart

                                size={18}

                                fill={
                                    isLiked
                                        ?
                                        "currentColor"
                                        :
                                        "none"
                                }

                            />


                        </motion.button>


                    </div>





                    {/* CENTER BUTTONS */}

                    <div

                        className="
                    flex
                    items-center
                    gap-3
                    lg:gap-6
                    shrink-0
                    "

                    >


                        <button

                            onClick={playPrevious}

                            className="
                        text-white/50
                        hover:text-white
                        "

                        >

                            <SkipBack
                                size={18}
                                fill="currentColor"
                            />

                        </button>




                        <motion.button

                            onClick={togglePlay}

                            whileTap={{
                                scale: .9
                            }}

                            className="
                        w-12
                        h-12
                        lg:w-14
                        lg:h-14
                        bg-white
                        rounded-2xl
                        flex
                        items-center
                        justify-center
                        text-black
                        shrink-0
                        "

                        >

                            {
                                isPlaying

                                    ?

                                    <Pause
                                        size={24}
                                        fill="black"
                                    />

                                    :

                                    <Play
                                        size={24}
                                        fill="black"
                                    />
                            }


                        </motion.button>





                        <button

                            onClick={playNext}

                            className="
                        text-white/50
                        hover:text-white
                        "

                        >

                            <SkipForward
                                size={18}
                                fill="currentColor"
                            />

                        </button>


                    </div>


                    {/* RIGHT SIDE */}

                    <div

                        className="
                    flex
                    items-center
                    gap-3
                    lg:gap-6
                    shrink-0
                    "

                    >



                        {/* PROGRESS */}

                        <div

                            className="
                        flex
                        flex-col
                        gap-1
                        "

                        >

                            <span

                                className="
                            text-[9px]
                            font-mono
                            text-white/70
                            "

                            >

                                {format(localTime)}
                                {" / "}
                                {format(duration)}

                            </span>



                            <div

                                className="
                            w-20
                            sm:w-24
                            lg:w-24
                            h-2
                            bg-white/10
                            rounded-full
                            relative
                            touch-none
                            "

                            >


                                <div

                                    className="
                                absolute
                                inset-y-0
                                left-0
                                rounded-full
                                pointer-events-none
                                "

                                    style={{

                                        width:
                                            `${progressPercent}%`,

                                        backgroundColor:
                                            `rgb(${dynamicColor})`,

                                        boxShadow:
                                            `0 0 12px rgb(${dynamicColor})`

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

                                    className="
                                absolute
                                inset-[-8px]
                                w-[calc(100%+16px)]
                                h-6
                                opacity-0
                                cursor-pointer
                                z-50
                                touch-none
                                "

                                />


                            </div>


                        </div>





                        {/* VOLUME - DESKTOP ONLY */}

                        <div

                            className="
                        hidden
                        lg:flex
                        items-center
                        gap-3
                        bg-white/5
                        hover:bg-white/10
                        px-3
                        py-2
                        rounded-full
                        border
                        border-white/5
                        transition-colors
                        "

                        >

                            <Volume2

                                size={14}

                                className="
                            text-white/50
                            "

                            />


                            <input

                                type="range"

                                min="0"

                                max="1"

                                step="0.01"

                                value={volume}

                                onChange={(e) =>
                                    setVolume(
                                        Number(e.target.value)
                                    )
                                }

                                className="
                            w-12
                            h-1
                            accent-white
                            cursor-pointer
                            appearance-none
                            bg-white/20
                            rounded-full
                            "

                            />


                        </div>



                    </div>


                </div>


            </div>


        </motion.div>


    );

};


export default PlayerBar;