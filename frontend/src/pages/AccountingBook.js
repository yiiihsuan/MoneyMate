import React,{useState,useEffect}  from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
//import AccountingTimeline from '../component/AccountingTimeline';
import AccountingTimeline from '../component/AccountingDetail';
import { fetchAccountingData } from '../api'; 
import PieChartComponent from '../component/AccountingPieChart';
import Calendar from '../component/Calendar';
//import { Datepicker } from "@meinefinsternis/react-horizontal-date-picker";
import moment from 'moment';


const AccountingBookContainer = styled.div`
  margin-left: 60px; 
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const SectionHeader = styled.div`
  font-size: 1.2em;
  background-color: #f9e0e0; /* 粉紅色背景 */
  color: #333;
  padding: 10px;
  border-radius: 8px;
`;

const Section = styled.section`
  display: flex;
  height: calc(100vh - 20px); // 上下留10px空間
`;

const LeftColumn = styled.div`
  flex: 1;
  overflow-y: auto; // 如果內容很長，需要滾動條
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
  background-color: #f9f0f0; // 暫定背景色
  
  display: flex;
  justify-content: center;
  align-items: center;
 
`;

const TotalExpenditureText = styled.p`
  font-size: 1.5em; 
  text-align: center; // 文字居中
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
  
  const { data: records, isLoading, isError } = useQuery({
    queryKey: ['accountData'],
    queryFn: fetchAccountingData,
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState(records.filter((record) => moment(record.created_time).format('YYYY-MM-DD') === moment(new Date()).format('YYYY-MM-DD')));
  

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    const year = newDate.getFullYear();
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0'); 
    const date = newDate.getDate().toString().padStart(2, '0'); 
    const formattedDate = `${year}-${month}-${date}`;
    //const formattedDate = `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`;
    console.log('accountingbook format date:', formattedDate);

    setFilteredData(records.filter((record) => moment(record.created_time).format('YYYY-MM-DD') === formattedDate));

  };

  useEffect(() => {
    console.log('now data outside :', filteredData);
  }, [filteredData]);



  let categoryData = {};

  if (!isLoading && !isError) {
    records.forEach(record => {
        const recordDate = moment(record.created_time).format('YYYY-MM-DD');
        console.log('資料庫時間:', recordDate);
      categoryData[record.category] = (categoryData[record.category] || 0) + record.amount;
    });
  }

  const pieChartData = Object.keys(categoryData).map((key, index) => ({
    name: key,
    value: categoryData[key],
  }));

  let totalExpenditure = 0;
  //let totalIncome = 0;

    if (!isLoading && !isError) {
      totalExpenditure = records.reduce((sum, record) => {
        return sum + record.amount;
      }, 0);
    }


   /*to do : 分為支出和收入*/ 
    // totalExpenditure = records.reduce((sum, record) => {
    //   return record.type === 'expenditure' ? sum + record.amount : sum;
    // }, 0);
    // totalIncome = records.reduce((sum, record) => {
    //   return record.type === 'income' ? sum + record.amount : sum;
    // }, 0);
 
  
   // to do...update  data
  //  // 更新記錄
  const handleRecordUpdate = async (updatedRecord) => {
    // try {
    //   await updateRecordInAPI(updatedRecord); // 假設這是更新API中記錄的函數
    //   queryClient.invalidateQueries(['accountData']); // 使得特定查詢的緩存無效
    // } catch (error) {
    //   console.error('更新記錄失敗:', error);
    // }
  };
  //   // 假設您有一個函數來更新API中的記錄
  //   await updateRecordInAPI(updatedRecord);

  //   // 更新查詢緩存中的數據
  //   queryClient.setQueryData(['accountData'], (oldData) => {
  //     return oldData.map((record) => {
  //       if (record.id === updatedRecord.id) {
  //         return updatedRecord;
  //       }
  //       return record;
  //     });
  //   });
 

  if (isLoading) return <div>Loading...</div>; // 加載狀態
  if (isError) return <div>Error fetching data</div>; // 錯誤處理


  //我的記帳本 放section 上會在上方，放下面會在section 裡的左側
  return (
    <AccountingBookContainer>
    <SectionHeader>我的記帳本</SectionHeader> 
      <Section>
        <LeftColumn>
        <Calendar onDateChange={handleDateChange} />
          {/* <AccountingTimeline data={mockAccountingData} /> */}
          <AccountingTimeline data={filteredData} onRecordUpdate={handleRecordUpdate} selectedDate={selectedDate}  />
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

