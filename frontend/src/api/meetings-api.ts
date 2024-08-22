
import { MeetingModel } from '../models/MeetingModel';
import { TeamModel } from '../models/TeamModel';
import apiCall from './apiCall';

export async function getMeetings(teamId: number): Promise<MeetingModel[]> {
    try {
        const url = `/meetings/${teamId}`;
        const res = await apiCall(url, 'GET');
        
        if (res.status) {
            console.log('Fetched meetings data:', res.data);
            if (Array.isArray(res.data)) {
                return res.data as MeetingModel[];
            } else {
                console.error('API returned data is not an array:', res.data);
                return [];
            }
        } else {
            console.error('Failed to fetch meetings:', res.errorMessage);
            return [];
        }
    } catch (error) {
        console.error('Error in getMeetings:', error);
        return [];
    }
}


export async function addMeeting(m: MeetingModel): Promise<void> {
    try {
        const url = `/meeting/${m.team_id}`;
        const res = await apiCall(url, 'POST', m, {
         
        });

        if (res.status) {
            console.log('Meeting successfully added:', res.data);
        } else {
            console.error('Failed to add meeting:', res.errorMessage);
            throw new Error(res.errorMessage);
        }
    } catch (error) {
        console.error('Error in addMeeting:', error);
        throw error;
    }
}


export async function getTeams(): Promise<TeamModel[]> {
    try {
        const res = await apiCall('/teams', 'GET');
        if (res.status) {
            console.log('Fetched teams data:', res.data);
            if (Array.isArray(res.data)) {
                return res.data as TeamModel[];
            } else {
                console.error('API returned data is not an array:', res.data);
                return [];
            }
        } else {
            console.error('Failed to fetch teams:', res.errorMessage);
            return [];
        }
    } catch (error) {
        console.error('Error in getTeams:', error);
        return [];
    }
}