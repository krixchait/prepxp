import { motion } from 'framer-motion';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function ErrorState({ message, onRetry }) {
  return (
    <motion.div
      className="error-state"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="error-icon-wrapper">
        <AlertTriangle size={24} />
      </div>
      <h3>Something went wrong</h3>
      <p>{message || 'An unexpected error occurred. Please try again.'}</p>
      {onRetry && (
        <button className="btn-secondary-outline" onClick={onRetry}>
          <RotateCcw size={14} />
          Try Again
        </button>
      )}
    </motion.div>
  );
}
