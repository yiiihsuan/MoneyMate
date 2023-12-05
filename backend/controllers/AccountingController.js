import {getAccountingById} from '../models/AccountOperation.js'


export async function getAccounting(req, res) {
    try {
        const userId = req.userId; 
        console.log('userId in getAccountingBYID controller',userId )

        const accountingData = await getAccountingById(userId);
        console.log('accountingData:',accountingData);

        if (accountingData) {
            res.status(200).json(accountingData);
        } else {
            res.status(404).json({ message: 'Accounting data not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}