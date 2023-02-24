import {Express, Router, Request, Response} from "express";
import {TasksResourcePathsConstants} from "./tasks-resource-paths.constants";
import Tasks from "../../services/tasks";

export function TasksController(app:Express, router: Router): void {

    router
        .get(TasksResourcePathsConstants.TASKS_ROOT, async (req: Request, res: Response) => {
            res.json(await Tasks.getTasks());
        })

        .get(TasksResourcePathsConstants.TASK_PARAM_ID, async (req: Request, res: Response) => {
            const { id } = req.params;
            res.json(await Tasks.getTaskByID(id));
        })

        .post(TasksResourcePathsConstants.TASKS_ROOT, async (req: Request, res: Response) => {
            const {title, description, priority, status} = req.body;

            res.json(await Tasks.createTask(
                {
                    title,
                    description,
                    priority,
                    status
                }
            ));
        })

        .put(TasksResourcePathsConstants.TASK_PARAM_ID, async (req: Request, res: Response) => {

            const { id } = req.params;
            const { title, description, priority, status } = req.body;

            res.json(await Tasks.updateTask({
                id,
                title,
                description,
                priority,
                status
            }));
        })


        .delete(TasksResourcePathsConstants.TASK_PARAM_ID, async (req: Request, res: Response) => {
            const { id } = req.params;
            res.json(await Tasks.removeTask(id));
        });


    app.use(TasksResourcePathsConstants.TASKS, router);
}
