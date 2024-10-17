import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <section className="grid grid-cols-12 h-screen">
      <div className="md:col-span-2 bg-stone-600 hidden md:block">
        <div class="text-center mb-5">
          {/* shadow-lg */}
          <h1 className='text-4xl font-bold text-white  p-5 rounded-lg'>ToDo List</h1>
        </div>
        <div class=" rounded-lg p-2 w-full max-w-md">
          <h1 class="font-bold text-1xl mb-4 text-white">My Lists</h1>
          <div class="mb-4">
            {/* <input type="text" id="taskInput" class="border border-gray-300 rounded-lg p-2 w-full" placeholder="Add a new task..."> */}
          </div>
          <ul id="taskList" class="space-y-1">
            <li class="flex justify-between items-center  p-3 rounded-lg hover:bg-amber-300 shadow-lg">
              Day 1
              <button class="rounded-lg px-2 py-1 text-stone-600">X</button>
            </li>
            <li class="flex justify-between items-center text-white hover:text-stone-600  p-3 rounded-lg hover:bg-amber-300 shadow-lg">
              Day 2
              <button class="rounded-lg px-2 py-1 text-stone-600">X</button>
            </li>
          </ul>
          <button id="addTaskButton" class="mt-4 text-gray rounded-lg px-4 py-2 w-full ">+ New List</button>
        </div>
      </div>
      <div className="md:col-span-7">
        gdfs
      </div>
      <div className="md:col-span-3 bg-stone-600 hidden md:block">
        sdfg
      </div>
    </section>
  );
}

export default App;
