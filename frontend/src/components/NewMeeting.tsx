import React, { useState } from 'react';
import { useTeamContext } from './TeamContext';
import { addMeeting } from '../api/meetings-api';
import { MeetingModel } from '../models/MeetingModel';
import { Form, Button, Alert } from 'react-bootstrap';
import "../css/form.css";

const AddMeeting = () => {
    const { selectedTeam, setMeetings, meetings, teams, error: contextError } = useTeamContext();
    const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
    const [meetingStart, setMeetingStart] = useState<string>('');
    const [meetingEnd, setMeetingEnd] = useState<string>('');
    const [duration, setDuration] = useState<number>(0); // Duration in minutes
    const [description, setDescription] = useState<string>('');
    const [roomName, setRoomName] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const calcDuration = (start: Date, end: Date): number => {
        const durationMs = end.getTime() - start.getTime();
        const durationMinutes = Math.floor(durationMs / (1000 * 60));
        return durationMinutes;
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (selectedTeamId === null) {
            setError('No team selected');
            return;
        }

        const meeting_start = new Date(meetingStart);
        const meeting_end = new Date(meetingEnd);

        if (meeting_end < meeting_start) {
            setError('End time cannot be earlier than start time.');
            return;
        }

        const calculatedDuration = calcDuration(meeting_start, meeting_end);

        if (calculatedDuration <= 0) {
            setError('Duration must be a positive number');
            return;
        }

        const newMeeting: MeetingModel = {
            team_id: selectedTeamId,
            meeting_start,
            meeting_end,
            duration: calculatedDuration,
            description,
            room_name: roomName,
        };

        try {
            await addMeeting(newMeeting);
            setMeetings([...meetings, newMeeting]);
            setSuccessMessage('Meeting added successfully!');
            setMeetingStart('');
            setMeetingEnd('');
            setDuration(0);
            setDescription('');
            setRoomName('');
            setSelectedTeamId(null);
            setError('');
        } catch (E: any) {
            setError('Failed to add meeting: ' + E.message);
        }
    };

    return (
        <div className="add-meeting-container">
            <h1>Add New Meeting</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTeam">
                    <Form.Label>Team</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedTeamId ?? ''}
                        onChange={(e) => setSelectedTeamId(Number(e.target.value))}
                        required
                    >
                        <option value="" disabled>Select a team</option>
                        {teams.map((team) => (
                            <option key={team.id} value={team.id}>
                                {team.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formMeetingStart">
                    <Form.Label>Start Date & Time</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        value={meetingStart}
                        onChange={(e) => {
                            setMeetingStart(e.target.value);
                            if (meetingEnd) {
                                const meeting_start = new Date(e.target.value);
                                const meeting_end = new Date(meetingEnd);
                                if (meeting_end < meeting_start) {
                                    meeting_end.setDate(meeting_end.getDate() + 1); // Add one day
                                    setMeetingEnd(meeting_end.toISOString().slice(0, -1)); // Update end time
                                }
                                setDuration(calcDuration(meeting_start, meeting_end));
                            }
                        }}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formMeetingEnd">
                    <Form.Label>End Date & Time</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        value={meetingEnd}
                        onChange={(e) => {
                            setMeetingEnd(e.target.value);
                            if (meetingStart) {
                                const meeting_start = new Date(meetingStart);
                                const meeting_end = new Date(e.target.value);
                                if (meeting_end < meeting_start) {
                                    setError('End time cannot be earlier than start time.');
                                    return;
                                }
                                setDuration(calcDuration(meeting_start, meeting_end));
                            }
                        }}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formDuration">
                    <Form.Label>Duration (minutes)</Form.Label>
                    <Form.Control
                        type="number"
                        value={duration}
                        readOnly
                    />
                </Form.Group>

                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formRoomName">
                    <Form.Label>Room Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add Meeting
                </Button>
            </Form>
            <div className='messages'>
                {
                (error || contextError) ?
                  <Alert variant="danger">{error || contextError}</Alert>  : 
                successMessage ? <Alert variant="success">{successMessage}</Alert> : 
                null
                }
            </div>
        </div>
    );
};

export default AddMeeting;
