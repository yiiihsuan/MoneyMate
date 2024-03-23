
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { fetchUserCardData } from '../api';
import CardPieChart from '../component/BankBookPieChart';

const Example = () => {
  const { data: cardData, isLoading: isUserCardLoading, isError: isUserCardError } = useQuery({
    queryKey: ['userCardData'],
    queryFn: fetchUserCardData
  });


  if (isUserCardLoading) {
    return <div>Loading...</div>;
  }


  if (isUserCardError) {
    return <div>Error loading data</div>;
  }

  return (
    <div>
      <h3>總帳單金額: {cardData.data.total}元</h3>
      <h3>總回饋金額: {cardData.data.reward.toFixed(2)}元</h3>
      <h3>清單: {JSON.stringify(cardData.data.list)}</h3> {/* 修改為JSON字符串 */}
      <CardPieChart data={cardData.data} />
    </div>
  );
};

export default Example;
