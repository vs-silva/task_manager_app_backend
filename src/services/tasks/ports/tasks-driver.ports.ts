import type {TaskDTO} from "../business/dtos/task.dto";
import type {TaskRequestDTO} from "../business/dtos/task-request.dto";

export interface TasksDriverPorts {
    getTasks(): Promise<TaskDTO[]>;
    getTaskByID(taskID: string): Promise<TaskDTO>;
    createTask(requestDTO: TaskRequestDTO): Promise<void>;
    updateTask(requestDTO: TaskRequestDTO): Promise<void>;
    removeTask(taskID: string): Promise<void>;
}
