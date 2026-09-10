# Manito Property Management

Official website for **Manito Property Management** (formerly Century 21 Property Management), serving Spokane, Spokane Valley, Cheney, Liberty Lake, and surrounding areas.

## Live URL & Domains
- Custom Domain: [manitopropertymgmt.com](https://manitopropertymgmt.com)
- GitHub Pages Root: [https://manito-property-mgmt.github.io/](https://manito-property-mgmt.github.io/)

---

## Project Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml        # Automated GitHub Pages deployment on push to main
├── CNAME                     # Domain configuration for GitHub Pages (manitopropertymgmt.com)
├── README.md
└── mpm_site/                 # Next.js Application
    ├── app/                  # App Router pages (Home, Rentals, Portfolios, Portals, Criteria, Contact, QA)
    ├── components/           # UI components (Navbar, Footer, HeroBanner, PortfolioGallery, ContactForm, etc.)
    ├── data/                 # Portfolio property listings and metadata
    ├── public/               # Static assets, high-res images, PDFs, legacy .html redirects, .nojekyll, CNAME
    ├── next.config.ts        # Next.js configuration (static export with unoptimized images)
    ├── package.json
    └── tsconfig.json
```

---

## Local Development

1. Navigate to the Next.js directory:
   ```bash
   cd mpm_site
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment Guide

### 1. GitHub Pages (Current Deployment)
- **Automatic Deployment**: Any push to the `main` branch triggers the GitHub Actions workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
- **Workflow Highlights**:
  1. Checks out the repository and installs Node.js.
  2. Runs `npm ci` and `npm run build` inside `mpm_site`.
  3. Deploys the static export from `mpm_site/out` to GitHub Pages using official GitHub Actions (`actions/deploy-pages@v4`).
- **Domain & Jekyll Handling**:
  - `public/CNAME` ensures GitHub Pages preserves `manitopropertymgmt.com`.
  - `public/.nojekyll` ensures GitHub Pages does not ignore Next.js `_next/static` assets.
  - Legacy `.html` aliases in `public/` guarantee existing bookmarks (e.g. `/available-rentals.html`) redirect seamlessly.

### 2. Moving to Vercel (Future Migration)
To transition deployment to Vercel:
1. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
2. Import the `manito-property-mgmt/manito-property-mgmt.github.io` GitHub repository.
3. In the project configuration:
   - **Root Directory**: Select `mpm_site`.
   - **Framework Preset**: `Next.js` (automatically detected).
4. Click **Deploy**.
5. In Vercel Project Settings > **Domains**, add `manitopropertymgmt.com` and update your DNS records according to Vercel's instructions.
6. Once live on Vercel, you can disable GitHub Pages in GitHub Settings > Pages.
