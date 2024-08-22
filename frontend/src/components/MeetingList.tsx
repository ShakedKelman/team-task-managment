import React from 'react';
import SingleMeeting from './SingleMeeting';
import { useTeamContext } from './TeamContext';
import { Card, Col, Container, Row } from 'react-bootstrap';

const MeetingList = () => {
    const { meetings, error, selectedTeam, setSelectedTeam, teams } = useTeamContext();

    const handleTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const teamId = Number(event.target.value);
        setSelectedTeam(teamId);
    };
    const selectedTeamName = teams.find(team => team.id === selectedTeam)?.name;


    return (
        <Container>
            <h1 className="mt-4">Meetings by team</h1>
            {teams.length > 0 && (
                <select className="form-select" onChange={handleTeamChange} value={selectedTeam ?? ""}>
                    <option value="" disabled>Select a team</option>
                    {teams.map((team) => (
                        <option key={team.id} value={team.id}>
                            {team.name}
                        </option>
                    ))}
                </select>
            )}
            {selectedTeam === null ? (
                <div className="mt-3">Please select a team to view meetings.</div>
            ) : (
                <div>
                    <h2 className="mt-4">Meetings for Team {selectedTeamName}</h2>
                    {meetings.length > 0 ? (
                        <Row>
                            {meetings.map((meeting) => (
                                <Col md={6} lg={4} key={meeting.id + meeting.room_name} className="mb-4">
                              
                                            <SingleMeeting meeting={meeting} />
                                    
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <div className="mt-3">No meetings found for this team.</div>
                    )}
                </div>
            )}
        </Container>
    );
};

export default MeetingList;
