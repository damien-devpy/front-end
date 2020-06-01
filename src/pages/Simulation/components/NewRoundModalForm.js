import { Button, ButtonGroup, Col, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation, useSSR } from 'react-i18next';
import React from 'react';

import { ActionCardItemSimple } from './ActionCardItem';
import {
  selectCheckedCollectiveActionCardsBatchesFromRounds,
  selectCheckedIndividualActionCardsBatchesFromRounds,
} from '../../../selectors/workshopSelector';
import {
  selectCollectiveBatches,
  selectIndividualBatches,
} from '../../../selectors/actionsSelector';
import { toggleArrayItem } from '../../../utils/helpers';

import styled from 'styled-components';
import '../components/simulationPage.css';
import { COLORS } from '../../../vars';

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
  const checkedIndividualActionCardsBatches = useSelector((state) =>
    selectCheckedIndividualActionCardsBatchesFromRounds(
      state.workshop.entities.roundsConfig
    )
  );
  const checkedCollectiveActionCardsBatches = useSelector((state) =>
    selectCheckedCollectiveActionCardsBatchesFromRounds(
      state.workshop.entities.roundsConfig
    )
  );
  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{
        actionCardType: 'individual',
        currentYear,
        targetedYear: currentYear + yearIncrement,
        budget: 4,
        actionCardBatches: individualActionCardBatches,
        checkedActionCardBatches: checkedIndividualActionCardsBatches,
        actionCardBatchIds: [],
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
                <StyledButton
                  className="mr-2 primaryButton"
                  variant="secondary"
                  active={values.actionCardType === 'individual'}
                  onClick={() => {
                    setFieldValue('actionCardType', 'individual');
                    setFieldValue(
                      'actionCardBatches',
                      individualActionCardBatches
                    );
                    setFieldValue(
                      'checkedActionCardBatches',
                      checkedIndividualActionCardsBatches
                    );
                    setFieldValue('actionCardBatchIds', []);
                  }}
                >
                  {t('common.individualActions')}
                </StyledButton>
                <StyledButton
                  className="mr-2 primaryButton"
                  variant="secondary"
                  active={values.actionCardType === 'collective'}
                  onClick={() => {
                    setFieldValue('actionCardType', 'collective');
                    setFieldValue(
                      'actionCardBatches',
                      collectiveActionCardBatches
                    );
                    setFieldValue(
                      'checkedActionCardBatches',
                      checkedCollectiveActionCardsBatches
                    );
                    setFieldValue('actionCardBatchIds', []);
                  }}
                >
                  {t('common.collectiveActions')}
                </StyledButton>
              </Form.Group>
            </Form.Row>
            <Form.Row className="d-flex justify-content-center">
              <Form.Group as={Col}>
                <Form.Label className="mr-2">{t('common.toYear')}</Form.Label>
                <ButtonGroup className="mr-2">
                  <Button
                    onClick={() => {
                      if (values.targetedYear > currentYear + yearIncrement) {
                        setFieldValue('targetedYear', values.targetedYear - 1);
                      }
                    }}
                  >
                    -
                  </Button>
                  <Button>{values.targetedYear}</Button>
                  <Button
                    onClick={() => {
                      if (values.targetedYear < endYear) {
                        setFieldValue('targetedYear', values.targetedYear + 1);
                      }
                    }}
                  >
                    +
                  </Button>
                </ButtonGroup>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label className="mr-2">{t('common.budget')}</Form.Label>
                <ButtonGroup className="mr-2">
                  <Button
                    onClick={() => {
                      if (values.budget > 1) {
                        setFieldValue('budget', values.budget - 1);
                      }
                    }}
                  >
                    -
                  </Button>
                  <Button>{values.budget}</Button>
                  <Button
                    onClick={() => {
                      if (values.budget < 10) {
                        setFieldValue('budget', values.budget + 1);
                      }
                    }}
                  >
                    +
                  </Button>
                </ButtonGroup>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="validationFormik02">
                <Form.Label>{t('common.batches')}</Form.Label>
                <div key="inline-checkbox" className="mb-3">
                  {Object.keys(values.actionCardBatches).map((batchId) => (
                    <Form.Check
                      checked={
                        values.actionCardBatchIds.includes(batchId) ||
                        values.checkedActionCardBatches.includes(batchId)
                      }
                      disabled={values.checkedActionCardBatches.includes(
                        batchId
                      )}
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
                    />
                  ))}
                </div>
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
                            key={actionCardId}
                            text={actionCardsEntity[actionCardId].name}
                            lot={batchId}
                          />
                        )
                      )}
                    </Form.Group>
                  )
              )}
            </Form.Row>
            <Form.Row className="d-flex justify-content-end">
              <Button
                type="submit"
                disabled={
                  !values.actionCardBatchIds.length &&
                  !values.checkedActionCardBatches.length
                }
              >
                {t('common.validate')}
              </Button>
            </Form.Row>
          </Form>
        );
      }}
    </Formik>
  );
};

const StyledButton = styled(Button)`
  background-color: ${COLORS.BROWN.STANDARD};
  border-color: ${COLORS.BROWN.STANDARD};
  transition: 0.3s;
  :hover {
    color: ${COLORS.BROWN.STANDARD};
    background-color: white;
    border-color: ${COLORS.BROWN.STANDARD};
  }
`;
export default NewRoundModalForm;
