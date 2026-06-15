# from app.database.database import engine
# from app.database.base import Base

# from app.models.user import User
# from app.models.case import Case
# from app.models.evidence import Evidence
# from app.models.custody import Custody
# from app.models.finding import Finding
# from app import create_app
# from app.database import db

# app = create_app()

# with app.app_context():
#     db.create_all()
# Base.metadata.create_all(bind=engine)

# print("Tables Created")

from app.database.database import engine
from app.database.base import Base

from app.models.user import User
from app.models.case import Case
from app.models.evidence import Evidence
from app.models.custody import Custody
from app.models.finding import Finding
from app.models.audit_log import AuditLog

Base.metadata.create_all(bind=engine)

print("Tables Created")