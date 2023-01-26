import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import "./mix.css"

export const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();




    emailjs.sendForm('service_y0qz4hz', 'template_lx5uvbi', form.current, 'BVWfFDaP9b9-yxmSp')
      .then((result) => {
          console.log(result.text);
          toast.success("Message sent")
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <>
      <div className="form_data">
        <div className="form_heading">
          <h1>Contact Us</h1>
        </div>
        <form ref={form} onSubmit={sendEmail}>
        <div className="form_input">
          <label>Name</label>
          <input type="text" name="user_name" />
        </div>
        <div className="form_input">
          <label>Email</label>
          <input type="email" name="user_email" />
        </div>
        <div className="form_input">
          <label>Message</label>
        </div>
        <div className="form_input">
          <textarea name="message" />
        </div>  
        <div className="form_input">
          <input type="submit" value="Send" />
        </div>
        </form>
        <ToastContainer />
    </div>
  </>
  );
};