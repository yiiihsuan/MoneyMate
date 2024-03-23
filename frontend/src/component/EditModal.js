import React, { useState } from 'react';
import ReactModal from 'react-modal';
//import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';

ReactModal.setAppElement('#root'); // 應用程式的最外層組件



const StyledForm = styled.form`
  background-color: #fff; 
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
  width: 500px; 
  margin: 0 auto; 
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
`;


const StyledLabel = styled.label`
  margin-top: 20px;
  display: block; 
  font-weight: bold; 
`;


const StyledButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 20px; 
  background-color: #000; 
  color: #fff; 
  margin-right: 8px;
  cursor: pointer;

  &:hover {
    background-color: #555; 
    cursor: pointer;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
`;

const StyledTimeContainer = styled.div`
  display: flex;
  justify-content: space-between; 
  align-items: center;

  & > * {
    flex: 1;
    margin: 0 5px; 
  }
`;


const StyledTimeLabel = styled.span`
  flex: 0; 
  text-align: center;
  margin: 0 5px;
`;

const StyledFieldContainer = styled.div`
  margin-bottom: 20px; 
`;


const EditModal = ({ isOpen, onRequestClose, record, onSave }) => {

  const [formData, setFormData] = useState({
    id: record.id,
    amount: record?.amount || '',
    category: record?.category || '食',
    tag: record?.tag || '',
    detail: record?.detail || '',
    hour: record?.created_time ? moment(record.created_time).format('HH') : '00',
    minute: record?.created_time ? moment(record.created_time).format('mm') : '00'
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    const currentDate = new Date();
    const selectedDateTime = moment(`${currentDate.toISOString().split('T')[0]} ${formData.hour.padStart(2, '0')}:${formData.minute.padStart(2, '0')}:00`);
    const adjustedDateTime = selectedDateTime.subtract(8, 'hours').format('YYYY-MM-DD HH:mm:ss');
    console.log('Adjusted Date Time:', adjustedDateTime);

    const updatedFormData = {
      ...formData,
      created_time: adjustedDateTime
    };

    onSave(updatedFormData);
    onRequestClose();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Record"
      style={{
        overlay: {
          zIndex: 1000,
        },
        content: {
          //more format
        },
      }}
    >
      <StyledForm onSubmit={handleSubmit}>

        <StyledFieldContainer>
          <StyledLabel htmlFor="amount">金額：</StyledLabel>
          <StyledInput
            id="amount"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
          />
        </StyledFieldContainer>

        <StyledFieldContainer>
          <StyledLabel htmlFor="category">類別：</StyledLabel>
          <StyledSelect
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="食">食</option>
            <option value="衣">衣</option>
            <option value="住">住</option>
            <option value="行">行</option>
            <option value="育">育</option>
            <option value="樂">樂</option>
            <option value="其他">其他</option>
          </ StyledSelect>
        </StyledFieldContainer>

        <StyledFieldContainer>
          <StyledLabel htmlFor="tag">項目：</StyledLabel>
          <StyledInput
            id="tag"
            name="tag"
            type="text"
            value={formData.tag}
            onChange={handleChange}
            placeholder="輸入項目"
          />
        </StyledFieldContainer>

        <StyledFieldContainer>
          <StyledLabel htmlFor="time">時間：</StyledLabel>
          <StyledTimeContainer>
            <StyledSelect
              id="hour"
              name="hour"
              value={formData.hour}
              onChange={handleChange}
            >
              {[...Array(24)].map((_, index) => {
                const hour = index.toString().padStart(2, '0');
                return <option key={hour} value={hour}>{hour}</option>;
              })}
            </StyledSelect>
            <StyledTimeLabel>：</StyledTimeLabel>
            <StyledSelect
              id="minute"
              name="minute"
              value={formData.minute}
              onChange={handleChange}
            >
              {[...Array(60)].map((_, index) => {
                const minute = index.toString().padStart(2, '0');
                return <option key={minute} value={minute}>{minute}</option>;
              })}
            </StyledSelect>
          </StyledTimeContainer>
        </StyledFieldContainer>
        <StyledFieldContainer>
          <StyledLabel htmlFor="detail">詳細：</StyledLabel>
          <StyledInput
            id="detail"
            name="detail"
            type="text"
            value={formData.detail}
            onChange={handleChange}
            placeholder="輸入詳細內容"
          />
        </StyledFieldContainer>

        <ButtonContainer>
          <StyledButton type="button" onClick={onRequestClose}>取消</StyledButton>
          <StyledButton type="submit">保存</StyledButton>
        </ButtonContainer>

      </StyledForm>
    </ReactModal>
  );
};

export default EditModal;






