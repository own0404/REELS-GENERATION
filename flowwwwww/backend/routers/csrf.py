from fastapi import APIRouter, Response
from itsdangerous import URLSafeTimedSerializer
from config import settings

router = APIRouter(prefix="/api", tags=["csrf"])

_serializer = URLSafeTimedSerializer(
    secret_key=settings.jwt_secret or "csrf-fallback",
    salt="csrf-token",
)


@router.get("/csrf-token")
def get_csrf_token(response: Response):
    token = _serializer.dumps("csrf")
    response.set_cookie(
        key="csrf_token",
        value=token,
        httponly=True,
        secure=True,
        samesite="strict",
        max_age=3600,
    )
    return {"csrf_token": token}
