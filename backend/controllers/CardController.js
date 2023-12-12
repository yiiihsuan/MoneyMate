
import {getCardBillByuserId,getCardTotalRewardByuserId} from '../models/CardOperation.js'


export async function getCardBillList(req, res) {
    try {
        const userId = req.userId; 
        console.log('userId in getCardBillList controller', userId);

        const cardBillList = await getCardBillByuserId(userId);
        console.log('card bill list of user:', cardBillList);

        const rewardTotalData = await getCardTotalRewardByuserId(userId);
        console.log('rewardTotalData of user:', rewardTotalData);
        console.log('rewardTotalData of user total:', rewardTotalData.total_amount);
        console.log('rewardTotalData of user reward:', rewardTotalData.total_reward);


        if (cardBillList && rewardTotalData) {
            const responseData = {
                data: {
                    list: cardBillList,
                    total: rewardTotalData.total_amount,  
                    reward: rewardTotalData.total_reward  
                }
            };
            console.log('reseponse dat is :',responseData );
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