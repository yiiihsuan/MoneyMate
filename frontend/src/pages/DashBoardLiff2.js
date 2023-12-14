
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../component/Header.js';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchAccountingDataForToday, fetchUserBankData, fetchUserCardData } from '../api';
import AccountingTimeline from '../component/AccountingTimeline';
import PieChartComponent from '../component/AccountingPieChart';
import BankPieComponent from '../component/BankBookPieChart';
import CardPieChart from '../component/CardPieChart';
import LoadingSpinner from '../component/LoadingSpinner';

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 4% 1fr 1fr;
  gap: 1.5%;
  padding: 0.3%;
`;

const Section = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  margin-top: 10px;
  margin-bottom: 10px;
`;

const SectionHeader = styled.div`
  font-size: 1.5em;
  background-color: #f9e0e0; /* 粉紅色背景 */
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  border-radius: 8px 8px 0 0; /* 圓角只在上方 */
`;

const MoreButton = styled.span`
  color: #888;
  cursor: pointer;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1%;
  height: calc(100vh - 40px); /* 減去padding的高度 */

`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1%;
`;

const MyAccountBook = styled(Section)`
  flex-grow: 6;
  background-color: #f0f0f0;
`;

const TodayStatistics = styled(Section)`
  flex-grow: 4;
  background-color: #f0f0f0;
`;

const MyAccount = styled(Section)`
  flex-grow: 1;
  background-color: #f0f0f0;
`;

const MyCreditCard = styled(Section)`
  flex-grow: 1;
  background-color: #f0f0f0;
`;



const MyInvestment = styled(Section)`
  flex-grow: 1;
  background-color: #f0f0f0;
`;

const AccountingSummarySection = styled.section`
  background-color: #f0f0f0;
  padding: 3%; 
  border-radius: 10px; 
  display: flex; 
  flex-direction: row; 
  align-items: center; 
  justify-content: space-between; 
  margin: 3px 0; 
  overflow: auto; 
`;

const SmallSectionHeader = styled.h2`
  font-size: 1.5em; 
  color: #333; 
  text-align: center; 
  flex: 1; 
  margin-right: 20px; 
`;

const PieChartContainer = styled.div`
  flex: 1; 
  display: flex;        
  justify-content: center; 
  align-items: center;      
  height: auto;         

`;


const InvestmentSection = styled.section`
  margin-left: 5%;
  margin-top: 5%;
`;

const Cumulative = styled.div`
  font-size: 3em; 
  color: ${props => props.value >= 0 ? '#8B0000' : '#006400'};
`;

const Today = styled.div`
 font-size: 1.5em; 
  color: ${props => props.value >= 0 ? '#8B0000' : '#006400'};
`;

const Amount = styled.div`
font-size: 1.5em; 
`;



const TotalExpenditureText = styled.p`
  font-size: 1.5em; 
  text-align: center; 
  margin: 0; 
`;

const CardContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const CardInfo = styled.div`
  flex: 1;
`;

const ChartContainer = styled.div`
  flex: 1;
  padding: 10px;
`;


function formatNumber(num) {
  return (num >= 0 ? "+" : "") + num.toLocaleString();
}

const DashboardRightLiff = () => {



  const { data: userBankData, isLoading: isUserBankLoading, isError: isUserBankError } = useQuery({
    queryKey: ['userBankData'],
    queryFn: fetchUserBankData
  });

  const { data: cardData, isLoading: isUserCardLoading, isError: isUserCardError } = useQuery({
    queryKey: ['userCardData'],
    queryFn: fetchUserCardData
  });

 
  const cumulativeProfitLoss = +150000; // 累積損益
  const dailyProfitLoss = -300;       //當日損益
  const inventoryBalance = 50000;    //庫存餘額

 
 


  if ( isUserBankLoading || isUserCardLoading) {
    return (
      <LoadingSpinner />
    );
  }


  // Error 狀態處理
  if ( isUserBankError || isUserCardError) {
    return <div>Error loading data</div>;
  }

  return (
    <>
      <Header />
        <RightColumn>
          <MyAccount>
            <SectionHeader>我的帳戶<MoreButton>...more</MoreButton></SectionHeader>
            <BankPieComponent data={userBankData} />
          </MyAccount>
          <MyCreditCard>

            <SectionHeader>我的信用卡<MoreButton>...more</MoreButton></SectionHeader>
            <CardContentContainer>
              <CardInfo>
                <h3>總帳單金額: <br />{cardData.data.total}元</h3>
                <h3>總回饋金額: <br />{cardData.data.reward.toFixed(2)}元</h3>
              </CardInfo>
              <ChartContainer>
                <CardPieChart data={cardData.data.list} />
              </ChartContainer>
            </CardContentContainer>
          </MyCreditCard>

          <MyInvestment>
            <SectionHeader>我的投資<MoreButton>...more</MoreButton></SectionHeader>
            <InvestmentSection>
              <Cumulative value={cumulativeProfitLoss}>
                累積損益: {formatNumber(cumulativeProfitLoss)} 元
              </Cumulative>
              <Today value={dailyProfitLoss}>
                當日損益: {dailyProfitLoss.toLocaleString()} 元
              </Today>
              <Amount>
                庫存餘額: {inventoryBalance.toLocaleString()} 元
              </Amount>
            </InvestmentSection>
          </MyInvestment>
        </RightColumn>
    </>
  );
};

export default DashboardRightLiff;
