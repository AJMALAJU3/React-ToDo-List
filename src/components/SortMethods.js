import React from 'react'

function SortMethods() {
    return (
        <div className='max-w-md mx-auto px-4 md:px-6 lg:px-8'>
            <h1 className='text-amber-50 font-bold'>Sort Methods</h1>
            <div className='p-1 flex gap-3 mt-2'>
                <button className="rounded-lg bg-stone-400 p-1 h-12 px-2 text-center overflow-hidden">
                    <span className="text-sm truncate">Priority</span>
                </button>
                <button className="rounded-lg bg-stone-400 p-1 h-12 text-center overflow-hidden px-2">
                    <span className="text-sm truncate">Priority</span>
                </button>
                <button className="rounded-lg bg-stone-400 p-1 h-12 w-12 text-center overflow-hidden px-2">
                    <span className="text-lg font-bold truncate">+</span>
                </button>


            </div>
        </div>
    )
}

export default SortMethods
