import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap';

import { toggleArrayItem } from '../../../utils/helpers';
import IndividualActionsForm from './IndividualActionsForm';
import ParticipantsTable from './ParticipantsTable';
import {
  setIndividualActionsForAllParticipants,
  applyIndividualActions,
  computeFootprints,
} from '../../../actions/workshop';
import { selectNextRound } from '../../../selectors/workshopSelector';

const IndividualActions = ({ handleClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const currentRound = useSelector(
    (state) => state.workshop.result.currentYear
  );
  const nextRound = useSelector((state) => selectNextRound(state.workshop));
  const workshopParticipants = useSelector(
    (state) => state.workshop.result.participants
  );
  const [selectedParticipantId, setSelectedParticipantId] = useState(
    workshopParticipants ? workshopParticipants[0] : -1
  );
  const participantsEntity = useSelector(
    (state) => state.workshop.entities.participants
  );
  const handleParticipantSelect = (id) => {
    console.log('handleParticipantSelect', id);
    setSelectedParticipantId(id);
  };

  const individualActionCardsEntity = useSelector((state) =>
    state.workshop.entities.individualActionCards
      ? state.workshop.entities.individualActionCards
      : {}
  );

  const [individualActionCards, setIndividualActionCards] = useState(
    individualActionCardsEntity
  );
  const handleSubmitEntryOfIndividualActions = () => {
    console.log('handleSubmitEntryOfIndividualActions', individualActionCards);
    dispatch(
      setIndividualActionsForAllParticipants(
        currentRound,
        individualActionCards
      )
    );
    dispatch(applyIndividualActions(currentRound));
    dispatch(computeFootprints(nextRound));
    handleClose();
  };
  const toggleIndividualActionCardsIdsInMap = (
    individualActionCardsMap,
    round,
    participantId,
    actionCardId
  ) => {
    const individualActionCardsId = `${round}-${participantId}`;
    const actionCardIds =
      individualActionCardsMap[individualActionCardsId] &&
      individualActionCardsMap[individualActionCardsId].actionCardIds;
    const result = {
      ...individualActionCardsMap,
      [individualActionCardsId]: {
        participantId: participantId,
        actionCardIds: toggleArrayItem(actionCardIds, actionCardId),
      },
    };
    return result;
  };

  const handleCardActionSelectionChange = (
    currentRound,
    participantId,
    actionCardId
  ) => {
    setIndividualActionCards(
      toggleIndividualActionCardsIdsInMap(
        individualActionCards,
        currentRound,
        participantId,
        actionCardId
      )
    );
  };

  return (
    <Container className="row-full">
      <Row style={{ height: '100vh' }}>
        <Col sm={12} md={4}>
          <Container>
            <h4>{t('common.participants')}</h4>
            <ParticipantsTable
              round={currentRound}
              workshopParticipants={workshopParticipants}
              participantsEntity={participantsEntity}
              individualActionCards={individualActionCards}
              selectedParticipantId={selectedParticipantId}
              handleSelect={handleParticipantSelect}
            ></ParticipantsTable>
          </Container>
        </Col>
        <Col sm={12} md={8}>
          <Container>
            <h4>{t('common.batches')}</h4>
            <IndividualActionsForm
              currentRound={currentRound}
              participantId={selectedParticipantId}
              handleSubmit={handleSubmitEntryOfIndividualActions}
              handleCardActionSelectionChange={handleCardActionSelectionChange}
              individualActionCards={individualActionCards}
            ></IndividualActionsForm>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default IndividualActions;
