import React from 'react';
import styled from 'styled-components';

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
        className="pl-2 pr-2 p-1 btn-block rounded-pill"
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
  color: ${(props) => (props.selected ? 'white' : 'black')};
  font-weight: ${(props) => (props.selected ? 'bolder' : '')};
  background: ${(props) =>
    props.selected ? 'var(--primary)' : 'var(--light)'};
`;

export default ParticipantsTable;
