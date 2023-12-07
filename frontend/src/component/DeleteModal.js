import React from 'react';
import ReactModal from 'react-modal';
import moment from 'moment';

ReactModal.setAppElement('#root'); // 放在應用程式的最外層組件


const DeleteModal = ({ isOpen, onRequestClose, record, onDelete }) => {
    return (
        <ReactModal isOpen={isOpen} onRequestClose={onRequestClose}>
           
            <div>
                <p>確定要刪除以下紀錄嗎？</p>
                <p>金額: NT${record.amount}</p>
                <p>分類: {record.category}</p>
                <p>項目: {record.tag}</p>
                <p>詳細: {record.detail}</p>
                <p>建立時間: {moment(record.created_time).format('HH:mm')}</p>       
            </div>
            <button onClick={() => onDelete(record.id)}>確認刪除</button>
            <button onClick={onRequestClose}>取消</button>
        </ReactModal>
    );
};


export default DeleteModal;