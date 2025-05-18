from firebase import db
import datetime

class Attendance:
    collection = db.collection("attendance")

    @staticmethod
    def mark_attendance(uid, attendance_data):
        """
        Mark attendance for a user.
        attendance_data should be a dictionary like:
        {
            "date": "YYYY-MM-DD",
            "attendance": {
                "Math": "Present",
                "Physics": "Absent",
                "CS": "No Class"
            }
        }
        """
        date = attendance_data.get("date")
        subject_attendance = attendance_data.get("attendance")

        if not date or not subject_attendance:
            return {"error": "Missing required fields"}

        # Reference to user's attendance for the given date
        attendance_ref = Attendance.collection.document(uid).collection("dates").document(date)
        attendance_ref.set({
            "date": date,
            "uid": uid,
            "subject_attendance": subject_attendance,
            "updated_at": datetime.datetime.utcnow()
        }, merge=True)

        # Recalculate attendance insights
        Attendance.calculate_attendance(uid)

        return {"message": "Attendance marked successfully", "data": subject_attendance}

    @staticmethod
    def get_attendance(uid, date):
        """Fetch attendance records for a given date."""
        attendance_ref = Attendance.collection.document(uid).collection("dates").document(date)
        attendance_doc = attendance_ref.get()

        if attendance_doc.exists:
            return attendance_doc.to_dict()
        return {"error": "No attendance record found"}

    @staticmethod
    def calculate_attendance(uid):
        """Calculates attendance percentage and deficiency per subject."""
        attendance_ref = Attendance.collection.document(uid).collection("dates").stream()

        subject_wise = {}

        for doc in attendance_ref:
            data = doc.to_dict()
            subject_attendance = data.get("subject_attendance", {})

            for subject, status in subject_attendance.items():
                if subject not in subject_wise:
                    subject_wise[subject] = {"present": 0, "total": 0}

                subject_wise[subject]["total"] += 1


                if status == "Present":
                    subject_wise[subject]["present"] += 1

        # Calculate subject-wise percentage
        for subject, values in subject_wise.items():
            values["percentage"] = round((values["present"] / values["total"]) * 100, 2) if values["total"] else 0


        # Calculate deficiency (how many more classes are needed to reach 75%)
        for subject, values in subject_wise.items():
            required_classes = max(0, int(0.75 * values["total"]) - values["present"])
            if required_classes > 0:
                subject_wise[subject]["deficiency"] = required_classes

        # Store in Firestore
        summary_ref = Attendance.collection.document(uid).collection("summary").document("attendance_report")
        summary_ref.set({
            "subject_wise": subject_wise,
            "updated_at": datetime.datetime.utcnow()
        }, merge=True)

        return {
            "subject_wise": subject_wise,
        }

    @staticmethod
    def get_attendance_summary(uid):
        """Fetch attendance summary."""
        summary_ref = Attendance.collection.document(uid).collection("summary").document("attendance_report")
        summary_doc = summary_ref.get()

        if summary_doc.exists:
            return summary_doc.to_dict()
        return {"error": "No summary data found"}
