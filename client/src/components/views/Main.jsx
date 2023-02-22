import React from 'react'
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


function Main() {

    const navigate = useNavigate();
    
return ( 
    <MainContainer>
        <div id='main'>
            <div className='name'>
                <h2>STEP UP YOUR</h2>
                <h1><span>FITNESS</span> WITH US</h1>
                <p>
                    <button className='header_btn1' onClick = {() => navigate('/register')}>Register</button>
                    <button className='header_btn1' onClick = {() => navigate('/login')}>Sign In</button>
                    <button className='header_btn1' onClick = {() => navigate('/About')}>About</button>
                    <button className='header_btn1' onClick = {() => navigate('/Contact')}>Contact</button>
                    <button className='header_btn1' onClick = {() => navigate('/Memberships')}>Memberships</button>
                    <button className='header_btn1' onClick = {() => navigate('/Feature')}>Feature</button>
                </p>
            </div>
        </div>
    </MainContainer>   
)
}

const MainContainer = styled.footer`
#main{
    width:100%;
    height:92vh;
    position: relative;
    background-color: #005550;
    position: relative;
    z-index: 0;
}
#main::before{
    position: absolute;
    content: "";
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}
.name{
    text-align: center;
	font-family: 'Montserrat';
	width: 900px;
	position: absolute;
    left: 50%;
	top: 55%;
	transform: translate(-50%,-55%);
}
.name span{
    color: #FF1414;
}
.name .details{
    font-size: 23px;
    color: #c5c5c5;
}
.name h2{
	font-family:'Lato';
	font-size: 2.7rem;
	margin:0px;
	letter-spacing: 2px;
	color:#ffffff;
}
.name h1{
	font-family:'Lato';
	font-size: 5rem;
	margin:0px;
	letter-spacing: 2px;
	color:#ffffff;
}

.header_btn1{
	width: 180px;
	height: 50px;
	justify-content: center;
    align-items: center;
    font-size: 1.4rem;
    background-color: #FF1414;
    box-shadow: 5px 10px 30px rgba(255, 2, 2, 0.336);
    border-radius: 5px;
	color:#ffffff;
    margin-right: 10px;
    margin-left: 10px;
}
.header_btn1:hover{
	background-color: transparent;
    transition: all ease 0.5s;
    color: #ffffff;
    border: 2px solid #FF1414;
}
@media(max-width:1190px){
	#main{
		background-size: 1150px !important;
		
	}
	.name{
		left: 50%;
		top: 50%;
        transform: translate(-50%,-50%);
        text-align: center;
    }
    .name h2{
        font-size: 1.5rem;
    }
    .name h1{
        font-size: 3rem;
    }
    .name .details{
        font-size: 1rem;
    }
    .pr-heading{
		left: 50%;
		top: 50%;
        transform: translate(-50%,-50%);
        text-align: center;
    }
    .pr-heading h2{
        font-size: 1.5rem;
    }
    .pr-heading h1{
        font-size: 3rem;
    }
    .pr-heading .details{
        font-size: 1rem;
    }
	.about-image img{
		height:400px;
    }
}
@media(max-width:970px){
	#main{
		height: 650px;
	}
	.name{
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
    }
    .pr-heading{
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}
	.about-image{
        display:none;
    }
    .header-btn{
        margin-left: 20%;
        margin-top: 20px;
    }
    .pr-btn{
        margin-left: 20%;
        margin-top: 20px;
    }
}
@media(max-width:600px){
	.name{
		width:60%;
    }
    .pr-heading{
		width:60%;
    }
}

`;

export default Main;