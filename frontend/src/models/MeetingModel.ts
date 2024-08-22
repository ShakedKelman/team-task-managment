
export interface MeetingModel {
    id?: number; 
    team_id: number;
    meeting_start: Date; 
    meeting_end: Date;   
    duration?: number;   
    description: string;
    room_name: string;
}
