import React, {useState} from 'react'
import logo from '../images/logo.png'
import { Link } from 'react-scroll';
import SignUpModal from './Modals/SignUpModal';
import SignInModal from './Modals/SignInModal';



function Navbar() {

     // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [signInModalOpen, setSignInModalOpen] = useState(false);

  const openModal = () => {
    setSignUpModalOpen(true);
    setSignInModalOpen(true);
  };
  const closeModal = () => {
    setSignUpModalOpen(false);
    setSignInModalOpen(false);
  };
  const [nav, setnav] = useState(false);

    const changeBackground = () => {
        if(window.scrollY >= 50) {
            setnav(true);
        }
        else {
            setnav(false);
        }
    }
    window.addEventListener('scroll', changeBackground);

    

  return (
    <>
    <nav className={nav ? "nav active" : "nav"}>
        <Link to='main' className='logo'>
            <img src={logo} alt='' />
        </Link>
        <input className='menu-btn' type='checkbox' id='menu-btn' />
        <label className='menu-icon' for='menu-btn'>
            <span className='nav-icon'></span>
        </label>
        <ul className='menu'>
            <li><Link to= 'main' smooth={true} duration={1000}>HOME</Link></li>
            <li><Link to= 'features' smooth={true} duration={1000}>ABOUT</Link></li>
            <li><Link to= 'offer' smooth={true} duration={1000}>MEMBERSHIP</Link></li>
            <li><Link to= 'about' smooth={true} duration={1000}>APPOINTMENT</Link></li>
            <li><Link to= 'contact' smooth={true} duration={1000}>CONTACT</Link></li>
            <li><Link onClick={()=> {setSignInModalOpen(true)}}>Sign In</Link></li>
            <li><Link onClick={()=> {setSignUpModalOpen(true)}}>Sign Up</Link></li>
        </ul>
    </nav>
    <SignUpModal open={signUpModalOpen} close={closeModal} header="Sing Up"></SignUpModal>
    <SignInModal open={signInModalOpen} close={closeModal} header="Sing In"></SignInModal>
    </>
  )
}

export default Navbar;