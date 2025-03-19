# Attendance Tracker Backend (Flask + Firebase)

This is the backend for the **Attendance Tracker** system, built with **Flask** and **Firebase (Firestore)**.\
It provides **user authentication, attendance management, automatic planner generation, and attendance insights**.

## 🚀 Features

✔ **Google Authentication with Firebase Auth**\
✔ **Student Attendance Tracking** (Present, Absent, No Class, GT)\
✔ **Auto-Generated Attendance Planner**\
✔ **Attendance Insights & Deficiency Warnings**\
✔ **REST API for frontend integration**

## 📂 Project Structure

```
/backend
├── app.py              # Main Flask App
├── firebase.py         # Firebase Setup
├── config.py           # Configuration File
├── requirements.txt    # Dependencies
├── models/             # Firestore Database Models
│   ├── user.py
│   ├── attendance.py
│   ├── planner.py
├── routes/             # API Routes
│   ├── auth.py
│   ├── attendance.py
│   ├── planner.py
│   ├── reports.py
├── middlewares/
│   ├── auth_middleware.py# Token Authentication Middleware
├── README.md           # Documentation
```

## 🛠️ Setup Instructions

### 1️⃣ Install Dependencies

1. **This Project is made using uv** - If you have [uv](  https://docs.astral.sh/uv/) then simple run the following command 🔥 fast isn't it.

```bash
uv run app.py
``` 
2. **OhterWise requirements is given** 

```bash
pip install -r requirements.txt
```

### 2️⃣ Setup Firebase

1. **Create a Firebase Project** ([https://console.firebase.google.com/](https://console.firebase.google.com/))
2. **Enable Firestore & Authentication**
3. \*\*Download \*\***`serviceAccountKey.json`** and place it in `/backend/`
4. **Update ********************************************`firebase.py`******************************************** with Firestore initialization**

### 3️⃣ Run the Server

```bash
python app.py
```

## 🔥 Database Schema (Firestore)

Firestore is **NoSQL**, so data is structured as **collections & documents**.

### 1️⃣ Users Collection (`users/`)

Each user has a document with their **UID**.

- Request *Url http://localhost:5000/auth/create-or-update-user*
- Method *POST*
- *Header should have 'Authorization: Bearer {token}*
- Body is given below
```json

{
  "uid": "abc123",
  "name": "John Doe",
  "email": "your@gmail.com",
  "roll_number":"24",
  "branch":"CSE",
  "year":"2028",
  "semester":"2nd",
  "subjects":["English","Maths","Hindi"],
  "attendance_period":{
    "start": "2024-01-01",
    "end": "2024-05-31"
  }

}
```
- Response is given below
```json
{
    "message": "User updated successfully",
    "uid": "uidisreturned"
}
```

### 2️⃣ Attendance Collection (`attendance/{uid}/dates/`)

Stores **daily attendance records** for each user.
- Request *Url http://localhost:5000/attendance/mark*
- Method *POST*
- *Header should have 'Authorization: Bearer {token}*
- Body is given below

```json
{
    "date": "2025-03-24",
    "attendance": {
        "Math": "Present",
        "Physics": "Absent",
        "CS": "No Class"
    }
}
```

- Response is given below 
```json
{
  "data": {
      "CS": "No Class",
      "Math": "Present",
      "Physics": "Absent"
  },
  "message": "Attendance marked successfully"
}
```

### 3️⃣ Attendance Summary (`attendance/{uid}/summary/attendance_report`)

Stores **calculated attendance insights**.

```json
{
  "total_present": 40,
  "total_classes": 50,
  "percentage": 80,
  "subject_wise": {
    "Math": {"present": 18, "total": 20, "percentage": 90},
    "Physics": {"present": 12, "total": 20, "percentage": 60}
  },
  "deficiency": {
    "Physics": 2
  }
}
```

### 4️⃣ Planner Collection (`planner/{uid}/`)

Auto-generates **attendance planner** based on user data.

```json
{
  "uid": "abc123",
  "semester": 4,
  "schedule": {
    "Monday": ["Math", "Physics"],
    "Tuesday": ["CS", "Math"],
    "Wednesday": ["Physics", "CS"],
    "Thursday": ["Math"],
    "Friday": ["CS", "Physics"]
  },
  "holidays": ["2025-03-25", "2025-04-14"]
}
```

## 🔌 API Endpoints

### 🟢 Authentication (`routes/auth.py`)

| Method | Endpoint      | Description                         |
| ------ | ------------- | ----------------------------------- |
| `POST` | `/auth/login` | Google Sign-In                      |
| `GET`  | `/auth/user`  | Fetch user profile (requires token) |

### 🟢 Attendance (`routes/attendance.py`)

| Method | Endpoint              | Description                   |
| ------ | --------------------- | ----------------------------- |
| `POST` | `/attendance/mark`    | Mark attendance for a subject |
| `GET`  | `/attendance/summary` | Get attendance insights       |

📌 **Example Response (GET ********************************************`/attendance/summary`********************************************)**

```json
{
  "total_present": 40,
  "total_classes": 50,
  "percentage": 80,
  "subject_wise": {
    "Math": {"present": 18, "total": 20, "percentage": 90},
    "Physics": {"present": 12, "total": 20, "percentage": 60}
  },
  "deficiency": {
    "Physics": 2
  }
}
```

### 🟢 Planner (`routes/planner.py`)

| Method | Endpoint            | Description                     |
| ------ | ------------------- | ------------------------------- |
| `GET`  | `/planner/generate` | Generate a subject-wise planner |

📌 **Example Response**

```json
{
  "Monday": ["Math", "Physics"],
  "Tuesday": ["CS", "Math"],
  "Wednesday": ["Physics", "CS"],
  "Thursday": ["Math"],
  "Friday": ["CS", "Physics"]
}
```

## 🛡️ Token Authentication (`middlewares.py`)

- **All API requests require a valid Firebase Auth token.**
- **Add ********************************************`@token_required`******************************************** decorator to secure routes.**

📌 **Example Usage**

```python
@attendance_bp.route("/summary", methods=["GET"])
@token_required
def get_attendance_summary():
    uid = request.user.get("uid")  
    response = Attendance.get_attendance_summary(uid)
    return jsonify(response), 200
```

## 🎯 Next Steps

✅ **Finish frontend integration with React**\
✅ **Implement attendance trend reports**\


## 📌 Contributing

1. Fork the repo
2. Create a new branch (`feature-xyz`)
3. Commit changes
4. Open a PR

