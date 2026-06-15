from fastapi import APIRouter

router = APIRouter(
    prefix="/test",
    tags=["Test"]
)

print("Router OK")