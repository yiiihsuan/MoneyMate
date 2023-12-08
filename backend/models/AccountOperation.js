import { pool } from './util.js';

export async function saveAccount(data) {

    console.log('data', data)
    console.log('data.tag = ', data.tag)
    console.log('data.amount = ', data.amount)
    console.log('data.user = ', data.userId)

    try {
        const insertQuery = `
        INSERT INTO accountingbook (userId, amount, tag)
        VALUES (?,?, ?)
        `;

        const [insertResult] = await pool.query(insertQuery, [data.userId, data.amount, data.tag]);

        console.log('Insert result', insertResult);

        if (insertResult.affectedRows === 1) {
            const insertedId = insertResult.insertId;
            
    
            const selectQuery = `
            SELECT id, userId, amount, category, tag, detail, created_time
            FROM accountingbook
            WHERE id = ?
            `;

            const [selectResult] = await pool.query(selectQuery, [insertedId]);

            if (selectResult.length === 1) {
                console.log('selectResult[0]',selectResult[0]);
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


export async function getAccountingById (userId) {
    try {
        console.log('userId in model', userId);

        const selectQuery = `
            SELECT id, amount, category, tag, detail, created_time
            FROM accountingbook
            WHERE userId = ? ;
        `;

        const [selectResult] = await pool.query(selectQuery, [userId]);

        console.log(selectResult);

        if (selectResult.length > 0) {
            console.log('get accounting', selectResult);
            return selectResult;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};


export async function updateAccountingById (id, userId, amount, category, tag, detail, created_time) {
    try {
        console.log('accounting id in model', id);

        const updateQuery = `
        UPDATE accountingbook
        SET amount = ?, category = ?, tag = ?, detail = ?, created_time = ?
        WHERE id = ? AND userId = ?;
    `;

        const [updateResult] = await pool.query(updateQuery, [amount, category, tag, detail, created_time,id,userId]);

        console.log('result in model',updateResult);

        if (updateResult.affectedRows > 0 ) {
            console.log('finish');
            return updateResult;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};


export async function deleteAccountingById (id, userId) {
    try {
        console.log('accounting id in del model', id);

        const deleteQuery = `
        DELETE FROM accountingbook
        WHERE id = ? AND userId = ?;
    `;
    
        const [deleteResult] = await pool.query(deleteQuery, [id,userId]);

        console.log('result in delete model',deleteResult);

        if (deleteResult.affectedRows > 0 ) {
            console.log('finish');
            return deleteResult;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};

   //     const query = `
    //     INSERT INTO accountingbook (amount, tag)
    //     VALUES (?, ?)
    // `;

    // const [result] = await pool.query(query, [data.amount, data.tag]);

    // console.log('result',result);
   

    // console.log('affect rows',result.affectedRows);

    // if (result.affectedRows === 1) {



      
    //     return {
    //         id: result.insertId,
    //         amount: data.amount,
    //         category: data.category,
    //         tag: data.tag,
    //         detail: data.detail,
    //         created_time: new Date() // 可能需要根據您的需求修改
    //     };
    // } else {
    //     throw new Error('Failed to insert data into accountingbook table.');
    // }


    //     const query = `
    //     SELECT *
    //     FROM product
    //     WHERE id = ?;
    //     `;

        // const dataToSend = {
        //     tag: tag,
        //     amount: amount
        // };

        // try {
        //     await recordAccount(dataToSend);

        // const [productDetails] = await pool.query(query, [productId]);

        // if (productDetails.length === 0) {
        //     return null; // Return null if the product is not found
        // }

        // return productDetails[0];
        //return;

