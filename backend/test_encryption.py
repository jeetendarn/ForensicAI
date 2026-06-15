from app.services.encryption_service import (
    decrypt_file
)

data = decrypt_file(
    "backend/test.txt.enc"
)

print(
    data.decode()
)