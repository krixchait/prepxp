import { motion } from 'framer-motion';

export default function StatCard({ icon: Icon, label, value, className = '', delay = 0 }) {
  return (
    <motion.div
      className={`glass-card stat-card ${className}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="stat-icon-wrapper">
        <Icon size={20} />
      </div>
      <div className="stat-label">{label}</div>
      <div className={`stat-value ${className}`}>{value}</div>
    </motion.div>
  );
}
