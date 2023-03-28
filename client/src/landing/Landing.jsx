import React from "react";
import "./Landing.css";
import Hero from "./components/Hero/Hero";
import { Programs } from "./components/Programs/Programs";
import { Reasons } from "./components/Reasons/Reasons";
import Plans from "./components/Plans/Plans";
import Testimonials from "./components/Testimonials/Testimonials";
import Join from "./components/Join/Join";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

function Landing() {
  return (
    <div className="App">
      <Hero />
      <Programs />
      <Reasons />
      <Plans />
      <Testimonials />
      <Join />
      <Contact />
      <Footer />
    </div>
  );
}

export default Landing;
