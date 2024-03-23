import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../component/Header.js';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchAccountingDataForToday, fetchUserBankData, fetchUserCardData } from '../api';
import AccountingTimeline from '../component/AccountingTimeline';
import PieChartComponent from '../component/AccountingPieChart';
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



const MyAccountBook = styled(Section)`
  flex-grow: 6;
  background-color: #f0f0f0;
`;

const TodayStatistics = styled(Section)`
  flex-grow: 4;
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


const PieChartContainer = styled.div`
  flex: 1; 
  display: flex;        
  justify-content: center; 
  align-items: center;      
  height: auto;         

`;





const TotalExpenditureText = styled.p`
  font-size: 1.5em; 
  text-align: center; 
  margin: 0; 
`;


const DashboardLeftLiff = () => {

  const { data: datas, isLoading, isError } = useQuery({
    queryKey: ['accountDataToday'],
    queryFn: fetchAccountingDataForToday
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



  const navigate = useNavigate();

  const handleMoreClick = () => {
    navigate('/accountingbook');
  };


  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }


  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <>
      <Header />
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
    </>
  );
};

export default DashboardLeftLiff;
