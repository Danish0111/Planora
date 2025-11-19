import { Plus, Trash } from 'lucide-react';
import React, { useState } from 'react'

const TodoListInput = ({ todoList, setTodoList }) => {
    const [option, setOption] = useState("");

    const handleAddOption = () => {
        if (option.trim()) {
            setTodoList([...todoList, option.trim()]);
            setOption("");
        }
    }

    const handleDeleteOption = (index) => {
        const updatedList = todoList.filter((_, i) => i !== index);
        setTodoList(updatedList);
    }

    return (
        <div className='w-full'>
            {todoList.map((item, index) => (
                <div className="flex justify-between items-center mb-2 bg-gray-100 p-2 px-3 rounded-lg" key={index}>
                    <div className="flex items-center gap-2 rounded-md">
                        <span className='text-gray-400'>{index < 9 ? `0${index + 1}` : index + 1}</span>
                        <p className=''>{item}</p>
                    </div>
                    <Trash type="button" onClick={() => handleDeleteOption(index)} className="size-5 text-red-500 hover:text-red-700 hover:cursor-pointer" />
                </div>
            ))}
            <div className="flex gap-2 w-full">
                <input
                    type="text"
                    value={option}
                    onChange={(e) => setOption(e.target.value)}
                    placeholder="Enter Task"
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                />
                <button
                    type="button"
                    onClick={() => handleAddOption()}
                    className="bg-blue-600/20 text-blue-600 rounded-lg px-4 py-2 hover:bg-blue-600/30 flex items-center gap-1 hover:cursor-pointer"
                >
                    <Plus size={16} className="" /> Add
                </button>
            </div>
        </div>
    )
}

export default TodoListInput
