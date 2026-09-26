import { motion } from 'framer-motion'
export default function PageTransition({ children, className = '' }) {
  return <motion.main className={className} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .45 }}>{children}</motion.main>
}
