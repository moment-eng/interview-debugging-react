import { useEffect, useState } from "react";
import { ToDoComposer } from "./components/ToDoComposer";
import { ToDoList } from "./components/ToDoList";
import { Context, ContextProps } from "./Context";
import { ToDo } from "./types/ToDo";
import { Clipboard } from "phosphor-react";

const API = "//localhost:3001/todo";

function App() {
    const [todos, setTodos] = useState<ToDo[]>([]);

    const fetchItems = async () => {
        const response = await fetch(API);
        const json = await response.json();

        setTodos(json.todos);
    };

    const actions: ContextProps = {
        updateTodo: async ({ id, ...rest }) => {
            fetch(API, {
                method: "PUT",
                headers: {
                    "Content-Type": "text/plain",
                },
                body: JSON.stringify({
                    id: id,
                    ...rest,
                }),
            });
            fetchItems();
        },
        deleteTodo: async (id) => {
            fetch(API, {
                method: "DELETE",
                headers: {
                    "Content-Type": "text/plain",
                },
                body: JSON.stringify({
                    id: id,
                }),
            });
            fetchItems();
        },
        createTodo: async ({ status, description }) => {
            fetch(API, {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain",
                },
                body: JSON.stringify({
                    status,
                    description,
                }),
            });
            fetchItems();
        },
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <Context.Provider value={actions}>
            <div className={"m-auto p-8 space-y-4 max-w-xl"}>
                <h1 className="font-bold text-2xl flex items-center space-x-3">
                    <Clipboard className="text-gray-500" /> <span>To Do</span>
                </h1>
                <ToDoList items={todos} />
                <ToDoComposer />
            </div>
        </Context.Provider>
    );
}

export default App;
