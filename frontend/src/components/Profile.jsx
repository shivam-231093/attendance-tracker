import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../firebase';
import { toast } from "react-toastify";

const Profile = () => {

  const navigate = useNavigate();
  const { authFetch,currentUser,setProfileCompleted } = useAuth();

  const [formData, setFormData] = useState({
    uid:currentUser.uid,
    roll_number: "",
    branch: "",
    year: "",
    name: currentUser.displayName,
    email:currentUser.email,
    semester: "",
    startDate: "",
    subjects: [],
  });

  const [availableSubjects, setAvailableSubjects] = useState([]);

  const branches = [
    "Computer Science And Engineering",
    "Information Technology",
    "Electronics & Communication",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Industrial Production",
    "Mechatronics",
  ];

  const curriculum = {
    "Computer Science And Engineering": {
      "1": {  // Year 1
        "1": ["Engineering Mathematics-I", "Engineering Physics", "Basic Electrical Engineering", "Engineering Graphics & Design", "Programming for Problem Solving", "Chemistry", "Physics Laboratory", "Basic Electrical Laboratory", "Programming Laboratory"],
        "2": ["Engineering Mathematics-II", "Engineering Chemistry", "Basic Electronics", "Basic Mechanical Engineering", "Object Oriented Programming", "Environmental Studies", "Chemistry Laboratory", "Workshop Practice", "OOP Laboratory"]
      },
      "2": {  // Year 2
        "3": ["Engineering Mathematics-III", "Digital Electronics", "Data Structures", "Computer Organization", "Discrete Mathematics", "Technical Communication", "Data Structures Laboratory", "Digital Electronics Laboratory", "Constitution of India"],
        "4": ["Engineering Mathematics-IV", "Analysis and Design of Algorithms", "Database Management Systems", "Operating Systems", "Microprocessors & Interfaces", "Software Engineering", "DBMS Laboratory", "Operating Systems Laboratory", "Universal Human Values"]
      },
      "3": {  // Year 3
        "5": ["Compiler Design", "Computer Networks", "Theory of Computation", "Artificial Intelligence", "Elective-I (Machine Learning)", "Open Elective-I (IoT)", "Computer Networks Laboratory", "Compiler Design Laboratory", "Mini Project-I"],
        "6": ["Information Security", "Web Technology", "Cloud Computing", "Data Science", "Elective-II (Big Data Analytics)", "Open Elective-II (Blockchain Technology)", "Web Technology Laboratory", "Data Science Laboratory", "Minor Project"]
      },
      "4": {  // Year 4
        "7": ["Distributed Systems", "Mobile Computing", "Elective-III (Deep Learning)", "Elective-IV (Natural Language Processing)", "Open Elective-III (Quantum Computing)", "Project Phase-I", "Mobile Application Development Laboratory", "Industrial Training"],
        "8": ["Professional Ethics", "Elective-V (Computer Vision)", "Elective-VI (Soft Computing)", "Project Phase-II", "Technical Seminar", "Comprehensive Viva-Voce"]
      }
    },
    "Information Technology": {
      "1": {  // Year 1
        "1": ["Engineering Mathematics-I", "Engineering Physics", "Basic Electrical Engineering", "Engineering Graphics & Design", "Programming for Problem Solving", "Chemistry", "Physics Laboratory", "Basic Electrical Laboratory", "Programming Laboratory"],
        "2": ["Engineering Mathematics-II", "Engineering Chemistry", "Basic Electronics", "Basic Mechanical Engineering", "Object Oriented Programming", "Environmental Studies", "Chemistry Laboratory", "Workshop Practice", "OOP Laboratory"]
      },
      "2": {  // Year 2
        "3": ["Engineering Mathematics-III", "Digital Electronics", "Data Structures", "Computer Organization", "Discrete Mathematics", "Technical Communication", "Data Structures Laboratory", "Digital Electronics Laboratory", "Constitution of India"],
        "4": ["Engineering Mathematics-IV", "Analysis and Design of Algorithms", "Database Management Systems", "Operating Systems", "Software Engineering", "Probability & Statistics", "DBMS Laboratory", "Operating Systems Laboratory", "Universal Human Values"]
      },
      "3": {  // Year 3
        "5": ["Information Security", "Computer Networks", "Web Technologies", "Advanced Java Programming", "Elective-I (Internet of Things)", "Open Elective-I (Machine Learning)", "Web Technologies Laboratory", "Advanced Java Laboratory", "Mini Project-I"],
        "6": ["Data Warehousing & Mining", "Mobile Application Development", "Cloud Computing", "Software Testing", "Elective-II (Digital Image Processing)", "Open Elective-II (E-Commerce)", "Mobile App Development Laboratory", "Software Testing Laboratory", "Minor Project"]
      },
      "4": {  // Year 4
        "7": ["Enterprise Resource Planning", "DevOps", "Elective-III (Artificial Intelligence)", "Elective-IV (Big Data Analytics)", "Open Elective-III (Cyber Security)", "Project Phase-I", "DevOps Laboratory", "Industrial Training"],
        "8": ["Professional Ethics", "Elective-V (Data Science)", "Elective-VI (Blockchain Technology)", "Project Phase-II", "Technical Seminar", "Comprehensive Viva-Voce"]
      }
    },
    "Electronics & Communication": {
      "1": {  // Year 1
        "1": ["Engineering Mathematics-I", "Engineering Physics", "Basic Electrical Engineering", "Engineering Graphics & Design", "Programming for Problem Solving", "Chemistry", "Physics Laboratory", "Basic Electrical Laboratory", "Programming Laboratory"],
        "2": ["Engineering Mathematics-II", "Engineering Chemistry", "Basic Electronics", "Basic Mechanical Engineering", "Object Oriented Programming", "Environmental Studies", "Chemistry Laboratory", "Workshop Practice", "OOP Laboratory"]
      },
      "2": {  // Year 2
        "3": ["Engineering Mathematics-III", "Electronic Devices", "Digital System Design", "Network Theory", "Signals & Systems", "Technical Communication", "Electronic Devices Laboratory", "Digital System Design Laboratory", "Constitution of India"],
        "4": ["Engineering Mathematics-IV", "Analog Circuits", "Control Systems", "Communication Systems", "Electromagnetic Field Theory", "Data Structures", "Analog Circuits Laboratory", "Communication Systems Laboratory", "Universal Human Values"]
      },
      "3": {  // Year 3
        "5": ["Digital Communication", "Microprocessors & Microcontrollers", "VLSI Design", "Antenna & Wave Propagation", "Elective-I (Embedded Systems)", "Open Elective-I (IoT)", "Microprocessors Laboratory", "VLSI Design Laboratory", "Mini Project-I"],
        "6": ["Digital Signal Processing", "Wireless Communication", "Computer Networks", "Microwave Engineering", "Elective-II (Satellite Communication)", "Open Elective-II (Machine Learning)", "DSP Laboratory", "Computer Networks Laboratory", "Minor Project"]
      },
      "4": {  // Year 4
        "7": ["Optical Communication", "RF & Microwave Circuit Design", "Elective-III (Advanced DSP)", "Elective-IV (Mobile Communication)", "Open Elective-III (AI & ML for ECE)", "Project Phase-I", "RF Circuit Design Laboratory", "Industrial Training"],
        "8": ["Professional Ethics", "Elective-V (RADAR Systems)", "Elective-VI (Cognitive Radio)", "Project Phase-II", "Technical Seminar", "Comprehensive Viva-Voce"]
      }
    },
    "Electrical Engineering": {
      "1": {  // Year 1
        "1": ["Engineering Mathematics-I", "Engineering Physics", "Basic Electrical Engineering", "Engineering Graphics & Design", "Programming for Problem Solving", "Chemistry", "Physics Laboratory", "Basic Electrical Laboratory", "Programming Laboratory"],
        "2": ["Engineering Mathematics-II", "Engineering Chemistry", "Basic Electronics", "Basic Mechanical Engineering", "Object Oriented Programming", "Environmental Studies", "Chemistry Laboratory", "Workshop Practice", "OOP Laboratory"]
      },
      "2": {  // Year 2
        "3": ["Engineering Mathematics-III", "Electrical Circuit Analysis", "Electronic Devices & Circuits", "Electrical Measurements", "Electromagnetic Fields", "Technical Communication", "Electrical Circuits Laboratory", "Electronics Laboratory", "Constitution of India"],
        "4": ["Engineering Mathematics-IV", "DC Machines & Transformers", "Analog & Digital Electronics", "Network Analysis", "Signals & Systems", "Data Structures", "Machines Laboratory-I", "Networks & Electronics Laboratory", "Universal Human Values"]
      },
      "3": {  // Year 3
        "5": ["Power Electronics", "Control Systems", "AC Machines", "Power System-I", "Elective-I (Smart Grid)", "Open Elective-I (IoT)", "Machines Laboratory-II", "Control Systems Laboratory", "Mini Project-I"],
        "6": ["Microprocessors & Microcontrollers", "Power System Protection", "Power System-II", "Electric Drives", "Elective-II (Renewable Energy Systems)", "Open Elective-II (Machine Learning)", "Power Electronics Laboratory", "Microprocessors Laboratory", "Minor Project"]
      },
      "4": {  // Year 4
        "7": ["High Voltage Engineering", "Digital Signal Processing", "Elective-III (Power Quality)", "Elective-IV (FACTS Devices)", "Open Elective-III (Energy Management)", "Project Phase-I", "High Voltage Laboratory", "Industrial Training"],
        "8": ["Professional Ethics", "Elective-V (Electric Vehicle Technology)", "Elective-VI (Power System Operation & Control)", "Project Phase-II", "Technical Seminar", "Comprehensive Viva-Voce"]
      }
    },
    "Mechanical Engineering": {
      "1": {  // Year 1
        "1": ["Engineering Mathematics-I", "Engineering Physics", "Basic Electrical Engineering", "Engineering Graphics & Design", "Programming for Problem Solving", "Chemistry", "Physics Laboratory", "Basic Electrical Laboratory", "Programming Laboratory"],
        "2": ["Engineering Mathematics-II", "Engineering Chemistry", "Basic Electronics", "Basic Mechanical Engineering", "Object Oriented Programming", "Environmental Studies", "Chemistry Laboratory", "Workshop Practice", "OOP Laboratory"]
      },
      "2": {  // Year 2
        "3": ["Engineering Mathematics-III", "Engineering Mechanics", "Thermodynamics", "Material Science", "Manufacturing Processes-I", "Technical Communication", "Material Testing Laboratory", "Manufacturing Laboratory-I", "Constitution of India"],
        "4": ["Engineering Mathematics-IV", "Fluid Mechanics", "Strength of Materials", "Machine Drawing", "Manufacturing Processes-II", "Data Structures", "Fluid Mechanics Laboratory", "Strength of Materials Laboratory", "Universal Human Values"]
      },
      "3": {  // Year 3
        "5": ["Heat & Mass Transfer", "Theory of Machines", "Design of Machine Elements", "Internal Combustion Engines", "Elective-I (Refrigeration & Air Conditioning)", "Open Elective-I (IoT)", "Heat Transfer Laboratory", "Dynamics Laboratory", "Mini Project-I"],
        "6": ["Industrial Engineering", "Fluid Machinery", "Computer Aided Design", "Metrology & Instrumentation", "Elective-II (Robotics)", "Open Elective-II (Machine Learning)", "CAD/CAM Laboratory", "Measurements Laboratory", "Minor Project"]
      },
      "4": {  // Year 4
        "7": ["Automobile Engineering", "Finite Element Analysis", "Elective-III (Advanced Manufacturing)", "Elective-IV (Gas Dynamics & Jet Propulsion)", "Open Elective-III (Energy Management)", "Project Phase-I", "Automobile Engineering Laboratory", "Industrial Training"],
        "8": ["Professional Ethics", "Elective-V (Composite Materials)", "Elective-VI (Product Design & Development)", "Project Phase-II", "Technical Seminar", "Comprehensive Viva-Voce"]
      }
    },
    "Civil Engineering": {
      "1": {  // Year 1
        "1": ["Engineering Mathematics-I", "Engineering Physics", "Basic Electrical Engineering", "Engineering Graphics & Design", "Programming for Problem Solving", "Chemistry", "Physics Laboratory", "Basic Electrical Laboratory", "Programming Laboratory"],
        "2": ["Engineering Mathematics-II", "Engineering Chemistry", "Basic Electronics", "Basic Mechanical Engineering", "Object Oriented Programming", "Environmental Studies", "Chemistry Laboratory", "Workshop Practice", "OOP Laboratory"]
      },
      "2": {  // Year 2
        "3": ["Engineering Mathematics-III", "Surveying", "Building Materials & Construction", "Strength of Materials", "Fluid Mechanics", "Technical Communication", "Surveying Laboratory", "Material Testing Laboratory", "Constitution of India"],
        "4": ["Engineering Mathematics-IV", "Advanced Surveying", "Structural Analysis", "Hydraulics", "Building Planning & Drawing", "Data Structures", "Advanced Surveying Laboratory", "Hydraulics Laboratory", "Universal Human Values"]
      },
      "3": {  // Year 3
        "5": ["RCC Structures", "Transportation Engineering-I", "Geotechnical Engineering-I", "Hydrology & Water Resources", "Elective-I (Advanced Concrete Technology)", "Open Elective-I (Remote Sensing & GIS)", "Concrete Laboratory", "Geotechnical Engineering Laboratory", "Mini Project-I"],
        "6": ["Design of Steel Structures", "Transportation Engineering-II", "Geotechnical Engineering-II", "Environmental Engineering-I", "Elective-II (Earthquake Resistant Structures)", "Open Elective-II (Disaster Management)", "Highway & Traffic Laboratory", "Environmental Engineering Laboratory", "Minor Project"]
      },
      "4": {  // Year 4
        "7": ["Environmental Engineering-II", "Construction Management", "Elective-III (Bridge Engineering)", "Elective-IV (Foundation Engineering)", "Open Elective-III (Smart Cities)", "Project Phase-I", "Computational Laboratory", "Industrial Training"],
        "8": ["Professional Ethics", "Elective-V (Prestressed Concrete)", "Elective-VI (Watershed Management)", "Project Phase-II", "Technical Seminar", "Comprehensive Viva-Voce"]
      }
    },
    "Industrial Production": {
      "1": {  // Year 1
        "1": ["Engineering Mathematics-I", "Engineering Physics", "Basic Electrical Engineering", "Engineering Graphics & Design", "Programming for Problem Solving", "Chemistry", "Physics Laboratory", "Basic Electrical Laboratory", "Programming Laboratory"],
        "2": ["Engineering Mathematics-II", "Engineering Chemistry", "Basic Electronics", "Basic Mechanical Engineering", "Object Oriented Programming", "Environmental Studies", "Chemistry Laboratory", "Workshop Practice", "OOP Laboratory"]
      },
      "2": {  // Year 2
        "3": ["Engineering Mathematics-III", "Engineering Mechanics", "Manufacturing Processes-I", "Material Science", "Thermodynamics", "Technical Communication", "Manufacturing Laboratory-I", "Material Testing Laboratory", "Constitution of India"],
        "4": ["Engineering Mathematics-IV", "Manufacturing Processes-II", "Strength of Materials", "Machine Drawing", "Industrial Engineering", "Data Structures", "Manufacturing Laboratory-II", "Strength of Materials Laboratory", "Universal Human Values"]
      },
      "3": {  // Year 3
        "5": ["Production Planning & Control", "Machine Tool Design", "Metrology & Quality Control", "Machining Science", "Elective-I (Welding Technology)", "Open Elective-I (IoT)", "Machine Tools Laboratory", "Metrology Laboratory", "Mini Project-I"],
        "6": ["Operations Research", "CAD/CAM", "Tool Design", "Additive Manufacturing", "Elective-II (Maintenance Engineering)", "Open Elective-II (Machine Learning)", "CAD/CAM Laboratory", "Tool Design Laboratory", "Minor Project"]
      },
      "4": {  // Year 4
        "7": ["Inventory Control", "Plant Layout & Material Handling", "Elective-III (Advanced Manufacturing Processes)", "Elective-IV (Flexible Manufacturing Systems)", "Open Elective-III (Supply Chain Management)", "Project Phase-I", "Industrial Simulation Laboratory", "Industrial Training"],
        "8": ["Professional Ethics", "Elective-V (Total Quality Management)", "Elective-VI (Industry 4.0)", "Project Phase-II", "Technical Seminar", "Comprehensive Viva-Voce"]
      }
    },
    "Mechatronics": {
      "1": {  // Year 1
        "1": ["Engineering Mathematics-I", "Engineering Physics", "Basic Electrical Engineering", "Engineering Graphics & Design", "Programming for Problem Solving", "Chemistry", "Physics Laboratory", "Basic Electrical Laboratory", "Programming Laboratory"],
        "2": ["Engineering Mathematics-II", "Engineering Chemistry", "Basic Electronics", "Basic Mechanical Engineering", "Object Oriented Programming", "Environmental Studies", "Chemistry Laboratory", "Workshop Practice", "OOP Laboratory"]
      },
      "2": {  // Year 2
        "3": ["Engineering Mathematics-III", "Electrical Machines", "Electronic Devices & Circuits", "Mechanical Measurements", "Digital Electronics", "Technical Communication", "Electrical Machines Laboratory", "Electronics Laboratory", "Constitution of India"],
        "4": ["Engineering Mathematics-IV", "Microprocessors & Microcontrollers", "Control Systems", "Manufacturing Processes", "Fluid Power Systems", "Data Structures", "Microprocessors Laboratory", "Control Systems Laboratory", "Universal Human Values"]
      },
      "3": {  // Year 3
        "5": ["Robotics", "Sensors & Transducers", "Mechatronics System Design", "Industrial Automation", "Elective-I (PLC Programming)", "Open Elective-I (IoT)", "Robotics Laboratory", "Sensors Laboratory", "Mini Project-I"],
        "6": ["Embedded Systems", "Computer Integrated Manufacturing", "Hydraulics & Pneumatics", "Machine Vision", "Elective-II (MEMS)", "Open Elective-II (Machine Learning)", "Embedded Systems Laboratory", "CIM Laboratory", "Minor Project"]
      },
      "4": {  // Year 4
        "7": ["Industrial Robotics", "Artificial Intelligence in Mechatronics", "Elective-III (Advanced Control Systems)", "Elective-IV (Smart Manufacturing)", "Open Elective-III (Digital Twin Technology)", "Project Phase-I", "Industrial Robotics Laboratory", "Industrial Training"],
        "8": ["Professional Ethics", "Elective-V (Automotive Mechatronics)", "Elective-VI (Human Machine Interface)", "Project Phase-II", "Technical Seminar", "Comprehensive Viva-Voce"]
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    const { branch, year, semester } = {
      ...formData,
      [name]: value,
    };

    if (branch && year && semester) {
      const subjectsList = curriculum[branch]?.[year]?.[semester] || [];
      setAvailableSubjects(subjectsList);

      setFormData((prev) => ({
        ...prev,
        subjects: prev.subjects.filter((s) => subjectsList.includes(s)),
      }));
    }
  };

  const handleSubjectChange = (subject) => {
    setFormData((prev) => {
      const updatedSubjects = prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject];
      return { ...prev, subjects: updatedSubjects };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await authFetch('/auth/create-or-update-user', {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          profileCompleted: true
        })
      });

    } catch (error) {
      console.error("error while saving profile", error.message);
    }
    try {
      const response = await authFetch('/planner/generate-planner', {
        method: 'POST',
      });

    } catch (error) {
      console.error("error while saving profile", error.message);
    }setProfileCompleted(true);
    toast.success("Account Created Successfully")
    navigate('/dashboard');
  };


  return (
    <div className="flex-1 bg-black min-h-screen flex justify-center px-4 py-8">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 sm:p-10 w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-full text-center relative">
            <h1 className="text-2xl sm:text-3xl font-bold">Attendance Tracker</h1>
            <NavLink
              to="/"
              className="absolute right-0 top-1 text-xl hover:text-red-400"
            >
              X
            </NavLink>
          </div>
        </div>

        <p className="text-gray-400 text-center mb-6">Complete Your Profile</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm">Roll Number</label>
            <input
              type="text"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600"
              placeholder="0201CS241025"
              required
            />
          </div>

          <div>
            <label className="block text-sm">Branch</label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600"
              required
            >
              <option value="">Select branch</option>
              {branches.map((branch, index) => (
                <option key={index} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm">Year</label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600"
              required
            >
              <option value="">Select year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>

          <div>
            <label className="block text-sm">Semester</label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600"
              required
            >
              <option value="">Select Semester</option>
              {[...Array(8)].map((_, index) => (
                <option key={index + 1} value={(index + 1).toString()}>
                  {index + 1} {["st", "nd", "rd"][index] || "th"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-center mb-3">
              Select Subjects
            </label>
            {availableSubjects.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {availableSubjects.map((subject, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={subject}
                      checked={formData.subjects.includes(subject)}
                      onChange={() => handleSubjectChange(subject)}
                      className="w-4 h-4 mr-2"
                    />
                    <label htmlFor={subject}>{subject}</label>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 text-center">
                Select Branch, Year, and Semester to see subjects
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

