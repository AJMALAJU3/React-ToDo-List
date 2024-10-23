import React,{useState,useEffect} from 'react';

function SortedData(props) { 
    const today = new Date();
  const options = { month: 'short' };
  const month = new Intl.DateTimeFormat('en-US', options).format(today);
  const day = today.getDate();
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
  return (
    <div className="md:col-span-7 flex flex-col  w-full ">
        <div className="p-10 pt-10 w-full flex items-center justify-center">
          <h1 className="text-3xl font-bold text-stone-100 rounded-lg text-center mr-5">
            <div className="flex flex-col items-center">
              <span className="block text-3xl">{month}</span>
              <span className="block text-4xl">{day}</span>
            </div>
          </h1>
          <div className="">
            <div>
              <h1 className="text-6xl font-bold text-stone-300 ">{greeting}</h1>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-stone-700 ml-4">Plan Your Task's Today !</h1>
            </div>
          </div>
        </div>
        
        <div className="col-span-10 px-10 py-4 text-stone-100 w-full flex flex-col items-center">
          <div className='w-full'>
            
            <ul id="taskList" class="space-y-4">
                <li>sdfon</li>
            </ul>
          </div>
        </div>
      </div>
  );
}

export default SortedData;

