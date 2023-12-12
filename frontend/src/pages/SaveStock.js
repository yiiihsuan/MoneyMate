import React, { useState } from 'react';

const SaveStock = () => {
  const [broker, setBroker] = useState('');
  const [stockCode, setStockCode] = useState('');
  const [action, setAction] = useState('');
  const [quantity, setQuantity] = useState('');
  const [commission, setCommission] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 計算手續費和處理提交邏輯
    console.log({ broker, stockCode, action, quantity, commission });
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
    // 更新手續費，這裡假設每股價格是一個固定值，例如10
    setCommission(e.target.value * 10 * 0.004);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          證券商:
          <select value={broker} onChange={(e) => setBroker(e.target.value)}>
            {/* 在這裡添加證券商選項 */}
            <option value="broker1">證券商1</option>
            <option value="broker2">證券商2</option>
          </select>
        </label>
        <br />
        <label>
          股票代號:
          <input type="text" value={stockCode} onChange={(e) => setStockCode(e.target.value)} />
        </label>
        <br />
        <label>
          操作:
          <div>
            <input type="radio" value="buy" checked={action === 'buy'} onChange={() => setAction('buy')} /> 買
            <input type="radio" value="sell" checked={action === 'sell'} onChange={() => setAction('sell')} /> 賣
            <input type="radio" value="dividend" checked={action === 'dividend'} onChange={() => setAction('dividend')} /> 股利
          </div>
        </label>
        <br />
        <label>
          股數:
          <input type="number" value={quantity} onChange={handleQuantityChange} />
        </label>
        <br />
        <label>
          手續費: {commission.toFixed(2)}
        </label>
        <br />
        <button type="submit">送出</button>
      </form>
    </div>
  );
};

export default SaveStock;
