import React  from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import AccountingTimeline from '../component/AccountingDetail';
import { fetchAccountingData } from '../api'; 
import PieChartComponent from '../component/AccountingPieChart';
import LoadingSpinner from '../component/LoadingSpinner';

const AccountingBookContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 60px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const SectionHeader = styled.div`
  font-size: 1.2em;
  background-color: #f9e0e0;
  color: #333;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const AccountingTimelineSection = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
  text-align: left;
  padding-left: 10px;
  margin-bottom: 10px; 
`;

const SummarySection = styled.div`
  flex: 1;
  background-color: #f9f0f0;
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px; 
`;

const PieChartPlaceholder = styled.div`
  flex: 1; 
  background-color: #fff;
  width: 100%;
  padding: 10px;
  border-radius: 8px;
`;

const TotalExpenditureText = styled.p`
  font-size: 1.5em;
  text-align: center;
  margin: 0;
`;


const AccountingBook = () => {
 
  const { data: records, isLoading, isError } = useQuery({
    queryKey: ['accountData'],
    queryFn: fetchAccountingData,
  });

  let categoryData = {};

  if (!isLoading && !isError) {
    records.forEach(record => {
      categoryData[record.category] = (categoryData[record.category] || 0) + record.amount;
    });
  }

  const pieChartData = Object.keys(categoryData).map((key, index) => ({
    name: key,
    value: categoryData[key],
  }));

  let totalExpenditure = 0;


    if (!isLoading && !isError) {
      totalExpenditure = records.reduce((sum, record) => {
        return sum + record.amount;
      }, 0);
    }
 

  if (isLoading) {
    return (
      <LoadingSpinner />

    );
  }
  if (isError) return <div>Error fetching data</div>; // 錯誤處理


  //我的記帳本 放section 上會在上方，放下面會在section 裡的左側
  return (
    <AccountingBookContainer>
    <SectionHeader>我的記帳本</SectionHeader> 


        <AccountingTimelineSection>
        <AccountingTimeline data={records}  />
        </AccountingTimelineSection>


          <SummarySection>
          <TotalExpenditureText>總支出: {totalExpenditure} 元</TotalExpenditureText>
          </SummarySection>

          <PieChartPlaceholder>
            <PieChartComponent data={pieChartData} />
          </PieChartPlaceholder>


    </AccountingBookContainer>
  );
};

export default AccountingBook;

