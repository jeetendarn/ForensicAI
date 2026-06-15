from app.services.user_id_service import (
    generate_user_id
)

from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.models.user import User

from app.schemas.user import (
    UserCreate,
    UserLogin
)

from app.database.dependencies import get_db

from app.core.security import (
    hash_password,
    verify_password
)

from app.core.jwt_handler import (
    create_access_token
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post("/register")
def register_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    existing_count = db.query(User).filter(
        User.role == user.role
    ).count()

    generated_user_id = generate_user_id(
        user.role,
        existing_count
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
        "message": "Account Created",
        "user_id": generated_user_id,
        "role": user.role
    }

@router.post("/login")
def login_user(
    user: UserLogin,
    db: Session = Depends(get_db)
):

    db_user = db.query(User).filter(
    User.user_id == user.user_id
).first()
    
    if not db_user:

        raise HTTPException(
            status_code=401,
            detail="Invalid User ID"
        )

    if db_user.role != user.role:

        raise HTTPException(
            status_code=401,
            detail="Invalid Role"
        )
    
    if not verify_password(
    user.password,
    db_user.password
):
        raise HTTPException(
        status_code=401,
        detail="Invalid Credentials"
    )

    token = create_access_token(
            {
                "user_id": db_user.user_id,
                "email": db_user.email,
                "role": db_user.role
            }
        )

    return {
        "access_token": token,
        "token_type": "bearer"
    }