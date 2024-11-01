import React, { useState, useEffect } from 'react';
import {PlusIcon,TrashIcon , ChevronLeftIcon, ChevronRightIcon,PencilIcon } from '@heroicons/react/24/solid';


const Calendar = ({ list, calendarSort, isSort, setTags, tg }) => {

  const [sortDay, setSortDay] = useState([])
  const [sortTag, setSortTag] = useState([])
  const [selectAll, setSelectAll] = useState(false)

  const [sortIsEdit, setSortIsEdit] = useState(false)
  const [addTagText,setAddTagText] = useState('')

  useEffect(() => {
    console.log(sortDay, 'day');
    if (sortDay.length > 0 || sortTag.length > 0 || selectAll) {
      isSort(true)
      calendarSort(sortDay, sortTag, selectAll)
    } else {
      isSort(false)
    }

  }, [sortDay, sortTag, selectAll])


  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };
  const addTag = (tag) => {
    tag = tag.toLowerCase()
    setTags(prev => {
      if (!prev.includes(tag)) {
        return [...prev, tag]
      }
      return prev;
    });
    setAddTagText('')
  };
  const days = [...Array(daysInMonth(month, year)).keys()].map((day) => day + 1);
  const firstDayIndex = getFirstDayOfMonth(month, year);

  const currentDate = new Date();
  const isCurrentDay = (day) =>
    day === currentDate.getDate() &&
    month === currentDate.getMonth() &&
    year === currentDate.getFullYear();

  const [freqTasks, setFreqTasks] = useState({});

  useEffect(() => {
    const taskOfDays = {};
    list.forEach((li) => {
      li.todoList.forEach((task) => {
        const taskDate = new Date(task.date);
        const taskDay = taskDate.getDate();
        const taskMonth = taskDate.getMonth();
        const taskYear = taskDate.getFullYear();


        if (taskMonth === month && taskYear === year) {
          if (taskOfDays[taskDay]) {
            taskOfDays[taskDay].push(task.id);
          } else {
            taskOfDays[taskDay] = [task.id];
          }
        }
      });
    });

    setFreqTasks(taskOfDays);
    console.log(taskOfDays, 'sadf')
  }, [list, month, year]);

  return (
    <>
      <div className="max-w-md mx-auto mt-8 p-4 md:p-6 lg:p-8">
        <div className=''>
          <div className="flex justify-between items-center mb-4">
            <button onClick={handlePrevMonth} className="rounded-lg bg-stone-500 hover:bg-stone-600 p-2 md:p-3">
              <ChevronLeftIcon className="w-6 h-6 text-amber-50" />
            </button>
            <span className="flex flex-col text-center">
              <span className="text-amber-50 font-bold text-lg md:text-xl lg:text-2xl"> {year}</span>
              <span className="text-amber-50 font-bold text-base md:text-lg lg:text-xl">
                {new Date(year, month).toLocaleString('default', { month: 'long' })}
              </span>
            </span>
            <button onClick={handleNextMonth} className="rounded-lg bg-stone-500 hover:bg-stone-600 p-2 md:p-3">
              <ChevronRightIcon className="w-6 h-6 text-amber-50" />
            </button>
          </div>

          <div className="grid grid-cols-7 text-center font-semibold mb-2 text-amber-50">
            <div className="p-2">S</div>
            <div className="p-2">M</div>
            <div className="p-2">T</div>
            <div className="p-2">W</div>
            <div className="p-2">T</div>
            <div className="p-2">F</div>
            <div className="p-2">S</div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: firstDayIndex }, (_, index) => (
              <div key={index} className="p-4 rounded-lg" />
            ))}

            {days.map((day) => {
              const taskCount = freqTasks[day] ? freqTasks[day].length : 0;

              const getBgColor = (taskCount) => {
                if (taskCount === 0) return 'bg-neutral-700';
                if (taskCount > 0) return 'bg-neutral-800';
                // return 'bg-amber-600';
              };

              return (
                <div
                  key={day}
                  onClick={() => setSortDay(prev => {
                    let updatedDays = [...prev];
                    const clickedDay = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                    if (prev.includes(clickedDay)) {
                      updatedDays = updatedDays.filter(p => p !== clickedDay);
                    } else {
                      updatedDays = [...updatedDays, clickedDay];
                    }
                    return updatedDays;
                  })}
                  className={`p-2 my-2 rounded-full text-center text-amber-50 text-xs md:text-sm ${sortDay.includes(`${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`) ?
                      'bg-neutral-500 ring-2 ring-neutral-400' :
                      getBgColor(taskCount)
                    } ${isCurrentDay(day) ? 'ring-2 ring-amber-400' : ''}`}

                >
                  {day}
                </div>
              );
            })}
          </div>

          <div className="w-full flex items-center justify-around py-6">
            <button
              onClick={() => {
                setSelectAll(false)
                setSortDay([])
                setSortTag([])
              }}
              className='rounded-md py-1 px-4 font-semibold text-md 
       bg-stone-500 hover:bg-stone-600 text-amber-50 transition-300'>
              Refresh
            </button>
            <button
              onClick={() => setSelectAll((p) => !p)}
              className={`rounded-md py-1 px-4 font-semibold text-md ${selectAll
                  ? 'hover:text-stone-600 bg-amber-300 hover:bg-amber-200'
                  : 'bg-stone-500 hover:bg-stone-600 text-amber-50 transition-300'
                }`}
            >
              Show All
            </button>
          </div>
        </div>
        <div className='max-w-md mx-auto '>
          <div className='flex justify-between'>
            <h1 className='text-amber-50 font-bold mb-2'>Sort Methods</h1>
            <button onClick={() => setSortIsEdit(p => !p)} className='font-bold text-neutral-300'>{!sortIsEdit ? <PencilIcon
                            className="h-4 w-4 text-neutral-400 cursor-pointer"
                          /> : 'Done'}</button>
          </div>

          <div class="flex flex-wrap w-full gap-1 ">
          <div className={`flex gap-3 w-full items-center ${sortIsEdit?'block':'hidden'}`}>
                    <input
                      type="text"
                      onChange={(e)=>setAddTagText(e.target.value)}
                      value={addTagText}
                      className={` rounded-md cursor-pointer w-auto flex items-center justify-center text-amber-50 bg-neutral-900 border-0 p-2 focus:outline-none`}
                    />

                    <PlusIcon
                      className={`h-5 w-5 text-neutral-400 cursor-pointer`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if(addTagText !== ''){
                          addTag(addTagText)
                        }
                        
                      }}
                    />
                  </div>

            {Array.isArray(tg) && tg.length > 0 ? (
              tg.map((t, index) => (

                !sortIsEdit ? (<div
                  key={index}
                  onClick={() => {
                    setSortTag(prev => {
                      if (prev.includes(t)) {
                        return prev.filter(tag => tag !== t);
                      } else {
                        return [...prev, t];
                      }
                    });
                  }}
                  className={`${sortTag.includes(t) ? 'bg-neutral-500 px-1 rounded-md ' : ''} cursor-pointer w-auto p-1 flex items-center justify-center text-amber-50`}
                >
                  #{t}
                </div>) : (
                  <div className='flex gap-3 w-full items-center '>
                    <input
                      type="text"
                      value={t}
                      className={` rounded-md cursor-pointer w-auto flex items-center justify-center text-amber-50 bg-neutral-900 border-0 p-2 focus:outline-none`}
                    />

                    <TrashIcon
                      className={`h-5 w-5 text-neutral-400 cursor-pointer`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setTags(tags=>tags.filter(p=>p!==t))
                      }}
                    />
                  </div>

                )
              ))
            ) : (
              <div className='text-amber-50'>No tags available !</div>
            )}
          </div>


        </div>
      </div>
    </>
  );
};

export default Calendar;
