from flask import Blueprint, request, jsonify
from models.timetable import Timetable  # Import Timetable model

timetable_bp = Blueprint("timetable", __name__)

# Route to store a timetable
@timetable_bp.route("/set", methods=["POST"])
def set_timetable():
    """
    API to store a timetable for a given branch and year.
    Expects JSON:
    {
        "branch": "CSE",
        "year": "1",
        "timetable": { "Monday": ["Maths", "Physics"], ... }
    }
    """
    data = request.json
    branch = data.get("branch")
    year = data.get("year")
    timetable = data.get("timetable")

    if not (branch and year and timetable):
        return jsonify({"error": "Missing required fields"}), 400

    result = Timetable.set_timetable(branch, year, timetable)
    return jsonify(result), 200


# Route to retrieve a timetable
@timetable_bp.route("/get", methods=["GET"])
def get_timetable():
    """
    API to retrieve a timetable for a given branch and year.
    Expects Query Parameters: ?branch=CSE&year=1st Year
    """
    branch = request.args.get("branch")
    year = request.args.get("year")

    if not (branch and year):
        return jsonify({"error": "Missing branch or year"}), 400

    timetable = Timetable.get_timetable(branch, year)
    return jsonify(timetable), 200 if "error" not in timetable else 404


# Route to delete a timetable
@timetable_bp.route("/delete", methods=["DELETE"])
def delete_timetable():
    """
    API to delete a timetable for a given branch and year.
    Expects Query Parameters: ?branch=CSE&year=1st Year
    """
    branch = request.args.get("branch")
    year = request.args.get("year")

    if not (branch and year):
        return jsonify({"error": "Missing branch or year"}), 400

    result = Timetable.delete_timetable(branch, year)
    return jsonify(result), 200 if "error" not in result else 404
