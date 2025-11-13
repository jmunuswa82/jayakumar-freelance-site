# Jayakumar Freelance Site - Final Package

This repo is a ready-to-publish static site optimized for professional presentation. Steps to deploy:
1. Create GitHub repo and push files.
2. Add GitHub secret GH_PAGES_TOKEN (Personal Access Token with repo+workflow).
3. (Optional) Deploy Netlify functions: add SENDGRID_API_KEY and TO_EMAIL to Netlify env vars.
4. Update index.html contact endpoint to your Netlify URL if using serverless function.

Files included:
- index.html (site)
- dist/styles.css (minimal professional CSS)
- assets/hero.png, assets/og.png, assets/social/*.png
- netlify/functions/send.js (SendGrid integration)
- .github/workflows/deploy.yml (deploy to gh-pages)
