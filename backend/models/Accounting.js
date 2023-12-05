import { pool } from './util.js';

export async function saveAccount(data) {

    console.log('data', data)
    console.log('data.tag = ', data.tag)
    console.log('data.amount = ', data.amount)
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
