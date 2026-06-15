from fastapi import APIRouter
from sqlalchemy.orm import Session
from fastapi import Depends

from app.database.dependencies import get_db
from app.models.evidence import Evidence

router = APIRouter(
    prefix="/admin/evidence",
    tags=["Admin Evidence"]
)

@router.get("/")
def get_all_evidence(
    db: Session = Depends(get_db)
):

    evidence = db.query(
        Evidence
    ).all()

    return evidence