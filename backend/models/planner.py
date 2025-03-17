from firebase import db
import datetime

class Planner:
    collection = db.collection("planners")

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

        start_date = datetime.datetime.strptime(attendance_period["start"], "%b %Y")
        end_date = datetime.datetime.strptime(attendance_period["end"], "%b %Y")

        # Fetch working days
        working_days = Planner.get_working_days(start_date, end_date, holidays)

        # Assign subjects to working days
        schedule = Planner.assign_subjects_to_days(working_days, subjects)

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
    def get_working_days(start_date, end_date, holidays):
        """Return a list of working days (excluding weekends & holidays)."""
        working_days = []
        current_date = start_date
        while current_date <= end_date:
            if current_date.weekday() < 5 and current_date.strftime("%Y-%m-%d") not in holidays:
                working_days.append(current_date.strftime("%Y-%m-%d"))
            current_date += datetime.timedelta(days=1)
        return working_days

    @staticmethod
    def assign_subjects_to_days(working_days, subjects):
        """Distribute subjects evenly across working days."""
        schedule = {}
        num_subjects = len(subjects)
        for i, day in enumerate(working_days):
            schedule[day] = subjects[i % num_subjects]  # Rotate subjects
        return schedule

    @staticmethod
    def get_planner(uid):
        """Fetch user's planner from Firestore."""
        planner_ref = Planner.collection.document(uid)
        doc = planner_ref.get()
        return doc.to_dict() if doc.exists else None



