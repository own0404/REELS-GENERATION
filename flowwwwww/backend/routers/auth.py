import structlog
from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session
from database import get_db
from models import AdminUser
from schemas import AdminLogin, AdminToken
from auth import verify_password, create_token, get_current_admin
from deps import limiter

router = APIRouter(prefix="/api/auth", tags=["auth"])
logger = structlog.get_logger()


@router.post("/login", response_model=AdminToken)
@limiter.limit("10/minute")
def login(request: Request, data: AdminLogin, db: Session = Depends(get_db)):
    admin = db.query(AdminUser).filter(AdminUser.username == data.username).first()
    if not admin or not verify_password(data.password, admin.hashed_password):
        logger.warning("auth.login_failed", username=data.username)
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid username or password")
    token = create_token(admin.id)
    logger.info("auth.login_success", admin_id=admin.id, username=admin.username)
    return AdminToken(access_token=token)


@router.get("/me")
def me(admin: AdminUser = Depends(get_current_admin)):
    return {"id": admin.id, "username": admin.username}
