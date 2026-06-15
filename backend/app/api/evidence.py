from pathlib import Path
import os

from fastapi import APIRouter, UploadFile, File, Form, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.models.evidence import Evidence
from app.models.finding import Finding
from app.services.hash_service import calculate_sha256
from app.services.report_service import generate_report
from app.services.metadata_service import extract_metadata
from app.agents.evidence_agent import analyze_evidence
from app.services.encryption_service import encrypt_file
from app.services.audit_service import log_action


BASE_DIR = Path(__file__).resolve().parents[2]
UPLOAD_DIR = BASE_DIR / "uploads"
REPORT_DIR = BASE_DIR / "reports"

UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
REPORT_DIR.mkdir(parents=True, exist_ok=True)

router = APIRouter(
    prefix="/evidence",
    tags=["Evidence"]
)


@router.post("/upload")
async def upload_evidence(
    case_id: str = Form(...),
    evidence_type: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    file_path = UPLOAD_DIR / file.filename

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    sha256 = calculate_sha256(str(file_path))
    metadata = extract_metadata(str(file_path))
    analysis = analyze_evidence(metadata)

    encrypted_file = encrypt_file(str(file_path))
    os.remove(file_path)

    evidence = Evidence(
        case_id=case_id,
        evidence_name=file.filename,
        file_path=str(encrypted_file),
        sha256_hash=sha256,
        evidence_type=evidence_type
    )

    db.add(evidence)
    db.commit()
    db.refresh(evidence)

    finding = Finding(
        evidence_id=evidence.id,
        finding_type="Auto Analysis",
        risk_level="Medium",
        findings_text=analysis
    )
    db.add(finding)
    db.commit()

    try:
        log_action("SYSTEM", "Evidence Uploaded", "Evidence")
    except Exception as exc:
        print("AUDIT LOG SKIPPED:", exc)

    report_file = REPORT_DIR / f"{evidence.id}.pdf"

    try:
        generate_report(
            case_id=case_id,
            evidence_name=file.filename,
            sha256=sha256,
            findings=analysis,
            output_file=str(report_file)
        )
        print("REPORT GENERATED:", report_file)
    except Exception as exc:
        print("REPORT ERROR:", str(exc))

    return {
        "message": "Evidence Uploaded",
        "sha256": sha256,
        "metadata": metadata,
        "analysis": analysis,
        "report": f"reports/{evidence.id}.pdf"
    }