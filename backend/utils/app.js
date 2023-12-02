// import express from 'express';
// import bodyParser from 'body-parser';
// import { handleWebhook } from '../controllers/WebhookController.js';
// import { recordAccount} from '../controllers/saveAccount.js';
// import 'dotenv/config';

// const app = express();
// const apiVersion = process.env.API_VERSION

// app.use(bodyParser.json());
// app.post('/api/1.0/webhook', handleWebhook);
// app.post('/api/1.0/account/save', recordAccount);

// export { app };


import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import axios from 'axios'; // 引入 axios
import { handleWebhook } from '../controllers/WebhookController.js';
import { recordAccount } from '../controllers/saveAccount.js';
import isAuthenticated from './Authentication.js';
import AccountingBook from '../controllers//AccountRecord.js';
import 'dotenv/config';

const app = express();
const apiVersion = process.env.API_VERSION;

app.use(bodyParser.json());

const secretKey = process.env.SECRET_KEY

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.post('/api/1.0/webhook', handleWebhook);
app.post('/api/1.0/account/save', recordAccount);

// 處理 LINE 登入重定向
app.get('/api/1.0', async (req, res) => {
    const code = req.query.code;
    const state = req.query.state;
    console.log(code)
    console.log(state)
    console.log('redirect to dashboard check')

    if (state !== '12345') {
        return res.status(400).send('Invalid state parameter');
    }


    console.log(process.env.LINE_CLIENT_ID)
    console.log(process.env.LINE_CLIENT_SECRET)

    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code); 
    params.append('redirect_uri', 'https://18.235.176.70/api/1.0');
    params.append('client_id', process.env.LINE_CLIENT_ID);
    params.append('client_secret', process.env.LINE_CLIENT_SECRET);

    console.log(`params: ${params}`)
    console.log(`params: ${params.toString()}`)
    
    try {
        const tokenResponse = await axios.post('https://api.line.me/oauth2/v2.1/token', params.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log('success');
    
        const accessToken = tokenResponse.data.access_token;

    console.log("Access Token:", accessToken);

    // 使用 Access Token 获取用户资料
    const userProfileResponse = await axios.get('https://api.line.me/v2/profile', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    });

    console.log("User Profile:", userProfileResponse.data);

        console.log('reday to redirect')

        // 重定向用戶到新的 URL 或渲染頁面
        res.redirect('https://18.235.176.70/dashboard');
    } catch (error) {
        res.status(500).send("Error during LINE authentication");
    }
});

app.get('/api/1.0/account/list', isAuthenticated, AccountingBook);

export { app };

