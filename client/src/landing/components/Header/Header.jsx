import React from 'react'
import './header.css'
import Logo from '../../assets/logo.png'

function Header() {
  return (
    <div className='header1'>
        <img className='logo' src={Logo} alt="logo" />
        <ul className='header-menu'>
            <li>Home</li>
            <li>Programs</li>
            <li>Why us</li>
            <li>Plans</li>
            <li>Testimonials</li>
        </ul>
    </div>
  )
}

export default Header