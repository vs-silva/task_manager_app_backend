import type {TasksWriterDrivenPorts} from "../ports/tasks-writer-driven.ports";
import type {TaskEntity} from "../business/entities/task.entity";
import TasksInMemoryDB from "../../../data-provider/tasks-in-memory.db";

export function TasksWriterAdapter(): TasksWriterDrivenPorts {

    async function write(writeRequest: TaskEntity): Promise<void> {

        const task = TasksInMemoryDB.tasks.filter((task: TaskEntity) => task.id === writeRequest.id)[0];

        if(!task) {
            TasksInMemoryDB.tasks.push(writeRequest);
            return Promise.resolve();
        }

        Object.assign(task, writeRequest);
        return Promise.resolve();
    }

    async function erase(eraseRequest: TaskEntity): Promise<void> {
        const index = TasksInMemoryDB.tasks.indexOf(eraseRequest);
        TasksInMemoryDB.tasks.splice(index,1);
        return Promise.resolve();
    }

    return {
        write,
        erase
    };
}
