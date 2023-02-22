import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import Trainer from '../components/Trainer';



function Home() {
  const [trainers, setTrainers] = useState([]);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(showLoading())
      const response = await axios.get("/api/user/get-all-approved-trainers", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(hideLoading())
      if (response.data.success) {
        setTrainers(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading())
    }
  };

  useEffect(() => {
    getData();
  }, []);


  return (
    <Layout>
      <Row gutter={20}>
        {trainers.map((trainer) => (
          <Col span={8} xs={24} sm={24} lg={8}>
            <Trainer trainer={trainer} />
          </Col>
        ))}
      </Row>
    </Layout>
  );
}

export default Home;