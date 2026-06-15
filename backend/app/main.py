from fastapi import FastAPI

from app.api.auth import router as auth_router
from app.api.cases import router as case_router
from app.api.evidence import router as evidence_router
from app.api.findings import router as findings_router
from app.api.reports import router as reports_router

from app.api.custody import router as custody_router
from app.api.timeline import router as timeline_router
from fastapi.middleware.cors import CORSMiddleware
from app.api.users import router as users_router
from app.api.evidence_admin import (
    router as admin_evidence_router
)
# from app.routes.audit_routes import audit_bp

# Add this only after findings.py is created
# from app.api.findings import router as findings_router

app = FastAPI(
    title="ForensicAI",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(case_router)
app.include_router(evidence_router)
app.include_router(findings_router)
app.include_router(reports_router)
app.include_router(custody_router)
app.include_router(timeline_router)
app.include_router(
    admin_evidence_router
)
# app.register_blueprint(audit_bp)


@app.get("/")
def root():
    return {
        "product": "ForensicAI",
        "version": "1.0.0",
        "status": "running"
    }

