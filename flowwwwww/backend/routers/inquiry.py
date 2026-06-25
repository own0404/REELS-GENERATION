import structlog
from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from database import get_db
from schemas import ProductInquiryCreate, ProductInquiryResponse
from services.inquiry_service import create_inquiry
from deps import limiter

router = APIRouter(prefix="/api", tags=["inquiry"])
logger = structlog.get_logger()


@router.post("/inquiry", response_model=ProductInquiryResponse)
@limiter.limit("5/minute")
def create_inquiry_endpoint(request: Request, data: ProductInquiryCreate, db: Session = Depends(get_db)):
    return create_inquiry(db, data)
