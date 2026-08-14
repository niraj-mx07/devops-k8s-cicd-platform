const request = require("supertest");
const app = require("../src/app");

describe("Health endpoints", () => {
    test("GET /health returns healthy", async () => {
        const response = await request(app).get("/health");

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("healthy");
    });

    test("GET /ready returns ready", async () => {
        const response = await request(app).get("/ready");

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("ready");
    });
});

describe("Tasks API", () => {
    test("POST /api/tasks creates a task", async () => {
        const response = await request(app)
            .post("/api/tasks")
            .send({
                title: "Learn Kubernetes",
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe("Learn Kubernetes");
    });
});