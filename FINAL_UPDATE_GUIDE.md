# VectorShield AI — Consolidated website update

This version merges earlier change requests into the user's latest uploaded website, instead of only adding videos.

## Implemented
- Historical 2026 Weeks 1–22 distribution percentages and the two chart images removed **from the website Findings section** (the source research paper itself is unchanged).
- Published Random Forest accuracy 86.35%, precision 86.37%, recall 86.35%, F1 86.36%, and XGBoost accuracy 85.58% remain, with improved accuracy styling.
- Today's/most recent dengue risk panel: dynamically dated in Asia/Colombo, never invents values.
- Four detailed component popups under Methodology with verified member descriptions and technologies.
- Local technology badge icons, commercialization/opportunity section, demo/feedback video gallery.
- View and Download for provided research documents, and download for supplied PP1/PP2 PPTX.
- Presentations can open OneDrive when **actual sharing URLs** are entered in `api-config.js`.
- Existing team photo layout, branding, and FormSubmit contact form remain.

## Still awaiting user-supplied information
1. **Actual REST API route + response schema** for today's risk. The Swagger documentation URL alone does not establish a usable GET route. Set `window.VECTORSHIELD_API_CONFIG.riskEndpoint` in `api-config.js` only after verifying a *public, CORS-enabled, safe GET endpoint* with the response shape documented in that file. For a POST or protected endpoint, implement an appropriate server-side proxy instead of placing secret keys in the browser. The sample counts are **not real data**. A weekly model forecast must be labeled as weekly.
2. OneDrive share links for each presentation. Set `window.VECTORSHIELD_ONEDRIVE_LINKS` in `api-config.js`, using links for which viewers have permission. Without a link, the presentation name remains plain text.
3. `presentations/proposal-presentation.pdf` and `presentations/final-presentation.pdf`: absent, so their VIEW and DOWNLOAD controls remain disabled. For existing PP1/PP2 PPTX, DOWNLOAD works; a reliable browser View requires a PDF version or verified OneDrive link.
4. `assets/videos/demo/system-demo-01.mp4`, `system-demo-02.mp4`, `assets/videos/feedback/feedback-01.mp4`, and `feedback-02.mp4`: missing videos display placeholders. Permission is required for publishing feedback videos.
5. Final thesis, charter, and checklists are not supplied and are clearly labeled pending.
6. Academic Guidance / Our Researchers portrait-to-name mappings were not confirmed; no identity is guessed.

## Test before push
Run from project root: `py -m http.server 5501` (or `python -m http.server 5501`), then visit `http://127.0.0.1:5501/index.html`. Keep terminal running. Test navigation, popup close/Escape, document links, video placeholders, and the contact form on the live domain once deployed.

## Git
Copy the updated files into your existing clone, review `git diff`, then use `git add index.html styles.css script.js api-config.js README.md FINAL_UPDATE_GUIDE.md assets/technology/ assets/videos/` followed by a meaningful commit and push. Include any legitimately supplied PDF/video files separately.

**Privacy and deployment:** The project ZIP does not contain `.git`, credentials, or private API keys. Documents and videos placed in public static folders become accessible through the deployed website.
