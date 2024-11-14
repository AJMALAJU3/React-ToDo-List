import React from 'react';

function Alert({ text, onClose, onDelete }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 px-3">
      <div className="bg-stone-800 rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4 text-amber-300">Confirm Deletion</h2>
        <p className="text-neutral-400">{text}</p>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-600 text-stone-100 rounded-lg hover:bg-stone-500"
          >
            Cancel
          </button>
          <button
            onClick={onDelete} 
            className="px-4 py-2 bg-amber-300 text-stone-900 rounded-lg hover:bg-amber-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Alert;
