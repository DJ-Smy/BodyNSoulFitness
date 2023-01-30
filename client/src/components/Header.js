import React, { Fragment, useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import "./header.css"
import { LoginContext } from './ContextProvider/Context';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate , NavLink } from "react-router-dom"

const Header = () => {

  const { logindata, setLoginData } = useContext(LoginContext);
  console.log(logindata.ValidUserOne);

  const history = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Logout user

    const logoutuser = async()=>{
      // 로그아웃 로직 token을 비교해서 -> token 을 사라지게 한다.

      let token = sessionStorage.getItem("usersdatatoken");

        const res = await fetch("/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                Accept: "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        //console.log(data);

        if (data.status === 201) {
            console.log("use logout");
            sessionStorage.removeItem("usersdatatoken");
            setLoginData(false)
            history("/");
        } else {
            console.log("error");
        }
    }

    const goDash = () => {
      history('/dash');
    }

    const goError = () => {
      history("*");
    }

    const goHome = () => {
      history('/');
    }

    const goAppointment = () => {
      history('/appointment');
    }


  return (
    <>
        <header>
            <nav>
                <h1 onClick={goHome}>Personal Trainer Web</h1>
                <div className='avatar'>
                  {
                    logindata.ValidUserOne ? <Avatar style={{background: "salmon", fontWeight:"bold", textTransform:"capitalize"}} onClick={handleClick}>{logindata.ValidUserOne.fname[0].toUpperCase()}</Avatar>:
                    <Avatar style={{background: "blue"}} onClick={handleClick}></Avatar>
                  }
                </div>

                <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >

                        {
                          logindata.ValidUserOne ? (

                            <>
                              <MenuItem onClick={()=>{
                                goDash()
                                handleClose()}}>Profile</MenuItem>
                                <MenuItem onClick={()=>{
                                goAppointment()
                                handleClose()
                                }}>Appoinment</MenuItem>    
                              <MenuItem onClick={()=>{
                                logoutuser()
                                handleClose()}}>Logout</MenuItem>
                            </>

                          ) : (
                            <>
                              <MenuItem onClick={()=>{
                                goError()
                                handleClose()
                                }}>Please Log In</MenuItem>
                            </>
                            
                          )
                        }

      </Menu>
            </nav>
        </header>
    </>
  )
}

export default Header