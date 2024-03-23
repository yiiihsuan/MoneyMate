import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const FormWrapper = styled.div`
  background-color: #f5f5f5; 
  padding: 20px;
  border-radius: 10px;
  max-width: auto;
  max-height: 100vh;
  margin: auto;          
  overflow: auto; 
  height: 100vh;   
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 1.1rem;
`;

const StyledLabel = styled.label`
  margin-bottom: 5px;
  font-size: 1.1rem;
`;

const StyledSelect = styled.select`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc; 
  font-size: 1.1rem;
`;

const StyledInput = styled.input`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc; 
  font-size: 1.1rem;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 10px;
  font-size: 1.1rem;
`;

const SubmitButton = styled.button`
padding: 12px 20px;
border-radius: 5px;
border: none;
background-color: #000;
color: white;
cursor: pointer;
font-size: 1.1rem;

`;


const SaveCardBill = () => {
  const [creditCardType, setCreditCardType] = useState('玉山Ubear卡');
  const [year, setYear] = useState('2023');
  const [month, setMonth] = useState('');
  const [price, setPrice] = useState('');
  const [isPaid, setIsPaid] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      creditCardType,
      year,
      month,
      price: parseFloat(price),
      isPaid: isPaid === 'yes'
    };

    console.log('Sending data:', formData);

    try {

      const response = await axios.post('/api/1.0/cardbill/save', formData);
      console.log('Response:', response.data);

      alert('紀錄成功！');

      setCreditCardType('');
      setYear('');
      setMonth('');
      setPrice('');
      setIsPaid('');

    } catch (error) {
      console.error('Error submitting form:', error);

    }

  };

  return (
    <FormWrapper>
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel>
          選擇信用卡別:
          <StyledSelect value={creditCardType} onChange={(e) => setCreditCardType(e.target.value)}>
            <option value="ubear">玉山Ubear卡</option>
            <option value="gogo">台新gogo卡</option>
            <option value="postal">郵政visa</option>
          </StyledSelect>
        </StyledLabel>

        <StyledLabel>
          選擇年份:
          <StyledSelect value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </StyledSelect>
        </StyledLabel>



        <StyledLabel>
          選擇月份:
          <StyledSelect value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </StyledSelect>
        </StyledLabel>

        <StyledLabel>
          輸入價格:
          <StyledInput type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </StyledLabel>


        <StyledLabel>
          是否已繳費:
          <RadioGroup>

            <StyledLabel>
              <StyledInput type="radio" value="yes" checked={isPaid === 'yes'} onChange={() => setIsPaid('yes')} /> 是
            </StyledLabel>
            <StyledLabel>
              <StyledInput type="radio" value="no" checked={isPaid === 'no'} onChange={() => setIsPaid('no')} /> 否
            </StyledLabel>
          </RadioGroup>
        </StyledLabel>

        <SubmitButton type="submit">提交</SubmitButton>
      </StyledForm>
    </FormWrapper>
  );
};

export default SaveCardBill;

