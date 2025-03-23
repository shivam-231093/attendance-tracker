from firebase import db
from models.timetable import Timetable
import datetime

class Planner:
    collection = db.collection("planners")
    # collection = db.collection("timetables")

    @staticmethod
    def generate_planner(uid):
        """Fetch user details and generate a personalized attendance planner."""
        # 🔹 Fetch user data from Firestore
        user_ref = db.collection("users").document(uid)
        user_doc = user_ref.get()

        if not user_doc.exists:
            return {"error": "User not found"}

        user_data = user_doc.to_dict()

        # Extract details
        branch = user_data.get("branch")
        year = user_data.get("year")
        semester = user_data.get("semester")
        subjects = user_data.get("subjects", [])
        attendance_period = user_data.get("attendance_period")
        holidays = user_data.get("holidays", [])

        if not (branch and year and semester and subjects and attendance_period):
            return {"error": "User profile incomplete"}

        start_date = datetime.datetime.strptime(attendance_period["start"], "%Y-%m-%d")
        end_date = datetime.datetime.strptime(attendance_period["end"], "%Y-%m-%d")

        # 🔹 Fetch College Timetable from Firestore
        college_timetable = Timetable.get_timetable(branch, year)
        if "error" in college_timetable:
            return {"error": "Timetable not found"}



        # Fetch working days
        working_days = Planner.get_working_days(start_date, end_date, holidays)

        # Assign subjects to working days
        schedule = Planner.assign_subjects_to_days(working_days, subjects,college_timetable)

        # Save planner to Firestore
        planner_data = {
            "uid": uid,
            "branch": branch,
            "year": year,
            "semester": semester,
            "subjects": subjects,
            "schedule": schedule,
            "holidays": holidays,
            "created_at": datetime.datetime.utcnow()
        }
        Planner.collection.document(uid).set(planner_data)
        return planner_data

    @staticmethod
    def get_working_days(start_date, end_date,holidays):
        holidays = [
    "2025-01-26",  # Republic Day
    "2025-02-26",  # Maha Shivaratri
    "2025-03-14",  # Holi
    "2025-03-31",  # Id-ul-Fitr
    "2025-04-10",  # Mahavir Jayanti
    "2025-04-18",  # Good Friday
    "2025-05-12",  # Buddha Purnima
    "2025-06-07",  # Id-ul-Zuha (Bakrid)
    "2025-07-06",  # Muharram
    "2025-08-15",  # Independence Day
    "2025-08-16",  # Janmashtami
    "2025-10-02",  # Mahatma Gandhi Jayanti
    "2025-10-02",  # Dussehra
    "2025-10-21",  # Diwali (Deepawali)
    "2025-11-05",  # Guru Nanak Jayanti
    "2025-12-25"   # Christmas Day
]
        """Return a list of working days (excluding weekends & holidays)."""
        working_days = []
        current_date = start_date
        while current_date <= end_date:
            if current_date.weekday() < 5 and current_date.strftime("%Y-%m-%d") not in holidays:
                working_days.append(current_date.strftime("%Y-%m-%d"))
            current_date += datetime.timedelta(days=1)
        return working_days

    @staticmethod
    def assign_subjects_to_days(working_days, subjects, college_timetable):
        """
        Assigns only user-selected subjects to their respective days.
        
        Parameters:
        - working_days: List of dates that are working.
        - subjects: List of subjects the user has chosen.
        - college_timetable: Dictionary mapping days to predefined subjects.

        Returns:
        - A dictionary where keys are working days and values are subjects the user has to attend.
        """
        schedule = {}

        for day in working_days:
            # Get the weekday name (Monday, Tuesday, etc.)
            weekday_name = datetime.datetime.strptime(day, "%Y-%m-%d").strftime("%A")

            # Get the subjects from the college timetable for this weekday
            available_subjects = college_timetable.get(weekday_name, [])

            # Filter subjects that the user has selected
            user_classes = [subject for subject in available_subjects if subject in subjects]

            # Only store if the user has a class that day
            if user_classes:
                schedule[day] = user_classes

        return schedule


    @staticmethod
    def get_planner(uid):
        """Fetch user's planner from Firestore."""
        planner_ref = Planner.collection.document(uid)
        doc = planner_ref.get()
        return doc.to_dict() if doc.exists else None



