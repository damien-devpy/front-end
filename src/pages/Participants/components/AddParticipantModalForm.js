import * as yup from 'yup';
import React from 'react';
import { Col, Form } from 'react-bootstrap';
import { Formik } from 'formik';

import PrimaryButton from '../../../components/PrimaryButton';

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
});

const AddParticipantModalForm = ({ t, handleSubmit }) => {
  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        firstName: 'Name',
        lastName: 'Surname',
        email: 'sss@sss.com',
      }}
    >
      {({ handleSubmit, handleChange, values, errors }) => {
        return (
          <Form
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              return handleSubmit(values);
            }}
          >
            {/* <Form.Row> */}
            <Form.Group as={Col} controlId="validationFormik01">
              <Form.Label>{t('common.firstName')}</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="validationFormik02">
              <Form.Label>{t('common.lastName')}</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.surname}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="validationFormik03">
              <Form.Label>{t('common.email')}</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            {/* </Form.Row> */}
            <div style={{ textAlign: 'right' }}>
              <PrimaryButton type="submit">
                {t('manageParticipants.addNew')}
              </PrimaryButton>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddParticipantModalForm;
