import structlog
from sqlalchemy.orm import Session
from models import Newsletter
from errors import ConflictError
from utils.sanitizer import strip_html
from utils.encryption import encrypt, decrypt

logger = structlog.get_logger()


def subscribe(db: Session, email: str) -> Newsletter:
    email = strip_html(email) or email
    encrypted_email = encrypt(email)
    existing = db.query(Newsletter).filter(Newsletter.email == encrypted_email).first()
    if existing:
        if existing.is_active:
            raise ConflictError("Email is already subscribed")
        existing.is_active = True
        db.commit()
        db.refresh(existing)
        logger.info("newsletter.reactivated", email=email)
        existing.email = email
        return existing

    entry = Newsletter(email=encrypted_email)
    db.add(entry)
    db.commit()
    db.refresh(entry)
    entry.email = decrypt(entry.email) or email
    return entry
