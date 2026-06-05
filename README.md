# Poojashree Choudhury's Static Portfolio Website

A fast, highly customized, responsive static portfolio designed for seamless zero-build hosting on **GitHub Pages**.

## 📁 Repository Structure

```text
portfolio/
│
├── index.html       # Primary portal entrypoint (modular responsive structure)
├── style.css        # Luxurious dark-slate themes, animations & glow effects
├── script.js        # Active scroll-spy highlights & form state logic
├── 404.html         # Custom 404 error fallback
│
├── assets/          # Static binary media elements directory
│   ├── profile.jpg
│   ├── projects/    # Subdirectory for project-specific screenshots
│   └── resume.pdf   # Local override path for your resume
│
└── README.md        # Technical guidelines & deployment instructions
```

## 🚀 Deployment to GitHub Pages

To host this portfolio for free under `https://poojashree54.github.io/`:

### Method 1: GitHub Web Interface
1. Navigate to your GitHub repository.
2. Ensure you have committed these static files (`index.html`, `style.css`, `script.js`, `404.html`, `assets/`) directly to the core root.
3. Click on the **Settings** tab.
4. From the left-hand navigation sidebar, click on **Pages**.
5. Under "Build and deployment", select **Deploy from a branch**.
6. Set the branch to **main** (or `master`) and directory to **/** (root).
7. Scroll and click **Save**.
8. Within a few minutes, your site will be served live at `https://your-username.github.io/your-repo-name/`.

### Method 2: Git CLI Command Terminal
If uploading from your command shell:
```bash
git init
git add .
git commit -m "feat: launch high-performance static portfolio website"
git branch -M main
git remote add origin https://github.com/poojashree54/<repository-name>.git
git push -u origin main
```

## 🛠️ Features
- **Tailwind Framework (CDN Base)**: Fluid layouts and rich spacing tokens out-of-the-box.
- **Scroll Spy Link Highlighting**: Navigational header automatically updates highlights based on the section active in the user viewport.
- **Intersection Observer Animations**: Mimics professional framer animation packages instantly on scroll with zero overhead.
- **Form State Machine Simulation**: Smooth contact form sending triggers and success screen confirmation.
- **Expandable Project Drawers**: Dynamic accordion-style detail lists on clicks for elegant, space-efficient presentation.
