/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Form, Row, Col } from 'react-bootstrap';
import { COLORS } from '../../../vars';
import { ParticipantStatus } from './Status';

const isValidName = (input) => input && input.split(/ /).length > 1 && input.split(/ /)[1];

const isValidEmail = (input) => input && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input);

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
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    console.log('useEffect', id);
    if ((name !== `${firstName} ${lastName}`) || (email !== initEmail) || (currentPersonaId !== persona)) {
      console.log('Dispatching update ');
      updateParticipant(name, email, persona, isValidName(name) && isValidEmail(email));
    }
  }, [isActive, isValid]); // if not active update store

  const handleItemClick = (e) => {
    e.stopPropagation();
    handleClick(id);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteParticipant();
    e.stopPropagation();
  };

  const [name, setName] = useState(firstName && lastName && `${firstName} ${lastName}`);
  const [email, setEmail] = useState(initEmail);
  const [persona, setPersona] = useState(currentPersonaId);

  const handleChangeName = (e) => {
    setName(e.target.value);
    updateParticipant(e.target.value, email, persona,
      isValidName(e.target.value) && isValidEmail(email));
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    updateParticipant(name, e.target.value, persona,
      isValidName(name) && isValidEmail(e.target.value));
  };

  const handleChangePersona = (e) => {
    setPersona(e.target.selectedIndex);
    updateParticipant(name, email, e.target.selectedIndex,
      isValidName(name) && isValidEmail(email));
    e.stopPropagation();
  };

  const PersonaDropdown = () => {
    const personaOptions = [];
    personas.allIds.forEach((i) => {
      personaOptions.push(
        <option id={i} value={i}>{personas.byId[i].pseudo}</option>,
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
        <option value='None'>{t('manageParticipants.nullPersona')}</option>
        {personaOptions}
      </Form.Control>
    );
  };

  return (
    <Row onClick={handleItemClick} id={`participant${id}`} className="align-items-bottom">
      <Col xs="1" className="text-center">
        <Form.Label>
          {isActive
            ? (
              <button
                type="button"
                className="btn btn-link text-decoration-none"
                title={t('manageParticipants.delete')}
                onMouseDown={handleDelete}
              >
              &#x1f5d1;              
              </button>
            )
            : ''}
        </Form.Label>
      </Col>
      <Col>
        {/* <Form.Group> */}
        <Form.Control
          plaintext={!isActive}
          readOnly={!isActive}
          value={name}
          validated={isActive}
          // isValid={!isNotValidName()}
          isInvalid={!isValidName(name)}
          onChange={handleChangeName}
          required
        />
        {/* <Form.Control.Feedback type="invalid">Please fill in</Form.Control.Feedback> */}
        {/* </Form.Group> */}
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
        {/* <Form.Control.Feedback type="invalid">Please fill in</Form.Control.Feedback> */}
      </Col>
      <Col md="2">
        <PersonaDropdown />
      </Col>
      <Col className="text-center" onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}>
        <ParticipantStatus value={status} />
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
        <Col>
          {t('manageParticipants.nameSurname')}
        </Col>
        <Col>
          {t('manageParticipants.email')}
        </Col>
        <Col md="2">
          {t('manageParticipants.persona')}
        </Col>
        <Col className="text-center">
          {t('manageParticipants.status')}
        </Col>
      </Row>
    </StyledHeaderRow>
  );
};

const StyledHeaderRow = styled.div`
  //background-color: ${COLORS.GRAY.LIGHT};
  margin-top: 10px;
  margin-bottom: 10px;
  padding-bottom: 5px;
  font-weight: bold;
  border-bottom:1pt solid ${COLORS.GRAY.LIGHT};
`;
