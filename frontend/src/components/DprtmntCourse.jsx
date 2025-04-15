import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Container, Table, TableHead, TableBody, TableRow, TableCell, TextField } from '@mui/material';

const DepartmentCourse = () => {
    
    const [course, setCourse] = useState({
        course_code: '',
        course_description: '', 
        course_unit: '', 
        lab_unit: '', 
        curriculum_id: '', 
        year_level_id: '', 
        semester_id: '',
    });

    const [courseList, setCourseList] = useState([]);
    const [yearLevelList, setYearlevelList] = useState([]);
    const [semesterList, setSemesterList] = useState([]);
    const [curriculumList, setCurriculumList] = useState([]);

    const fetchYearLevel = async () => {
        try{
            const response = await axios.get('http://localhost:5000/get_year_level');
            setYearlevelList(response.data);
        }catch(err){
            console.log(err);
        }
    }

    const fetchSemester = async () => {
        try{
            const response = await axios.get('http://localhost:5000/get_semester');
            setSemesterList(response.data);
        }catch(err){
            console.log(err);
        }
    }

    const fetchCurriculum = async () => {
        try {
          const response = await axios.get('http://localhost:5000/get_curriculum');
          setCurriculumList(response.data);
        } catch (err) {
          console.log(err);
        }
    };

    const fetchCourse = async () => {
        try {
            const response = await axios.get('http://localhost:5000/get_course');
            setCourseList(response.data);
          } catch (err) {
            console.log(err);
          }
    }

    useEffect(()=>{
        fetchYearLevel();
        fetchSemester();
        fetchCurriculum();
        fetchCourse();
    }, []);

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setCourse(prev => ({
          ...prev,
          [name]: value
        }));
    };

    const handleAddingCourse = async (event) => {
        event.preventDefault();
        try{
            await axios.post('http://localhost:5000/adding_course', course);
            
            setCourse({course_code: '', course_description: '', course_unit: '', lab_unit: '', curriculum_id: '', year_level_id: '', semester_id: ''});
        }catch(err){
            console.log(err);
        }
    }

    return(
        <Container>
            <form method="post" onSubmit={handleAddingCourse}>
                <div>
                    <div>
                        <label htmlFor="course_description">Course Name:</label>
                        <input type="text" id='course_description' name='course_description' value={course.course_description} onChange={handleChanges}/>
                    </div>
                    <div>
                        <label htmlFor="course_code">Course Code:</label>
                        <input type="text" id='course_code' name='course_code' value={course.course_code} onChange={handleChanges}/>
                    </div>
                    <div>
                        <label htmlFor="course_unit">Course Unit:</label>
                        <input type="text" id='course_unit' name='course_unit' value={course.course_unit} onChange={handleChanges}/>
                    </div>
                    <div>
                        <label htmlFor="lab_unit">Laboratory Unit:</label>
                        <input type="text" id='lab_unit' name='lab_unit' value={course.lab_unit} onChange={handleChanges}/>
                    </div>
                    <div>
                        <label htmlFor="year_level">Year Level: </label>
                        <select name="year_level_id" id="year_level" value={course.year_level_id} onChange={handleChanges}>
                            <option value="">Choose Year Level</option>
                            {yearLevelList.map((yearLevel) => (
                                <option key={yearLevel.year_level_id} value={yearLevel.year_level_id}>
                                    {yearLevel.year_level_description}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="semester">Semester: </label>
                        <select name="semester_id" id="semester" value={course.semester_id} onChange={handleChanges}>
                            <option value="">Choose the Semester</option>
                            {semesterList.map((semester) => (
                                <option key={semester.semester_id} value={semester.semester_id}>
                                    {semester.semester_description}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="curriculum">Curriculum: </label>
                        <select name="curriculum_id" id="curriculum" value={course.curriculum_id} onChange={handleChanges}>
                            <option value="">Choose which Curriculum</option>
                            {curriculumList.map((curriculum) => (
                                <option key={curriculum.curriculum_id} value={curriculum.curriculum_id}>
                                    {curriculum.program_description} ({curriculum.program_code} - {curriculum.year_description})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <input type="submit" value='Submit'/>
            </form>
            <div>
                <span>Courses:</span>
                <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course Description</TableCell>
              <TableCell>Course Code</TableCell>
              <TableCell>Course Unit</TableCell>
              <TableCell>Program</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Year Level</TableCell>
              <TableCell>Semester</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courseList.map((course) => (
              <TableRow key={course.course_id}>
                <TableCell>
                  <TextField
                    variant="standard"
                    name="course_description"
                    value={course.course_description}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    name="course_code"
                    value={course.course_code}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    name="course_unit"
                    value={course.course_unit}
                  />
                </TableCell>
                <TableCell style={{width: 'fit-content'}}>
                  <TextField
                    variant="standard"
                    name="program_description"
                    value={course.program_description}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    name="year_description"
                    value={course.year_description}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    name="course_year_level"
                    value={course.year_level_description}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    name="course_semester"
                    value={course.semester_description}
                  />
                </TableCell>
                <TableCell>
                    <button style={{background: 'maroon', color: 'white'}}>Edit</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
            </div>
        </Container>
    )
}

export default DepartmentCourse