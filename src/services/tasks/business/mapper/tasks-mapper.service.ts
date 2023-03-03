import type {TasksMapperInterface} from "./tasks-mapper.interface";
import type {TaskDTO} from "../dtos/task.dto";
import type {TaskEntity} from "../entities/task.entity";
import {TasksStatusOptionsConstants} from "../constants/tasks-status-options.constants";
import {TaskRequestDTO} from "../dtos/task-request.dto";
import {TasksPriorityOptionsConstants} from "../constants/tasks-priority-options.constants";
import moment from "moment/moment";
// @ts-ignore
import { v4 as uuidV4 } from "uuid";

async function mapToTasksDTOCollection(data: TaskEntity[]): Promise<TaskDTO[]> {

    return data.map( (taskEntity: TaskEntity) => (<TaskDTO>{
        id: taskEntity.id,
        title: taskEntity.title,
        description: taskEntity.description,
        priority: taskEntity.priority,
        status: taskEntity.completed ? TasksStatusOptionsConstants.CLOSED : TasksStatusOptionsConstants.OPEN,
        creationDate: new Date(taskEntity.creationDate)
    }));
}

async function mapToTasksDTO(data: TaskEntity[]): Promise<TaskDTO> {
    const mapped = await mapToTasksDTOCollection(data);
    return mapped[0];
}

async function mapToTaskEntity(data: TaskRequestDTO): Promise<TaskEntity> {

    return {
        id: data.id || uuidV4(),
        title: data.title ,
        description: data.description || '',
        priority: data.priority || TasksPriorityOptionsConstants.LOW,
        completed: data.status === TasksStatusOptionsConstants.CLOSED,
        creationDate: moment().format('L')
    }
}

export const TasksMapperService: TasksMapperInterface = Object.freeze({
    mapToTasksDTOCollection,
    mapToTasksDTO,
    mapToTaskEntity
});
