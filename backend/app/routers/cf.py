from fastapi import APIRouter

from app.services.cf_services import(
    get_user_info,
    get_rating_history,
    get_submissions
)

from app.services.analytics_service import(
    get_average_rating_change,
    get_best_gain,
    get_contest_count,
    get_current_rating,
    get_worst_loss,
    get_cf_summary,
    get_topic_distribution,
    get_difficulty_distribution,
    get_cf_report,
)

from app.services.gemini_service import generate_analysis


router=APIRouter()

@router.get("/{handle}")
def profile(handle:str):
    return get_user_info(handle)

@router.get("/{handle}/rating")
def rating_history(handle:str):
    return get_rating_history(handle)

@router.get("/{handle}/analytics")
def analytics(handle:str):
    history=get_rating_history(handle)

    if isinstance(history,dict) and "error" in history:
        return history
    #this service layer can return both contest history or error response
    #so this router validates the response before perfoming analytics to prevent runtime error


    return {
        "contest_count": get_contest_count(history),
        "current_rating": get_current_rating(history),
        "best_gain": get_best_gain(history),
        "worst_loss": get_worst_loss(history),
        "average_change": get_average_rating_change(history)
    }

@router.get("/{handle}/summary")
def summary(handle:str):
    return get_cf_summary(handle)


@router.get("/{handle}/topics")
def topics(handle: str):

    submissions = get_submissions(handle)

    if isinstance(submissions, dict) and "error" in submissions:
        return submissions

    return get_topic_distribution(submissions)


@router.get("/{handle}/difficulty")
def difficulty(handle: str):

    submissions = get_submissions(handle)

    if isinstance(submissions, dict) and "error" in submissions:
        return submissions

    return get_difficulty_distribution(submissions)

@router.get("/{handle}/report")
def report(handle:str):
    return get_cf_report(handle)

@router.get("/{handle}/analysis")
def analysis(handle:str):
    report=get_cf_report(handle)

    if isinstance(report,dict) and "error" in report:
        return report
    return {
        "analysis": generate_analysis(report)
    }



