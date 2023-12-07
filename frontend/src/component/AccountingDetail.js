import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import ReactModal from 'react-modal';
import EditModal from './EditModal';


ReactModal.setAppElement('#root');

const TimelineContainer = styled.div`
  position: relative;
  height: 100vh; // 容器高度設為視窗的高度
  overflow-y: auto;
`;

const EditButton = styled.button`
  margin-left: auto; // 自動將按鈕推到容器右邊
  padding: 5px 10px;
`;


// const Dot = styled.div`
//   width: 10px; // 圓點的直徑
//   height: 10px;
//   border-radius: 50%; // 圓形
//   background-color: black; // 圓點顏色
//   //position: absolute;
//   left: -15px; // 根據需要調整位置
//   top: 50%;
//   transform: translateY(-50%);
// `;

// const VerticalLine = styled.div`
//   position: absolute;
//   left: -10px; // 線與圓點對齊，根據需要調整
//   top: 0;
//   width: 1px; // 線的寬度
//   height: 100%;
//   background-color: black; // 線的顏色
// `;

const Dot = styled.div`
  width: 15px; // 圆点的直径
  height: 15px;
  border-radius: 50%; // 圆形
  background-color: black; // 圆点颜色
  margin-right : 10px;
`;

// const VerticalLineSegment = styled.div`
//   position: absolute;
//   left: 15px; // 與dot位置對齊
//   width: 1px;
//   background-color: black;
//   z-index: -1; // 線段在背景
// `;


const Spacer = styled.div`
  width: 15px; // Spacer寬度
`;


const TimelineEntry = styled.div`
  display: flex;
  align-items: center; // 確保時間標籤和記錄在同一行垂直居中對齊
  position: absolute;
  width: 100%; // 確保整個容器寬度
  margin-left: 30px; 
`;

const TimeLabel = styled.div`
  margin-right: 20px; // 時間標籤和記錄之間的間隔
`;

const Record = styled.div`
  // 記錄的樣式
`;


const AccountingTimeline = ({ data, onRecordUpdate }) => {


    const [minuteHeight, setMinuteHeight] = useState(0);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);


    useEffect(() => {
        // 設定每分鐘對應的高度
        const totalMinutesInDay = 24 * 60; // 一天有 1440 分鐘
        const screenHeight = window.innerHeight; // 螢幕可視高度
        setMinuteHeight(screenHeight / totalMinutesInDay);
    }, []);

    // 打開編輯模式
    const openEditModal = (record) => {
        setCurrentRecord(record);
        setIsModalOpen(true);
    };

    // 關閉編輯模式
    const closeEditModal = () => {
        setIsModalOpen(false);
    };

    // 保存編輯後紀錄
    const saveRecord = (updatedRecord) => {
        // API更新
        onRecordUpdate(updatedRecord);
        setIsModalOpen(false);
    };


    return (
        <TimelineContainer>
            {data.map((record, index) => {
                const minutesSinceStartOfDay = moment(record.created_time).diff(moment(record.created_time).startOf('day'), 'minutes');
                const marginTop = minutesSinceStartOfDay * minuteHeight;

                return (
                    <TimelineEntry key={record.id} style={{ top: `${marginTop}px` }}>
                        <Spacer />
                        <Dot />
                        <TimeLabel>{moment(record.created_time).format('HH:mm')}</TimeLabel>
                        <Record>{record.category} - NT${record.amount} - {record.detail}</Record>
                        <EditButton onClick={() => openEditModal(record)}>修改</EditButton>
                    </TimelineEntry>
                );
            })}
            {isModalOpen && currentRecord && (
                <EditModal
                    isOpen={isModalOpen}
                    onRequestClose={closeEditModal}
                    record={currentRecord}
                    onSave={saveRecord}
                />
            )}
        </TimelineContainer>
    );
};

export default AccountingTimeline;





