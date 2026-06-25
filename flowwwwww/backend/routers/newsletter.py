from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from database import get_db
from schemas import NewsletterCreate, NewsletterResponse
from services.newsletter_service import subscribe
from deps import limiter, verify_recaptcha

router = APIRouter(prefix="/api", tags=["newsletter"])


@router.post("/newsletter", response_model=NewsletterResponse)
@limiter.limit("3/minute")
async def subscribe_endpoint(
    request: Request,
    data: NewsletterCreate,
    db: Session = Depends(get_db),
    _: None = Depends(verify_recaptcha),
):
    return subscribe(db, data.email)
