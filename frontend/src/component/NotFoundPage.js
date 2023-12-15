import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Text404 = styled.h1`
  font-size: 10rem; 
  color: #333; 
  margin: 0;
`;

const NotFoundPage = () => {
  return (
    <Container>
      <Text404>404</Text404>
    </Container>
  );
};

export default NotFoundPage;
