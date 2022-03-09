import { createContext } from "react";
import { ToDo } from "./types/ToDo";

export interface ContextProps {
    createTodo?: (payload: {
        status?: string;
        description?: string;
    }) => Promise<void>;

    updateTodo?: (
        todo: { id: ToDo["id"] } & Omit<Partial<ToDo>, "id">
    ) => Promise<void>;

    deleteTodo?: (id: string) => Promise<void>;
}

export const Context = createContext<ContextProps>({});
