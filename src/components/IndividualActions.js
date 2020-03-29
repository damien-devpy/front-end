import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Formik, Field } from 'formik';

import { useSelector } from 'react-redux';

import { selectAvailableIndividualActionsForParticipantAndYear } from '../selectors/individualActionsSelectors';
import { initActions, setActions } from '../actions/individualActions';

const IndividualActions = () => {
  initActions();
  const [year, setYear] = useState(2020);
  const [participantId, setParticipantId] = useState(1);
  console.log('year', year);

  const actions = useSelector(state => state.actions.byId);
  const individualActions = useSelector(state =>
    selectAvailableIndividualActionsForParticipantAndYear(
      state.individualActions,
      participantId,
      year
    )
  );
  console.log('individualActions', individualActions);
  const participants = useSelector(state => state.participants.byId);
  const years = useSelector(state => state.years);

  return (
    <Formik
      initialValues={{
        actions: actions,
        participants: participants,
        years: years,
        individualActions: individualActions,
        individualActionsSelected: Object.keys(individualActions).filter(
          key => individualActions[key] !== 0
        )
      }}
      // onSubmit={console.log}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setTimeout(() => {
          alert(JSON.stringify(values));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors
      }) => (
        <Form onSubmit={handleSubmit}>
          {/* {console.log(values)} */}
          <Form.Group controlId='actionForm.ControlSelectYear'>
            {/* <Form.Control as='select' onChange={handleChange}> */}
            <Form.Control as='select'>
              {values.years.map(year => (
                <option value={year} key={year}>
                  {year}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId='actionForm.CheckBoxParticipant'>
            <Form.Control as='select'>
              {Object.keys(values.participants).map(participantId => (
                <option
                  value={values.participants[participantId].email}
                  key={participantId}
                  onChange={handleChange}
                >
                  {`${values.participants[participantId].firstName} ${values.participants[participantId].lastName}`}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          {/* <Form.Group
            controlId='actionForm.CheckBoxAction'
            onChange={handleChange}
          >
            {Object.keys(values.actions).map(key => (
              <Form.Check
                type='checkbox'
                label={values.actions[key].name}
                name={values.actions[key].name}
                value={values.actions[key].name}
                id={`id-checkbox-${key}`}
                key={`id-checkbox-${key}`}
              />
            ))}
          </Form.Group> */}
          <Form.Group controlId='actionForm.CheckBoxAction'>
            {Object.keys(values.individualActions).map(key => (
              <div key={`id-checkbox-${key}`}>
                <Field
                  type='checkbox'
                  name='individualActionsSelected'
                  value={key}
                  // id={`id-checkbox-${key}`}
                />
                <label htmlFor='individualActionsSelected'>
                  {values.actions[key].name}
                </label>
              </div>
            ))}
          </Form.Group>
          {/* <Form.Group
            controlId='actionForm.CheckBoxAction'
            onChange={handleChange}
          >
            <Field name='individualActions2' as='select' multiple>
              {Object.keys(values.actions).map(key => (
                <option value={key}>{values.actions[key].name}</option>
              ))}
            </Field>
          </Form.Group> */}
          <Button type='submit'>Submit form</Button>
        </Form>
      )}
    </Formik>
  );
};

export default IndividualActions;
