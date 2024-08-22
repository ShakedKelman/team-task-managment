import React from 'react';
import { Card } from 'react-bootstrap';
import { MeetingModel } from '../models/MeetingModel';
import "../css/meetingCard.css";

type SingleMeetingProps = {
    meeting: MeetingModel;
};

const SingleMeeting: React.FC<SingleMeetingProps> = ({ meeting }) => {
    const startDate = new Date(meeting.meeting_start);
    const endDate = new Date(meeting.meeting_end);

    // Format date and time together
    const formattedStartDateTime = startDate.toLocaleString();
    const formattedEndDateTime = endDate.toLocaleString();

    return (
        <Card className="mb-3 single-meeting-card" style={{ width: '20rem' }}>
            <Card.Body>
                <Card.Title>Meeting {meeting.id}</Card.Title>
                <Card.Text>
                    <strong>Team ID:</strong> {meeting.team_id}
                </Card.Text>
                <Card.Text>
                    <strong>Start:</strong> {formattedStartDateTime}
                </Card.Text>
                <Card.Text>
                    <strong>End:</strong> {formattedEndDateTime}
                </Card.Text>
                <Card.Text>
                    <strong>Duration:</strong> {meeting.duration} minutes
                </Card.Text>
                <Card.Text>
                    <strong>Description:</strong> {meeting.description}
                </Card.Text>
                <Card.Text>
                    <strong>Room:</strong> {meeting.room_name}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default SingleMeeting;



