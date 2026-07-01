<div align="center">

# PrepXP

### AI-Powered Codeforces Analytics Dashboard

<p>
  <strong>FastAPI</strong> •
  <strong>React</strong> •
  <strong>Gemini API</strong> •
  <strong>Recharts</strong>
</p>

**[Live App → prepxp.vercel.app](https://prepxp.vercel.app)**

---

PrepXP turns a Codeforces handle into a full performance dashboard — rating history, topic-wise
problem-solving breakdown, difficulty distribution, and an AI-generated written analysis of
strengths, weaknesses, and focus areas.

</div>

---

## Why PrepXP?

Codeforces exposes raw contest and submission data through its public API, but turning that into
something a competitive programmer can actually act on takes work: aggregating rating changes,
bucketing solved problems by difficulty, tallying topic tags, and translating the numbers into
a narrative. PrepXP automates that pipeline — from raw API response to a rendered dashboard with
an AI-written summary — end to end.

---

## Architecture

```text
                              PrepXP
                                 │
              ┌──────────────────┴──────────────────┐
              │                                      │
        React Frontend                        FastAPI Backend
        (Vite, Vercel)                       (Render, Python)
              │                                      │
              │  GET /codeforces/{handle}/report      │
              │ ─────────────────────────────────────>│
              │                                      │
              │                              ┌────────┴────────┐
              │                              │                 │
              │                        cf_services.py    analytics_service.py
              │                        (Codeforces API)   (rating stats, topic &
              │                              │             difficulty buckets)
              │                              │                 │
              │                              └────────┬────────┘
              │                                      │
              │                              gemini_service.py
              │                              (Gemini 2.5 Flash)
              │                                      │
              │  { profile, analytics, topics,       │
              │    difficulty, analysis }            │
              │ <────────────────────────────────────│
              │                                      │
        Charts, Stats, AI Insights                   │
```

The backend is a thin service layer over the public [Codeforces API](https://codeforces.com/apiHelp):
routers only orchestrate, `cf_services.py` handles all external HTTP calls, `analytics_service.py`
does the number-crunching, and `gemini_service.py` is the only module that talks to the LLM.

---

## Features

| Feature                     | Description                                                                 |
| ---------------------------- | ---------------------------------------------------------------------------- |
| **Profile Overview**         | Handle, current rating, max rating, and rank at a glance                    |
| **Rating Analytics**         | Contest count, best gain, worst loss, and average rating change per contest |
| **Topic Distribution**       | Pie chart of the top 8 problem tags solved                                  |
| **Difficulty Distribution**  | Solved problems bucketed into 100-point rating bands                        |
| **AI-Generated Analysis**    | Gemini-powered writeup covering strengths, weaknesses, and next focus areas |

---

## Tech Stack

**Frontend**
- React 19 + Vite
- Recharts for data visualization
- Framer Motion for animated transitions
- React Markdown + remark-gfm to render the AI analysis
- Bootstrap for layout, with a custom glassmorphism design system (`index.css`)
- Axios for API calls

**Backend**
- FastAPI
- `requests` for calling the Codeforces public API
- `google-generativeai` (Gemini 2.5 Flash) for the AI analysis
- Deployed on Render; frontend on Vercel

---

## API Reference

All endpoints are served under `/codeforces` and take a Codeforces `handle`.

| Endpoint                          | Description                                                         |
| ---------------------------------- | --------------------------------------------------------------------- |
| `GET /codeforces/{handle}`         | Raw Codeforces profile info                                          |
| `GET /codeforces/{handle}/rating`  | Full contest rating history                                          |
| `GET /codeforces/{handle}/analytics` | Contest count, current/best/worst rating change, average change   |
| `GET /codeforces/{handle}/topics`  | Count of solved problems grouped by topic tag                        |
| `GET /codeforces/{handle}/difficulty` | Count of solved problems grouped by 100-point rating bucket       |
| `GET /codeforces/{handle}/summary` | Profile info + rating analytics combined                             |
| `GET /codeforces/{handle}/report`  | Summary + topics + difficulty combined — powers the main dashboard   |
| `GET /codeforces/{handle}/analysis`| Gemini-generated written analysis based on the full report           |

If a handle is invalid or the Codeforces API is unreachable, endpoints return `{"error": "..."}`
instead of raising, so the frontend can render an inline error state without a failed request.

---

## Project Structure

```text
prepxp
│
├── backend/
│   ├── main.py                       # FastAPI app, CORS, router registration
│   ├── requirements.txt
│   └── app/
│       ├── routers/
│       │   └── cf.py                 # Route definitions, request validation
│       └── services/
│           ├── cf_services.py        # Codeforces API calls
│           ├── analytics_service.py  # Rating stats, topic & difficulty aggregation
│           └── gemini_service.py     # Gemini prompt + response handling
│
└── frontend/
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── App.jsx                   # Data fetching + dashboard state
        ├── index.css                 # Design system
        └── components/
            ├── layout/                # Header
            ├── search/                # Handle input + action buttons
            ├── profile/               # Profile stat cards
            ├── charts/                # Topic & difficulty charts (Recharts)
            ├── analysis/              # AI analysis card (Markdown rendering)
            └── ui/                    # Shared primitives: GlassCard, StatCard,
                                        # SkeletonLoader, ErrorState, SectionHeader
```

---

## Running Locally

### Backend

```bash
cd backend
pip install -r requirements.txt

# create a .env file with:
# GEMINI_API_KEY=your_key_here

uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`. Update `API_BASE` in `src/App.jsx` if your
backend isn't running on the deployed Render URL.

---

## Design Notes

- **Separation of concerns on the backend**: routers never call the Codeforces API or Gemini
  directly — they only orchestrate service functions, which makes each layer independently
  testable.
- **Defensive response handling**: since `get_rating_history` / `get_submissions` can return
  either data or an `{"error": ...}` dict, every router and service function that consumes them
  checks for the error shape before proceeding, rather than letting a malformed response crash
  downstream aggregation.
- **AI analysis is grounded, not generative filler**: the Gemini prompt explicitly restricts the
  model to the user's own report data and forbids inventing a study plan or specific problem
  recommendations, keeping the output factual rather than speculative.
