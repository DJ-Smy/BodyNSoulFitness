import React from "react";
import Header from "../Header/Header";
import "./hero.css";
import hero_image from "../../assets/hero_image.png";
import hero_image_back from "../../assets/hero_image_back.png";
import Heart from "../../assets/heart.png";
import Calories from "../../assets/calories.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import NumberCounter from "number-counter";

function Hero() {
  const transition = { type: "spring", duration: 4 };
  const mobile = window.innerWidth <= 768 ? true : false;
  const navigate = useNavigate();
  return (
    <div className='hero'>


      <div className="blur hero-blur"></div>
      {/* 왼쪽편  */}
      <div className="left-h">
        <Header />
        <div className="the-best-ad">
          <motion.div
            initial={{ left: mobile ? "178px" : "258px" }}
            whileInView={{ left: "10px" }}
            transition={{ ...transition, type: "tween" }}
          ></motion.div>
          <span>the best personal trainer in the town</span>

        </div>

        <div className="hero-text">
          <div>
            <span className="stroke-text">Shape </span>
            <span>Your</span>
          </div>
          <div>
            <span>ideal body</span>
          </div>
          <div>
            <span>
              In here we will help you to shape and build <br /> your ideal body and live up your life to fullest
            </span>
          </div>
        </div>

        <div className="figures">
          <div>
            <span>
              <NumberCounter end={40} start={0} delay={2} preFix="+" />
            </span>
            <span>Members joined</span>
          </div>
          <div>
            <span>
              <NumberCounter end={15} start={0} delay={2} preFix="+" />
            </span>
            <span>Training programs</span>
          </div>
          <div>
            <span>
              <NumberCounter end={100} start={50} delay={2} preFix="+" />
            </span>
            <span>Satisfied Reviews</span>
          </div>
        </div>
        <div className="hero-buttons">
          <button className="btn1">Get Started</button>
          <button className="btn1"> Learn More</button>
        </div>
      </div>
      <div className="right-h">
        {/* 오른쪽편 */}
        <button
          className="btn1 btn-h"
          onClick={() => {
            navigate("/login");
          }}
        >
          Join Now
        </button>

        <motion.div
          initial={{ right: "-2rem" }}
          whileInView={{ right: "7rem" }}
          transition={{ ...transition }}
          className="heart-rate"
        >
          <img src={Heart} alt="rate" />
          <span>Heart Rate</span>
          <span>116 bpm</span>
        </motion.div>

        <img src={hero_image} alt="img_hero" className="hero-image" />
        <motion.img
          initial={{ right: "11rem" }}
          whileInView={{ right: "28rem" }}
          transition={{ ...transition }}
          src={hero_image_back}
          alt="img_hero"
          className="hero-image-back"
        />

        <motion.div
          className="calories"
          initial={{ right: "90rem" }}
          whileInView={{ right: "40rem" }}
          transition={{ ...transition }}
        >
          <img src={Calories} alt="calories" />
          <div>
            <span>Calories Burned</span>
            <span>185 Kcal</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
export default Hero;
