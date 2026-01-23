'use client';
import styles from './style.module.scss';
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

const skills = [
    {
        name: 'Frontend Development',
        description: 'Building responsive, pixel-perfect user interfaces with modern frameworks.',
        tools: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
        color: '#BB4B96',
        image: '/card_cover_1.jpg'
    },
    {
        name: 'Creative Animation',
        description: 'Creating immersive web experiences with smooth, physics-based interactions.',
        tools: ['GSAP', 'Framer Motion', 'Three.js', 'WebGL'],
        color: '#88CE02',
        image: '/card_cover_2.jpg'
    },
    {
        name: 'Backend & Architecture',
        description: 'Designing scalable server-side systems and efficient database structures.',
        tools: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
        color: '#F7DF1E',
        image: '/card_cover_3.jpg'
    },
    {
        name: 'UI/UX Design',
        description: 'Crafting intuitive digital products with a focus on user-centered design principles.',
        tools: ['Figma', 'Adobe XD', 'Prototyping', 'Wireframing'],
        color: '#3178C6',
        image: '/card_cover_1.jpg'
    }
];

export default function Skills() {
    const container = useRef(null);
    const cardContainerRef = useRef(null);
    const headerRef = useRef(null);
    const cardRefs = useRef([]);
    const isGapAnimationCompleted = useRef(false);
    const isFlipAnimationCompleted = useRef(false);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const mm = gsap.matchMedia();

        mm.add("(max-width: 999px)", () => {
            // Mobile: disable animations, reset styles
            cardRefs.current.forEach(card => {
                if (card) card.style = "";
            });
            if (cardContainerRef.current) cardContainerRef.current.style = "";
            if (headerRef.current) headerRef.current.style = "";
            return () => { };
        });

        mm.add("(min-width: 1000px)", () => {
            const cardContainer = cardContainerRef.current;
            const stickyHeader = headerRef.current;
            const cards = cardRefs.current.filter(Boolean);

            // Reset state
            isGapAnimationCompleted.current = false;
            isFlipAnimationCompleted.current = false;

            // Set initial header state
            gsap.set(stickyHeader, {
                y: 40,
                opacity: 0
            });

            ScrollTrigger.create({
                trigger: container.current,
                start: "top top",
                end: `+=${window.innerHeight * 2.5}px`,
                scrub: 0.3,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    const progress = self.progress;

                    // Header animation (10% - 25%)
                    if (progress >= 0.1 && progress <= 0.25) {
                        const headerProgress = gsap.utils.mapRange(0.1, 0.25, 0, 1, progress);
                        const yValue = gsap.utils.mapRange(0, 1, 40, 0, headerProgress);
                        const opacityValue = gsap.utils.mapRange(0, 1, 0, 1, headerProgress);
                        gsap.set(stickyHeader, { y: yValue, opacity: opacityValue });
                    } else if (progress < 0.1) {
                        gsap.set(stickyHeader, { y: 40, opacity: 0 });
                    } else if (progress > 0.25) {
                        gsap.set(stickyHeader, { y: 0, opacity: 1 });
                    }

                    // Card container width animation (0% - 25%)
                    if (progress <= 0.25) {
                        const widthPercentage = gsap.utils.mapRange(0, 0.25, 85, 75, progress);
                        gsap.set(cardContainer, { width: `${widthPercentage}%` });
                    } else {
                        gsap.set(cardContainer, { width: "75%" });
                    }

                    // Gap animation at 35%
                    if (progress >= 0.35 && !isGapAnimationCompleted.current) {
                        gsap.to(cardContainer, {
                            gap: "15px",
                            duration: 0.5,
                            ease: "power3.out"
                        });
                        cards.forEach(card => {
                            gsap.to(card, {
                                borderRadius: "20px",
                                duration: 0.5,
                                ease: "power3.out"
                            });
                        });
                        isGapAnimationCompleted.current = true;
                    } else if (progress < 0.35 && isGapAnimationCompleted.current) {
                        gsap.to(cardContainer, {
                            gap: "0px",
                            duration: 0.5,
                            ease: "power3.out"
                        });
                        cards.forEach((card, i) => {
                            let radius = "0px";
                            if (i === 0) radius = "20px 0 0 20px";
                            if (i === cards.length - 1) radius = "0 20px 20px 0";
                            gsap.to(card, {
                                borderRadius: radius,
                                duration: 0.5,
                                ease: "power3.out"
                            });
                        });
                        isGapAnimationCompleted.current = false;
                    }

                    // Flip animation at 70%
                    if (progress >= 0.7 && !isFlipAnimationCompleted.current) {
                        cards.forEach((card, i) => {
                            gsap.to(card, {
                                rotationY: 180,
                                duration: 0.75,
                                ease: "power3.inOut",
                                delay: i * 0.1
                            });
                        });
                        // Side cards tilt
                        if (cards[0]) {
                            gsap.to(cards[0], {
                                y: 30,
                                rotationZ: -12,
                                duration: 0.75,
                                ease: "power3.inOut"
                            });
                        }
                        if (cards[cards.length - 1]) {
                            gsap.to(cards[cards.length - 1], {
                                y: 30,
                                rotationZ: 12,
                                duration: 0.75,
                                ease: "power3.inOut"
                            });
                        }
                        isFlipAnimationCompleted.current = true;
                    } else if (progress < 0.7 && isFlipAnimationCompleted.current) {
                        cards.forEach((card, i) => {
                            gsap.to(card, {
                                rotationY: 0,
                                duration: 0.75,
                                ease: "power3.inOut",
                                delay: (cards.length - 1 - i) * 0.1
                            });
                        });
                        // Reset side cards
                        if (cards[0]) {
                            gsap.to(cards[0], {
                                y: 0,
                                rotationZ: 0,
                                duration: 0.75,
                                ease: "power3.inOut"
                            });
                        }
                        if (cards[cards.length - 1]) {
                            gsap.to(cards[cards.length - 1], {
                                y: 0,
                                rotationZ: 0,
                                duration: 0.75,
                                ease: "power3.inOut"
                            });
                        }
                        isFlipAnimationCompleted.current = false;
                    }
                }
            });

            return () => { };
        });

        return () => mm.revert();
    }, []);



    return (
        <div ref={container} className={styles.skillsContainer}>
            <div className={styles.stickyHeader}>
                <h2 ref={headerRef}>Skills & Expertise</h2>
            </div>

            <div ref={cardContainerRef} className={styles.cardContainer}>
                {skills.map((skill, index) => (
                    <div
                        key={index}
                        ref={(el) => (cardRefs.current[index] = el)}
                        className={`${styles.card} ${styles[`card${index + 1}`]}`}
                    >
                        <div className={styles.cardFront}>
                            <Image
                                src={skill.image}
                                alt={skill.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 25vw"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div
                            className={styles.cardBack}
                            style={{ backgroundColor: skill.color }}
                        >
                            <span className={styles.cardNumber}>( 0{index + 1} )</span>
                            <div className={styles.cardContent}>
                                <h3>{skill.name}</h3>
                                <p>{skill.description}</p>
                                <div className={styles.tools}>
                                    {skill.tools.map((tool, i) => (
                                        <span key={i} className={styles.tool}>{tool}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
