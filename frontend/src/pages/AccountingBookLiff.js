import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';
import AccountingTimeline from '../component/AccountingDetail';
import { fetchAccountingData, fetchAccountingDataForToday } from '../api';
import PieChartComponent from '../component/AccountingPieChart';
import LoadingSpinner from '../component/LoadingSpinner';
import moment from 'moment';
import NotFoundPage from '../component/NotFoundPage';


const AccountingBookContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch
  margin-left: 60px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%; 
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

  const queryClient = useQueryClient();

  const { data: datas, isLoading, isError } = useQuery({
    queryKey: ['accountDataToday'],
    queryFn: fetchAccountingDataForToday,
    refetchInterval: 2000
  });



  const onMutationSuccess = () => {
    queryClient.invalidateQueries('accountData');
  };



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


  if (isLoading) {
    return (
      <LoadingSpinner />

    );
  }


  if (isError) {
    return (
      <NotFoundPage />
    );
  }

  return (
    <AccountingBookContainer>
      <SectionHeader>我的記帳本</SectionHeader>
      <AccountingTimelineSection>
        <AccountingTimeline
          data={datas}
          onMutationSuccess={onMutationSuccess}
        />
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

