import React from 'react'
import Header from '../Header/Header'
import './hero.css'
import hero_image from "../../assets/hero_image.png"
import hero_image_back from "../../assets/hero_image_back.png"
import Heart from "../../assets/heart.png"
import Calories from "../../assets/calories.png"
import {useNavigate} from "react-router-dom"

function Hero() {
    const navigate = useNavigate();
  return (
    <div className='hero'>
        {/* 왼쪽편  */}
        <div className="left-h">
            <Header />
            <div className="the-best-ad">
                <div></div>
                    <span>the best personal trainer in the town</span>
            </div>

            <div className="hero-text">
                <div>
                    <span className='stroke-text'>Shape </span>
                    <span>Your</span>
                </div>
                <div>
                    <span>ideal body</span>
                </div>
                <div>
                    <span>
                    In here we will help you to shape and build <br/> your ideal body and live up 
                    your life to fullest
                    </span>
                </div>
            </div>

            <div className="figures">
                <div>
                    <span>+1</span>
                    <span>Expert Trainer</span>
                </div>
                <div>
                    <span>+40</span>
                    <span>Members joined</span>
                </div>
                <div>
                    <span>+5</span>
                    <span>Fitness programs</span>
                </div>

            </div>
                <div className="hero-buttons">
                    <button className="btn1">Get Started</button>
                    <button className="btn1"> Learn More</button>
                </div>
        </div>
        <div className="right-h">
            {/* 오른쪽편 */}
            <button className='btn1' onClick={()=>{navigate('/login')}}>Join Now</button>
            
            <div className="heart-rate">
                <img src={Heart} alt="rate" />
                <span>Heart Rate</span>
                <span>116 bpm</span>
            </div>

            <img src={hero_image} alt="img_hero" className='hero-image' />
            <img src={hero_image_back} alt="img_hero" className='hero-image-back' />

            <div className="calories">
                <img src={Calories} alt="calories" />
                <div>
                    <span>Calories Burned</span><span>185 Kcal</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero