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


export async function updateAccounting(req, res) {
    try {
        const userId = req.userId; 
        const id = req.params.id; 
        console.log('userId in updateAccountingBYID controller',userId );
        console.log('req.body is :', req.body);

        const { amount, category, tag, detail, created_time  } = req.body;

        console.log('id:', id);
        console.log('amount:', amount);
        console.log('category:', category);
        console.log('tag:', tag);
        console.log('detail:', detail);
        console.log('created_time :', created_time);

        if (!id || !amount || !category) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        console.log('check if can go to controllers...')

        // const updateData = await updateAccountingById(userId);
        // console.log('accountingData:',accountingData);

        // if (accountingData) {
        //     res.status(200).json(accountingData);
        // } else {
        //     res.status(404).json({ message: 'Accounting data not found' });
        // }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}