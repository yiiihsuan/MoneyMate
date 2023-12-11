import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: #000;
  color: white;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  color: #fff;
`;

const SelectButton = styled.button`
  background: #333;
  border: none;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
`;

const Content = styled.div`
  margin-top: 20px;
`;

const Button = styled.button`
  background: #333;
  color: white;
  border: none;
  padding: 10px;
  margin-right: 10px;
`;

const Input = styled.input`
  background: #333;
  color: white;
  border: none;
  padding: 10px;
  width: 50px;
  text-align: center;
`;

const SaveButton = styled.button`
  width: 100%;
  background: pink;
  color: black;
  padding: 10px;
  border: none;
  margin-top: 20px;
`;

const SaveStock = () => {
  return (
    <Container>
      <Header>
        <Title>新增交易</Title>
        <SelectButton>合计</SelectButton>
      </Header>
      <Content>
        {/* ...其他内容 */}
        <div>
          <Button>-</Button>
          <Input type="number" value="1" />
          <Button>+</Button>
        </div>
        <SaveButton>儲存</SaveButton>
      </Content>
    </Container>
  );
};

export default  SaveStock;
