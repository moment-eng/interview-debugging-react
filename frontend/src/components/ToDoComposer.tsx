import { useContext, useState } from "react";
import { Context } from "../Context";

export const ToDoComposer = () => {
    const [label, setLabel] = useState("");

    const context = useContext(Context);

    const inputHandler: React.ChangeEventHandler<HTMLInputElement> = (
        event
    ) => {
        setLabel(event.target.value);
    };

    const submitHandler: React.FormEventHandler = async (event) => {
        event.preventDefault();
        await context.createTodo?.({ description: label });
        setLabel("");
    };

    return (
        <div className="bg-gray-100 text-gray-800 border-gray-500 shadow-sm rounded p-4">
            <form className="flex items-stretch" onSubmit={submitHandler}>
                <input
                    type="text"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={label}
                    onChange={inputHandler}
                />
                <input
                    type="submit"
                    value="Add"
                    className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                />
            </form>
        </div>
    );
};
