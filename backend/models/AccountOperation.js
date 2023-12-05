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
        console.log('userId in model', userId)
        const formattedUserId = `'${userId}'`;
        console.log('formatted userId in model',formattedUserId)
        const selectQuery = `
            SELECT id, userId, amount, category, tag, detail, created_time
            FROM accountingbook
            WHERE userId = 'U18d0d1340edcc1a781971b7905bd99fd' ;
        `;

        const [selectResult] = await pool.query(selectQuery, [formattedUserId]);

        console.log(selectResult);
        console.log(selectResult[0]);

        if (selectResult.length > 0) {
            console.log('get accounting', selectResult[0]);
            return selectResult[0];
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

