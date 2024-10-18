import React, { useState, useRef } from 'react'
import Calendar from './Calender';
import SortMethods from './SortMethods';
import { CalendarIcon } from '@heroicons/react/24/solid';
import Task from './Task';

function Wrapper() {
    const [listId, setListId] = useState(null)
    const [lists, setLists] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const handleDelete = () => {
        if (itemToDelete) {
            setLists((prevLists) => {
                const updatedLists = prevLists.filter((list) => list.id !== itemToDelete);
                setListId(() => {
                    const clickedList = updatedLists.find(list => list.clicked);
                    return clickedList ? clickedList.id : null;
                });
    
                return updatedLists;
            });
            setItemToDelete(null);
        }
    
        setIsModalOpen(false);
    };
    

    const openModal = (id) => {
        setItemToDelete(id);
        setIsModalOpen(true);
    };

    const handleAddList = (newList) => {
        if (newList.trim()) {
            let newlist;
            if (lists.length > 0) {
                newlist = { id: Date.now(), newList, clicked: false }
            } else {
                newlist = { id: Date.now(), newList, clicked: true }
                setListId(newlist.id)
            }
            setLists((prevLists) => [...prevLists, newlist]);
            setInputValue('');
            setIsEditing(false);
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
        const newList = lists.map((li) => {
            if (id === li.id) {
                return {
                    ...li,
                    clicked: true
                }
            }
            return {
                ...li,
                clicked: false
            }
        })
        setLists(newList)
        setListId(id)
    };

    return (
        <>
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
                    <ul id="taskList" class="space-y-1" style={{maxHeight:'37em',overflowY:'auto'}}>
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
                            ""
                        )}
                    </ul>
                    {isEditing ? (
                        <div className='mt-3'>
                            <input type="text"
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
                            className="mt-4 text-center font-bold text-neutral-400 rounded-lg px-4 py-2 w-full "
                        >
                            + New List
                        </div>
                    )}
                </div>
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
                        <div className="bg-stone-800 rounded-lg shadow-lg p-6 max-w-sm w-full">
                            <h2 className="text-lg font-semibold mb-4 text-amber-300">Confirm Deletion</h2>
                            <p className="text-neutral-400">Are you sure you want to delete this item?</p>
                            <div className="mt-4 flex justify-end space-x-4">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-stone-600 text-stone-100 rounded-lg hover:bg-stone-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-amber-300 text-stone-900 rounded-lg hover:bg-amber-200"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>





            <Task listId={listId} />








            <div className="md:col-span-3 bg-neutral-700 hidden lg:block" >
                <Calendar />
                <SortMethods />
            </div>
        </>
    )
}

export default Wrapper
