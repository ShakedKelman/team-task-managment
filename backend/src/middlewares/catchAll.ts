import { NextFunction, Request, Response } from "express";
import { writeErrorLog } from "../utils/helpers";
import { StatusCode } from "../models/statusEnum";
import { AppExcption } from "../models/exceptions";

function catchAll(err: any, req: Request, res: Response, next: NextFunction) {
    
    writeErrorLog(err.message);

    if (err instanceof AppExcption){
        res.status(err.status).send(err.message);
        return
    }

    res.status(StatusCode.ServerError).send("Internal Server Error")            
}

export default catchAll;