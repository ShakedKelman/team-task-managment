import runQuery from "../db/dal";
import { promises as fs } from "fs";
import { appConfig } from "./appConfig";
import path from "path";

export async function isDbServerUp() {
    try {
        await runQuery("SHOW DATABASES;");
        return true;
    } catch (error) {
        return false;        
    }}



    async function ensureLogsDirectoryExists() {
        const logsDir = path.resolve(__dirname, '../logs');
        try {
            await fs.access(logsDir);
        } catch {
            await fs.mkdir(logsDir, { recursive: true });
        }
    }
    
    ensureLogsDirectoryExists();
    
    
    async function writeToFile(filepath: string, content: string) {
        try {
            await fs.appendFile(filepath, content + "\n");
            console.log(`Logged: ${content}`); // Add this line to verify logging
        } catch (error) {
            console.error('Failed to write to file:', error);
        }
    }
    
    export async function writeErrorLog(errMsg: string) {    
        writeToFile(appConfig.errorLogFile, errMsg);
    }
    
    export async function writeAccessLog(msg: string) {
        writeToFile(appConfig.accessLogFile, msg);
    }
    