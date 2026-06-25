import structlog
from sqlalchemy.orm import Session
from models import Contact
from schemas import ContactCreate
from errors import ValidationError_
from utils.sanitizer import strip_html
from utils.encryption import encrypt

logger = structlog.get_logger()


def create_contact(db: Session, data: ContactCreate) -> Contact:
    if not data.name or not data.phone or len(data.phone.strip()) < 10:
        raise ValidationError_("Name and valid phone (10+ digits) are required")

    sanitized = data.model_dump()
    for field in ("name", "email", "city", "message", "product_interest"):
        sanitized[field] = strip_html(sanitized.get(field))
    sanitized["phone"] = encrypt(sanitized.get("phone"))
    sanitized["email"] = encrypt(sanitized.get("email"))
    contact = Contact(**sanitized)
    db.add(contact)
    db.commit()
    db.refresh(contact)

    logger.info("contact.created", contact_id=contact.id, name=data.name, city=data.city)
    return contact
