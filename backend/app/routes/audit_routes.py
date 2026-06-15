from flask import Blueprint,jsonify
from app.models.audit_log import AuditLog

audit_bp = Blueprint(
    "audit",
    __name__
)

@audit_bp.route(
    "/auditlogs",
    methods=["GET"]
)

def get_logs():

    logs = AuditLog.query.order_by(
        AuditLog.timestamp.desc()
    ).all()

    result = []

    for log in logs:

        result.append({

            "user_id": log.user_id,

            "action": log.action,

            "module": log.module,

            "timestamp":
            log.timestamp.strftime(
                "%Y-%m-%d %H:%M:%S"
            )

        })

    return jsonify(result)