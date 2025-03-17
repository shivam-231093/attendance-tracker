from firebase import db
import datetime

class User:
    collection = db.collection("users")  # Firestore collection

    @staticmethod
    def get_user_by_id(uid):
        """Fetch user document from Firestore"""
        user_ref = User.collection.document(uid)
        user_doc = user_ref.get()
        return user_doc.to_dict() if user_doc.exists else None

    @staticmethod
    def create_user(uid, email, name, roll_number, branch, year, semester, subjects, attendance_period):
        """Create a new user documento_dictt"""
        user_data = {
            "uid": uid,
            "email": email,
            "name": name,
            "roll_number": roll_number,
            "branch": branch,
            "year": year,
            "semester": semester,
            "subjects": subjects,  # List of subjects
            "attendance_period": attendance_period,
            "created_at": datetime.datetime.utcnow()
        }
        User.collection.document(uid).set(user_data)
        return user_data

    @staticmethod
    def edit_user(uid, updated_data):
        """
        Update existing user details.
        updated_data is a dictionary containing the fields to be updated.
        """
        user_ref = User.collection.document(uid)
        doc = user_ref.get()
        if not doc.exists:
            return {"error": "User not found"}

        # Update the fields
        updated_data["updated_at"] = datetime.datetime.utcnow()
        user_ref.update(updated_data)
        return {"message": "User updated successfully", "uid": uid}

    @staticmethod
    def delete_user(uid):
        """
        Delete a user document.
        """
        user_ref = User.collection.document(uid)
        doc = user_ref.get()
        if not doc.exists:
            return {"error": "User not found"}

        user_ref.delete()
        return {"message": "User deleted successfully", "uid": uid}
