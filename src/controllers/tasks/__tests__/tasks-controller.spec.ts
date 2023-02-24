import {describe, it, expect} from "vitest";
import request from 'supertest';
import express from 'express';
import Controllers from "../../index";
import {TasksResourcePathsConstants} from "../tasks-resource-paths.constants";
import type {TaskDTO} from "../../../services/tasks/business/dtos/task.dto";
const app = express();

Controllers(app);

describe('Tasks controllers tests', () => {

    it('/tasks route should return should return an array of TaskDTO', async () => {

        request(app)
            .get(TasksResourcePathsConstants.TASKS_ROOT)
            .expect("Content-Type", /json/)
            .expect(expect.arrayContaining(<TaskDTO[]>[
                expect.objectContaining(<TaskDTO>{
                    id: expect.any(String),
                    title: expect.any(String),
                    description: expect.any(String),
                    priority: expect.any(String),
                    status: expect.any(String),
                    creationDate: expect.any(Date)
                })
            ]))
            .expect(200);

    });
});
