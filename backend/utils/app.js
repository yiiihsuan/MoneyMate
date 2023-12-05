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
//import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import axios from 'axios'; // 引入 axios
import { handleWebhook } from '../controllers/WebhookController.js';
import { recordAccount } from '../controllers/saveAccount.js';
import isAuthenticated from './Authentication.js';
import AccountingBook from '../controllers//AccountRecord.js';
import{getAccounting} from '../controllers/AccountingController.js';
import 'dotenv/config';

const app = express();
const apiVersion = process.env.API_VERSION;

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

       // 設置 HTTP-only Cookie
   res.cookie('accessToken', accessToken, {
    httpOnly: true,  // 使 Cookie 只能由伺服器訪問
    secure: true,    // 僅在 HTTPS 上傳送 Cookie
    sameSite: 'strict' // 限制第三方網站發送 Cookie
});

        console.log('reday to redirect')

        // 重定向用戶到新的 URL 或渲染頁面
        res.redirect('https://18.235.176.70/dashboard');
    } catch (error) {
        res.status(500).send("Error during LINE authentication");
    }
});

// 登出路由
app.get('/api/1.0/logout', (req, res) => {
    // 清除 accessToken Cookie
    res.cookie('accessToken', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        expires: new Date(0)  // 將過期時間設置為過去的時間
    });

    // 重定向用戶到登入頁面或首頁
    res.redirect('https://18.235.176.70/');
});


app.get('/api/1.0/account/list', isAuthenticated, getAccounting);



export { app };




