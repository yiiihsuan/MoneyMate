import {getAccountingById,getAccountingByUserIdAndDate,updateAccountingById,deleteAccountingById} from '../models/AccountOperation.js'


export async function getAccounting(req, res) {
    try {
        const userId = req.userId; 
        console.log('req date is:',req.query.date);
        console.log('userId in getAccountingBYID controller',userId )

        if(!req.query.date){
        const accountingData = await getAccountingById(userId);
        console.log('accountingData:',accountingData);

    }
    else{
        const date = req.query.date;
        console.log('query date is:',date);
        const accountingData =await getAccountingByUserIdAndDate(userId, date)
        
    }
    if (accountingData) {
        res.status(200).json(accountingData);
    } else {
        res.status(404).json({ message: 'Accounting data not found' });
    }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export async function updateAccounting(req, res) {
    try {
        //console.log("req.params:", req.params);
        const userId = req.userId; 
       // const id = req.params.id; 
        console.log('userId in updateAccountingBYID controller',userId );
        console.log('req.body is :', req.body);

        const { id, amount, category, tag, detail, created_time  } = req.body;

        // {
        //     id: 8,
        //     amount: 20,
        //     category: null,
        //     tag: 'null',
        //     detail: null,
        //     created_time: 2023-12-07T14:23:02.000Z
        //   }

        /*
        userId in updateAccountingBYID controller U18d0d1340edcc1a781971b7905bd99fd
        req.body is : {
        id: 1,
        amount: 210,
        category: null,
        tag: 'avc',
        detail: 'hell',
        created_time: '2023-12-07 21:04:00',
        hour: '21',
        minute: '04',
        price: '20'
        }
*/

        console.log('id:', id);
        console.log('amount:', amount);
        console.log('category:', category);
        console.log('tag:', tag);
        console.log('detail:', detail);
        console.log('updated created_time :', created_time);

        if (!id ) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        console.log('check if can go to controllers...');

        const updateData = await updateAccountingById(id, userId, amount, category, tag, detail, created_time);
        // console.log('accountingData:',accountingData);

        // if (accountingData) {
        //     res.status(200).json(accountingData);
        // } else {
        //     res.status(404).json({ message: 'Accounting data not found' });
        // }
        res.json({ message: 'Account updated successfully', data: updateData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//app.delete('/api/1.0/account/delete/:id', isAuthenticated, deleteAccounting)



export async function deleteAccounting(req, res) {
    try {
        const userId = req.userId; 
        const id = req.params.id; 
        console.log('userId in deleteAccountingBYID controller',userId );
        console.log('id is :', id);
       // console.log('req.body is :', req.body);

       // const { id, amount, category, tag, detail, created_time  } = req.body;


        /*
        userId in updateAccountingBYID controller U18d0d1340edcc1a781971b7905bd99fd
        req.body is : {
        id: 1,
        amount: 210,
        category: null,
        tag: 'avc',
        detail: 'hell',
        created_time: '2023-12-07 21:04:00',
        hour: '21',
        minute: '04',
        price: '20'
        }
*/

        console.log('id:', id);
        // console.log('amount:', amount);
        // console.log('category:', category);
        // console.log('tag:', tag);
        // console.log('detail:', detail);
        // console.log('created_time :', created_time);

        if (!id ) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        console.log('check if can go to delete controllers...');

        const deleteData = await deleteAccountingById(id,userId);
    
        res.json({ message: 'Account updated successfully', data: deleteData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}