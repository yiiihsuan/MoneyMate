import { saveStockByuserId } from '../models/StockOperation.js'


export async function saveStockList(req, res) {
    try {
        const userId = req.userId;
        const transactionData = req.body;
        const savedTransaction = await saveStockByuserId(userId, transactionData);

        if (savedTransaction) {
            res.status(200).json({ message: 'Transaction received successfully' });
        } else {
            res.status(404).json({ message: 'Accounting data not found' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
