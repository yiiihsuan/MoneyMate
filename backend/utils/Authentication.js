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
        return res.status(500).send('Internal Server Error'); // 更详细的错误处理
    }
}

export default isAuthenticated;






/*
import axios from 'axios';
import 'dotenv/config';

function isAuthenticated(req, res, next) {
    console.log(req.cookies)
    const accessToken = req.cookies.accessToken;
    console.log('access token get:',accessToken)
    // console.log(req.session)
    // console.log(req.session.accessToken)

    if (req.cookies.accessToken) {
        axios.get(`https://api.line.me/oauth2/v2.1/verify?access_token=${req.cookies.accessToken}`)
            .then(response => {
                if (response.data.client_id === process.env.LINE_CLIENT_ID) {
                     
                     
                    console.log('response data',response.data);
                    return next();
                } else {
                    return res.status(401).send('Unauthorized');
                }
            })
            .catch(error => {
                return res.status(401).send('Unauthorized');
            });
    } else {
        return res.status(401).send('Unauthorized');
    }
}

export default isAuthenticated;
*/