function ProfileCard({profile}) {

    return (
        <div>
            <h2>Profile: {profile.handle}</h2>

            <p>Rating: {profile.rating}</p>

            <p>Max Rating: {profile.max_rating}</p>

            <p>Rank: {profile.rank}</p>
        </div>
    );
}

export default ProfileCard;