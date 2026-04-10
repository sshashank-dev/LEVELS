import { useState, useEffect } from 'react';

export const useDynamicColor = (imageUrl) => {
    const [color, setColor] = useState('255, 255, 255'); // Default white

    useEffect(() => {
        if (!imageUrl) return;

        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = imageUrl;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            canvas.width = 1;
            canvas.height = 1;

            ctx.drawImage(img, 0, 0, 1, 1);
            const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
            setColor(`${r}, ${g}, ${b}`);
        };
    }, [imageUrl]);

    return color;
};