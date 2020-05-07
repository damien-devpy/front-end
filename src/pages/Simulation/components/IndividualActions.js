import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import ParticipantsTable from './ParticipantsTable';
import IndividualActionsForm from './IndividualActionsForm';

const IndividualActions = ({ handleClose, handleSubmit }) => {
  const { t } = useTranslation();
  const workshopParticipants = useSelector(
    (state) => state.workshop.result.participants
  );
  const entityParticipants = useSelector(
    (state) => state.workshop.entities.participants
  );
  return (
    <Container className='row-full'>
      <Row className='d-flex justify-content-end mr-1'>
        <Button variant='secondary' onClick={handleSubmit}>
          {t('common.validate')}
        </Button>
      </Row>
      <Row style={{ height: '100vh' }}>
        <Col sm={12} md={4}>
          <Container>
            <h4>{t('common.participants')}</h4>
            <ParticipantsTable
              entityParticipants={entityParticipants}
              workshopParticipants={workshopParticipants}
            ></ParticipantsTable>
          </Container>
        </Col>
        <Col sm={12} md={8}>
          <Container>
            <h4>{t('common.batches')}</h4>
            <IndividualActionsForm participantId={1}></IndividualActionsForm>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default IndividualActions;
