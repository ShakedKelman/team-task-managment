import runQuery from "../db/dal"
import { ValidationError } from "../models/exceptions";
import MeetingModel from "../models/meetingModel";

export async function getMeeting(teamId:number): Promise<MeetingModel[]> {
    console.log('Received teamId:', teamId);
    let q = `SELECT * FROM meeting WHERE team_id= ${teamId} ;`;
    console.log('Generated SQL query:', q); // Debugging line to check the generated query

    const res = await runQuery(q);
    const meetings = res.map((meeting) => {
        return new MeetingModel(meeting);
    });
    return meetings;
}





// export async function addMeeting(m: MeetingModel): Promise<void> {
//     m.validate();

//     const checkQuery = `
//         SELECT COUNT(*) AS count 
//         FROM meeting 
//         WHERE team_id = ${m.team_id}
//         AND meeting_date = '${m.meeting_date.toISOString().split('T')[0]}' 
//         AND (
//             (meeting_time < '${m.end_time}' AND end_time > '${m.meeting_time}')
//         )
//     `;
//     const checkResult = await runQuery(checkQuery);

//     if (checkResult[0].count > 0) {
//         throw new ValidationError("This team already has a meeting scheduled at the selected time.");
//     }

//     const insertQuery = `
//         INSERT INTO meeting (team_id, meeting_date, meeting_time, end_time, duration, description, room_name) 
//         VALUES (
//             ${m.team_id}, 
//             '${m.meeting_date.toISOString().split('T')[0]}', 
//             '${m.meeting_time}', 
//             '${m.end_time}', 
//             ${m.duration}, 
//             '${m.description}', 
//             '${m.room_name}'
//         )
//     `;
//     await runQuery(insertQuery);
// }

export async function addMeeting(m: MeetingModel): Promise<void> {
    m.validate();

    // Format the dates for the SQL query
    const meetingStart = m.meeting_start.toISOString().slice(0, 19).replace('T', ' ');
    const meetingEnd = m.meeting_end.toISOString().slice(0, 19).replace('T', ' ');

    // Check for overlapping meetings
    const checkQuery = `
        SELECT COUNT(*) AS count 
        FROM meeting 
        WHERE team_id = ${m.team_id}
        AND (
            (meeting_start < '${meetingEnd}' AND meeting_end > '${meetingStart}')
        )
    `;
    const checkResult = await runQuery(checkQuery);

    if (checkResult[0].count > 0) {
        throw new ValidationError("This team already has a meeting scheduled at the selected time.");
    }

    // Insert the new meeting
    const insertQuery = `
        INSERT INTO meeting (team_id, meeting_start, meeting_end, duration, description, room_name) 
        VALUES (
            ${m.team_id}, 
            '${meetingStart}', 
            '${meetingEnd}', 
            ${m.duration}, 
            '${m.description}', 
            '${m.room_name}'
        )
    `;
    await runQuery(insertQuery);
}
