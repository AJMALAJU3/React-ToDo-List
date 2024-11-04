import React from 'react'

function listData({todolist,index,subIndex}) {
    return (
        <li
          key={`${index}-${subIndex}`}
          className="flex flex-col justify-between bg-neutral-700 text-stone-100 hover:text-stone-600 p-3 rounded-lg hover:bg-neutral-800 shadow-lg"
        >
          <span
            className="flex items-center space-x-3 justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="h-6 w-6 rounded-md accent-amber-300"
                checked={todolist.status === 'completed'}
                readOnly
              />
              <span className="flex flex-col mb-2">
                <span className="text-neutral-400 text-xs">{todolist.date}</span>
                <span
                  className={`${
                    todolist.status === 'completed'
                      ? 'line-through text-neutral-400'
                      : 'text-neutral-300'
                  } text-md font-semibold mb-1 mt-1`}
                >
                  {todolist.task}
                </span>
                <span className="text-neutral-400 text-xs">
                  {todolist.tags.map(tag => `#${tag.toLowerCase()} `)}
                </span>
              </span>
            </div>
          </span>
        </li>
      );
}

export default listData
