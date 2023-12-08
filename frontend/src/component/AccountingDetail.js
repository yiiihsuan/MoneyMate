import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import ReactModal from 'react-modal';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import axios from 'axios';
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineContent, TimelineConnector,TimelineOppositeContent } from '@mui/lab';
import { FaUtensils, FaCar, FaTshirt, FaHome, FaGamepad, FaQuestionCircle } from 'react-icons/fa'; // 引入需要的图标

ReactModal.setAppElement('#root');

const TimelineContainer = styled.div`
  height: 100vh;
  overflow-y: auto;
`;

const AmountText = styled.div`
  font-size: 1.2em;  
  font-weight: bold; 
`;

const EditButton = styled.button`
  margin-left: auto;
  padding: 5px 10px;
  border: none; 
  border-radius: 10px;
  //background-color: transparent; 

  &:hover {
    border: 1px solid #ccc; 
    cursor: pointer; 
  }
`;

const DeleteButton = styled.button`
  margin-left: auto;
  padding: 5px 10px;
  background-color: #f44336; 
  color: white; // 白色文字
  border-radius: 10px;
  border: none;

  &:hover {
    background-color: #d32f2f; 
    cursor: pointer; 
  }
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TimeTagDetail = styled.div`
  margin-left: 10px;
`;

const StyledTimeline = styled(Timeline)`
  margin-left: -15px; 
`;


const chooseIcon = (category) => {
  switch (category) {
    case '食':
      return <FaUtensils />;
    case '行':
      return <FaCar />;
    case '衣':
      return <FaTshirt />;
    case '住':
      return <FaHome />;
    case '樂':
      return <FaGamepad />;
    default:
      return <FaQuestionCircle />;
  }
};

const AccountingTimeline = ({ data, onRecordUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


  const openEditModal = (record) => {
    setCurrentRecord(record);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
  };

  const saveRecord = (updatedRecord) => {
    onRecordUpdate(updatedRecord);
    setIsModalOpen(false);
  };



  const openDeleteModal = (record) => {
    setCurrentRecord(record);
    setIsDeleteModalOpen(true);
};

const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
};

const handleDelete = async (id) => {
  try {
      await axios.delete(`/api/1.0/account/delete/${id}`);
      const response = await axios.get('/api/1.0/account/list');
      onRecordUpdate(response.data);
      setIsDeleteModalOpen(false);
  } catch (error) {
      console.error('刪除或獲取數據失敗:', error);
  }
};

  return (
    <TimelineContainer>
     <StyledTimeline align="alternate">
        {data.map((record) => (
          <TimelineItem key={record.id}>
            <TimelineOppositeContent>
             <AmountText>NT${record.amount}</AmountText>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot>{chooseIcon(record.category)}</TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <ContentContainer>
                <TimeTagDetail>
                  <div>{moment(record.created_time).format('HH:mm')}</div>
                  <div>{record.tag}</div>
                  <div>{record.detail}</div>
                </TimeTagDetail>
                <EditButton onClick={() => openEditModal(record)}>修改</EditButton>
                <DeleteButton onClick={() => openDeleteModal(record)}>刪除</DeleteButton>
              </ContentContainer>
            </TimelineContent>
          </TimelineItem>
        ))}
      </StyledTimeline>
      {isModalOpen && currentRecord && (
        <EditModal
          isOpen={isModalOpen}
          onRequestClose={closeEditModal}
          record={currentRecord}
          onSave={saveRecord}
        />
      )}

{isDeleteModalOpen && currentRecord && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onRequestClose={closeDeleteModal}
          record={currentRecord}
          onDelete={handleDelete}
        />
      )}

    </TimelineContainer>
  );
  
};

export default AccountingTimeline;


//加了timeline mui
// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import moment from 'moment';
// import ReactModal from 'react-modal';
// import EditModal from './EditModal';
// import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineContent, TimelineConnector } from '@mui/lab';




// ReactModal.setAppElement('#root');

// const TimelineContainer = styled.div`
//   height: 100vh;
//   overflow-y: auto;
// `;

// const EditButton = styled.button`
//   margin-left: auto;
//   padding: 5px 10px;
// `;

// const AccountingTimeline = ({ data, onRecordUpdate }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentRecord, setCurrentRecord] = useState(null);

//   const openEditModal = (record) => {
//     setCurrentRecord(record);
//     setIsModalOpen(true);
//   };

//   const closeEditModal = () => {
//     setIsModalOpen(false);
//   };

//   const saveRecord = (updatedRecord) => {
//     onRecordUpdate(updatedRecord);
//     setIsModalOpen(false);
//   };

//     return (
//       <TimelineContainer>
//         <Timeline>
//           {data.map((record) => (
//             <TimelineItem key={record.id}>
//               <TimelineSeparator>
//                 <TimelineDot />
//                 <TimelineConnector />
//               </TimelineSeparator>
//               <TimelineContent>
//                 <div>
//                   {moment(record.created_time).format('HH:mm')}
//                   <div>{record.category} - NT${record.amount} - {record.detail}</div>
//                   <EditButton onClick={() => openEditModal(record)}>修改</EditButton>
//                 </div>
//               </TimelineContent>
//             </TimelineItem>
//           ))}
//         </Timeline>
//         {isModalOpen && currentRecord && (
//           <EditModal
//             isOpen={isModalOpen}
//             onRequestClose={closeEditModal}
//             record={currentRecord}
//             onSave={saveRecord}
//           />
//         )}
//       </TimelineContainer>
//     );
//   };
  
//   export default AccountingTimeline;










// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import moment from 'moment';
// import ReactModal from 'react-modal';
// import EditModal from './EditModal';



// ReactModal.setAppElement('#root');

// const TimelineContainer = styled.div`
//   position: relative;
//   height: 100vh; // 容器高度設為視窗的高度
//   overflow-y: auto;
// `;

// const EditButton = styled.button`
//   margin-left: auto; // 自動將按鈕推到容器右邊
//   padding: 5px 10px;
// `;


// // const Dot = styled.div`
// //   width: 10px; // 圓點的直徑
// //   height: 10px;
// //   border-radius: 50%; // 圓形
// //   background-color: black; // 圓點顏色
// //   //position: absolute;
// //   left: -15px; // 根據需要調整位置
// //   top: 50%;
// //   transform: translateY(-50%);
// // `;

// // const VerticalLine = styled.div`
// //   position: absolute;
// //   left: -10px; // 線與圓點對齊，根據需要調整
// //   top: 0;
// //   width: 1px; // 線的寬度
// //   height: 100%;
// //   background-color: black; // 線的顏色
// // `;

// const Dot = styled.div`
//   width: 15px; // 圆点的直径
//   height: 15px;
//   border-radius: 50%; // 圆形
//   background-color: black; // 圆点颜色
//   margin-right : 10px;
// `;

// // const VerticalLineSegment = styled.div`
// //   position: absolute;
// //   left: 15px; // 與dot位置對齊
// //   width: 1px;
// //   background-color: black;
// //   z-index: -1; // 線段在背景
// // `;


// const Spacer = styled.div`
//   width: 15px; // Spacer寬度
// `;


// const TimelineEntry = styled.div`
//   display: flex;
//   align-items: center; // 確保時間標籤和記錄在同一行垂直居中對齊
//   position: absolute;
//   width: 100%; // 確保整個容器寬度
//   margin-left: 30px; 
// `;

// const TimeLabel = styled.div`
//   margin-right: 20px; // 時間標籤和記錄之間的間隔
// `;

// const Record = styled.div`
//   // 記錄的樣式
// `;


// const AccountingTimeline = ({ data, onRecordUpdate }) => {


//     const [minuteHeight, setMinuteHeight] = useState(0);

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [currentRecord, setCurrentRecord] = useState(null);


//     useEffect(() => {
//         // 設定每分鐘對應的高度
//         const totalMinutesInDay = 24 * 60; // 一天有 1440 分鐘
//         const screenHeight = window.innerHeight; // 螢幕可視高度
//         setMinuteHeight(screenHeight / totalMinutesInDay);
//     }, []);

//     // 打開編輯模式
//     const openEditModal = (record) => {
//         setCurrentRecord(record);
//         setIsModalOpen(true);
//     };

//     // 關閉編輯模式
//     const closeEditModal = () => {
//         setIsModalOpen(false);
//     };

//     // 保存編輯後紀錄
//     const saveRecord = (updatedRecord) => {
//         // API更新
//         onRecordUpdate(updatedRecord);
//         setIsModalOpen(false);
//     };


//     return (
//         <TimelineContainer>
//             {data.map((record, index) => {
//                 const minutesSinceStartOfDay = moment(record.created_time).diff(moment(record.created_time).startOf('day'), 'minutes');
//                 const marginTop = minutesSinceStartOfDay * minuteHeight;

//                 return (
//                     <TimelineEntry key={record.id} style={{ top: `${marginTop}px` }}>
//                         <Spacer />
//                         <Dot />
//                         <TimeLabel>{moment(record.created_time).format('HH:mm')}</TimeLabel>
//                         <Record>{record.category} - NT${record.amount} - {record.detail}</Record>
//                         <EditButton onClick={() => openEditModal(record)}>修改</EditButton>
//                     </TimelineEntry>
//                 );
//             })}
//             {isModalOpen && currentRecord && (
//                 <EditModal
//                     isOpen={isModalOpen}
//                     onRequestClose={closeEditModal}
//                     record={currentRecord}
//                     onSave={saveRecord}
//                 />
//             )}
//         </TimelineContainer>
//     );
// };

// export default AccountingTimeline;





