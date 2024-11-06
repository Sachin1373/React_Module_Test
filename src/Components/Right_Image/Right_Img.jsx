import React from 'react'
import logo from '../../assets/Image.png'
import '../Right_Image/Right_Image.css'
import { IoIosLock } from "react-icons/io";
function Right_Img() {
  return (
     <div className="intro-wrapper">
         <div className='intro-page'>
         <img src={logo} alt=""  />
         <h1>Pocket Notes</h1>
         <p>Send and receive messages without keeping your phone online. Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
    </div>
      <div className="footer">
        <IoIosLock />
        <p>end-to-end encrypted</p>
      </div>
     </div>
  )
}

export default Right_Img