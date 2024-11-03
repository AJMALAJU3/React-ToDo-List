import React, { useState, useEffect } from 'react';

// Helper function to get lists from localStorage
const getMyLists = () => {
  const lists = localStorage.getItem('lists');
  if (lists) {
    try {
      return JSON.parse(lists);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return [];
    }
  } else {
    return [];
  }
};

function SortedData({ sort, list, date, tag, selectAll, listId }) {
  const [lists, setLists] = useState(getMyLists());
  const [greeting, setGreeting] = useState('');

  // Set greeting based on the current time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good Morning');
    } else if (hour >= 12 && hour < 17) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  // Get current date information
  const today = new Date();
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(today);
  const day = today.getDate();

  const shouldShowTask = (todolist) => {
    if (Array.isArray(date) && (date.includes(todolist.date) || tag.some(t => todolist.tags.includes(t)))) {
      return true;
    }
    return false;
  };

  return (
    <div className="md:col-span-7 flex flex-col w-full">
      {/* Header Section */}
      <div className="p-10 pt-10 w-full flex items-center justify-center">
        <h1 className="text-3xl font-bold text-stone-100 rounded-lg text-center mr-5">
          <div className="flex flex-col items-center">
            <span className="block text-3xl">{month}</span>
            <span className="block text-4xl">{day}</span>
          </div>
        </h1>
        <div>
          <h1 className="text-6xl font-bold text-stone-300">{greeting}</h1>
          <h1 className="text-4xl font-bold text-stone-700 ml-4">Plan Your Task's Today!</h1>
        </div>
      </div>

      {/* List Rendering Section */}
      <div className="col-span-10 px-10 py-4 text-stone-100 w-full flex flex-col items-center">
        <div className="w-full">
          <ul id="taskList" className="space-y-4">
            {lists.map((myList, index) => {
              if (selectAll) {
                // If selectAll is true, display all lists or filtered tasks based on sorting criteria
                return myList.todoList.map((todolist, subIndex) => {
                  if (shouldShowTask(todolist)) {
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
                  return null;
                });
              } else if (myList.id === listId) {
                // If selectAll is false, display only tasks from the specified listId and apply sorting
                return myList.todoList.map((todolist, subIndex) => {
                  if (shouldShowTask(todolist)) {
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
                  return null;
                });
              }
              return null;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SortedData;
