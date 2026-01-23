import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function WordReveal({ children, className }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    const slideUp = {
        initial: { y: "100%" },
        open: (i) => ({
            y: "0%",
            transition: { duration: 0.5, delay: 0.02 * i, ease: [0.33, 1, 0.68, 1] }
        })
    }

    const words = children.split(" ");

    return (
        <span ref={ref} className={className} style={{ display: 'inline-block', lineHeight: 1.2 }}>
            {words.map((word, index) => {
                return (
                    <span key={index} style={{ position: 'relative', display: 'inline-flex', overflow: 'hidden', marginRight: '0.2em' }}>
                        <motion.span
                            variants={slideUp}
                            custom={index}
                            initial="initial"
                            animate={isInView ? "open" : "initial"}
                        >
                            {word}
                        </motion.span>
                    </span>
                )
            })}
        </span>
    )
}
