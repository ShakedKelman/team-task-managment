// src/App.tsx
import React from 'react';
// src/index.tsx or src/App.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import MeetingList from './components/MeetingList';
import TeamList from './components/TeamList';
import { TeamProvider } from './components/TeamContext';
import SiteRoutes from './components/SiteRoutes';

function App() {
    return (
        <TeamProvider>
    <SiteRoutes/>
    </TeamProvider>
    );
}

export default App;
