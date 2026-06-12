import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';

import Header from './components/layout/Header';
import SearchSection from './components/search/SearchSection';
import ProfileStats from './components/profile/ProfileStats';
import TopicChart from './components/charts/TopicChart';
import DifficultyChart from './components/charts/DifficultyChart';
import AnalysisCard from './components/analysis/AnalysisCard';
import SkeletonLoader from './components/ui/SkeletonLoader';
import ErrorState from './components/ui/ErrorState';

import './index.css';

const API_BASE = 'https://prepxp-2.onrender.com/codeforces';

function App() {
  // Data state
  const [handle, setHandle] = useState('');
  const [report, setReport] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  // Loading state
  const [reportLoading, setReportLoading] = useState(false);
  const [analysisLoading, setAnalysisLoading] = useState(false);

  // Error state
  const [reportError, setReportError] = useState(null);
  const [analysisError, setAnalysisError] = useState(null);

  async function fetchReport() {
    if (!handle.trim()) return;

    setReportLoading(true);
    setReportError(null);
    setReport(null);
    setAnalysis(null);
    setAnalysisError(null);

    try {
      const response = await axios.get(`${API_BASE}/${handle.trim()}/report`);

      if (response.data?.error) {
        setReportError(response.data.error);
        return;
      }

      setReport(response.data);
    } catch (error) {
      const message =
        error.response?.data?.detail ||
        error.response?.data?.error ||
        error.message ||
        'Failed to fetch profile data. Please check the handle and try again.';
      setReportError(message);
    } finally {
      setReportLoading(false);
    }
  }

  async function fetchAnalysis() {
    if (!handle.trim() || !report) return;

    setAnalysisLoading(true);
    setAnalysisError(null);

    try {
      const response = await axios.get(`${API_BASE}/${handle.trim()}/analysis`);

      if (response.data?.error) {
        setAnalysisError(response.data.error);
        return;
      }

      setAnalysis(response.data.analysis);
    } catch (error) {
      const message =
        error.response?.data?.detail ||
        error.response?.data?.error ||
        error.message ||
        'Failed to generate AI insights. Please try again.';
      setAnalysisError(message);
    } finally {
      setAnalysisLoading(false);
    }
  }

  return (
    <div className="min-vh-100">
      <Header />

      <main
        className="container-fluid px-3 px-md-4"
        style={{ maxWidth: 1280, margin: '0 auto' }}
      >
        {/* Search Section */}
        <div className="py-5">
          <SearchSection
            handle={handle}
            onHandleChange={setHandle}
            onAnalyzeProfile={fetchReport}
            onGenerateInsights={fetchAnalysis}
            reportLoading={reportLoading}
            analysisLoading={analysisLoading}
            hasReport={!!report}
          />
        </div>

        <AnimatePresence mode="wait">
          {/* Loading State */}
          {reportLoading && (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <hr className="gradient-divider" />
              <SkeletonLoader />
            </motion.div>
          )}

          {/* Error State */}
          {reportError && !reportLoading && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <hr className="gradient-divider" />
              <ErrorState message={reportError} onRetry={fetchReport} />
            </motion.div>
          )}

          {/* Dashboard Content */}
          {report && !reportLoading && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <hr className="gradient-divider" />

              {/* Profile Stats */}
              <section className="mb-5">
                <ProfileStats profile={report.summary?.profile} />
              </section>

              {/* Charts */}
              <section className="mb-5">
                <div className="charts-grid">
                  <TopicChart topics={report.topics} />
                  <DifficultyChart difficulty={report.difficulty} />
                </div>
              </section>

              {/* AI Analysis */}
              <section className="mb-5">
                {analysisError ? (
                  <ErrorState
                    message={analysisError}
                    onRetry={fetchAnalysis}
                  />
                ) : (
                  <AnalysisCard
                    analysis={analysis}
                    analysisLoading={analysisLoading}
                    onGenerateInsights={fetchAnalysis}
                    hasReport={!!report}
                  />
                )}
              </section>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="footer-badge">
          Built with <span>PrepXP</span> — Competitive Programming Analytics
        </div>
      </main>
    </div>
  );
}

export default App;