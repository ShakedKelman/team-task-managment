import { MeetingModel } from './MeetingModel';
import { TeamModel } from './TeamModel';

export interface TeamContextType {
    selectedTeam: number | null;
    setSelectedTeam: (id: number) => void;
    meetings: MeetingModel[];
    setMeetings: (meetings: MeetingModel[]) => void;
    loadingMeetings: boolean;
    error: string | null;
    teams: TeamModel[];
}
