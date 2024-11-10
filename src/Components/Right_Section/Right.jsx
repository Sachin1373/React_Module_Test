import React, { useState, useEffect } from 'react';
import { IoSend } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa6";
import './Right.css';

function Right({ selectedgroup, Goback }) {
  const [notes, setNotes] = useState('');
  const [groupNotes, setGroupNotes] = useState([]);

  useEffect(() => {
    const loadedNotes = JSON.parse(localStorage.getItem(selectedgroup.name)) || [];
    setGroupNotes(loadedNotes);
  }, [selectedgroup]);

  const handleInputChange = (e) => {
    setNotes(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && notes.trim()) {
      handleSaveNote();
    }
  }

  const handleSaveNote = () => {
    if (notes.trim()) {
      const currentDate = new Date()
      const day = currentDate.getDate();
      const month = currentDate.toLocaleString('default', { month: 'short' });
      const year = currentDate.getFullYear();
      const formattedDate = `${day} ${month} ${year}`;

      let hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; 
      const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;

      const newNote = { text: notes, date: formattedDate, time: formattedTime };

      const updatedNotes = [...groupNotes, newNote]; 
      setGroupNotes(updatedNotes); 

      localStorage.setItem(selectedgroup.name, JSON.stringify(updatedNotes));
      setNotes(''); 
    }
  };

  
  const getInitials = (name) => {
   return name.slice(0,2).toUpperCase();
  }

  return (
    <div className="right-container">
      <div className="group-header">
        <FaArrowLeft className='back' onClick={Goback} />
        <span
          className="group-circle"
          style={{ backgroundColor: selectedgroup.color }}
        >
          {getInitials(selectedgroup.name)} 
        </span>
        <span className="group-name">{selectedgroup.name}</span>
      </div>

      <div className="notes-section">
        <ul>
          {groupNotes.map((note, index) => (
            <li key={index}>
              <div className="date-time">
                <div className="note-date">{note.date}</div>
                <div className="dot"></div>
                <div className="note-time">{note.time}</div> 
              </div>
              <div className="note-text">
                <div>{note.text}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="input-section">
        <textarea
          value={notes}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your note here..." 
        />
        <IoSend className="send" onClick={handleSaveNote} 
          style={{ color: notes.trim() ? '#001F8B' : '#ccc' }}
        />
      </div>
    </div>
  );
}

export default Right;
