const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const webtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyparser = require('body-parser');

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
    database: 'earist_sis',
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

// CURRICULUM CREATION
app.post('/curriculum', (req, res) => {

})

// CURRICULUM LIST
app.get("/get_curriculum", (req, res) => {
    const getQuery = `
        SELECT 
            p.program_description, 
            p.program_code, 
            y.year_description, 
            d.dprtmnt_name, 
            ct.curriculum_id,
            dct.dprtmnt_id,
            dct.dprtmnt_curriculum_id
        FROM 
            program_table p
        INNER JOIN curriculum_table ct ON p.program_id = ct.program_id
        INNER JOIN year_table y ON ct.year_id = y.year_id
        INNER JOIN dprtmnt_curriculum_table dct ON ct.curriculum_id = dct.curriculum_id
        INNER JOIN dprtmnt_table d ON dct.dprtmnt_id = d.dprtmnt_id;
    `;

    db3.query(getQuery, (err, result) => {
        console.error("Database: ", err);
        if (err) return res.status(500).send(err);
        res.status(200).send(result);
    });
});

// COURSE TABLE
app.post('/adding_course', (req, res) => {
    const {course_code, course_description, course_unit, lab_unit} = req.body;

    const courseQuery = 'INSERT INTO course_table(course_code, course_description, subject_unit, lab_unit) VALUES (?,?,?,?)';
    db3.query(courseQuery, [course_code, course_description, course_unit, lab_unit], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(result);
    });
});

// COURSE LIST
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

/* ------------------------------------------- MIDDLE PART OF THE SYSTEM ----------------------------------------------*/


// PROFFESOR REGISTRATION
app.post('/register_prof', async (req, res) => {
    const {fname, mname, lname, email, password, department_id} = req.body;

    const hashedProfPassword = await bcrypt.hash(password, 10);
    
    const queryForProf = 'INSERT INTO prof_table (fname, mname, lname, email, password, status) VALUES (?,?,?,?,?,?)';
    
    db3.query(queryForProf, [fname, mname, lname, email, hashedProfPassword, 0], (err, result)=>{
        if (err) return res.status(500).send(err);
        
        const profID = result.insertId
        const queryProfDepartment = 'INSERT INTO dprtmnt_profs_table (dprtmnt_id, prof_id) VALUES (?,?)';
        
        db3.query(queryProfDepartment, [department_id, profID],(err, profDepartmentResult) => {
            if(err) return res.status(500).send(err);
            res.status(200).send(profDepartmentResult);
        });
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


// COURSE TAGGING

// FUTURE WORK
//I will create an api for user to sort the data in ascending or desceding order
// app.get('/', (req, res)=> {
// });
//I will create an api for edit and delete of data
//I will create an api for user to search data

app.listen(5000, () => {
    console.log('Server runnning');
});