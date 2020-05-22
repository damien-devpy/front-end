import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

import { toggleArrayItem } from '../../../utils/helpers';
import IndividualActionsForm from './IndividualActionsForm';
import ParticipantsTable from './ParticipantsTable';
import { setIndividualActionsForAllParticipants } from '../../../actions/workshop';

const IndividualActionsFormik = ({ handleClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentRound = useSelector(
    (state) => state.workshop.result.currentYear
  );
  const workshopParticipants = useSelector(
    (state) => state.workshop.result.participants
  );
  const [selectedParticipantId, setSelectedParticipantId] = useState(
    workshopParticipants ? workshopParticipants[0] : -1
  );
  const entityParticipants = useSelector(
    (state) => state.workshop.entities.participants
  );
  const handleParticipantSelect = (id) => {
    console.log('handleParticipantSelect', id);
    setSelectedParticipantId(id);
  };
  const handleSubmitEntryOfIndividualActions = (values) => {
    console.log('handleSubmitEntryOfIndividualActions', values);
    dispatch(
      setIndividualActionsForAllParticipants(
        currentRound,
        values.individualActionCards
      )
    );
    handleClose();
  };
  const individualActionCardsEntity = useSelector(
    (state) => state.workshop.entities.individualActionCards
  );

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

  const getNumberOfTakenActionCards = (
    individualActionCards,
    round,
    participantId
  ) => {
    const individualActionCardsId = `${round}-${participantId}`;
    return individualActionCards[individualActionCardsId] &&
      individualActionCards[individualActionCardsId].actionCardIds
      ? individualActionCards[individualActionCardsId].actionCardIds.length
      : 0;
  };

  return (
    <Formik
      onSubmit={handleSubmitEntryOfIndividualActions}
      initialValues={{
        individualActionCards: { ...individualActionCardsEntity },
      }}
    >
      {({ handleSubmit, values, setFieldValue }) => {
        console.log('IndividualActionsForm values', values);
        const handleCardActionSelectionChange = (
          currentRound,
          participantId,
          actionCardId
        ) => {
          setFieldValue(
            'individualActionCards',
            toggleIndividualActionCardsIdsInMap(
              values['individualActionCards'],
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
                    entityParticipants={entityParticipants}
                    individualActionCards={values['individualActionCards']}
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
                    handleSubmit={handleSubmit}
                    handleCardActionSelectionChange={
                      handleCardActionSelectionChange
                    }
                    individualActionCards={values['individualActionCards']}
                  ></IndividualActionsForm>
                </Container>
              </Col>
            </Row>
          </Container>
        );
      }}
    </Formik>
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

export default IndividualActionsFormik;
