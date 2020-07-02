import React from 'react';
import styled from 'styled-components';
import { Button, ButtonGroup, Col, Form, ToggleButton } from 'react-bootstrap';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import './simulationPage.css';
import PrimaryButton from '../../../components/PrimaryButton';
import { ActionCardItemSimple } from './ActionCardItem';
import { COLORS } from '../../../vars';
import {
  getDefaultRoundType,
  selectCheckedCollectiveActionCardsBatchIdsFromRounds,
  selectCheckedIndividualActionCardsBatchIdsFromRounds,
} from '../../../selectors/workshopSelector';
import {
  selectCollectiveBatches,
  selectIndividualBatches,
} from '../../../selectors/actionsSelector';
import { toggleArrayItem } from '../../../utils/helpers';

const SecondaryButton = styled(Button)`
  background-color: #fff;
  border-color: ${COLORS.BROWN.STANDARD};
  color: #000;
  :hover,
  :focus {
    background-color: ${COLORS.BROWN.STANDARD} !important;
    color: white !important;
    border-color: ${COLORS.BROWN.STANDARD} !important;
  }
`;

const NewRoundModalForm = ({ handleSubmit }) => {
  const { t } = useTranslation();
  const { currentYear, endYear, yearIncrement } = useSelector(
    (state) => state.workshop.result
  );
  const actionCardsEntity = useSelector(
    (state) => state.workshop.entities.actionCards
  );
  const individualActionCardBatches = useSelector((state) =>
    selectIndividualBatches(state.workshop.entities.actionCardBatches)
  );
  const collectiveActionCardBatches = useSelector((state) =>
    selectCollectiveBatches(state.workshop.entities.actionCardBatches)
  );
  const checkedIndividualActionCardsBatchIds = useSelector((state) =>
    selectCheckedIndividualActionCardsBatchIdsFromRounds(state.workshop)
  );
  // prev checked (to disable) array of batchIds
  const checkedCollectiveActionCardsBatchIds = useSelector((state) =>
    selectCheckedCollectiveActionCardsBatchIdsFromRounds(state.workshop)
  );
  const defaultRoundType = useSelector((state) =>
    getDefaultRoundType(state.workshop.entities.roundConfig, currentYear)
  );

  const defaultBatchPreChecked = (roundType) =>
    roundType === 'individual'
      ? [
          Object.keys(individualActionCardBatches).filter(
            (batchId) => !checkedIndividualActionCardsBatchIds.includes(batchId)
          )[0],
        ]
      : [
          Object.keys(collectiveActionCardBatches).filter(
            (batchId) => !checkedCollectiveActionCardsBatchIds.includes(batchId)
          )[0],
        ];
  const handleFormSubmit = ({
    actionCardType,
    currentYear,
    targetedYear,
    individualBudget,
    actionCardBatches,
    checkedActionCardBatchIds,
    actionCardBatchIds,
  }) => {
    const newValues = {
      actionCardType,
      currentYear,
      targetedYear,
      actionCardBatches,
      actionCardBatchIds: [
        ...new Set(
          actionCardBatchIds.filter((e) => e).concat(checkedActionCardBatchIds)
        ),
      ],
    };
    if (actionCardType === 'individual') {
      newValues.individualBudget = individualBudget;
    }
    handleSubmit(newValues);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={{
        actionCardType: defaultRoundType,
        currentYear,
        targetedYear: currentYear + yearIncrement,
        individualBudget: 4,
        actionCardBatches:
          defaultRoundType === 'individual'
            ? individualActionCardBatches
            : collectiveActionCardBatches,
        checkedActionCardBatchIds:
          defaultRoundType === 'individual'
            ? checkedIndividualActionCardsBatchIds
            : checkedCollectiveActionCardsBatchIds,
        actionCardBatchIds: defaultBatchPreChecked(defaultRoundType),
      }}
    >
      {({ handleSubmit, values, setFieldValue }) => {
        return (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group
                as={Col}
                className="d-flex justify-content-center"
                controlId="validationFormik00"
              >
                <SecondaryButton
                  className="mr-2 activable"
                  variant="secondary"
                  active={values.actionCardType === 'individual'}
                  onClick={() => {
                    setFieldValue('actionCardType', 'individual');
                    setFieldValue(
                      'actionCardBatches',
                      individualActionCardBatches
                    );
                    setFieldValue(
                      'checkedActionCardBatchIds',
                      checkedIndividualActionCardsBatchIds
                    );
                    setFieldValue(
                      'actionCardBatchIds',
                      defaultBatchPreChecked('individual')
                    );
                  }}
                >
                  {t('common.individualActions')}
                </SecondaryButton>
                <SecondaryButton
                  className="mr-2 activable"
                  variant="secondary"
                  active={values.actionCardType === 'collective'}
                  onClick={() => {
                    setFieldValue('actionCardType', 'collective');
                    setFieldValue(
                      'actionCardBatches',
                      collectiveActionCardBatches
                    );
                    setFieldValue(
                      'checkedActionCardBatchIds',
                      checkedCollectiveActionCardsBatchIds
                    );
                    setFieldValue(
                      'actionCardBatchIds',
                      defaultBatchPreChecked('collective')
                    );
                  }}
                >
                  {t('common.collectiveActions')}
                </SecondaryButton>
              </Form.Group>
            </Form.Row>
            <Form.Row className="d-flex justify-content-center">
              <Form.Group as={Col}>
                <Form.Label className="mr-2">{t('common.toYear')}</Form.Label>
                <ButtonGroup className="mr-2">
                  <SecondaryButton
                    className="activable"
                    onClick={() => {
                      if (values.targetedYear > currentYear + yearIncrement) {
                        setFieldValue('targetedYear', values.targetedYear - 1);
                      }
                    }}
                  >
                    -
                  </SecondaryButton>
                  <SecondaryButton>{values.targetedYear}</SecondaryButton>
                  <SecondaryButton
                    className="activable"
                    onClick={() => {
                      if (values.targetedYear < endYear) {
                        setFieldValue('targetedYear', values.targetedYear + 1);
                      }
                    }}
                  >
                    +
                  </SecondaryButton>
                </ButtonGroup>
              </Form.Group>
              {values.actionCardType === 'individual' && (
                <Form.Group as={Col}>
                  <Form.Label className="mr-2">
                    {t('common.budget')}
                    {values.actionCardType === 'individual' && (
                      <span className="emoji" style={{ color: 'black' }}>
                        &#x2764;
                      </span>
                    )}
                    {values.actionCardType === 'collective' && (
                      <span className="emoji" style={{ color: 'black' }}>
                        &#x1f4b0;
                      </span>
                    )}
                  </Form.Label>
                  <ButtonGroup className="mr-2">
                    <SecondaryButton
                      className="activable"
                      onClick={() => {
                        if (values.individualBudget > 1) {
                          setFieldValue(
                            'individualBudget',
                            values.individualBudget - 1
                          );
                        }
                      }}
                    >
                      -
                    </SecondaryButton>
                    <SecondaryButton className="activable">
                      {values.individualBudget}
                    </SecondaryButton>
                    <SecondaryButton
                      className="activable"
                      onClick={() => {
                        if (values.individualBudget < 10) {
                          setFieldValue(
                            'individualBudget',
                            values.individualBudget + 1
                          );
                        }
                      }}
                    >
                      +
                    </SecondaryButton>
                  </ButtonGroup>
                </Form.Group>
              )}
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="validationFormik02">
                <Form.Label>{t('common.batches')}</Form.Label> <br />
                <ButtonGroup key="inline-checkbox" className="mb-3" toggle>
                  {Object.keys(values.actionCardBatches).map((batchId) => (
                    <ToggleButton
                      checked={
                        values.actionCardBatchIds.includes(batchId) ||
                        values.checkedActionCardBatchIds.includes(batchId)
                      }
                      disabled={values.checkedActionCardBatchIds.includes(
                        batchId
                      )}
                      className="mr-1 btn-custom-lot"
                      inline
                      label={values.actionCardBatches[batchId].name}
                      type="checkbox"
                      id={batchId}
                      key={batchId}
                      onChange={() =>
                        setFieldValue(
                          'actionCardBatchIds',
                          toggleArrayItem(values.actionCardBatchIds, batchId)
                        )
                      }
                    >
                      {values.actionCardBatches[batchId].name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              {Object.keys(values.actionCardBatches).map(
                (batchId) =>
                  values.actionCardBatchIds.includes(batchId) && (
                    <Form.Group as={Col} sm="3" key={batchId}>
                      {values.actionCardBatches[batchId].actionCardIds.map(
                        (actionCardId) => (
                          <ActionCardItemSimple
                            id={actionCardId}
                            key={actionCardId}
                            cardNumber={
                              actionCardsEntity[actionCardId].cardNumber
                            }
                            text={actionCardsEntity[actionCardId].name}
                            category={actionCardsEntity[actionCardId].category}
                            sector={actionCardsEntity[actionCardId].sector}
                            cost={actionCardsEntity[actionCardId].cost}
                          />
                        )
                      )}
                    </Form.Group>
                  )
              )}
            </Form.Row>
            <Form.Row className="d-flex justify-content-end">
              <PrimaryButton
                className="activable"
                type="submit"
                disabled={
                  !values.actionCardBatchIds.length &&
                  !values.checkedActionCardBatchIds.length
                }
              >
                {t('common.validate')}
              </PrimaryButton>
            </Form.Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default NewRoundModalForm;
