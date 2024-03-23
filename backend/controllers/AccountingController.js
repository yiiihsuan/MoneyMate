import { getAccountingById, getAccountingByUserIdAndDate, updateAccountingById, deleteAccountingById } from '../models/AccountOperation.js'


export async function getAccounting(req, res) {
    try {
        const userId = req.userId;

        if (!req.query.date) {
            const accountingData = await getAccountingById(userId);
            if (accountingData) {
                res.status(200).json(accountingData);
            } else {
                res.status(404).json({ message: 'Accounting data not found' });
            }

        }
        else {
            const date = req.query.date;
            const accountingData = await getAccountingByUserIdAndDate(userId, date)


            if (accountingData) {
                res.status(200).json(accountingData);
            } else {
                res.status(404).json({ message: 'Accounting data not found' });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export async function updateAccounting(req, res) {
    try {
        const userId = req.userId;
        const { id, amount, category, tag, detail, created_time } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const updateData = await updateAccountingById(id, userId, amount, category, tag, detail, created_time);
        res.json({ message: 'Account updated successfully', data: updateData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function deleteAccounting(req, res) {
    try {
        const userId = req.userId;
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const deleteData = await deleteAccountingById(id, userId);
        res.json({ message: 'Account updated successfully', data: deleteData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}