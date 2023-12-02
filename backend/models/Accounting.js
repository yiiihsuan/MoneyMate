import { pool } from './util.js';

export async function recordAccount(productId) {
    try {
        const query = `
        SELECT *
        FROM product
        WHERE id = ?;
        `;

        const [productDetails] = await pool.query(query, [productId]);

        if (productDetails.length === 0) {
            return null; // Return null if the product is not found
        }

        return productDetails[0];
    } catch (error) {
        throw error;
    }
}
