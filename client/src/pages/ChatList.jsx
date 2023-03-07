import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import axios from "axios";
import { Button, Table } from "antd";


function ChatLists() {
  const [chat, setChat] = useState([]);
  const [reply, setReply] = useState([]);
  const dispatch = useDispatch();
  const getChatData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/user/get-chat-by-user-id", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        
        setChat(response.data.data);
        
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

    const getReplyData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/user/get-reply-by-user-id", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setReply(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const columns = [
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
      title: "Contents",
      dataIndex: "contents",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  useEffect(() => {
    getChatData();
    getReplyData();
  }, []);

  return (
    <Layout>
      <h1 className="page-title">Chat List</h1>
      <hr />
      <Table columns={columns} dataSource={chat} />
      <hr />
      <h1 className="page-title">Reply List</h1>
      <hr />
      <Table columns={columns} dataSource={reply} />
    </Layout>
  );
}

export default ChatLists;
