import type {TasksDriverPorts} from "./ports/tasks-driver.ports";
import type {TasksReaderDrivenPorts} from "./ports/tasks-reader-driven.ports";
import type {TasksWriterDrivenPorts} from "./ports/tasks-writer-driven.ports";
import type {TaskDTO} from "./business/dtos/task.dto";
import type {TaskRequestDTO} from "./business/dtos/task-request.dto";
import {TasksMapperService} from "./business/mapper/tasks-mapper.service";
import {TaskEntity} from "./business/entities/task.entity";


export function TasksService(reader: TasksReaderDrivenPorts, writer: TasksWriterDrivenPorts): TasksDriverPorts {

    async function getTasks(): Promise<TaskDTO[]> {
        const entities = await reader.getAll();
        return await TasksMapperService.mapToTasksDTOCollection(entities);
    }

    async function getTaskByID(taskID: string): Promise<TaskDTO> {
        const entities = await reader.getBy((task: TaskEntity) => task.id === taskID);
        return await TasksMapperService.mapToTasksDTO(entities);
    }

    async function createTask(requestDTO: TaskRequestDTO): Promise<void> {
        const entity = await TasksMapperService.mapToTaskEntity(requestDTO);
        return await writer.write(entity);
    }

    async function updateTask(requestDTO: TaskRequestDTO): Promise<void> {
        const entities = await reader.getBy((task: TaskEntity) => task.id === requestDTO.id);

        if(!entities.length) {
            return;
        }

        const mappedResult = await TasksMapperService.mapToTaskEntity(requestDTO);
        const result: TaskEntity = Object.assign(<TaskEntity>entities[0], mappedResult);
        return await writer.write(result);
    }

    async function removeTask(taskID: string): Promise<void> {
        const entities = await reader.getBy((task: TaskEntity) => task.id === taskID);

        if(!entities.length) {
           return;
        }

        return await writer.erase(entities[0]);
    }

    return {
        getTasks,
        getTaskByID,
        createTask,
        updateTask,
        removeTask
    };
}
