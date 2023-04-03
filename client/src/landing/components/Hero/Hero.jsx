import React from "react";
import Header from "../Header/Header";
import "./hero.css";
import hero_image from "../../assets/hero_image.png";
// import hero_image_back from "../../assets/hero_image_back.png";
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
        {/* <div className="the-best-ad">
          <motion.div
            initial={{ left: mobile ? "178px" : "258px" }}
            whileInView={{ left: "10px" }}
            transition={{ ...transition, type: "tween" }}
          ></motion.div>
          <span>the best personal trainer in the city</span>

        </div> */}
        
        <div className="hero-text">
          <div>
            <span className="gradient-text">Achieve </span>
            <span>Your</span>
          </div>
          <div>
            <span>ideal</span>
            <span className="gradient-text-reversed"> body</span>
          </div>
          <div>
            <br></br>
            <br></br>
            <span className="rounded-background text-capitalize"> "We will support and encourage you to transform into your <br/> 
                 your ideal body and soul."                                
            </span>
            <br></br>
            <br></br>
            <span className="heroPhraseCaption">CEO -
                <span className="name"> Trainer</span>
            </span>
          </div>
        </div>

        <div className="figures">
          <div>
            <span>
              <NumberCounter end={257} start={0} delay={2} preFix="+" />
            </span>
            <span>Members joined</span>
          </div>
          <div>
            <span>
              <NumberCounter end={4} start={0} delay={2} preFix="+" />
            </span>
            <span>Training programs</span>
          </div>
          <div>
            <span>
              <NumberCounter end={9023} start={50} delay={2} preFix="+" />
            </span>
            <span>Satisfied Reviews</span>
          </div>
        </div>
        <div className="hero-buttons">
          {/* Delete: */}
          
          {/* <button className="btn1">Get Started</button>
          
          <button className="btn1"> Learn More</button>  */}
         
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
          Sign In
        </button>

        {/* <motion.div
          initial={{ right: "-2rem" }}
          whileInView={{ right: "7rem" }}
          transition={{ ...transition }}
          className="heart-rate"
        >
          <img src={Heart} alt="rate" />
          <span>Heart Rate</span>
          <span>116 bpm</span>
        </motion.div> */}

        <img src={hero_image} alt="img_hero" className="hero-image" />
        <motion.img
          initial={{ right: "11rem" }}
          whileInView={{ right: "28rem" }}
          transition={{ ...transition }}
          // src={hero_image_back}
          // alt="img_hero"
          // className="hero-image-back"
        />

        {/* <motion.div
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
        </motion.div> */}
      </div>
    </div>
   
  );
}
export default Hero;
