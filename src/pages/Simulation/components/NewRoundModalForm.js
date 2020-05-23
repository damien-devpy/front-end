import React from 'react';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import { Form, Col, Button, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { ActionCardItemSimple } from './ActionCardItem';

import {
  selectIndividualBatches,
  selectCollectiveBatches,
} from '../../../selectors/actionsSelector';
import {
  selectCheckedIndividualActionCardsBatchesFromRounds,
  selectCheckedCollectiveActionCardsBatchesFromRounds,
} from '../../../selectors/workshopSelector';
import { toggleArrayItem } from '../../../utils/helpers';

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
        return (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group
                as={Col}
                className="d-flex justify-content-center"
                controlId="validationFormik00"
              >
                <Button
                  className="mr-2"
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
                </Button>
                <Button
                  className="mr-2"
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
                </Button>
              </Form.Group>
            </Form.Row>
            <Form.Row className="d-flex justify-content-center">
              <Form.Group as={Col}>
                <Form.Label className="mr-2">{t('common.toYear')}</Form.Label>
                <ButtonGroup className="mr-2">
                  <Button
                    onClick={() => {
                      values['targetedYear'] > currentYear + yearIncrement &&
                        setFieldValue('targetedYear', --values['targetedYear']);
                    }}
                  >
                    -
                  </Button>
                  <Button>{values['targetedYear']}</Button>
                  <Button
                    onClick={() => {
                      values['targetedYear'] < endYear &&
                        setFieldValue('targetedYear', ++values['targetedYear']);
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
                      values['budget'] > 1 &&
                        setFieldValue('budget', values['budget'] - 1);
                    }}
                  >
                    -
                  </Button>
                  <Button>{values['budget']}</Button>
                  <Button
                    onClick={() => {
                      values['budget'] < 10 &&
                        setFieldValue('budget', values['budget'] + 1);
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
                <div key={`inline-checkbox`} className="mb-3">
                  {Object.keys(values['actionCardBatches']).map((batchId) => (
                    <Form.Check
                      checked={
                        values['actionCardBatchIds'].includes(batchId) ||
                        values['checkedActionCardBatches'].includes(batchId)
                      }
                      disabled={values['checkedActionCardBatches'].includes(
                        batchId
                      )}
                      inline
                      label={values['actionCardBatches'][batchId].name}
                      type="checkbox"
                      id={batchId}
                      key={batchId}
                      onChange={() =>
                        setFieldValue(
                          'actionCardBatchIds',
                          toggleArrayItem(values['actionCardBatchIds'], batchId)
                        )
                      }
                    />
                  ))}
                </div>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              {Object.keys(values['actionCardBatches']).map(
                (batchId) =>
                  values['actionCardBatchIds'].includes(batchId) && (
                    <Form.Group as={Col} sm="3" key={batchId}>
                      {values['actionCardBatches'][batchId].actionCardIds.map(
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
                  !values['actionCardBatchIds'].length &&
                  !values['checkedActionCardBatches'].length
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

export default NewRoundModalForm;
