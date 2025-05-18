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

1. **This project uses [uv](  https://docs.astral.sh/uv/) – If you have uv, simply run:** 

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
3. \*\*Download \*\***`serviceAccountKey.json`** and copy its contents and place it in .env `FIREBASE_KEYS = '{COPIED JSON}'`
4. **Update ********************************************`firebase.py`******************************************** with Firestore initialization**

### 3️⃣ Run the Server

```bash
python app.py
```


## 🔥 Database Schema (Firestore)

Firestore is **NoSQL**, so data is structured as **collections & documents**.

### 1️⃣ Users Collection (`users/{uid}`)

Each user has a document with their **UID**.

#### Fields:
- `uid` (string) – Unique identifier for the user.
- `name` (string) – Full name.
- `email` (string) – User's email.
- `roll_number` (string) – Roll number.
- `branch` (string) – Department/Branch.
- `year` (string) – Graduation year.
- `semester` (string) – Current semester.
- `subjects` (array) – List of subjects.
- `attendance_period` (object) – Start and end date of the attendance period.

---

### 2️⃣ Attendance Collection (`attendance/{uid}/dates/{date}`)

Stores **daily attendance records** for each user.

#### Fields:
- `date` (string) – Date of attendance.
- `attendance` (object) – Key-value pairs of subjects and their attendance status (e.g., Present, Absent, No Class).

---

### 3️⃣ Attendance Summary (`attendance/{uid}/summary/attendance_report`)

Stores **calculated attendance insights**.

#### Fields:
- `subject_wise` (object) – Contains attendance stats for each subject.
  - `percentage` (float) – Attendance percentage.
  - `present` (integer) – Number of attended classes.
  - `total` (integer) – Total classes held.
  - `deficiency` (integer, optional) – Number of classes needed to reach 75%.
- `updated_at` (timestamp) – Last updated timestamp.

---

### 3️⃣ Planners (`planners/{uid}/`)

Stores **Planner and shedule with TimeTable**.

#### Fields:
- `branch` (string) – Contains branch name
- `created_at` (timestamp) – stores creation date.
- `holidays` (array) – List of holidays are stored.
- `schedule` (map) – stores the schedule.
- `subjects` (array) – stores the subjects choosen by user.
- `uid` (string) – stores the user id or uid.

---

### 3️⃣ TimeTables (`timetable/{branch_year}/`)

Stores **Stores the timetable branchwise and yearwise**.

#### Fields:
- `timetable` (object) – Contains timetable
  - `Monday` (array) – monday schedule
  - `Tuesday` (array) – Tuesday schedule.
  - `Wednesday` (array) – Wednesday schedule.
  - `Thursday` (array) – Thursday schedule.
  - `Friday` (array) – Friday schedule..
  - `Saturday` (array) - Saturday schedule.

---

## 🚀 API Endpoints

### 1️⃣ Create or Update User

- **Endpoint:** `POST /auth/create-or-update-user`
- **Headers:**  
  - `Authorization: Bearer {token}`
- **Body:**
  ```json
  {
    "uid": "abc123",
    "name": "John Doe",
    "email": "your@gmail.com",
    "roll_number": "24",
    "branch": "CSE",
    "year": "2028",
    "semester": "2nd",
    "subjects": ["English", "Maths", "Hindi"],
    "attendance_period": {
      "start": "2024-01-01",
      "end": "2024-05-31"
    }
  }
  ```
- **Response:**
  ```json
  {
    "message": "User updated successfully",
    "uid": "uidisreturned"
  }
  ```

---

### 2️⃣ Mark Attendance

- **Endpoint:** `POST /attendance/mark`
- **Headers:**  
  - `Authorization: Bearer {token}`
- **Body:**
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
- **Response:**
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

---

### 3️⃣ Get Attendance Summary

- **Endpoint:** `GET /attendance/summary`
- **Headers:**  
  - `Authorization: Bearer {token}`
- **Response:**
  ```json
  {
    "subject_wise": {
      "CS": {
        "deficiency": 2,
        "percentage": 0.0,
        "present": 0,
        "total": 3
      },
      "Math": {
        "percentage": 100.0,
        "present": 3,
        "total": 3
      },
      "Physics": {
        "deficiency": 1,
        "percentage": 66.67,
        "present": 2,
        "total": 3
      }
    },
    "updated_at": "Thu, 20 Mar 2025 06:22:14 GMT",
  }
  ```

---

### 4️⃣ Generate Planner

- **Endpoint:** `Post /planner/generate-planner`
- **Headers:**  
  - `Authorization: Bearer {token}`
- **Response:**
  ```json
  {
    "message": "Planner created successfully",
    "planner": {
        "branch": "CSE",
        "created_at": "Sun, 23 Mar 2025 17:42:55 GMT",
        "holidays": [],
        "schedule": {
            "2024-01-01": [
                "M2",
                "Physics"
            ],
            "2024-01-02": [
                "Mech",
                "M2"
            ],
            "2024-01-03": [
                "Physics",
                "Mech"
            ],
            "2024-01-04": [
                "M2",
                "Physics"
            ]
            
            
        "semester": "2nd",
        "subjects": [
            "Physics",
            "M2",
            "Mech"
        ],
        "uid": "XlbThzrdClgmR2zJOE6ywtOmbmj2",
        "year": "1"
    }
  }
  }
  ```
  ---
### 5️⃣ Get Planner 

- **Endpoint:** `GET /planner/get-planner`
- **Headers:**  
  - `Authorization: Bearer {token}`
- **Response:**
  ```json
  {
    "branch": "CSE",
    "created_at": "Sun, 23 Mar 2025 17:42:55 GMT",
    "holidays": [],
    "schedule": {
        "2024-01-01": [
            "M2",
            "Physics"
        ],
        "2024-01-02": [
            "Mech",
            "M2"
        ],...
    },
    "semester": "2nd",
    "subjects": [
        "Physics",
        "M2",
        "Mech"
    ],
    "uid": "XlbThzrdClgmR2zJOE6ywtOmbmj2",
    "year": "1"
  }
  ```
  ---

### 6️⃣ Set TimeTable

- **Endpoint:** `GET /timetable/set`
- **Body:**
  ```json
  {
        "branch": "CSE",
        "year": "1",
        "timetable": {
        "Monday": ["Civil", "CP", "M2","Physics","Lab"],
        "Tuesday": ["Mech", "CP", "Lab","M2"],
        "Wednesday": ["Lab", "Physics","Mech"],
        "Thursday":["M2","Physics","Civil","CP"],
        "Friday":["Physics","CP","Mech","Civil","M2"],
        "Saturday":["Lab"]
        }
    }
  ```
- **Response:**
  ```json
  {
    "message": "Timetable stored successfully"
  }
  ```

---

## 🔌 API Endpoints

### 🟢 Authentication (`routes/auth.py`)

| Method | Endpoint      | Description                         |
| ------ | ------------- | ----------------------------------- |
| `POST` | `/auth/create-or-update-user` | Creates or modifies user                      |
| `GET`  | `/auth/user`  | Fetch user profile (requires token) |

### 🟢 Attendance (`routes/attendance.py`)

| Method | Endpoint              | Description                   |
| ------ | --------------------- | ----------------------------- |
| `POST` | `/attendance/mark`    | Mark attendance for a subject |
| `GET`  | `/attendance/summary` | Get attendance insights       |


### 🟢 Planner (`routes/planner.py`)

| Method | Endpoint            | Description                     |
| ------ | ------------------- | ------------------------------- |
| `POST`  | `/planner/generate-planner` | Generate a subject-wise planner |
| `GET`  | `/planner/get-planner` | Gets the planner|

### 🟢 Timetable (`routes/timetable.py`)

| Method | Endpoint            | Description                     |
| ------ | ------------------- | ------------------------------- |
| `POST`  | `/timetable/set-timetable` | sets the time table |


## 🛡️ Token Authentication (`middlewares.py`)

- **All API requests(excepts timetable ones) require a valid Firebase Auth token.**
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

