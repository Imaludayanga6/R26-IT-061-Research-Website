# Website JavaScript initialization fix

- Moved component dialog markup before JavaScript script tags.
- `api-config.js` loads before `script.js`, both just before closing `</body>`.
- Removed the possibility of duplicated script tags.
- Do not copy the malformed pasted index markup that has `</body></html>` inside `<head>`.
- Browser testing: run `py -m http.server 5501` from this folder, then open `http://127.0.0.1:5501/`. Inspect Console and Network if API still fails.
- API data is model probabilities based on historical averages, not observed case distribution.
