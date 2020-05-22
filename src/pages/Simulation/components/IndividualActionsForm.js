import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { selectIndividualActionCardsFromParticipant } from '../../../selectors/workshopSelector';
import { ActionCardItem } from './ActionCardItem';

import styled from 'styled-components';
import { COLORS } from '../../../vars';

const IndividualActionsForm = ({
  currentRound,
  participantId,
  handleSubmit,
  handleCardActionSelectionChange,
  individualActionCards,
}) => {
  const { t } = useTranslation();
  // const roundConfig = useSelector(
  //   (state) => state.workshop.entities.roundsConfig[currentRound]
  // );
  const actionCardBatchesEntity = useSelector(
    (state) => state.workshop.entities.actionCardBatches
  );
  const actionCardsEntity = useSelector(
    (state) => state.workshop.entities.actionCards
  );
  const roundsConfigEntity = useSelector(
    (state) => state.workshop.entities.roundsConfig
  );
  const individualActionCardsFromParticipant = useSelector((state) =>
    selectIndividualActionCardsFromParticipant(
      participantId,
      state.workshop.entities.roundsConfig,
      state.workshop.entities.individualActionCards
    )
  );
  // initial active == expanded lot is the last lot of the current round
  const [activeBatch, setActiveBatch] = useState(
    roundsConfigEntity[
      Object.keys(roundsConfigEntity).slice(-1)[0]
    ].actionCardBatchIds.slice(-1)[0]
  );

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Row>
        {Object.keys(roundsConfigEntity).map((roundConfigId) =>
          roundsConfigEntity[roundConfigId].actionCardBatchIds.map(
            (actionCardBatchId) => {
              const { name, actionCardIds } = actionCardBatchesEntity[
                actionCardBatchId
              ];
              return (
                <Form.Group
                  as={Col}
                  sm={actionCardBatchId === activeBatch ? '5' : '3'}
                  key={actionCardBatchId}
                >
                  <LotBadge
                    text={name}
                    active={actionCardBatchId === activeBatch}
                    handleClick={() => setActiveBatch(actionCardBatchId)}
                  />
                  {actionCardIds.map((actionCardId) => {
                    const { name } = actionCardsEntity[actionCardId];
                    return (
                      <ActionCardItem
                        key={actionCardId}
                        id={`switch-${actionCardId}`}
                        text={name}
                        lot={actionCardBatchId}
                        active={actionCardBatchId === activeBatch}
                        checked={
                          individualActionCardsFromParticipant.includes(
                            actionCardId
                          ) ||
                          (individualActionCards[
                            `${currentRound}-${participantId}`
                          ] &&
                            individualActionCards[
                              `${currentRound}-${participantId}`
                            ].actionCardIds.includes(actionCardId))
                        }
                        handleChange={() =>
                          handleCardActionSelectionChange(
                            currentRound,
                            participantId,
                            actionCardId
                          )
                        }
                      />
                    );
                  })}
                </Form.Group>
              );
            }
          )
        )}
      </Form.Row>
      <Form.Row className="d-flex justify-content-end">
        <Button type="submit">{t('common.validate')}</Button>
      </Form.Row>
    </Form>
  );
};

const LotBadge = ({ id, text, active, handleClick }) => {
  return (
    <StyledLot
      name={id}
      className="m-1 mb-3 p-1 btn-block text-center btn"
      active={active}
      onClick={(e) => {
        handleClick();
      }}
    >
      {text}
    </StyledLot>
  );
};

const StyledLot = styled.div`
cursor: pointer;
color: black;
/* font-size: 0.7rem; */
/* border: ${(props) =>
  props.selected ? '3pt solid palegreen' : '3pt solid white'}; */
background: ${(props) =>
  props.active ? COLORS.PRIMARY : COLORS.GRAY.STANDARD};
`;

export default IndividualActionsForm;
