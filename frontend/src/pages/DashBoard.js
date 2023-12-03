// import React from 'react';
// import styled from 'styled-components';
// import Header from '../component/Header.js';

// // Styled components for each section
// const DashboardContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
//   padding: 20px;
// `;

// const Section = styled.div`
//   background-color: #fff;
//   border-radius: 8px;
//   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
//   padding: 20px;
//   header {
//     font-size: 1.5em;
//     margin-bottom: 20px;
//   }
// `;

// const MyAccountBook = styled(Section)``;
// const TodayStatistics = styled(Section)``;
// const MyAccount = styled(Section)``;
// const MyCreditCard = styled(Section)``;
// const MyInvestment = styled(Section)``;

// const Dashboard = () => {
//   return (
//     <div>
//     <Header/>
//     <DashboardContainer>
//       <MyAccountBook>
//         <header>我的記帳本</header>
//         {/* Content goes here */}
//       </MyAccountBook>
//       <TodayStatistics>
//         <header>今日統計</header>
//         {/* Content goes here */}
//       </TodayStatistics>
//       <MyAccount>
//         <header>我的帳戶</header>
//         {/* Content goes here */}
//       </MyAccount>
//       <MyCreditCard>
//         <header>我的信用卡</header>
//         {/* Content goes here */}
//       </MyCreditCard>
//       <MyInvestment>
//         <header>我的投資</header>
//         {/* Content goes here */}
//       </MyInvestment>
//     </DashboardContainer>
//     </div>
//   );
// };

// export default Dashboard;

import React from 'react';
import styled from 'styled-components';
import Header from '../component/Header.js';

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 1fr; /* 最左側空間為 100px，其餘空間分為兩半 */
  gap: 20px;
  padding: 20px;
`;

const Section = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin-top: 10px; /* 上下留一些空間 */
  margin-bottom: 10px;
  header {
    font-size: 1.5em;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between; /* 確保標題和...more按鈕在兩端 */
    align-items: center;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 40px); /* 減去padding的高度 */
  gap: 20px;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 40px); /* 減去padding的高度 */
  gap: 20px;
`;

const MyAccountBook = styled(Section)`
  flex-grow: 6; /* 佔據 60% 的空間 */
`;

const TodayStatistics = styled(Section)`
  flex-grow: 4; /* 佔據 40% 的空間 */
`;

const MyAccount = styled(Section)`
  flex-grow: 1; /* 垂直分成三等份 */
`;

const MyCreditCard = styled(Section)`
  flex-grow: 1; /* 垂直分成三等份 */
`;

const MyInvestment = styled(Section)`
  flex-grow: 1; /* 垂直分成三等份 */
`;

const Dashboard = () => {
  return (
    <>
      <Header />
      <DashboardContainer>
        <div /> {/* 這是佔位元素，用於創建最左側的空間 */}
        <LeftColumn>
          <MyAccountBook>
            <header>我的記帳本 ...more</header>
            {/* Content goes here */}
          </MyAccountBook>
          <TodayStatistics>
            <header>今日統計 ...more</header>
            {/* Content goes here */}
          </TodayStatistics>
        </LeftColumn>
        <RightColumn>
          <MyAccount>
            <header>我的帳戶 ...more</header>
            {/* Content goes here */}
          </MyAccount>
          <MyCreditCard>
            <header>我的信用卡 ...more</header>
            {/* Content goes here */}
          </MyCreditCard>
          <MyInvestment>
            <header>我的投資 ...more</header>
            {/* Content goes here */}
          </MyInvestment>
        </RightColumn>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
