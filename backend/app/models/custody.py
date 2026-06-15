from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import DateTime

from datetime import datetime

from app.database.base import Base

class Custody(Base):

    __tablename__ = "custody"

    id = Column(Integer, primary_key=True)

    evidence_id = Column(Integer)

    officer_name = Column(String(255))

    action_taken = Column(String(255))

    location = Column(String(255))

    remarks = Column(String(500))

    timestamp = Column(
        DateTime,
        default=datetime.utcnow
    )