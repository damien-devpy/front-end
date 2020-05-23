import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';

import {
  applyCollectiveActions,
  applyIndividualActions,
  computeFootprints,
  setCollectiveActions,
  setIndividualActionsForAllParticipants,
} from '../../../actions/workshop';
import {
  selectCollectiveActionCards,
  selectCollectiveRoundIds,
  selectIndividualActionCardsFromParticipant,
  selectIndividualRoundIds,
  selectNextRound,
} from '../../../selectors/workshopSelector';

import {
  makeYearParticipantKey,
  toggleArrayItem,
} from '../../../utils/helpers';
import ActionCardsForm from './ActionCardsForm';
import ParticipantsTable from './ParticipantsTable';

const ActionCardsEntry = ({
  currentRound,
  roundActionCardType,
  handleClose,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

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

  const collectiveActionCardsEntity = useSelector((state) =>
    state.workshop.entities.collectiveActionCards
      ? state.workshop.entities.collectiveActionCards
      : {}
  );

  const [individualActionCards, setIndividualActionCards] = useState(
    individualActionCardsEntity
  );
  const [collectiveActionCards, setCollectiveActionCards] = useState(
    collectiveActionCardsEntity
  );
  const individualActionCardsFromParticipant = useSelector((state) =>
    selectIndividualActionCardsFromParticipant(
      selectedParticipantId,
      state.workshop.entities.roundsConfig,
      state.workshop.entities.individualActionCards
    )
  );
  const takenCollectiveActionCards = useSelector((state) =>
    selectCollectiveActionCards(
      state.workshop.entities.roundsConfig,
      state.workshop.entities.collectiveActionCards
    )
  );
  const individualRoundIds = useSelector((state) =>
    selectIndividualRoundIds(state.workshop.entities.roundsConfig)
  );
  const collectiveRoundIds = useSelector((state) =>
    selectCollectiveRoundIds(state.workshop.entities.roundsConfig)
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
  const handleSubmitEntryOfCollectiveActions = () => {
    console.log('handleSubmitEntryOfCollectiveActions', collectiveActionCards);
    dispatch(setCollectiveActions(currentRound, collectiveActionCards));
    dispatch(applyCollectiveActions(currentRound));
    dispatch(computeFootprints(nextRound));
    handleClose();
  };
  const toggleIndividualActionCardsIdsInMap = (
    individualActionCardsMap,
    round,
    participantId,
    actionCardId
  ) => {
    const individualActionCardsId = makeYearParticipantKey(
      round,
      selectedParticipantId
    );
    const actionCardIds =
      individualActionCardsMap[individualActionCardsId] &&
      individualActionCardsMap[individualActionCardsId].actionCardIds;
    const result = {
      ...individualActionCardsMap,
      [individualActionCardsId]: {
        participantId,
        actionCardIds: toggleArrayItem(actionCardIds, actionCardId),
      },
    };
    return result;
  };

  const toggleCollectiveActionCardsIdsInMap = (
    collectiveActionCardsMap,
    round,
    actionCardId
  ) => {
    const collectiveActionCardsId = round;
    const actionCardIds =
      collectiveActionCardsMap[collectiveActionCardsId] &&
      collectiveActionCardsMap[collectiveActionCardsId].actionCardIds;
    const result = {
      ...collectiveActionCardsMap,
      [collectiveActionCardsId]: {
        actionCardIds: toggleArrayItem(actionCardIds, actionCardId),
      },
    };
    return result;
  };

  const handleCardActionSelectionChange = (round, participantId) => (
    actionCardId
  ) =>
    participantId
      ? setIndividualActionCards(
          toggleIndividualActionCardsIdsInMap(
            individualActionCards,
            round,
            participantId,
            actionCardId
          )
        )
      : setCollectiveActionCards(
          toggleCollectiveActionCardsIdsInMap(
            collectiveActionCards,
            round,
            actionCardId
          )
        );

  const isIndividualActionCardChecked = (actionCardId) =>
    individualActionCardsFromParticipant.includes(actionCardId) ||
    (individualActionCards[
      makeYearParticipantKey(currentRound, selectedParticipantId)
    ] &&
      individualActionCards[
        makeYearParticipantKey(currentRound, selectedParticipantId)
      ].actionCardIds.includes(actionCardId));

  const isCollectiveActionCardChecked = (actionCardId) =>
    takenCollectiveActionCards.includes(actionCardId) ||
    (collectiveActionCards[currentRound] &&
      collectiveActionCards[currentRound].actionCardIds.includes(actionCardId));

  return (
    <Container className="row-full">
      <Row style={{ height: '100vh' }}>
        {roundActionCardType === 'individual' && (
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
              />
            </Container>
          </Col>
        )}
        <Col sm={12} md={8}>
          <Container>
            <h4>{t('common.batches')}</h4>
            {roundActionCardType === 'individual' && (
              <ActionCardsForm
                handleSubmit={handleSubmitEntryOfIndividualActions}
                handleCardActionSelectionChange={handleCardActionSelectionChange(
                  currentRound,
                  selectedParticipantId
                )}
                handleCheckedActionCard={isIndividualActionCardChecked}
                roundIds={individualRoundIds}
              />
            )}
            {roundActionCardType === 'collective' && (
              <ActionCardsForm
                handleSubmit={handleSubmitEntryOfCollectiveActions}
                handleCardActionSelectionChange={handleCardActionSelectionChange(
                  currentRound
                )}
                handleCheckedActionCard={isCollectiveActionCardChecked}
                roundIds={collectiveRoundIds}
              />
            )}
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default ActionCardsEntry;
