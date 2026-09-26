export const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: .65 } } }
export const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: .6 } } }
export const scaleIn = { hidden: { opacity: 0, scale: .94 }, visible: { opacity: 1, scale: 1, transition: { duration: .5 } } }
export const blurReveal = { hidden: { opacity: 0, filter: 'blur(14px)' }, visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: .9 } } }
export const slideLeft = { hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 } }
export const slideRight = { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } }
export const staggerChildren = { hidden: {}, visible: { transition: { staggerChildren: .12 } } }
