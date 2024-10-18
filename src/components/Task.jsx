import React,{useState,useEffect,useRef} from 'react'

function Task(props) {
    console.log(props)
    const [taskList,setTaskList] = useState({})
    const [task,setTask] = useState({id:null,task:null,date:null,tag:[],status:'completed'})
    const [taskText,setTaskText] = useState('')
    const [isExpanded, setIsExpanded] = useState(false);
    const today = new Date();
    const options = { month: 'short' }; 
    const month = new Intl.DateTimeFormat('en-US', options).format(today);
    const day = today.getDate();
    const [greeting, setGreeting] = useState('');

  const handleFocus = () => {
    setIsExpanded(true);
  };
  const handleBlur = () => {
    if (taskText === '') {
      setIsExpanded(false);
    }
  };
  let newList = useRef(null)

  function AddTaskToList() {
    setTask((prevTask) => ({
        ...prevTask,
        task: taskText,
        id: Date.now()
      }));
      console.log(task)
    setTaskList((prevTaskList) => {
        const updatedTaskList = { ...prevTaskList };
        if (updatedTaskList[props.listId]) {
            updatedTaskList[props.listId] = [...updatedTaskList[props.listId], task]; 
        } else {
            updatedTaskList[props.listId] = [task]; 
        }
        return updatedTaskList;
    });
    console.log(taskList)
}
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
if(props.listId){
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
                    className="border-none outline-none focus:outline-none focus:ring-0 bg-neutral-700 rounded-lg p-2 w-full pt-4"
                    placeholder="Add Todo"
                  />
                  {isExpanded && (
                    <button onClick={AddTaskToList} className="rounded-lg px-2 py-1 text-stone-600 font-bold">Add</button>
                  )}
                </div>

                <div
                  className={`transition-max-height duration-300 ease-in-out overflow-hidden flex flex-col justify-between items-center bg-neutral-700 text-stone-100 rounded-lg shadow-lg`}
                  style={{
                    maxHeight: isExpanded ? '10rem' : '0',
                  }}
                >
                  {isExpanded && (
                    <div className="mt-2 transition-opacity duration-800 ease-in-out opacity-100">
                      <p>dsfasdf</p>
                      <p>dsfasdf</p>
                      <p>dsfasdf</p>
                      <p>dsfasdf</p>
                      <p>dsfasdf</p>
                    </div>
                  )}
                </div>
              </div>
            <ul id="taskList" class="space-y-4">
              
              

              {props.listId && taskList[props.listId] && Array.isArray(taskList[props.listId]) ? (
            taskList[props.listId].map((todoTask) => (
              
              <li key={todoTask.id} className="flex justify-between items-center bg-neutral-700 text-stone-100 hover:text-stone-600 p-3 rounded-lg hover:bg-neutral-800 shadow-lg">
                <span className="flex items-center space-x-3">
                  <input type="checkbox" className="h-6 w-6 rounded-md accent-amber-300" checked={todoTask.status === 'completed'}/>
                  <span className="flex flex-col mb-2">
                    <span className="text-neutral-400 text-xs">{todoTask.date}</span>
                    <span className={`${todoTask.status==='completed'?"line-through":''} text-neutral-400 text-md font-semibold`}>{todoTask.task}</span>
                  </span>
                </span>
                <button className="rounded-lg px-2 py-1 text-stone-600 font-bold">X</button>
              </li>
            ))
          ) : null}



              <li class="flex justify-between items-center bg-neutral-700  text-stone-100 hover:text-stone-600  p-3 rounded-lg hover:bg-neutral-800 shadow-lg">
                <span className='flex items-center space-x-3'>
                  <input type="checkbox" checked class="h-6 w-6 rounded-md accent-amber-300" />
                  <span className="flex flex-col mb-2">
                    <span className="text-neutral-400 text-xs">12-1-23</span>
                    <span className="line-through text-neutral-400 text-md font-semibold">Todo task one</span>
                  </span>
                </span>
                <button class="rounded-lg px-2 py-1 text-stone-600 font-bold">X</button>
              </li>
              <li class="flex justify-between items-center  bg-neutral-700 text-stone-100 hover:text-stone-600  p-3 rounded-lg hover:bg-neutral-800 shadow-lg">
                <span className='flex items-center space-x-3'>
                  <input type="checkbox" class="h-6 w-6 rounded-md accent-amber-300" />
                  <span className="flex flex-col mb-2">
                    <span className="text-neutral-400 text-xs">12-1-23</span>
                    <span className=" text-neutral-400 text-md font-semibold">Todo task two</span>
                  </span>
                </span>
                <button class="rounded-lg px-2 py-1 text-stone-600 font-bold">X</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
  )
}else{
  return(
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
