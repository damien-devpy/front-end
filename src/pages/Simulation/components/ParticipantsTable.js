import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../vars';
import {
  getCostOfTakenActionCards,
  getNumberOfTakenActionCards,
} from '../../../selectors/workshopSelector';

const ParticipantsTable = ({
  round,
  workshopParticipants,
  participantsEntity,
  individualActionCards,
  selectedParticipantId,
  actionCardsEntity,
  handleSelect,
  initBudgetParParticipant,
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
        className="m-1 pl-3 pr-3 p-1 btn-block rounded-pill"
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
      {workshopParticipants &&
        participantsEntity &&
        workshopParticipants.map((participantId) => {
          const { firstName, lastName } = participantsEntity[participantId];
          const numberOfSelectedActions = getNumberOfTakenActionCards(
            individualActionCards,
            round,
            participantId
          );
          const hearts =
            initBudgetParParticipant[participantId] -
            getCostOfTakenActionCards(
              individualActionCards,
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
color: white;
font-size: 0.8rem;
/* border: ${(props) =>
  props.selected ? '3pt solid palegreen' : '3pt solid white'}; */
background: ${(props) =>
  props.selected ? COLORS.PRIMARY : COLORS.GRAY.STANDARD};
`;

export default ParticipantsTable;
