from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from app.database.base import Base

class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        String(50),
        unique=True
    )

    name = Column(String)

    email = Column(
        String,
        unique=True
    )

    password = Column(String(255))

    role = Column(String)