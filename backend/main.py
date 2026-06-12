from fastapi import FastAPI
from app.routers.cf import router as cf_router
from fastapi.middleware.cors import CORSMiddleware

app=FastAPI(title="PrepXP")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://prepxp.vercel.app","http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    cf_router,
    prefix="/codeforces",
    tags=["Codeforces"]
)

@app.get("/")
def home():
    return {"message":"PrepXP backend running"}