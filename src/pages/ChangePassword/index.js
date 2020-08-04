import * as yup from 'yup';
import React from 'react';
import { Container, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import CommonModal from '../../components/CommonModal';
import PrimaryButton from '../../components/PrimaryButton';

const ChangePassword = ({ handleChangePassword }) => {
  const { t } = useTranslation();
  const schema = yup.object({
    // oldPassword: yup
    //   .string()
    //   .required(t('errors.fieldMandatory'))
    //   .min(8, t('errors.passwordMin8Characters')),
    newPassword: yup
      .string()
      .required(t('errors.fieldMandatory'))
      .min(8, t('errors.passwordMin8Characters')),
    confirmedNewPassword: yup
      .string()
      .required(t('errors.fieldMandatory'))
      .min(8, t('errors.passwordMin8Characters'))
      .oneOf([yup.ref('newPassword'), null], t('errors.passwordsAreDifferent')),
  });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const accessToken = queryParams.get('accessToken');
  const history = useHistory();
  const handleClose = () => {
    history.goBack();
  };
  const localHandleChangePassword = (values) => {
    // Call next page only when asynchronous API call is succesful
    handleChangePassword(values.newPassword, accessToken, () =>
      history.push('/')
    );
  };

  return (
    <CommonModal
      title={t('common.changePassword')}
      handleClose={handleClose}
      show
    >
      <Formik
        validationSchema={schema}
        onSubmit={localHandleChangePassword}
        initialValues={{
          // oldPassword: '',
          newPassword: '',
          confirmedNewPassword: '',
        }}
      >
        {({ handleSubmit, handleChange, values, errors, isValid, dirty }) => {
          return (
            <Container className="container-md mx-auto">
              <Form
                noValidate
                onSubmit={(event) => {
                  event.preventDefault();
                  return handleSubmit(values);
                }}
              >
                {/* <Form.Group controlId="oldPassword" md={6}>
                  <Form.Label style={{ fontSize: 18 }}>
                    {t('common.oldPassword')}
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="oldPassword"
                    autoComplete="off"
                    value={values.oldPassword}
                    onChange={handleChange}
                    size="lg"
                    isInvalid={!!errors.oldPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.oldPassword}
                  </Form.Control.Feedback>
                </Form.Group> */}
                <Form.Group controlId="newPassword" md={6}>
                  <Form.Label style={{ fontSize: 18 }}>
                    {t('common.newPassword')}
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    autoComplete="off"
                    value={values.newPassword}
                    onChange={handleChange}
                    size="lg"
                    isInvalid={!!errors.newPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.newPassword}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="confirmedNewPassword" md={6}>
                  <Form.Label style={{ fontSize: 18 }}>
                    {t('common.confirmedNewPassword')}
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmedNewPassword"
                    autoComplete="off"
                    value={values.confirmedNewPassword}
                    onChange={handleChange}
                    size="lg"
                    isInvalid={!!errors.confirmedNewPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmedNewPassword}
                  </Form.Control.Feedback>
                </Form.Group>
                <Container className="center">
                  <PrimaryButton
                    className="center"
                    disabled={!(isValid && dirty)}
                    type="submit"
                    size="lg"
                  >
                    {t('common.changePasswordConfirmation')}
                  </PrimaryButton>
                </Container>
              </Form>
            </Container>
          );
        }}
      </Formik>
    </CommonModal>
  );
};

export default ChangePassword;
