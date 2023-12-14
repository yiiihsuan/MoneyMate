import { pool } from './util.js';

// CREATE TABLE stocklist (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     bank_id INT NOT NULL,
//     stock_id INT NOT NULL,
//     action ENUM('買', '賣', '股利') NOT NULL,
//     quantity INT NOT NULL,
//     price DECIMAL(10, 2) NOT NULL,
//     commission DECIMAL(10, 2) NOT NULL,
//     transaction_tax DECIMAL(10, 2) DEFAULT 0,
//     transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (bank_id) REFERENCES bank(id),
//     FOREIGN KEY (stock_id) REFERENCES stock(id)
// );

export async function saveStockByuserId (userId, transactionData) {
    try {
        console.log('userId in model', userId);

        const insertQuery = `
            
        `;

        const [insertResult] = await pool.query(insertQuery, [userId, transactionData]);

        console.log(insertResult);

        if (insertResult.length > 0) {
            console.log('save stock list', insertResult);
            return insertResult;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};