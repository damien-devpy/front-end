import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../vars';
import {
  getCostOfChosenActionCards,
  getNumberOfChosenActionCards,
} from '../../../selectors/workshopSelector';

const ParticipantsTable = ({
  round,
  participantsEntity,
  individualChoices,
  selectedParticipantId,
  actionCardsEntity,
  handleSelect,
  initBudgetPerParticipant,
}) => {
  const ParticipantItemBadge = ({
    id,
    firstName,
    lastName,
    numberOfSelectedActions,
    hearts,
    selected,
  }) => {
    return (
      <StyledItem
        name={id}
        value={id}
        className="pl-3 pr-3 p-1 btn-block rounded-pill"
        selected={selected}
        onClick={() => {
          handleSelect(id);
        }}
      >
        {firstName} {lastName.substring(0, 1)}.
        <span className="float-right">
          {numberOfSelectedActions} &#10003; {hearts} &#x2764;
        </span>
      </StyledItem>
    );
  };

  return (
    <div>
      {participantsEntity &&
        Object.keys(participantsEntity).map((participantId) => {
          // might make sense to simplify the component by taking the two functions outside
          const { firstName, lastName } = participantsEntity[participantId];
          const numberOfSelectedActions = getNumberOfChosenActionCards(
            individualChoices,
            round,
            participantId
          );
          const hearts =
            initBudgetPerParticipant[participantId] -
            getCostOfChosenActionCards(
              individualChoices,
              actionCardsEntity,
              round,
              participantId
            );
          return (
            <ParticipantItemBadge
              id={participantId}
              key={participantId}
              firstName={firstName}
              lastName={lastName}
              numberOfSelectedActions={numberOfSelectedActions}
              hearts={hearts}
              selected={selectedParticipantId === participantId}
            />
          );
        })}
    </div>
  );
};

const StyledItem = styled.div`
cursor: pointer;
margin: 15;
color:  ${(props) => (props.selected ? 'white' : 'black')};
font-size: ${(props) => (props.selected ? '1.1rem' : '1rem')};
font-weight: ${(props) => (props.selected ? 'bolder' : '')};
width: ${(props) => (props.selected ? '230px' : '210px')};
/* border: ${(props) =>
  props.selected ? '3pt solid palegreen' : '3pt solid white'}; */
background: ${(props) =>
  props.selected ? COLORS.PRIMARY : COLORS.GRAY.STANDARD};
`;

export default ParticipantsTable;
