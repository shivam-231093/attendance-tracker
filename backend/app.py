from flask import Flask
from flask_cors import CORS
from routes.auth import auth_bp
from routes.attendence import attendance_bp
from routes.planner import planner_bp
from routes.reports import reports_bp
from routes.timetable import timetable_bp

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(attendance_bp, url_prefix="/attendance")
app.register_blueprint(planner_bp, url_prefix="/planner")
app.register_blueprint(reports_bp, url_prefix="/reports")
app.register_blueprint(timetable_bp, url_prefix="/timetable")

@app.route("/")
def home():
    return {"message": "Attendance Tracker Backend"}

if __name__ == "__main__":
    app.run(debug=True)
