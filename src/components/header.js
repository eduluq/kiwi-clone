import React from 'react';

//import styles
import './header.css';

const Header = () => (
  <div className="header">
    <div className="header__logo">Kiwi.com</div>
    <ul className="header__menu">
      <li>Español</li>
      <li>EUR - €</li>
      <li>Ayuda</li>
      <li>Gestionar mi reserva</li>
    </ul>
  </div>
);

export default Header;
