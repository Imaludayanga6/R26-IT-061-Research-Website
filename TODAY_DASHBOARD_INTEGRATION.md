# Today Dashboard API integration

Endpoint: `GET https://sahan-kaveesha-r26-it-061-dengue-api.hf.space/today-dashboard`

`script.js` reads `date`, `week`, `risk_level`, `confidence`, `model_used`, and `probabilities.High/Medium/Low`.

Displayed percentages are estimated class probabilities for a **single model prediction**, NOT proportions of Colombo localities or confirmed dengue incidents. The API uses historical seasonal averages; do not describe it as real-time field surveillance.

Test with VS Code local HTTP server and verify browser DevTools Console/Network. API availability and CORS must allow this website origin.
