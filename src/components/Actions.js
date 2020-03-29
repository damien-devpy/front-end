import React from 'react';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';

const Actions = () => {
  const actions = useSelector(state => state.actions.byId);

  return (
    <Form>
      <Form.Group controlId='actionForm.CheckBoxAction'>
        {Object.keys(actions).map(key => (
          <Form.Check
            type='checkbox'
            label={actions[key].name}
            name={actions[key].name}
            value={actions[key].name}
            id={`id-checkbox-${key}`}
            key={`id-checkbox-${key}`}
          />
        ))}
      </Form.Group>
    </Form>
  );
};

export default Actions;
