import React from 'react';
import { LOGO } from '../../../constants/index';
import { MAIN_IMG } from '../../../constants/auth/header';

// Example usage
import './Header.css';
const Header = () => {
  return (
        <div className='header-content'>
            <div className='header-main-image'> 
              <img src={LOGO} alt="My Logo" className='header-logo' />
            </div>
        </div>
  );
};

export default Header;
