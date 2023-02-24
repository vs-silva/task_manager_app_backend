import {describe, it, expect, vi} from "vitest";
import Tasks from "../index";
import type {TaskDTO} from "../business/dtos/task.dto";

describe('Tasks services tests', () => {

    describe('Tasks service driver ports tests', () => {

        it('Tasks.getTasks should return an array of TaskDTO', async () => {

            const spy = vi.spyOn(Tasks, 'getTasks');
            const result = await Tasks.getTasks();

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledOnce();
            expect(result.length).toBeGreaterThan(0);

            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
            const priorityOptionsRegex = /high|low|medium/i;
            const statusOptionsRegex = /open|closed/i;

            expect(result).toStrictEqual(expect.arrayContaining(<TaskDTO[]>[
                expect.objectContaining(<TaskDTO>{
                    id: expect.any(String),
                    title: expect.any(String),
                    description: expect.any(String),
                    priority: expect.any(String),
                    status: expect.any(String),
                    creationDate: expect.any(Date)
                })
            ]));

            for (const task of result) {
                expect(task.id).toMatch(uuidRegex);
                expect(task.priority).toMatch(priorityOptionsRegex);
                expect(task.status).toMatch(statusOptionsRegex);
            }

        });

    });

});
