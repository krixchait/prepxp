function AnalysisCard({ analysis }) {

    return (
        <div>
            <h2>AI Analysis</h2>

            <pre>
                {analysis}
            </pre>
        </div>
    );
}

export default AnalysisCard;