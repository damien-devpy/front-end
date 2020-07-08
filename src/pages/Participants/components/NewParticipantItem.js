/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import { Col, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import DeleteIcon from '../../../assets/DeleteIcon';
import ParticipantStatus from './ParticipantStatus';
import { COLORS } from '../../../vars';

export const ParticipantItemForm = ({
  id,
  firstName,
  lastName,
  email,
  status,
  updateParticipant,
  deleteParticipant,
  personas,
  currentPersonaId,
  handleShowBC,
}) => {
  const { t } = useTranslation();

  const [persona, setPersona] = useState(currentPersonaId);

  const handleDelete = (e) => {
    e.preventDefault();
    deleteParticipant();
    e.stopPropagation();
  };

  const handleChangePersona = (e) => {
    const index = e.target.selectedIndex;
    const chosenPersonaId =
      index === 0 ? null : Object.keys(personas)[index - 1];
    setPersona(chosenPersonaId);
    updateParticipant(chosenPersonaId);
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
        size="sm"
        id="dropdown"
        name="persona"
        value={persona || 'None'}
        onChange={handleChangePersona}
      >
        <option value="None">{t('manageParticipants.nullPersona')}</option>
        {personaOptions}
      </Form.Control>
    );
  };

  return (
    <Row id={`participant${id}`} className="align-items-center mb-2 mt-2">
      <Col xs="1" className="text-center">
        <Form.Label>
          <button
            type="button"
            className="btn btn-link text-decoration-none"
            title={t('manageParticipants.delete')}
            onMouseDown={handleDelete}
          >
            <DeleteIcon height={20} width={20}/>
          </button>
        </Form.Label>
      </Col>
      <Col>
        <Form.Label>{`${firstName} ${lastName}`}</Form.Label>
      </Col>
      <Col>
        <Form.Label>{email}</Form.Label>
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
        <ParticipantStatus
          value={status}
          handleShowBC={() => handleShowBC(id)}
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
