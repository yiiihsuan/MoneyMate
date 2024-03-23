import {saveAccount} from '../models/AccountOperation.js'

const recordAccount = async (data) => {
  const { tag, amount,userId } = data; 
  try {
    const newRecord = await saveAccount(data); 
    return newRecord;
  } catch (error) {
    console.error('紀錄到資料庫時出錯:', error);
    throw error; 
  }
};
export { recordAccount };