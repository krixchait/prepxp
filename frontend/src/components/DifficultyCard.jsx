function DifficultyCard({ difficulty }) {

    return (
        <div>
            <h2>Difficulty</h2>

            {
                Object.entries(difficulty).map(([range, count]) => (
                    <p key={range}>
                        {range}: {count}
                    </p>
                ))
            }
        </div>
    );
}

export default DifficultyCard