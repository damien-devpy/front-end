import React from 'react';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import { Container, Form, Col, Button, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { toggleArrayItem } from '../../../utils/helpers';
import { selectIndividualActionsFromParticipant } from '../../../selectors/workshopSelector';

const IndividualActionsForm = ({ participantId, handleSubmit }) => {
  const { t } = useTranslation();
  const currentRound = useSelector(
    (state) => state.workshop.result.currentYear
  );
  const roundConfig = useSelector(
    (state) => state.workshop.entities.roundsConfig[currentRound]
  );
  const actionCardBatchesEntity = useSelector(
    (state) => state.workshop.entities.actionCardBatches
  );
  const actionCardsEntity = useSelector(
    (state) => state.workshop.entities.actionCards
  );
  const individualActionsFromParticipant = useSelector((state) =>
    selectIndividualActionsFromParticipant(
      participantId,
      state.workshop.entities.roundsConfig,
      state.workshop.entities.individualActions
    )
  );
  console.log(
    'individualActionsFromParticipant',
    individualActionsFromParticipant
  );
  return (
    <Formik onSubmit={handleSubmit} initialValues={{ actionCardIds: [] }}>
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        setFieldValue,
        touched,
        isValid,
        errors,
      }) => {
        console.log('IndividualActionsForm values', values);
        return (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>
              {roundConfig.actionCardBatchIds.map((actionCardBatchId) => {
                const { name, actionCardIds } = actionCardBatchesEntity[
                  actionCardBatchId
                ];
                return (
                  <Form.Group as={Col} key={actionCardBatchId}>
                    <Form.Label>{name}</Form.Label>
                    {actionCardIds.map((actionCardId) => {
                      const { name } = actionCardsEntity[actionCardId];
                      return (
                        <Form.Check
                          style={{ fontSize: '0.5rem' }}
                          type='switch'
                          key={actionCardId}
                          id={actionCardId}
                          label={name}
                          onChange={() =>
                            setFieldValue(
                              'actionCardIds',
                              toggleArrayItem(
                                values['actionCardIds'],
                                actionCardId
                              )
                            )
                          }
                        />
                      );
                    })}
                  </Form.Group>
                );
              })}
            </Form.Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default IndividualActionsForm;
