import type {TasksReaderDrivenPorts} from "../ports/tasks-reader-driven.ports";
import type {TaskEntity} from "../business/entities/task.entity";
import TasksInMemoryDB from "../../../data-provider/tasks-in-memory.db";


export function TasksReaderAdapter(): TasksReaderDrivenPorts {

    async function getAll(): Promise<TaskEntity[]> {
        return Promise.resolve(TasksInMemoryDB.tasks);
    }

    async function getBy(expression: (task:TaskEntity) => {}): Promise<TaskEntity[]> {
        return Promise.resolve(TasksInMemoryDB.tasks.filter(expression));
    }

    return {
        getAll,
        getBy
    };
}
