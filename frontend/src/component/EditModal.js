import React, { useState } from 'react';
import ReactModal from 'react-modal';
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';

ReactModal.setAppElement('#root'); // 放在應用程式的最外層組件



const StyledForm = styled.form`
  background-color: #fff; 
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); // 陰影
  width: 500px; 
  margin: 0 auto; // 置中
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
`;


const StyledLabel = styled.label`
  margin-top: 20px;
  display: block; 
  font-weight: bold; 
`;


const StyledButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 20px; 
  background-color: #000; 
  color: #fff; 
  margin-right: 8px;
  cursor: pointer;

  &:hover {
    background-color: #555; 
    cursor: pointer;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
`;

const StyledTimeContainer = styled.div`
  display: flex;
  justify-content: space-between; 
  align-items: center;

  & > * {
    flex: 1;
    margin: 0 5px; 
  }
`;


const StyledTimeLabel = styled.span`
  flex: 0; // 防止冒号伸展
  text-align: center;
  margin: 0 5px;
`;

const StyledFieldContainer = styled.div`
  margin-bottom: 20px; 
`;


const EditModal = ({ isOpen, onRequestClose, record, onSave }) => {

    const [formData, setFormData] = useState({
        id: record.id,
        amount: record?.amount || '',
        category: record?.category || '食',
        tag: record?.tag || '',
        detail: record?.detail || '',
        hour: record?.created_time ? moment(record.created_time).format('HH') : '00',
        minute: record?.created_time ? moment(record.created_time).format('mm') : '00'
    });

    //const [formData, setFormData] = useState(record || {});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // const currentDate = new Date();
        // const dateString = currentDate.toISOString().split('T')[0]; //  YYYY-MM-DD 格式的日期
        // const timeString = `${formData.hour.padStart(2, '0')}:${formData.minute.padStart(2, '0')}:00`; 
        //const dateTime = `${dateString} ${timeString}`;

        //const dateTime = `${formData.date} ${formData.hour.padStart(2, '0')}:${formData.minute.padStart(2, '0')}:00`;
         //console.log('update in frontend date time:' , dateTime);
     

        const selectedDateTime = moment(`${formData.date} ${formData.hour.padStart(2, '0')}:${formData.minute.padStart(2, '0')}:00`);
        const adjustedDateTime = selectedDateTime.subtract(8, 'hours').format('YYYY-MM-DD HH:mm:ss');
        console.log('Adjusted Date Time:', adjustedDateTime);


       
        const updatedFormData = {
            ...formData,
            created_time: adjustedDateTime
        };

        try {
            const response = await axios.put(`/api/1.0/account/update/${formData.id}`, updatedFormData);
            onSave(response.data);
            onRequestClose();
        } catch (error) {
            console.error('更新失敗', error);
        }
    };

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Edit Record"
        >
            <StyledForm onSubmit={handleSubmit}>

                <StyledFieldContainer>
                    <StyledLabel htmlFor="amount">金額：</StyledLabel>
                    <StyledInput
                        id="amount"
                        name="amount"
                        type="number"
                        value={formData.amount}
                        onChange={handleChange}
                    />
                </StyledFieldContainer>

                <StyledFieldContainer>
                    <StyledLabel htmlFor="category">類別：</StyledLabel>
                    <StyledSelect
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="食">食</option>
                        <option value="衣">衣</option>
                        <option value="住">住</option>
                        <option value="行">行</option>
                        <option value="育">育</option>
                        <option value="樂">樂</option>
                        <option value="其他">其他</option>
                    </ StyledSelect>
                </StyledFieldContainer>

                <StyledFieldContainer>
                    <StyledLabel htmlFor="tag">項目：</StyledLabel>
                    <StyledInput
                        id="tag"
                        name="tag"
                        type="text"
                        value={formData.tag}
                        onChange={handleChange}
                        placeholder="輸入項目"
                    />
                </StyledFieldContainer>

                <StyledFieldContainer>
                    <StyledLabel htmlFor="time">時間：</StyledLabel>
                    <StyledTimeContainer>
                        <StyledSelect
                            id="hour"
                            name="hour"
                            value={formData.hour}
                            onChange={handleChange}
                        >
                            {[...Array(24)].map((_, index) => {
                                const hour = index.toString().padStart(2, '0');
                                return <option key={hour} value={hour}>{hour}</option>;
                            })}
                        </StyledSelect>
                        <StyledTimeLabel>：</StyledTimeLabel>
                        <StyledSelect
                            id="minute"
                            name="minute"
                            value={formData.minute}
                            onChange={handleChange}
                        >
                            {[...Array(60)].map((_, index) => {
                                const minute = index.toString().padStart(2, '0');
                                return <option key={minute} value={minute}>{minute}</option>;
                            })}
                        </StyledSelect>
                    </StyledTimeContainer>
                </StyledFieldContainer>
                <StyledFieldContainer>
                    <StyledLabel htmlFor="detail">詳細：</StyledLabel>
                    <StyledInput
                        id="detail"
                        name="detail"
                        type="text"
                        value={formData.detail}
                        onChange={handleChange}
                        placeholder="輸入詳細內容"
                    />
                </StyledFieldContainer>

                <ButtonContainer>
                    <StyledButton type="button" onClick={onRequestClose}>取消</StyledButton>
                    <StyledButton type="submit">保存</StyledButton>
                </ButtonContainer>

            </StyledForm>
        </ReactModal>
    );
};

export default EditModal;





// <div>
//   <label htmlFor="time">時間：</label>
//   <select
//     id="time"
//     name="time"
//     value={formData.time}
//     onChange={handleChange}
//   >
//     {[...Array(24)].map((_, index) => {
//       const hour = index.toString().padStart(2, '0');
//       return (
//         <option key={hour} value={`${hour}:00`}>{`${hour}:00`}</option>
//       );
//     })}
//   </select>
// </div>






// import React from 'react';
// import Modal from 'react-modal';

// Modal.setAppElement('#root'); // 在index.html中的root div上设置app元素

// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     width: '500px', 
//   },
// };

// const EditModal = ({ isOpen, onRequestClose, record, onSubmit }) => {
//   const [formData, setFormData] = React.useState(record);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = () => {
//     onSubmit(formData);
//     onRequestClose(); 
//   };

//   return (
//     <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
//       <h2>修改資料</h2>
//       <form>
//         <label>
//           金額
//           <input type="number" name="price" value={formData.price} onChange={handleChange} />
//         </label>
//         {/* 其他表单元素 */}
//         <label>
//           類別
//           <select name="category" value={formData.category} onChange={handleChange}>
//             <option value="食">食</option>
//             <option value="衣">衣</option>
//             <option value="住">住</option>
//             <option value="行">行</option>
//             <option value="育">育</option>
//             <option value="樂">樂</option>
//             {/* 其他選項 */}
//           </select>
//         </label>
//         <label>
//           時間
//           <select name="time" value={formData.time} onChange={handleChange}>
//             {/* 生成24小時的選項 */}
//             {[...Array(24).keys()].map((hour) => (
//               <option key={hour} value={hour}>
//                 {hour}:00
//               </option>
//             ))}
//           </select>
//         </label>
//         {/* ... */}
//         <button type="button" onClick={handleSubmit}>保存</button>
//         <button type="button" onClick={onRequestClose}>取消</button>
//       </form>
//     </Modal>
//   );
// };

// export default EditModal;














// const EditModal = ({ record, onSave }) => {
//    
//     const [formData, setFormData] = useState(record);
  
//     const handleInputChange = (event) => {
//       const { name, value } = event.target;
//       setFormData({ ...formData, [name]: value });
//     };
  
//     const handleSubmit = (event) => {
//       event.preventDefault();
//       onSave(formData);
//     };
  
//     return (
//       <form onSubmit={handleSubmit}>
//         {/* 输入字段 */}
//         {/* ... */}
//         <button type="submit">保存</button>
//       </form>
//     );
//   };
  