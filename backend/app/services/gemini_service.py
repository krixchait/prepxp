import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model=genai.GenerativeModel("gemini-2.5-flash")


def generate_analysis(report):
    promt=f"""
    You are Competitive programming mentor.
    Analyse this Codeforces profile report:
    {report}

    Provide your response in the following format:

    ## Profile Summary
    Briefly describe the user's current competitive programming level.

    ## Strengths
    List the strongest topics and explain why.

    ## Weaknesses
    List the weakest topics and explain why.

    ## Difficulty Analysis
    Comment on the distribution of solved problems by rating.

    ## Next Areas To Focus On
    Suggest which topics the user should focus on next.

    Rules:
    - Be concise.
    - Use bullet points.
    - Do not create a study plan.
    - Do not recommend specific problems.
    - Base everything strictly on the report.
    """

    response=model.generate_content(promt)

    return response.text

