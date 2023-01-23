import express from "express";
import { createUser, deleteUser, getUsers, updateUser, uploadPicture } from "./controllers/user-controllers";
import { check } from "express-validator";

export const router = express.Router ();

router.get ("/", getUsers);
router.post ("/", [check("username").not().isEmpty(), check("password").isLength({min: 5, max: 20})], createUser);
router.post ("/:id/photo", uploadPicture);
router.put ("/", updateUser);
router.delete ("/:id", deleteUser);     

// router.use ("/photos", express.static ("uploads"));