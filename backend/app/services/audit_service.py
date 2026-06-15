from app.database.database import SessionLocal
from app.models.audit_log import AuditLog


def log_action(actor, action, module):
    db = SessionLocal()
    try:
        log = AuditLog(
            actor=actor,
            action=action,
            module=module
        )
        db.add(log)
        db.commit()
    except Exception as exc:
        db.rollback()
        print("AUDIT LOG SKIPPED:", exc)
    finally:
        db.close()