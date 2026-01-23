'use client';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function GSAPTextReveal({ children, className }) {
    const textRef = useRef(null);
    const body = useRef(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const element = textRef.current;
        if (!element) return;

        const words = element.querySelectorAll('span');

        // Ensure opacity is set explicitly
        gsap.set(words, { opacity: 0.1 });

        let ctx = gsap.context(() => {
            gsap.fromTo(words,
                {
                    opacity: 0,
                    y: 20
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.02,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: body.current,
                        start: "top 95%", // Trigger earlier
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            )
        }, body);

        return () => ctx.revert();
    }, [children]);

    const words = children.split(" ");

    return (
        <span ref={body} className={className}>
            <span ref={textRef} style={{ display: 'inline-block', lineHeight: 1.2 }}>
                {words.map((word, index) => {
                    return (
                        <span key={index} style={{ position: 'relative', display: 'inline-block', marginRight: '0.2em' }}>
                            {word}
                        </span>
                    )
                })}
            </span>
        </span>
    )
}
