
import {getCardBillByuserId,getCardTotalByuserId,getRewardByuserId } from '../models/CardOperation.js'


export async function getCardBillList(req, res) {
    try {
        const userId = req.userId; 
        console.log('userId in getCardBillList controller', userId);

        const cardBillList = await getCardBillByuserId(userId);
        console.log('card bill list of user:', cardBillList);

        const TotalData = await getCardTotalByuserId(userId);
        console.log('CardTotalData of user:', TotalData);
    

        const RewardData = await getRewardByuserId(userId);
        console.log('CardReward of user:',RewardData);


        if (cardBillList && TotalData[0] && RewardData[0]) {
            const responseData = {
                data: {
                    list: cardBillList,
                    total: Number(TotalData[0].total_amount), 
                     reward: RewardData[0].total_expected_reward 
                }
            };
            console.log('reseponse data is :',responseData );
            res.status(200).json(responseData);
        } else {
            res.status(404).json({ message: 'Accounting data not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


// export async function getCardBillList(req, res) {
//     try {
//         const userId = req.userId; 
//         console.log('userId in getCardBillList controller',userId )
//         const getCardBillData =await getCardBillByuserId(userId)


//         const getRewardTotalData = await getCardTotalRewardByuserId(userId);
  
//     if (getCardBillData && getRewardTotalData ) {
//         res.status(200).json(getCardBillData );
//     } else {
//         res.status(404).json({ message: 'Accounting data not found' });
//     }

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }