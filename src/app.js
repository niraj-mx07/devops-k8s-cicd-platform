const express = require("express");

const app = express();

app.use(express.json());

const tasks = [];
let nextId = 1;

app.get("/", (req, res) => {
    res.json({
        service: "devops-k8s-cicd-platform",
        status: "running",
    });
});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "healthy",
    });
});

app.get("/ready", (req, res) => {
    res.status(200).json({
        status: "ready",
    });
});

app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({
            error: "title is required",
        });
    }

    const task = {
        id: nextId++,
        title,
        completed: false,
    };

    tasks.push(task);

    res.status(201).json(task);
});

app.put("/api/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    const task = tasks.find((task) => task.id === id);

    if (!task) {
        return res.status(404).json({
            error: "task not found",
        });
    }

    task.title = req.body.title ?? task.title;
    task.completed = req.body.completed ?? task.completed;

    res.json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = tasks.findIndex((task) => task.id === id);

    if (index === -1) {
        return res.status(404).json({
            error: "task not found",
        });
    }

    tasks.splice(index, 1);

    res.status(204).send();
});

module.exports = app;