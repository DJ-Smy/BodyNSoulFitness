import React, { useState } from 'react'
import './testimonials.css'
import {testimonialsData} from '../../data/testimonialsData'
import leftArrow from '../../assets/leftArrow.png'
import rightArrow from '../../assets/rightArrow.png'

function Testimonials() {
    const [selected, setSelected] = useState(0);
    const tLength = testimonialsData.length;


  return (
    <div className="Testimonials">
        <div className="left-t">
            <span style={{fontSize: '2rem'}}>Testimonials</span>
            <span className='stroke-text' style={{fontSize: '3rem'}}>What they </span>
            <span style={{fontSize: '3rem'}}>say about us</span>
            <span>
                {testimonialsData[selected].review}
            </span>
            <span>
                <span style={{color: 'var(--orange'}}>
                    {testimonialsData[selected].name}
                </span>{ " " }
                - {testimonialsData[selected].status}
            </span>
        </div>
        <div className="right-t">
            <div></div>
            <div></div>
            <img src={testimonialsData[selected].image} alt="image" />
            <div className="arrows">
                <img 
                onClick={() =>{
                    selected === 0 ? setSelected (tLength-1)
                    : setSelected ((prev) => prev -1 );
                }}
                src={leftArrow} alt="" />
                <img 
                onClick={()=>{
                    selected === tLength-1 ? setSelected(0)
                    : setSelected((prev)=>prev+1);
                }}
                src={rightArrow} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Testimonials