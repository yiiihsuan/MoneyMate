import { pool } from './util.js';



export async function getBankBookByuserId(userId) {
    try {
        const selectQuery = `
            SELECT b.bank_code, b.bank_name, a.total, a.type
            FROM account a
            JOIN bank b ON a.bank_id = b.id
            WHERE a.user_id = ? ;
        `;

        const [selectResult] = await pool.query(selectQuery, [userId]);

        console.log(selectResult);

        if (selectResult.length > 0) {
            console.log('get bankbooklist', selectResult);
            return selectResult;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};


export async function saveBankBookByUserId(userId, action, amount, bankCode) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const bankIdQuery = 'SELECT id FROM bank WHERE bank_code = ?';
        const [bank] = await connection.query(bankIdQuery, [bankCode]);
        if (bank.length === 0) {
            throw new Error('銀行not found');
        }
        const bankId = bank[0].id;


        const selectQuery = 'SELECT * FROM account WHERE user_id = ? AND bank_id = ? AND type = "TWD"';
        const [account] = await connection.query(selectQuery, [userId, bankId]);

        if (account.length === 0) {
            throw new Error('帳戶不存在');
        }

        let newBalance;
        if (action === '存') {
            newBalance = account[0].total + amount;
        } else if (action === '領') {
            if (amount > account[0].total) {
                throw new Error('餘額不足');
            }
            newBalance = account[0].total - amount;
        }

        const updateQuery = 'UPDATE account SET total = ? WHERE user_id = ? AND bank_id = ? AND type = "TWD"';
        await connection.query(updateQuery, [newBalance, userId, bankId]);

        await connection.commit();

        return {
            bankCode,
            userId,
            newBalance
        };
    } catch (error) {
        await connection.rollback();
        console.error('Error in saveBankBookByUserId:', error);
        throw error;
    } finally {
        connection.release();
    }
};

