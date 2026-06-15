from pydantic import BaseModel

class FindingCreate(BaseModel):

    evidence_id: int

    finding_type: str

    risk_level: str

    findings_text: str