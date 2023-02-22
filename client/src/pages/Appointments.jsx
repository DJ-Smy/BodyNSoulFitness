import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import axios from "axios";
import { Table } from "antd";
import moment from 'moment';
import { toast } from "react-hot-toast";

function Appointments() {
  const [appointments, setAppointment] = useState([]);
  const dispatch = useDispatch();
  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/user/get-appointment-by-user-id", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setAppointment(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Trainer",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.trainerInfo.firstName} {record.trainerInfo.lastName}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text, record) => <span>{record.trainerInfo.email}</span>,
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      render: (text, record) => <span>{record.trainerInfo.phoneNumber}</span>,
    },
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span>
          {moment(record.date).format("YYYY-MM-DD")}{" "}
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  useEffect(() => {
    getAppointmentsData();
  }, []);

  return (
    <Layout>
      <h1 className="page-title">Appointments</h1>
      <hr />
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
}

export default Appointments;
