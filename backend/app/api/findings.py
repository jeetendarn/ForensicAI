from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.models.finding import Finding

from app.schemas.finding import FindingCreate

router = APIRouter(
    prefix="/findings",
    tags=["Findings"]
)

@router.post("/add")
def add_finding(
    finding: FindingCreate,
    db: Session = Depends(get_db)
):

    record = Finding(
        evidence_id=finding.evidence_id,
        finding_type=finding.finding_type,
        risk_level=finding.risk_level,
        findings_text=finding.findings_text
    )

    db.add(record)

    db.commit()

    db.refresh(record)

    return {
        "message": "Finding Stored"
    }

@router.get("/")
def get_findings(
    db: Session = Depends(get_db)
):

    return db.query(
        Finding
    ).all()

@router.get("/{evidence_id}")
def get_findings_by_evidence(
    evidence_id: int,
    db: Session = Depends(get_db)
):
    return db.query(Finding).filter(
        Finding.evidence_id == evidence_id
    ).all()