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
const WorkshopModalForm = ({ t, handleSubmit }) => {
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
              <Form.Label>{t("common.workshopName")}</Form.Label>
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
              <Form.Label>{t("common.coach")}</Form.Label>
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
          <div style={{ textAlign: "right" }}>
            <Button type="submit">{t("common.createAccount")}</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default WorkshopModalForm;
