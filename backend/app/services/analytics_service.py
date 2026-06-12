from app.services.cf_services import(
    get_rating_history,
    get_user_info,
    get_submissions
)

def get_contest_count(history):
    return len(history)

def get_current_rating(history):
    if not history:
        return None
    return history[-1]["newRating"]

def get_best_gain(history):
    best=float("-inf")
    for contest in history:
        gain=contest["newRating"]-contest["oldRating"]
        best=max(best,gain)

    return best

def get_worst_loss(history):
    worst=float("inf")
    for contest in history:
        loss=contest["newRating"]-contest["oldRating"]
        worst=min(worst,loss)

    return worst

def get_average_rating_change(history):
    if not history:
        return 0
    total=0;

    for contest in history:
        total+= contest["newRating"]-contest["oldRating"]
        
    return round(total/len(history),2)


def get_cf_summary(handle):

    profile = get_user_info(handle)

    history = get_rating_history(handle)

    analytics = {
        "contest_count": get_contest_count(history),
        "current_rating": get_current_rating(history),
        "best_gain": get_best_gain(history),
        "worst_loss": get_worst_loss(history),
        "average_change": get_average_rating_change(history)
    }

    return {
        "profile": {
            "handle": profile["handle"],
            "rating": profile["rating"],
            "max_rating": profile["maxRating"],
            "rank": profile["rank"]
        },
        "analytics": analytics
    }


from collections import defaultdict
def get_topic_distribution(submissions):

    topic_count = defaultdict(int)

    for submission in submissions:

        if submission["verdict"] != "OK":
            continue

        tags = submission["problem"].get("tags", [])

        for tag in tags:
            topic_count[tag] += 1

    return dict(topic_count)



def get_difficulty_distribution(submissions):

    solved_problems = set()

    for submission in submissions:

        if submission["verdict"] != "OK":
            continue

        problem = submission["problem"]

        contest_id = problem.get("contestId")
        index = problem.get("index")

        solved_problems.add((contest_id, index))

    buckets = defaultdict(int)

    for submission in submissions:

        if submission["verdict"] != "OK":
            continue

        problem = submission["problem"]

        key = (
            problem.get("contestId"),
            problem.get("index")
        )

        if key not in solved_problems:
            continue

        rating = problem.get("rating")

        if rating is None:
            continue

        # remove so we don't count same problem twice
        solved_problems.remove(key)

        bucket_start = (rating // 100) * 100
        bucket_end = bucket_start + 99

        bucket = f"{bucket_start}-{bucket_end}"

        buckets[bucket] += 1

    return dict(sorted(buckets.items()))


def get_cf_report(handle):
    submissions=get_submissions(handle)

    if isinstance(submissions,dict) and "error" in submissions:
        return submissions
    return{
        "summary":get_cf_summary(handle),
        "topics":get_topic_distribution(submissions),
        "difficulty":get_difficulty_distribution(submissions)
    }