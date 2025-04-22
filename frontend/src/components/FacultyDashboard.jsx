import React, { useState, useEffect } from "react";

const FacultyDashboard = () => {
    const [profData, setProfData] = useState({
        prof_id: '',
        fname: '',
        mname: '',
        lname: '',
        department_section_id: '',
        subject_id: '',
        mappings: [],
        active_school_year_id: ''
      });
      const [students, setStudents] = useState([]);

    
      useEffect(() => {
        const prof_id = localStorage.getItem("prof_id");
        const fname = localStorage.getItem("fname");
        const mname = localStorage.getItem("mname");
        const lname = localStorage.getItem("lname");
        const mappings = JSON.parse(localStorage.getItem("subject_section_mappings")) || [];
        const active_school_year_id = localStorage.getItem("school_year_id");
        setProfData({ prof_id, fname, mname, lname, mappings, active_school_year_id});
      }, []);

      const handleFetchStudents = async (subject_id, department_section_id, active_school_year_id) => {
        try {
          const response = await fetch(`http://localhost:5000/get_enrolled_students/${subject_id}/${department_section_id}/${active_school_year_id}`);
          const data = await response.json();
      
          if (response.ok) {
            setStudents(data);
          } else {
            alert(data.message || "Failed to fetch students.");
          }
        } catch (error) {
          console.error("Fetch error:", error);
          alert("Server error.");
        }
      };
      

  return (
    <div>
      <h1>Welcome Mr. {profData.lname}, {profData.fname} {profData.mname} || {profData.prof_id} || {profData.active_school_year_id}</h1>
      <ul>
      {profData.mappings.map((map, index) => (
        <button
            key={`${map.subject_id}-${map.department_section_id}`} // Unique key
            onClick={() =>
            handleFetchStudents(
                map.subject_id,
                map.department_section_id,
                profData.active_school_year_id
            )
            }
        >
            Section - {map.department_section_id} | Subject - {map.subject_id} | SY: {profData.active_school_year_id}
        </button>
        ))}
      </ul>
      <h3>Enrolled Students:</h3>
<ul>
  {students.map((student, index) => (
    <li key={index}>
       {index}: {student.student_number} | Subject: {student.subject_id} | Section: {student.department_section_id} | midterm: {student.midterm} | finals: {student.finals} | Final Grade: {student.final_grade} | Remarks: Dropdown(PASSED, FAILED, DROP, INCOMPLETE) 
    </li>
  ))}
</ul>

    </div>
  );
};

export default FacultyDashboard;
