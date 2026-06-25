from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from database import get_db
from schemas import NewsletterCreate, NewsletterResponse
from services.newsletter_service import subscribe
from deps import limiter

router = APIRouter(prefix="/api", tags=["newsletter"])


@router.post("/newsletter", response_model=NewsletterResponse)
@limiter.limit("3/minute")
def subscribe_endpoint(request: Request, data: NewsletterCreate, db: Session = Depends(get_db)):
    return subscribe(db, data.email)
