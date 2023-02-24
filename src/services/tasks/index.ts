import {TasksService} from "./tasks.service";
import {TasksReaderAdapter} from "./adapters/tasks-reader.adapter";
import {TasksWriterAdapter} from "./adapters/tasks-writer.adapter";

export default TasksService(TasksReaderAdapter(), TasksWriterAdapter());
