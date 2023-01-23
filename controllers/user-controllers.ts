import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { HttpError } from "../model/http-error";

const prisma = new PrismaClient ();

export const getUsers = async (request: Request, response: Response) => {
    const users = await prisma.uploaduser.findMany ();
    response.json (users);
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

export const uploadPicture = async (request: Request, response: Response, next: NextFunction) => {
    if (!request.file) {
        return next ("file missing");
    }
    const photoFileName = request.file?.filename;
    try {
        await prisma.uploaduser.update ({
            where: {
                id: +request.params.id
            },
            data: {
                photoFileName
            }
        })
    } catch (error) {
        next ("cannot upload picture");
    }
    response.status(201).json({message: "image successfully uploaded"})
}
