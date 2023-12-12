import React, { useState } from 'react';

const SaveCardBill = () => {
  const [creditCardType, setCreditCardType] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [price, setPrice] = useState('');
  const [isPaid, setIsPaid] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 處理提交邏輯
    console.log({ creditCardType, year, month, price, isPaid });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          選擇信用卡別:
          <select value={creditCardType} onChange={(e) => setCreditCardType(e.target.value)}>
            <option value="ubear">玉山Ubear卡</option>
            <option value="gogo">台新gogo卡</option>
            <option value="postal">郵政visa</option>
          </select>
        </label>
        <br />
        <label>
          選擇年份:
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            {/* 添加年份選項 */}
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </label>
        <br />
        <label>
          選擇月份:
          <select value={month} onChange={(e) => setMonth(e.target.value)}>
            {/* 添加月份選項 */}
            <option value="1">1</option>
            <option value="2">2</option>
            {/* 繼續添加其他月份 */}
          </select>
        </label>
        <br />
        <label>
          輸入價格:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <br />
        <label>
          是否已繳費:
          <div>
            <input type="radio" value="yes" checked={isPaid === 'yes'} onChange={() => setIsPaid('yes')} /> 是
            <input type="radio" value="no" checked={isPaid === 'no'} onChange={() => setIsPaid('no')} /> 否
          </div>
        </label>
        <br />
        <button type="submit">提交</button>
      </form>
    </div>
  );
};

export default SaveCardBill;
