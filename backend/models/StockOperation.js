import { pool } from './util.js';

// CREATE TABLE stocklist (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     bank_id INT NOT NULL,
//     stock_code VARCHAR(10) NOT NULL,
//     action ENUM('買', '賣', '股利') NOT NULL,
//     quantity INT NOT NULL,
//     price DECIMAL(10, 2) NOT NULL,
//     commission DECIMAL(10, 2) NOT NULL,
//     transaction_tax DECIMAL(10, 2) DEFAULT 0,
//     transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (bank_id) REFERENCES bank(id),
//     FOREIGN KEY (stock_code) REFERENCES stocks(stock_code) 
// );
// transaction data: {
//     broker: '7',
//     stockCode: '0050',
//     action: 'buy',
//     quantity: '100',
//     price: '133',
//     commission: 18.9525,
//     transactionTax: 0
//   }

export async function saveStockByuserId(userId, transactionData) {

        console.log('userId in model', userId);
        const bankId = transactionData.broker; // bank id 
        const stockCode = transactionData.stockCode; 
        const action = transactionData.action === 'buy' ? '買' : (transactionData.action === 'sell' ? '賣' : '股利');
        const quantity = parseInt(transactionData.quantity);
        const price = parseFloat(transactionData.price);
        const commission = parseFloat(transactionData.commission);
        const transactionTax = parseFloat(transactionData.transactionTax);


        const insertQuery = `
        INSERT INTO stocklist 
    (user_id,bank_id, stock_code, action, quantity, price, commission, transaction_tax) 
    VALUES (?,?, ?, ?, ?, ?, ?, ?)
            
        `;

        try {
            const [insertResult] = await pool.query(insertQuery, [
                userId, bankId, stockCode, action, quantity, price, commission, transactionTax
            ]);
        
            console.log('Insert result:', insertResult);
                return insertResult;
   
        } catch (error) {
            console.error('Error executing insert query:', error);
        }
    }


