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
                     console.log('userId in is authenticated', req.userId );
                     req.userId = response.data.sub;
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
