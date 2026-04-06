# Simple Budget Tracker Full Stack Starter

This is a **simple first-pass adaptation** of the original prototype into a real full-stack structure.

## Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Data: in-memory mock data for now
- PostgreSQL: schema file included for the next refinement step

## What works
- Sign in
- Dashboard summary
- Add transaction
- Monthly report
- Basic page-to-page flow

## Demo credentials
- username: `username`
- password: `password`

## Run the backend
```bash
cd backend
npm install
npm run dev
```

## Run the frontend
```bash
cd frontend
npm install
npm run dev
```

## Why this version is simple
The backend currently uses mock data stored in memory so the flow is easy to test first.
After this works, the next step is replacing the mock data with PostgreSQL queries.
