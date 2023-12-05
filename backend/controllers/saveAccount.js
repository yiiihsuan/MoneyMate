// RecordAccount.js
import axios from 'axios';
import {saveAccount} from '../models/AccountOperation.js'

const recordAccount = async (data) => {
  const { tag, amount } = data; 
  console.log('準備執行記帳程序');
  console.log('項目:', tag);
  console.log('金額:', amount);
  console.log('data',data);
  
  try {
    console.log('is a test')
    // 創建新的資料紀錄
    //  const newRecord = await Accounting.create({
    //   tag,
    //   amount
    // });
     //await saveAccount(data)
    // 如果需要發送確認到外部API
    // const response = await axios.post('API端點', newRecord, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     // 添加任何其他需要的header
    //   }
    // });
    const newRecord = await saveAccount(data); // 儲存模型返回的值

    // 如果需要發送確認到外部API
    // const response = await axios.post('API端點', newRecord, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     // 添加任何其他需要的header
    //   }
    // });

    console.log('紀錄成功:', newRecord); // 在這裡印出模型返回的值
    return newRecord;
    //return newRecord; // 返回新增紀錄的資料
  } catch (error) {
    console.error('紀錄到資料庫時出錯:', error);
    throw error; 
  }
};

export { recordAccount };