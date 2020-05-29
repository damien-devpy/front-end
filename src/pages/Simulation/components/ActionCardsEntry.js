import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';

import {
  getCostOfTakenActionCards,
  selectCollectiveActionCards,
  selectCollectiveRoundIds,
  selectIndividualActionCardsFromParticipant,
  selectIndividualRoundIds,
  selectNextRound,
} from '../../../selectors/workshopSelector';
import {
  initRoundAndProcessModel,
  setCollectiveActions,
  setIndividualActionsForAllParticipants,
} from '../../../actions/workshop';
import {
  makeYearParticipantKey,
  toggleArrayItem,
} from '../../../utils/helpers';
import ActionCardsForm from './ActionCardsForm';
import ParticipantsTable from './ParticipantsTable';

const computeInitRoundBudget = (
  roundsConfig,
  prevChoices,
  participantIds,
  actionCards
) => {
  const rounds = Object.keys(roundsConfig);
  const roundBudgets = rounds.map((round) => roundsConfig[round].budget);
  const totalBudget = roundBudgets.reduce((a, b) => a + b, 0);
  const initBudgets = {};
  // console.log('Total init budget', totalBudget);
  participantIds.forEach((id) => {
    initBudgets[id] = totalBudget;
  });
  // console.log('Prev choices', prevChoices)
  rounds.forEach((round) => {
    participantIds.forEach((id) => {
      const cardIds = prevChoices
        ? prevChoices[makeYearParticipantKey(round, id)]
        : null;
      // console.log(round, id, `${round}-${id}`, cardIds);
      cardIds &&
        cardIds.actionCardIds.forEach((cardId) => {
          initBudgets[id] -= actionCards[cardId].cost;
        });
    });
  });
  return initBudgets;
};

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

  const actionCardsEntity = useSelector(
    (state) => state.workshop.entities.actionCards
  );

  // these are choices (from prev rounds), not cards per se
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

  const budgetParParticipant = useSelector((state) =>
    computeInitRoundBudget(
      state.workshop.entities.roundsConfig,
      state.workshop.entities.individualActionCards,
      Object.keys(state.workshop.entities.participants),
      state.workshop.entities.actionCards
    )
  );

  // these are current choices (for this round), not cards per se
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
    dispatch(initRoundAndProcessModel(currentRound, nextRound));
    handleClose();
  };
  const handleSubmitEntryOfCollectiveActions = () => {
    console.log('handleSubmitEntryOfCollectiveActions', collectiveActionCards);
    dispatch(setCollectiveActions(currentRound, collectiveActionCards));
    dispatch(initRoundAndProcessModel(currentRound, nextRound));
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
      participantId
    );
    const actionCardIds =
      individualActionCardsMap[individualActionCardsId] &&
      individualActionCardsMap[individualActionCardsId].actionCardIds;
    const updatedChoices = {
      ...individualActionCardsMap,
      [individualActionCardsId]: {
        participantId,
        actionCardIds: toggleArrayItem(actionCardIds, actionCardId),
      },
    };
    const validChoice =
      getCostOfTakenActionCards(
        updatedChoices,
        actionCardsEntity,
        round,
        participantId
      ) <= budgetParParticipant[participantId];
    return validChoice ? updatedChoices : individualActionCardsMap;
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
    <Container>
      <Row>
        {roundActionCardType === 'individual' && (
          <Col sm={4} md={4}>
            <Container>
              <h4>{t('common.participants')}</h4>
              <ParticipantsTable
                round={currentRound}
                workshopParticipants={workshopParticipants}
                participantsEntity={participantsEntity}
                individualActionCards={individualActionCards}
                selectedParticipantId={selectedParticipantId}
                actionCardsEntity={actionCardsEntity}
                handleSelect={handleParticipantSelect}
                initBudgetParParticipant={budgetParParticipant}
              />
            </Container>
          </Col>
        )}
        <Col sm={8} md={8}>
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
