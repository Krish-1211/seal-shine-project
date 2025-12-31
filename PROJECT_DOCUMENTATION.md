# Seal Shine Project - Official Technical Documentation

**Version:** 1.0.0
**Last Updated:** 2025-12-20
**Project Name**: Seal Shine Project (Sure Seal Sealants)
**Description**: A comprehensive, enterprise-grade web platform for Sure Seal Sealants, designed to convert visitors into customers through premium design, intuitive navigation, and intelligent support tools.

---

## 1. Executive Summary
The Seal Shine Project is a modern single-page application (SPA) built to serve as the digital face of Sure Seal Sealants. It goes beyond a simple brochure site by integrating a dynamic product catalog, a wholesale customer portal, and an AI-driven chatbot assistant. The platform is designed for scalability, supporting both direct-to-consumer (DTC) and business-to-business (B2B) workflows.

---

## 2. Technology Philosophy & Stack

### Core Architecture
- **Framework**: **React 18** (bootstrapped with **Vite**).
    - *Why?* React provides the component-based architecture needed for complex UIs like the chatbot and product grid. Vite ensures sub-second HMR (Hot Module Replacement) and optimized production builds.
- **Language**: **TypeScript**.
    - *Why?* Strict type safety prevents runtime errors.
    - *Security Note*: Never commit Admin API keys to this repository. Use environment variables.

### UI & UX Engine
- **Styling**: **Tailwind CSS**.
    - *Why?* Utility-first CSS allows for rapid development of responsive designs without context switching.
- **Component Library**: **shadcn/ui** (built on **Radix UI**).
    - *Why?* Radix provides unstyled, accessible primitives (Dialogs, Tooltips, Accordions) which we style with Tailwind. This gives us full control over the aesthetic while ensuring WCAG compliance.
- **Icons**: **Lucide React**.
- **Data Visualization**: **Recharts**.
    - *Why?* Used in the Admin Dashboard for responsive, animated sales graphs.

### State & Data Management
- **Client State**: **Zustand**.
    - *Why?* A lightweight alternative to Redux. Used for the `cartStore` to manage the shopping cart session globally without boilerplate.
- **Server State**: **TanStack Query (React Query)**.
    - *Why?* Handles caching, polling, and background updating of product data. Essential for bridging our frontend with the remote data source.

---

## 3. High-Level Architecture

```
src/
├── components/          # Presentation Layer
│   ├── ui/              # Low-level primitives (Button, Card, Input)
│   ├── admin/           # Admin-specific blocks (Sidebar, ChartWidgets)
│   ├── HeroCarousel.tsx # Landing page engagement
│   └── ChatWidget.tsx   # Floating AI assistant
├── pages/               # Routing Layer
│   ├── Index.tsx        # Landing Page
│   ├── Products.tsx     # Faceted Product Catalog
│   ├── ProductDetail.tsx# Slug-based detail views
│   └── admin/           # Protected Dashboard Routes
├── hooks/               # Logic Layer
│   └── useShopify.ts    # Data bridging (Mock <-> Real API)
├── stores/              # Global State
│   └── cartStore.ts     # Shopping Cart Logic
├── lib/                 # Utilities
│   ├── mockData.ts      # Static Database (Source of Truth)
│   └── shopify.ts       # GraphQL Adapters
└── crop_products.py     # Asset Processing Pipeline
```

---

## 4. Key Feature Deep-Dive

### A. Intelligent Chatbot (`ChatWidget.tsx`)
Not just a simple contact form, the chatbot acts as a Level 1 support agent.
- **Logic**: It does not use an external LLM (to save costs/latency) but uses a **deterministic keyword scoring algorithm**.
- **Algorithm**:
    1.  **Normalization**: Inputs and product names are normalized (lowercase, punctuation removed).
    2.  **Tokenization**: Queries are split into tokens and compared against product keywords.
    3.  **Scoring**: Matches are weighted. Exact name matches get 100 points; partial token matches get fractional scores.
    4.  **Thresholding**: Only responses with a confidence score > 50% are shown to avoid hallucinations.
- **Capabilities**: Can quote prices, explain "Quick Dry" vs "Slow Dry" differences, and provide contact info.

### B. Dynamic Product Catalog (`Products.tsx`)
- **Faceted Search**: Implementation of client-side filtering logic allowing users to slice data by Category (Cleaners, Sealers) and granular text search simultaneously.
- **Hybrid Data Source**: The `useShopify` hook is designed as an adapter.
    - *Current State*: It pulls from `mockData.ts` to simulate a rich database without needing a backend.
    - *Future Ready*: It is pre-wired to switch to real Shopify Storefront API calls with zero UI changes needed.

### C. Admin Dashboard
- **Security**: Protected route wrapper (`AdminLayout`) that checks for authentication tokens before rendering child routes.
- **Visual Analytics**:
    - **Overview Chart**: A Recharts bar chart showing 6-month revenue trends.
    - **KPI Cards**: Real-time metrics for Total Revenue, Active Orders, and Site Traffic.
- **Inventory Management**: A table view enabling quick edits to product pricing and status.

### D. Automated Asset Pipeline (`crop_products.py`)
A custom Python automation was built to handle raw assets efficiently.
- **Problem**: Original product images were large, contiguous strips containing multiple bottles.
- **Solution**:
    - Uses `Pillow` (PIL) to load images.
    - **Slicing**: Mathematically divides strips into individual segments.
    - **Smart Cropping**: Calculates the bounding box of non-transparent pixels (`getbbox()`) to strictly crop the bottle, removing excess whitespace.
    - **Result**: Reduced file sizes and perfect centering for CSS `object-fit: contain`.

---

## 5. Development Workflow

### Prerequisites
- Node.js v16+ (LTS recommended)
- Python 3.8+ (only if running image processing scripts)

### Installation
```bash
# Clone the repository
git clone https://github.com/Krish-1211/seal-shine-project.git

# Install NPM dependencies
npm install

# Start the dev server
npm run dev
```

### Script Reference
- `npm run dev`: Starts Vite dev server on port 5173.
- `npm run build`: Compiles TypeScript to optimized JS in `/dist`.
- `npm run preview`: Locally preview the production build.
- `python crop_products.py`: Runs the asset slicing pipeline (requires `images/` directory).

---

## 6. Deployment Strategy

The project utilizes **GitHub Pages** for cost-effective, high-availability hosting.

### The "Single Page Application" (SPA) Challenge
Static hosts like GitHub Pages do not understand client-side routing (e.g., `/contact`). If a user refreshes the page at `/contact`, the host returns 404 because that file doesn't exist.

### Our Solution
We implemented a **404 Hack**:
1.  **Build Phase**: The standard `npm run build` runs.
2.  **Post-Build**: A script copies `index.html` to `404.html`.
    - `cp dist/index.html dist/404.html`
3.  **Runtime**: When GitHub Pages hits a 404, it serves `404.html` (which is actually our app). The React Router then takes over, reads the URL, and renders the correct page immediately.

---

## 7. Future Roadmap
- **Payment Gateway**: Integration of Stripe or Shopify Checkout for actual transaction processing.
- **User Accounts**: Firebase Authentication for customer login and order history.
- **CMS Integration**: Connecting a headless CMS (Sanity or Contentful) to allow non-technical staff to update the "News" and "Blog" sections.


## 8. Automation & Integrations (n8n)

The project leverages **n8n** for backend automation, specifically for inventory management, purchase order (PO) generation, and alerts. This system runs independently of the frontend but interacts via webhooks.

### Credential Requirements
To fully activate the workflow, the following credentials must be configured in the n8n instance:

#### A. Shopify (Admin API)
Used for: `Get Inventory Levels`, `Get Product Details`, `Get Last 30 Days Orders`, `Update Inventory Fields`.

**Choice 1: Partner Dashboard (Recommended - Future Proof)**
*Best for long-term maintenance and managing multiple stores.*
1.  Create a [Shopify Partner Account](https://partners.shopify.com/).
2.  Go to **Apps** > **Create App** > **Manually by Client**.
3.  When compiled, click **Distribution** > **Custom App** > **Select Store**.
4.  Install the app on your store and copy the **Admin API Access Token**.

**Choice 2: Store Admin (Legacy)**
*Fastest for single usage. Valid until Jan 1, 2026 for new apps.*
1.  Go to Store Admin > **Settings** > **Apps and sales channels** > **Develop apps**.
2.  Create app and configure scopes.
3.  Install and copy the `shpat_...` token.

**Required Scopes (Both Methods):**
`read_products`, `write_products`, `read_orders`, `read_inventory`, `write_inventory`.

#### B. Google Sheets
Used for: `Read Inventory Master`, `Read Suppliers`, `Read PO Log`, `Write Dashboard Metrics`, `Write Scenario Planning`, `Send PO Email`.
- **Authentication:** Service Account or OAuth2.
- **Requirement:** The Service Account email must be added as an "Editor" to the Inventory Master Sheet.

#### C. Slack
Used for: `Alert Slow-Mover`, `Alert Critical Stock`, `Alert PO Sent`, `Send Daily Summary`.
- **Authentication:** Bot User OAuth Token.
- **Scopes:** `chat:write`, `chat:write.public`.

### Workflow Triggers
1.  **Scheduled**: Runs every hour to sync generic inventory levels.
2.  **Webhook (Manual)**: Triggered from the Admin Dashboard > Settings > "Trigger Manual Sync".
3.  **Event-Based**: Triggered by Shopify "Order Created" webhooks.

---


**Project Maintainer**: Krish Kavathia
**Copyright**: © 2025 Sure Seal Sealants. All Rights Reserved.
