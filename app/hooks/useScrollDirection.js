"use client";
import { useState, useEffect } from 'react';

export default function useScrollDirection() {
    const [direction, setDirection] = useState('up');

    useEffect(() => {
        let lastY = window.scrollY;
        const threshold = 50;

        const handleScroll = () => {
            const currentY = window.scrollY;
            const diff = currentY - lastY;
            if (Math.abs(diff) > threshold) {
                setDirection(diff > 0 ? 'down' : 'up');
                lastY = currentY;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return direction;
}
