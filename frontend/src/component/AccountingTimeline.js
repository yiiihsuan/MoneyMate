import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineContent, TimelineConnector,TimelineOppositeContent } from '@mui/lab';
import { FaUtensils, FaCar, FaTshirt, FaHome, FaGamepad, FaQuestionCircle } from 'react-icons/fa'; 



const TimelineContainer = styled.div`
  height: auto;
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

const AccountingTimeline = ({ data }) => {


  return (
    <TimelineContainer>
      <StyledTimeline align="alternate">
        { data.sort((a, b) => new Date(a.created_time) - new Date(b.created_time))
          .map((record) => (
            <TimelineItem key={record.id}>
              <TimelineOppositeContent>
              <OppContentContainer > 
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
              
              </ContentContainer>
            </TimelineContent>
          </TimelineItem>
        ))}
      </StyledTimeline>
 


    </TimelineContainer>
  );
  
};

export default AccountingTimeline;

