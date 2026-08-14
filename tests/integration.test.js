const request = require("supertest");
const app = require("../src/app");

describe("Integration", () => {
    test("task lifecycle", async () => {
        const create = await request(app)
            .post("/api/tasks")
            .send({ title: "Deploy application" });

        expect(create.statusCode).toBe(201);

        const id = create.body.id;

        const update = await request(app)
            .put(`/api/tasks/${id}`)
            .send({ completed: true });

        expect(update.statusCode).toBe(200);
        expect(update.body.completed).toBe(true);

        const remove = await request(app)
            .delete(`/api/tasks/${id}`);

        expect(remove.statusCode).toBe(204);
    });
});