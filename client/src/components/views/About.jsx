import React from 'react';
import AboutImage from './images/about.png';
import styled from "styled-components";

function About() {
return (
    <AboutContainer>
        <div id='about'>
        <div className='about-image'>
            <img src={AboutImage} alt='' />
        </div>
        <div className='about-text'>
            <h1>LEARN MORE ABOUT US</h1>
            <p>Some comment make here</p>
        </div>
        </div>
    </AboutContainer>
)
}


const AboutContainer = styled.footer`
#about{
    background-color: black;
    width:100%;
	height: 92vh;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 50px 5% 0px 5%;
	position: relative;
}

.about-text{
    width: 45%;
    color: #fff;
    list-style: circle;
}
.about-text h1{
	font-size: 3rem;
	color:#FF1414;
    font-weight: 500;
    margin: 0px;
	padding: 0px;
}
.about-text p{
    width: 80%;
	font-size: 1.2rem;
	color:#cecece;
	
}
.about-text button{
    margin-top: 20px;
	width: 140px;
	height: 45px;
	border-radius: 10px;
	border: none;
    outline: none;
    color: #ffffff;
	background-color:#FF1414;
}
.about-text button:hover{
    box-shadow: 5px 10px 30px rgba(255, 2, 2, 0.336);
	background-color: rgb(0, 0, 0);
    transition: all ease 0.3s;
    color: #ffffff;
}
.about-image{
    width: 50%;
}
.about-image img{
width: 600px;
}

@media(max-width:970px){
    #about{
		justify-content: center;
        padding-top: 0px;
        text-align: center;
        
        margin-top: 0px;
	}
	.about-text{
        width: 90%;
	}
	.about-text h1{
		font-size:4rem;
    }
    .about-text p{
        width: 100%;
    }

}

`;


export default About;

