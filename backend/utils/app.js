import express from 'express';
//import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import axios from 'axios'; 
import { handleWebhook } from '../controllers/WebhookController.js';
import { recordAccount } from '../controllers/saveAccount.js';
import isAuthenticated from './Authentication.js';
import AccountingBook from '../controllers//AccountRecord.js';
import { getAccounting, updateAccounting, deleteAccounting } from '../controllers/AccountingController.js';
import { getBankbookList } from '../controllers/BankController.js';
import { getCardBillList } from '../controllers/CardController.js';
import { saveStockList } from '../controllers/StockController.js';
import { saveCardBillByUserId } from '../controllers/CardController.js';

import 'dotenv/config';

const app = express();
const apiVersion = process.env.API_VERSION;
const host = process.env.URL;

app.use(bodyParser.json());
app.use(cookieParser());
const secretKey = process.env.SECRET_KEY

// app.use(session({
//     secret: process.env.SECRET_KEY,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
// }));

app.post('/api/1.0/webhook', handleWebhook);
app.post('/api/1.0/account/save', recordAccount);

app.get('/api/1.0', async (req, res) => {
    const code = req.query.code;
    const state = req.query.state;


    if (state !== '12345') {
        return res.status(400).send('Invalid state parameter');
    }

    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', `https://${host}/api/${apiVersion}`);
    params.append('client_id', process.env.LINE_CLIENT_ID);
    params.append('client_secret', process.env.LINE_CLIENT_SECRET);

    try {
        const tokenResponse = await axios.post('https://api.line.me/oauth2/v2.1/token', params.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const accessToken = tokenResponse.data.access_token;


        const userProfileResponse = await axios.get('https://api.line.me/v2/profile', {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        console.log("User Profile:", userProfileResponse.data);


        res.cookie('accessToken', accessToken, {
            httpOnly: true,  // 使 Cookie 只能由伺服器訪問
            secure: true,    // 僅在 HTTPS 上傳送 Cookie
            sameSite: 'strict' // 限制第三方網站發送 Cookie
        });

        res.redirect(`https://${host}/dashboard`);
    } catch (error) {
        res.status(500).send("Error during LINE authentication");
    }
});


app.get('/api/1.0/logout', (req, res) => {
    // 清除 accessToken Cookie
    res.cookie('accessToken', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        expires: new Date(0)  // 將過期時間設置為過去的時間
    });
    res.redirect(`https://${host}/`);
});


app.get('/api/1.0/account/list', isAuthenticated, getAccounting);
app.put('/api/1.0/account/update/:id', isAuthenticated, updateAccounting)
app.delete('/api/1.0/account/delete/:id', isAuthenticated, deleteAccounting)
app.get('/api/1.0/bankbook/list', isAuthenticated, getBankbookList);
app.get('/api/1.0/cardbill/list', isAuthenticated, getCardBillList);
app.post('/api/1.0/stock/save', isAuthenticated, saveStockList);
app.post('/api/1.0/cardbill/save', isAuthenticated, saveCardBillByUserId);



export { app };




