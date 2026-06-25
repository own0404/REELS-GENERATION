import structlog
from sqlalchemy.orm import Session
from models import Newsletter
from errors import ConflictError
from utils.sanitizer import strip_html

logger = structlog.get_logger()


def subscribe(db: Session, email: str) -> Newsletter:
    email = strip_html(email) or email
    existing = db.query(Newsletter).filter(Newsletter.email == email).first()
    if existing:
        if existing.is_active:
            raise ConflictError("Email is already subscribed")
        existing.is_active = True
        db.commit()
        db.refresh(existing)
        logger.info("newsletter.reactivated", email=email)
        return existing

    entry = Newsletter(email=email)
    db.add(entry)
    db.commit()
    db.refresh(entry)

    logger.info("newsletter.subscribed", email=email, entry_id=entry.id)
    return entry
