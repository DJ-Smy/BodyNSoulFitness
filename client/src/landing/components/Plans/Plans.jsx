import React from 'react'
import './plans.css'
import {plansData} from '../../data/plansData'
import whiteTick from '../../assets/whiteTick.png'


function Plans() {
  return (
    <div className="plans-container">
        <div className="programs-header" style={{gap: '2rem'}}>
            <span className='stroke-text'>READY TO START</span>
            <span>YOUR JOURNEY</span>
            <span className='stroke-text'>NOW WITHUS</span>
        </div>

        {/* plans card */}
        <div className="plans">
            {plansData.map((plan, index)=>(
                <div className="plan" key={index}>
                    {plan.icon}
                    <span>{plan.name}</span>
                    <span>$ {plan.price}</span>

                    <div className="features">
                        {plan.features.map((feature, index)=>(
                            <div className="feature">
                                <img src={whiteTick} alt="" />
                                <span key={index}>{feature}</span>
                            </div>
                        ))}
                    </div>
                    <div>
                        <span>
                            See more benefits ➡
                        </span>
                    </div>
                        <button className='btn1'>Join now</button>
                </div>
            ))}
        </div>

    </div>
  )
}

export default Plans