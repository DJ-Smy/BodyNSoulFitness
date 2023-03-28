import React, { useState } from 'react'
import { Form, Input, Button } from 'antd';
import { toast } from 'react-hot-toast';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import { useDispatch } from 'react-redux';


const ResetPassword = () => {

const dispatch = useDispatch();
const [email, setEmail] = useState('');

const setVal = (e) => {
    setEmail(e.target.value);
}

const sendLink = async() => {
    
dispatch(showLoading());
    const res = await fetch("/api/user/sendPasswordLink", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email})
    });
     dispatch(hideLoading());
    if(res.status === 200) {
        toast.success("Sent password link was successfully");
        setEmail('');
    }else {
        toast.error("Sent password link failed");
      }
}




  return (
    <div className='authentication'>
        <div className='authentication-form card p-3'>
            <h1 className='card-title'>Forgot Password</h1>
            
                <Form layout='vertical' >
                    <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please input your Email!' }]}>
                        <Input value={email} onChange={setVal} placeholder='Email'></Input>
                    </Form.Item>
                    <div className='d-flex flex-column'>
                        <Button onClick={sendLink} className='primary-button my-2 full-width-button'>SEND LINK</Button>
                    </div>
                </Form>
        </div>
    </div>
  )
}

export default ResetPassword