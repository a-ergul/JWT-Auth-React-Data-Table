import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const title = "Novumare"
  const home = "Ana Sayfa"
  const register = "Kayıt Ol"


  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);


  //OpenModel
  const showButton = () => {
    if (window.innerWidth <= 600) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
            <i class='fas fa-anchor' />
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          {title}
            </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
            
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              <i class='fas fa-home' />
                {home}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/register'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                  <i class='fas fa-user-plus' />
                {register}
              </Link>
            </li>
             </ul>
          </div>
      </nav>
    </>
  );
}
export default Navbar;

