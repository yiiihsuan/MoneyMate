
import {getBankBookByuserId} from '../models/BankOperation.js'


export async function getBankbookList(req, res) {
    try {
        const userId = req.userId; 
        console.log('userId in getBankbookList controller',userId )
        const bankbookData =await getBankBookByuserId(userId)
  
    if (accountingData) {
        res.status(200).json(bankbookData);
    } else {
        res.status(404).json({ message: 'Accounting data not found' });
    }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
