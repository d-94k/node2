import express from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "./controllers/user-controllers";
import { check } from "express-validator";

export const router = express.Router ();

router.get ("/", getUsers);
router.get ("/:id", getUser);
router.post ("/", [check("username").not().isEmpty(), check("password").isLength({min: 5, max: 20})], createUser);
router.put ("/", updateUser);
router.delete ("/:id", deleteUser);