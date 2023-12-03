import React from 'react';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Money Mate</h1>
      <a href="https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=2001879040&redirect_uri=https%3A%2F%2F18.235.176.70%2Fapi%2F1.0&scope=profile%20openid&state=12345">
        Login with LINE
      </a>
    </div>
  );
};

export default HomePage;
