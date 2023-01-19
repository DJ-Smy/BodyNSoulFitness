import React from "react";
import "./Modal.css";

function SignIpModal(props) {
  const { open, close, header } = props;
  return (
    <form>
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <section>
            <header>
              {header}
              <button className="close" onClick={close}>
                &times;
              </button>
            </header>
            <main>Sign In</main>
            <div className="mb-3">
              <label>Email address</label>
              <input type="email" className="form-control" placeholder="Enter Email" />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="Password" />
            </div>

            <footer>
              <button className="close" onClick={close}>
                close
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    </form>
  );
}

export default SignIpModal;
