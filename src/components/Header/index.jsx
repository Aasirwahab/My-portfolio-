'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';
import Nav from './nav';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Rounded from '../../common/RoundedButton';
import Magnetic from '../../common/Magnetic';

export default function index() {
    const header = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const pathname = usePathname();
    const button = useRef(null);

    useEffect(() => {
        if (isActive) setIsActive(false)
    }, [pathname])

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        let ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // Only apply the scroll trigger animation on desktop
            mm.add("(min-width: 769px)", () => {
                gsap.to(button.current, {
                    scrollTrigger: {
                        trigger: document.documentElement,
                        start: 0,
                        end: window.innerHeight,
                        onLeave: () => { gsap.to(button.current, { scale: 1, duration: 0.25, ease: "power1.out" }) },
                        onEnterBack: () => { gsap.to(button.current, { scale: 0, duration: 0.25, ease: "power1.out" }, setIsActive(false)) }
                    }
                })
            });
        });

        return () => ctx.revert();
    }, [])

    return (
        <>
            <div ref={header} className={styles.header}>
                <Link href="/" className={styles.logo}>
                    <p className={styles.copyright}>©</p>
                    <div className={styles.name}>
                        <p className={styles.codeBy}>Code by</p>
                        <p className={styles.aasir}>Aasir</p>
                    </div>
                </Link>
                <div className={styles.nav}>
                    <Magnetic>
                        <div className={styles.el}>
                            <Link href="/work">Work</Link>
                            <div className={styles.indicator}></div>
                        </div>
                    </Magnetic>
                    <Magnetic>
                        <div className={styles.el}>
                            <Link href="/about">About</Link>
                            <div className={styles.indicator}></div>
                        </div>
                    </Magnetic>
                    <Magnetic>
                        <div className={styles.el}>
                            <Link href="/contact">Contact</Link>
                            <div className={styles.indicator}></div>
                        </div>
                    </Magnetic>
                </div>
            </div>
            <div ref={button} className={styles.headerButtonContainer}>
                <Rounded onClick={() => { setIsActive(!isActive) }} className={`${styles.button}`}>
                    <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
                </Rounded>
            </div>
            <AnimatePresence mode="wait">
                {isActive && <Nav />}
            </AnimatePresence>
        </>
    )
}
