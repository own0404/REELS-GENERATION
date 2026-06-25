import structlog
from sqlalchemy.orm import Session
from models import ProductInquiry
from schemas import ProductInquiryCreate
from errors import ValidationError_
from utils.sanitizer import strip_html
from utils.encryption import encrypt

logger = structlog.get_logger()


def create_inquiry(db: Session, data: ProductInquiryCreate) -> ProductInquiry:
    if not data.phone or len(data.phone.strip()) < 10:
        raise ValidationError_("Valid phone number (10+ digits) is required")
    if not data.product_model:
        raise ValidationError_("Product model is required")

    sanitized = data.model_dump()
    for field in ("name", "message"):
        sanitized[field] = strip_html(sanitized.get(field))
    sanitized["phone"] = encrypt(sanitized.get("phone"))
    inquiry = ProductInquiry(**sanitized)
    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)

    logger.info("inquiry.created", inquiry_id=inquiry.id, product=data.product_model)
    return inquiry
