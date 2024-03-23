
import { getCardBillByuserId, getCardTotalByuserId, getRewardByuserId, saveCardBillintodb } from '../models/CardOperation.js'


export async function getCardBillList(req, res) {
    try {
        const userId = req.userId;
        const cardBillList = await getCardBillByuserId(userId);
        const TotalData = await getCardTotalByuserId(userId);
        const RewardData = await getRewardByuserId(userId);

        if (cardBillList && TotalData[0] && RewardData[0]) {
            const responseData = {
                data: {
                    list: cardBillList,
                    total: Number(TotalData[0].total_amount),
                    reward: RewardData[0].total_expected_reward
                }
            };
            res.status(200).json(responseData);
        } else {
            res.status(404).json({ message: 'Accounting data not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }

}


function getCardIdFromType(creditCardType) {
    const cardTypeToIdMapping = {
        '玉山Ubear卡': 1,
        '台新gogo卡': 2,
        '郵政visa': 3
    };

    return cardTypeToIdMapping[creditCardType] || null;
}


export async function saveCardBillByUserId(req, res) {
    try {
        const userId = req.userId;
        const { creditCardType, year, month, price, isPaid } = req.body;
        const cardId = getCardIdFromType(creditCardType);
        await saveCardBillintodb(userId, cardId, price, isPaid);
        res.status(200).json({ message: 'Card bill saved successfully' });
    } catch (error) {
        console.error('Error in saveCardBillByUserId:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

