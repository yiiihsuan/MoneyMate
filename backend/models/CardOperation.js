
import { pool } from './util.js';

export async function getCardBillByuserId (userId) {
    try {
        console.log('userId in model', userId);

        const selectQuery = `
        SELECT c.card_name, cb.amount, cb.is_paid
        FROM cardbill cb
        JOIN card c ON cb.card_id = c.id
        WHERE cb.user_id = ? ;

                    
        `;

        const [selectResult] = await pool.query(selectQuery, [userId]);

        console.log(selectResult);

        if (selectResult.length > 0) {
            console.log('get cardbilllist', selectResult);
            return selectResult;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};






export async function getCardTotalByuserId (userId) {
    try {
        console.log('userId in model', userId);

        const selectQuery = `
        SELECT SUM(cb.amount) AS total_amount
        FROM cardbill cb
        WHERE cb.user_id = ?;
        
        `;

        const [selectResult] = await pool.query(selectQuery, [userId]);

        console.log(selectResult);

        if (selectResult.length > 0) {
            console.log('get total', selectResult);
            return selectResult;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};

export async function getRewardByuserId (userId) {
    try {
        console.log('userId in model', userId);

        const selectQuery = `
        SELECT
            SUM(cb.amount * c.ratio) AS total_expected_reward
        FROM
            cardbill cb
        JOIN
            card c ON cb.card_id = c.id
        WHERE
            cb.user_id = ? ;
        
        `;

        const [selectResult] = await pool.query(selectQuery, [userId]);

        console.log(selectResult);

        if (selectResult.length > 0) {
            console.log('get reward', selectResult);
            return selectResult;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};