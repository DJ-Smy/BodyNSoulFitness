import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Button } from "antd";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

function Membership() {
  const currency = "CAD";
  const style = { layout: "vertical" };

  const [amount, setAmount] = useState();

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function () {
              alert("Transaction completed.");
            });
          }}
        />
      </>
    );
  };

  return (
    <Layout>
      <h1 className="page-title">Membership</h1>
      <br />
      <br />
      <div className="membership_row">
        <div className="card p-2 membership_column">
          <h1 className="card-title">Basic</h1>
          <h2>$25</h2>
          <hr />
          <ul>
            <li>Cancel Anytime</li>
            <li>3 Shared Appointments</li>
            <li>Free Nutrition Guide</li>
          </ul>

          <Button
            className="primary-button my-2 full-width-button"
            htmlType="submit"
            onClick={handleChange}
            id="fee"
            value="25"
          >
            Select
          </Button>
        </div>
        <div className="card p-2 membership_column">
          <h1 className="card-title">Premium</h1>
          <h2>$30</h2>
          <hr />
          <ul>
            <li>Cancel Anytime</li>
            <li>20 Shared Appointments</li>
            <li>Free Nutrition Guide</li>
          </ul>
          <Button
            className="primary-button my-2 full-width-button"
            htmlType="submit"
            onClick={handleChange}
            id="fee"
            value="30"
          >
            Select
          </Button>
        </div>
        <div className="card p-2 membership_column">
          <h1 className="card-title">Pro</h1>
          <h2>$45</h2>
          <hr />
          <ul>
            <li>Cancel Anytime</li>
            <li>45 Shared Appointments</li>
            <li>Free Nutrition Guide</li>
          </ul>
          <Button
            className="primary-button my-2 full-width-button"
            htmlType="submit"
            onClick={handleChange}
            id="fee"
            value="45"
          >
            Select
          </Button>
        </div>
      </div>
      <br></br>
      <div style={{ maxWidth: "500px", minHeight: "200px", marginTop: "100px" ,marginLeft: "420px" }}>
        <PayPalScriptProvider
          options={{
            "client-id": "test",
            components: "buttons",
            currency: "CAD",
          }}
        >
          <ButtonWrapper currency={currency} showSpinner={false} />
        </PayPalScriptProvider>
      </div>
    </Layout>
  );
}

export default Membership;
