import { pool } from './util.js';



export async function getBankBookByuserId (userId) {
    try {
        console.log('userId in model', userId);

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
        await connection.beginTransaction(); // 開始事務

        // 檢查用戶的帳戶是否存在
        const selectQuery = 'SELECT * FROM user_accounts WHERE user_id = ? AND bank_code = ? AND type = "TWD"';
        const [account] = await connection.query(selectQuery, [userId, bankCode]);

        if (account.length === 0) {
            throw new Error('帳戶不存在');
        }

        // 計算新的餘額
        let newBalance;
        if (action === '存') {
            newBalance = account[0].total + amount;
        } else if (action === '領') {
            if (amount > account[0].total) {
                throw new Error('餘額不足');
            }
            newBalance = account[0].total - amount;
        }

        // 更新帳戶餘額
        const updateQuery = 'UPDATE user_accounts SET total = ? WHERE user_id = ? AND bank_code = ? AND type = "TWD"';
        await connection.query(updateQuery, [newBalance, userId, bankCode]);

        await connection.commit(); // 提交事務

        return {
            bankCode,
            userId,
            newBalance
        };
    } catch (error) {
        await connection.rollback(); // 出錯時回滾事務
        console.error('Error in saveBankBookByUserId:', error);
        throw error;
    } finally {
        connection.release(); // 釋放連接
    }
};


export async function saveBankBookByuserId (userId) {
    try {
        console.log('userId in model', userId);

        const selectQuery = `
            
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