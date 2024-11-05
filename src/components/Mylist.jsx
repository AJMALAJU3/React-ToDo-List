import React, { useRef, useState } from 'react'
import { CalendarIcon } from '@heroicons/react/24/solid';


import Alert from './Alert';


function Mylist({ lists, selectAll, setLists, setListId, getMyLists }) {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [itemToDelete, setItemToDelete] = useState(null);
    const inputRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddList = (newList) => {
        if (newList.trim()) {
            let newlist = { id: Date.now(), newList, clicked: lists.length === 0, todoList: [] };
            if (lists.length === 0) {
                console.log(newlist.id, 's')
                setListId(newlist.id);
            }
            setLists((prevLists) => [...prevLists, newlist]);
            setInputValue('');
            setIsEditing(false);
        }
    };

    const openModal = (id) => {
        setItemToDelete(id);
        setIsModalOpen(true);
    };
    const handleDelete = () => {
        if (itemToDelete) {
            setLists((prevLists) => {
                const updatedLists = prevLists.filter((list) => list.id !== itemToDelete);
                const clickedList = updatedLists.find(list => list.clicked);
                setListId(clickedList ? clickedList.id : null);
                return updatedLists;
            });
            localStorage.setItem('lists', JSON.stringify(lists));
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
        setLists(getMyLists())
        setLists(prevLists => {
            return prevLists.map((li) => ({
                ...li,
                clicked: li.id === id
            }));
        })
        setListId(id);
    };
    
    return (
        <>
            <div className=" bg-neutral-700 ">
                <div className="mb-5 flex justify-center items-center p-4 space-x-2">
                    <h1 className="font-semibold text-stone-100 text-lg md:text-2xl lg:text-3xl rounded-lg">
                        TIC TASC
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
                                    ${list.clicked && !selectAll ? 'bg-amber-300 text-stone-600' : 'text-stone-100 hover:bg-stone-600 '} 
                                    p-3 rounded-lg shadow-lg transition duration-200 ease-linear group`}
                                >
                                    {list.newList}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openModal(list.id);
                                        }}
                                        className={`rounded-lg px-2 py-1 text-stone-500 ${list.clicked ? '' : 'group-hover:text-stone-800  '} `}
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
            

        </>
    )
}

export default Mylist
