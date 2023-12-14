//import {saveStockByuserId} from '../models/StockOperation.js'


export async function saveStockList(req, res) {
    try {
        const userId = req.userId; 
        console.log('userId in saveStockList controller',userId )

        //const bankbookData =await getBankBookByuserId(userId)
        const transactionData = req.body;
        console.log('Received transaction data:', transactionData);

     
        // const savedTransaction = await saveStockByuserId(userId, transactionData);

        // 假设保存操作成功
        res.status(200).json({ message: 'Transaction received successfully' });
    // if (bankbookData ) {
    //     res.status(200).json(bankbookData);
    // } else {
    //     res.status(404).json({ message: 'Accounting data not found' });
    // }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
