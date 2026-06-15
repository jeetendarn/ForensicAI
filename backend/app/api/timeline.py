from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.models.evidence import Evidence
from app.models.custody import Custody
from app.models.finding import Finding
from app.services.timeline_service import (
    generate_timeline_report
)
router = APIRouter(
    prefix="/timeline",
    tags=["Timeline"]
)

@router.get("/{evidence_id}")
def generate_timeline(
    evidence_id: int,
    db: Session = Depends(get_db)
):

    timeline = []

    evidence = db.query(
        Evidence
    ).filter(
        Evidence.id == evidence_id
    ).first()

    if evidence:

        timeline.append({
    "event": "Evidence Uploaded",
    "time": str(evidence.uploaded_at)
})

    custody_records = db.query(
        Custody
    ).filter(
        Custody.evidence_id == evidence_id
    ).all()

    for record in custody_records:

        timeline.append({
            "event": record.action_taken,
            "time": str(record.timestamp)
        })

    findings = db.query(
        Finding
    ).filter(
        Finding.evidence_id == evidence_id
    ).all()

    for finding in findings:

        timeline.append({
            "event": "AI Analysis Completed",
            "time": str(finding.created_at)
        })

    timeline = sorted(
    timeline,
    key=lambda x: x["time"]
)

    timeline_report = generate_timeline_report(
    timeline
)

    return {
    "timeline": timeline,
    "summary": timeline_report
}