from middlewares.auth_middleware import token_required
from flask import Blueprint, request, jsonify
from models.planner import Planner

planner_bp = Blueprint("planner", __name__)

@planner_bp.route("/generate-planner", methods=["POST"])
@token_required
def generate_planner():
    """Generate a planner using user's saved profile data."""
    uid = request.user.get("uid")  # Extract user ID from token

    planner_data = Planner.generate_planner(uid)
    if "error" in planner_data:
        return jsonify(planner_data), 400

    return jsonify({"message": "Planner created successfully", "planner": planner_data})


@planner_bp.route("/get-planner", methods=["GET"])
@token_required
def get_planner():
    """
    API to fetch the user's attendance planner.
    """
    uid = request.user.get("uid")  # Extract user ID from token
    planner_data = Planner.get_planner(uid)

    if not planner_data:
        return jsonify({"error": "Planner not found"}), 404

    return jsonify(planner_data), 200
