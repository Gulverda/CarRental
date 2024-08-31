import React from 'react';
import '../CSS/Header.css'; 
import heart from '../assets/icons/heart.svg';
import notification from '../assets/icons/notification.svg';
import settings from '../assets/icons/setting.svg';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">MORENT</div>
      <div className="search-bar">
        <input type="text" placeholder="Search something here" />
      </div>
      <div className="user-options">
        <i className="icon hearts">
          <img src={heart} alt="Favorite items" />
        </i>
        <i className="icon settings">
          <img src={settings} alt="Settings" />
        </i>
        <i className="icon notification">
          <img src={notification} alt="Notifications" />
        </i>
      </div>
    </header>
  );
};

export default Header;
