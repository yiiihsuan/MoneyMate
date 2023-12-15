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
  const [creditCardType, setCreditCardType] = useState('');
  const [year, setYear] = useState('');
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

        {/* ... your other form fields, wrapped in StyledLabel and using StyledSelect or StyledInput */}

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



// import React, { useState } from 'react';

// const SaveCardBill = () => {
//   const [creditCardType, setCreditCardType] = useState('');
//   const [year, setYear] = useState('');
//   const [month, setMonth] = useState('');
//   const [price, setPrice] = useState('');
//   const [isPaid, setIsPaid] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // 處理提交邏輯
//     console.log({ creditCardType, year, month, price, isPaid });
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>


//         <label>
//           選擇信用卡別:
//           <select value={creditCardType} onChange={(e) => setCreditCardType(e.target.value)}>
//             <option value="ubear">玉山Ubear卡</option>
//             <option value="gogo">台新gogo卡</option>
//             <option value="postal">郵政visa</option>
//           </select>
//         </label>


//         <br />

//         <label>
        //   選擇年份:
        //   <select value={year} onChange={(e) => setYear(e.target.value)}>
        //     {/* 添加年份選項 */}
        //     <option value="2023">2023</option>
        //     <option value="2024">2024</option>
        //   </select>
        // </label>


        // <br />
        // <label>
        //   選擇月份:
        //   <select value={month} onChange={(e) => setMonth(e.target.value)}>
        //     {/* 添加月份選項 */}
        //     <option value="1">1</option>
        //     <option value="2">2</option>
        //     {/* 繼續添加其他月份 */}
        //   </select>
        // </label>


//         <br />


        // <label>
        //   輸入價格:
        //   <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        // </label>
        // <br />
        // <label>



//           是否已繳費:
//           <div>
//             <input type="radio" value="yes" checked={isPaid === 'yes'} onChange={() => setIsPaid('yes')} /> 是
//             <input type="radio" value="no" checked={isPaid === 'no'} onChange={() => setIsPaid('no')} /> 否
//           </div>
//         </label>
//         <br />
//         <button type="submit">提交</button>
//       </form>
//     </div>
//   );
// };

// export default SaveCardBill;
