import React from 'react'
import { Form, Input, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { hideLoading, showLoading } from '../redux/alertsSlice';

function Login() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post('/api/user/login', values)
      dispatch(hideLoading());
      if(response.data.success) {
        toast.success(response.data.message);
      
        // store the token
        localStorage.setItem("token", response.data.data);
        navigate('/home');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  
  }
  return (
    <div className='authentication'>
      <div className='authentication-form card p-3'>
          <h1 className='card-title'>Welcome Back</h1>
          <Form layout='vertical' onFinish={onFinish}>
            <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please input your Email!' }]}>
              <Input placeholder='Email'></Input>
            </Form.Item>
            <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please input your Password!' }]}>
              <Input placeholder='Password' type='password'></Input>
            </Form.Item>
            <div className='d-flex flex-column'>
            <Button className='primary-button my-2 full-width-button' htmlType='submit'>LOGIN</Button>
            <Link to='/register' className='anchor mt-2'>CLICK HERE TO REGISTER</Link>
            </div>
          </Form>
      </div>
    </div>
  )
}

export default Login;