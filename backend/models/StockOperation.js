import { pool } from './util.js';

export async function saveStockByuserId(userId, transactionData) {
    const bankId = transactionData.broker;
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
        return insertResult;


    } catch (error) {
        console.error('Error executing insert query:', error);
    }
}


