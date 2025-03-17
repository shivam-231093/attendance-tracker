from flask import request, jsonify
from firebase import verify_firebase_token

def token_required(f):
    """
    Middleware to protect routes by verifying Firebase ID tokens.
    """
    def decorated(*args, **kwargs):
        id_token = request.headers.get("Authorization")  #Bearer <token>
        if not id_token:
            return jsonify({"error": "Token required"}), 401

        id_token = id_token.split("Bearer ")[-1]
        decoded_token = verify_firebase_token(id_token)

        if not decoded_token:
            return jsonify({"error": "Invalid token"}), 401

        request.user = decoded_token
        return f(*args, **kwargs)

    decorated.__name__ = f.__name__
    return decorated
