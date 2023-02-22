import React from 'react'
import FeatureBox from './FeatureBox';
import fImage1 from '../images/1.svg';
import fImage2 from '../images/2.svg';
import fImage3 from '../images/3.svg';
import fImage4 from '../images/4.svg';
import styled from "styled-components";

function Feature() {
  return (
    <FeatureContainer>
    <div id='features'>
        <h1>FEATURES</h1>
        <div className='a-container'>
            <FeatureBox image={fImage1} title='WeightLifting'/>
            <FeatureBox image={fImage2} title='Specific Muscle'/>
            <FeatureBox image={fImage3} title='Flex Your Muscle'/>
            <FeatureBox image={fImage4} title='Cardio Exercise'/>
        </div>
    </div>
      </FeatureContainer>
  )
}

const FeatureContainer = styled.footer`
#features{
  width:100%;
  height:120vh;
  box-sizing: border-box;
  font-family:'Lato';
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 40px ;
  background-color: #000000;
}
#features h1{
  color: #fff;
  font-size: 3rem;
}
.a-container{
  display: flex;
  justify-content: center;
  align-content: center;


}
.a-box{
  background-color: #000000;
  width:250px;
  height: 400px;
  margin: 20px;
  border-radius: 10px;
  overflow: hidden;
  transition: 0.4s ease-in-out;
  position: relative;
}
.a-b-img{
  width: 100%;
  height: 60%;

}
.a-b-img img{
  padding: 15px;
  margin-top: 40px;
  width:100%;
  height: 50%;

}
.a-box:hover{
  border: 1px solid #FF1414;
  box-shadow: 2px 2px 12px rgba(184, 0, 0, 0.445);
}
.a-b-text{
  width: 100%;
  height: 40%;
  background-color:#000000;
  display:flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
}
.a-b-text h2{
  color: #fff;
}
.a-b-text p{
  margin: 0px;
  color:#ffffffa6;
  font-size: 1.1rem;
  font-family:'Lato';
  display: block;
  display: -webkit-box;
  max-width: 80%;
  margin-top: 5px;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 10px;
}
.a-b-text p:hover{
  color:#ffffff;
}
.a-b-text a{
  margin-top:15px ;
}

@media(max-width:1190px){
  #features{
		height:auto;
    }
    .a-container{
		flex-wrap: wrap;
	}
    .a-box{
		flex-grow: 1;
	}
    .a-b-img img{
		object-fit:contain;
    }
}

@media(max-width:970px){
  #features{
    margin-bottom: 100px;
}
}

`;

export default Feature