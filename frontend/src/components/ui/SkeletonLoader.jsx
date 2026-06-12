import { motion } from 'framer-motion';

export default function SkeletonLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Stats skeleton */}
      <div className="stats-grid mb-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="skeleton skeleton-card" />
        ))}
      </div>

      {/* Charts skeleton */}
      <div className="charts-grid mb-4">
        <div className="skeleton skeleton-chart" />
        <div className="skeleton skeleton-chart" />
      </div>

      {/* Analysis skeleton */}
      <div className="skeleton skeleton-analysis" />
    </motion.div>
  );
}
