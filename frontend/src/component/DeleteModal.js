import React from 'react';
import ReactModal from 'react-modal';
import moment from 'moment';
import styled from 'styled-components';

ReactModal.setAppElement('#root'); // 放在應用程式的最外層組件

const StyledModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 500px;
  margin: 0 auto;
`;

const StyledModalHeader = styled.h3`
  margin-top: 0;
`;

const StyledModalText = styled.p`
  line-height: 1.5;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;


const DeleteButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 20px; 
  background-color: #ff4444;
  color: #fff; 
  margin-right: 8px;
  cursor: pointer;

  &:hover {
    background-color: #cc0000;
  }
`;



const CancelButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 20px; 
  background-color:#ccc;
  color: #fff; 
  margin-right: 8px;
  cursor: pointer;

  &:hover {
    background-color: #bbb;
  }
`;


const DeleteModal = ({ isOpen, onRequestClose, record, onDelete }) => {
    return (
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: 'none', //去除默認邊匡
            padding: '20px', 
            width: '30%',
            height: 'auto', 
            overflow: 'visible', // 防止内容溢出時隱藏
          },
        }}
      >
        <StyledModalContent>
          <StyledModalHeader>確定要刪除以下紀錄嗎？</StyledModalHeader>
          <StyledModalText>金額: NT${record.amount}</StyledModalText>
          <StyledModalText>分類: {record.category}</StyledModalText>
          <StyledModalText>項目: {record.tag}</StyledModalText>
          <StyledModalText>詳細: {record.detail}</StyledModalText>
          <StyledModalText>建立時間: {moment(record.created_time).format('HH:mm')}</StyledModalText>
          <ButtonContainer>
            <CancelButton onClick={onRequestClose}>取消</CancelButton>
            <DeleteButton onClick={() => onDelete(record.id)}>確認刪除</DeleteButton>
          </ButtonContainer>
        </StyledModalContent>
      </ReactModal>
    );
  };
  
  export default DeleteModal;


// const DeleteModal = ({ isOpen, onRequestClose, record, onDelete }) => {
//     return (
//         <ReactModal isOpen={isOpen} onRequestClose={onRequestClose}>
           
//             <div>
//                 <p>確定要刪除以下紀錄嗎？</p>
//                 <p>金額: NT${record.amount}</p>
//                 <p>分類: {record.category}</p>
//                 <p>項目: {record.tag}</p>
//                 <p>詳細: {record.detail}</p>
//                 <p>建立時間: {moment(record.created_time).format('HH:mm')}</p>       
//             </div>
//             <button onClick={() => onDelete(record.id)}>確認刪除</button>
//             <button onClick={onRequestClose}>取消</button>
//         </ReactModal>
//     );
// };


//export default DeleteModal;