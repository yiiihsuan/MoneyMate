import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import ReactModal from 'react-modal';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import axios from 'axios';
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineContent, TimelineConnector, TimelineOppositeContent } from '@mui/lab';
import { FaUtensils, FaCar, FaTshirt, FaHome, FaGamepad, FaQuestionCircle } from 'react-icons/fa';
import { useMutation, useQueryClient } from 'react-query';


ReactModal.setAppElement('#root');

const TimelineContainer = styled.div`
  height: 100vh;
  overflow-y: auto;
`;

const OppContentContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AmountText = styled.div`
  font-size: 1.2em;  
  font-weight: bold; 
`;

const EditButton = styled.button`
  margin-right: auto;
  padding: 5px 10px;
  border: none; 
  border-radius: 10px;
  //background-color: transparent; 

  &:hover {
    border: 1px solid #ccc; 
    cursor: pointer; 
  }
`;

const DeleteButton = styled.button`
  margin-left: auto;
  padding: 5px 10px;
  background-color: #f44336; 
  color: white; // 白色文字
  border-radius: 10px;
  border: none;

  &:hover {
    background-color: #d32f2f; 
    cursor: pointer; 
  }
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TimeTagDetail = styled.div`
  margin-left: 10px;
`;

const StyledTimeline = styled(Timeline)`
   margin-left: 0px;
`;


const chooseIcon = (category) => {
  switch (category) {
    case '食':
      return <FaUtensils />;
    case '行':
      return <FaCar />;
    case '衣':
      return <FaTshirt />;
    case '住':
      return <FaHome />;
    case '樂':
      return <FaGamepad />;
    default:
      return <FaQuestionCircle />;
  }
};

const AccountingTimeline = ({ data, onMutationSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


  const queryClient = useQueryClient();


  const invalidateQueries = () => {
    queryClient.invalidateQueries('accountData');
    queryClient.invalidateQueries('accountDataToday');
  };


  const updateMutation = useMutation(
    updatedRecord => axios.put(`/api/1.0/account/update/${updatedRecord.id}`, updatedRecord),
    {
      onSuccess: () => {
        setIsModalOpen(false);
        invalidateQueries();
      },
    }
  );

  const deleteMutation = useMutation(
    id => axios.delete(`/api/1.0/account/delete/${id}`),
    {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        invalidateQueries();

      },
    }
  );


  const openEditModal = (record) => {
    setCurrentRecord(record);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
  };


  const saveRecord = (updatedRecord) => {
    updateMutation.mutate(updatedRecord);
  };


  const openDeleteModal = (record) => {
    setCurrentRecord(record);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  return (
    <TimelineContainer>
      <StyledTimeline align="alternate">
        {data.sort((a, b) => new Date(a.created_time) - new Date(b.created_time))
          .map((record) => (
            <TimelineItem key={record.id}>
              <TimelineOppositeContent>
                <OppContentContainer >
                  <EditButton onClick={() => openEditModal(record)}>修改</EditButton>
                  <AmountText>NT${record.amount}</AmountText>
                </OppContentContainer>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot>{chooseIcon(record.category)}</TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <ContentContainer>
                  <TimeTagDetail>
                    <div>{moment(record.created_time).format('HH:mm')}</div>
                    <div>{record.tag}</div>
                    <div>{record.detail}</div>
                  </TimeTagDetail>
                  <DeleteButton onClick={() => openDeleteModal(record)}>刪除</DeleteButton>
                </ContentContainer>
              </TimelineContent>
            </TimelineItem>
          ))}
      </StyledTimeline>
      {isModalOpen && currentRecord && (
        <EditModal
          isOpen={isModalOpen}
          onRequestClose={closeEditModal}
          record={currentRecord}
          onSave={saveRecord}
        />
      )}

      {isDeleteModalOpen && currentRecord && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onRequestClose={closeDeleteModal}
          record={currentRecord}
          onDelete={handleDelete}
        />
      )}

    </TimelineContainer>
  );
};

export default AccountingTimeline;





