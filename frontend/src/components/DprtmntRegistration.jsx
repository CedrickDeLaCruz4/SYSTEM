import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Container, Dialog, DialogTitle, DialogActions, DialogContent, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { ArrowDropDown, ArrowDropUp, MoreVert } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

import '../styles/DprtmntRegistration.css';

const DepartmentRegistration = () => {

  const [department, setDepartment] = useState({
    dep_name: '',
    dep_code: ''
  });

  const [curriculum, setCurriculum] = useState({
    name: '',
    code: '',
    year: '',
    department_id: '',
  });

  const [departmentList, setDepartmentList] = useState([]);
  const [curriculumList, setCurriculumList] = useState([]);
  const [yearOptionList, setYearOptionList] = useState([]);

  const [yearHasBeenClicked, setYearHasBeenClicked] = useState(false);
  const [expandedDepartment, setExpandedDepartment] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  //Fetch Department Data
  const fetchDepartment = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get_department');
      setDepartmentList(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  //Fetch Department Curriculum and its data
  const fetchCurriculum = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get_curriculum');
      setCurriculumList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  //Fetch Year Data
  const fetchYear = async () => {
    try {
      const response = await axios.get('http://localhost:5000/year');
      setYearOptionList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  //Update the page without needing to refresh
  useEffect(() => {
    fetchCurriculum();
    fetchDepartment();
    fetchYear();
  }, []);

  //Handle the creation and adding of department
  const handleAddingDepartment = async () => {
    if (!department.dep_name || !department.dep_code) {
      alert('Please fill all field');
    }

    else {
      try {
        await axios.post('http://localhost:5000/department', department);
        fetchDepartment();
        setDepartment({ dep_name: '', dep_code: '' });
        setOpenModal(false);
      } catch (err) {
        console.error(err);
      }
    }
  }

  //Handle the creation and adding of Curriculum
  const handleAddingCurriculum = async () => {
    if (!curriculum.name ||
      !curriculum.code ||
      !curriculum.year) {
      alert("Please fill all field");
    }

    else {
      try {
        await axios.post('http://localhost:5000/curriculum', curriculum);
        fetchCurriculum();
        setCurriculum({ name: '', code: '', year: '', department_id: '' });
        setOpenModal2(false);
      } catch (err) {
        console.error(err);
      }
    }
  }

  //Handle the form changes of everything
  const handleChangesForEverything = (e) => {
    const { name, value } = e.target;

    //For Department
    setDepartment(prev => ({
      ...prev,
      [name]: value
    }));

    //For Curriculum
    setCurriculum(prev => ({
      ...prev,
      [name]: value
    }));
  };

  //Function for opening the department modal
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  //Function for opening the course modal
  const handleOpenModal2 = (dprtmnt_id) => {
    setCurriculum(prev => ({
      ...prev,
      department_id: dprtmnt_id
    }));
    setOpenModal2(true);
  };

  //Function that handle the closing of modals
  const handleCloseModal = () => {
    setOpenModal(false);
    setOpenModal2(false);
    setOpenMenu(null);
  };

  const handleEditProgram = () => {
    onEdit(); // Call your edit logic
    handleCloseMenu();
  };




  //Handle the drop down of items
  const handleDropDown = (dprtmnt_id) => {
    setExpandedDepartment(expandedDepartment === dprtmnt_id ? null : dprtmnt_id);
  };

  //Handle the displaying of menu
  const handleOpenMenu = (event) => {
    setOpenMenu(event.currentTarget);
  };

  //Handle the toggle readOnlyMode(true) and labelMode(false)
  const handleYearClick = () => {
    if (!yearHasBeenClicked) {
      setYearHasBeenClicked(true);
    }
  };

  return (
    <Container className="container">

      {/* For Displaying Department and its Program*/}
      <div className="departmentList">

        <div className="header">
          <p>Departments</p>
          <button className="plusIcon" onClick={handleOpenModal}>Add Department</button>
        </div>

        <div className="main">
          {/*For Displaying Department Data */}
          {departmentList.map((department) => (
            <div className="mainList" key={department.dprtmnt_id}>
              <div className="department">

                <div className="items" onClick={() => handleDropDown(department.dprtmnt_id)}>
                  <span className="name">
                    <strong>{department.dprtmnt_name}</strong>
                    (<p>{department.dprtmnt_code}</p>)
                  </span>
                  <i>
                    <button style={{ marginRight: '1rem' }} onClick={() => handleOpenModal2(department.dprtmnt_id)}>Add Program</button>
                    {expandedDepartment === department.dprtmnt_id ? <ArrowDropDown /> : <ArrowDropUp />}
                  </i>
                </div>

                {/* For Displaying Curriculum Data */}
                {expandedDepartment === department.dprtmnt_id && (
                  <div className="curriculumList">

                    {curriculumList
                      .filter((curriculum) => curriculum.dprtmnt_id === department.dprtmnt_id)
                      .map((curriculum) => (

                        <div key={curriculum.dprtmnt_curriculum_id} className="curriculum">
                          <div className="items">
                            <span className="name">
                              <p>{curriculum.program_description} ({curriculum.program_code}-{curriculum.year_description})</p>
                            </span>
                            <i id="menu" aria-controls={handleOpenMenu ? 'menu' : undefined} aria-haspopup="true" aria-expanded={handleOpenMenu ? 'true' : undefined}>
                              <MoreVert onClick={handleOpenMenu} />
                            </i>
                          </div>
                        </div>

                      ))}

                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* For Department */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle className="dialogTitle">Add New Department <CloseIcon fontSize="medium" className="cancelIcon" onClick={handleCloseModal} /></DialogTitle>
        <DialogContent>
          <div className="forDepartment">
            <div className="textField">
              <label htmlFor="dep_name">Name:</label>
              <input type="text" id="dep_name" name="dep_name" value={department.dep_name} onChange={handleChangesForEverything} placeholder="Enter your Department Name" />
            </div>
            <div className="textField">
              <label htmlFor="dep_name">Code:</label>
              <input type="text" id="dep_code" name="dep_code" value={department.dep_code} onChange={handleChangesForEverything} placeholder="Enter your Department Code" />
            </div>
          </div>
        </DialogContent>
        <DialogActions style={{ marginBottom: '1rem' }}>
          <button style={{ background: 'maroon', color: 'white' }} onClick={handleAddingDepartment}>Save</button>
          <button onClick={handleCloseModal}>Cancel</button>
        </DialogActions>
      </Dialog>

      {/* For Curriculum */}
      <Dialog open={openModal2} onClose={handleCloseModal}>
        <DialogTitle>Add New Program</DialogTitle>
        <DialogContent>
          <div className="forDepartment">
            <div className="textField">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" value={curriculum.name} onChange={handleChangesForEverything} placeholder="Enter the Curriculum Name" />
            </div>
            <div className="textField">
              <label htmlFor="code">Code:</label>
              <input type="text" id="code" name="code" value={curriculum.code} onChange={handleChangesForEverything} placeholder="Enter the Curriculum Code" />
            </div>
            <div className="textField">
              <label htmlFor="year">Year:</label>
              <select name="year" id="year" value={curriculum.year} onChange={handleChangesForEverything} onClick={handleYearClick}>
                <option disabled={yearHasBeenClicked}>Choose Year</option>
                {yearOptionList.map((year) => (
                  <option key={year.year_id} value={year.year_id}>{year.year_description}</option>
                ))}
              </select>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button style={{ background: 'maroon', color: 'white' }} onClick={handleAddingCurriculum}>Save</button>
          <button onClick={handleCloseModal}>Cancel</button>
        </DialogActions>
      </Dialog>

      <Menu id="menu" anchorEl={openMenu} open={Boolean(openMenu)} onClose={handleCloseModal}>
        <MenuItem onClick={handleEditProgram}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit Program" primaryTypographyProps={{ fontSize: 16 }} />
        </MenuItem>
       
      </Menu>

    </Container>
  );
};

export default DepartmentRegistration;
