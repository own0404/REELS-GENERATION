"""Migrate existing plaintext PII fields to encrypted values."""
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "backend"))

from database import SessionLocal
from models import Contact, ProductInquiry, Newsletter
from utils.encryption import encrypt


def migrate():
    db = SessionLocal()
    try:
        contacts = db.query(Contact).all()
        for c in contacts:
            if c.phone and not c.phone.startswith("gAAAAA"):
                c.phone = encrypt(c.phone)
            if c.email and not c.email.startswith("gAAAAA"):
                c.email = encrypt(c.email)

        inquiries = db.query(ProductInquiry).all()
        for i in inquiries:
            if i.phone and not i.phone.startswith("gAAAAA"):
                i.phone = encrypt(i.phone)

        newsletters = db.query(Newsletter).all()
        for n in newsletters:
            if n.email and not n.email.startswith("gAAAAA"):
                n.email = encrypt(n.email)

        db.commit()
        print(
            f"Migrated {len(contacts)} contacts, "
            f"{len(inquiries)} inquiries, "
            f"{len(newsletters)} newsletters"
        )
    finally:
        db.close()


if __name__ == "__main__":
    migrate()
