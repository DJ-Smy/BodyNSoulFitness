import React, { useRef } from 'react'
import './join.css'
import emailjs from '@emailjs/browser'

function Join() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_y0qz4hz', 'template_lx5uvbi', form.current, 'BVWfFDaP9b9-yxmSp')
      .then((result) => {
          console.log(result.text);
          alert('Success send email')
      }, (error) => {
          console.log(error.text);
      });
  };
  return (
    <div className="Join" id="join-us">
        <div className="left-j">
          <hr />
          <div>
            <span className='stroke-text'>READY TO</span>
            <span>LEVEL UP</span>
          </div>
          <div>
            <span>YOUR BODY</span>
            <span className='stroke-text'>WITH US?</span>
          </div>
        </div>
        <div className="right-j">
          <form ref={form} className="email-container" onSubmit={sendEmail}>
            <input type="email" name='user_email' placeholder='Enter your email' />
            <button className='btn1 btn-j'>Join Now</button>
          </form>
        </div>
    </div>
  )
}

export default Join