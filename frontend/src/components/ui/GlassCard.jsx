import { motion } from 'framer-motion';

export default function GlassCard({
  children,
  className = '',
  hover = true,
  padding = true,
  ...props
}) {
  return (
    <motion.div
      className={`${hover ? 'glass-card' : 'glass-card-static'} ${padding ? 'p-4' : ''} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
