import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import ParticipantsTable from './ParticipantsTable';
import IndividualActionsForm from './IndividualActionsForm';
import { setIndividualActionsForAllParticipants } from '../../../actions/workshop';

const IndividualActions = ({ handleClose }) => {
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
  return (
    <Container className='row-full'>
      <Row style={{ height: '100vh' }}>
        <Col sm={12} md={4}>
          <Container>
            <h4>{t('common.participants')}</h4>
            <ParticipantsTable
              entityParticipants={entityParticipants}
              workshopParticipants={workshopParticipants}
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
            ></IndividualActionsForm>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default IndividualActions;
