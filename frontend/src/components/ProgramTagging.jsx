import React, {useState, useEffect} from "react";
import axios from 'axios';

const ProgramTagging = () => {
    const [progTag, setProgTag] = useState({
            curriculum_id: '',
            year_level_id: '',
            semester_id: '',
            course_id: '',
    });

    const [courseList, setCourseList] = useState([]);
        // PROGRAM TAGGING PANEL
        const [yearLevelList, setYearlevelList] = useState([]);
        // PROGRAM TAGGING PANEL
        const [semesterList, setSemesterList] = useState([]);
        // PROGRAM TAGGING PANEL
        const [curriculumList, setCurriculumList] = useState([]);

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
          }, []);

        const handleChangesForEverything = (e) => {
            const { name, value } = e.target;
            // PROGRAM TAGGING PANEL
        setProgTag(prev => ({
            ...prev,
            [name]: value
        }));

    };
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

        </div>
        )
}
export default ProgramTagging;
