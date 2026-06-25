from fastapi import Request, HTTPException, status
from itsdangerous import URLSafeTimedSerializer, BadSignature, SignatureExpired
from slowapi import Limiter
from slowapi.util import get_remote_address

from config import settings

limiter = Limiter(key_func=get_remote_address)

_csrf_serializer = URLSafeTimedSerializer(
    secret_key=settings.jwt_secret or "csrf-fallback",
    salt="csrf-token",
)


def validate_csrf(request: Request):
    if request.method in ("GET", "HEAD", "OPTIONS"):
        return
    if request.url.path.startswith("/api/auth/"):
        return
    cookie_token = request.cookies.get("csrf_token")
    header_token = request.headers.get("X-CSRF-Token")
    if not cookie_token or not header_token:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="CSRF token missing")
    if cookie_token != header_token:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="CSRF token mismatch")
    try:
        _csrf_serializer.loads(header_token, max_age=3600)
    except SignatureExpired:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="CSRF token expired")
    except BadSignature:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="CSRF token invalid")
