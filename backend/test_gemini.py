from app.services.analytics_service import get_cf_report
from app.services.gemini_service import generate_analysis

report=get_cf_report("krixchait")

result=generate_analysis(report)

print(result)
