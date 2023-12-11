// import React from 'react';
// import styled from 'styled-components';

// const HomePage = () => {
//   return (
//     <div>
//       <h1>Welcome to Money Mate</h1>
//       <a href="https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=2001879040&redirect_uri=https%3A%2F%2F18.235.176.70%2Fapi%2F1.0&scope=profile%20openid&state=12345">
//         Login with LINE
//       </a>
//     </div>
//   );
// };

// export default HomePage;

import React from 'react';
import styled, { keyframes } from 'styled-components';
import TextTransition, { presets } from 'react-text-transition';


const TEXTS = ['Your', 'Closest', 'Financial', 'Manager'];



const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; 
`;

// const fadeIn = keyframes`
//   from { opacity: 0; }
//   to { opacity: 1; }
// `;

// const slideInFromLeft = keyframes`
//   from {
//     transform: translateX(-100%);
//     opacity: 0;
//   }
//   to {
//     transform: translateX(0);
//     opacity: 1;
//   }
// `;

// const AnimatedText = styled.p`
//   animation: ${slideInFromLeft} 2s ease-in-out;
//   margin-top: 20px;
//   font-size : 5rem;
//   font-family: 'Dancing Script', cursive;
  
// `;

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
      {/* <AnimatedText>"Your Closest Financial Manager"</AnimatedText> */}
      <h1>
      <CustomText springConfig={presets.wobbly}>{TEXTS[index % TEXTS.length]}</CustomText>
    </h1>


      <LoginIcon href="https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=2001879040&redirect_uri=https%3A%2F%2F18.235.176.70%2Fapi%2F1.0&scope=profile%20openid&state=12345" />
      <AnimatedText>MoneyMate</AnimatedText>
    </CenteredContainer>
  );
};

export default HomePage;

