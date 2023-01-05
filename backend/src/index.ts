import { promises as fsp } from "fs";
import path from "path";
import { promisify } from "util";
import FastestValidator from "fastest-validator";
import Fastify from "fastify";
import { randomUUID } from "crypto";

/**
 * types
 */
type ToDoItem = {
    id: string;
    status: string;
    description: string;
};

/**
 * constants
 */
const FAKE_DB = path.resolve(__dirname, "fakedb.json");
const PORT = process.env.PORT || 3001;
const DELAY_SPEED = 500;

/**
 * utility functions
 */
const delay = promisify(setTimeout);
const generateId = () => randomUUID();
const createJSONString = (input: any) => JSON.stringify(input, null, 4);

/**
 * validation tooling
 */
const validator = new FastestValidator();

// schema for todo items
const itemSchema = {
    id: "string",
    status: { type: "string", enum: ["completed", "todo"] },
    description: "string",
};

// schema for fake db
const bodySchema = {
    todos: {
        type: "array",
        items: {
            type: "object",
            props: itemSchema,
        },
    },
};

const checkBody = validator.compile(bodySchema);
const checkItem = validator.compile(itemSchema);

/**
 * fastify
 */
const fastify = Fastify({
    logger: true,
});

fastify.register(require("@fastify/cors"), {
    origin: "*",
});

fastify.addHook("onSend", (req, reply, payload, next) => {
    reply.header("Access-Control-Allow-Origin", "*");
    reply.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin, Cache-Control"
    );
    next();
});

fastify.get("/", (_, response) => {
    response.send("Hello, World");
});

fastify.get("/todo", async () => {
    await delay(DELAY_SPEED);
    const todos = await fsp.readFile(FAKE_DB, { encoding: "utf-8" });
    const json: {
        todos: Array<{ status: string; id: number; description: string }>;
    } = JSON.parse(todos);

    const validation = await checkBody(json);

    if (validation !== true) {
        throw new Error(validation.map((err) => err.message).join("; "));
    }

    return json;
});

fastify.post<{
    Body: Omit<ToDoItem, "id">;
}>("/todo", async (request) => {
    await delay(DELAY_SPEED);

    const payload = {
        status: request.body.status || "todo", // set status with fallback
        description: request.body.description || "", // set description with fallback
        id: generateId(), // provide a UUID
    };

    const validation = await checkItem(payload);

    if (validation !== true) {
        throw new Error(validation.map((err) => err.message).join("; "));
    }

    const todos = await fsp.readFile(FAKE_DB, { encoding: "utf-8" });

    const json = JSON.parse(todos) as {
        todos: Array<{ [key: string]: string }>;
    };

    const output = { todos: [...json.todos, payload] };

    await fsp.writeFile(FAKE_DB, createJSONString(output), {
        encoding: "utf-8",
    });

    return payload;
});

fastify.delete<{
    Body: Partial<ToDoItem>;
}>("/todo", async (request) => {
    await delay(DELAY_SPEED);

    const id = request.body?.id;

    if (!id) {
        throw new Error(`No ID provided: ${JSON.stringify(request.body)}`);
    }

    const todos = await fsp.readFile(FAKE_DB, { encoding: "utf-8" });
    const json = JSON.parse(todos) as {
        todos: Array<{ [key: string]: string }>;
    };

    const todoToDeleteIndex = json.todos.findIndex((todo) => todo.id === id);

    if (todoToDeleteIndex < 0) {
        throw new Error(`To do item with id ${id} not found.`);
    }

    json.todos.splice(todoToDeleteIndex, 1);

    const output = { todos: [...json.todos] };

    await fsp.writeFile(FAKE_DB, createJSONString(output), {
        encoding: "utf-8",
    });

    return output;
});

fastify.put<{
    Body: Partial<ToDoItem>;
}>("/todo", async (request) => {
    await delay(DELAY_SPEED);
    const payload: { [key: string]: any } = Object.assign({}, request.body);

    const id = payload.id;

    if (!id) {
        throw new Error(`No ID provided: ${JSON.stringify(request.body)}`);
    }

    const todos = await fsp.readFile(FAKE_DB, { encoding: "utf-8" });
    const json = JSON.parse(todos) as {
        todos: Array<{ [key: string]: string }>;
    };

    const todoToUpdateIndex = json.todos.findIndex((todo) => todo.id === id);

    if (todoToUpdateIndex < 0) {
        throw new Error(`To do item with id ${id} not found.`);
    }

    // combine objects
    const updatedTodo = Object.assign(json.todos[todoToUpdateIndex], payload);

    const validation = await checkItem(updatedTodo);

    if (validation !== true) {
        throw new Error(validation.map((err) => err.message).join("; "));
    }

    json.todos[todoToUpdateIndex] = updatedTodo;

    const output = { todos: json.todos };

    await fsp.writeFile(FAKE_DB, createJSONString(output), {
        encoding: "utf-8",
    });

    return output;
});

fastify.listen(PORT, "0.0.0.0", (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }

    console.log(`now listening at ${address}`);
});
