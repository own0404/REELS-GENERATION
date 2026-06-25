from cryptography.fernet import Fernet, InvalidToken
from config import settings


def _get_fernet() -> Fernet:
    key = settings.field_encryption_key
    if not key:
        raise ValueError("FIELD_ENCRYPTION_KEY is not set")
    return Fernet(key.encode() if isinstance(key, str) else key)


def encrypt(plain: str | None) -> str | None:
    if not plain:
        return plain
    return _get_fernet().encrypt(plain.encode()).decode()


def decrypt(cipher: str | None) -> str | None:
    if not cipher:
        return cipher
    try:
        return _get_fernet().decrypt(cipher.encode()).decode()
    except InvalidToken:
        return cipher
