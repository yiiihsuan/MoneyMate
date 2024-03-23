import {saveStockByuserId} from '../models/StockOperation.js'


export async function saveStockList(req, res) {
    try {
        const userId = req.userId; 
        console.log('userId in saveStockList controller',userId )

        //const bankbookData =await getBankBookByuserId(userId)
        const transactionData = req.body;
        console.log('Received transaction data:', transactionData);


        // Received transaction data: {
        //     broker: '7',  //富邦
        //     stockCode: '0050',
        //     action: 'buy',
        //     quantity: '100',
        //     price: '133',
        //     commission: 18.9525,
        //     transactionTax: 0
        //   }
          
     
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
