import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SideBar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  }
  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        <li >
          <Link to="/room_registration">Room Registration</Link>
        </li>
        <li >
          <Link to="/course_registration">Course Registration</Link>
        </li>
        <li >
          <Link to="/course_management">Course Management</Link>
        </li>
        <li >
          <Link to="/department_registration">Department Registration</Link>
        </li>
        <li >
          <Link to="/professor_registration">Professor Registration</Link>
        </li>
        <li >
          <Link to="/admission_dashboard">Admission Dashboard</Link>
        </li>
        <li >
          <Link to="/enrollment_dashboard">Enrollment Dashboard</Link>
        </li>
        <li >
          <Link to="/enrolled_student">Enrolled Students</Link>
        </li>
        <li >
          <button onClick={Logout}>Logout</button>
        </li>
      </ul>

    </div>
  );
};

export default SideBar;
