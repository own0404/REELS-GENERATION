import structlog
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Contact, ProductInquiry, Newsletter, AdminUser
from auth import get_current_admin
from utils.encryption import decrypt

router = APIRouter(prefix="/api/admin", tags=["admin"])
logger = structlog.get_logger()


@router.get("/contacts")
def list_contacts(db: Session = Depends(get_db), admin: AdminUser = Depends(get_current_admin)):
    contacts = db.query(Contact).order_by(Contact.created_at.desc()).all()
    result = []
    for c in contacts:
        result.append({
            "id": c.id,
            "name": c.name,
            "phone": decrypt(c.phone) or c.phone,
            "email": decrypt(c.email) or c.email,
            "city": c.city,
            "product_interest": c.product_interest,
            "message": c.message,
            "created_at": c.created_at.isoformat() if c.created_at else None,
        })
    return result


@router.get("/inquiries")
def list_inquiries(db: Session = Depends(get_db), admin: AdminUser = Depends(get_current_admin)):
    inquiries = db.query(ProductInquiry).order_by(ProductInquiry.created_at.desc()).all()
    result = []
    for i in inquiries:
        result.append({
            "id": i.id,
            "name": i.name,
            "phone": decrypt(i.phone) or i.phone,
            "product_model": i.product_model,
            "message": i.message,
            "created_at": i.created_at.isoformat() if i.created_at else None,
        })
    return result


@router.get("/newsletters")
def list_newsletters(db: Session = Depends(get_db), admin: AdminUser = Depends(get_current_admin)):
    newsletters = db.query(Newsletter).order_by(Newsletter.created_at.desc()).all()
    result = []
    for n in newsletters:
        result.append({
            "id": n.id,
            "email": decrypt(n.email) or n.email,
            "is_active": n.is_active,
            "created_at": n.created_at.isoformat() if n.created_at else None,
        })
    return result


@router.get("/stats")
def stats(db: Session = Depends(get_db), admin: AdminUser = Depends(get_current_admin)):
    return {
        "contacts": db.query(Contact).count(),
        "inquiries": db.query(ProductInquiry).count(),
        "subscribers": db.query(Newsletter).count(),
    }
