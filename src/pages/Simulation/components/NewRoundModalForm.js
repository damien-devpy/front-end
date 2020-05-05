import React from 'react';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import { Form, Col, Button, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import {
  selectIndividualBatches,
  selectCollectiveBatches,
} from '../../../selectors/actionsSelector';
import { toggleArrayItem } from '../../../utils/helpers';

const NewRoundModalForm = ({ handleSubmit }) => {
  const { t } = useTranslation();
  const { currentYear, startYear, endYear, yearIncrement } = useSelector(
    (state) => state.workshop.result
  );
  const actionCards = useSelector(
    (state) => state.workshop.entities.actionCards
  );
  const individualBatches = useSelector((state) =>
    selectIndividualBatches(state.workshop.entities.actionCardBatches)
  );
  const collectiveBatches = useSelector((state) =>
    selectCollectiveBatches(state.workshop.entities.actionCardBatches)
  );

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{
        actionType: 'individual',
        currentYear,
        targetedYear: currentYear + yearIncrement,
        budget: 4,
        batches: individualBatches,
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
                className='d-flex justify-content-center'
                controlId='validationFormik00'
              >
                <Button
                  className='mr-2'
                  variant='secondary'
                  active={values.actionType === 'individual'}
                  onClick={() => {
                    setFieldValue('actionType', 'individual');
                    setFieldValue('batches', individualBatches);
                    setFieldValue('actionCardBatchIds', []);
                  }}
                >
                  {t('common.individualActions')}
                </Button>
                <Button
                  className='mr-2'
                  variant='secondary'
                  active={values.actionType === 'collective'}
                  onClick={() => {
                    setFieldValue('actionType', 'collective');
                    setFieldValue('batches', collectiveBatches);
                    setFieldValue('actionCardBatchIds', []);
                  }}
                >
                  {t('common.collectiveActions')}
                </Button>
              </Form.Group>
            </Form.Row>
            <Form.Row className='d-flex justify-content-center'>
              <Form.Group as={Col}>
                <Form.Label className='mr-2'>{t('common.toYear')}</Form.Label>
                <ButtonGroup className='mr-2'>
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
                <Form.Label className='mr-2'>{t('common.budget')}</Form.Label>
                <ButtonGroup className='mr-2'>
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
              <Form.Group as={Col} controlId='validationFormik02'>
                <Form.Label>{t('common.batches')}</Form.Label>
                <div key={`inline-checkbox`} className='mb-3'>
                  {Object.keys(values['batches']).map((batchId) => (
                    <Form.Check
                      checked={values['actionCardBatchIds'].includes(batchId)}
                      inline
                      label={values['batches'][batchId].name}
                      type='checkbox'
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
              {Object.keys(values['batches']).map(
                (batchId) =>
                  values['actionCardBatchIds'].includes(batchId) && (
                    <Form.Group as={Col} key={batchId}>
                      {values['batches'][batchId].actionCardIds.map(
                        (actionCardId) => (
                          <p key={actionCardId}>
                            {actionCards[actionCardId].name}
                          </p>
                        )
                      )}
                    </Form.Group>
                  )
              )}
            </Form.Row>
            <Form.Row className='d-flex justify-content-end'>
              <Button
                type='submit'
                disabled={!values['actionCardBatchIds'].length}
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
