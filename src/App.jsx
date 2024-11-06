import React, { useState, useEffect } from 'react';
import Left from './Components/Left_Section/Left';
import Right from './Components/Right_Section/Right';
import Right_Img from './Components/Right_Image/Right_Img';
import './App.css';

function App() {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const Goback = () => {
    setSelectedGroup(null);
  };

  return (
    <div className='app-container'>
      
      {isMobile ? (
        !selectedGroup ? (
          <Left setSelectedGroup={setSelectedGroup} />
        ) : (
          <Right selectedgroup={selectedGroup} Goback={Goback} />
        )
      ) : (
        
        <>
          <Left setSelectedGroup={setSelectedGroup} />
          {selectedGroup ? (
            <Right selectedgroup={selectedGroup} Goback={Goback} />
          ) : (
            <Right_Img />
          )}
        </>
      )}
    </div>
  );
}

export default App;
