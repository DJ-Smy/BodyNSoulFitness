import "./landing.css";
import About from "./about/About";
import Hero from "./hero/Hero";
import Members from "./members/Members";
import Programs from "./programs/Programs";
import Footer from './nav/Footer';


function LandingPage() {
  return (
    <div className="app">
      <Hero />
      <About />
      <Programs />
      <Members />
      <Footer />
    </div>
  );
}

export default LandingPage;
