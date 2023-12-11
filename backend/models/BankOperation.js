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