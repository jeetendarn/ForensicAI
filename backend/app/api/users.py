from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.models.user import User

from app.schemas.user import UserCreate

from app.core.security import hash_password

from app.services.user_id_service import (
    generate_user_id
)
router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

@router.get("/")
def get_users(
    db: Session = Depends(get_db)
):

    users = db.query(User).all()

    result = []

    for user in users:

        result.append({

            "id": user.id,

            "user_id": user.user_id,

            "name": user.name,

            "email": user.email,

            "role": user.role

        })

    return result

@router.post("/create")
def create_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:

        return {
            "message": "Email already exists"
        }

    count = db.query(User).filter(
        User.role == user.role
    ).count()

    generated_user_id = generate_user_id(
        user.role,
        count
    )

    new_user = User(
        user_id=generated_user_id,
        name=user.name,
        email=user.email,
        password=hash_password(
            user.password
        ),
        role=user.role
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {

        "message": "User Created",

        "user_id": generated_user_id,

        "role": user.role

    }

@router.delete("/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:

        return {
            "message": "User Not Found"
        }

    db.delete(user)

    db.commit()

    return {
        "message": "User Deleted"
    }