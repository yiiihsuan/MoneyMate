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







// import React from 'react';
// import styled from 'styled-components';
// import Header from '../component/Header.js';

// const DashboardContainer = styled.div`
//   display: grid;
//   grid-template-columns: 100px 1fr 1fr; /* 最左側空間為 100px，其餘空間分為兩半 */
//   gap: 20px;
//   padding: 20px;
// `;

// const Section = styled.div`
//   background-color: #fff;
//   border-radius: 8px;
//   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
//   padding: 0px;
//   margin-top: 10px; /* 上下留一些空間 */
//   margin-bottom: 10px;

  

//   header {
//     font-size: 1.5em;
//     margin-bottom: 20px;
//     background-color: #f9e0e0; /* 粉紅色背景 */
//     display: flex;
//     justify-content: space-between; /* 確保標題和...more按鈕在兩端 */
//     align-items: center;
//     padding: 5px 10px; /* 標題內邊距 */
//     border-radius: 8px; /* 與 Section 統一的圓角 */

//   }



// `;

// const LeftColumn = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: calc(100vh - 40px); /* 減去padding的高度 */
//   gap: 20px;
// `;

// const RightColumn = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: calc(100vh - 40px); /* 減去padding的高度 */
//   gap: 20px;
// `;

// const MyAccountBook = styled(Section)`
//   flex-grow: 6; /* 佔據 60% 的空間 */
// `;

// const TodayStatistics = styled(Section)`
//   flex-grow: 4; /* 佔據 40% 的空間 */
// `;

// const MyAccount = styled(Section)`
//   flex-grow: 1; /* 垂直分成三等份 */
// `;

// const MyCreditCard = styled(Section)`
//   flex-grow: 1; /* 垂直分成三等份 */
// `;

// const MyInvestment = styled(Section)`
//   flex-grow: 1; /* 垂直分成三等份 */
// `;

// const Dashboard = () => {
//   return (
//     <>
//       <Header />
//       <DashboardContainer>
//         <div /> {/* 這是佔位元素，用於創建最左側的空間 */}
//         <LeftColumn>
//           <MyAccountBook>
//             <header>我的記帳本 ...more</header>
//             {/* Content goes here */}
//           </MyAccountBook>
//           <TodayStatistics>
//             <header>今日統計 ...more</header>
//             {/* Content goes here */}
//           </TodayStatistics>
//         </LeftColumn>
//         <RightColumn>
//           <MyAccount>
//             <header>我的帳戶 ...more</header>
//             {/* Content goes here */}
//           </MyAccount>
//           <MyCreditCard>
//             <header>我的信用卡 ...more</header>
//             {/* Content goes here */}
//           </MyCreditCard>
//           <MyInvestment>
//             <header>我的投資 ...more</header>
//             {/* Content goes here */}
//           </MyInvestment>
//         </RightColumn>
//       </DashboardContainer>
//     </>
//   );
// };

// export default Dashboard;

import React from 'react';
import styled from 'styled-components';
import Header from '../component/Header.js';
//import PieChartComponent from '../component/AccountingPieChart'; 

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 1fr;
  gap: 20px;
  padding: 20px;
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
  gap: 20px;
  height: calc(100vh - 40px); /* 減去padding的高度 */

`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MyAccountBook = styled(Section)`
  flex-grow: 6;
`;

const TodayStatistics = styled(Section)`
  flex-grow: 4;
`;

const MyAccount = styled(Section)`
  flex-grow: 1;
`;

const MyCreditCard = styled(Section)`
  flex-grow: 1;
`;

const MyInvestment = styled(Section)`
  flex-grow: 1;
`;

const AccountingSummarySection = styled.section`
  background-color: #fff; 
  padding: 20px; 
  border-radius: 10px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 

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

const Dashboard = () => {
  return (
    <>
      <Header />
      <DashboardContainer>
        <div /> {/* 這是佔位元素 */}
        <LeftColumn>

          <MyAccountBook>
            <SectionHeader>我的記帳本<MoreButton>...more</MoreButton></SectionHeader>

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
            {/* Content goes here */}
          </MyInvestment>
        </RightColumn>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
