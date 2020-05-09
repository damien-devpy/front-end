import React from 'react';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import { Container, Form, Col, Button, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { toggleArrayItem } from '../../../utils/helpers';
import { selectIndividualActionCardsFromParticipant } from '../../../selectors/workshopSelector';

const IndividualActionsForm = ({
  currentRound,
  participantId,
  handleSubmit,
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
  const individualActionCardsEntity = useSelector(
    (state) => state.workshop.entities.individualActionCards
  );
  const individualActionCardsFromParticipant = useSelector((state) =>
    selectIndividualActionCardsFromParticipant(
      participantId,
      state.workshop.entities.roundsConfig,
      state.workshop.entities.individualActionCards
    )
  );
  const toggleIndividualActionCardsIdsInMap = (map, key, value) => {
    const actionCardIds = map[key] && map[key].actionCardIds;
    const result = {
      ...map,
      [key]: {
        participantId: key,
        actionCardIds: toggleArrayItem(actionCardIds, value),
      },
    };
    return result;
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{ individualActionCards: { individualActionCardsEntity } }}
    >
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
              {Object.keys(roundsConfigEntity).map((roundConfigId) =>
                roundsConfigEntity[roundConfigId].actionCardBatchIds.map(
                  (actionCardBatchId) => {
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
                              checked={
                                individualActionCardsFromParticipant.includes(
                                  actionCardId
                                ) ||
                                (values['individualActionCards'][
                                  `${currentRound}-${participantId}`
                                ] &&
                                  values['individualActionCards'][
                                    `${currentRound}-${participantId}`
                                  ].actionCardIds.includes(actionCardId))
                              }
                              disabled={individualActionCardsFromParticipant.includes(
                                actionCardId
                              )}
                              type='switch'
                              key={actionCardId}
                              id={`switch-${actionCardId}`}
                              label={name}
                              onChange={() =>
                                setFieldValue(
                                  'individualActionCards',
                                  toggleIndividualActionCardsIdsInMap(
                                    values['individualActionCards'],
                                    `${currentRound}-${participantId}`,
                                    actionCardId
                                  )
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
            <Form.Row className='d-flex justify-content-end'>
              <Button type='submit'>{t('common.validate')}</Button>
            </Form.Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default IndividualActionsForm;
