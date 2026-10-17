# Add research videos

Put MP4 video files in these exact paths (case-sensitive on Vercel):

- `assets/videos/demo/system-demo-01.mp4`
- `assets/videos/demo/system-demo-02.mp4`
- `assets/videos/feedback/feedback-01.mp4`
- `assets/videos/feedback/feedback-02.mp4`

The website automatically shows each uploaded video in its corresponding player after deployment. Missing videos show an "Awaiting video upload" placeholder rather than a broken player.

Use H.264 video + AAC audio in MP4 for browser compatibility. Keep clips optimized. For multiple large recordings, a hosted streaming service or OneDrive links are more scalable than storing videos in Git. GitHub blocks files over 100 MiB; large media may also exceed Vercel deployment limits. The course guide mentioned a 20 MB submission size, so keep the academic submission bundle within that limit or use external media links if permitted.

Test on a local web server (e.g. VS Code Live Server) or on Vercel, not with `file://`. Ensure participants have consented to public posting of feedback videos.

To add more videos, duplicate a `.media-card` block in `index.html` and change its `data-video-src`, title and description.

Commit after adding videos:

```bash
git add index.html styles.css script.js VIDEO_UPLOAD_GUIDE.md assets/videos/
git commit -m "feat: add research demo and feedback video gallery"
git push origin main
```
