import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';


const FormWrapper = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  margin: auto;
  max-width: auto;      
  max-height: 100vh;          
  overflow: auto;  
  height: 100vh;  
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
  font-size: 1.1rem; 
  margin-top: 5px; 
`;

const SaveStock = () => {
  const [broker, setBroker] = useState('');
  const [stockCode, setStockCode] = useState('');
  const [action, setAction] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [commission, setCommission] = useState(0);
  const [transactionTax, setTransactionTax] = useState(0);

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
      basicCommission = 10;
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

