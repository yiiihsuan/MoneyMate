
import React from 'react';
import styled from 'styled-components';
import Header from '../component/Header.js';
import { useNavigate } from 'react-router-dom';
//import PieChartComponent from '../component/AccountingPieChart'; 

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
  background-color: #fff; 
  padding: 20px; 
  border-radius: 10px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
  background:

  display: flex; 
  flex-direction: row; 
  align-items: center; 
  justify-content: space-between; 

  margin: 20px 0; 
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

function formatNumber(num) {
  return (num >= 0 ? "+" : "") + num.toLocaleString();
}

const Dashboard = () => {
  //const [totalExpenditure, setTotalExpenditure] = useState(0);

  const cumulativeProfitLoss = +150000; // 累積損益
  const dailyProfitLoss = -300;       //當日損益
  const inventoryBalance = 50000;    //庫存餘額

  const navigate = useNavigate();

  const handleMoreClick = () => {
    navigate('/accountingbook'); // 導航到 /accountingbook 路徑
  };


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
            <SmallSectionHeader>記帳本摘要 </SmallSectionHeader>
      

            <PieChartContainer>
            {/* <PieChartComponent data={pieChartData} /> */}
            </PieChartContainer>
          </AccountingSummarySection>

          </MyAccountBook>

          <TodayStatistics>
            <SectionHeader>今日統計<MoreButton>...more</MoreButton></SectionHeader>
            {/* Content goes here */}
          </TodayStatistics>
        </LeftColumn>

        <RightColumn>
          <MyAccount>
            <SectionHeader>我的帳戶<MoreButton>...more</MoreButton></SectionHeader>
            {/* Content goes here */}
          </MyAccount>
          <MyCreditCard>
            <SectionHeader>我的信用卡<MoreButton>...more</MoreButton></SectionHeader>
            {/* Content goes here */}
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
