# Manito Property Management - Next.js Site (`mpm_site`)

Modern Next.js (v16 App Router) web application for **Manito Property Management**, cloned from [spokanearearentals.com](https://www.spokanearearentals.com/).

## Features Included

- **Full Page Clone & Modernization**:
  - **Home** (`/`): Spokane hero banner, quick action tiles, portable reports notice, award badge, why choose us features.
  - **Available Rentals** (`/available-rentals/`): AppFolio listings embed, showings schedules, fee notes, and QuickLeasePro apply button.
  - **Portfolio Galleries** (`/our-portfolio/` & `/our-portfolio1/`): Responsive photo galleries with full-screen interactive lightbox modals.
  - **Tenants**:
    - Maintenance Request (`/maintenance-request/`): Routine request prompts, AppFolio login, and 24/7 emergency phone numbers.
    - Tenant Portal (`/tenant-portal/`): Benefits, online payment options, convenience, and security overview.
    - Tenant Resources (`/tenant-resources/`): Spokane utility directory (Avista, City of Spokane, etc.), office payment rules, USPS change of address, and voter registration form.
    - Evacuation Plans (`/evacuation-plans/`): Multi-family floor plans and emergency PDF downloads.
  - **Owners**:
    - Owner Portal (`/owner-portal/`): Online statements, accounting access, benefits, and AppFolio login.
    - Owner Resources (`/owner-resources/`): Spokane County property taxes, IRS resources, and mortgage payment guidance.
  - **Real Estate Agents** (`/real-estate-agent-services/`): Realtor partnership details, broker testimonial, and referral policies.
  - **Management Services** (`/management-services/`): Full-service management philosophy and AppFolio technology advantages.
  - **Rental Criteria** (`/rental-criteria/`): Complete AcraNet criteria, credit requirements, causes for denial, and Resident Benefits Package (RBP).
  - **Contact Us** (`/contact-us/`): Interactive contact form, office hours, phone directory, and Google Map.
  - **FAQ / Q&A** (`/qa/`): Interactive categorized FAQ accordions for general, applicant, tenant, and owner inquiries.
- **Static Export & GitHub Pages Support**:
  - Configured with `output: "export"`, `images: { unoptimized: true }`, and `trailingSlash: true`.
  - `.nojekyll` and `CNAME` files included in `public/`.
  - Legacy `.html` aliases included for zero-breakage backwards compatibility.
- **Future Vercel Deployment**:
  - Built natively on Next.js standard conventions; ready to deploy on Vercel simply by pointing root directory to `mpm_site`.

## Available Scripts

- `npm run dev`: Starts local development server on [http://localhost:3000](http://localhost:3000).
- `npm run build`: Builds the static export into `out/`.
- `npm run lint`: Runs ESLint with zero warnings/errors.
