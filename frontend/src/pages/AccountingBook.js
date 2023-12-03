import React , {useState} from 'react';
import styled from 'styled-components';
import mockAccountingData from '../mockData/mockAccounting'; 
//import AccountingTimeline from '../component/AccountingTimeline';
import AccountingTimeline from '../component/AccountingDetail';


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
`;

const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

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



const AccountingBook = () => {
  // 在這裡計算總支出和總收入
  // 現在我們只是簡單地將它們設置為0
  const totalExpenditure = 0;
  const totalIncome = 0;
  
  const [records, setRecords] = useState(mockAccountingData);

  //更新紀錄
  const handleRecordUpdate = (updatedRecord) => {
    setRecords((prevRecords) => {
      return prevRecords.map((record) => {
        if (record.id === updatedRecord.id) {
          return updatedRecord;
        }
        return record;
      });
    });
  };


  //我的記帳本 放section 上會在上方，放下面會在section 裡的左側
  return (
    <AccountingBookContainer>
    <SectionHeader>我的記帳本</SectionHeader> 
      <Section>
        <LeftColumn>
          {/* <AccountingTimeline data={mockAccountingData} /> */}
          <AccountingTimeline data={records} onRecordUpdate={handleRecordUpdate} />
        </LeftColumn>
        <RightColumn>
          <SummarySection>
            <p>總支出: {totalExpenditure} 元</p>
            <p>總收入: {totalIncome} 元</p>
          </SummarySection>
          <PieChartPlaceholder>
            {/* 餅圖將放在這裡 */}
            <p>餅圖區域</p>
          </PieChartPlaceholder>
        </RightColumn>
      </Section>
    </AccountingBookContainer>
  );
};

export default AccountingBook;

