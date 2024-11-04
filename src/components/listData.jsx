import React, { useEffect, useState } from 'react';
import { PencilIcon, XMarkIcon, TrashIcon } from '@heroicons/react/24/solid';



function ListData({ todolist, index, subIndex, taskList, setTaskList, props ,listId ,setLists,lists,tg}) {

  const [isExpanded, setIsExpanded] = useState(false);
  const [isEdit, setIsEdit] = useState(null);


  const handleFocus = () => {
    setIsEdit(null);
    setIsExpanded(true);
  };
useEffect(()=>{
    console.log(lists[0].todoList,'eff lists');
    return console.log(lists[0].todoList,'eff lists');
},[lists])
  const handleBlur = () => {
    if (todolist.task === '') {
      setIsExpanded(false);
    }
  };

  const updateChanges = (updatedTaskList, lists, listId) => {
    return updatedTaskList;
  };

  const handleDelete = (id) => {
    const updatedTaskList = {
      ...taskList,
      todoList: taskList.todoList.filter((task) => task.id !== id),
    };
    setTaskList(updatedTaskList);
    setLists(updateChanges(updatedTaskList, lists, props.listId));
    localStorage.setItem('lists', JSON.stringify(updateChanges(updatedTaskList, lists, props.listId)));
    props.taskUpdate(updateChanges(updatedTaskList, lists, props.listId));
  };

  return (
    <li
      key={`${index}-${subIndex}`}
      className="flex flex-col justify-between bg-neutral-700 text-stone-100 hover:text-stone-600 p-3 rounded-lg hover:bg-neutral-800 shadow-lg"
    >
      <span className="flex items-center space-x-3 justify-between" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            className="h-6 w-6 rounded-md accent-amber-300"
            checked={todolist.status === 'completed'}
            readOnly
            onClick={(e) => {
                e.stopPropagation();
                
                const newList = lists.map(list => {
                  if (list.id === listId) {
                    return {
                      ...list,
                      todoList: list.todoList.map(task => {
                        if (task.id === todolist.id) {
                          return {
                            ...task,
                            status: task.status === 'completed' ? 'pending' : 'completed'
                          };
                        }
                        return task;
                      })
                    };
                  }
                  return list;
                });
              
                setLists([...newList]);
                localStorage.setItem('lists', JSON.stringify(newList));
              }}
              
          />
          <span className="flex flex-col mb-2">
            <span className="text-neutral-400 text-xs">{todolist.date}</span>
            <span
              className={`${
                todolist.status === 'completed' ? 'line-through text-neutral-400' : 'text-neutral-300'
              } text-md font-semibold mb-1 mt-1`}
            >
              {todolist.task}
            </span>
            <span className="text-neutral-400 text-xs">
              {todolist.tags.map((tag) => `#${tag.toLowerCase()} `)}
            </span>
          </span>
        </div>
        <div className="flex flex-col items-center space-x-2 space-y-8">
          {todolist.id === isEdit ? (
            <XMarkIcon
              className="h-6 w-6 text-neutral-400 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setIsEdit(null);
              }}
            />
          ) : (
            <PencilIcon
              className="h-5 w-5 text-neutral-400 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setIsEdit(todolist.id);
              }}
            />
          )}
        </div>
      </span>
      <div
        className={`transition-max-height duration-500 ease-in-out overflow-hidden flex justify-between text-stone-100 rounded-lg`}
        style={{ maxHeight: todolist.id === isEdit ? '10rem' : '0', scrollbarWidth: 'none' }}
      >
        <div className="mt-2 py-5 px-2 space-y-4">
          <div className="grid grid-cols-3">
            <h1>Task </h1>
            <span className="col-span-2">
              <input
                type="text"
                value={todolist.task}
                onChange={(e) => {
                    const newList = lists.map(list => {
                        if (list.id === listId) {
                          return {
                            ...list,
                            todoList: list.todoList.map(task => {
                              if (task.id === todolist.id) {
                                return {
                                  ...task,
                                  task: e.target.value
                                };
                              }
                              return task;
                            })
                          };
                        }
                        return list;
                      });
                      setLists([...newList]);
                      localStorage.setItem('lists', JSON.stringify(newList));
                }}
                className="px-2 rounded-md bg-neutral-700 text-amber-50 border-none outline-none focus:ring-0 w-full"
              />
            </span>
          </div>

          <div className="grid grid-cols-3">
            <h1>Date </h1>
            <span>
              <input
                type="date"
                value={todolist.date}
                onChange={(e) => {
                    const newList = lists.map(list => {
                        if (list.id === listId) {
                          return {
                            ...list,
                            todoList: list.todoList.map(task => {
                              if (task.id === todolist.id) {
                                return {
                                  ...task,
                                 date: e.target.value
                                };
                              }
                              return task;
                            })
                          };
                        }
                        return list;
                      });
                    
                      setLists([...newList]);
                      localStorage.setItem('lists', JSON.stringify(newList));
                }}
                className="px-2 rounded-md bg-neutral-700 text-amber-50"
              />
            </span>
          </div>
          {/* Tags */}
          <div className="grid grid-cols-3">
            <h1>Tags </h1>
            <span className="flex col-span-2 flex-wrap">
            {tg.length > 0 && (
                              tg.map(t => (
                                <div className='p-1 text-center' key={t}>
                                  <p

                                    onClick={(e) => {
                                        e.stopPropagation();
                
                                        const newList = lists.map(list => {
                                          if (list.id === listId) {
                                            return {
                                              ...list,
                                              todoList: list.todoList.map(task => {
                                                if (task.id === todolist.id) {
                                                  return {
                                                    ...task,
                                                    tags: task.tags.includes(t)
                                              ? task.tags.filter((tag) => tag !== t)
                                              : [...task.tags, t]
                                                  };
                                                }
                                                return task;
                                              })
                                            };
                                          }
                                          return list;
                                        });
                                      
                                        setLists([...newList]);
                                        localStorage.setItem('lists', JSON.stringify(newList));
                                    }}
                                    className={`${todolist.tags.includes(t) ? 'bg-neutral-700' : ''} px-1 rounded-md cursor-pointer`}>
                                    {t}
                                  </p>

                                </div>


                              ))
                            )}
            </span>
          </div>
        </div>
        <TrashIcon
          className={`h-5 w-5 text-neutral-400 cursor-pointer ${todolist.id === isEdit ? 'block' : 'hidden'}`}
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(todolist.id);
          }}
        />
      </div>
    </li>
  );
}

export default ListData;
