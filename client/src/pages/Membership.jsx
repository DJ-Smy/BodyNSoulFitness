import React from 'react'
import Layout from "../components/Layout"
import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js"

function Membership() {
  
    return (
        <Layout>
            <h1>Membership</h1>
            <PayPalScriptProvider options = {{"client-id": "AchZDV8No86XQmjElRf51pvC9QwrEtDFC0BN88pnBlyjuJ7XB4qNWQV-Rj8kknca0rn8jc5S9wXlmJVz"}}>
                <PayPalButtons 
                    createOrder = {(data, actions) => {
                        return actions.order.create(    {
                            purchase_units: [
                                {
                                    amount: {
                                        value: "00.10",
                                    },
                                },
                            ],
                        });}
                    }
                    onApprove = {async(data) => {
                        return fetch("/my-server/capture-paypal-order", {
                            method: "POST",
                            body: JSON.stringify({
                                orderID: data.orderID
                            })
                            })
                            .then((response) => response.json())
                            .then((details) => {
                            // This function shows a transaction success message to your buyer.
                            alert('Transaction completed by ' + details.payer.name.given_name);
                            });
                    }}
                />
            </PayPalScriptProvider>
        </Layout>
    );
}

export default Membership;