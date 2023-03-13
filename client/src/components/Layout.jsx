import { Badge } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "../layout.css";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  //console.log(user);
  const location = useLocation();
  const navigate = useNavigate();

  const userMenu = [
    {
      name: "home",
      path: "/home",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Apply Trainer",
      path: "/apply-trainer",
      icon: "ri-run-line",
    },
    {
      name: "Profile",
      path: `/user/profile/${user?._id}`,
      icon: "ri-user-line",
    },
    {
      name: "Chat",
      path: `/chatLists`,
      icon: "ri-chat-new-line",
    },
    {
      name: "Contact",
      path: `/contact`,
      icon: "ri-chat-new-line",
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/home",
      icon: "ri-home-line",
    },
    {
      name: "Users",
      path: "/admin/userslist",
      icon: "ri-file-user-fill",
    },
    {
      name: "Trainers",
      path: "/admin/trainerslist",
      icon: "ri-run-line",
    },
  ];

  const trainerMenu = [
    {
      name: "Home",
      path: "/home",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/trainer/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Profile",
      path: `/trainer/profile/${user?._id}`,
      icon: "ri-user-line",
    },
    {
      name: "Users",
      path: "/trainer/userslist",
      icon: "ri-file-user-fill",
    },
    {
      name: "Chat",
      path: `/trainer/chatLists/${user?._id}`,
      icon: "ri-chat-new-line",
    },
  ];

  const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isTrainer ? trainerMenu : userMenu;
  const role = user?.isAdmin ? "Admin" : user?.isTrainer ? "Trainer" : "User";

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="logo">
            <h1>BS</h1>
            <h1 className="role">{role}</h1>
          </div>
          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div className={`d-flex menu-item ${isActive && "active-menu-item"}`}>
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div
              className={`d-flex menu-item`}
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
            >
              <i className="ri-logout-circle-line"></i>
              {!collapsed && <Link to="/">Logout</Link>}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            {collapsed ? (
              <i className="ri-menu-2-fill header-action-icon" onClick={() => setCollapsed(false)}></i>
            ) : (
              <i className="ri-close-fill header-action-icon" onClick={() => setCollapsed(true)}></i>
            )}
            <div className="d-flex align-items-center px-3">
              <Badge count={user?.unseenNotifications.length} onClick={() => navigate("/notifications")}>
                <i className="ri-notification-line header-action-icon"></i>
              </Badge>
              <Link className="anchor mx-4" to="/home">
                {user?.name}
              </Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
