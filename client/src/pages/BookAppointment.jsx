import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { Button, Col, DatePicker, Row, TimePicker } from "antd";
import chatImage from "../assets/chat.jpg"


function BookAppointment() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [contents, setContents] = useState("");
  const { user } = useSelector((state) => state.user);
  const [trainer, setTrainer] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const getTrainerData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/trainer/get-trainer-info-by-id",
        {
          trainerId: params.trainerId,
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

  const bookNow = async() => {
    setIsAvailable(false);
    try {
        dispatch(showLoading());
        const response = await axios.post(
          "/api/user/book-appointment",
          {
            trainerId: params.trainerId,
            userId: user._id,
            trainerInfo: trainer,
            userInfo: user,
            date: date,
            time: time,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(hideLoading());
        if (response.data.success) {
         toast.success(response.data.message);
         navigate('/appointments')
        }
      } catch (error) {
        toast.error("Error booking appointment");
        dispatch(hideLoading());
      }
  }

  const checkAvailability = async() => {
    try {
        dispatch(showLoading());
        const response = await axios.post(
          "/api/user/check-booking-availability",
          {
            trainerId: params.trainerId,
            date: date,
            time: time,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(hideLoading());
        if (response.data.success) {
        toast.success(response.data.message);
        setIsAvailable(true);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Error booking appointment");
        dispatch(hideLoading());
      }
  }

  const makeChat = async() => {
    try {
        dispatch(showLoading());
        const response = await axios.post(
          "/api/user/make-chat",
          {
            trainerId: params.trainerId,
            userId: user._id,
            trainerInfo: trainer,
            userInfo: user,
            contents: contents
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(hideLoading());
        if (response.data.success) {
         toast.success(response.data.message);
         navigate('/chatLists')
        }
      } catch (error) {
        toast.error("Error chat making");
        dispatch(hideLoading());
      }
  }

  useEffect(() => {
    getTrainerData();
  }, []);

  return (
    <Layout>
      {trainer && (
        <>
        <div>
          <h1 className="page-title">
            {trainer.firstName} {trainer.lastName}
          </h1>
          <hr />
          <Row gutter={20} className="mt-4" align="middle">

            <Col span={8} sm={24} xs={24} lg={8}>
              <img
                src="https://thumbs.dreamstime.com/b/finger-press-book-now-button-booking-reservation-icon-online-149789867.jpg"
                alt=""
                width="80%"
                height='300'
              />
            </Col>
            <Col span={8} sm={24} xs={24} lg={8}>
              <h1 className="normal-text">
                <b>Timings :</b> {trainer.timings[0]} - {trainer.timings[1]}
              </h1>
              <p>
                <b>Phone Number : </b>
                {trainer.phoneNumber}
              </p>
              <p>
                <b>Address : </b>
                {trainer.address}
              </p>
              <p>
                <b>Fee per Visit : </b>
                {trainer.feePerConsultation}
              </p>
              <p>
                <b>Email : </b>
                {trainer.email}
              </p>
              <div className="d-flex flex-column pt-2 mt-2">
                <DatePicker
                  format="YYYY-MM-DD"
                  onChange={(value) => {
                    setDate(moment(value).format("YYYY-MM-DD"));
                    setIsAvailable(false);
                  }}
                />
                <TimePicker
                  format="HH:mm"
                  className="mt-3"
                  onChange={(value) => {
                    setIsAvailable(false);
                    setTime(moment(value).format("HH:mm"));
                  }}
                />
              {!isAvailable &&   <Button
                  className="primary-button mt-2 full-width-button"
                  onClick={checkAvailability}
                >
                  Check Availability
                </Button>}

                {isAvailable && (
                  <Button
                    className="primary-button mt-2 full-width-button"
                    onClick={bookNow}
                  >
                    Book Now
                  </Button>
                )}
              </div>
            </Col>
           
          </Row>
        </div>
        <div>
         
          <hr />
          <Row gutter={20} className="mt-4" align="middle">

            <Col span={8} sm={24} xs={24} lg={8}>
              <img
                src={chatImage}
                alt=""
                width="80%"
                height='300'
              />
            </Col>
            <Col span={8} sm={24} xs={24} lg={8}>
              <h1 className="normal-text">
                <b>Timings :</b> {trainer.timings[0]} - {trainer.timings[1]}
              </h1>
              <p>
                <b>Phone Number : </b>
                {trainer.phoneNumber}
              </p>
              <p>
                <b>Address : </b>
                {trainer.address}
              </p>
              <p>
                <b>Fee per Visit : </b>
                {trainer.feePerConsultation}
              </p>
              <p>
                <b>Email : </b>
                {trainer.email}
              </p>
              <div className="d-flex flex-column pt-2 mt-2">
                <textarea className='mt-3' onChange={(e) => {setContents(e.target.value)}} />
              <Button
                    className="primary-button mt-3 full-width-button"
                    onClick={makeChat}
                  >
                    Chat Now
                  </Button>
                
              </div>
            </Col>
           
          </Row>
        </div>
</>
      )}
    </Layout>
  );
}

export default BookAppointment;
