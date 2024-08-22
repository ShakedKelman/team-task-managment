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



// export async function addTeam(t: TeamModel): Promise<void> {
//     // Validate the TeamModel instance
//     t.validate();

//     // Check if a team with the same name already exists
//     const checkQuery = `SELECT COUNT(*) AS count FROM team WHERE name = '${t.name}'`;
//     const checkResult = await runQuery(checkQuery);
    
//     if (checkResult[0].count > 0) {
//         throw new ValidationError("A team with this name already exists.");
//     }

//     // If the team name is unique, proceed with insertion
//     const insertQuery = `INSERT INTO team (name) VALUES ('${t.name}')`;
//     await runQuery(insertQuery);
// }

