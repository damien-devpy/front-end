import React from 'react';
import { Formik } from 'formik';
import { Form, Col, Button } from 'react-bootstrap';
import * as yup from 'yup';
import moment from 'moment';
import PrimaryButton from '../../../components/PrimaryButton';
const schema = yup.object({
  workshopName: yup.string().required(),
  coachName: yup.string().required(),
});
const WorkshopModalForm = ({ t, handleSubmit }) => {
  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        date: moment(),
        workshopName: '',
        coachName: '',
        status: 'En préparation',
      }}
    >
      {({ handleSubmit, handleChange, values, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="validationFormik01">
              <Form.Label>{t('common.workshopName')}</Form.Label>
              <Form.Control
                type="text"
                name="workshopName"
                value={values.workshopName}
                onChange={handleChange}
                isInvalid={!!errors.workshopName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.workshopName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="validationFormik02">
              <Form.Label>{t('common.coach')}</Form.Label>
              <Form.Control
                type="text"
                name="coachName"
                value={values.coachName}
                onChange={handleChange}
                isInvalid={!!errors.coachName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.coachName}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <div style={{ textAlign: 'right' }}>
            <PrimaryButton type="submit">
              {t('common.createWorkshop')}
            </PrimaryButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default WorkshopModalForm;
