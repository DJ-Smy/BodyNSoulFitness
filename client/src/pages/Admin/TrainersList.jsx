import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import axios from "axios";
import { Table } from "antd";
import { toast } from "react-hot-toast";
import moment from 'moment';

function TrainersList() {
  const [trainers, setTrainers] = useState([]);
  const dispatch = useDispatch();

  const getTrainersData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/admin/get-all-trainers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setTrainers(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const changeTrainerStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/admin/change-trainer-status",
        { trainerId: record._id, userId: record.userId, tUserId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        getTrainersData();
      }
    } catch (error) {
      toast.error("Error while updating trainer status");
      dispatch(hideLoading());
    }
  };

  const deleteTrainer = async (record) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/admin/delete-trainer",
        { trainerId: record._id, userId: record.userId, tUserId: record.userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        getTrainersData();
      }
    } catch (error) {
      toast.error("Error while updating trainer status");
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getTrainersData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (record , text) => moment(record.createdAt).format("YYYY-MM-DD"),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending"  && (
            <h1
              className="anchor"
              onClick={() => changeTrainerStatus(record, "approved")}
            >
              Approve
            </h1>
          )}
          {record.status === "approved" && (
            <h1
              className="anchor"
              onClick={() => changeTrainerStatus(record, "blocked")}
            >
              Block
            </h1>
          )}
          {record.status === "blocked" && (
            <>
            <h1
              className="anchor"
              onClick={() => changeTrainerStatus(record, "approved")}
            >
              Approve
            </h1>

              <h1
              style={{marginLeft: "10px"}}
              className="anchor"
              onClick={() => deleteTrainer(record)}
            >
              Delete
            </h1>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="page-title">Trainers List</h1>
      <hr />
      <Table columns={columns} dataSource={trainers} />
    </Layout>
  );
}

export default TrainersList;
