import React from 'react';
import styled, { keyframes } from 'styled-components';
import TextTransition, { presets } from 'react-text-transition';
const host = process.env.REACT_APP_HOST


const TEXTS = ['Your', 'Closest', 'Financial', 'Manager'];


const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; 
`;


const AnimatedText = styled.p`
  margin-top: 20px;
  font-size : 5rem;
  font-family: 'Dancing Script', cursive;
  
`;

const CustomText = styled(TextTransition)`
margin-top: 20px;
  font-size : 5rem;
  font-family: 'Dancing Script', cursive;
`;

const LoginIcon = styled.a`
  margin-top: 0.2rem;
  display: block;
  background-image: url('linepng.png'); 
  background-size: contain;
  width: 300px; 
  height: 300px; 
  cursor: pointer;
`;




const HomePage = () => {

  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      1500,
    );
    return () => clearTimeout(intervalId);
  }, []);


  return (
    <CenteredContainer>
      <h1>
        <CustomText springConfig={presets.wobbly}>{TEXTS[index % TEXTS.length]}</CustomText>
      </h1>
      <LoginIcon href={`https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=2001879040&redirect_uri=https%3A%2F%2F${host}%2Fapi%2F1.0&scope=profile%20openid&state=12345`} />
      <AnimatedText>MoneyMate</AnimatedText>
    </CenteredContainer>
  );
};

export default HomePage;

