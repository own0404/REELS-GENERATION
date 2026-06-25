# FlowPoint — Agent Instructions

## Security Patterns

### 1. PII Encryption
- Phone and email fields are encrypted at rest using Fernet (AES-256) via `backend/utils/encryption.py`
- Encryption happens at the **service layer**: `contact_service.py`, `inquiry_service.py`, `newsletter_service.py`
- Admin API routes decrypt before returning: `backend/routers/admin.py`
- `FIELD_ENCRYPTION_KEY` env var must be set
- Migration script: `scripts/migrate_encrypt.py`

### 2. CSRF Protection
- Double-submit cookie pattern via `itsdangerous`
- `GET /api/csrf-token` returns signed token, set as httponly cookie
- All POST endpoints (except `/api/auth/*`) require `X-CSRF-Token` header matching cookie
- Frontend fetches token on mount, sends as header on form submit

### 3. CAPTCHA
- Google reCAPTCHA v3 on contact form
- Backend validates via `backend/deps.py:verify_recaptcha()` — score >= 0.5
- Endpoints skip verification if `RECAPTCHA_SECRET_KEY` is not configured (dev mode)

### 4. Rate Limits
- Contact: 5/min | Newsletter: 3/min | Inquiry: 5/min
- Auth login: 10/min | Products + Health: 30/min

### 5. Security Headers
- Frontend: `next.config.mjs` headers() — CSP, HSTS, XFO, XCTO, Referrer-Policy, Permissions-Policy
- Backend: `backend/main.py:SecurityHeadersMiddleware` — same headers on all API responses
- CSP whitelists: recaptcha.google.com, www.gstatic.com, fonts.googleapis.com, wa.me

### 6. Request Body Limit
- FastAPI middleware rejects Content-Length > 1MB with 413 status
