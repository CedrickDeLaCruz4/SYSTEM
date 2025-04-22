const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const webtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyparser = require('body-parser');
require("dotenv").config();
const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));

//MYSQL CONNECTION FOR ADMISSION
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'admission',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

//MYSQL CONNECTION FOR ENROLLMENT
const db2 = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'enrollment',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

//MYSQL CONNECTION FOR ROOM MANAGEMENT AND OTHERS
const db3 = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cmu_mis',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});


/*--------------------------------------------------*/ 

//ADMISSION
//REGISTER
app.post("/register", async (req, res) => {
    const {username, email, password} = req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.beginTransaction((err) => {
            if (err) return db.rollback(() => res.status(500).send({ message: "Transaction start failed" })); 
            
            const query1 = 'INSERT INTO person_table () VALUES ()';
            
            db.query(query1, (err, result) => {
                if (err) return db.rollback(() => res.status(500).send({ message: "Error creating person_id" })); 
            
                const person_id = result.insertId;
                
                const query2 = 'INSERT INTO user_accounts (person_id, username, email, password) VALUES (?, ?, ?, ?)';
 
                db.query(query2, [person_id, username, email, hashedPassword], (err, result) => {
                    if (err) return db.rollback(() => res.status(500).send({ message: "Error inserting user data" })); 
                
                    db.commit((err) => {
                        if (err) return db.rollback(() => res.status(500).send({ message: "Transaction commit failed" }));
                        res.status(201).send({ message: "Registration successful!", person_id });
                    });
                });
            });
        });
    } 
    catch(error) {
        res.status(500).send({message: "Internal Server Error"});
    }
});

//READ
app.get('/admitted_users', (req, res) => {
    const query = 'SELECT * FROM users_account';

    db.query(query, (err,result) => {
        if (err) return res.status(500).send({message: 'Error Fetching data from the server'});
        res.status(200).send(result);
    });
});

//TRANSFER ENROLLED USER INTO ENROLLMENT
app.post('/transfer', async (req, res) => {
    const { person_id } = req.body;

    const fetchQuery = 'SELECT * FROM users_account WHERE person_id = ?';

    db.query(fetchQuery, [person_id], (err, result) => {
        if (err) return res.status(500).send({ message: "Error fetching data from admission DB", error: err });

        if (result.length === 0) {
            return res.status(404).send({ message: "User not found in admission DB" });
        }

        const user = result[0];
        
        const insertPersonQuery = 'INSERT INTO person_table (first_name, middle_name, last_name) VALUES (?, ?, ?)';

        db2.query(insertPersonQuery, [user.first_name, user.middle_name, user.last_name], (err, personInsertResult) => {
            if (err) {
                console.log("Error inserting person:", err);
                return res.status(500).send({ message: "Error inserting person data", error: err });
            }

            const newPersonId = personInsertResult.insertId;

            const insertUserQuery = 'INSERT INTO user_accounts (person_id, email, password) VALUES (?, ?, ?)';

            db2.query(insertUserQuery, [newPersonId, user.email, user.password], (err, insertResult) => {
                if (err) {
                    console.log("Error inserting user:", user.email, err);
                    return res.status(500).send({ message: "Error inserting user account", error: err });
                } else {
                    console.log("User transferred successfully:", user.email);
                    return res.status(200).send({ message: "User transferred successfully", email: user.email });
                }
            });
        });
    });
});


/*---------------------------  ENROLLMENT -----------------------*/ 


//LOGIN
app.post("/login", (req, res) => {
    const {email, password} = req.body;

    const query = 'SELECT * FROM user_accounts WHERE email = ?';

    db2.query(query, [email], async (err, result) => {
        if (err) return res.status(500).send(err);

        if (result.length === 0) return res.status(400).send({message: 'Users not found...'});

        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) return res.status(400).send({message: 'Invalid Credentials'});

        const token = webtoken.sign({
            id: user.id,
            person_id: user.person_id,
            username: user.username,
            email: user.email,
        },
            'secret', { expiresIn: '1h'}
        );
        res.status(200).send({token, user: {person_id: user.person_id, username: user.username, email: user.email}});
    }); 
});

//READ ENROLLED USERS 
app.get('/enrolled_users', (req, res) => {
    const query = 'SELECT * FROM user_accounts';

    db2.query(query, (err,result) => {
        if (err) return res.status(500).send({message: 'Error Fetching data from the server'});
        res.status(200).send(result);
    });
});

// SEARCH ENROLLED USERS (NEW!!)
app.get('/search_user', (req, res) => {
    const { studentID } = req.query;
    
    const query = `
        SELECT 
            snt.id AS student_id,
            snt.person_id,
            pt.first_name,
            pt.middle_name,
            pt.last_name,
            ct.curriculum_id,
            yt.year_description,
            prt.program_description
        FROM 
            earist_sis.student_numbering_table snt
        INNER JOIN 
            enrollment.person_table pt ON snt.person_id = pt.person_id
        INNER JOIN 
            earist_sis.student_curriculum_table sct ON sct.student_numbering_id = snt.id
        INNER JOIN 
            earist_sis.curriculum_table ct ON ct.curriculum_id = sct.curriculum_id
        INNER JOIN 
            earist_sis.year_table yt ON yt.year_id = ct.year_id
        INNER JOIN 
            earist_sis.program_table prt ON prt.program_id = ct.program_id
        WHERE 
            snt.id = ?
    `;

    db3.query(query, [studentID], (err, result) => {
        if (err) return res.status(500).send({ message: 'Database error', error: err });
        if (result.length === 0) return res.status(404).send({ message: 'User not found' });
        res.status(200).send(result[0]);
    });
});

// DEPARTMENT CREATION
app.post('/department', (req, res) => {
    const { dep_name, dep_code } = req.body;
    const query = 'INSERT INTO dprtmnt_table (dprtmnt_name, dprtmnt_code) VALUES (?, ?)';
    db3.query(query, [dep_name, dep_code], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send({ insertId: result.insertId });
    });
});

// DEPARTMENT LIST
app.get('/get_department', (req, res) => {
    const getQuery = 'SELECT * FROM dprtmnt_table';

    db3.query(getQuery, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(result);
    });
});

// UPDATE DEPARTMENT (SUPERADMIN)
app.put('/update_department/id', (req, res) => {
    const {id, dep_name, dep_code} = req.body;
    const updateQuery = 'UPDATE '

    db3.query(updateQuery, [id, dep_name, dep_code], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(result); 
    })
})

// DELETE DEPARTMENT (SUPERADMIN)
app.delete('/delete_department/id', (req, res) => {
    const {id} = req.query;
    const deleteQuery = 'DELETE'
    db3.query(deleteQuery, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(result); 
    })
})

// PROGRAM CREATION
app.post('/program', (req, res) => { 
    const { name, code } = req.body;

    const insertProgramQuery = 'INSERT INTO program_table (program_description, program_code) VALUES (?, ?)';

    db3.query(insertProgramQuery, [name, code], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(result);
    });
});

// PROGRAM TABLE
app.get('/get_program', (req, res) => {
    const programQuery = 'SELECT * FROM program_table';
    db3.query(programQuery, (err, result) => {
     if (err) return res.status(500).send(err);
     res.status(200).send(result);
    })
});

// UPDATE PROGRAM (SUPERADMIN)
app.put('/update_program/id', (req, res) => {
    const {id, name, code} = req.body;
    const updateQuery = 'UPDATE '

    db3.query(updateQuery, [id, name, code], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(result); 
    })
})

// DELETE PROGRAM (SUPERADMIN)
app.delete('/delete_program/id', (req, res) => {
    const {id} = req.query;

    const deleteQuery = 'DELETE'
    db3.query(deleteQuery, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(result); 
    })
})

// CURRICULUM CREATION
app.post('/curriculum', (req, res) => {
    const {year_id, program_id} = req.body;

    const insertQuery = 'INSERT INTO curriculum_table(year_id, program_id) VALUES (?,?)';

    db3.query(insertQuery, [year_id, program_id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(result); 
    })
})

// CURRICULUM LIST
app.get('/get_curriculum', (req, res) => {
    const readQuery = `
        SELECT ct.*, p.*, y.* 
        FROM curriculum_table ct 
        INNER JOIN program_table p ON ct.program_id = p.program_id
        INNER JOIN year_table y ON ct.year_id = y.year_id
    `;

    db3.query(readQuery, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(result); 
    });
});

// UPDATE CURRICULUM (SUPERADMIN)

// DELETE CURRICULUM (SUPERADMIN)

// COURSE TABLE
app.post('/adding_course', (req, res) => {
    const {course_code, course_description, course_unit, lab_unit} = req.body;

    const courseQuery = 'INSERT INTO course_table(course_code, course_description, subject_unit, lab_unit) VALUES (?,?,?,?)';
    db3.query(courseQuery, [course_code, course_description, course_unit, lab_unit], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(result);
    });
});

// READ COURSE
app.get('/courselist', (req, res) => {
    const readQuery = 'SELECT * FROM program_tagging_table as ptt INNER JOIN course_table as ct ON ptt.course_id = ct.course_id ';
    db3.query(readQuery, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(result);
    });
});

// UPDATE COURSE (SUPERADMIN)

// DELETE COURSE (SUPERADMIN)

// GET COURSES BY CURRICULUM ID
app.get('/get_courses_by_curriculum/:curriculum_id', (req, res) => {
    const { curriculum_id } = req.params;
    
    const query = `
        SELECT c.* FROM program_tagging_table pt
        INNER JOIN course_table c ON pt.course_id = c.course_id
        WHERE pt.curriculum_id = ?
    `;

    db3.query(query, [curriculum_id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(result);
    });
});

// COURSE TAGGING LIST
app.get('/get_course', (req, res) => {
    const getCourseQuery = `
        SELECT 
            yl.*, st.*, c.*
        FROM program_tagging_table pt
        INNER JOIN year_level_table yl ON pt.year_level_id = yl.year_level_id
        INNER JOIN semester_table st ON pt.semester_id = st.semester_id
        INNER JOIN course_table c ON pt.course_id = c.course_id
    `;

    db3.query(getCourseQuery, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        res.status(200).send(results);
    });
});

// PROGRAM TAGGING TABLE
app.post('/program_tagging', (req, res) => {
    const {curriculum_id, year_level_id, semester_id, course_id} = req.body;

    const progTagQuery = 'INSERT INTO program_tagging_table (curriculum_id, year_level_id, semester_id, course_id) VALUES (?,?,?,?)';
    db3.query(progTagQuery, [curriculum_id, year_level_id, semester_id, course_id], (err,result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(result);
    });
});

// YEAR LIST
app.get('/year', (req, res) => {
    const getQuery = 'SELECT * FROM year_table';
    db3.query(getQuery, (err, result) => {
        if(err) return res.status(500).send(err);
        res.status(200).send(result);
    });
});

// YEAR LEVEL TABLE
app.get('/get_year_level', (req, res) => {
    const query = 'SELECT * FROM year_level_table';
    db3.query(query, (err,result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(result);
    });
});

// SEMESTER TABLE
app.get('/get_semester', (req, res) => {
    const query = 'SELECT * FROM semester_table';
    db3.query(query, (err,result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(result);
    });
});

// INSERT SELECTED ENROLLED SUBJECT (NEW!!)
app.post('/enrolled_subject', (req, res) => {
    const {curriculum_id, course_id, student_number_id} = req.body;
    
    const insertQuery = 'INSERT INTO enrolled_subject (curriculum_id, course_id, student_number, active_school_year_id) VALUES (?, ?, ?, NULL)';

    db3.query(insertQuery, [curriculum_id, course_id, student_number_id], (err,result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(result);   
    });
});

// INSERT ALL ENROLLED SUBJECT (NEW!!)
app.post('/enrolled_all_subjects', (req, res) => {
    const {curriculum_id, course_ids, student_number_id, semester, year_level} = req.body;
    if(semester === 1 && year_level === 1){

    
    const insertQuery = 'INSERT INTO enrolled_subject (curriculum_id, course_id, student_number, active_school_year_id)  VALUES ?';

    const values = course_ids.map(course_id => [curriculum_id, course_id, student_number_id, ,null]);


    db3.query(insertQuery, [values], (err,result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(result);
    });
} else { res.status(400).json({ message: "No subjects to enroll for the selected semester and year level." });}
});

// ENROLLED SUBJECT LIST (NEW!!)
app.get('/enrolled_subject_list', (req, res) => {
    const studentID = req.query.studentID;

    const sql = `
        SELECT 
            es.id,
            c.course_id,
            c.course_code,
            c.course_description
        FROM 
            enrolled_subject es
        INNER JOIN 
            course_table c ON es.course_id = c.course_id
        WHERE 
            es.student_number = ?
    `;

    db3.query(sql, [studentID], (err, results) => {
        if (err) return res.status(500).json({ error: 'Server error' });
        res.status(200).send(results);
    });
});

// DELETE SELECTED ENROLLED SUBJECT (NEW!!)
app.delete('/remove_enrolled_subjects/:id', (req, res) => {
    const {id} = req.params;

    const deleteQuery = 'DELETE FROM enrolled_subject WHERE id = ?'

    db3.query(deleteQuery, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error removing subject.' });
        }
        res.status(200).json(result);
    });
});

// DELETE ALL ENROLLED SUBJECT (NEW!!)
app.delete('/remove_all_enrolled_subjects', (req, res) => {
    const { student_number_id, curriculum_id } = req.body;

    const deleteQuery = `
        DELETE FROM enrolled_subject 
        WHERE student_number = ? AND curriculum_id = ?
    `;

    db3.query(deleteQuery, [student_number_id, curriculum_id], (err, result) => {
        if (err) {
            console.error('Delete error:', err);
            return res.status(500).json({ message: 'Error removing all enrolled subjects.' });
        }
        res.status(200).json({ message: 'All enrolled subjects removed.', result });
    });
});



// ROOM CREATION
app.post('/room', (req, res) => {
    const { room_name, department_id } = req.body;

    if(department_id === ''){
        return console.log("No department id received");
    };

    const insertRoomQuery = 'INSERT INTO room_table (room_description) VALUES (?)';
    db3.query(insertRoomQuery, [room_name], (err, roomResult) => {
        if (err) return res.status(500).send(err);

        const room_id = roomResult.insertId;

        const linkRoomQuery = 'INSERT INTO dprtmnt_room_table (dprtmnt_id, room_id, lock_status) VALUES (?, ?, 0)';
        db3.query(linkRoomQuery, [department_id, room_id], (err, linkResult) => {
            if (err) return res.status(500).send(err);

            res.status(200).send({ roomId: room_id, linkId: linkResult.insertId });
        });
    });
});

// ROOM LIST
app.get('/get_room', (req, res) => {
    const { department_id } = req.query;

    const getRoomQuery = `
        SELECT r.room_id, r.room_description, d.dprtmnt_name
        FROM room_table r
        INNER JOIN dprtmnt_room_table drt ON r.room_id = drt.room_id
        INNER JOIN dprtmnt_table d ON drt.dprtmnt_id = d.dprtmnt_id
        WHERE drt.dprtmnt_id = ? 
    `;
    
    db3.query(getRoomQuery, [department_id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(result);
    });
});

// UPDATE ROOM (SUPERADMIN)

// DELETE ROOM (SUPERADMIN)

// SECTIONS
app.post('/section_table', (req, res) => {
    const { description } = req.body;
    if (!description) {
      return res.status(400).send('Description is required');
    }
  
    const query = 'INSERT INTO section_table (section_description) VALUES (?)';
    db3.query(query, [description], (err, result) => {
      if (err) {
        console.error('Error inserting section:', err);
        return res.status(500).send('Internal Server Error');
      }
      res.status(201).send(result);
    });
  });

// SECTIONS LIST
app.get('/section_table', (req, res) => {
    const query = 'SELECT * FROM section_table';
    db3.query(query, (err, result) => {
      if (err) {
        console.error('Error fetching sections:', err);
        return res.status(500).send('Internal Server Error');
      }
      res.status(200).send(result);
    });
  });

// UPDATE SECTIONS (SUPERADMIN)

// DELETE SECTIONS (SUPERADMIN)

// DEPARTMENT SECTIONS
app.post('/department_section', (req, res) => {
    const { curriculum_id, section_id } = req.body;

    const query = 'INSERT INTO dprmnt_section (curriculum_id, section_id, dsstat) VALUES (?,?,0)';
    db3.query(query, [curriculum_id, section_id], (err, result) => {
      if (err) {
        console.error('Error inserting section:', err);
        return res.status(500).send('Internal Server Error');
      }
      res.status(201).send(result);
    });
  });


/* ------------------------------------------- MIDDLE PART OF THE SYSTEM ----------------------------------------------*/


// PROFFESOR REGISTRATION
app.post('/register_prof', async (req, res) => {
    const {fname, mname, lname, email, password} = req.body;

    const hashedProfPassword = await bcrypt.hash(password, 10);
    
    const queryForProf = 'INSERT INTO prof_table (fname, mname, lname, email, password, status) VALUES (?,?,?,?,?,?)';
    
    db3.query(queryForProf, [fname, mname, lname, email, hashedProfPassword, 0], (err, result)=>{
        if (err) return res.status(500).send(err);
        res.status(200).send(result);
        // const profID = result.insertId
        // const queryProfDepartment = 'INSERT INTO dprtmnt_profs_table (dprtmnt_id, prof_id) VALUES (?,?)';
        
        // db3.query(queryProfDepartment, [department_id, profID],(err, profDepartmentResult) => {
        //     if(err) return res.status(500).send(err);
        //     res.status(200).send(profDepartmentResult);
        // });

    });
});

app.post("/login_prof", (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    const sql = `SELECT prof_table.*, time_table.*
    FROM prof_table
    INNER JOIN time_table ON prof_table.prof_id = time_table.professor_id
    WHERE prof_table.email = ?`;
    db3.query(sql, [email], async (err, results) => {
      if (err || results.length === 0) {
        return res.status(400).json({ message: "Invalid username or password" });
      }
  
      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid username or password" });
      }
  
      const token = webtoken.sign(
        { prof_id: user.prof_id, fname: user.fname, mname: user.mname, lname: user.lname, email: user.email, school_year_id: user.school_year_id},  // role is included in the token
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      // Log to confirm that role is included in the response
      console.log("Login response:", { token, prof_id: user.prof_id, email: user.email, });
  
      const mappings = results.map(row => ({
        department_section_id: row.department_section_id,
        subject_id: row.subject_id
      }));

      res.json({
        message: "Login successful",
        token,
        prof_id: user.prof_id,
        fname: user.fname, 
        mname: user.mname, 
        lname: user.lname, 
        email: user.email,
        subject_section_mappings: mappings,
        school_year_id: user.school_year_id
      });
    });
  });

  app.get('/get_enrolled_students/:subject_id/:department_section_id/:active_school_year_id', (req, res) => {
    const { subject_id, department_section_id, active_school_year_id } = req.params;
    console.log(subject_id)
    console.log(active_school_year_id)
    console.log(department_section_id)
    const filterStudents = `
      SELECT time_table.*, enrolled_subject.*
      FROM time_table
      INNER JOIN enrolled_subject
      ON time_table.subject_id = enrolled_subject.subject_id
      AND time_table.department_section_id = enrolled_subject.department_section_id
      AND time_table.school_year_id = enrolled_subject.active_school_year_id
      WHERE time_table.subject_id = ? AND time_table.department_section_id = ? AND time_table.school_year_id = ?
    `;
  
    db3.query(filterStudents, [subject_id, department_section_id, active_school_year_id], (err, result) => {
      if (err) {
        console.error("Query failed:", err);
        return res.status(500).json({ message: "Server error while fetching students." });
      }
  
      if (result.length === 0) {
        return res.status(404).json({ message: "No students found for this subject-section combo." });
      }
  
      res.json(result);
    });
  });
  


// PROFESSOR LIST
app.get('/get_prof', (req, res) => {
    const {department_id} = req.query;

    const getProfQuery = `
    SELECT p.*, d.dprtmnt_name
    FROM prof_table p
    INNER JOIN dprtmnt_profs_table dpt ON p.prof_id = dpt.prof_id
    INNER JOIN dprtmnt_table d ON dpt.dprtmnt_id = d.dprtmnt_id
    WHERE dpt.dprtmnt_id = ?
    `;

    db3.query(getProfQuery, [department_id], (err,result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(result);
    });
});

// UPDATE PROFESSOR (SUPERADMIN)

// DELETE PROFESSOR (SUPERADMIN)

// FUTURE WORK
//I will create an api for user to sort the data in ascending or desceding order
// app.get('/', (req, res)=> {
// });
//I will create an api for edit and delete of data
//I will create an api for user to search data

app.listen(5000, () => {
    console.log('Server runnning');
});