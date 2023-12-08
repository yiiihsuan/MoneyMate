import React  from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import AccountingTimeline from '../component/AccountingDetail';
import { fetchAccountingData } from '../api'; 
import PieChartComponent from '../component/AccountingPieChart';




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
  flex-direction: column;
  height: calc(100vh - 20px); // 上下留10px空間
`;

// const Section = styled.section`
//   display: block; // 'flex' +'flex-direction: column;'
//   height: calc(100vh - 20px); // 上下留10px空间
// `;


const SummarySection = styled.div`
  flex: 1;
  background-color: #f9f0f0; // 暫定背景色
  // 添加更多樣式...
`;

const PieChartPlaceholder = styled.div`
  flex: 2;
  background-color: #fff;
  // 添加更多樣式...
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TotalExpenditureText = styled.p`
  font-size: 1.5em; 
  text-align: center; // 文字居中
  margin: 0; 
`;



const AccountingBook = () => {
  // 在這裡計算總支出和總收入
  // 現在我們只是簡單地將它們設置為0


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
  //let totalIncome = 0;

    if (!isLoading && !isError) {
      totalExpenditure = records.reduce((sum, record) => {
        return sum + record.amount;
      }, 0);
    }
   // to do...update  data
  //  // 更新記錄
  const handleRecordUpdate = async (updatedRecord) => {
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
  };

  if (isLoading) return <div>Loading...</div>; // 加載狀態
  if (isError) return <div>Error fetching data</div>; // 錯誤處理


  //我的記帳本 放section 上會在上方，放下面會在section 裡的左側
  return (
    <AccountingBookContainer>
    <SectionHeader>我的記帳本</SectionHeader> 

      <Section>

          {/* <AccountingTimeline data={mockAccountingData} /> */}
          <AccountingTimeline data={records} onRecordUpdate={handleRecordUpdate} />


          <SummarySection>
          <TotalExpenditureText>總支出: {totalExpenditure} 元</TotalExpenditureText>
          </SummarySection>

          <PieChartPlaceholder>
            <PieChartComponent data={pieChartData} />
          </PieChartPlaceholder>

      </Section>
    </AccountingBookContainer>
  );
};

export default AccountingBook;

