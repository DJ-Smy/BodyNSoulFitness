import React from 'react'
import './reasons.css'
import image1 from '../../assets/image1.png'
import image2 from '../../assets/image2.png'
import image3 from '../../assets/image3.png'
import image4 from '../../assets/image4.png'
import tick from '../../assets/tick.png'

export const Reasons = () => {
  return (
    <div className='Reasons' id='reasons'>
        <div className="left-r">
            <img src={image1} alt="image" />
            <img src={image2} alt="image" />
            <img src={image3} alt="image" />
            <img src={image4} alt="image" />
        </div>
        <div className="right-r">
          <span>some reasons</span>
          <div>
            <span className='stroke-text'>Why</span>
            <span> choose us?</span>
          </div>

          <div className="details-r">
            <div>
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
            </div>
          </div>
        </div>
    </div>
  )
}
