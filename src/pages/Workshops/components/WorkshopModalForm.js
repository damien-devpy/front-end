import React from 'react';
import { Formik } from 'formik';
import { Form, Col, Button } from 'react-bootstrap';
import * as yup from 'yup';
import moment from 'moment';
import PrimaryButton from '../../../components/PrimaryButton';
const schema = yup.object({
  name: yup.string().required(),
  city: yup.string().required(),
  // coachName: yup.string().required(),
});
const WorkshopModalForm = ({ t, coaches, handleSubmit }) => {
  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        startAt: moment(),
        name: '',
        coachId: '',
        //status: 'En préparation',
        city: '',
      }}
    >
      {({ handleSubmit, handleChange, values, errors }) => {
        return (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="validationFormik01">
                <Form.Label>{t('common.workshopName')}</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="validationFormik02">
                <Form.Label>{t('common.workshopCity')}</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  isInvalid={!!errors.city}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.city}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="validationFormik03">
                <Form.Label>{t('common.coach')}</Form.Label>
                <Form.Control
                  as="select"
                  name="coachId"
                  value={values.coachId}
                  onChange={handleChange}
                >
                  {coaches.map((coach) => (
                    <option key={coach.id} value={coach.id}>
                      {coach.firstName}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <div style={{ textAlign: 'right' }}>
              <PrimaryButton type="submit">
                {t('common.createWorkshop')}
              </PrimaryButton>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default WorkshopModalForm;
