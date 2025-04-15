import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Container, Table, TableHead, TableBody, TableCell, TableRow } from '@mui/material';
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

const DepartmentProf = () => {
    
    const [prof, setProf] = useState({
        fname: '',
        mname: '',
        lname: '',
        email: '',
        password: '',
        department_id: '',
    });
    const [profList, setProfList] = useState([]);
    const [departmentList, setDepartmentList] = useState([]);
    const [expandedDepartmentProf, setExpandedDepartmentProf] = useState(null);  
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);  

    //Fetch Department Data
    const fetchDepartment = async () => {
        try {
        const response = await axios.get('http://localhost:5000/get_department');
        setDepartmentList(response.data);
        } catch (err) {
        console.error(err);
        }
    };

    const fetchProf = async (departmentId) => {
        try {
          const response = await axios.get(`http://localhost:5000/get_prof?department_id=${departmentId}`);
          console.log("Prof for department:", response.data);
          setProfList(response.data);
        } catch (err) {
          console.log(err);
        }
      };

    useEffect(() => {
        fetchDepartment();
    }, []);

    useEffect(() => {
        if (selectedDepartmentId) {
          fetchProf(selectedDepartmentId);
        }
    }, [selectedDepartmentId]);

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setProf(prev => ({
        ...prev,
        [name]: value
        }));
    }
    
    const handleProfRegistration = async (event) => {
        event.preventDefault();
        try{
            await axios.post('http://localhost:5000/register_prof', prof);
            fetchProf(selectedDepartmentId);
            setProf({fname: '', mname: '', lname: '', email: '', password: '', department_id: ''});
        }catch(err){
            console.log(err);
        }
    }

    const handleDropDownForProf = (departmentId) => {
        setExpandedDepartmentProf(expandedDepartmentProf === departmentId ? null : departmentId);
    };

    const statusConverter = () => {
        if(profList.status == 0){
            return "Active"
        } else{
            return "Inactive"
        }
    }

    return(
        <Container>
            <div>
                <form method="post" onSubmit={handleProfRegistration}>
                    <div className="textfield">
                        <label htmlFor="fname">First Name: </label>
                        <input type="text" id='fname' name='fname' value={prof.fname} onChange={handleChanges} />
                    </div>
                    <div className="textfield">
                        <label htmlFor="mname">Middle Name: </label>
                        <input type="text" id='mname' name='mname' value={prof.mname} onChange={handleChanges} />
                    </div>
                    <div className="textfield">
                        <label htmlFor="lname">Last Name: </label>
                        <input type="text" id='lname' name='lname' value={prof.lname} onChange={handleChanges} />
                    </div>
                    <div className="textfield">
                        <label htmlFor="email">Email Address: </label>
                        <input type="text" id='email' name='email' value={prof.email} onChange={handleChanges} />
                    </div>
                    <div className="textfield">
                        <label htmlFor="password">Password: </label>
                        <input type="password" id='password' name='password' value={prof.password} onChange={handleChanges} />
                    </div>
                    <div>
                    <select name="department_id" id="departmentSelection" value={prof.department_id} onChange={handleChanges}>
                        <option value="">Select a Department</option>
                        {departmentList.map((department) => (
                            <option key={department.dprtmnt_id} value={department.dprtmnt_id}>
                            {department.dprtmnt_name}
                            </option>
                        ))}
                     </select>
                    </div>
                    <input type="submit" value="Register" />
                </form>
                <div>
                    {departmentList.map((department) => (
                    <div key={department.dprtmnt_id}>
                        <div
                        className="items"
                        onClick={() => {
                            setSelectedDepartmentId(department.dprtmnt_id);
                            handleDropDownForProf(department.dprtmnt_id);
                        }}
                        >
                        <span className="name">
                            <p>{department.dprtmnt_name}</p>
                        </span>
                        <i>
                            {expandedDepartmentProf === department.dprtmnt_id ? <ArrowDropUp /> : <ArrowDropDown />}
                        </i>
                        </div>

                        
                        {expandedDepartmentProf === department.dprtmnt_id && (
                        profList.length > 0 ? (
                            <Table style={{width: 'fit-content'}}>
                                <TableHead>
                                    <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Middle Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {profList.map((prof) => (
                                    <TableRow key={prof.prof_id}>
                                        <TableCell>{prof.prof_id}</TableCell>
                                        <TableCell>{prof.fname}</TableCell>
                                        <TableCell>{prof.mname}</TableCell>
                                        <TableCell>{prof.lname}</TableCell>
                                        <TableCell>{statusConverter(prof.status)}</TableCell>
                                        <TableCell>
                                            <button style={{background: 'maroon', color: 'white'}}>Edit</button>
                                        </TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <p>No Registered prof in this department.</p>
                        )
                        )}
                    </div>
                    ))}
                </div>
            </div>
        </Container>
    )
}

export default DepartmentProf