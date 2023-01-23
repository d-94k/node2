import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { HttpError } from "../model/http-error";

const prisma = new PrismaClient ();

export const getUsers = async (request: Request, response: Response) => {
    const users = await prisma.uploaduser.findMany ();
    response.json (users);
}

export const getUser = async (request: Request, response: Response) => {
    const user = await prisma.uploaduser.findUnique ({
        where: {
            id: +request.params.id
        }
    });
    response.json (user);
}

export const createUser = async (request: Request, response: Response, next: NextFunction) => {
    const Error = validationResult (request);
    if (!Error.isEmpty ()) {
        return next (new HttpError ("could not create user", 422));
    };
    const { username, password } = request.body;
    const createdUser = await prisma.uploaduser.create ({
        data: {
            username: username,
            password: password
        }
    });
    response.json (createdUser);
}

export const updateUser = async (request: Request, response: Response) => {
    const { id, username } = request.body;
    const updatedUser = await prisma.uploaduser.update ({
        where: {
            id: id
        },
        data: {
            username: username
        }
    });
    response.json (updatedUser);
}

export const deleteUser = async (request: Request, response: Response) => {
    const deletedUser = prisma.uploaduser.delete ({
        where: {
            id: +request.params.id
        }
    })
}
