import runQuery from "../db/dal"
import TeamModel from "../models/teamModel";

export async function getTeams(): Promise<TeamModel[]> {
    let q = `SELECT * FROM team ;`;
    const res = await runQuery(q);
    const teams = res.map((team) => {
        return new TeamModel(team);
    });
    return teams;
}


