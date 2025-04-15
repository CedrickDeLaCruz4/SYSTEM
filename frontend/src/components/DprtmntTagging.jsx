import React, {useState, useEffect} from "react";
import axios from 'axios';

const CourseManagement = () => {

    // PROGRAM PANEL FORM
    const [program, setProgram] = useState({
        name: '',
        code: '',
    });

    // COURSE PANEL FORM
    const [course, setCourse] = useState({
        course_code: '',
        course_description: '',
        course_unit: '',
        lab_unit: '',
    });

    // INSERT CURRICULUM
    const [curriculum, setCurriculum] = useState({
        year_id: '',
        program_id: '',
    });

    // PROGRAM TAGGING PANEL
    const [progTag, setProgTag] = useState({
        curriculum_id: '',
        year_level_id: '',
        semester_id: '',
        course_id: '',
    });
    
    // PROGRAM TAGGING PANEL
    const [courseList, setCourseList] = useState([]);
    // PROGRAM TAGGING PANEL
    const [yearLevelList, setYearlevelList] = useState([]);
    // PROGRAM TAGGING PANEL
    const [semesterList, setSemesterList] = useState([]);
    // PROGRAM TAGGING PANEL
    const [curriculumList, setCurriculumList] = useState([]);
    // INSERT CURRICULUM
    const [yearList, setYearList] = useState([]);
    // INSERT CURRICULUM
    const [programList, setProgramList] = useState([]);

    // INSERT CURRICULUM
    const fetchYear = async () => {
        try{
            const response = await axios.get('http://localhost:5000/year');
            setYearList(response.data);
        }catch(err){
            console.log(err);
        }
    }

    // INSERT CURRICULUM
    const fetchProgram = async () => {
        try{
            const response = await axios.get('http://localhost:5000/get_program');
            setProgramList(response.data);
        }catch(err){
            console.log(err);
        }
    }

    // PROGRAM TAGGING PANEL
    const fetchYearLevel = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get_year_level');
        setYearlevelList(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    // PROGRAM TAGGING PANEL
    const fetchSemester = async () => {
        try {
          const response = await axios.get('http://localhost:5000/get_semester');
          setSemesterList(response.data);
        } catch (err) {
          console.log(err);
        }
    };

    // PROGRAM TAGGING PANEL
    const fetchCurriculum = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get_curriculum');
        setCurriculumList(response.data);
      } catch (err) {
        console.log(err);
      }
    };
  
    // PROGRAM TAGGING PANEL
    const fetchCourse = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get_course');
        setCourseList(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    //FOR PROGRAM TAGGING AND INSERT CURRICULUM
    useEffect(() => {
        // PROGRAM TAGGING
        fetchCourse();
        fetchYearLevel();
        fetchSemester();
        fetchCurriculum();
        // CURRICULUM
        fetchYear();
        fetchProgram();
    }, []);

    // FOR EVERYTHING
    const handleChangesForEverything = (e) => {
        const { name, value } = e.target;
        
        // COURSE PANEL FORM
        setCourse((prev) => ({
            ...prev,
            [name]: value,
        }));
        
        // PROGRAM PANEL FORM
        setProgram(prev => ({
            ...prev,
            [name]: value
        }));
        
        // INSERT CURRICULUM
        setCurriculum(prev => ({
            ...prev,
            [name]: value
        }));
        
        // PROGRAM TAGGING PANEL
        setProgTag(prev => ({
            ...prev,
            [name]: value
        }));

    };
    
    // PROGRAM PANEL FORM
    const handleAddingProgram = async () => {
        if (!program.name ||
          !program.code) {
          alert("Please fill all field");
        }
    
        else {
          try {
            await axios.post('http://localhost:5000/program', program);
            setProgram({ name: '', code: ''});
          } catch (err) {
            console.error(err);
          }
        }
      }

    // COURSE PANEL FORM
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

    // INSERT CURRICULUM
    const handleAddingCurriculum = async () => {
        if (!curriculum.year_id ||
            !curriculum.program_id
        ){
            alert("Please fill all field");
        }

        try{
            await axios.post('http://localhost:5000/curriculum', curriculum);
            setCurriculum({year_id: '', program_id: ''});
        }catch(err){
            console.log(err);
        }
    };

    // PROGRAM TAGGING PANEL
    const handleInsertingProgTag = async () => {
        if (!progTag.curriculum_id ||
            !progTag.year_level_id ||
            !progTag.semester_id ||
            !progTag.course_id
        ){
            alert("Please fill all field");
        }

        try{
            await axios.post('http://localhost:5000/program_tagging', progTag);
            setProgTag({curriculum_id: '', year_level_id: '', semester_id: '', course_id: ''});
        }catch(err){
            console.log(err);
        }
    }


    return(
        <div>
            <h1>Program and Course Management</h1>
            
            <div>
                <h1>Program Tagging Panel</h1>
                <div>
                    <select name="curriculum_id" id="curriculum_id" value={progTag.curriculum_id} onChange={handleChangesForEverything}>
                        {curriculumList.map((curriculumList)=> (
                            <option key={curriculumList.curriculum_id} value={curriculumList.curriculum_id}>{curriculumList.year_description}-{curriculumList.program_description} | {curriculumList.curriculum_id}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <select name="course_id" id="course_id" value={progTag.course_id} onChange={handleChangesForEverything}>
                        {courseList.map((course)=> (
                            <option key={course.course_id} value={course.course_id}>{course.course_code}-{course.course_description} | {course.course_id}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <select name="year_level_id" id="year_level_id" value={progTag.year_level_id} onChange={handleChangesForEverything}>
                        {yearLevelList.map((year)=> (
                            <option key={year.year_level_id} value={year.year_level_id}>{year.year_level_description}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <select name="semester_id" id="semester_id" value={progTag.semester_id} onChange={handleChangesForEverything}>
                        {semesterList.map((semester)=> (
                            <option key={semester.semester_id} value={semester.semester_id}>{semester.semester_description}</option>
                        ))}
                    </select>
                </div>
                <button onClick={handleInsertingProgTag}>Insert</button>
            </div>

            <div>
                <h1>Program Panel Form</h1>
                <div className="forDepartment">
                    <div className="textField">
                        <label htmlFor="dep_name">Program Description:</label>
                        <input type="text" id="dep_name" name="name" value={program.name} onChange={handleChangesForEverything} placeholder="Enter Program Descriptions" />
                    </div>
                    <div className="textField">
                        <label htmlFor="dep_name">Program Code:</label>
                        <input type="text" id="dep_code" name="code" value={program.code} onChange={handleChangesForEverything} placeholder="Enter Program Code" />
                    </div>
                    <button style={{ background: 'maroon', color: 'white' }} onClick={handleAddingProgram}>Insert</button>
                </div>
            </div>

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

            <div>
                <h1> Insert Curriculum</h1>
                <div className="textField">
                    <label htmlFor="year">Curriculum Year:</label>
                    <select name="year_id" id="year" value={curriculum.year_id} onChange={handleChangesForEverything}>
                        <option>Choose Year</option>
                        {yearList.map((year) => (
                            <option key={year.year_id} value={year.year_id}>{year.year_description}</option>
                        ))}
                    </select>
                </div>
                <div className="textField">
                    <label htmlFor="program">Program:</label>
                    <select name="program_id" id="program" value={curriculum.program_id} onChange={handleChangesForEverything}>
                        {programList.map((program) => (
                            <option key={program.program_id} value={program.program_id}>{program.program_description} | {program.program_code} | {program.program_id}</option>
                        ))}
                    </select>
                </div>
                <button style={{ background: 'maroon', color: 'white' }} onClick={handleAddingCurriculum}>Insert</button>
            </div>
        </div>
    )
}
export default CourseManagement;