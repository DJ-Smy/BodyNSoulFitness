import React from 'react'

const Home = () => {
  return (
    <div>
        <p className='header-btns'>
            <a href='/register' className='header-btn'>Register</a>
        </p>
        <p className='header-btns'> 
            <a href='/login' className='header-btn'>Login</a>
        </p>
        <p className='header-btns'> 
            <a href='/contact' className='header-btn'>Contact Us</a>
        </p>
    </div>
  )
}

export default Home
