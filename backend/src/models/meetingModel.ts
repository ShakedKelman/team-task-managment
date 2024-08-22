// import Joi from "joi";
// import { ValidationError } from "./exceptions";

// class MeetingModel {
//     id: number;
//     team_id: number; // This will be the foreign key
//     meeting_date: Date;
//     meeting_time: string; // Start time in HH:MM format
//     end_time: string;   // End time in HH:MM format
//     duration: number;   // Duration in minutes
//     description: string;
//     room_name: string;

//     constructor(data: any) {
//         this.id = data.id;
//         this.team_id = data.team_id;
//         this.meeting_date = new Date(data.meeting_date);
//         this.meeting_time = data.meeting_time;
//         this.end_time = data.end_time;
//         this.duration = data.duration;
//         this.description = data.description;
//         this.room_name = data.room_name;
//     }

//     validate(): void {
//         const validateSchema = Joi.object({
//             id: Joi.number().integer().optional(),
//             team_id: Joi.number().integer().required(),
//             meeting_date: Joi.date().iso().required(),
//             meeting_time: Joi.string().pattern(/^\d{2}:\d{2}$/).required(),
//             end_time: Joi.string().pattern(/^\d{2}:\d{2}$/).required(),
//             duration: Joi.number().integer().min(1).required(), // Duration in minutes
//             description: Joi.string().required(),
//             room_name: Joi.string().required(),
//         });

//         const res = validateSchema.validate(this);
//         if (res.error) {
//             throw new ValidationError(res.error.details[0].message);
//         }
//     }
// }

// export default MeetingModel;
import Joi from "joi";
import { ValidationError } from "./exceptions";

class MeetingModel {
    id: number;
    team_id: number; // This will be the foreign key
    meeting_start: Date; // Combined date and time for start
    meeting_end: Date;   // Combined date and time for end
    duration: number;    // Duration in minutes
    description: string;
    room_name: string;

    constructor(data: any) {
        this.id = data.id;
        this.team_id = data.team_id;
        this.meeting_start = new Date(data.meeting_start);
        this.meeting_end = new Date(data.meeting_end);
        this.duration = data.duration;
        this.description = data.description;
        this.room_name = data.room_name;
    }

    validate(): void {
        const validateSchema = Joi.object({
            id: Joi.number().integer().optional(),
            team_id: Joi.number().integer().required(),
            meeting_start: Joi.date().iso().required(),
            meeting_end: Joi.date().iso().required(),
            duration: Joi.number().integer().min(1).required(), // Duration in minutes
            description: Joi.string().required(),
            room_name: Joi.string().required(),
        });

        const res = validateSchema.validate(this);
        if (res.error) {
            throw new ValidationError(res.error.details[0].message);
        }
    }
}

export default MeetingModel;