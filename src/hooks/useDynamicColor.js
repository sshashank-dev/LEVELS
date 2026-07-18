import { useState, useEffect } from 'react';

export const useDynamicColor = (imageUrl) => {
    // Default to a dark gray or semi-transparent color instead of white
    const [color, setColor] = useState('40, 40, 40');

    useEffect(() => {
        if (!imageUrl) return;

        const img = new Image();

        // 1. Set crossOrigin BEFORE src
        img.crossOrigin = "anonymous";

        // 2. CRITICAL: Add a unique timestamp to the URL. 
        // This forces Chrome to ignore the "tainted" cache version.
        const separator = imageUrl.includes('?') ? '&' : '?';
        img.src = `${imageUrl}${separator}v=${new Date().getTime()}`;

        img.onload = () => {
            try {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d', { willReadFrequently: true });

                // Set canvas size to 1x1 to get an average color
                canvas.width = 1;
                canvas.height = 1;

                ctx.drawImage(img, 0, 0, 1, 1);

                const data = ctx.getImageData(0, 0, 1, 1).data;

                // Only update if we actually got a visible color
                // data[3] is the Alpha channel. If it's 0, the image is transparent.
                if (data[3] > 0) {
                    setColor(`${data[0]}, ${data[1]}, ${data[2]}`);
                }
            } catch (err) {
                // If it still fails, the server hosting your images 
                // might not allow CORS at all.
                console.error("Color extraction blocked:", err);
            }
        };

        img.onerror = () => {
            console.error("Image failed to load for color extraction");
        };
    }, [imageUrl]);

    return color;
};