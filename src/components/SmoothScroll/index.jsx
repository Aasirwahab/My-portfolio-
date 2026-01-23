'use client';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScroll({ children }) {
    const lenisRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Device detection for iPad and mobile
        const isMobile = /iPhone|Android/i.test(navigator.userAgent);
        const isTablet = /iPad|Android/i.test(navigator.userAgent) &&
            (window.innerWidth >= 768 && window.innerWidth <= 1024);

        // Disable touch scrolling on iPad and mobile devices
        const touchMultiplierValue = (isMobile || isTablet) ? 0 : 2;

        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: touchMultiplierValue,
        });

        lenisRef.current = lenis;

        // Integrate with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        // Prevent horizontal swipe on iPad and mobile
        if (isMobile || isTablet) {
            let startX = 0;
            let startY = 0;

            const handleTouchStart = (e) => {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            };

            const handleTouchMove = (e) => {
                // Don't prevent swipes on navigation menu or interactive elements
                const target = e.target;
                const isNavMenu = target.closest('[class*="menu"]') ||
                    target.closest('[class*="nav"]') ||
                    target.closest('a') ||
                    target.closest('button');

                if (isNavMenu) {
                    return; // Allow normal touch behavior for navigation
                }

                const deltaX = Math.abs(e.touches[0].clientX - startX);
                const deltaY = Math.abs(e.touches[0].clientY - startY);

                // If horizontal movement is greater than vertical, prevent it
                if (deltaX > deltaY && deltaX > 10) {
                    e.preventDefault();
                }
            };

            document.addEventListener('touchstart', handleTouchStart, { passive: true });
            document.addEventListener('touchmove', handleTouchMove, { passive: false });

            return () => {
                lenis.destroy();
                gsap.ticker.remove(lenis.raf);
                document.removeEventListener('touchstart', handleTouchStart);
                document.removeEventListener('touchmove', handleTouchMove);
            };
        }

        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, []);

    return <>{children}</>;
}
