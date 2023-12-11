import { pool } from './util.js';



export async function getBankBookByuserId (userId) {
    try {
        console.log('userId in model', userId);

        const selectQuery = `
            SELECT b.bank_name, a.type, SUM(a.total) as total_amount
            FROM account a
            JOIN bank b ON a.bank_id = b.id
            WHERE a.user_id = ?
            GROUP BY b.bank_name, a.type`;

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