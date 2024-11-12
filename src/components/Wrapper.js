import React, { useState, useEffect } from 'react';
import Calendar from './Calender';
import Task from './Task';
import SortedData from './sortedData';
import Mylist from './Mylist';
import { CalendarIcon, ArrowsUpDownIcon } from '@heroicons/react/24/solid';



const getMyLists = () => {
    const lists = localStorage.getItem('lists');
    if (lists) {
        try {
            const parsedLists = JSON.parse(lists);
            console.log('Parsed lists:', parsedLists);
            return Array.isArray(parsedLists) ? parsedLists : [];
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return [];
        }
    }
    return [];
};
const getMyTags = () => {
    const tags = localStorage.getItem('tags')
    if (tags) {
        try {
            const parsedTags = JSON.parse(tags);
            console.log('Parsed Tags:', parsedTags);
            return Array.isArray(parsedTags) ? parsedTags : [];
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return [];
        }
    }
    return [];
}

function Wrapper() {
    const [listId, setListId] = useState(null);
    const [lists, setLists] = useState(getMyLists());
    const [isSorting, setIsSorting] = useState(false)
    const [sortDate, setSortDate] = useState([])
    const [sortTag, setSortTag] = useState([])
    const [selectAll, setSelectAll] = useState(false)
    const [tags, setTags] = useState(getMyTags)


    if (listId === null && lists.length > 0) {
        const clickedList = lists.find(li => li.clicked);
        if (clickedList) {
            setListId(clickedList.id);
        }
    }
    const calendarSort = (date, tag, sortAll) => {
        setSortDate(date)
        setSortTag(tag)
        setSelectAll(sortAll)
    }
    const deleteListTag = (tag) => {
        console.log(lists, 'before deleteListTag');


        const newList = lists.map(list => ({
            ...list,
            todoList: list.todoList.map(li => ({
                ...li,
                tags: li.tags.filter(p => p !== tag)
            }))
        }));

        console.log(newList, 'after deleteListTag');

        setLists(newList);
    };
    const listUpdated = (list) => {
        console.log('listUPdate', list)
        setLists(list)
    }
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(lists));
    }, [lists]);
    useEffect(() => {
        localStorage.setItem('tags', JSON.stringify(tags))
    }, [tags])
    useEffect(() => {

        setLists(getMyLists())
    }, [listId])

    const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(false);
    const [isRightMenuOpen, setIsRightMenuOpen] = useState(false)

    const leftMenu = () => {
        setIsRightMenuOpen(false)
        setIsLeftMenuOpen(!isLeftMenuOpen);
    };
    const rightMenu = () => {
        setIsLeftMenuOpen(false)
        setIsRightMenuOpen(!isRightMenuOpen)
    }

    return (
        <>
            <div className='lg:hidden'>
                <div className='w-full lg:hidden fixed top-0 left-0 bg-neutral-700 z-50 flex justify-between px-2'>
                    <div className="flex justify-start items-center space-x-2 p-1 h-14 "  onClick={leftMenu}>
                        <CalendarIcon
                            className="w-10 h-10 text-amber-400 p-1 cursor-pointer"
                           
                        />
                    <h1 className={`font-bold text-stone-100 duration-150 transition-all  text-lg md:text-2xl lg:text-3xl rounded-lg ${isLeftMenuOpen ? 'opacity-100' : 'translate-x-[-2rem] opacity-0'}`}>
                        TIC TASC
                    </h1>
                    
                    </div>
                    <div className="flex items-center space-x-2 ">
                        <ArrowsUpDownIcon className="w-10 h-10 text-stone-400 p-1 cursor-pointer"
                            onClick={rightMenu}
                        />
                    </div>
                </div>


                <div
                    className={`fixed top-0 left-0 h-full w-64 bg-neutral-700 z-40 transition-transform duration-300  ${isLeftMenuOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                >
                    <Mylist lists={lists} selectAll={selectAll} setListId={setListId} setLists={setLists} getMyLists={getMyLists} />
                </div>
                <div
                    className={`fixed top-0 right-0 h-full w-64 bg-neutral-700 z-40 transition-transform duration-300 ${isRightMenuOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <div className="  bg-neutral-700 mt-6  overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                        <Calendar list={lists} calendarSort={calendarSort} isSort={setIsSorting} setTags={setTags} tg={tags} deleteListTag={deleteListTag} selectAll={selectAll} setSelectAll={setSelectAll} />
                    </div>
                </div>
            </div>
            <div className='lg:col-span-2 hidden lg:block bg-neutral-700'>

                <Mylist lists={lists} selectAll={selectAll} setListId={setListId} setLists={setLists} getMyLists={getMyLists} />
            </div>


            {isSorting ? (
                <SortedData date={sortDate} tag={sortTag} selectAll={selectAll} listId={listId} tg={tags} />
            ) : (
                <Task listId={listId} taskUpdate={listUpdated} tg={tags} leftMenu={setIsLeftMenuOpen} rightMenu={setIsRightMenuOpen}/>
            )}


            <div className=" lg:col-span-3 bg-neutral-700 hidden lg:block  overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                <Calendar list={lists} calendarSort={calendarSort} isSort={setIsSorting} setTags={setTags} tg={tags} deleteListTag={deleteListTag} selectAll={selectAll} setSelectAll={setSelectAll} />
            </div>

        </>
    );
}

export default Wrapper;
