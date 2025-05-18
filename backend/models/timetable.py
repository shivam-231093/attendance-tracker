from firebase import db

class Timetable:
    collection = db.collection("timetables")  # Firestore collection for timetables

    @staticmethod
    def set_timetable(branch, year, timetable):
        """Store a timetable for a given branch and year."""
        doc_id = f"{branch}_{year}"
        Timetable.collection.document(doc_id).set({"timetable": timetable})
        return {"message": "Timetable stored successfully"}

    @staticmethod
    def get_timetable(branch, year):
        """Retrieve a timetable for a given branch and year."""
        doc_id = f"{branch}_{year}"
        doc = Timetable.collection.document(doc_id).get()

        if doc.exists:
            return doc.to_dict().get("timetable", {})
        return {"error": "Timetable not found"}

    @staticmethod
    def delete_timetable(branch, year):
        """Delete a timetable for a given branch and year."""
        doc_id = f"{branch}_{year}"
        doc_ref = Timetable.collection.document(doc_id)

        if doc_ref.get().exists:
            doc_ref.delete()
            return {"message": "Timetable deleted successfully"}
        return {"error": "Timetable not found"}

cse = {
        "Monday": ["Civil", "CP", "M2","Physics","Lab"],
        "Tuesday": ["Mech", "CP", "Lab","M2"],
        "Wednesday": ["Lab", "Physics","Mech"],
        "Thursday":["M2","Physics","Civil","CP"],
        "Friday":["Physics","CP","Mech","Civil","M2"],
        "Saturday":["Lab"]
        }