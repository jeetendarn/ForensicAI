from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.models.case import Case

from app.schemas.case import CaseCreate

from app.services.case_id_service import (
    generate_case_id
)

router = APIRouter(
    prefix="/cases",
    tags=["Cases"]
)

@router.post("/create")
def create_case(
    case: CaseCreate,
    db: Session = Depends(get_db)
):

    total_cases = db.query(Case).count()

    generated_case_id = generate_case_id(
        total_cases
    )

    new_case = Case(

        case_id=generated_case_id,

        case_title=case.case_title,

        case_type=case.case_type,

        description=case.description,

        investigator=case.investigator,

        priority=case.priority,

        status=case.status

    )

    db.add(new_case)

    db.commit()

    db.refresh(new_case)

    return {

        "message": "Case Created",

        "case_id": generated_case_id

    }


@router.get("/")
def get_cases(
    db: Session = Depends(get_db)
):

    cases = db.query(Case).all()

    result = []

    for case in cases:

        result.append({

            "id": case.id,

            "case_id": case.case_id,

            "case_title": case.case_title,

            "case_type": case.case_type,

            "investigator": case.investigator,

            "priority": case.priority,

            "status": case.status

        })

    return result