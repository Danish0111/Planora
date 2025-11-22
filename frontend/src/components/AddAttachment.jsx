import { Paperclip, Trash } from "lucide-react";
import { useState } from "react";

const AddAttachment = ({ attachments, setAttachments }) => {
    const [option, setOption] = useState("");

    const handleAddOption = () => {
        if (option.trim()) {
            setAttachments([...attachments, option.trim()]);
            setOption("");
        }
    }

    const handleDeleteOption = (index) => {
        const updatedList = attachments.filter((_, i) => i !== index);
        setAttachments(updatedList);
    }
    return (
        <div className='w-full'>
            {attachments.map((item, index) => (
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
                    className="flex-1 border border-gray-300 rounded-lg w-20 px-4 py-2 focus:outline-none focus:border-blue-500"
                />
                <button
                    type="button"
                    onClick={() => handleAddOption()}
                    className="bg-blue-600/20 text-blue-600 rounded-lg px-4 py-2 hover:bg-blue-600/30 flex items-center gap-1 hover:cursor-pointer"
                >
                    <Paperclip size={16} className="" /> <span className="hidden md:block">Add</span>
                </button>
            </div>
        </div>
    )
}

export default AddAttachment
