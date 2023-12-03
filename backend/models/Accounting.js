import { pool } from './util.js';

export async function saveAccount(dataToSend) {

    console.log('data', dataToSend)
    console.log('data.tag = ', dataToSend.tag)
    console.log('data.amount = ', dataToSend.amount)
    try {
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
        return;
    } catch (error) {
        throw error;
    }
}
