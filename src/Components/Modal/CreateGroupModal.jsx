import React, { useRef, useState,useEffect } from 'react';
import '../Modal/CreateGroupModal.css';


const CreateGroupModal = ({ closeModal, onCreateGroup }) => {
  const [groupName, setGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  
  const modalRef = useRef(null);

  const colors = ['#A78BFA', '#F472B6', '#22D3EE', '#FB923C', '#1D4ED8', '#6366F1'];
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

   
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [closeModal]);

  const handleCreate = () => {
    if (groupName && selectedColor) {
      onCreateGroup(groupName, selectedColor);
      setGroupName('');
      setSelectedColor('');
      closeModal();
    }
  };

  return (
    <div className="modal-overlay" >
      <div className="modal-container" ref={modalRef}>
        <h2 className="modal-title">Create New group</h2>

        <div className="form-row">
          <label className="form-label">Group Name</label>
          <input
            type="text"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-row">
          <label className="form-label">Choose colour</label>
          <div className="color-options">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`color-button ${selectedColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <button onClick={handleCreate} className="create-button"
        style={{backgroundColor: groupName.trim() && selectedColor.trim() ? '#16008B' : '#ccc',}}
        disabled={!groupName.trim()}
        >Create</button>
      </div>
    </div>
  );
};

export default CreateGroupModal;
