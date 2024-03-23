import { pool } from './util.js';

export async function saveAccount(data) {
    try {
        const insertQuery = `
        INSERT INTO accountingbook (userId, amount, tag)
        VALUES (?,?, ?)
        `;

        const [insertResult] = await pool.query(insertQuery, [data.userId, data.amount, data.tag]);
        if (insertResult.affectedRows === 1) {
            const insertedId = insertResult.insertId;


            const selectQuery = `
            SELECT id, userId, amount, category, tag, detail, created_time
            FROM accountingbook
            WHERE id = ?
            `;

            const [selectResult] = await pool.query(selectQuery, [insertedId]);

            if (selectResult.length === 1) {
                return selectResult[0];
            } else {
                throw new Error('Failed to retrieve inserted data.');
            }
        } else {
            throw new Error('Failed to insert data into accountingbook table.');
        }
    } catch (error) {
        throw error;
    }
}


export async function getAccountingById(userId) {
    try {
        const selectQuery = `
            SELECT id, amount, category, tag, detail, created_time
            FROM accountingbook
            WHERE userId = ? ;
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

export async function getAccountingByUserIdAndDate(userId, date) {
    try {
        const selectQuery = `
            SELECT id, amount, category, tag, detail, created_time
            FROM accountingbook
            WHERE userId = ? AND DATE(created_time) = ?;
        `;

        const [selectResult] = await pool.query(selectQuery, [userId, date]);
        if (selectResult.length > 0) {
            return selectResult;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};



export async function updateAccountingById(id, userId, amount, category, tag, detail, created_time) {
    try {
        const updateQuery = `
        UPDATE accountingbook
        SET amount = ?, category = ?, tag = ?, detail = ?, created_time = ?
        WHERE id = ? AND userId = ?;
    `;

        const [updateResult] = await pool.query(updateQuery, [amount, category, tag, detail, created_time, id, userId]);
        if (updateResult.affectedRows > 0) {
            return updateResult;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};


export async function deleteAccountingById(id, userId) {
    try {
        const deleteQuery = `
        DELETE FROM accountingbook
        WHERE id = ? AND userId = ?;
    `;

        const [deleteResult] = await pool.query(deleteQuery, [id, userId]);
        if (deleteResult.affectedRows > 0) {
            return deleteResult;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};
