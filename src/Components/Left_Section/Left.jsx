import React, { useState, useEffect } from 'react';
import btn from '../../assets/Createbtn.png'
import CreateGroupModal from '../Modal/CreateGroupModal';
import './Left.css';

function Left({ setSelectedGroup }) {
  const [showModal, setModal] = useState(false);
  const [groups, setGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState(null);

  useEffect(() => {
    const savedGroups = JSON.parse(localStorage.getItem('groups')) || [];
    setGroups(savedGroups);
  }, []);

  const openModal = () =>  {
    console.log("Opening modal...");
    setModal(true)
  }
  const closeModal = () => setModal(false);

  const getInitials = (name) => {
   return  name.slice(0,2).toUpperCase();
  };

  const handleGroups = (name, color) => {
    if (name && color) {
      const newGroup = { name, color };
    
      const groupExists = groups.some(group => group.name.toUpperCase() === name.toUpperCase());
      
      if (groupExists) {
        return; 
      } else {
        const updatedGroups = [...groups, newGroup];
        setGroups(updatedGroups);
        localStorage.setItem('groups', JSON.stringify(updatedGroups));
        closeModal();
      }
    }
  }

  const handleGroupClick = (group) => {
    return () => {
      setSelectedGroup(group);
      setActiveGroup(group);
    };
  };



  return (
    <>
      <div className="left-container">
        <p>Pocket Notes</p>
        <ul className="group-list">
          {groups.map((group, index) => (
            <li 
              key={index}
              className="group-item" 
              onClick={handleGroupClick(group)}
              style={{
                backgroundColor: activeGroup === group ? '#2F2F2F2B' : '#fff',
              }}>
              <span className="group-circle" style={{ backgroundColor: group.color }}>
                {getInitials(group.name)}
              </span>
              <span className="group-name">{group.name}</span>
            </li>
          ))}
        </ul>
        <div className="createbtn" onClick={openModal}>
        <img src={btn}  />
      </div>
      </div>
      
      {showModal && (
        <CreateGroupModal closeModal={closeModal} onCreateGroup={handleGroups} />
      )}
    </>
  );
}

export default Left;
