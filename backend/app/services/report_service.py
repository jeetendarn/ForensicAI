from pathlib import Path
from html import escape
from datetime import datetime

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Image,
    Table,
    TableStyle
)
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.units import mm

from app.services.audit_service import log_action


BASE_DIR = Path(__file__).resolve().parents[2]
ASSET_DIR = BASE_DIR / "app" / "assets"


def _first_existing_path(*paths):
    for path in paths:
        if path.exists():
            return path
    return None


def _safe_text(value):
    return escape(str(value)).replace("\n", "<br/>")


def generate_report(
    case_id,
    evidence_name,
    sha256,
    findings,
    output_file
):
    print("NEW REPORT SERVICE EXECUTED")

    output_path = Path(output_file)
    if not output_path.is_absolute():
        output_path = BASE_DIR / output_path

    output_path.parent.mkdir(parents=True, exist_ok=True)

    doc = SimpleDocTemplate(
        str(output_path),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=18 * mm,
        bottomMargin=18 * mm
    )

    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        "GovTitle",
        parent=styles["Title"],
        alignment=1,
        textColor=colors.HexColor("#0b4d8c"),
        spaceAfter=4
    )
    subtitle_style = ParagraphStyle(
        "GovSubTitle",
        parent=styles["Heading2"],
        alignment=1,
        textColor=colors.HexColor("#333333"),
        spaceAfter=2
    )
    section_style = ParagraphStyle(
        "SectionTitle",
        parent=styles["Heading2"],
        textColor=colors.white,
        backColor=colors.HexColor("#0b4d8c"),
        spaceBefore=8,
        spaceAfter=6,
        leftIndent=4
    )
    body_style = ParagraphStyle(
        "Body",
        parent=styles["BodyText"],
        leading=14,
        spaceAfter=4
    )
    footer_style = ParagraphStyle(
        "Footer",
        parent=styles["Normal"],
        alignment=1,
        textColor=colors.grey,
        fontSize=8
    )

    story = []

    logo_path = _first_existing_path(
        ASSET_DIR / "karnatka_logo.png",
        ASSET_DIR / "karnataka_logo.png"
    )

    if logo_path:
        story.append(Image(str(logo_path), width=28 * mm, height=28 * mm))
        story.append(Spacer(1, 4))

    story.append(Paragraph("Government of Karnataka", title_style))
    story.append(Paragraph("Cyber Forensics Division", subtitle_style))
    story.append(Spacer(1, 4))
    story.append(
        Paragraph(
            "DIGITAL EVIDENCE EXAMINATION REPORT",
            title_style
        )
    )
    story.append(Spacer(1, 10))

    now = datetime.now().strftime("%d-%b-%Y %H:%M:%S")

    meta_table = Table(
        [
            ["Report Date", now],
            ["Case ID", case_id],
            ["Evidence Name", evidence_name],
            ["SHA256", sha256]
        ],
        colWidths=[40 * mm, 130 * mm]
    )
    meta_table.setStyle(
        TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#dbeafe")),
            ("TEXTCOLOR", (0, 0), (-1, -1), colors.black),
            ("FONTNAME", (0, 0), (-1, -1), "Helvetica"),
            ("FONTSIZE", (0, 0), (-1, -1), 9),
            ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#94a3b8")),
            ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#e2e8f0")),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 6),
            ("RIGHTPADDING", (0, 0), (-1, -1), 6),
            ("TOPPADDING", (0, 0), (-1, -1), 6),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ])
    )
    story.append(meta_table)
    story.append(Spacer(1, 10))

    story.append(Paragraph("FORENSIC FINDINGS", section_style))
    story.append(Paragraph(_safe_text(findings), body_style))
    story.append(Spacer(1, 8))

    story.append(Paragraph("RECOMMENDATIONS", section_style))
    for item in [
        "Preserve original evidence.",
        "Maintain chain of custody.",
        "Verify metadata integrity.",
        "Perform further forensic review if required."
    ]:
        story.append(Paragraph(f"• {item}", body_style))

    story.append(Spacer(1, 14))
    story.append(Paragraph("CERTIFICATION", section_style))
    story.append(
        Paragraph(
            "This report was generated using accepted digital forensics procedures.",
            body_style
        )
    )
    story.append(Spacer(1, 20))
    story.append(Paragraph("OFFICIAL USE ONLY", title_style))
    story.append(Spacer(1, 6))
    story.append(Paragraph("Generated using PAS3 Cyber Labs ForensicAI Platform", footer_style))

    doc.build(story)

    try:
        log_action("SYSTEM", "Report Generated", "Reports")
    except Exception as exc:
        print("AUDIT LOG SKIPPED:", exc)

    return str(output_path)