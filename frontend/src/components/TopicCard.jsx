function TopicCard({ topics }) {

    return (
        <div>
            <h2>Topics</h2>

            {
                Object.entries(topics).map(([topic, count]) => (
                    <p key={topic}>
                        {topic}: {count}
                    </p>
                ))
            }

        </div>
    );
}

export default TopicCard;