import React, {useState} from 'react'
import {Button} from 'antd'
import Layout from "../components/Layout"
import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js"

function Membership() {

    const [fee, setFee] = useState();
    const [isShown, setIsShown] = useState(false);

    const handleClick = (e) => {
        console.log(fee + " has selected.")
        
        setFee(e.target.getAttribute("data-value"));
        setIsShown(current => !current);
    }



    return (
        <Layout>
            <h1>Membership</h1>
            <br /><br />
            <div className="membership_row">
                <div className="card p-2 membership_column">
                    <h1 className="card-title">1 MONTH</h1>
                    <h2>$600</h2>
                    <hr />
                    <ul>
                        <li>Cancel Anytime</li>
                        <li>3 Shared Appointments</li>
                        <li>Free Nutrition Guide</li>
                    </ul>
                    
                    <Button className='primary-button my-2 full-width-button' htmlType='submit' id="fee" onClick={handleClick} data-value="600">Select</Button>
                </div>
                <div className="card p-2 membership_column">
                    <h1 className="card-title">6 MONTH</h1>
                    <h2>$3000</h2>
                    <hr />
                    <ul>
                        <li>Cancel Anytime</li>
                        <li>20 Shared Appointments</li>
                        <li>Free Nutrition Guide</li>
                    </ul>
                    <Button className='primary-button my-2 full-width-button' htmlType='submit' id="fee" onClick={handleClick} data-value="3000">Select</Button>
                </div>
                <div className="card p-2 membership_column">
                    <h1 className="card-title">1 YEAR</h1>
                    <h2>$5000</h2>
                    <hr />
                    <ul>
                        <li>Cancel Anytime</li>
                        <li>45 Shared Appointments</li>
                        <li>Free Nutrition Guide</li>
                    </ul>
                    <Button className='primary-button my-2 full-width-button' htmlType='submit' id="fee" onClick={handleClick} data-value="5000">Select</Button>
                </div>
            </div>
            <br></br>
            {isShown && (
            <div className="paypal_button" >
                <h2>Do you want to buy the membership?</h2>
                <br></br>
                <PayPalScriptProvider options = {{"client-id": "AchZDV8No86XQmjElRf51pvC9QwrEtDFC0BN88pnBlyjuJ7XB4qNWQV-Rj8kknca0rn8jc5S9wXlmJVz", "currency": "CAD"}}>
                    <PayPalButtons 
                        createOrder = {(data, actions) => {
                            return actions.order.create(    {
                                purchase_units: [
                                    {
                                        amount: {
                                            currency: "CAD",
                                            value: fee,
                        
                                        },
                                    },
                                ],
                            });}
                        }
                        onApprove = {(data, actions) => {
                            return actions.order.capture().then(function(details)  {
                                alert('Transaction completed by ' + details.payer.name.given_name);
                            });
                        }
                    }
                    />
                </PayPalScriptProvider>
            </div>
            )}
        </Layout>
    );
}

export default Membership;