import React, { useState, useEffect } from 'react';
import { TeamModel } from '../models/TeamModel';
import { getTeams } from '../api/meetings-api';
import { useTeamContext } from './TeamContext';
import { useNavigate } from 'react-router-dom';

const TeamList = (props:any) => {
    const { teams } = props;
    const { setSelectedTeam } = useTeamContext();
    const navigate = useNavigate();


    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = Number(event.target.value);
        setSelectedTeam(selectedId);
        navigate('/meetings'); 
    };



    return (
        <div>
            <h1>Teams List</h1>
            <select onChange={handleSelectChange} defaultValue="">
                <option value="" disabled>Select a team</option>
                {teams.map((team: TeamModel) => (
                    <option key={team.id} value={team.id}>{team.name}</option>
                ))}
            </select>
        </div>
    );
};

export default TeamList;
