import Joi from "joi";
import { ValidationError } from "./exceptions";


class TeamModel {
    id: number;
    name: string;

    constructor(tm: TeamModel){ 
        this.id = tm.id;
        this.name = tm.name;
    }

    validate(): void {
        const validateSchema = Joi.object({
            id: Joi.number().optional().positive(),
            name: Joi.string().min(1).max(255).required(),
        });

        const res = validateSchema.validate(this);
        if (res.error) {
            throw new ValidationError(res.error.details[0].message)            
        }
    }
}

export default TeamModel;
