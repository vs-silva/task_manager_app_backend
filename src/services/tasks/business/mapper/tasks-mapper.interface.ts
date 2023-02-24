import type {TaskDTO} from "../dtos/task.dto";
import type {TaskEntity} from "../entities/task.entity";
import {TaskRequestDTO} from "../dtos/task-request.dto";

export interface TasksMapperInterface {
    mapToTasksDTOCollection(data: TaskEntity[]): Promise<TaskDTO[]>;
    mapToTasksDTO(data: TaskEntity[]): Promise<TaskDTO>;
    mapToTaskEntity(data: TaskRequestDTO): Promise<TaskEntity>;
}
