import styled from 'styled-components';

const Spinner = styled.div`
position: fixed;
top: 50%; 
left: 50%; 
transform: translate(-50%, -50%); 

width: 50px;
height: 50px;

  div {
    background-color: #333;
    width: 15px;
    height: 15px;
    position: absolute;
    top: 0;
    left: 0;
    animation: sk-cubemove 1.8s infinite ease-in-out;
  }

  .cube2 {
    animation-delay: -0.9s;
  }

  @keyframes sk-cubemove {
    25% { transform: translateX(42px) rotate(-90deg) scale(0.5); }
    50% { transform: translateX(42px) translateY(42px) rotate(-180deg); }
    75% { transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5); }
    100% { transform: rotate(-360deg); }
  }
`;

const LoadingSpinner = () => (
  <Spinner>
    <div className="cube1"></div>
    <div className="cube2"></div>
  </Spinner>
);

export default LoadingSpinner;
