import { useRef, useState } from 'react';
import Calendar from './components/Calender';
import { CalendarIcon } from '@heroicons/react/24/solid';
import SortMethods from './components/SortMethods';
import './App.css';

function App() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleBlur = () => {
    if (inputValue === '') {
      setIsExpanded(false);
    }
  };
  let newList = useRef(null)
  return (
    <section className="grid grid-cols-12 h-screen">
      <div className="md:col-span-2 bg-neutral-700  hidden lg:block">
        <div className="mb-5 flex justify-center items-center p-4 space-x-2">
          <h1 className="font-semibold text-stone-100 text-lg md:text-2xl lg:text-3xl rounded-lg">
            TODO LIST
          </h1>
          <CalendarIcon className="w-10 h-10 text-amber-400 p-1" />
        </div>

        <div class=" rounded-lg p-2 w-full max-w-md">
          <h1 class="font-bold text-1xl mb-4 text-stone-100">My Lists</h1>
          <div class="mb-4">
          </div>
          <ul id="taskList" class="space-y-1">
            <li class="flex justify-between items-center  text-stone-100 hover:text-stone-600  p-3 rounded-lg hover:bg-amber-300 shadow-lg">
              JavaScript
              <button class="rounded-lg px-2 py-1 text-stone-600 font-bold">X</button>
            </li>
            <li class="flex justify-between items-center text-stone-100 hover:text-stone-600  p-3 rounded-lg hover:bg-amber-300 shadow-lg">
              Node
              <button class="rounded-lg px-2 py-1 text-stone-600 font-bold">X</button>
            </li>
            <li class="flex justify-between items-center text-stone-100 hover:text-stone-600  p-3 rounded-lg hover:bg-amber-300 shadow-lg">
              Express
              <button class="rounded-lg px-2 py-1 text-stone-600 font-bold">X</button>
            </li>
            <li class="flex justify-between items-center text-stone-100 hover:text-stone-600  p-3 rounded-lg hover:bg-amber-300 shadow-lg">
              React
              <button class="rounded-lg px-2 py-1 text-stone-600 font-bold">X</button>
            </li>
            <li class="flex justify-between items-center text-stone-100 hover:text-stone-600  p-3 rounded-lg hover:bg-amber-300 shadow-lg">
              MongoDb
              <button class="rounded-lg px-2 py-1 text-stone-600 font-bold">X</button>
            </li>
          </ul>
          {/* <input type="text" ref={newList} id="taskInput" class="border rounded-lg p-2 w-full bg-none" placeholder="+ New List" /> */}
          <button id="addTaskButton" class="mt-4 font-bold text-neutral-400 rounded-lg px-4 py-2 w-full ">+ New List</button>
        </div>
      </div>
      <div className="md:col-span-7 flex flex-col  items-center w-full">

        <div className="p-10 pt-10 grid grid-cols-12 gap-2 w-full">
          <h1 className="text-3xl font-bold text-stone-100 rounded-lg col-span-2 text-center">
            <div className="flex flex-col items-center">
              <span className="block">Feb</span>
              <span className="block text-6xl">4</span>
            </div>
          </h1>
          <div className="col-span-10">
            <div>
              <h1 className="text-6xl font-bold text-stone-100">Good Afternoon</h1>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-stone-500">What's Your Plan Today?</h1>
            </div>
          </div>
        </div>


        <div className="col-span-10 px-10 py-4 text-stone-100 w-full flex flex-col items-center">
          <div className='w-full'>
            {/* <input
  type="text"
  ref={newList}
  id="taskInput"
  class="border-none outline-none focus:outline-none focus:ring-0 bg-neutral-500 rounded-lg p-2 w-full"
  placeholder="+ New List"
/> */}
            <ul id="taskList" class="space-y-4">
              <li className="bg-neutral-700 p-3 text-stone-100 hover:text-stone-50 rounded-lg shadow-lg space-y-3">
                <div className="flex justify-between items-center">
                  <input
                    type="text"
                    ref={newList}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => setInputValue(e.target.value)}
                    id="taskInput"
                    className="border-none outline-none focus:outline-none focus:ring-0 bg-neutral-700 rounded-lg p-2 w-full pt-4"
                    placeholder="Add Todo"
                  />
                  {isExpanded && (
                    <button className="rounded-lg px-2 py-1 text-stone-600 font-bold">Add</button>
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
              </li>

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


      <div className="md:col-span-3 bg-neutral-700 hidden lg:block">
        <Calendar />
        <SortMethods />
      </div>
    </section>
  );
}

export default App;
// import React, { useState } from 'react';

// const ExpandableInput = () => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [inputValue, setInputValue] = useState('');

//   const handleFocus = () => {
//     setIsExpanded(true);
//   };

//   const handleBlur = () => {
//     if (inputValue === '') {
//       setIsExpanded(false);
//     }
//   };

//   const options = ['adsf','asdf']

//   return (
//     <div
//       className={`transition-all duration-300 ${isExpanded ? 'h-40' : 'h-16'} bg-gray-100 p-4 rounded-lg border border-gray-300`}
//     >
//       <input
//         type="text"
//         value={inputValue}
//         onFocus={handleFocus}
//         onBlur={handleBlur}
//         onChange={(e) => setInputValue(e.target.value)}
//         className="w-full border border-gray-400 rounded p-2"
//         placeholder="Type here..."
//       />
//       {isExpanded && (
//         <div className="mt-2">
//           {options.map((option, index) => (
//             <div key={index} className="">
//               {option}
//             </div>
//           ))}
//         </div>
//       )}

//     </div>
//   );
// };

// export default ExpandableInput;

