// Public browser-side configuration. Never put private API keys here.
// Provide a verified GET endpoint returning:
// {"as_of":"2026-10-18","granularity":"daily","coverage":"Colombo District",
//  "risks":{"High":4,"Medium":6,"Low":10}}
// Numbers above are ONLY a response-shape example, not real research results.
window.VECTORSHIELD_API_CONFIG = { riskEndpoint: "https://sahan-kaveesha-r26-it-061-dengue-api.hf.space/today-dashboard" };
// Optional, verified OneDrive sharing URLs. Do not invent or use private URLs.
window.VECTORSHIELD_ONEDRIVE_LINKS = {
  'Proposal Presentation': null,
  'Progress Presentation 01': null,
  'Progress Presentation 02': null,
  'Final Presentation': null
};
