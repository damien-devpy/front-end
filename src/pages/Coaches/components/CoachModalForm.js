import React from "react";
import { Formik } from "formik";
import { InputGroup, Form, Col, Button } from "react-bootstrap";
import * as yup from "yup";
const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  role: yup.string().required()
});
const CoachModalForm = ({ t, handleSubmit }) => {
  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        role: t("common.coach")
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
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="validationFormik01">
              <Form.Label>{t("common.firstName")}</Form.Label>
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
              <Form.Label>{t("common.lastName")}</Form.Label>
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
              <Form.Label>{t("common.email")}</Form.Label>
              <InputGroup>
                <Form.Control
                  type="email"
                  placeholder="francois.laugier@caplc.com"
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
              <Form.Label>{t("common.role")}</Form.Label>
              <Form.Control
                as="select"
                placeholder="admin"
                name="role"
                value={values.role}
                onChange={handleChange}
                isInvalid={!!errors.role}
              >
                <option>admin</option>
                <option>coach</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.role}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <div style={{ textAlign: "right" }}>
            <Button type="submit">{t("common.createAccount")}</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CoachModalForm;
