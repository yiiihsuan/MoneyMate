
import {getBankBookByuserId,saveBankBookByuserId} from '../models/BankOperation.js'


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


export async function saverecordAccountBank(req, res) {
    try {
        const userId = req.userId; 
        console.log('userId in getBankbookList controller',userId )
        const { action, amount, operation} = req.body;
        console.log('action:',req.body.action)
        // 轉換銀行縮寫到銀行代碼
        const bankCode = translateBankAbbreviation(operation);

        // 根據操作執行存款或取款
        const result = await saveBankBookByuserId (action, amount, bankCode, userId);

        // 返回成功響應
        // res.json({ success: true, data: result });

       // const bankbookData =await getBankBookByuserId(userId)
       console.log('save bank book result:',result)
  
    if (result ) {
        res.status(200).json(result);
    } else {
        res.status(404).json({ message: 'Accounting data not found' });
    }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
