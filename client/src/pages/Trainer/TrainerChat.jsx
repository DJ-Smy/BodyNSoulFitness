import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Table, Button } from "antd";

function TrainerChats() {
  const [chats, setChats] = useState([]);
  const [data, setData] = useState([]);
  const [contents, setContents] = useState("");
  const dispatch = useDispatch();
  const [replyScreen, setReplyScreen] = useState(false);
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

  const onClick = (record) => {
    setData(record);
    setReplyScreen(true);
  }

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

  const makeReply = async() => {
    try {
        dispatch(showLoading());
        const response = await axios.post(
          "/api/trainer/make-reply",
          {
            trainerId: data.trainerId,
            trainerInfo: data.trainerInfo,
            userInfo: data.userInfo,
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
         setReplyScreen(false);
        }
      } catch (error) {
        toast.error("Error chat making");
        dispatch(hideLoading());
      }
  }



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
          {record.status === "Read" && (
            <div className="d-flex">
              <h1
                className="anchor px-2"
                onClick={() => { onClick(record)}}
              >
                Reply
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
      <h1 className="page-title">Chat List</h1>
      <hr />
      <Table columns={columns} dataSource={chats} />
      {replyScreen ? 
      <div className="d-flex flex-column pt-5 mt-3">
                <textarea className='mt-3' onChange={(e) => {setContents(e.target.value)}} />
              <Button
                    className="primary-button mt-3 full-width-button"
                    onClick={makeReply}
                  >
                    Reply Now
                  </Button>
                
              </div> : <></>  
    }
    </Layout>
  );
}

export default TrainerChats;