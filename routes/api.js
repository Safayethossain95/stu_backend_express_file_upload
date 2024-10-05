import express from "express";
const router = express.Router();
import AuthMiddlewares from "../app/middlewares/AuthMiddlewares.js";
import * as UsersController from "../app/controllers/UsersController.js";
import * as FilesController from "../app/controllers/FileController.js";

// Users
router.post("/register", UsersController.register)
router.post("/login", UsersController.login)
router.get("/profile-read", AuthMiddlewares,UsersController.profileRead)
router.post("/profile-update", AuthMiddlewares,UsersController.profileUpdate)
router.post("/upload-single-file",FilesController.uploadSingleFile)
router.post("/upload-multiple-files",FilesController.uploadMultipleFile)
router.get("/read-file/:fileName", FilesController.getUploadFile)
router.delete("/delete-single-file/:fileName", FilesController.deleteSingleFile)
router.delete("/delete-multiple-file", FilesController.deleteMultipleFile)



export default router;