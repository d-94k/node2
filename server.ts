import express, { NextFunction, Request, Response } from "express";
import { HttpError } from "./model/http-error";
import { router } from "./router";

const app = express ();
app.use (express.json ());
app.use ("/", router);
app.use (() => {throw new HttpError ("could not find page", 404)});
app.use ((error: any, request: Request, response: Response, next: NextFunction) => {
    if (response.headersSent) {
        return next (error);
    }
    response.status(error.code || 500).json(error.message || "generic error");
})

app.listen (8082, () => console.log ("running on port 8082"));
