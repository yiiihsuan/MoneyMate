import React from 'react';
import styled from 'styled-components';
import Header from '../component/Header.js';

// Styled components for each section
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const Section = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 20px;
  header {
    font-size: 1.5em;
    margin-bottom: 20px;
  }
`;

const MyAccountBook = styled(Section)``;
const TodayStatistics = styled(Section)``;
const MyAccount = styled(Section)``;
const MyCreditCard = styled(Section)``;
const MyInvestment = styled(Section)``;

const Dashboard = () => {
  return (
    <div>
    <Header/>
    <DashboardContainer>
      <MyAccountBook>
        <header>我的記帳本</header>
        {/* Content goes here */}
      </MyAccountBook>
      <TodayStatistics>
        <header>今日統計</header>
        {/* Content goes here */}
      </TodayStatistics>
      <MyAccount>
        <header>我的帳戶</header>
        {/* Content goes here */}
      </MyAccount>
      <MyCreditCard>
        <header>我的信用卡</header>
        {/* Content goes here */}
      </MyCreditCard>
      <MyInvestment>
        <header>我的投資</header>
        {/* Content goes here */}
      </MyInvestment>
    </DashboardContainer>
    </div>
  );
};

export default Dashboard;