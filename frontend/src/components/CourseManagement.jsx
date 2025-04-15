import React from "react";
import {Link} from 'react-router-dom';

const CourseManagement = () => {
    return (
        <div className="Container">
            <Link to={'/program_tagging'}>
                <button>PROGRAM TAGGING PANEL</button>
            </Link>

            <Link to={'/program_panel'}>
                <button>PROGRAM PANEL FORM</button>
            </Link>

            <Link to={'/curriculum_panel'}>
                <button>CREATE CURRICULUM</button>
            </Link>

            <Link to={'/course_panel'}>
                <button>COURSE PANEL FORM</button>
            </Link>
        </div>
    )
}
export default CourseManagement;