import React, { createContext, useState, useContext, useEffect } from 'react';
import { MeetingModel } from '../models/MeetingModel';
import { TeamModel } from '../models/TeamModel';
import { getMeetings, getTeams } from '../api/meetings-api';
import { TeamContextType } from '../models/ContextModel';

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const useTeamContext = (): TeamContextType => {
    const context = useContext(TeamContext);
    if (!context) {
        throw new Error('useTeamContext must be used within a TeamProvider');
    }
    return context;
};

export const TeamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
    const [meetings, setMeetings] = useState<MeetingModel[]>([]);
    const [teams, setTeams] = useState<TeamModel[]>([]);
    const [loadingMeetings, setLoadingMeetings] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const data = await getTeams();
                setTeams(data);
            } catch (err) {
                setError('Failed to fetch teams');
            }
        };

        fetchTeams();
    }, []);

    useEffect(() => {
        const fetchMeetings = async () => {
            if (selectedTeam !== null) {
                setLoadingMeetings(true);
                try {
                    const data = await getMeetings(selectedTeam);
                    setMeetings(data);
                } catch (err) {
                    if (err instanceof Error) {
                        setError(err.message);
                    } else {
                        setError('An unknown error occurred');
                    }
                } finally {
                    setLoadingMeetings(false);
                }
            }
        };

        fetchMeetings();
    }, [selectedTeam]);


    return (
        <TeamContext.Provider value={{ selectedTeam, setSelectedTeam, meetings, setMeetings, loadingMeetings, error, teams }}>
            {children}
        </TeamContext.Provider>
    );
};
