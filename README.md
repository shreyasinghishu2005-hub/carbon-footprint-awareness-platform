# GreenPulse

GreenPulse is a self-contained carbon footprint awareness platform prototype. It helps users measure monthly emissions, see their biggest sources, get tailored recommendations, track goals, and save progress snapshots over time.

## Features

- Live carbon footprint calculator
- Personal dashboard with score, breakdown, and trend chart
- AI-style sustainability command center
- Eco-friendly recommendations
- Goals and achievement badges
- Awareness content and a micro-quiz
- Smart alerts, location suggestions, and journal logs
- Carbon offset marketplace and report export
- Community leaderboard
- Saved snapshot reports

## Pages

- `home.html` - landing page and quick navigation
- `calculator.html` - emissions calculator and tips
- `dashboard.html` - score, charts, and ranking
- `goals.html` - goals, badges, and journal
- `learn.html` - awareness content and quiz
- `community.html` - community feed and leaderboard
- `reports.html` - snapshots, exports, and forecasts

`index.html` now redirects to `home.html`, so the app still opens cleanly from the root.
On mobile, the primary navigation collapses into a side drawer opened with the menu button.

## Run it

Open `home.html` directly in a browser, or serve the folder with any static server.

## Run with Node

```bash
yarn
yarn start
```

The app listens on `PORT` when deployed, which matches Render's default web service setup.

## Verify

```bash
yarn test
```

This checks the shared page structure, navigation, and accessibility hooks.

## Assets

All visuals are built with HTML, CSS, and inline SVG only. No third-party stock photos, icon packs, or external media assets are included.

## Notes

The calculator uses approximate emissions factors for demonstration and education.
