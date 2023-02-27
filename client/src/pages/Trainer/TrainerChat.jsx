import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";

function TrainerChats() {
  const [chats, setChats] = useState([]);
  const dispatch = useDispatch();
  const getChatData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "/api/trainer/get-chats-by-trainer-id",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setChats(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const changeChatStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/trainer/change-chat-status",
        { chatId : record._id, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        getChatData();
      }
    } catch (error) {
      toast.error("Error changing chat status");
      dispatch(hideLoading());
    }
  };
  const columns = [
    {
      title: "Member",
      dataIndex: "name",
      render: (text, record) => <span>{record.userInfo.name}</span>,
    },
    {
        title: "Contents",
        dataIndex: "contents",
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
          {record.status === "pending" && (
            <div className="d-flex">
              <h1
                className="anchor px-2"
                onClick={() => changeChatStatus(record, "Read")}
              >
                Read
              </h1>
            </div>
          )}
        </div>
      ),
    },
  ];
  useEffect(() => {
    getChatData();
  }, []);
  return (
    <Layout>
      <h1 className="page-header">Chat List</h1>
      <hr />
      <Table columns={columns} dataSource={chats} />
    </Layout>
  );
}

export default TrainerChats;