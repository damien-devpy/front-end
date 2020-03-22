import React from 'react';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';

const IndividualActions = () => {
  const actions = useSelector(state => state.actions.byIds);
  const individualActions = useSelector(state => state.individualActions.byIds);
  const participants = useSelector(state => state.participants.byIds);
  const years = useSelector(state => state.years);
  console.log('actions', actions);
  return (
    <Form>
      <Form.Group controlId='actionForm.ControlSelectYear'>
        <Form.Control as='select'>
          {years.map(year => (
            <option value={year}>{year}</option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId='actionForm.CheckBoxParticipant'>
        <Form.Control as='select'>
          {Object.keys(participants).map(participantId => (
            <option value={participants[participantId].email}>
              {`${participants[participantId].firstName} ${participants[participantId].lastName}`}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId='actionForm.CheckBoxAction'>
        {Object.keys(actions).map(key => (
          <Form.Check
            type='checkbox'
            label={actions[key].name}
            id={`id-checkbox-${key}`}
          />
        ))}
      </Form.Group>
    </Form>
  );
};

export default IndividualActions;
