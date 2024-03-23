
import { getBankBookByuserId, saveBankBookByUserId } from '../models/BankOperation.js'


export async function getBankbookList(req, res) {
    try {
        const userId = req.userId;
        const bankbookData = await getBankBookByuserId(userId)

        if (bankbookData) {
            res.status(200).json(bankbookData);
        } else {
            res.status(404).json({ message: 'Accounting data not found' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

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

const saverecordAccountBank = async (data) => {
    const { action, amount, operation, userId } = data;

    try {
        const bankCode = translateBankAbbreviation(operation);
        const result = await saveBankBookByUserId(userId, action, amount, bankCode);
        return result;

    } catch (error) {
        console.error('紀錄到資料庫時出錯:', error);
        throw error;
    }
};

export { saverecordAccountBank };
