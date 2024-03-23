import axios from 'axios';
import 'dotenv/config';

async function isAuthenticated(req, res, next) {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            return res.status(401).send('Unauthorized');
        }

        const verifyResponse = await axios.get(`https://api.line.me/oauth2/v2.1/verify?access_token=${accessToken}`);
        const userData = verifyResponse.data;

        if (userData.client_id !== process.env.LINE_CLIENT_ID) {
            return res.status(401).send('Unauthorized');
        }

        const profileResponse = await axios.get('https://api.line.me/v2/profile', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const userProfile = profileResponse.data;
        const userId = userProfile.userId;
        req.userId = userId;
        console.log(`User ID: ${userId}`);
        console.log(`req user: ${req.userId}`);
        return next();
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Internal Server Error');
    }
}

export default isAuthenticated;


