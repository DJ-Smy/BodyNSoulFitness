import React from "react";
import { useNavigate } from "react-router-dom";

function Trainer({ trainer }) {
  const navigate = useNavigate();
  return (
    <div
      className="card p-2 cursor-pointer"
      onClick={() => navigate(`/book-appointment/${trainer._id}`)}
    >
      <h1 className="card-title">
        {trainer.firstName} {trainer.lastName}
      </h1>
      <hr />
      <p>
        <b>Phone Number : </b>
        {trainer.phoneNumber}
      </p>
      <p>
        <b>Address : </b>
        {trainer.address}
      </p>
      <p>
        <b>Fee per Visit : </b>
        {trainer.feePerConsultation}
      </p>
      <p>
        <b>Available time : </b>
        {trainer.timings[0]} - {trainer.timings[1]}
      </p>
    </div>

  );
}

export default Trainer;
