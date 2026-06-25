import structlog
from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from database import get_db
from schemas import ContactCreate, ContactResponse
from services.contact_service import create_contact
from deps import limiter

router = APIRouter(prefix="/api", tags=["contact"])
logger = structlog.get_logger()


@router.post("/contact", response_model=ContactResponse)
@limiter.limit("5/minute")
def create_contact_endpoint(request: Request, contact: ContactCreate, db: Session = Depends(get_db)):
    return create_contact(db, contact)
