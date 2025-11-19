import React from 'react'

const TaskStatusTabs = ({tabs, activeTab, setActiveTab}) => {
  return (
    <div className='flex justify-center items-center gap-5 m-2'>
      {tabs?.map((tabs, index) => (
        <button type='button' key={index} className={`flex items-center gap-2 border-b-2 p-2 hover:cursor-pointer ${activeTab === tabs.label ? 'border-blue-600' : 'border-transparent'}`} onClick={() => setActiveTab(tabs.label)}>
            <div className={`text-sm ${activeTab === tabs.label ? 'text-blue-600' : 'text-gray-400'}`}>
                {tabs.label}
            </div>
            <div className={`size-5 rounded-full p-2 flex justify-center items-center text-xs ${activeTab === tabs.label ? 'bg-blue-600 text-white' : 'bg-gray-400/60'}`}>
                {tabs.count}
            </div>
        </button>
      ))}
    </div>
  )
}

export default TaskStatusTabs
