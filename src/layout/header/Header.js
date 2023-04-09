import React from 'react';
import MainLogo from '../../assets/logo/main-logo.png';
import './Header.css';

const Header = () => {
  return (
    <div className='header'>
      <img src={MainLogo}/>
      <div className='beta'>Beta</div>
      {/* <div className='headerRightSide'>
        <p>Home</p>
        <p>Saved notes</p>
        <button>Log Out</button>
      </div> */}
    </div>
  )
}

export default Header
