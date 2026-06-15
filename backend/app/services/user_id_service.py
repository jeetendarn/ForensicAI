from app.models.user import User

def generate_user_id(
    role: str,
    count: int
):

    year = "2026"

    if role.lower() == "student":
        prefix = "STU"

    elif role.lower() == "investigator":
        prefix = "INV"

    elif role.lower() == "admin":
        prefix = "ADM"

    else:
        prefix = "USR"

    sequence = str(count + 1).zfill(3)

    return f"{prefix}-{year}-{sequence}"