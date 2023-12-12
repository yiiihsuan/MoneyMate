


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

import { pool } from './util.js';

export async function getCardTotalRewardByuserId (userId) {
    try {
        console.log('userId in model', userId);

        const selectQuery = `
           SELECT
            user_id,
            SUM(expected_reward_per_card) AS total_reward,
            SUM(amount) AS total_amount
        FROM (
            SELECT
                cb.user_id,
                c.card_name,
                cb.amount,
                cb.is_paid,
                (cb.amount * c.ratio) AS expected_reward_per_card
            FROM
                cardbill cb
            JOIN
                card c ON cb.card_id = c.id
            WHERE
                cb.user_id = ?
        ) AS subquery
        GROUP BY
            user_id;

                    
        `;

        const [selectResult] = await pool.query(selectQuery, [userId]);

        console.log(selectResult);

        if (selectResult.length > 0) {
            console.log('get reward and total', selectResult);
            return selectResult;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};