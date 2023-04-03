import React from "react";
import "./reasons.css";
import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";
import image4 from "../../assets/image4.jpg";
import tick from "../../assets/tick.png";

export const Reasons = () => {
  return (
    <div className="Reasons" id="reasons">
      <div className="left-r">
        <img src={image1} alt="image" />
        <img src={image2} alt="image" />
        <img src={image3} alt="image" />
        <img src={image4} alt="image" />
      </div>
      <div className="right-r">
        <span>About</span>
        <div>
          {/* <span className="stroke-text">Why</span> */}
          <span> Body & Soul Fitness</span>
        </div>

        <div className="details-r">
          {/* <div>
            <img src={tick} alt="" />
            <span>OFFER 1:1 TRAINING SESSION</span>
          </div>
          <div>
            <img src={tick} alt="" />
            <span>TRAIN SMARTER AND FASTER THEN BEFORE</span>
          </div>
          <div>
            <img src={tick} alt="" />
            <span>2 FREE SESSION FOR NEW MEMBER</span>
          </div>
          <div>
            <img src={tick} alt="" />
            <span>CAN CHOOSE YOUR PREFERENCE</span>
          </div> */}
          <div className="description">
            One of the most sought-after and highly respected fitness training centres 
            in Calgary, we are heavily focused on client experience and fostering a community
            of warriors. We have a singular vision of transforming each client’s life by setting 
            you up with the right people who can help you become a true success story.
            <br></br>
            <br></br>
            As a member of Body & Soul Fitness, you’ll be matched with a trainer who fits 
            your unique style and who can help you reach all your goals quickly, safely, and sustainably. 
            Whether you’re looking for a customized weight loss program, or a nutrition coach to help you live healthier, 
            we’ll give you all the support and encouragement you need to get lasting and incredible results.
            </div>
        </div>
      </div>
    // </div>
  );
};
