// eslint-disable-next-line
import Layout from '../components/Layout'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading, hideLoading } from '../redux/alertsSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import TrainerForm from '../components/TrainerForm';



function ApplyTrainer() {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
          dispatch(showLoading());
          const response = await axios.post('/api/user/apply-trainer-account', 
          {...values, userId: user._id, 
            timings: [
              (values.timings[0]).format("HH:mm"),
              (values.timings[1]).format("HH:mm")
          ]}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          })
          dispatch(hideLoading());
          if(response.data.success) {
            toast.success(response.data.message);
            navigate('/home');
          } else {
            
            toast.error(response.data.message);
          }
        } catch (error) {
          dispatch(hideLoading());
          toast.error('Something went wrong');
        }
      
      }
  return (
    <Layout>
        <h1 className='page-title'>Apply Trainer</h1>
        <hr />
        <TrainerForm onFinish={onFinish} />
    </Layout>
  )
}

export default ApplyTrainer