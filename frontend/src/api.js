import moment from 'moment';
const host = process.env.REACT_APP_HOST
const BASE_URL = `https://${host}/api/1.0`;

export const fetchAccountingData= async () => {
    const response = await fetch(`${BASE_URL}/account/list`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };


  export const fetchAccountingDataForToday = async () => {
    //const today = moment(new Date()).format('YYYY-MM-DD')
    const today = '2023-12-11'
    const response = await fetch(`${BASE_URL}/account/list?date=${today}`);
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };


  //fetchUserAccountData -> 給userId
  export const fetchUserAccountData = async () => {
    const response = await fetch(`${BASE_URL}/bankbook/list`);
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };



  //fetchUserCardData




  //fetchUserStockData
  