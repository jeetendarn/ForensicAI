from pathlib import Path

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)

BASE_DIR = Path(__file__).resolve().parents[2]
REPORT_DIR = BASE_DIR / "reports"


@router.get("/")
def get_reports():
    reports = []

    if REPORT_DIR.exists():
        for file in REPORT_DIR.iterdir():
            if file.is_file() and file.suffix.lower() == ".pdf":
                reports.append({"report_name": file.name})

    return reports


@router.get("/download/{filename}")
def download_report(filename: str):
    path = REPORT_DIR / filename

    if not path.exists():
        raise HTTPException(status_code=404, detail="Report not found")

    return FileResponse(
        str(path),
        media_type="application/pdf",
        filename=filename
    )