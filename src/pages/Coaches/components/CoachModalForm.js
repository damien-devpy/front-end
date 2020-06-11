import * as yup from 'yup';
import React from 'react';
import { Button, Col, Form, InputGroup } from 'react-bootstrap';
import { Formik } from 'formik';
import PrimaryButton from "../../../components/PrimaryButton"

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  role: yup.string().required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup.string().when("password", {
    is: val => (val && val.length > 0 ? true : false),
    then: yup.string().oneOf(
      [yup.ref("password")],
      "Both password need to be the same"
    )
  })
});
const CoachModalForm = ({ t, handleSubmit }) => {
  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        role: t('common.coach'),
        password: "",
        city:""   }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Row>
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
                {errors.firstName}
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
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="validationFormikEmail">
              <Form.Label>{t('common.email')}</Form.Label>
              <InputGroup>
                <Form.Control
                  type="email"
                  placeholder="yourname@caplc.com"
                  aria-describedby="inputGroupPrepend"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} controlId="validationFormik03">
              <Form.Label>{t('common.role')}</Form.Label>
              <Form.Control
                as="select"
                placeholder={t("common.coach")}
                name="role"
                value={values.role}
                onChange={handleChange}
                isInvalid={!!errors.role}
              >
                <option value="coach">{t("common.coach")}</option>
                <option value="admin">{t("common.admin")}</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.role}
              </Form.Control.Feedback>
            </Form.Group>
            <InputGroup>
            <Form.Group as={Col} controlId="validationFormikPassword">
              <Form.Label>{t('common.password')}</Form.Label>
              <Form.Control
                type="password"
                name="password"
                isInvalid={!!errors.password}
                value={values.password}
                onChange={handleChange}

             />
               <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="validationFormik04">
              <Form.Label>{t('common.password_confirmation')}</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                className="form-control rounded-0"
                isInvalid={!!errors.password}
                onChange={handleChange}
             />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <div className="text-danger">{errors.confirmPassword}</div>
                ) : null} 
            </Form.Group>
            </InputGroup>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="city">
            <Form.Label>{t('common.city')}</Form.Label>
            <Form.Control 
            type="text" 
            name="city"
            className="form-control rounded-0"
            onChange={handleChange} placeholder="Paris"/>
            </Form.Group>
          </Form.Row>
          <div style={{ textAlign: 'right' }}>
            <PrimaryButton type="submit">{t('common.createAccount')}</PrimaryButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CoachModalForm;
