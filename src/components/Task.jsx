import React, { useState, useEffect, useRef } from 'react'

const getMyLists=()=>{
  const lists = localStorage.getItem('lists')
  if(lists){
    try{
      console.log('list added');
      
      return JSON.parse(lists)
    }catch(error){
      console.error('Error parsing JSOn :',error)
      return []
    }
  }else{
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
  return parsedList.filter(li => li.id===id)[0] || {};
};



function Task(props) {
  const [lists, setLists] = useState(getMyLists());

  const tg = ['Hobby', 'Duty', 'Work', 'Study','Project']
  const [taskList, setTaskList] = useState(getlist(props.listId))

  const [taskText, setTaskText] = useState('')
  const [taskDate, setTaskDate] = useState("")
  const [taskTags, setTaskTags] = useState([])

  const [isExpanded, setIsExpanded] = useState(false);
  const today = new Date();
  const options = { month: 'short' };
  const month = new Intl.DateTimeFormat('en-US', options).format(today);
  const day = today.getDate();
  const [greeting, setGreeting] = useState('');

  const [isEdit,setIsEdit] = useState()

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

  useEffect(()=>{
    setTaskList(getlist(props.listId))
  },[props.listId])


  function AddTaskToList() {
    const newTask = {
      date: taskDate,
      task: taskText,
      tags:taskTags,
      status:'completed',
      id: Date.now()
    };
    console.log(newTask,'new');
    
    setTaskList((prevTaskList) => {
      const updatedTaskList = { ...prevTaskList };
      if (updatedTaskList.todoList.length > 0) {
        updatedTaskList.todoList = [...updatedTaskList.todoList, newTask];
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
      
      return updatedLists; 
    });
    setTaskText("");
    setTaskDate("");
    setTaskTags([])
    newList.current.focus()
  }
  useEffect(()=>{
    console.log('trigger lists',taskList);
    localStorage.setItem('lists',JSON.stringify(lists))
},[lists,taskList])

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
      <div className="md:col-span-7 flex flex-col  items-center w-full">

        <div className="p-10 pt-10 grid grid-cols-12 gap-2 w-full">
          <h1 className="text-3xl font-bold text-stone-100 rounded-lg col-span-2 text-center">
            <div className="flex flex-col items-center">
              <span className="block text-3xl">{month}</span>
              <span className="block text-4xl">{day}</span>
            </div>
          </h1>
          <div className="col-span-10">
            <div>
              <h1 className="text-6xl font-bold text-stone-100">{greeting}</h1>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-stone-500">What's Your Plan Today?</h1>
            </div>
          </div>
        </div>


        <div className="col-span-10 px-10 py-4 text-stone-100 w-full flex flex-col items-center">
          <div className='w-full'>
            <div className="bg-neutral-700 p-3 mb-5 text-stone-100 hover:text-stone-50 rounded-lg shadow-lg space-y-3">
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  ref={newList}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={(e) => setTaskText(e.target.value)}
                  id="taskInput"
                  value={taskText}
                  autocomplete="off"
                  className="border-none outline-none focus:outline-none focus:ring-0 bg-neutral-700 rounded-lg p-2 w-full pt-4"
                  placeholder="Add Todo"
                />
                {isExpanded && (
                  <button onClick={AddTaskToList} className={`rounded-lg px-2 py-1 ${taskText === '' ? 'text-stone-600' : 'text-stone-400'} font-bold`}>Add</button>
                )}
              </div>

              <div
                className={`transition-max-height duration-300 ease-in-out overflow-hidden flex flex-col  bg-neutral-700 text-stone-100 rounded-lg`}
                style={{
                  maxHeight: isExpanded ? '10rem' : '0',
                }}
              >
                {isExpanded && (
                  <div className="mt-2 transition-opacity duration-800 py-5 px-2 space-y-4 ease-in-out opacity-100">
                    <div className='grid grid-cols-3'>
                      <h1>Date </h1>
                      <span><input type="date" value={taskDate} onChange={(e) => setTaskDate(e.target.value)} className=" rounded-md bg-neutral-700 text-amber-50" /></span>
                    </div>
                    <div className='grid grid-cols-3'>
                      <h1>Tags </h1>
                      <span className='flex col-span-2'>
                        {tg.length > 0 && (
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
                                className={`${taskTags.includes(t) ? 'bg-stone-400' : ''} px-1 rounded-md cursor-pointer`}>
                                {t}
                              </p>
                            </div>
                          ))
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
                  
                  <li key={todoTask.id} className={`flex flex-col justify-between ${todoTask.id===isEdit ? 'bg-neutral-800' : 'bg-neutral-700'}  text-stone-100 hover:text-stone-600 p-3 rounded-lg hover:bg-neutral-800 shadow-lg`}>
                    <span
  className="flex items-center space-x-3"
  onClick={(e) => {
    // Prevent click events from bubbling up when clicking the parent span
    e.stopPropagation();
  }}
>
  <input
    type="checkbox"
    className="h-6 w-6 rounded-md accent-amber-300"
    checked={todoTask.status === 'completed'}
    onChange={(e) => {
      // Handle checkbox state change
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

      // Update `lists` state and sync with localStorage
      const updatedLists = lists.map((list) => {
        if (list.id === props.listId) {
          return { ...list, todoList: updatedTaskList.todoList };
        }
        return list;
      });

      setLists(updatedLists);
      localStorage.setItem('lists', JSON.stringify(updatedLists)); // Sync localStorage with updated lists
    }}
  />
  <span
    onClick={(e) => {
      // Prevent this click from triggering the parent onClick
      e.stopPropagation();
      setIsEdit((prevId) => (prevId === todoTask.id ? null : todoTask.id));
    }}
    className="flex flex-col mb-2"
  >
    <span className="text-neutral-400 text-xs">{todoTask.date}</span>
    <span
      className={`${
        todoTask.status === 'completed' ? 'line-through' : ''
      } text-neutral-400 text-md font-semibold`}
    >
      {todoTask.task}
    </span>
  </span>
</span>

                    <div
                      className={`transition-max-height duration-500 ease-in-out overflow-hidden flex flex-col  text-stone-100 rounded-lg`}
                      style={{
                      maxHeight: todoTask.id===isEdit ? '10rem' : '0',
                      }}
                    >
                      <div className="mt-2 transition-opacity duration-800 py-5 px-2 space-y-4 ease-in-out opacity-100">
                    <div className='grid grid-cols-3'>
                      <h1>Date </h1>
                      <span><input type="date" value={todoTask.date} onChange={(e) => setTaskDate(e.target.value)} className="px-2 rounded-md bg-neutral-700 text-amber-50" /></span>
                    </div>
                    <div className='grid grid-cols-3'>
                      <h1>Tags </h1>
                      <span className='flex col-span-2'>
                        {tg.length > 0 && (
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
                                className={`${todoTask.tags.includes(t) ? 'bg-neutral-700' : ''} px-1 rounded-md cursor-pointer`}>
                                {t}
                              </p>
                            </div>
                          ))
                        )}
                      </span>

                    </div>
                  </div>
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
      <div className="md:col-span-7 flex flex-col items-center w-full justify-center">
        <div className="p-10 pt-10 w-full flex items-center justify-center">
          <h1 className="text-3xl font-bold text-stone-100 rounded-lg text-center mr-5">
            <div className="flex flex-col items-center">
              <span className="block text-3xl">{month}</span>
              <span className="block text-4xl">{day}</span>
            </div>
          </h1>
          <div className="">
            <div>
              <h1 className="text-6xl font-bold text-stone-100">{greeting}</h1>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-stone-500 ml-4">What's Your Plan Today?</h1>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h1 className="font-bold text-stone-500">Select a list to add Task..</h1>
        </div>
      </div>
    )
  }
}

export default Task
