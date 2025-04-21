import React, {useState, useEffect} from "react";
import axios from 'axios';

const CoursePanel = () => {

    const [course, setCourse] = useState({
        course_code: '',
        course_description: '',
        course_unit: '',
        lab_unit: '',
    });
    
    const handleChangesForEverything = (e) => {
        const { name, value } = e.target;
    
        setCourse((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
    const handleAddingCourse = async (event) => {
        event.preventDefault();
        try {
        await axios.post('http://localhost:5000/adding_course', course);
        setCourse({
            course_code: '',
            course_description: '',
            course_unit: '',
            lab_unit: '',
        });
        } catch (err) {
        console.log(err);
        }
    };
    
     return (
        <div>
                <h1>Course Panel Form</h1>
                <div className="forDepartment">
                    <div className="textField">
                        <label htmlFor="course_name">Course Description:</label>
                        <input type="text" id="course_name" name="course_description" value={course.course_description} onChange={handleChangesForEverything} placeholder="Enter Program Descriptions" />
                    </div>
                    <div className="textField">
                        <label htmlFor="course_code">Course Code:</label>
                        <input type="text" id="course_code" name="course_code" value={course.course_code} onChange={handleChangesForEverything} placeholder="Enter Program Code" />
                    </div>
                    <div className="textField">
                        <label htmlFor="course_unit">Course Unit:</label>
                        <input type="text" id="course_unit" name="course_unit" value={course.course_unit} onChange={handleChangesForEverything} placeholder="Enter Program Code" />
                    </div>
                    <div className="textField">
                        <label htmlFor="lab_unit">Laboratory Unit:</label>
                        <input type="text" id="lab_unit" name="lab_unit" value={course.lab_unit} onChange={handleChangesForEverything} placeholder="Enter Program Code" />
                    </div>
                    <button style={{ background: 'maroon', color: 'white' }} onClick={handleAddingCourse}>Insert</button>
                </div>
            </div>
     )
}
export default CoursePanel;