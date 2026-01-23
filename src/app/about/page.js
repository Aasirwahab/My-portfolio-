'use client';
import { useEffect, useState } from 'react';
import styles from './page.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import Preloader from '../../components/Preloader';
import Image from 'next/image';
import Rounded from '../../common/RoundedButton';
import Contact from '../../components/Contact';
import GSAPTextReveal from '../../components/GSAPTextReveal';

export default function About() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
            document.body.style.cursor = 'default'
            window.scrollTo(0, 0);
        }, 2000)
    }, [])

    return (
        <main className={styles.about}>
            <AnimatePresence mode='wait'>
                {isLoading && <Preloader />}
            </AnimatePresence>

            <section className={styles.hero} data-scroll data-scroll-speed="0.2">
                <div className={styles.heroBody}>
                    <motion.h1
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 2.2, ease: [0.76, 0, 0.24, 1] }}
                    >
                        Freelance Web Developer <br /> & Designer
                    </motion.h1>
                    <motion.div
                        className={styles.scrollIndicator}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 2.5 }}
                    >
                        <div className={styles.globe}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 2C14.5 5 16 8.5 16 12C16 15.5 14.5 19 12 22C9.5 19 8 15.5 8 12C8 8.5 9.5 5 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className={styles.bio}>
                <div className={styles.bioContainer}>
                    <div className={styles.bioText} data-scroll data-scroll-speed="0.1">
                        <p>
                            <GSAPTextReveal>
                                I work with clients worldwide to build websites they're proud of. Every project gets my full attention—quality always comes first.
                            </GSAPTextReveal>
                        </p>
                        <p>
                            <GSAPTextReveal>
                                I'm always learning new tools and keeping up with web design trends. Good design isn't just about looks—it's about how it feels to use.
                            </GSAPTextReveal>
                        </p>
                    </div>
                    <div className={styles.bioImage} data-scroll data-scroll-speed="0.2">
                        <Image
                            src="/my_image.png"
                            alt="Profile"
                            fill
                            sizes="(max-width: 768px) 100vw, 400px"
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                </div>
            </section>

            <section className={styles.services}>
                <div className={styles.servicesHeader}>
                    <h2>I can help you with ...</h2>
                </div>
                <div className={styles.servicesList}>
                    <div className={styles.serviceItem}>
                        <span>01</span>
                        <h3>Design</h3>
                        <p>
                            I design websites that look great and feel right. Every visual detail is crafted to match your brand and connect with your audience.
                        </p>
                    </div>
                    <div className={styles.serviceItem}>
                        <span>02</span>
                        <h3>Development</h3>
                        <p>
                            I build fast, responsive websites using Next.js, React, and GSAP animations. Clean code, smooth interactions, and sites that load quick.
                        </p>
                    </div>
                    <div className={styles.serviceItem}>
                        <span>03</span>
                        <h3>The full package</h3>
                        <p>
                            From first idea to final launch—I handle everything. You get a complete website that looks great and works perfectly.
                        </p>
                    </div>
                </div>
            </section>

            <Contact />
        </main>
    )
}


