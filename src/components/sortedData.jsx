import React, { useState, useEffect } from 'react';
import ListData from './listData';


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

function SortedData({ date, tag, selectAll, listId ,tg}) {
  const [lists, setLists] = useState(getMyLists());
  const [greeting, setGreeting] = useState('');

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
      <div className="p-10 pt-10 w-full flex items-center justify-center">
        {/* <h1 className="text-3xl font-bold text-stone-100 rounded-lg text-center mr-5">
          <div className="flex flex-col items-center">
            <span className="block text-3xl">{month}</span>
            <span className="block text-4xl">{day}</span>
          </div>
        </h1>
        <div>
          <h1 className="text-6xl font-bold text-stone-300">{greeting}</h1>
          <h1 className="text-4xl font-bold text-stone-700 ml-4">Plan Your Task's Today!</h1>
        </div> */}
        <h1 className="text-6xl font-bold text-stone-300">Sorted Tasks</h1>
      </div>

      <div className="col-span-10 px-10 py-4 text-stone-100 w-full flex flex-col items-center">
        <div className="w-full">
          <ul id="taskList" className="space-y-4">
            {lists.map((myList, index) => {
              if (selectAll && date.length === 0 && tag.length === 0) {
                return myList.todoList.map((todolist, subIndex) => (
                  <ListData key={`${index}-${subIndex}`} todolist={todolist} index={index} subIndex={subIndex} listId={myList.id} setLists={setLists} lists={lists} tg={tg}/>
                ));
              } else if (selectAll && (date.length > 0 || tag.length > 0)) {

                return myList.todoList.map((todolist, subIndex) => {
                  if (shouldShowTask(todolist)) {
                    return (
                      <ListData key={`${index}-${subIndex}`} todolist={todolist} index={index} subIndex={subIndex} listId={myList.id} setLists={setLists} lists={lists} tg={tg}/>
                    );
                  }
                  return null;
                });
              } else if (myList.id === listId) {

                return myList.todoList.map((todolist, subIndex) => {
                  if (shouldShowTask(todolist)) {
                    return (
                      <ListData key={`${index}-${subIndex}`} todolist={todolist} index={index} subIndex={subIndex} listId={myList.id} setLists={setLists} lists={lists} tg={tg}/>
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
