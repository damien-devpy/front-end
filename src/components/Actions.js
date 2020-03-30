import React from 'react';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Actions = () => {
  const actions = useSelector(state => state.actions.byId);
  const { t } = useTranslation();
  const action1 = t('ecologicalActions.AI_Velo');

  return (
    <div>
      <p>Test i18n library :</p>
      <p>Action 1: {action1}</p>
      <p>Test Redux Store with some actions :</p>
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
    </div>
  );
};

export default Actions;
