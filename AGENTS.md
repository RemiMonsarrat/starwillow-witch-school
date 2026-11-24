# Starwillow Witch School

- Whenever you update files in `public/`, commit and push to `origin main` using `/usr/local/bin/gh auth git-credential` (`git -c credential.helper= -c 'credential.helper=!/usr/local/bin/gh auth git-credential' push origin main`).
- Pushing to `main` automatically deploys `public/` to GitHub Pages (`https://remimonsarrat.github.io/starwillow-witch-school/`) via `.github/workflows/pages.yml`.
- Also restart `starwillow` orb service (`amp orb service restart starwillow`) if testing locally.
