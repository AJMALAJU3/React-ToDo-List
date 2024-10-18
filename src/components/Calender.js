// src/Calendar.js
import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const Calendar = () => {
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

  const days = [...Array(daysInMonth(month, year)).keys()].map((day) => day + 1);
  const firstDayIndex = getFirstDayOfMonth(month, year);

  const currentDate = new Date();
  const isCurrentDay = (day) =>
    day === currentDate.getDate() &&
    month === currentDate.getMonth() &&
    year === currentDate.getFullYear();

  return (
    <div className="max-w-md mx-auto mt-8 p-4 md:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="rounded-lg bg-stone-400 p-2 md:p-3">
          <ChevronLeftIcon className="w-6 h-6 text-amber-50" />
        </button>
        <span className="flex flex-col text-center">
          <span className="text-amber-50 font-bold text-lg md:text-xl lg:text-2xl"> {year}</span>
          <span className="text-amber-50 font-bold text-base md:text-lg lg:text-xl">
            {new Date(year, month).toLocaleString('default', { month: 'long' })}
          </span>
        </span>
        <button onClick={handleNextMonth} className="rounded-lg bg-stone-400 p-2 md:p-3">
          <ChevronRightIcon className="w-6 h-6 text-amber-50" />
        </button>
      </div>

      {/* Weekdays Header */}
      <div className="grid grid-cols-7 text-center font-semibold mb-2 text-amber-50">
        <div className="p-2">S</div>
        <div className="p-2">M</div>
        <div className="p-2">T</div>
        <div className="p-2">W</div>
        <div className="p-2">T</div>
        <div className="p-2">F</div>
        <div className="p-2">S</div>
      </div>

      {/* Dates Grid */}
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: firstDayIndex }, (_, index) => (
          <div key={index} className="p-4 rounded-lg" />
        ))}
        {days.map((day) => (
          <div
            key={day}
            className={`p-2 my-2 rounded-full text-center text-amber-50 text-xs md:text-sm ${
              isCurrentDay(day) ? 'bg-amber-400' : ''
            }`}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="w-full flex items-center justify-center py-6">
        <button className="rounded-md py-1 px-4 font-semibold text-md bg-stone-400 text-amber-50 hover:text-stone-600 hover:bg-amber-300">
          Show All
        </button>
      </div>
    </div>
  );
};

export default Calendar;
