import fs from 'fs';
import os from 'os';

export default (req: any, res: any, next: any) => {
    let now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    const {method, url} = req;
    const userAgent = req.get("user-agent");

    let data = `${hour}:${minutes}:${seconds} ${method}: ${url} user-agent: ${userAgent}`;

    fs.appendFile("server.log", data + os.EOL, (err) => {
        if (err) throw err;
    });
    next();
};