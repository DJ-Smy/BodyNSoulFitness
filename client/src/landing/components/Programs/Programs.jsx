import React from 'react'
import "./programs.css"
import {programsData} from "../../data/programsData"
import RightArrow from "../../assets/rightArrow.png"

export const Programs = () => {
  return (
    <div className="Programs" id="programs">
 {/* 프로그램 제목글자  */}
        <div className="programs-header">
            <span className='stroke-text'>Explore our</span>
            <span>Programs</span>
            <span className='stroke-text'>to shape you</span>
        </div>
 {/* 프로그램 카드 카테고리 */}
        <div className="program-categories">
            {programsData.map((program)=>(
                <div className="category">
                    {program.image}
                    <span>{program.heading}</span>
                    <span>{program.details}</span>
                    <div className="join-now">
                        <span>Join Now</span>
                        <img src={RightArrow} alt="arrow" />
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
