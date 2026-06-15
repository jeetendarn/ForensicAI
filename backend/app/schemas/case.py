from pydantic import BaseModel

class CaseCreate(BaseModel):

    case_title: str

    case_type: str

    description: str

    investigator: str

    priority: str

    status: str