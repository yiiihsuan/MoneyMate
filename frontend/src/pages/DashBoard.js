
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../component/Header.js';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchAccountingDataForToday, fetchUserBankData, fetchUserCardData } from '../api';
import AccountingTimeline from '../component/AccountingTimeline';
import PieChartComponent from '../component/AccountingPieChart';
import BankPieComponent from '../component/BankBookPieChart';
import CardPieChart from '../component/BankBookPieChart';

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


function formatNumber(num) {
  return (num >= 0 ? "+" : "") + num.toLocaleString();
}

const Dashboard = () => {

  const { data: datas, isLoading, isError } = useQuery({
    queryKey: ['accountDataToday'],
    queryFn: fetchAccountingDataForToday
  });

  const { data: userBankData, isLoading: isUserBankLoading, isError: isUserBankError } = useQuery({
    queryKey: ['userBankData'],
    queryFn: fetchUserBankData
  });

  const { data: cardData, isLoading: isUserCardLoading, isError: isUserCardError } = useQuery({
    queryKey: ['userCardData'],
    queryFn: fetchUserCardData
  });

  const [totalExpenditure, setTotalExpenditure] = useState(0);
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    if (datas && datas.length > 0) {
      const newTotalExpenditure = datas.reduce((sum, record) => sum + record.amount, 0);
      setTotalExpenditure(newTotalExpenditure);

      let newCategoryData = {};
      datas.forEach(record => {
        if (!newCategoryData[record.category]) {
          newCategoryData[record.category] = 0;
        }
        newCategoryData[record.category] += record.amount;
      });
      const newPieChartData = Object.keys(newCategoryData).map(key => ({
        name: key,
        value: newCategoryData[key],
      }));
      setPieChartData(newPieChartData);
    }
  }, [datas]);


  console.log('data fetch today: ', datas);



  const cumulativeProfitLoss = +150000; // 累積損益
  const dailyProfitLoss = -300;       //當日損益
  const inventoryBalance = 50000;    //庫存餘額

  const navigate = useNavigate();

  const handleMoreClick = () => {
    navigate('/accountingbook');
  };

  // Loading 狀態處理
  if (isLoading || isUserBankLoading || isUserCardLoading) {
    return <div>Loading...</div>;
  }

  // Error 狀態處理
  if (isError || isUserBankError || isUserCardError) {
    return <div>Error loading data</div>;
  }

  return (
    <>
      <Header />
      <DashboardContainer>
        <div />
        <LeftColumn>

          <MyAccountBook>
            <SectionHeader>我的記帳本
              <MoreButton onClick={handleMoreClick}>...more</MoreButton>
            </SectionHeader>

            <AccountingSummarySection>
              {/* <SmallSectionHeader>記帳本摘要 </SmallSectionHeader> */}
              <TotalExpenditureText>今日花費: {totalExpenditure} 元</TotalExpenditureText>
              <AccountingTimeline data={datas} />

            </AccountingSummarySection>

          </MyAccountBook>

          <TodayStatistics>
            <SectionHeader>今日統計<MoreButton>...more</MoreButton></SectionHeader>
            <PieChartContainer>
              <PieChartComponent data={pieChartData} />
            </PieChartContainer>
          </TodayStatistics>
        </LeftColumn>

        <RightColumn>
          <MyAccount>
            <SectionHeader>我的帳戶<MoreButton>...more</MoreButton></SectionHeader>
            <BankPieComponent data={userBankData} />
          </MyAccount>
          <MyCreditCard>

            <SectionHeader>我的信用卡<MoreButton>...more</MoreButton></SectionHeader>
            <div>
              <h3>總帳單金額: {cardData.data.total}元</h3>
              <h3>總回饋金額: {cardData.data.reward.toFixed(2)}元</h3>
              {/* <h3>清單: {cardData.data.list}</h3> */}
              <CardPieChart data={cardData.data.list} />
            </div>
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
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
