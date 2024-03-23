
import { pool } from './util.js';

export async function getCardBillByuserId(userId) {
    try {
        const selectQuery = `
        SELECT c.card_name, cb.amount, cb.is_paid
        FROM cardbill cb
        JOIN card c ON cb.card_id = c.id
        WHERE cb.user_id = ? ;         
        `;

        const [selectResult] = await pool.query(selectQuery, [userId]);
        if (selectResult.length > 0) {
            return selectResult;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};






export async function getCardTotalByuserId(userId) {
    try {
        const selectQuery = `
        SELECT SUM(cb.amount) AS total_amount
        FROM cardbill cb
        WHERE cb.user_id = ?;
        
        `;

        const [selectResult] = await pool.query(selectQuery, [userId]);
        if (selectResult.length > 0) {
            return selectResult;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};

export async function getRewardByuserId(userId) {
    try {
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
        if (selectResult.length > 0) {
            return selectResult;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};


export async function saveCardBillintodb(userId, cardId, amount, isPaid) {
    try {
        const insertQuery = `
            INSERT INTO cardbill (user_id, card_id, amount, is_paid)
            VALUES (?, ?, ?, ?);
        `;

        const isPaidValue = isPaid ? 1 : 0;

        const [result] = await pool.query(insertQuery, [userId, cardId, amount, isPaidValue]);

        return result.insertId;
    } catch (error) {
        throw error;
    }
}