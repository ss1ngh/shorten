# Project Routing Architecture Report

## 1. Project Overview

This is a **monorepo** with two separate applications:

| Component | Framework | Location | Port |
|-----------|-----------|----------|------|
| Frontend | Next.js 16.2.1 (App Router) | `/home/ss1ngh/code/proj/shorten/` | 3000 |
| Backend | Express 5.2.1 | `/home/ss1ngh/code/proj/shorten/server/` | 5000 |

Both share **Prisma** for database access but use different approaches to routing.

---

## 2. Frontend Routing (Next.js App Router)

### 2.1 Page Routes (Filesystem-based)

| File Path | URL Route | Purpose |
|-----------|-----------|---------|
| `app/page.tsx` | `/` (root) | Landing page with Navbar, HeroSection, FeaturesSection, PricingSection, Footer |
| `app/(dashboard)/layout.tsx` | Dashboard layout | Contains sidebar with navigation links to `/shorten`, `/analytics`, `/domains`, `/tags` |
| `app/(dashboard)/shorten/page.tsx` | `/shorten` | URL shortening interface |
| `app/(dashboard)/analytics/page.tsx` | `/analytics` | Analytics view for created links |

**Key concept**: The `(dashboard)` folder uses Next.js **route groups** (parentheses) - this groups routes visually without affecting the URL path.

### 2.2 Next.js API Routes (Route Handlers)

These replace traditional Express API routes:

| File Path | HTTP Method | Endpoint | Function |
|-----------|-------------|----------|----------|
| `app/api/shorten/route.ts` | `POST` | `/api/shorten` | Creates short URL |
| `app/api/[shortId]/route.ts` | `GET` | `/api/[shortId]` | Redirects to original URL |
| `app/api/qr/[shortId]/route.ts` | `GET` | `/api/qr/[shortId]` | Returns QR code data URL |
| `app/api/analytics/[shortId]/route.ts` | `GET` | `/api/analytics/[shortId]` | Returns click analytics |

---

## 3. Backend Routing (Express)

### 3.1 Express Entry Point

**File**: `server/src/index.ts`

```typescript
const app = express();

app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => { ... });  // Health check

app.use("/", urlRoutes);  // Mounts all URL routes at root

app.use(errorHandler);    // Global error middleware
```

### 3.2 Express Routes

**File**: `server/src/routes/url.routes.ts`

| Route | Middleware | Handler Function |
|-------|------------|-------------------|
| `POST /shorten` | `aggressiveLimiter` | `createShortUrl` |
| `GET /analytics/:shortId` | `normalLimiter` | `getAnalytics` |
| `GET /qr/:shortId` | `normalLimiter` | `getShortUrlQrCode` |
| `GET /:shortId` | `normalLimiter` | `getShortUrl` |

### 3.3 Express Controllers

**File**: `server/src/controllers/url.controller.ts`
- `createShortUrl` - Validates input, generates short ID with nanoid, creates QR code, saves to database
- `getShortUrl` - Checks Redis cache first, falls back to DB, increments click count, redirects
- `getShortUrlQrCode` - Fetches URL, generates QR code

**File**: `server/src/controllers/analytics.controller.ts`
- `getAnalytics` - Fetches click logs and aggregates by date

### 3.4 Express Repository

**File**: `server/src/repository/url.repository.ts`
- `saveUrl()` - Prisma create operation
- `findUrlByShortId()` - Prisma findUnique
- `incrementClicks()` - Transaction that increments click count AND creates click log entry

---

## 4. How Frontend Connects to Backend

### 4.1 API Client Library

**File**: `lib/api.ts`

This is the bridge between frontend and API routes:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export async function shortenUrl(url: string) {
  const response = await fetch(`${API_BASE_URL}/api/shorten`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullUrl: url }),
  });
  return result.data;
}
```

**Functions**:
- `shortenUrl(url)` → calls `POST /api/shorten`
- `getAnalytics(shortId)` → calls `GET /api/analytics/${shortId}`
- `getQrCode(shortId)` → calls `GET /api/qr/${shortId}`
- `getFullUrl(shortId)` → constructs URL for redirection

### 4.2 Frontend Usage Example

**File**: `app/(dashboard)/shorten/ShortenPageClient.tsx`

```typescript
import { shortenUrl } from "@/lib/api";

const handleShorten = async () => {
  const data = await shortenUrl(url);  // Calls /api/shorten
  setShortLink(data.url.shortUrl);
};
```

---

## 5. Express Routes → Next.js API Routes Conversion

### 5.1 Route Definition Comparison

| Aspect | Express | Next.js |
|--------|---------|---------|
| **Location** | Centralized in `server/src/routes/` | Distributed in `app/api/` |
| **Pattern** | `router.get('/path', handler)` | Export `GET/POST function` |
| **Mounting** | `app.use('/', router)` in index.ts | Automatic via file system |

### 5.2 Handler Conversion

**Express** (`server/src/controllers/url.controller.ts`):
```typescript
export const createShortUrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fullUrl } = req.body;
    const url = await saveUrl({ ... });
    return res.status(StatusCodes.CREATED).json({ success: true, data: url });
  } catch (error) {
    next(error);  // Passes to error middleware
  }
};
```

**Next.js** (`app/api/shorten/route.ts`):
```typescript
export async function POST(request: Request) {
  try {
    const { fullUrl } = await request.json();
    const url = await prisma.url.create({ ... });
    return NextResponse.json({ success: true, data: url }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
```

### 5.3 Key Differences

| Feature | Express | Next.js Route Handler |
|---------|---------|----------------------|
| **Request object** | `req` parameter | `request.json()` async |
| **Response object** | `res` parameter | `NextResponse` static class |
| **Parameters** | `req.params.shortId` | `{ params }` destructuring |
| **Query strings** | `req.query` | `request.nextUrl.searchParams` |
| **Error handling** | `next(error)` middleware | Try/catch with error response |
| **Rate limiting** | `express-rate-limit` middleware | Not built-in (needs external lib) |
| **Validation** | Zod + middleware | Manual in handler |
| **CORS** | `cors` middleware | Built-in or next.config.ts |

### 5.4 Current Status

**The project currently has BOTH systems active**:
- **Primary**: Next.js API routes (used by frontend)
- **Secondary**: Express server (appears to be legacy/alternative)

The frontend specifically calls Next.js API routes via `lib/api.ts` pointing to `localhost:3000`.

---

## 6. Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND (Next.js)                      │
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌───────────────┐ │
│  │ ShortenPage  │───▶│  lib/api.ts   │───▶│ API Routes    │ │
│  │ Client.tsx   │    │ (fetch calls) │    │ (app/api/)    │ │
│  └──────────────┘    └──────────────┘    └───────┬───────┘ │
│                                                  │          │
│                                                  ▼          │
│  ┌──────────────┐    ┌──────────────┐    ┌───────────────┐ │
│  │ Analytics    │    │ localStorage │    │ prisma client │ │
│  │ Page.tsx     │    │ (recent_links)    │ @/lib/prisma  │ │
│  └──────────────┘    └──────────────┘    └───────┬───────┘ │
└─────────────────────────────────────────────────┼──────────┘
                                                  │
                                                  ▼
                              ┌─────────────────────────────────┐
                              │     PostgreSQL Database         │
                              │     (via Prisma)                │
                              └─────────────────────────────────┘


┌─────────────────────────────────────────────────────────────┐
│                    BACKUP: Express Server                    │
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌───────────────┐ │
│  │ index.ts     │───▶│ url.routes   │───▶│ controllers   │ │
│  │ (entry)      │    │ (mounts all) │    │ (business)    │ │
│  └──────────────┘    └──────────────┘    └───────┬───────┘ │
│                                                  │          │
│  ┌──────────────┐    ┌──────────────┐           │          │
│  │ ratelimit    │    │ error handler│           ▼          │
│  │ service.ts   │    │ middleware   │    ┌───────────────┐ │
│  └──────────────┘    └──────────────┘    │ repository    │ │
│                                          │ (prisma)      │ │
│                                          └───────┬───────┘ │
└─────────────────────────────────────────────┼────────────┘
                                              │
                                              ▼
                              ┌─────────────────────────────────┐
                              │     PostgreSQL + Redis          │
                              │     (Express server)            │
                              └─────────────────────────────────┘
```

---

## 7. Summary of Files and Their Functions

### Frontend (Next.js)

| File | Function |
|------|----------|
| `app/page.tsx` | Landing page - renders Navbar, HeroSection, FeaturesSection, Footer, PricingSection |
| `app/layout.tsx` | Root layout with HTML/head metadata |
| `app/(dashboard)/layout.tsx` | Dashboard layout with sidebar navigation using `usePathname` for active states |
| `app/(dashboard)/shorten/page.tsx` | Server component wrapper - returns `ShortenPageClient` |
| `app/(dashboard)/shorten/ShortenPageClient.tsx` | Client component - form input, calls `shortenUrl()`, stores in localStorage |
| `app/(dashboard)/analytics/page.tsx` | Client component - displays links from localStorage, shows analytics modal |
| `app/api/shorten/route.ts` | POST handler - generates shortId with nanoid, creates QR, saves to DB, returns JSON |
| `app/api/[shortId]/route.ts` | GET handler - finds URL, increments clicks, creates click log, redirects (302) |
| `app/api/qr/[shortId]/route.ts` | GET handler - generates QR code data URL for given shortId |
| `app/api/analytics/[shortId]/route.ts` | GET handler - returns click logs and grouped data by date |
| `lib/api.ts` | API client - functions to call Next.js API routes |
| `lib/prisma.ts` | Singleton PrismaClient instance |

### Backend (Express)

| File | Function |
|------|----------|
| `server/src/index.ts` | Express app setup - middleware, CORS, mounts routes, error handler |
| `server/src/routes/url.routes.ts` | Route definitions with rate limiters applied |
| `server/src/controllers/url.controller.ts` | Business logic: createShortUrl, getShortUrl (with Redis cache), getShortUrlQrCode |
| `server/src/controllers/analytics.controller.ts` | Fetches analytics with date aggregation |
| `server/src/repository/url.repository.ts` | Prisma operations: saveUrl, findUrlByShortId, incrementClicks (transaction) |
| `server/src/middleware/error.middleware.ts` | Global error handler - catches ZodError, Prisma errors |
| `server/src/services/ratelimit.service.ts` | Rate limiters: aggressiveLimiter (50/min), normalLimiter (200/min) |
| `server/src/config/index.ts` | Redis client connection, Prisma client |

---

## 8. Connecting Express to Next.js (If Needed)

If you want the frontend to use the Express backend instead:

1. **Update `lib/api.ts`**:
```typescript
// Change from:
const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// To:
const API_BASE_URL = process.env.EXPRESS_API_URL || 'http://localhost:5000';
```

2. **Update endpoint paths** in `lib/api.ts` from `/api/shorten` to `/shorten` (matching Express routes).

3. **Remove** the Next.js API route files if not needed, or keep them for development.

The Express server would handle rate limiting (Redis-based), while Next.js API routes currently have no rate limiting implemented.