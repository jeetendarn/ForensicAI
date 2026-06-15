from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import DateTime

from datetime import datetime

from app.database.base import Base

class Finding(Base):

    __tablename__ = "findings"

    id = Column(Integer, primary_key=True)

    evidence_id = Column(Integer)

    finding_type = Column(String(100))

    risk_level = Column(String(50))

    findings_text = Column(Text)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )