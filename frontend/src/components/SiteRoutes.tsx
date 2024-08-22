import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TeamList from './TeamList';
import MeetingList from './MeetingList';
import { TeamProvider } from './TeamContext';
import NavbarWeb from './NavBarWeb';
import AddMeeting from './NewMeeting';

const SiteRoutes = () => {
    return (
        <Router>
            <TeamProvider>
                <div>
                    <NavbarWeb /> {/* Include the Navbar component */}
                    <Routes>
                        <Route path="/" element={<TeamList />} />
                        <Route path="/meetings" element={<MeetingList />} /> {/* Route for displaying all meetings */}
                        <Route path="/add-meeting" element={<AddMeeting />} /> {/* Route for adding a new meeting */}
                    </Routes>
                </div>
            </TeamProvider>
        </Router>
    );
};

export default SiteRoutes;
