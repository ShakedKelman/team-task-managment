import React from 'react';
import { Link } from 'react-router-dom';
import "../css/navbar.css";
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { Navbar } from 'react-bootstrap';

const NavbarWeb = () => {
    return (
        <nav className="navbar">
            <ul>
                <li>
                 
                    <Link to="/meetings">   <PeopleIcon fontSize="small" />All Team Meetings</Link> {/* Link to display all meetings */}
                </li>
                <li>
                    <Link to="/add-meeting">  <CalendarMonthIcon fontSize="small" />Add New Meeting </Link> {/* Link to add a new meeting */}
                </li>
            </ul>
        </nav>
    );
};

export default NavbarWeb;
