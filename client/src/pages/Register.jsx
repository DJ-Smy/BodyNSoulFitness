import React from 'react'
import { Form, Input, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import leftImage from "../images/RImageL.jpg";
import rightImage from "../images/RImageR.jpg";

function Register() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post('/api/user/register', values)
      dispatch(hideLoading());
      
      if(response.data.success) {
        toast.success(response.data.message);
    
        
        navigate('/login');
      } else {
        
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('Something went wrong');
    }
  
  }
  return (
    <div className='authentication'>
      <div className='authentication-form card p-3'>
      <img src={leftImage} alt="Left Image" class="login-image login-image-left2"/>
      <img src={rightImage} alt="Right Image" class="login-image login-image-right2"/>
          <h1 className='card-title'>Register</h1>
          <Form layout='vertical' onFinish={onFinish}>
            <Form.Item label='Name' name='name' rules={[{ required: true, message: 'Please input your Name!' }]}>
              <Input placeholder='Name'></Input>
            </Form.Item>
            <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please input your Email!' }]}>
              <Input placeholder='Email'></Input>
            </Form.Item>
            <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please input your Password!' }]}>
              <Input placeholder='Password' type='password'></Input>
            </Form.Item>
            <Form.Item label='Phone Number' name='phoneNumber' rules={[{ required: true, message: 'Please input your Phone Number!' }]}>
              <Input placeholder='Phone Number' type='phoneNumber'></Input>
            </Form.Item>
            <Form.Item label='Address' name='address' rules={[{ required: true, message: 'Please input your Address!' }]}>
              <Input placeholder='Address' type='address'></Input>
            </Form.Item>

            <div className='d-flex flex-column'>
            <Button className='primary-button my-2 full-width-button' htmlType='submit'>Register</Button>

            <Link to='/login' className='anchor mt-2'>Login</Link>
            <Link to='/'  className='anchor mt-3'>Back to page</Link>
            </div>
          </Form>
      </div>
    </div>
  )
}

export default Register