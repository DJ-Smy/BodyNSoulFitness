import React, { useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";
import "./contact.css";

function App() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
    emailjs.sendForm("service_y0qz4hz", "template_lx5uvbi", form.current, "BVWfFDaP9b9-yxmSp").then(
      (result) => {
        console.log(result.text);
        alert("Success send email");
      },
      (error) => {
        console.log(error.text);
      }
    );
  };

  return (
    <section className="contact-section">
      <div className="Join" id="join-us">
        <div className="left-j">
          <hr />
          <div>
            <span className="stroke-text">READY TO</span>
            <span>LEVEL UP</span>
          </div>
          <div>
            <span>YOUR BODY</span>
            <span className="stroke-text">WITH US?</span>
          </div>
        </div>
      </div>

      <div className="container">
        <ToastContainer position="top-center" />
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="wrapper">
              <div className="row no-gutters">
                <div className="col-md-6 d-flex align-items-stretch">
                  <div className="info-wrap w-100 p-lg-5 p-4 img">
                    <h3>CONTACT US</h3>
                    <p className="mb-4">We're open for any suggestion or just to have a chat</p>
                    <div className="dbox w-100 d-flex align-items-start">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-map-marker"></span>
                      </div>
                      <div className="text pl-3">
                        <p>198 West 21th Street, Suite 721 New York NY 10016</p>
                      </div>
                    </div>
                    <div className="dbox w-100 d-flex align-items-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-phone"></span>
                      </div>
                      <div className="text pl-3">
                        <p>
                          <a href="tel://123456789">+1235 2355 98</a>
                        </p>
                      </div>
                    </div>
                    <div className="dbox w-100 d-flex align-items-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-paper-plane"></span>
                      </div>
                      <div className="text pl-3">
                        <p>
                          <a href="mailto:info@yoursite.com">info@yoursite.com</a>
                        </p>
                      </div>
                    </div>
                    <div className="dbox w-100 d-flex align-items-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-globe"></span>
                      </div>
                      <div className="text pl-3">
                        <p>
                          <a href="#">yoursite.com</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="contact-wrap w-100 p-lg-5 p-4">
                    <h3 className="mb-4">SEND US A MESSAGE</h3>
                    <form ref={form} onSubmit={sendEmail} id="contactForm" className="contactForm">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <input type="text" className="form-control" name="user_name" placeholder="Name" />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <input type="email" className="form-control" name="user_email" placeholder="Email" />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <input type="text" className="form-control" name="subject" placeholder="Subject" />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <textarea
                              type="text"
                              className="form-control"
                              name="message"
                              placeholder="Message"
                              cols="30"
                              rows="6"
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <input
                              type="submit"
                              value="Send Message"
                              className="btn btn-primary"
                              style={{ color: "black" }}
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
