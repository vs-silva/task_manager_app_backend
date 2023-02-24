import express, {Express, Router} from "express";
import {TasksController} from "./tasks/tasks.controller";
import {ControllersErrorHandler} from "./controllers-error-handler";
import {InvalidPathHandler} from "./invalid-path-handler";

const router: Router = express.Router();

export default (app: Express): void => {

    app.use(express.json());

    TasksController(app, router);

    app.use(ControllersErrorHandler);
    app.use(InvalidPathHandler);
};
