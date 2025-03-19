import firebase_admin
from firebase_admin import credentials,firestore,auth

cred = credentials.Certificate("./keys.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

def verify_firebase_token(id_token):
    """
    Verify the Firebase authentication token.
    """
    try:
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token  # Contains user info
    except Exception as e:
        print("Invalid Token:", e)
        return None
