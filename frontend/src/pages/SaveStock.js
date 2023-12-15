

import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';


const FormWrapper = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  max-width:100vh;
  margin: auto;
  width: 100vw;       
  height: 100vh;            
  overflow: auto;  
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledLabel = styled.label`
  margin-bottom: 5px;
  font-size: 1.1rem;
`;

const StyledSelect = styled.select`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1.1rem;
`;

const StyledInput = styled.input`
  padding: 8px;
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

const CommissionDisplay = styled.span`
  font-size: 1.1rem;
  padding: 5px;
`;
const CommissionText = styled.p`
  font-size: 1.1rem; /* Adjust the font size as needed */
  margin-top: 5px; /* Adds space above the commission text */
`;

// The React functional component
const SaveStock = () => {
    const [broker, setBroker] = useState('');
    const [stockCode, setStockCode] = useState('');
    const [action, setAction] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState(''); // State for the stock price
    const [commission, setCommission] = useState(0);
    const [transactionTax, setTransactionTax] = useState(0); // State for the transaction tax

  
    const calculateCommission = (qty, prc, act) => {
        let basicCommission = 0;
        let tax = 0;
  
        if (act === 'buy' || act === 'sell') {

          const commissionRate = 0.001425;

          basicCommission = qty * prc * commissionRate;
  
          if (act === 'sell') {
            const taxRate = 0.003;
            tax = qty * prc * taxRate;
          }
        } else if (act === 'dividend') {
          basicCommission = 10; // Flat rate for dividends
        }
  
        setCommission(basicCommission);
        setTransactionTax(tax);
      };
  
    const handleQuantityChange = (e) => {
      const qtyValue = e.target.value;
      setQuantity(qtyValue);
      calculateCommission(qtyValue, price, action);
    };
  
    const handlePriceChange = (e) => {
      const prcValue = e.target.value;
      setPrice(prcValue);
      calculateCommission(quantity, prcValue, action);
    };
  
    const handleActionChange = (newAction) => {
      setAction(newAction);
      calculateCommission(quantity, price, newAction);
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const transactionData = {
            broker: broker,
            stockCode: stockCode,
            action: action,
            quantity: quantity,
            price: price,
            commission: commission,
            transactionTax: transactionTax,
          };

          console.log('transactionData',transactionData );
        //change to save stock API
       // await axios.delete(`/api/1.0/account/delete/${id}`);

      
      //  const response = await fetch('http://localhost:3000/save-stock-transaction', {
        
      try {
        const response = await axios.post('/api/1.0/stock/save', transactionData);
      
        console.log('Transaction saved', response.data);

             alert('紀錄成功！');

             setBroker('');
             setStockCode('');
             setAction('');
             setQuantity('');
             setPrice('');
             setCommission(0);
             setTransactionTax(0);
         } catch (error) {
             console.error('Error:', error.response ? error.response.data : error);
             alert('提交失敗');
         }
  

    };
  
  return (
    <FormWrapper>
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel>
          證券商:
          <StyledSelect value={broker} onChange={(e) => setBroker(e.target.value)}>
            <option value="">選擇證券商</option>
            <option value="7">富邦銀行</option>
          </StyledSelect>
        </StyledLabel>

        <CommissionText>手續費率：0.001425</CommissionText>


        <StyledLabel>
          股票代號:
          <StyledInput type="text" value={stockCode} onChange={(e) => setStockCode(e.target.value)} />
        </StyledLabel>

        <StyledLabel>
          操作:
          <RadioGroup>
            <label>
              <StyledInput type="radio" name="action" value="buy" checked={action === 'buy'} onChange={() => handleActionChange('buy')} /> 買
            </label>
            <label>
              <StyledInput type="radio" name="action" value="sell" checked={action === 'sell'} onChange={() => handleActionChange('sell')} /> 賣
            </label>
            <label>
              <StyledInput type="radio" name="action" value="dividend" checked={action === 'dividend'} onChange={() => handleActionChange('dividend')} /> 股利
            </label>
          </RadioGroup>
        </StyledLabel>


        <StyledLabel>
          股數:
          <StyledInput type="number" value={quantity} onChange={handleQuantityChange} />
        </StyledLabel>

        <StyledLabel>
          股價:
          <StyledInput type="number" value={price} onChange={handlePriceChange} />
        </StyledLabel>

        <StyledLabel>
          手續費: <CommissionDisplay>{commission.toFixed(2)}</CommissionDisplay>
        </StyledLabel>

        {action === 'sell' && (
          <StyledLabel>
            證交稅: <CommissionDisplay>{transactionTax.toFixed(2)}</CommissionDisplay>
          </StyledLabel>
        )}
        <SubmitButton type="submit">送出</SubmitButton>
      </StyledForm>
    </FormWrapper>
  );
};

export default SaveStock;







// import React, { useState } from 'react';
// import styled from 'styled-components';


// const FormWrapper = styled.div`
//   background-color: #f5f5f5;
//   padding: 20px;
//   border-radius: 10px;
//   max-width: 400px;
//   margin: auto;
// `;

// const StyledForm = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
// `;

// const StyledLabel = styled.label`
//   margin-bottom: 5px;
//   font-size: 1.1rem;
// `;

// const StyledSelect = styled.select`
//   padding: 8px;
//   border-radius: 5px;
//   border: 1px solid #ccc;
//   font-size: 1.1rem;
// `;

// const StyledInput = styled.input`
//   padding: 8px;
//   border-radius: 5px;
//   border: 1px solid #ccc;
//   font-size: 1.1rem;
// `;

// const RadioGroup = styled.div`
//   display: flex;
//   gap: 10px;
//   font-size: 1.1rem;
// `;

// const SubmitButton = styled.button`
//   padding: 12px 20px;
//   border-radius: 5px;
//   border: none;
//   background-color: #000;
//   color: white;
//   cursor: pointer;
//   font-size: 1.1rem;
// `;

// const CommissionDisplay = styled.span`
//   font-size: 1.1rem;
//   padding: 5px;
// `;
// const CommissionText = styled.p`
//   font-size: 1.1rem; /* Adjust the font size as needed */
//   margin-top: 5px; /* Adds space above the commission text */
// `;

// // The React functional component
// const SaveStock = () => {
//     const [broker, setBroker] = useState('');
//     const [stockCode, setStockCode] = useState('');
//     const [action, setAction] = useState('');
//     const [quantity, setQuantity] = useState('');
//     const [price, setPrice] = useState(''); // State for the stock price
//     const [commission, setCommission] = useState(0);
    
  
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       // 計算手續費和處理提交邏輯
//       console.log({ broker, stockCode, action, quantity, price, commission }); // Log the stock price as well
//     };
  
//     const handleQuantityChange = (e) => {
//       const quantityValue = e.target.value;
//       setQuantity(quantityValue);
//       // Assuming the price is fixed and provided in the price state,
//       // you would update the commission calculation accordingly
//       setCommission(quantityValue * price * 0.004);
//     };
  
//     const handlePriceChange = (e) => {
//       setPrice(e.target.value);
//       // Update the commission based on the new price and existing quantity
//       setCommission(quantity * e.target.value * 0.004);
//     };

//   return (
//     <FormWrapper>
//       <StyledForm onSubmit={handleSubmit}>
//         <StyledLabel>
//           證券商:
//           <StyledSelect value={broker} onChange={(e) => setBroker(e.target.value)}>
//           <option value="broker1">富邦銀行</option>
//           </StyledSelect>
//         </StyledLabel>

//         <CommissionText>手續費率：0.001425</CommissionText>
        

//         <StyledLabel>
//           股票代號:
//           <StyledInput type="text" value={stockCode} onChange={(e) => setStockCode(e.target.value)} />
//         </StyledLabel>

//         <StyledLabel>
//           操作:
//           <RadioGroup>
//             <label>
//               <StyledInput type="radio" name="action" value="buy" checked={action === 'buy'} onChange={() => setAction('buy')} /> 買
//             </label>
//             <label>
//               <StyledInput type="radio" name="action" value="sell" checked={action === 'sell'} onChange={() => setAction('sell')} /> 賣
//             </label>
//             <label>
//               <StyledInput type="radio" name="action" value="dividend" checked={action === 'dividend'} onChange={() => setAction('dividend')} /> 股利
//             </label>
//           </RadioGroup>
//         </StyledLabel>

//         <StyledLabel>
//           股數:
//           <StyledInput type="number" value={quantity} onChange={handleQuantityChange} />
//         </StyledLabel>

//         <StyledLabel>
//           股價:
//           <StyledInput type="number" value={price} onChange={handlePriceChange} />
//         </StyledLabel>

//         <StyledLabel>
//           手續費: <CommissionDisplay>{commission.toFixed(2)}</CommissionDisplay>
//         </StyledLabel>

//         <SubmitButton type="submit">送出</SubmitButton>
//       </StyledForm>
//     </FormWrapper>
//   );
// };

// export default SaveStock;






// import React, { useState } from 'react';

// const SaveStock = () => {
//   const [broker, setBroker] = useState('');
//   const [stockCode, setStockCode] = useState('');
//   const [action, setAction] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [commission, setCommission] = useState(0);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // 計算手續費和處理提交邏輯
//     console.log({ broker, stockCode, action, quantity, commission });
//   };

//   const handleQuantityChange = (e) => {
//     setQuantity(e.target.value);
//     // 更新手續費，這裡假設每股價格是一個固定值，例如10
//     setCommission(e.target.value * 10 * 0.004);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label>
//           證券商:
//           <select value={broker} onChange={(e) => setBroker(e.target.value)}>
//             {/* 在這裡添加證券商選項 */}
//             <option value="broker1">證券商1</option>
//             <option value="broker2">證券商2</option>
//           </select>
//         </label>
//         <br />
//         <label>
//           股票代號:
//           <input type="text" value={stockCode} onChange={(e) => setStockCode(e.target.value)} />
//         </label>
//         <br />
//         <label>
//           操作:
//           <div>
//             <input type="radio" value="buy" checked={action === 'buy'} onChange={() => setAction('buy')} /> 買
//             <input type="radio" value="sell" checked={action === 'sell'} onChange={() => setAction('sell')} /> 賣
//             <input type="radio" value="dividend" checked={action === 'dividend'} onChange={() => setAction('dividend')} /> 股利
//           </div>
//         </label>
//         <br />
//         <label>
//           股數:
//           <input type="number" value={quantity} onChange={handleQuantityChange} />
//         </label>
//         <br />
//         <label>
//           手續費: {commission.toFixed(2)}
//         </label>
//         <br />
//         <button type="submit">送出</button>
//       </form>
//     </div>
//   );
// };

// export default SaveStock;
