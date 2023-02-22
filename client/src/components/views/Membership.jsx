import React from 'react'
import styled from "styled-components";

function Membership() {
  return (
        <MembershipContainer>
            
        <div id='membership'>
        <div className='pr-heading'>
            <h1>A BIG <span>OFFER</span> FOR THIS SUMMER</h1>
            <p className='details'></p>
            <div className='pr-btns'>
                <a href='/register' className='pr-btn'>JOIN NOW</a>
            </div>
        </div>
    </div>
        </MembershipContainer>
  )
}

const MembershipContainer = styled.footer`
#membership{
    background-color: black;
    padding-top: 30px;
    width:100%;
    height:92vh;
    position: relative;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url(./images/about.png);
    text-align: center;
}

.pr-heading{
    text-align: center;
	font-family:'Lato';
	width: 600px;
	position: absolute;
    left: 50%;
	top: 55%;
	transform: translate(-50%,-55%);
}
.pr-heading span{
    color: #FF1414;
}
.pr-heading .details{
    font-size: 23px;
    color: #c5c5c5;
}
.pr-heading .details{
    font-size: 1.2rem;
}
.pr-heading h1{
	font-family:'Lato';
	font-size: 4rem;
	margin:0px;
	letter-spacing: 2px;
	color:#ffffff;
}
.pr-btns{
    display: flex;
    margin-top: 40px;
    margin-left: 35%;
}
.pr-btn{
	width:160px;
	height: 50px;
	display: flex;
	justify-content: center;
    align-items: center;
    font-size: 1.4rem;
    background-color: #FF1414;
    box-shadow: 5px 10px 30px rgba(255, 2, 2, 0.336);
    border-radius: 5px;
	color:#ffffff;
}
.pr-btn:hover{
	background-color: transparent;
    transition: all ease 0.5s;
    color: #ffffff;
    border: 2px solid #FF1414;
}

`;




export default Membership;