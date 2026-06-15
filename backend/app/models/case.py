from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import DateTime

from datetime import datetime

from app.database.base import Base

class Case(Base):

    __tablename__ = "cases"

    id = Column(Integer, primary_key=True, index=True)

    case_id = Column(String(50), unique=True)

    case_title = Column(String(255))

    case_type = Column(String(100))

    description = Column(Text)

    investigator = Column(String(255))

    status = Column(String(50))

    priority = Column(String(50))

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )