import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <ul className="space-y-3">
        <li className="hover:bg-gray-700 p-3 rounded">
          <Link to="/room_registration">Room Registration</Link>
        </li>
        <li className="hover:bg-gray-700 p-3 rounded">
          <Link to="/course_registration">Course Registration</Link>
        </li>
        <li className="hover:bg-gray-700 p-3 rounded">
          <Link to="/course_management">Course Management</Link>
        </li>
        <li className="hover:bg-gray-700 p-3 rounded">
          <Link to="/department_registration">Department Registration</Link>
        </li>
        <li className="hover:bg-gray-700 p-3 rounded">
          <Link to="/professor_registration">Professor Registration</Link>
        </li>
        <li className="hover:bg-gray-700 p-3 rounded">
          <Link to="/admission_dashboard">Admission Dashboard</Link>
        </li>
        <li className="hover:bg-gray-700 p-3 rounded">
          <Link to="/enrollment_dashboard">Enrollment Dashboard</Link>
        </li>
        <li className="hover:bg-gray-700 p-3 rounded">
          <Link to="/enrolled_student">Enrolled Students</Link>
        </li>
        <li className="hover:bg-red-700 bg-red-600 p-3 rounded mt-6 text-center cursor-pointer">
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
