import { pool } from './util.js';

export async function saveAccount(data) {

    console.log('data', data)
    console.log('data.tag = ', data.tag)
    console.log('data.amount = ', data.amount)
    try {
        const query = `
        INSERT INTO accounting_book (amount, tag)
        VALUES (?, ?)
    `;

    const result = await pool.query(query, [data.amount, data.tag]);

    if (result.affectedRows === 1) {
        return {
            id: result.insertId,
            price: data.amount,
            category: data.category,
            tag: data.tag,
            detail: data.detail,
            created_time: new Date() // 可能需要根據您的需求修改
        };
    } else {
        throw new Error('Failed to insert data into accounting_book table.');
    }


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
    } catch (error) {
        throw error;
    }
}
