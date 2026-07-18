// import React, { useState, useEffect } from 'react';
// import { Activity, Globe } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// // 🎤 DATASET - TRAVIS SCOTT IS NOW FIRST
// const TRENDING_SLIDES = [
//     {
//         id: 1,
//         title: "Travis Scott",
//         subtitle: "ASTROWORLD_LIVE",
//         description: "HIGH-ENERGY PERFORMANCE SYNCHRONIZED WITH GLOBAL FANS. THE BENCHMARK FOR MODERN TRAP VISUALS.",
//         image: "/artists/travis.jpg",
//         stat: "+78%_ENGAGEMENT",
//         color: "text-emerald-500",
//         accent: "bg-emerald-500"
//     },
//     {
//         id: 2,
//         title: "The Weeknd",
//         subtitle: "GLOBAL_DOMINATION",
//         description: "STREAMING ACROSS MILLIONS OF DEVICES. A SONIC WAVE TAKING OVER THE PLANET.",
//         image: "/artists/weeknd.jpg",
//         stat: "1.2B_STREAMS",
//         color: "text-rose-500",
//         accent: "bg-rose-500"
//     },
//     {
//         id: 3,
//         title: "Billie Eilish",
//         subtitle: "DARK_WAVE",
//         description: "MINIMAL, EMOTIONAL, AND POWERFUL GLOBAL SOUND. REDEFINING THE POP LANDSCAPE.",
//         image: "/artists/billie.jpg",
//         stat: "950M_NODES",
//         color: "text-purple-500",
//         accent: "bg-purple-500"
//     }
// ];

// const Hero = () => {
//     const [current, setCurrent] = useState(0);

//     useEffect(() => {
//         const timer = setInterval(() => {
//             setCurrent((prev) => (prev + 1) % TRENDING_SLIDES.length);
//         }, 5000);
//         return () => clearInterval(timer);
//     }, []);

//     const slide = TRENDING_SLIDES[current];

//     return (
//         <div className="relative w-full h-[520px] rounded-[3rem] overflow-hidden border border-white/5 bg-black shadow-2xl">

//             <AnimatePresence mode="wait">
//                 <motion.div
//                     key={current}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ duration: 0.6 }}
//                     className="absolute inset-0"
//                 >

//                     {/* 🔥 BLUR BACKGROUND (DEPTH EFFECT) */}
//                     <div
//                         className="absolute inset-0 scale-110 blur-3xl opacity-40"
//                         style={{
//                             backgroundImage: `url(${slide.image})`,
//                             backgroundSize: 'cover',
//                             backgroundPosition: 'center'
//                         }}
//                     />

//                     {/* 🎥 MAIN IMAGE (FACE SAFE) */}
//                     <motion.img
//                         initial={{ scale: 1.1 }}
//                         animate={{ scale: 1 }}
//                         transition={{ duration: 6 }}
//                         src={slide.image}
//                         alt={slide.title}
//                         className="absolute inset-0 w-full h-full object-cover object-[center_20%] opacity-90 brightness-105 contrast-110"
//                     />

//                     {/* 🌈 LIGHT OVERLAYS (NOT DARK) */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
//                     <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

//                     {/* ✨ GLOW LIGHT */}
//                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.12),transparent_60%)]" />

//                     {/* 🔥 CONTENT */}
//                     <div className="relative z-20 h-full flex flex-col justify-end p-16 space-y-8">

//                         {/* TOP INFO */}
//                         <motion.div
//                             initial={{ opacity: 0, x: -20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             className="flex items-center gap-4"
//                         >
//                             <div className="flex items-center gap-2 px-4 py-1 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm">
//                                 <Activity size={12} className={slide.color} />
//                                 <span className={`font-mono text-[10px] uppercase tracking-[0.3em] font-black ${slide.color}`}>
//                                     {slide.subtitle}
//                                 </span>
//                             </div>

//                             <div className="flex items-center gap-2 text-white/40 font-mono text-[9px] uppercase tracking-[0.2em] border-l border-white/10 pl-4">
//                                 <Globe size={10} />
//                                 NODE_0{current + 1}
//                             </div>
//                         </motion.div>

//                         {/* 🎤 TITLE */}
//                         <motion.h1
//                             initial={{ opacity: 0, y: 40 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             className="text-7xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.85] text-white max-w-4xl"
//                         >
//                             {slide.title}
//                         </motion.h1>

//                         {/* 📊 BOTTOM */}
//                         <div className="flex items-end gap-12 pb-4">

//                             <motion.p
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 transition={{ delay: 0.2 }}
//                                 className="max-w-md text-zinc-300 text-[11px] font-bold leading-relaxed tracking-[0.05em] uppercase border-l border-white/10 pl-6"
//                             >
//                                 {slide.description}
//                             </motion.p>

//                             <div className="flex flex-col border-l border-white/10 pl-6">
//                                 <span className="text-[9px] font-mono text-white/30 tracking-[0.3em] uppercase mb-1">
//                                     Status_Report
//                                 </span>
//                                 <span className={`text-2xl font-black italic tracking-tighter ${slide.color}`}>
//                                     {slide.stat}
//                                 </span>
//                             </div>
//                         </div>
//                     </div>
//                 </motion.div>
//             </AnimatePresence>

//             {/* 🎯 SLIDER CONTROLS */}
//             <div className="absolute bottom-12 right-16 flex flex-col items-end gap-6 z-40">

//                 <div className="flex items-center gap-3">
//                     {TRENDING_SLIDES.map((_, i) => (
//                         <button
//                             key={i}
//                             onClick={() => setCurrent(i)}
//                             className={`h-1 rounded-full transition-all duration-500 ${i === current
//                                 ? 'w-16 bg-white'
//                                 : 'w-4 bg-white/30 hover:bg-white/60'
//                                 }`}
//                         />
//                     ))}
//                 </div>

//                 {/* ⏳ PROGRESS BAR */}
//                 <div className="w-48 h-[2px] bg-white/20 rounded-full overflow-hidden">
//                     <motion.div
//                         key={current}
//                         initial={{ x: "-100%" }}
//                         animate={{ x: "0%" }}
//                         transition={{ duration: 5, ease: "linear" }}
//                         className={`w-full h-full ${slide.accent}`}
//                     />
//                 </div>
//             </div>

//             {/* 🧠 SYSTEM TEXT */}
//             <div className="absolute top-12 right-12 text-right font-mono text-[9px] text-white/20 uppercase tracking-[0.5em] hidden lg:block z-40">
//                 <p className="text-white/50">System: Synchronized</p>
//                 <p>Uplink: Core_v3</p>
//                 <p className="mt-4 animate-pulse text-white/30 tracking-[0.2em]">
//                     0{current + 1} / 0{TRENDING_SLIDES.length}
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Hero;














import React, { useState, useEffect } from "react";
import { Activity, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


const TRENDING_SLIDES = [

    {
        id: 1,
        title: "Travis Scott",
        subtitle: "ASTROWORLD_LIVE",
        description:
            "HIGH-ENERGY PERFORMANCE SYNCHRONIZED WITH GLOBAL FANS. THE BENCHMARK FOR MODERN TRAP VISUALS.",
        image: "/artists/travis.jpg",
        stat: "+78%_ENGAGEMENT",
        color: "text-emerald-500",
        accent: "bg-emerald-500"
    },


    {
        id: 2,
        title: "The Weeknd",
        subtitle: "GLOBAL_DOMINATION",
        description:
            "STREAMING ACROSS MILLIONS OF DEVICES. A SONIC WAVE TAKING OVER THE PLANET.",
        image: "/artists/weeknd.jpg",
        stat: "1.2B_STREAMS",
        color: "text-rose-500",
        accent: "bg-rose-500"
    },


    {
        id: 3,
        title: "Billie Eilish",
        subtitle: "DARK_WAVE",
        description:
            "MINIMAL, EMOTIONAL, AND POWERFUL GLOBAL SOUND.",
        image: "/artists/billie.jpg",
        stat: "950M_NODES",
        color: "text-purple-500",
        accent: "bg-purple-500"
    }

];






const Hero = () => {


    const [current, setCurrent] = useState(0);



    useEffect(() => {


        const timer = setInterval(() => {

            setCurrent(
                prev =>
                    (prev + 1) % TRENDING_SLIDES.length
            );


        }, 5000);



        return () => clearInterval(timer);


    }, []);




    const slide =
        TRENDING_SLIDES[current];





    return (

        <div

            className="

relative

w-full


h-[420px]

sm:h-[480px]

lg:h-[520px]


rounded-[2rem]

lg:rounded-[3rem]


overflow-hidden


border

border-white/10


bg-black


shadow-2xl

"

        >






            <AnimatePresence mode="wait">


                <motion.div


                    key={current}


                    initial={{
                        opacity: 0
                    }}


                    animate={{
                        opacity: 1
                    }}


                    exit={{
                        opacity: 0
                    }}


                    transition={{
                        duration: .6
                    }}



                    className="absolute inset-0"

                >





                    {/* BACKGROUND BLUR */}


                    <div

                        className="

absolute

inset-0

scale-110

blur-3xl

opacity-40

"

                        style={{

                            backgroundImage:
                                `url(${slide.image})`,

                            backgroundSize: "cover",

                            backgroundPosition: "center"

                        }}

                    />









                    <motion.img


                        src={slide.image}

                        alt={slide.title}


                        initial={{
                            scale: 1.1
                        }}

                        animate={{
                            scale: 1
                        }}


                        transition={{
                            duration: 6
                        }}



                        className="

absolute

inset-0


w-full

h-full


object-cover


object-[center_20%]


opacity-90


brightness-110

"

                    />









                    {/* OVERLAYS */}


                    <div
                        className="
absolute
inset-0
bg-gradient-to-t
from-black/80
via-black/20
to-transparent
"
                    />


                    <div
                        className="
absolute
inset-0
bg-gradient-to-r
from-black/60
via-transparent
"
                    />









                    {/* CONTENT */}



                    <div

                        className="

relative

z-20

h-full


flex

flex-col

justify-end



p-6

sm:p-10

lg:p-16


space-y-5

lg:space-y-8

"

                    >








                        <div

                            className="
flex

items-center

gap-3

"

                        >


                            <div

                                className="
flex

items-center

gap-2

px-3

py-1

bg-white/10

border

border-white/20

rounded-full

backdrop-blur

"

                            >


                                <Activity
                                    size={12}
                                    className={slide.color}
                                />


                                <span

                                    className={`

font-mono

text-[9px]

tracking-[0.3em]

font-black

uppercase

${slide.color}

`}

                                >

                                    {slide.subtitle}

                                </span>


                            </div>





                            <div

                                className="

hidden

sm:flex

items-center

gap-2

text-white/40

font-mono

text-[9px]

"

                            >


                                <Globe size={10} />

                                NODE_0{current + 1}

                            </div>


                        </div>









                        <h1

                            className="

text-5xl

sm:text-6xl

lg:text-8xl


font-black

italic

uppercase


tracking-tighter


leading-[0.85]


text-white

"

                        >

                            {slide.title}

                        </h1>









                        <div

                            className="

flex

flex-col

sm:flex-row


items-start

gap-5

sm:gap-10

"

                        >



                            <p

                                className="

max-w-md


text-zinc-300


text-[10px]


font-bold


leading-relaxed


uppercase


border-l

border-white/20


pl-4

"

                            >

                                {slide.description}

                            </p>






                            <div

                                className="
border-l

border-white/20

pl-5

"

                            >


                                <span

                                    className="
text-[8px]

font-mono

text-white/30

uppercase

"

                                >

                                    Status_Report

                                </span>



                                <div

                                    className={

                                        `
text-xl

font-black

italic

${slide.color}

`

                                    }

                                >

                                    {slide.stat}

                                </div>


                            </div>


                        </div>



                    </div>






                </motion.div>


            </AnimatePresence>









            {/* SLIDER */}



            <div

                className="

absolute

bottom-6

right-6


sm:bottom-10

sm:right-10


flex

flex-col

items-end

gap-4

z-40

"

            >


                <div

                    className="
flex

gap-2

"

                >


                    {
                        TRENDING_SLIDES.map((_, i) => (


                            <button

                                key={i}

                                onClick={() =>
                                    setCurrent(i)
                                }

                                className={

                                    `

h-1

rounded-full

transition-all


${i === current

                                        ?
                                        "w-12 bg-white"

                                        :

                                        "w-4 bg-white/30"

                                    }

`

                                }

                            />


                        ))
                    }



                </div>



                <div

                    className="
w-32

h-[2px]

bg-white/20

overflow-hidden

"

                >


                    <motion.div

                        key={current}

                        initial={{
                            x: "-100%"
                        }}

                        animate={{
                            x: 0
                        }}

                        transition={{
                            duration: 5,
                            ease: "linear"
                        }}


                        className={`

h-full

w-full

${slide.accent}

`}

                    />


                </div>



            </div>






        </div>

    );

};


export default Hero;