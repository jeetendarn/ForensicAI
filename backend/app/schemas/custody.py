from pydantic import BaseModel

class CustodyCreate(BaseModel):
    evidence_id: int
    officer_name: str
    action_taken: str
    location: str
    remarks: str