import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const ForgotPassword = () => {

  //URL 에 있는 id 와 token값을 가져오기 위해 useParams사용
  const {id, token} = useParams();

  const history = useNavigate();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");


  const userValid = async()=>{
    const res = await fetch(`/forgotpassword/${id}/${token}`, {
      method: 'GET',
      headers:{
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();

    if(data.status === 201){
      console.log("user valid");
    }else{
      history("*")
    }
  }

  const setval = (e) =>{
    setPassword(e.target.value);
  }

  const sendpassword = async(e) => {
    e.preventDefault();

    const res = await fetch(`/${id}/${token}`, {
      method: 'POST',
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({password})
    });

    const data = await res.json();

    if(data.status === 201){
      setPassword("")
      setMessage(true);
      toast.success("Password updated successfully")
    }else {
      toast.error("Token Expired generate new Link!!")
    }

  }


  useEffect(() => {
    userValid()
    setTimeout(() => {
    }, 3000)
}, [])
  
  

  return (
    <>
      <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Enter Your New Password</h1>
                    </div>

                  
                    <form>
                     {message ? <p style={{ color: "green", fontWeight: "bold" }}>Password Succesfulyy Update </p> : ""}
                        <div className="form_input">
                            <label htmlFor="password">New Password</label>
                            <input type="password" value={password} onChange={setval} name="password" id="password" placeholder='Enter Your New Password' />
                        </div>
                        <button className='btn' onClick={sendpassword}>Send</button>
                    </form>
                    <ToastContainer />
                </div>
            </section>


    </>
  )
}

export default ForgotPassword
