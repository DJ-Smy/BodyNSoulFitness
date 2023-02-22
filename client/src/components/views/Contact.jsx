import React from 'react';
import styled from "styled-components";

function Contact() {
  return (
    <ContactContainer>
    <div id='contact'>
        <h1>CONTACT US</h1>
        <form>
            <input type="text" placeholder='Full Name' required/>
            <input type="text" placeholder='Type Your Email' required/>
            <textarea placeholder='Write here.....' required/>
            <input  type='submit' value='Send' />
        </form>
    </div>
    </ContactContainer>
  )
}

const ContactContainer = styled.footer`
#contact{
    padding-top: 200px;
    padding-bottom: 212px;
    background-color: black;
    width:100%;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
#contact h1{
    color: #fff;
    font-size: 3rem;
}
#contact form{
    width:600px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
}
#contact form input,
#contact form textarea{
    width:100%;
    height:50px;
    margin:5px 0px;
    padding: 10px;
    border: none;
    outline: none;
    background-color: #ffffff2d;
    color: #ffffff;
    border-radius: 5px;
}
#contact form textarea{
    height: 150px;
}
#contact form input[type="submit"]{
    height: 45px;
    background: linear-gradient(90deg, #FF1414 20%,#f70000);
    color: #ffffff;
    text-transform: uppercase;
}
@media(max-width:620px){
    #contact form{
        width:90%;
    }
}
`;


export default Contact;