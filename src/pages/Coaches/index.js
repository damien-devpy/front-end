import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { Formik } from 'formik';
import * as yup from 'yup';

import Coach from './components/Coach';
import { useCoaches } from '../../hooks/coaches';
import { addCoach } from '../../actions/coaches';
import { COLORS } from '../../vars';

const capitalize = (word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  role: yup.string().required(),
});

const Coaches = () => {
  const { t } = useTranslation();
  const { coaches, isLoading, loadError } = useCoaches();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (values) => {
    console.log('handleSubmit', values);
    dispatch(addCoach(values));
    setShow(false);
  };
  return (
    <div>
      <StyledHeader>
        {!isLoading && (
          <Button variant='secondary' onClick={handleShow}>
            {t('common.addACoach')}
          </Button>
        )}
      </StyledHeader>

      <div className='container'>
        {coaches && (
          <Coach
            header
            name={`${capitalize(t('common.firstName'))} ${capitalize(
              t('common.lastName')
            )}`}
            email={capitalize(t('common.email'))}
            lastWorkshopDate={capitalize(t('common.dateOfLastWorkshop'))}
            role={capitalize(t('common.role'))}
            numberOfWorkshops={capitalize(t('common.workshops'))}
          />
        )}
        {coaches &&
          coaches.map(
            ({
              userId,
              firstName,
              lastName,
              email,
              lastWorkshopDate,
              role,
              numberOfWorkshops,
            }) => (
              <Coach
                key={userId}
                name={`${firstName} ${lastName}`}
                email={email}
                lastWorkshopDate={lastWorkshopDate}
                role={role}
                numberOfWorkshops={numberOfWorkshops}
              ></Coach>
            )
          )}
        {loadError && <p>{t('common.loadError')}</p>}
        {/* {isLoading && <p>{t('common.loading')}</p>} */}
        {isLoading && <Spinner animation='border'></Spinner>}
      </div>
      <Modal
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('common.newCoach')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              role: 'coach',
            }}
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
                  <Form.Group as={Col} md='4' controlId='validationFormik01'>
                    <Form.Label>{t('common.firstName')}</Form.Label>
                    <Form.Control
                      type='text'
                      name='firstName'
                      value={values.firstName}
                      onChange={handleChange}
                      isInvalid={!!errors.firstName}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors.firstName}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md='4' controlId='validationFormik02'>
                    <Form.Label>{t('common.lastName')}</Form.Label>
                    <Form.Control
                      type='text'
                      name='lastName'
                      value={values.lastName}
                      onChange={handleChange}
                      isInvalid={!!errors.lastName}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors.lastName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md='4' controlId='validationFormikEmail'>
                    <Form.Label>{t('common.email')}</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type='email'
                        placeholder='francois.laugier@caplc.com'
                        aria-describedby='inputGroupPrepend'
                        name='email'
                        value={values.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.email}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} md='4' controlId='validationFormik03'>
                    <Form.Label>{t('common.role')}</Form.Label>
                    <Form.Control
                      as='select'
                      placeholder='admin'
                      name='role'
                      value={values.role}
                      onChange={handleChange}
                      isInvalid={!!errors.role}
                    >
                      <option>admin</option>
                      <option>coach</option>
                    </Form.Control>
                    <Form.Control.Feedback type='invalid'>
                      {errors.role}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Button type='submit'>{t('common.createAccount')}</Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
};

const StyledHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
  /* flex-direction: column; */
  /* background: ${COLORS.BROWN.STANDARD}; */
`;
export default Coaches;
