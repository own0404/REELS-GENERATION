from contextlib import asynccontextmanager
import structlog
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from config import settings
from logging_config import configure_logging
from database import engine, Base
from deps import limiter, validate_csrf
from routers import contact, newsletter, products, inquiry, auth, admin, csrf

logger = structlog.get_logger()


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; "
            "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.google.com/recaptcha/ https://recaptcha.google.com www.gstatic.com; "
            "style-src 'self' 'unsafe-inline' https://www.google.com/recaptcha/; "
            "img-src 'self' data: blob:; "
            "font-src 'self' data: fonts.googleapis.com fonts.gstatic.com; "
            "connect-src 'self' https://wa.me; "
            "form-action 'self'; "
            "frame-src 'self' https://www.google.com/recaptcha/ https://recaptcha.google.com www.gstatic.com; "
            "frame-ancestors 'none'; "
            "base-uri 'self'; "
            "object-src 'none'"
        )
        response.headers["Strict-Transport-Security"] = "max-age=63072000; includeSubDomains; preload"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=(), interest-cohort=()"
        return response


@asynccontextmanager
async def lifespan(app: FastAPI):
    configure_logging()
    Base.metadata.create_all(bind=engine)
    logger.info("app.startup", cors_origins=settings.cors_origins)
    yield
    logger.info("app.shutdown")


app = FastAPI(
    title="FlowPoint Water Softener API",
    description="Backend API for the FlowPoint landing page",
    version="1.0.0",
    lifespan=lifespan,
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins.split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def limit_body_size(request: Request, call_next):
    content_length = request.headers.get("content-length")
    if content_length is not None:
        try:
            if int(content_length) > 1_048_576:
                return JSONResponse(status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE, content={"detail": "Request entity too large"})
        except ValueError:
            pass
    response = await call_next(request)
    return response


@app.middleware("http")
async def csrf_middleware(request: Request, call_next):
    validate_csrf(request)
    response = await call_next(request)
    return response


@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info("request.started", method=request.method, path=request.url.path)
    response = await call_next(request)
    logger.info("request.completed", method=request.method, path=request.url.path, status=response.status_code)
    return response


app.add_middleware(SecurityHeadersMiddleware)


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error("unhandled.exception", error=type(exc).__name__, detail=str(exc), path=request.url.path)
    return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={"detail": "Internal server error"})


app.include_router(contact.router)
app.include_router(newsletter.router)
app.include_router(products.router)
app.include_router(inquiry.router)
app.include_router(csrf.router)
app.include_router(auth.router)
app.include_router(admin.router)


@app.get("/api/health")
@limiter.limit("30/minute")
def health_check(request: Request):
    return {"status": "healthy", "service": "FlowPoint API"}
