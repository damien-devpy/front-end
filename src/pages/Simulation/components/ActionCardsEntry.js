import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';

import {
  getCostOfChosenActionCards,
  getInitRoundBudget,
  selectCollectiveChoices,
  selectCollectiveRoundIds,
  selectIndividualChoicesForParticipant,
  selectIndividualRoundIds,
  selectNextRound,
} from '../../../selectors/workshopSelector';
import {
  initRoundAndProcessModel,
  setCollectiveChoices,
  setIndividualChoicesForAllParticipants,
} from '../../../actions/workshop';
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

  const actionCardsEntity = useSelector(
    (state) => state.workshop.entities.actionCards
  );

  // these are choices (from prev rounds), not cards per se
  const individualChoicesEntity = useSelector((state) =>
    state.workshop.entities.individualChoices
      ? state.workshop.entities.individualChoices
      : {}
  );

  const collectiveChoicesEntity = useSelector((state) =>
    state.workshop.entities.collectiveChoices
      ? state.workshop.entities.collectiveChoies
      : {}
  );

  const budgetPerParticipant = useSelector((state) =>
    getInitRoundBudget(
      state.workshop.entities.roundsConfig,
      state.workshop.entities.individualChoices,
      Object.keys(state.workshop.entities.participants),
      state.workshop.entities.actionCards
    )
  );

  // these are current choices (for this round), not cards per se
  const [currentIndividualChoices, setCurrentIndividualChoices] = useState(
    individualChoicesEntity
  );
  const [currentCollectiveChoices, setCurrentCollectiveChoices] = useState(
    collectiveChoicesEntity
  );
  const individualChoicesFromParticipant = useSelector((state) =>
    selectIndividualChoicesForParticipant(
      selectedParticipantId,
      state.workshop.entities.roundsConfig,
      state.workshop.entities.individualChoices
    )
  );
  const chosenCollectiveActionCards = useSelector((state) =>
    selectCollectiveChoices(
      state.workshop.entities.roundsConfig,
      state.workshop.entities.collectiveChoices
    )
  );
  const individualRoundIds = useSelector((state) =>
    selectIndividualRoundIds(state.workshop.entities.roundsConfig)
  );
  const collectiveRoundIds = useSelector((state) =>
    selectCollectiveRoundIds(state.workshop.entities.roundsConfig)
  );

  const handleSubmitIndividualChoices = () => {
    console.log('handleSubmitIndividualChoices', currentIndividualChoices);
    dispatch(
      setIndividualChoicesForAllParticipants(
        currentRound,
        currentIndividualChoices
      )
    );
    dispatch(initRoundAndProcessModel(currentRound, nextRound));
    handleClose();
  };
  const handleSubmitCollectiveChoices = () => {
    console.log('handleSubmitCollectiveChoices', currentCollectiveChoices);
    dispatch(setCollectiveChoices(currentRound, currentCollectiveChoices));
    dispatch(initRoundAndProcessModel(currentRound, nextRound));
    handleClose();
  };
  const toggleIndividualChoiceInMap = (
    individualChoicesMap,
    round,
    participantId, // should always be selectedParticipant
    actionCardId
  ) => {
    const individualChoicesIds = makeYearParticipantKey(round, participantId);
    const actionCardIds =
      individualChoicesMap &&
      individualChoicesMap[individualChoicesIds] &&
      individualChoicesMap[individualChoicesIds].actionCardIds;
    const updatedChoices = {
      ...individualChoicesMap,
      [individualChoicesIds]: {
        participantId,
        actionCardIds: toggleArrayItem(actionCardIds, actionCardId),
      },
    };
    const validChoice =
      getCostOfChosenActionCards(
        updatedChoices,
        actionCardsEntity,
        round,
        participantId
      ) <= budgetPerParticipant[participantId];
    return validChoice ? updatedChoices : individualChoicesMap;
  };

  const toggleCollectiveChoicesInMap = (
    collectiveChoicesMap,
    round,
    actionCardId
  ) => {
    const collectiveChoicesId = round;
    const actionCardIds =
      collectiveChoicesMap &&
      collectiveChoicesMap[collectiveChoicesId] &&
      collectiveChoicesMap[collectiveChoicesId].actionCardIds;
    const result = {
      ...collectiveChoicesMap,
      [collectiveChoicesId]: {
        actionCardIds: toggleArrayItem(actionCardIds, actionCardId),
      },
    };
    return result;
  };

  const handleChoicesChange = (round, participantId) => (actionCardId) =>
    participantId
      ? setCurrentIndividualChoices(
          toggleIndividualChoiceInMap(
            currentIndividualChoices,
            round,
            participantId,
            actionCardId
          )
        )
      : setCurrentCollectiveChoices(
          toggleCollectiveChoicesInMap(
            currentCollectiveChoices,
            round,
            actionCardId
          )
        );

  const isIndividualActionCardChecked = (actionCardId) =>
    individualChoicesFromParticipant.includes(actionCardId) ||
    (currentIndividualChoices &&
      currentIndividualChoices[
        makeYearParticipantKey(currentRound, selectedParticipantId)
      ] &&
      currentIndividualChoices[
        makeYearParticipantKey(currentRound, selectedParticipantId)
      ].actionCardIds.includes(actionCardId));

  const isCollectiveActionCardChecked = (actionCardId) =>
    chosenCollectiveActionCards.includes(actionCardId) ||
    (currentCollectiveChoices &&
      currentCollectiveChoices[currentRound] &&
      currentCollectiveChoices[currentRound].actionCardIds.includes(
        actionCardId
      ));

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
                individualChoices={currentIndividualChoices}
                selectedParticipantId={selectedParticipantId}
                actionCardsEntity={actionCardsEntity}
                handleSelect={handleParticipantSelect}
                initBudgetPerParticipant={budgetPerParticipant}
              />
            </Container>
          </Col>
        )}
        <Col sm={8} md={8}>
          <Container>
            <h4>{t('common.batches')}</h4>
            {roundActionCardType === 'individual' && (
              <ActionCardsForm
                handleSubmit={handleSubmitIndividualChoices}
                handleCardActionSelectionChange={handleChoicesChange(
                  currentRound,
                  selectedParticipantId
                )}
                handleCheckedActionCard={isIndividualActionCardChecked}
                roundIds={individualRoundIds}
              />
            )}
            {roundActionCardType === 'collective' && (
              <ActionCardsForm
                handleSubmit={handleSubmitCollectiveChoices}
                handleCardActionSelectionChange={handleChoicesChange(
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
