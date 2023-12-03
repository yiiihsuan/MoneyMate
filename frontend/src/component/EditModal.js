import React, { useState } from 'react';
import ReactModal from 'react-modal';
import axios from 'axios';

ReactModal.setAppElement('#root'); // 通常你會將這行放在你的應用程式的最外層組件

const EditModal = ({ isOpen, onRequestClose, record, onSave }) => {
  const [formData, setFormData] = useState(record || {});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // 調用 API 更新函數
    try {
      const response = await axios.put(`/api/records/${formData.id}`, formData);
      onSave(response.data);
      onRequestClose(); // 關閉模態
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
      <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="price">金額：</label>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="category">類別：</label>
                    <select
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
                    </select>
                </div>

                <div>
                    <label htmlFor="tag">項目：</label>
                    <input
                        id="tag"
                        name="tag"
                        type="text"
                        value={formData.tag}
                        onChange={handleChange}
                        placeholder="輸入項目"
                    />
                </div>

                <div>
                    <label htmlFor="hour">時間：</label>
                    <select
                        id="hour"
                        name="hour"
                        value={formData.hour}
                        onChange={handleChange}
                    >
                        {[...Array(24)].map((_, index) => {
                            const hour = index.toString().padStart(2, '0');
                            return <option key={hour} value={hour}>{hour}</option>;
                        })}
                    </select>
                    <label htmlFor="minute">：</label>
                    <select
                        id="minute"
                        name="minute"
                        value={formData.minute}
                        onChange={handleChange}
                    >
                        {[...Array(60)].map((_, index) => {
                            const minute = index.toString().padStart(2, '0');
                            return <option key={minute} value={minute}>{minute}</option>;
                        })}
                    </select>
                </div>

                <div>
                    <label htmlFor="detail">詳細：</label>
                    <input
                        id="detail"
                        name="detail"
                        type="text"
                        value={formData.detail}
                        onChange={handleChange}
                        placeholder="輸入詳細內容"
                    />
                </div>


                {/* 添加其餘的表單元素 */}
                <button type="submit">取消</button>
                <button type="submit">保存</button>
            </form>
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
  