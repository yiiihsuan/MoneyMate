import crypto from 'crypto';
import dotenv from 'dotenv';
import axios from 'axios';
import querystring from 'querystring';
import { recordAccount } from './saveAccount.js';
import moment from 'moment-timezone';




dotenv.config();

const handleTextMessage = async (event) => {
    const userId = event.source.userId;
    const replyToken = event.replyToken;
    const userMessage = event.message.text;

//if 存錢  userMessage.match(/^存\s+(\S+)\s+(\d+)$/);

const userProfile = await axios.get(`https://api.line.me/v2/bot/profile/${userId}`, {
        headers: {
            'Authorization': `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`,
        },
    });

    const userName = userProfile.data.displayName;
    const userPictureUrl = userProfile.data.pictureUrl;

    console.log('userName',userName);
    console.log('userPictureUrl',userPictureUrl);

    const match = userMessage.match(/^(\d+)(?:\s+(\S+))?$/);


    const matchSavingOrWithdrawal = userMessage.match(/^(存|領)\s+(\d+)\s+(\S+)$/);


    if (match) {
        const amount = parseInt(match[1], 10);
        const tag = match[2] || null ;
        

        const confirmMessage = {
            "type": "template",
            "altText": `您是否要記一筆${amount}元，項目：${tag}？`,
            "template": {
                "type": "confirm",
                "text": `您是否要記一筆${amount}元，項目：${tag}？`,
                "actions": [
                    {
                      "type": "postback",
                      "label": "是",
                      "data": `action=save&amount=${amount}&tag=${tag}`
                    },
                    {
                      "type": "message",
                      "label": "否",
                      "text": "取消記帳"
                    }
                ]
            }
        };

        console.log('now user in handleTextMessage is:',userId )

        try {
            await axios.post('https://api.line.me/v2/bot/message/reply', {
                replyToken: replyToken,
                messages: [confirmMessage]
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`
                }
            });
        } catch (error) {
            console.error('發送確認卡片消息時出錯:', error);
        }
    } else {
        // 其他消息處理...

        if (matchSavingOrWithdrawal) {
            const action = matchSavingOrWithdrawal[1]; // '存' 或 '領'
            const amount = parseInt(matchSavingOrWithdrawal[2], 10);
            const operation = matchSavingOrWithdrawal[3]; // 如 '郵局'
    
            const confirmMessage = {
                // 構建確認消息，根據存款或取款操作
                "type": "template",
                "altText": `您是否要${action} ${amount}元，在${operation}？`,
                "template": {
                    "type": "confirm",
                    "text": `您是否要${action} ${amount}元，在${operation}？`,
                    "actions": [
                        // 構建按鈕和動作
                    ]
                }
            };
    }


};

const handlePostback = async (event) => {
    const userId = event.source.userId;
    const replyToken = event.replyToken;
    const URL = process.env.URL
    const data = querystring.parse(event.postback.data);

    console.log('userid in handlepostback', userId);

    if (data.action === 'save') {
        const tag = data.tag;
        const amount = parseInt(data.amount, 10);

        const userProfile = await axios.get(`https://api.line.me/v2/bot/profile/${userId}`, {
            headers: {
                'Authorization': `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`,
            },
        });

        // 提取用户的名字
        const userName = userProfile.data.displayName;
        console.log('userName in handlePostback', userName)


        const dataToSend = {
            tag: tag,
            amount: amount,
            userId: userId
        };

        try {
            // await recordAccount(dataToSend);
            // console.log('記帳操作成功');
            const record = await recordAccount(dataToSend);
            console.log('記帳操作成功，記錄：', record);

            let createdTime = moment(record.created_time).tz('Asia/Taipei');
            let formattedTime = createdTime.format('YYYY-MM-DD HH:mm:ss');


            // let createdTime = new Date(record.created_time).tz('Asia/Taipei');
            // let formattedTime = createdTime.toISOString().replace('T', ' ').substring(0, 19);
            console.log('created time while save original',createdTime );
            console.log('time while save',formattedTime );


            const confirmMessage = {
                type: 'text',
                text: `Hi, ${userName}\n記帳成功：\n${record.amount}元\n分類：${record.category}\n項目：${record.tag}\n詳細：${record.detail}\n時間：${formattedTime}`
            };


            try {  
            // 發送確認消息
            await axios.post('https://api.line.me/v2/bot/message/reply', {
                replyToken: replyToken,
                messages: [confirmMessage]
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`
                }
            });

            } catch (error) {
                console.error(error);
            }
        } catch (error) { 
            console.error('記帳操作失敗:', error);
        }
    }
  };


const handleWebhook = (req, res) => {

    const channelSecret = process.env.CHANNEL_SECRET; // 確保在 .env 文件中設置了 CHANNEL_SECRET
    const signature = req.headers['x-line-signature'];

    console.log('Channel Secret:', channelSecret); // 調試輸出

if (!channelSecret) {
    throw new Error('Channel secret is undefined');
}

    // 生成簽名以進行驗證
    const hash = crypto.createHmac('sha256', channelSecret)
                       .update(JSON.stringify(req.body))
                       .digest('base64');

    // 驗證簽名
    if (signature !== hash) {
        console.log('authorization failed')
        return res.status(401).send('Invalid signature');
    }

    req.body.events.forEach(event => {
        console.log('check type')
        if (event.type === 'message' && event.message.type === 'text') {
            handleTextMessage(event);
        }
        else if (event.type === 'postback') {
            handlePostback(event);
          }
        // 處理其他事件類型...
    });
   
    res.status(200).send('OK');
};

export { handleWebhook };

// const handleWebhook = (req, res) => {
//     const channelSecret = process.env.CHANNEL_SECRET;
//     const signature = req.headers['x-line-signature'];
//     const hash = crypto.createHmac('sha256', channelSecret)
//                        .update(JSON.stringify(req.body))
//                        .digest('base64');
//     if (signature !== hash) {
//         return res.status(401).send('Invalid signature');
//     }

//     req.body.events.forEach(event => {
//             switch (event.type) {
//                 case 'message':
//                     if (event.message.type === 'text') {
//                         handleTextMessage(event);
//                     } else if (event.message.type === 'image') {
//                         handleImageMessage(event);
//                     }
//                     // 其他消息類型...
//                     break;
//                 // 其他事件類型...
//             }
//         });

//     res.status(200).send('OK');
// };

// export { handleWebhook };


/*

const handleWebhook = (req, res) => {
    req.body.events.forEach(event => {
        switch (event.type) {
            case 'message':
                if (event.message.type === 'text') {
                    handleTextMessage(event);
                } else if (event.message.type === 'image') {
                    handleImageMessage(event);
                }
                // 其他消息類型...
                break;
            // 其他事件類型...
        }
    });

    res.status(200).send('OK');
};

const handleTextMessage = (event) => {
    // 處理文字消息
};

const handleImageMessage = (event) => {
    // 處理圖片消息
};
*/



   /*
    // 構造回應消息
    const replyMessage = {
        type: 'text',
        text: `您說了：${userMessage}`
    };

    // 發送消息
    try {
        await axios.post('https://api.line.me/v2/bot/message/reply', {
            replyToken: replyToken,
            messages: [replyMessage]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`
            }
        });
    } catch (error) {
        console.error(error);
    }
*/