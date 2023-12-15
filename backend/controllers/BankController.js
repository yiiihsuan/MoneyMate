
import {getBankBookByuserId,saveBankBookByUserId} from '../models/BankOperation.js'


export async function getBankbookList(req, res) {
    try {
        const userId = req.userId; 
        console.log('userId in getBankbookList controller',userId )
        const bankbookData =await getBankBookByuserId(userId)
  
    if (bankbookData ) {
        res.status(200).json(bankbookData);
    } else {
        res.status(404).json({ message: 'Accounting data not found' });
    }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


//for messaging API

// const dataToSend = {
//     action: data.action,
//     amount: amount,
//     operation: operation,
//     userId: userId
// };

// 1,U18d0d1340edcc1a781971b7905bd99fd,1,200,TWD

//根據銀行簡稱找哪一間銀行？ 預設 TWD, 

function translateBankAbbreviation(abbreviation) {
    const bankAbbreviations = {
        '郵局': '700',
        '台銀': '004',
        '玉山': '808',
        '第一': '007',
        '合庫': '006',
        '台新': '812',
        '富邦': '012',
    };

    return bankAbbreviations[abbreviation] || null;
}



//export async function saverecordAccountBank(req, res) {


const saverecordAccountBank = async (data) => {
    const { action, amount, operation,userId} = data; 
    console.log('準備執行存領程序');
    console.log('action:', action);
    console.log('amount:', amount);
    console.log('operation:', operation);
    console.log('我是誰:', userId);
  
    
    try {
        // const userId = req.userId; 
        // console.log('userId in getBankbookList controller',userId )

        const bankCode = translateBankAbbreviation(operation);

        // 根據操作執行存款或取款
        const result = await saveBankBookByUserId (action, amount, bankCode, userId);

        // 返回成功響應
        // res.json({ success: true, data: result });

       // const bankbookData =await getBankBookByuserId(userId)
       console.log('save bank book result:',result)
  
       
       return result;
       //return newRecord; // 返回新增紀錄的資料
     } catch (error) {
       console.error('紀錄到資料庫時出錯:', error);
       throw error; 
     }
   };
   

export { saverecordAccountBank};
