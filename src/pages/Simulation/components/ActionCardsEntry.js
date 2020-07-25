import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { pathOr } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import ActionCardsForm from './ActionCardsForm';
import EuroIcon from '../../../assets/EuroIcon';
import ParticipantsTable from './ParticipantsTable';
import PrimaryButton from '../../../components/PrimaryButton';
import {
  getCostOfChosenActionCards,
  getCostOfChosenCollectiveCards,
  getInitRoundBudget,
  getNumberOfChosenCollectiveCards,
  selectCollectiveChoices,
  selectIndividualChoicesForParticipant,
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

const ActionCardsEntry = ({
  currentRound,
  roundActionCardType,
  handleClose,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const nextRound = useSelector((state) => selectNextRound(state.workshop));

  const participantsEntity = useSelector(
    (state) => state.workshop.entities.participants
  );
  const [selectedParticipantId, setSelectedParticipantId] = useState(
    participantsEntity ? Object.keys(participantsEntity)[0] : -1
  );

  const handleParticipantSelect = (id) => {
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
      ? state.workshop.entities.collectiveChoices
      : {}
  );

  const budgetPerParticipant = useSelector((state) =>
    getInitRoundBudget(
      state.workshop.entities.roundConfig,
      state.workshop.entities.individualChoices,
      Object.keys(state.workshop.entities.participants),
      state.workshop.entities.actionCards
    )
  );

  // CollectiveBudget is automatically computed and not modifiable
  const budgetCollective = useSelector((state) =>
    pathOr(
      0,
      ['workshop', 'entities', 'rounds', currentRound, 'collectiveBudget'],
      state
    )
  );

  // const budgetCollective = useSelector((state) =>
  //   getInitRoundBudgetCollective(
  //     state.workshop.entities.roundConfig,
  //     state.workshop.entities.collectiveChoices,
  //     state.workshop.entities.actionCards
  //   )
  // );

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
      state.workshop.entities.roundConfig,
      state.workshop.entities.individualChoices
    )
  );
  const chosenCollectiveActionCards = useSelector((state) =>
    selectCollectiveChoices(
      state.workshop.entities.roundConfig,
      state.workshop.entities.collectiveChoices
    )
  );

  const handleSubmitIndividualChoices = () => {
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
    const updatedChoices = {
      ...collectiveChoicesMap,
      [collectiveChoicesId]: {
        actionCardIds: toggleArrayItem(actionCardIds, actionCardId),
      },
    };
    const validChoice =
      getCostOfChosenCollectiveCards(
        updatedChoices,
        actionCardsEntity,
        round
      ) <= budgetCollective;
    return validChoice ? updatedChoices : collectiveChoicesMap;
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
            <h4>{t('common.participants')}</h4>
            <ParticipantsTable
              round={currentRound}
              participantsEntity={participantsEntity}
              individualChoices={currentIndividualChoices}
              selectedParticipantId={selectedParticipantId}
              actionCardsEntity={actionCardsEntity}
              handleSelect={handleParticipantSelect}
              initBudgetPerParticipant={budgetPerParticipant}
            />
          </Col>
        )}
        {roundActionCardType === 'collective' && (
          <Col sm={3} md={3} className="align-self-center">
            <Row>
              <h6>
                Actions{' '}
                {getNumberOfChosenCollectiveCards(
                  currentCollectiveChoices,
                  currentRound
                )}
                &#10003;
              </h6>
            </Row>
            <Row>
              <h6>
                {t('common.budget')} {'   '}
                {budgetCollective -
                  getCostOfChosenCollectiveCards(
                    currentCollectiveChoices,
                    actionCardsEntity,
                    currentRound
                  )}
                <EuroIcon width={18} />
              </h6>
            </Row>
          </Col>
        )}

        <Col>
          <h4>{t('common.batches')}</h4>
          {roundActionCardType === 'individual' && (
            <ActionCardsForm
              // handleSubmit={handleSubmitIndividualChoices}
              handleCardActionSelectionChange={handleChoicesChange(
                currentRound,
                selectedParticipantId
              )}
              handleCheckedActionCard={isIndividualActionCardChecked}
              actionCardType={roundActionCardType}
            />
          )}
          {roundActionCardType === 'collective' && (
            <ActionCardsForm
              // handleSubmit={handleSubmitCollectiveChoices}
              handleCardActionSelectionChange={handleChoicesChange(
                currentRound
              )}
              handleCheckedActionCard={isCollectiveActionCardChecked}
              actionCardType={roundActionCardType}
            />
          )}
        </Col>
      </Row>
      <Row className="d-flex justify-content-end">
        <PrimaryButton
          onClick={
            roundActionCardType === 'individual'
              ? handleSubmitIndividualChoices
              : handleSubmitCollectiveChoices
          }
        >
          {t('common.validate')}
        </PrimaryButton>
      </Row>
    </Container>
  );
};

export default ActionCardsEntry;
