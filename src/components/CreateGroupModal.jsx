import React, { useState } from 'react';

const CreateGroupModal = ({ isOpen, onClose, onCreateGroup }) => {
  const [groupName, setGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState('bg-purple-500');
  
  const colors = [
    'bg-lavender',
    'bg-pink',
    'bg-cyan',
    'bg-brown',
    'bg-blue',
    'bg-light-blue'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (groupName.trim()) {
      onCreateGroup(groupName, selectedColor);
      setGroupName('');
      setSelectedColor('bg-purple-500');
    } 
  };

  return (
    <div>
      {/* Overlay */}
      <div 
        className="z-10 fixed inset-0 bg-black/50 modal-overlay" 
        onClick={onClose} 
      />
      
      {/* Modal */}
      <div className="z-10 fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Create New group</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Group Name Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Group Name</label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full p-2 border rounded-md custom-input"
              placeholder="Enter group name"
            />
          </div>

          {/* Color Picker */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Choose colour</label>
            <div className="flex gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`w-8 h-8 ${color} rounded-full color-picker-option ${
                    selectedColor === color ? 'selected' : ''
                  }`}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition-colors custom-input"
          >
            Create
          </button>
        </form>
      </div>
    </div>
 
  );
};

export default CreateGroupModal;