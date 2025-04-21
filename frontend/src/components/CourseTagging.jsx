import React, { useEffect, useState } from "react";
import axios from 'axios';
import {
    Container,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    TableContainer,
    Paper,
    Button
} from "@mui/material";

const CourseTagging = () => {
    const [studentId, setStudentId] = useState('');
    const [message, setMessage] = useState('');
    const [enrolledStudent, setEnrolledStudent] = useState(null);
    const [courseList, setCourseList] = useState([]);
    const [enrolledSubjects, setEnrolledSubjects] = useState([]);

    const fetchCourse = async () => {
        try{
            const response = await axios.get('http://localhost:5000/courselist');
            setCourseList(response.data);
        }catch(err){
            console.log(err);
        }
    }

    const fetchEnrolledSubjects = async (studentID) => {
        try {
            const res = await axios.get(`http://localhost:5000/enrolled_subject_list?studentID=${studentID}`);
            setEnrolledSubjects(res.data);
        } catch (err) {
            setEnrolledStudent(null);
            setEnrolledSubjects([]);
            console.error("Error fetching enrolled subjects:", err);
        }
    };

    useEffect(() => {
        fetchCourse();
        fetchEnrolledSubjects();
    }, []);

    const handleSearch = async () => {
        if (!studentId) {
            setMessage('Please enter a student ID.');
            setEnrolledStudent(null);
            return;
        }

        try {
            const res = await axios.get(`http://localhost:5000/search_user?studentID=${studentId}`);
            setEnrolledStudent(res.data);
            setMessage('');

            await fetchEnrolledSubjects(studentId);
        } catch (err) {
            setEnrolledStudent(null);
            setEnrolledSubjects([]);
            if (err.response && err.response.status === 404) {
                setMessage('Student not found.');
            } else {
                setMessage('An error occurred while searching.');
            }
        }
    };

    const handleTagCourse = async (course) => {
        if (!enrolledStudent) return;
    
        const body = {
            curriculum_id: enrolledStudent.curriculum_id,
            course_id: course.course_id,
            student_number_id: enrolledStudent.student_id
        };
    
        try {
            await axios.post('http://localhost:5000/enrolled_subject', body);
            setEnrolledSubjects(prev => [...prev, course]);
        } catch (err) {
            console.error("Error tagging course:", err);
            alert("Something went wrong while tagging the course.");
        }
    };
    
    const handleRemoveSubject = async (id) => {
        try {
            console.log("Deleting subject ID:", id);
            await axios.delete(`http://localhost:5000/remove_enrolled_subjects/${id}`);
            setEnrolledSubjects(prev => prev.filter(subject => subject.id !== id));
        } catch (err) {
            console.error("Error removing subject:", err);
            alert("Something went wrong while removing the subject.");
        }
    };

    const filteredCourseList = courseList.filter(course => 
        !enrolledSubjects.some(enrolled => enrolled.course_id === course.course_id)
    );
    
    return (
        <Container style={{ display: 'flex', maxWidth: '100%' , alignItems: 'center'}}>
            <div style={{ padding: '2rem', width: '100%' }}>
                <h2>Search Enrolled Student</h2>
                <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="Enter student ID"
                    style={{ padding: '0.5rem', marginRight: '1rem' }}
                />
                <button onClick={handleSearch} style={{ padding: '0.5rem 1rem' }}>Search</button>
                {message && <p style={{ color: 'red' }}>{message}</p>}
                {enrolledStudent && (
                    <div style={{
                        marginTop: '1rem',
                        padding: '0.5rem 1rem',
                        background: 'white',
                        width: 'fit-content',
                        border: '1px black solid'
                    }}>
                        <div>
                            {enrolledStudent.last_name}, {enrolledStudent.first_name || 'N/A'} {enrolledStudent.middle_name || 'N/A'}  || Student Number: {enrolledStudent.student_id}<br />
                            {enrolledStudent.year_description}-{enrolledStudent.program_description}
                       </div>
                       <Table>
                            <TableHead sx={{width: 'fit-content'}}>
                                <TableRow sx={{width: 'fit-content'}}>
                                    <TableCell sx={{border:'solid black 1px', textAlign: 'center'}}>Course<br /> Code</TableCell>
                                    <TableCell sx={{border:'solid black 1px', textAlign: 'center'}}>Course <br />  Description</TableCell>
                                    <TableCell sx={{border:'solid black 1px', textAlign: 'center'}}>Enrolled <br />  Section</TableCell>
                                    <TableCell sx={{border:'solid black 1px', textAlign: 'center'}}>Enrolled <br />  Students</TableCell>
                                    <TableCell sx={{border:'solid black 1px', textAlign: 'center'}}>Remove<br /> Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {enrolledSubjects.map((subject) => (
                                    <TableRow key={subject.id}>
                                        <TableCell sx={{ textAlign: 'center' }}>{subject.course_code}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{subject.course_description}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>—</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>—</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>
                                            <Button color="error" variant="contained" onClick={() => handleRemoveSubject(subject.id)}>{subject.id}</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                       </Table>
                    </div>
                )}
            </div>
            <div>
                <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: 'auto', background: 'transparent'}}>
                    <Table stickyHeader sx={{ background: 'transparent'}}>
                        <TableHead sx={{ width: 'fit-content', background: 'transparent' }} >
                            <TableRow sx={{ width: 'fit-content' }}>
                                <TableCell sx={{ borderStyle: 'solid', borderColor:'black', borderWidth: '1px 0px 1px 1px', textAlign: 'center' }}>Course<br /> Code</TableCell>
                                <TableCell sx={{ borderStyle: 'solid', borderColor:'black', borderWidth: '1px 0px 1px 1px', textAlign: 'center' }}>Course <br /> Description</TableCell>
                                <TableCell sx={{ borderStyle: 'solid', borderColor:'black', borderWidth: '1px 0px 1px 1px', textAlign: 'center' }}>Tag Subject <br /> Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredCourseList.map((course) => (
                                <TableRow key={course.course_id} value={course.course_id}>
                                    <TableCell sx={{ borderStyle: 'solid', borderColor:'black', borderWidth: '0px 0px 1px 1px', textAlign: 'center' }}>{course.course_code}</TableCell>
                                    <TableCell sx={{ borderStyle: 'solid', borderColor:'black', borderWidth: '0px 0px 1px 1px', textAlign: 'center' }}>{course.course_description}</TableCell>
                                    <TableCell sx={{ borderStyle: 'solid', borderColor:'black', borderWidth: '0px 0px 1px 1px', textAlign: 'center' }}>
                                        <button style={{background: 'maroon', color: 'white'}} onClick={() => handleTagCourse(course)}>Tag</button> {/* Add a button or any action here */}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Container>
    );
};

export default CourseTagging;
