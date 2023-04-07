import React from "react";
import "./programs.css";
import { programsData } from "../../data/programsData";
import RightArrow from "../../assets/rightArrow.png";
import bodyBuild from "../../assets/bodyBuild.jpg";
import nutrition from "../../assets/nutrition.jpg";
import weightLoss from "../../assets/weightLoss.jpg";
import slide4 from "../../assets/slide4.jpg";
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useNavigate } from "react-router-dom";

export const Programs = () => {
  const navigate = useNavigate();
  return (
    <div className="Programs">
      <div className="offer">
      <span className="programs-header gradient-text">What We Offer</span>
      
    <div id="hero-carousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#hero-carousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#hero-carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#hero-carousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
      <button type="button" data-bs-target="#hero-carousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
    </div>

    <div class="carousel-inner">
      <div class="carousel-item active c-item">
        <img src={bodyBuild} class="d-block w-100 c-img" alt="Slide 1"/>

        <div class="carousel-caption top-0 mt-4">
          <p class="fs-3 text-uppercase fs-3 mt-5" style={{color: '#FFF'}}>Power</p>
          <p class="display-1 fw-bolder text-capitalize" style={{color: '#FFF'}}>Body Building</p>
          <button class="btn btn-primary px-4 py-2 fs-5 mt-5" onClick={() => {
            navigate("/register");
          }}>Join Now</button>
        </div>
    </div>
      
      <div class="carousel-item c-item">
        <img src={weightLoss} class="d-block w-100 c-img" alt="Slide 2"/>
        <div class="carousel-caption top-0 mt-4">
          <p class="text-uppercase fs-3 mt-5" style={{color: '#FFF'}}>Wellness</p>
          <p class="display-1 fw-bolder text-capitalize" style={{color: '#FFF'}}>Weight Loss</p>
          <button class="btn btn-primary px-4 py-2 fs-5 mt-5" data-bs-toggle="modal"
            data-bs-target="#booking-modal" onClick={() => {
              navigate("/register");
            }}>Join Now</button>
        </div>
      </div>
      <div class="carousel-item c-item">
        <img src={nutrition} class="d-block w-100 c-img" alt="Slide 3"/>
        <div class="carousel-caption top-0 mt-4">
          <p class="text-uppercase fs-3 mt-5" style={{color: '#FFF'}}>Healthy Diet</p>
          <p class="display-1 fw-bolder text-capitalize" style={{color: '#FFF'}}>Nutrition Coaching</p>
          <button class="btn btn-primary px-4 py-2 fs-5 mt-5" data-bs-toggle="modal"
            data-bs-target="#booking-modal" onClick={() => {
              navigate("/register");
            }}>Join Now</button>
        </div>
      </div>
      <div class="carousel-item c-item">
        <img src={slide4} class="d-block w-100 c-img" alt="Slide 4"/>
        <div class="carousel-caption top-0 mt-4">
          <p class="text-uppercase fs-3 mt-5" style={{color: '#FFF'}}>In Person</p>
          <p class="display-1 fw-bolder text-capitalize" style={{color: '#FFF'}}>Personal Training</p>
          <button class="btn btn-primary px-4 py-2 fs-5 mt-5" data-bs-toggle="modal"
            data-bs-target="#booking-modal" onClick={() => {
              navigate("/register");
            }}>Join Now</button>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#hero-carousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#hero-carousel" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  </div>
  </div>
  );
};
