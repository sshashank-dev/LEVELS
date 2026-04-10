import React from 'react';
import { Home, Search, Library, User } from 'lucide-react';

const MobileNav = () => {
    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-black/80 backdrop-blur-xl border-t border-white/5 z-[70] flex items-center justify-around px-6">
            <Home className="text-system-accent" size={20} />
            <Search className="text-zinc-500" size={20} />
            <Library className="text-zinc-500" size={20} />
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500" />
        </nav>
    );
};

export default MobileNav;