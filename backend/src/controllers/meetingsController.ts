import express, { Request, Response, NextFunction } from "express";
import { appConfig } from "../utils/appConfig";
import { StatusCode } from "../models/statusEnum";
import { addMeeting, getMeeting } from "../services/meetingService";
import MeetingModel from "../models/meetingModel";

export const meetingsRouter = express.Router();

meetingsRouter.get(appConfig.routePrefix+"/meetings/:id", async (req: Request, res: Response, next:NextFunction) => {
    try {
        console.log(req.params.id);
        const meetings = await getMeeting(+req.params.id);
        console.log('meeting data:', meetings); 
        res.status(StatusCode.Ok).json(meetings);
    } catch (error) {
        console.error("Error retrieving meetings:", error); 
        res.status(StatusCode.ServerError).json({ message: "Error retrieving meetings" });
    }
});


meetingsRouter.post(appConfig.routePrefix+"/meeting/:id", async(req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("Request body:", req.body); 
        const newMeeting = new MeetingModel(req.body);
        await addMeeting(newMeeting);
        res.status(StatusCode.Ok).send(newMeeting);
    } catch (error) {
        console.error("Error in /meeting/:id POST handler:", error);
        next(error);
    }
});