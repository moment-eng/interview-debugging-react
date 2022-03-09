import { FC, useContext } from "react";
import { Context } from "../Context";
import { ToDo } from "../types/ToDo";

import { Trash } from "phosphor-react";

export interface ToDoItemProps extends ToDo {}

export const ToDoItem: FC<ToDoItemProps> = (props: any) => {
    const context = useContext(Context);

    const description = props.description || "Untitled";

    const checkHandler: React.ChangeEventHandler<HTMLInputElement> = () => {
        context.updateTodo?.({
            id: props.id,
            status: props.status === "todo" ? "done" : "todo",
        });
    };

    const trashHandler: React.MouseEventHandler = () => {
        context.deleteTodo?.(props.id);
    };

    return (
        <div className="py-3">
            <div className={"flex items-center space-x-2 font-medium"}>
                <input
                    id={props.id}
                    aria-describedby="comments-description"
                    name="comments"
                    type="checkbox"
                    className="focus:ring-indigo-500 hover:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded cursor-pointer"
                    checked={props.status === "completed"}
                    onChange={checkHandler}
                />
                <label
                    htmlFor={props.id}
                    className={
                        "flex-shrink overflow-hidden text-ellipsis cursor-pointer text-gray-800"
                    }
                >
                    {description}
                </label>
                <span className="flex-grow">{/* SPACER */}</span>
                <button
                    onClick={trashHandler}
                    className={
                        "hover:bg-red-500 hover:text-red-50 focus:bg-red-500 focus:text-red-50 rounded bg-gray-200 p-1 text-gray-500 focus:ring-red-500 hover:ring-red-500"
                    }
                    title="Delete"
                >
                    <Trash />
                </button>
            </div>
            <span
                className={"block font-mono text-xs text-gray-500 font-light "}
            >
                {props.id}
            </span>
        </div>
    );
};
