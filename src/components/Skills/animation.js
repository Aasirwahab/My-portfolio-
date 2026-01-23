export const slideUp = {
    initial: {
        y: "100%"
    },
    open: (i) => ({
        y: "0%",
        transition: { duration: 0.5, delay: 0.03 * i }
    }),
    closed: {
        y: "100%",
        transition: { duration: 0.5 }
    }
}

export const fadeIn = {
    initial: {
        opacity: 0,
        y: 50
    },
    open: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: 0.05 * i }
    }),
    closed: {
        opacity: 0,
        y: 50,
        transition: { duration: 0.3 }
    }
}

export const scaleIn = {
    initial: {
        scale: 0.8,
        opacity: 0,
        willChange: "transform, opacity"
    },
    open: (i) => ({
        scale: 1,
        opacity: 1,
        transition: { duration: 0.4, delay: 0.04 * i }
    }),
    closed: {
        scale: 0.8,
        opacity: 0,
        transition: { duration: 0.3 }
    }
}
