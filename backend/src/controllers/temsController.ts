import express, { Request, Response, NextFunction } from "express";
import { appConfig } from "../utils/appConfig";
import { StatusCode } from "../models/statusEnum";
import { getTeams } from "../services/teamService";

export const teamsRouter = express.Router();

teamsRouter.get(appConfig.routePrefix+"/teams", async (req: Request, res: Response, next:NextFunction) => {
    try {
        const teams = await getTeams();
        console.log('team data:', teams); 
        res.status(StatusCode.Ok).json(teams);
    } catch (error) {
        console.error("Error retrieving teams:", error);
        res.status(StatusCode.ServerError).json({ message: "Error retrieving teams" });
    }
});



// teamsRouter.post(appConfig.routePrefix+"/team", async(req: Request, res: Response, next: NextFunction) => {
//     try {
//         console.log("Request body:", req.body); // Log the incoming request body
//         const newTeam = new TeamModel(req.body);
//         await addTeam(newTeam);
//         res.status(StatusCode.Ok).send("ok from controller");
//     } catch (error) {
//         console.error("Error in /team POST handler:", error);
//         next(error);
//     }
// });


