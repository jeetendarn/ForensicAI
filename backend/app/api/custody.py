from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.models.custody import Custody
from app.schemas.custody import CustodyCreate

router = APIRouter(
    prefix="/custody",
    tags=["Chain Of Custody"]
)

@router.post("/add")
def add_custody(
    custody: CustodyCreate,
    db: Session = Depends(get_db)
):

    record = Custody(
        evidence_id=custody.evidence_id,
        officer_name=custody.officer_name,
        action_taken=custody.action_taken,
        location=custody.location,
        remarks=custody.remarks
    )

    db.add(record)
    db.commit()

    return {
        "message": "Custody Added"
    }

@router.get("/{evidence_id}")
def get_custody(
    evidence_id: int,
    db: Session = Depends(get_db)
):

    return db.query(
        Custody
    ).filter(
        Custody.evidence_id == evidence_id
    ).all()