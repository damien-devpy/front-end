import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { COLORS, FONT } from '../../vars';
import { ParticipantStatus } from './Status'
import { Form, Row, Col } from 'react-bootstrap';
import { useState } from 'react'

export const ParticipantItemForm = ({
  id,
  firstName,
  lastName,
  initEmail,
  persona,
  status,
  isActive,
  isValid,
  onClick,
  updateParticipant,
}) => {

  const handleItemClick = (e) => {
    e.stopPropagation();
    onClick(id);
  };

  const [name, setName] = useState(firstName && lastName && firstName + " " + lastName);
  const [email, setEmail] = useState(initEmail);

  const isValidName = () => {
    return name && name.split(/ /).length > 1 && name.split(/ /)[1]
  };

  const isValidEmail = () => {
    return email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onBlur = (e) => {
    updateParticipant(id, name, email, isValidName() && isValidEmail())
  };

  return (
    <Row onClick={handleItemClick} id={"participant" + id} className="align-items-center">
      <Col xs="1" className="text-center">
        <Form.Label>{isActive ? <a href="#" title="Remove participant" className="badge lg">&#x1f5d1;</a> : ""}</Form.Label></Col>
      <Col>
        {/* <Form.Group> */}
        <Form.Control plaintext={!isActive} readOnly={!isActive} value={name}
          validated={isActive}
          // isValid={!isNotValidName()}
          isInvalid={!isValidName()}
          onChange={onChangeName}
          onBlur={onBlur}
          required />          
        {/* <Form.Control.Feedback type="invalid">Please fill in</Form.Control.Feedback> */}
        {/* </Form.Group> */}
      </Col>
      <Col>
        <Form.Control plaintext={!isActive} readOnly={!isActive} value={email}
          validated={isActive}
          isInvalid={!isValidEmail()}
          onChange={onChangeEmail}
          onBlur={onBlur}
          required />
        {/* <Form.Control.Feedback type="invalid">Please fill in</Form.Control.Feedback> */}
      </Col>
      <Col md="2">
        <Persona isActive={isActive} />
      </Col>      
      <Col className="text-center" onClick={(e) => {e.stopPropagation(); e.preventDefault();}}>
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
      <Col xs="1" className="text-center"></Col>
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

const Persona = ({ isActive }) => {
  const { t } = useTranslation();

  return (
    <Form.Control as="select" placeholder="Choose..." readOnly={!isActive} size="sm" id="dropdown" name="persona" disabled={!isActive}>
      <option value="N/A">None</option>
      <option value="1">Alice Merryweiser</option>
      <option value="2">John</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </Form.Control>);
}

export const StyledRow = styled.div`
  cursor: pointer;
  background-color: ${COLORS.WHITE};
  // display: flex;          display: -webkit-flex;
  // flex-direction: row;    -webkit-flex-direction: row;
  // flex-wrap: no-wrap;     -webkit-flex-wrap: no-wrap;
  //padding-left: 15px;
  //padding-right: 15px;
`;

const StyledHeaderRow = styled.div`
  background-color: ${COLORS.GRAY.LIGHT};
  margin-top: 10px;
  margin-bottom: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const StyledItem = styled.div`
  background-color: ${COLORS.WHITE};
  // display: flex;           display: -webkit-flex;
  // flex-direction: row;     -webkit-flex-direction: row;
  // flex: 1;            -webkit-flex: 1;
  // margin: auto 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  padding-left: 0px;
  padding-right: 0px;
  // border:2px solid ${COLORS.AQUA.DARK};
`;

const StyledName = styled(StyledItem)``;
const StyledEmail = styled(StyledItem)``;
const StyledPersona = styled(StyledItem)``;
const StyledStatus = styled(StyledItem)``;

const StyledHeaderItem = styled(StyledItem)`
  background-color: ${COLORS.GRAY.LIGHT};
  // border:2px solid ${COLORS.AQUA.DARK};
`;

