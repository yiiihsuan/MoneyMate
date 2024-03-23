import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';
import AccountingTimeline from '../component/AccountingDetail';
import { fetchAccountingData } from '../api';
import PieChartComponent from '../component/AccountingPieChart';
import Calendar from '../component/Calendar';
import moment from 'moment';
import LoadingSpinner from '../component/LoadingSpinner';
import NotFoundPage from '../component/NotFoundPage';


const AccountingBookContainer = styled.div`
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
`;

const Section = styled.section`
  display: flex;
  height: calc(100vh - 20px); 
`;

const LeftColumn = styled.div`
  flex: 1;
  overflow-y: auto; 
  text-align: left;
  padding-left :10px;

`;

const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const SummarySection = styled.div`
  flex: 1;
  background-color: #f9f0f0; 
  
  display: flex;
  justify-content: center;
  align-items: center;
 
`;

const TotalExpenditureText = styled.p`
  font-size: 1.5em; 
  text-align: center; 
  margin: 0; 
`;

const PieChartPlaceholder = styled.div`
  flex: 2;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const AccountingBook = () => {

  const queryClient = useQueryClient();

  const { data: records, isLoading, isError } = useQuery({
    queryKey: ['accountData'],
    queryFn: fetchAccountingData,
    refetchInterval: 2000,
    refetchOnWindowFocus: true,
  });

  const onMutationSuccess = () => {
    queryClient.invalidateQueries('accountData');
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState([]);
  const [totalExpenditure, setTotalExpenditure] = useState(0);
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    if (!isLoading && !isError) {

      setFilteredData(
        records.filter(
          (record) =>
            moment(record.created_time).format('YYYY-MM-DD') ===
            moment(new Date()).format('YYYY-MM-DD')
        )
      );


    }
  }, [records, isLoading, isError]);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    const year = newDate.getFullYear();
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const date = newDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${date}`;
    //setFilteredData(records.filter((record) => moment(record.created_time).format('YYYY-MM-DD') === formattedDate));
    const newData = records.filter((record) => moment(record.created_time).format('YYYY-MM-DD') === formattedDate);
    setFilteredData(newData);

    const newTotalExpenditure = newData.reduce((sum, record) => sum + record.amount, 0);
    setTotalExpenditure(newTotalExpenditure);
  };

  useEffect(() => {
    const newTotalExpenditure = filteredData.reduce((sum, record) => sum + record.amount, 0);

    setTotalExpenditure(newTotalExpenditure);

    let newCategoryData = {};

    filteredData.forEach(record => {
      if (!newCategoryData[record.category]) {
        newCategoryData[record.category] = 0;
      }
      newCategoryData[record.category] += record.amount;
    });

    const newPieChartData = Object.keys(newCategoryData).map((key) => ({
      name: key,
      value: newCategoryData[key],
    }));

    setPieChartData(newPieChartData);
  }, [filteredData]);



  // to do...update  data
  const handleRecordUpdate = async (updatedRecord) => {
    // try {
    //   await updateRecordInAPI(updatedRecord); 
    //   queryClient.invalidateQueries(['accountData']); 
    // } catch (error) {
    //   console.error('更新記錄失敗:', error);
    // }
  };


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
      <Section>
        <LeftColumn>
          <Calendar onDateChange={handleDateChange} />
          <AccountingTimeline
            data={filteredData}
            onMutationSuccess={onMutationSuccess}
          />
        </LeftColumn>
        <RightColumn>
          <SummarySection>
            <TotalExpenditureText>總支出: {totalExpenditure} 元</TotalExpenditureText>
          </SummarySection>
          <PieChartPlaceholder>
            <PieChartComponent data={pieChartData} />
          </PieChartPlaceholder>
        </RightColumn>
      </Section>
    </AccountingBookContainer>
  );
};

export default AccountingBook;


