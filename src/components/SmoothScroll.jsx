import { ReactLenis } from '@studio-freight/lenis/react';

export default function SmoothScroll({ children }) {
    const lenisOptions = {
        lerp: 0.07,      // Lower = Slower/Smoother (0.05 to 0.1 is the sweet spot)
        duration: 1.5,   // How long the scroll animation lasts
        smoothTouch: true,
        wheelMultiplier: 0.8, // Adjusts sensitivity
    };

    return (
        <ReactLenis root options={lenisOptions}>
            {children}
        </ReactLenis>
    );
}