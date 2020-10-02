/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Col, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import ParticipantStatus from './ParticipantStatus';
import ParticipantStatusAction from './ParticipantStatusAction';

import { COLORS } from '../../../vars';

const isValidName = (input) =>
  input && input.split(/ /).length > 1 && input.split(/ /)[1];

const isValidEmail = (input) =>
  input && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(input);

export const ParticipantItemForm = ({
  id,
  firstName,
  lastName,
  initEmail,
  status,
  isActive,
  handleClick,
  updateParticipant,
  deleteParticipant,
  personas,
  currentPersonaId,
  isValid,
  handleShowBC,
  handleSendForm,
}) => {
  const { t } = useTranslation();

  const [name, setName] = useState(
    firstName && lastName && `${firstName} ${lastName}`
  );
  const [email, setEmail] = useState(initEmail);
  const [persona, setPersona] = useState(currentPersonaId);

  useEffect(() => {
    // console.log('useEffect', id);
    if (
      name !== `${firstName} ${lastName}` ||
      email !== initEmail ||
      currentPersonaId !== persona
    ) {
      // console.log('Dispatching update ');
      // console.log('isValidName', isValidName(name));
      updateParticipant(
        name,
        email,
        persona,
        isValidName(name) && isValidEmail(email)
      );
    }
  }, [isActive, isValid]); // if not active update store

  const handleItemClick = (e) => {
    handleClick(id);
    e.stopPropagation();
    e.preventDefault();
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteParticipant();
    e.stopPropagation();
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
    updateParticipant(
      e.target.value,
      email,
      persona,
      isValidName(e.target.value) && isValidEmail(email)
    );
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    updateParticipant(
      name,
      e.target.value,
      persona,
      isValidName(name) && isValidEmail(e.target.value)
    );
  };

  const handleChangePersona = (e) => {
    const index = e.target.selectedIndex - 1;
    const chosenPersonaId = Object.keys(personas)[index];
    setPersona(chosenPersonaId);
    updateParticipant(
      name,
      email,
      chosenPersonaId,
      isValidName(name) && isValidEmail(email)
    );
  };

  const PersonaDropdown = () => {
    const personaOptions = [];
    Object.keys(personas).forEach((personaId) => {
      const persona = personas[personaId];
      personaOptions.push(
        <option id={persona.id} value={persona.id}>
          {`${persona.firstName} ${persona.lastName}`}
        </option>
      );
    });

    return (
      <Form.Control
        as="select"
        readOnly={!isActive}
        size="sm"
        id="dropdown"
        name="persona"
        disabled={!isActive}
        value={persona || 'None'}
        onChange={handleChangePersona}
      >
        <option value="None">{t('manageParticipants.nullPersona')}</option>
        {personaOptions}
      </Form.Control>
    );
  };

  return (
    <Row
      onClick={handleItemClick}
      id={`participant${id}`}
      className="align-items-bottom mb-2 mt-2"
      // version Noe - margin left makes columns not aligned
      // style={{
      //   margin: '15px 0px 15px 15px',
      //   borderBottom: `1px solid ${COLORS.GRAY.LIGHT}`,
      // }}
    >
      <Col xs="1" className="text-center">
        <Form.Label>
          {isActive ? (
            <button
              type="button"
              className="btn btn-link text-decoration-none"
              title={t('manageParticipants.delete')}
              onMouseDown={handleDelete}
            >
              &#x1f5d1;
            </button>
          ) : (
            ''
          )}
        </Form.Label>
      </Col>
      <Col>
        <Form.Control
          plaintext={!isActive}
          readOnly={!isActive}
          value={name}
          validated={isActive}
          isInvalid={!isValidName(name)}
          onChange={handleChangeName}
          required
        />
      </Col>
      <Col>
        <Form.Control
          plaintext={!isActive}
          readOnly={!isActive}
          value={email}
          validated={isActive}
          isInvalid={!isValidEmail(email)}
          onChange={handleChangeEmail}
          required
        />
      </Col>
      <Col md="2">
        <PersonaDropdown />
      </Col>
      <Col
        className="text-center"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <ParticipantStatus value={status} />
      </Col>
      <Col
        className="text-center"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <ParticipantStatusAction
          value={status}
          handleShowBC={() => handleShowBC(id)}
          handleSendForm={() => handleSendForm(id)}
        />
      </Col>
    </Row>
  );
};

export const ParticipantsHeader = () => {
  const { t } = useTranslation();

  return (
    <StyledHeaderRow>
      <Row>
        <Col xs="1" className="text-center" />
        <Col>{t('manageParticipants.nameSurname')}</Col>
        <Col>{t('manageParticipants.email')}</Col>
        <Col md="2">{t('manageParticipants.persona')}</Col>
        <Col className="text-center">{t('manageParticipants.status')}</Col>
        <Col className="text-center">{t('manageParticipants.actions')}</Col>
      </Row>
    </StyledHeaderRow>
  );
};

const StyledHeaderRow = styled.div`
  //background-color: ${COLORS.GRAY.LIGHT};
  margin-top: 10px;
  margin-bottom:30px;
  padding-bottom: 5px;
  font-weight: bold;
  border-bottom:1px solid #E2E0E0;
`;
