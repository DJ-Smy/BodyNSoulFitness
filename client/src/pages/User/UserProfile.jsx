import Layout from '../../components/Layout'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import UserForm from '../../components/UserForm';


function UserProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post('/api/user/update-user-profile', 
      {...values, userId: user._id, 
        }, {
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

    const getUserData = async () => {
        try {
          dispatch(showLoading())
          const response = await axios.post(
            "/api/user/get-user-info-by-id",
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
            setUserInfo(response.data.data);
          } 
        } catch (error) {
          dispatch(hideLoading());
        }
      };  
      
      useEffect(() => {
        getUserData();
      }, []);
  return (
    <Layout>
        <h1 className="page-title">User Profile</h1>
        <hr />
        {userInfo && <UserForm onFinish={onFinish} initialValues={userInfo} />}
    </Layout>
  )
}

export default UserProfile