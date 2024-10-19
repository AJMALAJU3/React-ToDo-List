import React, { useState, useRef, useEffect } from 'react';
import Calendar from './Calender';
import SortMethods from './SortMethods';
import { CalendarIcon } from '@heroicons/react/24/solid';
import Task from './Task';
import Alert from './Alert';


const getMyLists = () => {
    const lists = localStorage.getItem('lists');
    console.log('Retrieved lists from localStorage:', lists); 
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

function Wrapper() {
    const [listId, setListId] = useState(null);
    const [lists, setLists] = useState(getMyLists());
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    if (listId === null && lists.length > 0) {
        const clickedList = lists.find(li => li.clicked);
        if (clickedList) {
            setListId(clickedList.id);
        }
    }
    

    useEffect(() => {
        console.log('Saving lists to localStorage:', lists); 
        localStorage.setItem('lists', JSON.stringify(lists));
        // setLists(getMyLists());
    }, [lists]);
    useEffect(()=>{
        setLists(getMyLists())
    },[listId])

    const openModal = (id) => {
        setItemToDelete(id);
        setIsModalOpen(true);
    };

    const handleAddList = (newList) => {
        if (newList.trim()) {
            const existingList = lists.find(list => list.newList === newList);
            if (existingList) {
                console.warn("This list already exists:", newList);

            }
            let newlist = { id: Date.now(), newList, clicked: lists.length === 0, todoList: [] };
            if (lists.length === 0) {
                setListId(newlist.id);
            }
            setLists((prevLists) => [...prevLists, newlist]);
            setInputValue(''); 
            setIsEditing(false);
        }
    };
    

    const handleDelete = () => {
        if (itemToDelete) {
            setLists((prevLists) => {
                const updatedLists = prevLists.filter((list) => list.id !== itemToDelete);
                const clickedList = updatedLists.find(list => list.clicked);
                setListId(clickedList ? clickedList.id : null);
                return updatedLists;
            });
            setItemToDelete(null);
            setIsModalOpen(false);
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddList(inputValue);
        }
    };

    const handleClickAddList = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current.focus();
        }, 0);
    };

    
    const selectList = (id) => {
        const newList = lists.map((li) => ({
            ...li,
            clicked: li.id === id 
        }));
        console.log(newList,'nw');
        
        setLists(newList);
        setListId(id);
    };

    return (
        <>
            <div className="md:col-span-2 bg-neutral-700 hidden lg:block">
                <div className="mb-5 flex justify-center items-center p-4 space-x-2">
                    <h1 className="font-semibold text-stone-100 text-lg md:text-2xl lg:text-3xl rounded-lg">
                        TODO LIST
                    </h1>
                    <CalendarIcon className="w-10 h-10 text-amber-400 p-1" />
                </div>

                <div className="rounded-lg p-2 w-full max-w-md">
                    <h1 className="font-bold text-1xl mb-4 text-stone-100">My Lists</h1>
                    <ul
                        id="taskList"
                        className="space-y-1"
                        style={{ maxHeight: '27em', overflowY: 'auto', paddingBottom: '1em', scrollbarWidth: 'none' }}
                    >
                        {lists.length > 0 ? (
                            lists.map((list) => (
                                <li
                                    key={list.id}
                                    onClick={() => selectList(list.id)}
                                    className={`flex justify-between items-center 
                                    ${list.clicked ? 'bg-amber-300 text-stone-600' : 'text-stone-100 hover:bg-stone-400 hover:text-stone-600'} 
                                    p-3 rounded-lg shadow-lg transition duration-200 ease-linear`}
                                >
                                    {list.newList}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openModal(list.id);
                                        }}
                                        className="rounded-lg px-2 py-1 text-stone-600 font-bold"
                                    >
                                        X
                                    </button>
                                </li>
                            ))
                        ) : (
                           null
                        )}
                    </ul>
                    {isEditing ? (
                        <div className='mt-3'>
                            <input
                                type="text"
                                ref={inputRef}
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                                placeholder="Add a new list..."
                                className="border-none outline-none focus:outline-none focus:ring-0 bg-neutral-700 rounded-lg p-2 w-full pt-4 text-amber-50"
                                onBlur={() => setIsEditing(false)}
                            />
                        </div>
                    ) : (
                        <div
                            onClick={handleClickAddList}
                            className="mt-4 text-center font-bold text-neutral-400 rounded-lg px-4 py-2 w-full"
                        >
                            + New List
                        </div>
                    )}
                </div>
                {isModalOpen && (
                    <Alert
                        text={`Are you sure you want to delete this item?`}
                        onClose={() => setIsModalOpen(false)}
                        onDelete={handleDelete}
                    />
                )}
            </div>

            <Task listId={listId} />

            <div className="md:col-span-3 bg-neutral-700 hidden lg:block">
                <Calendar />
                <SortMethods />
            </div>
        </>
    );
}

export default Wrapper;
