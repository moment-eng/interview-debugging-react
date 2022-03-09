import { FC } from "react";
import { ToDo } from "../types/ToDo";
import { ToDoItem } from "./ToDoItem";

export interface ToDoListProps {
    items: ToDo[];
}

export const ToDoList: FC<ToDoListProps> = ({ items }) => {
    return (
        <div
            className={
                "bg-gray-100 text-gray-800 border-gray-500 shadow-sm rounded px-4 py-2"
            }
        >
            <div className={"divide-y divide-gray-200"}>
                {items.map((item, index) => {
                    return <ToDoItem {...item} key={item.id} />;
                })}
            </div>
        </div>
    );
};
