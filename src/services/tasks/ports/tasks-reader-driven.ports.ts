import type {TaskEntity} from "../business/entities/task.entity";

export interface TasksReaderDrivenPorts {
    getAll(): Promise<TaskEntity[]>;
    getBy(expression: (task:TaskEntity) => {}): Promise<TaskEntity[]>;
}
