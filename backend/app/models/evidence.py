from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import DateTime

from datetime import datetime

from app.database.base import Base

class Evidence(Base):

    __tablename__ = "evidence"

    id = Column(Integer, primary_key=True, index=True)

    case_id = Column(String(100))

    evidence_name = Column(String(255))

    file_path = Column(String(500))

    sha256_hash = Column(String(255))

    evidence_type = Column(String(100))

    uploaded_at = Column(
        DateTime,
        default=datetime.utcnow
    )