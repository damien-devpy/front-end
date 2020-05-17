import React from 'react';
import { Table } from 'react-bootstrap';
import { ParticipantItemForm } from '../../Participants/components/ParticipantItemForm';
import styled from 'styled-components';
import { COLORS } from '../../../vars';

const ParticipantsTable = ({
  workshopParticipants,
  entityParticipants,
  selectedParticipantId,
  handleSelect,
  t,
}) => {
  const ParticipantItemBadge = ({
    id,
    firstName,
    hearts,
    selected,
  }) => {
    console.log("Select button", selected)
    
    return <StyledItem
        name={id}
        value={id}
        className="m-1 pl-3 pr-3 p-1 btn-block rounded-pill"
        selected={selected}
        onClick={(e) => {handleSelect(id)}}>
        {firstName}<span className="float-right">{hearts} &#x2764;</span>
        </StyledItem>           
  }

  return (
    <div>
        {workshopParticipants &&
          entityParticipants &&
          workshopParticipants.map((participantId) => {
            const { email, firstName, lastName } = entityParticipants[
              participantId
            ];
            return (
              <ParticipantItemBadge 
                id={participantId}
                firstName={firstName}
                hearts={5}
                selected={selectedParticipantId === participantId}                
              />
            );
          })}
    </div>
  );
};

const StyledItem = styled.div`
cursor: pointer;
color: white;
//   border: ${props => props.selected ? '3pt solid palegreen' : '3pt solid white' };
background: ${props => props.selected ? COLORS.PRIMARY : COLORS.GRAY.STANDARD};
`;


export default ParticipantsTable;
