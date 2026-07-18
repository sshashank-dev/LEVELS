// import React from 'react';
// import { Home, Search, Library, User } from 'lucide-react';

// const MobileNav = () => {
//     return (
//         <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-black/80 backdrop-blur-xl border-t border-white/5 z-[70] flex items-center justify-around px-6">
//             <Home className="text-system-accent" size={20} />
//             <Search className="text-zinc-500" size={20} />
//             <Library className="text-zinc-500" size={20} />
//             <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500" />
//         </nav>
//     );
// };

// export default MobileNav;








import React from "react";
import { Home, Search, Heart, User } from "lucide-react";

const MobileNav = ({ activeView, setView }) => {

    const items = [
        {
            id: "home",
            icon: Home,
            label: "Home",
        },
        {
            id: "search",
            icon: Search,
            label: "Search",
        },
        {
            id: "liked",
            icon: Heart,
            label: "Liked",
        },
        {
            id: "profile",
            icon: User,
            label: "Profile",
        },
    ];


    return (

        <nav
            className="
            lg:hidden

            fixed
            bottom-0
            left-0
            right-0

            z-[200]

            h-20

            bg-black/80
            backdrop-blur-3xl

            border-t
            border-white/10

            px-2

            pb-safe
            "
        >

            <div className="grid grid-cols-4 h-full">

                {
                    items.map((item) => {

                        const Icon = item.icon;

                        const active = activeView === item.id;


                        return (

                            <button

                                key={item.id}

                                onClick={() => {

                                    if (item.id !== "profile") {
                                        setView(item.id);
                                    }

                                }}

                                className="
                                flex
                                flex-col
                                items-center
                                justify-center
                                gap-1
                                active:scale-90
                                transition-all
                                duration-300
                                "

                            >

                                <Icon

                                    size={20}

                                    className={
                                        active
                                            ?
                                            "text-white"
                                            :
                                            "text-white/40"
                                    }

                                />


                                <span

                                    className={`
                                    text-[10px]
                                    uppercase
                                    tracking-widest

                                    ${active
                                            ?
                                            "text-white"
                                            :
                                            "text-white/40"
                                        }

                                    `}

                                >

                                    {item.label}

                                </span>



                                <div

                                    className={`
                                    mt-1
                                    h-[2px]
                                    rounded-full
                                    transition-all
                                    duration-300

                                    ${active
                                            ?
                                            "w-6 bg-white"
                                            :
                                            "w-0"
                                        }

                                    `}

                                />


                            </button>

                        )

                    })
                }


            </div>


        </nav>

    );

};


export default MobileNav;