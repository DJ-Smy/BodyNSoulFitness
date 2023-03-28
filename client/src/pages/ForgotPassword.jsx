import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { Form, Input, Button } from 'antd';
import { toast } from 'react-hot-toast';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import { useDispatch } from 'react-redux';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const {userId, token} = useParams();
    //console.log(userId, token);
    const history = useNavigate();

    const [password, setPassword] = useState("");
    

    const userValid = async() => {
     dispatch(showLoading());
      const res = await fetch(`/api/user/forgot-password/${userId}/${token}`, {
        method: "GET",
        headers:{
            "Content-Type": "application/json"
        }
      });
        dispatch(hideLoading());
      const data = await res.json();
      
        
        if(data.status === 201) {
            
            console.log("user valid!!");
        }else {
            history("*")
        }
    }

    const setVal = (e) => {
        setPassword(e.target.value);
    }

    const sendPassword = async(e) => {
        e.preventDefault();
        dispatch(showLoading());
        const res = await fetch(`/api/user//${userId}/${token}`, {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({password})
      });
      dispatch(hideLoading());
       const data = await res.json();

        
        if(data.status === 201) {
            toast.success("Password updated successfully")
            setPassword("")
            history('/login')
        }else {
            toast.error("Token expired. Please try again!")
        }

    }
    
    useEffect(()=>{
        userValid();
    },[])

  return (
    <div className='authentication'>
        <div className='authentication-form card p-3'>
            <h1 className='card-title'>Reset Password</h1>
                <Form layout='vertical' >
                    <Form.Item label='New password' name='password' rules={[{ required: true, message: 'Please enter your new password!' }]}>
                        <Input value={password} onChange={setVal} type="password"  placeholder='Please enter your new password'></Input>
                    </Form.Item>
                    <div className='d-flex flex-column'>
                        <Button onClick={sendPassword} className='primary-button my-2 full-width-button' htmlType='submit'>SUBMIT</Button>
                    </div>
                </Form>
        </div>
    </div>
  )
}

export default ForgotPassword