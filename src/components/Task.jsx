import React, { useState, useEffect, useRef } from 'react'
import { PencilIcon, XMarkIcon, TrashIcon,CalendarIcon,FolderPlusIcon} from '@heroicons/react/24/solid';



const getMyLists = () => {
  const lists = localStorage.getItem('lists')
  if (lists) {
    try {
      return JSON.parse(lists)
    } catch (error) {
      console.error('Error parsing JSOn :', error)
      return []
    }
  } else {
    return []
  }
}
const getlist = (id) => {
  const list = localStorage.getItem('lists');
  const parsedList = list ? JSON.parse(list) : [];
  if (!Array.isArray(parsedList)) {
    console.error("Parsed list is not an array");
    return {};
  }
  console.log(parsedList.filter(li => li.id === id)[0], 'listssssss')
  return parsedList.filter(li => li.id === id)[0] || {};
};


const updateChanges = (updatedTaskList, lists, id) => {
  const updatedLists = lists.map((list) => {
    if (list.id === id) {
      return { ...list, todoList: updatedTaskList.todoList };
    }
    return list;
  });

  return updatedLists
}

function Task(props) {
  const [isDeleting, setIsDeleting] = useState(null);
  const handleDelete = (taskId) => {
    setIsDeleting(taskId);
    setTimeout(() => {
      let updated = { ...taskList };
      updated.todoList = updated.todoList.filter((task) => task.id !== taskId);
      setTaskList(updated);
      setLists(updateChanges(updated, lists, props.listId));
      setIsDeleting(null);
    }, 500);
  };

  const [lists, setLists] = useState(getMyLists());

  const tg = props.tg
  const [taskList, setTaskList] = useState(getlist(props.listId))
  const dateInputRef = useRef(null);
  const [taskText, setTaskText] = useState('')
  const [taskDate, setTaskDate] = useState("")
  const [taskTags, setTaskTags] = useState([])

  const [isExpanded, setIsExpanded] = useState(false);
  const today = new Date();
  const options = { month: 'short' };
  const month = new Intl.DateTimeFormat('en-US', options).format(today);
  const day = today.getDate();
  const [greeting, setGreeting] = useState('');

  const [isEdit, setIsEdit] = useState()

  const handleFocus = () => {
    setIsEdit(null)
    setIsExpanded(true);
  };
  const handleBlur = () => {
    if (taskText === '') {
      setTaskTags([])
      setIsExpanded(false);
    }
  };
  let newList = useRef(null)
  useEffect(() => {
    setTaskList(getlist(props.listId))
  }, [props.listId])


  function AddTaskToList() {
    const newTask = {
      date: taskDate,
      task: taskText,
      tags: taskTags,
      status: 'pending',
      id: Date.now()
    };
    console.log(newTask, 'new');

    setTaskList((prevTaskList) => {
      const updatedTaskList = { ...prevTaskList };
      if (!updatedTaskList.todoList) {
        updatedTaskList.todoList = [newTask];
      } else {
        updatedTaskList.todoList = [...updatedTaskList.todoList, newTask];
      }

      return updatedTaskList;
    });

    setLists(getMyLists())
    setLists((prevLists) => {
      const updatedLists = prevLists.map(list => {
        if (list.id === props.listId) {

          return {
            ...list,
            todoList: [...list.todoList, newTask]
          };
        }
        return list;
      });
      props.taskUpdate(updatedLists)

      return updatedLists;
    });
    localStorage.setItem('lists', JSON.stringify(lists));
    setTaskText("");
    setTaskDate("");
    setTaskTags([])
    newList.current.focus()

  }
  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists))
  }, [lists, taskList])

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

  if (props.listId) {
    return (
      <div className="md:col-span-10 md:col-start-2 flex flex-col lg:col-span-7  items-center w-full overflow-y-auto mt-8" style={{ scrollbarWidth: 'none' }} onClick={()=>props.rightMenu(false)}>


        <div className="p-10 pt-10  w-full flex justify-center items-center">
          <h1 className="text-3xl font-bold text-stone-100 rounded-lg  text-center">
            <div className="flex flex-col items-center">
              <span className="block md:text-3xl text-2xl">{month}</span>
              <span className="block md:text-4xl text-1xl">{day}</span>
            </div>
          </h1>
          <div className="ml-3">
            <div>
              <h1 className="md:text-6xl text-3xl font-bold text-stone-100 w-auto">{greeting}</h1>
            </div>
            <div className=''>
              <h1 className="md:text-4xl text-1xl font-bold text-stone-500 w-auto">Plan Your Task's Today!</h1>
            </div>
          </div>
        </div>


        <div className="col-span-10 px-10 py-4 text-stone-100 w-full flex flex-col items-center">
          <div className='w-full'>
            <div className="bg-neutral-700 p-3 mb-5 text-stone-100 hover:text-stone-50 rounded-lg shadow-lg space-y-3">
              <div className="flex justify-between items-center pt-3">
                <input
                  type="text"
                  ref={newList}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={(e) => setTaskText(e.target.value)}
                  id="taskInput"
                  value={taskText}
                  autocomplete="off"
                  className="border-none outline-none focus:outline-none focus:ring-0 bg-neutral-800 rounded-lg p-2 w-full"
                  placeholder="Add Todo"
                />
                <FolderPlusIcon onClick={!taskText ? null : AddTaskToList} className={`w-12 rounded-lg px-2 py-1 ${taskText === '' ? 'text-neutral-600' : 'text-neutral-200'} font-bold`}/>

              </div>

              <div
                className={`transition-max-height duration-300 ease-in-out overflow-hidden flex flex-col  bg-neutral-700 text-stone-100 rounded-lg`}
                style={{
                  maxHeight: isExpanded ? '10rem' : '0',
                }}
              >
                {isExpanded && (
                  <div className="mt-2 transition-opacity duration-800 bg-neutral-800 p-2 space-y-4 ease-in-out opacity-100 rounded-lg">
                    <div className='grid grid-cols-3'>
                      <h1>Date </h1>
                      <span
      onClick={() => dateInputRef.current && dateInputRef.current.showPicker()}
      className="cursor-pointer relative flex items-center col-span-2 md:col-span-1"
    >
      <input
        type="date"
        ref={dateInputRef}
        value={taskDate}
        onChange={(e) => setTaskDate(e.target.value)}
        className="rounded-md bg-neutral-700 p-2 text-amber-50 outline-none w-full"
      />
      <CalendarIcon className='w-6 absolute right-1' />
    </span>
                    </div>
                    <div className='grid grid-cols-3'>
  <h1>Tags</h1>
  <span className=' cursor-pointer flex flex-wrap w-full gap-1 col-span-2'
  style={{ height: '12vh', overflowY: 'auto', paddingBottom: '1em', scrollbarWidth: 'none' }}>
    {tg.length > 0 ? (
      tg.map(t => (
        <div className='p-1 text-center' key={t}>
          <p
            onClick={() => {
              setTaskTags((prevTaskTags) =>
                prevTaskTags.includes(t)
                  ? prevTaskTags.filter(tag => tag !== t)
                  : [...prevTaskTags, t]
              );
            }}
            className={`${
              taskTags.includes(t) ? 'bg-stone-400' : ''
            } px-1 rounded-md cursor-pointer`}>
            {t}
          </p>
        </div>
      ))
    ) : (
      <p className='text-yellow-500'>" Add tags to prioritise and sort easily "</p>
    )}
  </span>
</div>

                  </div>
                )}
              </div>
            </div>
            <ul id="taskList" class="space-y-4">
              {props.listId && taskList.todoList && Array.isArray(taskList.todoList) ? (
                taskList.todoList.map((todoTask) => (

                  <li
                    key={todoTask.id}
                    className={`flex flex-col justify-between 
                    ${todoTask.id === isEdit ? 'bg-neutral-800' : 'bg-neutral-700'}  
                    text-stone-100 hover:text-stone-600 p-3 rounded-lg 
                    hover:bg-neutral-800 shadow-lg 
                    ${isDeleting === todoTask.id ? 'transition-all transform scale-0 opacity-0 duration-500 ease-in-out' : 'transition-all duration-300 ease-in-out'}`}
                  >
                    <span
                      className="flex items-center space-x-3 justify-between"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          className="h-6 w-6 rounded-md accent-amber-300"
                          checked={todoTask.status === 'completed'}
                          onChange={(e) => {
                            const updatedTaskList = { ...taskList };
                            updatedTaskList.todoList = updatedTaskList.todoList.map((task) => {
                              if (task.id === todoTask.id) {
                                return {
                                  ...task,
                                  status: task.status === 'completed' ? 'pending' : 'completed',
                                };
                              }
                              return task;
                            });
                            setTaskList(updatedTaskList);
                            setLists(updateChanges(updatedTaskList, lists, props.listId))
                            localStorage.setItem('lists', JSON.stringify(updateChanges(updatedTaskList, lists, props.listId)));
                          }}
                        />
                        <span

                          className="flex flex-col mb-2"
                        >
                          <span className="text-neutral-400 text-xs">{todoTask.date}</span>
                          <span
                            className={`${todoTask.status === 'completed' ? 'line-through text-neutral-400' : 'text-neutral-300'
                              }  text-md font-semibold mb-1 mt-1`}
                          >
                            {todoTask.task}
                          </span>
                          <span className='text-neutral-400 text-xs'>
                            {todoTask.tags.map(tag => `#${tag.toLowerCase()} `)}
                          </span>
                        </span>
                      </div>

                      <div className="flex flex-col items-center space-x-2 space-y-8">
                        {todoTask.id === isEdit ? (
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
                              setIsEdit(todoTask.id);
                            }}
                          />
                        )}

                      </div>

                    </span>


                    <div
                      className={`transition-max-height duration-500 ease-in-out overflow-hidden flex   justify-between text-stone-100 rounded-lg overflow-y-auto`}
                      style={{
                        maxHeight: todoTask.id === isEdit ? '10rem' : '0', scrollbarWidth: 'none'
                      }}
                    >
                      <div className="mt-2 transition-opacity duration-800 py-5 px-2 space-y-4 ease-in-out opacity-100">
                        <div className='grid grid-cols-3'>
                          <h1>Task </h1>
                          <span className='col-span-2'><input type="text" value={todoTask.task} onChange={(e) => {
                            const updatedTaskList = { ...taskList };
                            updatedTaskList.todoList = updatedTaskList.todoList.map((task) => {
                              if (task.id === todoTask.id) {
                                return {
                                  ...task,
                                  task: e.target.value,
                                };
                              }
                              return task;
                            });
                            setTaskList(updatedTaskList)
                            setLists(updateChanges(updatedTaskList, lists, props.listId))
                            localStorage.setItem('lists', JSON.stringify(updateChanges(updatedTaskList, lists, props.listId)));
                            props.taskUpdate(updateChanges(updatedTaskList, lists, props.listId))
                          }} className="px-2 rounded-md bg-neutral-700 text-amber-50 border-none outline-none focus:outline-none focus:ring-0 w-full" /></span>
                        </div>
                        <div className='grid grid-cols-3'>
                          <h1>Date </h1>
                          <span><input type="date" value={todoTask.date} onChange={(e) => {
                            const updatedTaskList = { ...taskList };
                            updatedTaskList.todoList = updatedTaskList.todoList.map((task) => {
                              if (task.id === todoTask.id) {
                                return {
                                  ...task,
                                  date: e.target.value,
                                };
                              }
                              return task;
                            });
                            setTaskList(updatedTaskList)
                            setLists(updateChanges(updatedTaskList, lists, props.listId))
                            localStorage.setItem('lists', JSON.stringify(updateChanges(updatedTaskList, lists, props.listId)));
                            props.taskUpdate(updateChanges(updatedTaskList, lists, props.listId))
                          }} className="px-2 rounded-md bg-neutral-700 text-amber-50" /></span>
                        </div>

                        <div className='grid grid-cols-3'>
                          <h1>Tags </h1>
                          <span className='flex col-span-2 flex-wrap'>
                            {tg.length > 0 && (
                              tg.map(t => (
                                <div className='p-1 text-center' key={t}>
                                  <p

                                    onClick={() => {
                                      let updatedLists = { ...taskList };
                                      updatedLists.todoList = updatedLists.todoList.map((task) => {
                                        if (task.id === todoTask.id) {
                                          return {
                                            ...task,
                                            tags: task.tags.includes(t)
                                              ? task.tags.filter((tag) => tag !== t)
                                              : [...task.tags, t],
                                          };
                                        }
                                        return task;
                                      });
                                      setTaskList(updatedLists)
                                      setLists(updateChanges(updatedLists, lists, props.listId))
                                      localStorage.setItem('lists', JSON.stringify(updateChanges(updatedLists, lists, props.listId)));
                                      props.taskUpdate(updateChanges(updatedLists, lists, props.listId))
                                    }}
                                    className={`${todoTask.tags.includes(t) ? 'bg-neutral-700' : ''} px-1 rounded-md cursor-pointer`}>
                                    {t}
                                  </p>

                                </div>


                              ))
                            )}


                          </span>

                        </div>

                      </div>
                      
                      <TrashIcon
                        className={`h-5 md:w-5 w-10 text-neutral-400 cursor-pointer ${todoTask.id === isEdit ? 'block' : 'hidden'}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(todoTask.id); 
                        }}
                      />
                    </div>
                  </li>

                ))
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      
      <div className="md:col-span-7 flex flex-col items-center w-full justify-center h-screen" >
        <div className=" flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-stone-100 rounded-lg text-center">
            <div className="flex space-x-3  items-center">
              <span className="block text-3xl">{month} -</span>
              <span className="block text-3xl">{day}</span>
            </div>
          </h1>
          <div className="">
            
            <div>
              <h1 className="text-4xl font-bold text-amber-400 ml-4 text-center">Plan Your Task's Today !</h1>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h1 className="font-bold text-stone-400" onClick={()=>props.leftMenu(true)}>Select a list to add Task..</h1>
        </div>
      </div>
    )
  }
}

export default Task
