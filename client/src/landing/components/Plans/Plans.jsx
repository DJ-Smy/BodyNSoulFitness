import React from "react";
import "./plans.css";
import { plansData } from "../../data/plansData";
import whiteTick from "../../assets/whiteTick.png";
import { useNavigate } from "react-router-dom";
function Plans() {
  const navigate = useNavigate();
  return (
    <div className="plans-container">
      <div className="blur plans-blur-1"></div>
      <div className="blur plans-blur-2"></div>
      <div className="plans-header" style={{ gap: "2rem" }}>
        <span>START YOUR <span className="gradient-text">JOURNEY </span> NOW WITH US</span>
        {/* <span>YOUR JOURNEY</span>
        <span>NOW WITH US</span> */}
      </div>

      {/* plans card */}
      <div className="plans">
        {plansData.map((plan, index) => (
          <div className="plan" key={index}>
            {plan.icon}
            <span>{plan.name}</span>
            <span>$ {plan.price}</span>

            <div className="features">
              {plan.features.map((feature, index) => (
                <div className="feature">
                  <img src={whiteTick} alt="" />
                  <span key={index}>{feature}</span>
                </div>
              ))}
            </div>
            <div>
              {/* <span>See more benefits ➡</span> */}
            </div>
            <button className="btn1" onClick={() => {
            navigate("/register");
          }}>Join now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Plans;
