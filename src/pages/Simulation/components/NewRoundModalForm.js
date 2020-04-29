import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import { InputGroup, Form, Col, Button, ButtonGroup } from 'react-bootstrap';
import * as yup from 'yup';

import {
  selectIndividualActionsGroupedByBatch,
  selectCollectiveActionsGroupedByBatch,
} from '../../../selectors/actionsSelector';
import { useWorkshop } from '../../../hooks/workshop';

const schema = yup.object({
  actionType: yup.string().required(),
  year: yup.number().required(),
  budget: yup.number().min(1).max(10).required(),
  batches: yup.array().required(),
});
const NewRoundModalForm = ({ t, handleSubmit }) => {
  // const [actionType, setActionType] = useState('individual');
  const { model: { actions } = {}, isLoading, loadError } = useWorkshop();

  const individualActionsBatches = useSelector((state) =>
    selectIndividualActionsGroupedByBatch(state.workshop.model.actions)
  );
  const collectiveActionsBatches = useSelector((state) =>
    selectCollectiveActionsGroupedByBatch(state.workshop.model.actions)
  );
  console.log('individualActionsBatches', individualActionsBatches);
  console.log('collectiveActionsBatches', collectiveActionsBatches);

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        actionType: 'individual',
        year: 2020,
        budget: 4,
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
        console.log(values);
        return (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId='validationFormik00'>
                <ButtonGroup className='mr-2'>
                  <Button
                    variant='secondary'
                    active={values.actionType === 'individual'}
                    onClick={() => setFieldValue('actionType', 'individual')}
                  >
                    {t('common.individualActions')}
                  </Button>
                </ButtonGroup>
                <ButtonGroup className='mr-2'>
                  <Button
                    variant='secondary'
                    active={values.actionType === 'collective'}
                    onClick={() => setFieldValue('actionType', 'collective')}
                  >
                    {t('common.collectiveActions')}
                  </Button>
                </ButtonGroup>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId='validationFormik02'>
                <Form.Label>{t('common.batches')}</Form.Label>
                <div key={`inline-checkbox`} className='mb-3'>
                  {Object.keys(individualActionsBatches).map((batch) => (
                    <Form.Check
                      checked={values[batch]}
                      inline
                      label={batch}
                      type='checkbox'
                      id={batch}
                      key={batch}
                      onChange={() => setFieldValue(batch, !values[batch])}
                    />
                  ))}
                </div>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              {Object.keys(individualActionsBatches).map(
                (batch) =>
                  values[batch] && (
                    <Form.Group as={Col} key={batch}>
                      {Object.keys(individualActionsBatches[batch]).map(
                        (actionId) => (
                          <p key={actionId}>{actions[actionId].name}</p>
                        )
                      )}
                    </Form.Group>
                  )
              )}
              {/* {selectedBatches.map((batch) => (
                <Form.Group as={Col}>
                  {Object.keys(individualActionsBatches[batch]).map(
                    (actionId) => (
                      <p>{actions[actionId].name}</p>
                    )
                  )}
                </Form.Group>
              ))} */}
            </Form.Row>
            <div style={{ textAlign: 'right' }}>
              <Button type='submit'>{t('common.validate')}</Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default NewRoundModalForm;
