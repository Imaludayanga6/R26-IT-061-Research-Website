# R26-IT-061 — Academic Research Website (Starter v1)

A responsive informational research website, **separate from the dengue mobile application**.

## How to open
1. Extract the website ZIP.
2. Open `index.html` in Chrome, Edge, or Firefox. Internet access is optional; only the Google Fonts are loaded from an external URL (the website works with system fonts when offline).
3. Edit `index.html` to update academic content and links; use `styles.css` for design and `script.js` for navigation functionality.
4. Keep folders together when submitting or moving the website.

## Included
- Academic Home, Domain, Methodology, Results, Milestones, Documents, Presentations, Team, and Contact sections.
- Research paper, four proposal PDFs, PP1 and PP2 presentations, and three extracted research figures.
- Buttons, navigation, dropdown FAQ, responsive layout, and download/open links.

## Must verify/update before final viva/submission
- The research paper states **86.35% Random Forest accuracy**, while an earlier individual ML evaluation reported **84.31%**. Verify the final approved data split and metric; do not mix different experiments.
- Verify final team names, roles, supervisors' preferred titles, milestone dates and official assessment marks.
- Verify all linked documents are approved for public distribution.
- PP2 slides may contain outdated/unrelated content; correct the source document before publishing.
- Add final reports, charter, checklists, and final slides when provided.
- Proposal slide deck is ~19 MB by itself and was intentionally excluded to keep the complete source website under the **20 MB** course upload limit. Compress to PDF or link the deck externally (subject to course permission).
- Citation of research-paper values in the interface does not replace proofreading and source attribution in the final academic submission.
- Contact button currently points to the institutional student email indicated in the supplied paper. Replace if a different public group contact is preferred.

## Website size
The source package was intentionally kept small and self-contained. It does not require a backend, API key or paid hosting. `index.html` is the starting file.


## Contact form setup

The contact section uses FormSubmit (https://formsubmit.co/) via a client-side AJAX POST.
The destination is currently set to `it22214034@my.sliit.lk`, taken from the research paper.

1. Confirm the research team approves this destination address and the use of a third-party form processor.
2. Deploy the website and submit a test message.
3. **The owner of that email inbox must follow FormSubmit's activation email** before messages can be delivered.
4. Send a second test submission and confirm actual receipt. Until then, delivery is unverified.
5. To change the recipient, change the `action` URL on `#contactForm` in `index.html`.
6. Form submissions are handled by FormSubmit, not Vercel; do not submit private health or personal medical information.

The form does not include custom backend email sending or guaranteed spam filtering.


## Team portrait gallery update

Six submitted photos were optimized as `assets/team/portrait-01.webp` through `portrait-06.webp` and added to the Team section. The photos are displayed in the same upload order. **Their identities have not been matched to researcher/supervisor names**: confirm each correspondence before labeling portraits with names or roles. Member details below the gallery are sourced from the supplied research paper.

No changes to `script.js` or the contact form. The contact form needs an HTTP(S) origin and a configured/activated receiving inbox; test on Vercel, not via `file://`. Ensure team permission to publicly publish each image and linked document.
