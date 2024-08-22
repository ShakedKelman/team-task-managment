import express, { Request, Response } from "express";
import { appConfig } from "./utils/appConfig";
import cors from 'cors';
import { meetingsRouter } from "./controllers/meetingsController";
import { teamsRouter } from "./controllers/temsController";
import { isDbServerUp } from "./utils/helpers";
import catchAll from "./middlewares/catchAll";
import { logMW } from "./middlewares/logMiddleware";

const server = express();

server.use(express.json());

server.use(logMW);

server.use(cors({
    origin: 'http://localhost:3000' 
}));

server.use("/", teamsRouter);
server.use("/", meetingsRouter);

server.use(catchAll);

server.get("/", (req: Request, res: Response) => {
    res.send("<h1>Hello World!</h1>");
});

isDbServerUp().then((isUp) => {
    if (isUp) {
        server.listen(appConfig.port, () => {
            console.log(`Listening on http://localhost:${appConfig.port}`);
        })
    } else {
        console.error("\n\n****\nDB server is not up!!!\n****\n");
    }
})