import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SectionHeader from '../ui/SectionHeader';

export default function AnalysisCard({
  analysis,
  analysisLoading,
  onGenerateInsights,
  hasReport,
}) {
  return (
    <motion.div
      className="glass-card-static analysis-card"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <SectionHeader
        icon={Sparkles}
        title="AI Analysis"
        description="Powered by Gemini — personalized competitive programming insights"
      />

      {analysisLoading ? (
        <div className="analysis-empty">
          <div className="empty-icon">
            <span className="btn-spinner" style={{ width: 20, height: 20, borderColor: 'rgba(168, 85, 247, 0.3)', borderTopColor: '#a855f7' }} />
          </div>
          <p>Generating AI insights... This may take a few moments.</p>
        </div>
      ) : analysis ? (
        <div className="analysis-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {analysis}
          </ReactMarkdown>
        </div>
      ) : (
        <div className="analysis-empty">
          <div className="empty-icon">
            <Sparkles size={24} />
          </div>
          <p>
            Click "Generate AI Insights" to get a personalized analysis of your
            competitive programming performance.
          </p>
          {hasReport && (
            <button
              className="btn-secondary-outline"
              onClick={onGenerateInsights}
            >
              <Sparkles size={14} />
              Generate AI Insights
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}
