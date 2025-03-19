from middlewares.auth_middleware import token_required
from flask import Blueprint, request, jsonify
from models.attendence import Attendance

attendance_bp = Blueprint("attendance", __name__)

@attendance_bp.route("/mark", methods=["POST"])
@token_required
def mark_attendance():
    """Mark attendance for a user."""
    uid = request.user.get("uid")  # Extract UID from the token
    data = request.get_json()

    if not data:
        return jsonify({"error": "Missing data"}), 400

    response = Attendance.mark_attendance(uid, data)
    if "error" in response:
        return jsonify(response), 400

    return jsonify(response), 200

@attendance_bp.route("/summary", methods=["GET"])
@token_required
def get_attendance_summary():
    """Fetch attendance summary."""
    uid = request.user.get("uid")  # Extract UID from the token

    response = Attendance.get_attendance_summary(uid)
    if "error" in response:
        return jsonify(response), 404

    return jsonify(response), 200
