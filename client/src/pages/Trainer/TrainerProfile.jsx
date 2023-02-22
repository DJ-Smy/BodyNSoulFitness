import Layout from '../../components/Layout'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import TrainerForm from '../../components/TrainerForm';


function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState(null);

  const onFinish = async (values) => {
        try {
          dispatch(showLoading());
          const response = await axios.post('/api/trainer/update-trainer-profile', 
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
            navigate('/');
          } else {
            
            toast.error(response.data.message);
          }
        } catch (error) {
          dispatch(hideLoading());
          toast.error('Something went wrong');
        }
      
      }

    const getTrainerData = async () => {
        try {
          dispatch(showLoading())
          const response = await axios.post(
            "/api/trainer/get-trainer-info-by-user-id",
            {
              userId: params.userId,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          dispatch(hideLoading());
          if (response.data.success) {
            setTrainer(response.data.data);
          } 
        } catch (error) {
          dispatch(hideLoading());
        }
      };  
      
      useEffect(() => {
        getTrainerData();
      }, []);
  return (
    <Layout>
        <h1 className="page-title">Trainer Profile</h1>
        <hr />
        {trainer && <TrainerForm onFinish={onFinish} initialValues={trainer} />}
    </Layout>
  )
}

export default Profile