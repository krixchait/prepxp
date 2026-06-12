import { Search, BarChart3, Sparkles } from 'lucide-react';

export default function SearchSection({
  handle,
  onHandleChange,
  onAnalyzeProfile,
  onGenerateInsights,
  reportLoading,
  analysisLoading,
  hasReport,
}) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && handle.trim()) {
      onAnalyzeProfile();
    }
  };

  return (
    <section className="search-section" id="search-section">
      <h1>Analyze Your Profile</h1>
      <p className="subtitle">
        Enter your Codeforces handle to unlock detailed performance analytics
      </p>

      <div className="search-input-wrapper">
        <Search size={18} className="search-icon" />
        <input
          id="handle-input"
          type="text"
          className="search-input"
          placeholder="Enter Codeforces handle (e.g., tourist)"
          value={handle}
          onChange={(e) => onHandleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={reportLoading}
          autoComplete="off"
        />
      </div>

      <div className="search-actions">
        <button
          id="analyze-btn"
          className="btn-primary-glow"
          onClick={onAnalyzeProfile}
          disabled={!handle.trim() || reportLoading}
        >
          {reportLoading ? (
            <>
              <span className="btn-spinner" />
              Analyzing...
            </>
          ) : (
            <>
              <BarChart3 size={16} />
              Analyze Profile
            </>
          )}
        </button>

        <button
          id="insights-btn"
          className="btn-secondary-outline"
          onClick={onGenerateInsights}
          disabled={!hasReport || analysisLoading}
        >
          {analysisLoading ? (
            <>
              <span className="btn-spinner" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles size={16} />
              Generate AI Insights
            </>
          )}
        </button>
      </div>
    </section>
  );
}
