import type {TaskEntity} from "../business/entities/task.entity";

export interface TasksWriterDrivenPorts {
    write(writeRequest: TaskEntity): Promise<void>;
    erase(eraseRequest: TaskEntity): Promise<void>;
}
