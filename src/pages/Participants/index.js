/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Spinner, Container, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { COLORS } from '../../vars';
import { useParticipants } from '../../hooks/participants';
import { usePersonas } from '../../hooks/personas';
import NavbarHome from '../../components/NavbarHome';

import { setParticipantNameEmail, addParticipant, deleteParticipant } from '../../actions/participants';

import { ParticipantItemForm, ParticipantsHeader } from './components/ParticipantItemForm';

const ManageParticipants = () => {
  const { t } = useTranslation();

  const { participants, isLoading, loadError } = useParticipants();
  const { personas } = usePersonas();
  const dispatch = useDispatch();

  // keep track of actived rows globally
  const [active, setActive] = useState({});

  // by default only rows that are missing required info are active
  const initActive = () => Object.assign({}, ...participants.allIds.map(
    (i) => ({ [i]: !participants.byId[i].isValid }),
  ));

  // update all rows only when the participants are added or deleted
  useEffect(() => {
    console.log('Use effect CONTAINER');
    participants && setActive(initActive(participants));
  }, [participants && participants.allIds]);

  const handleClick = (id) => {
    // if previously another row was activated because it was clicked, it will not be now
    // unless it misses required info
    console.log('On CLICK row', id);
    const newActive = Object.assign({}, ...participants.allIds.map(
      (i) => ({ [i]: !participants.byId[i].isValid }),
    ));
    id && (newActive[id] = true);
    setActive(newActive);
  };

  const participantItems = [];

  participants && personas && participants.allIds.forEach((id) => {
    const p = participants.byId[id];
    participantItems.push(<ParticipantItemForm
      id={id}
      firstName={p.firstName}
      lastName={p.lastName}
      initEmail={p.email}
      status={p.status}
      key={id}
      updateParticipant={(name, email, persona, valid) => {
        dispatch(setParticipantNameEmail(id, name, email, persona, valid));
      }}
      deleteParticipant={() => {
        dispatch(deleteParticipant(id));
      }}
      isActive={active[id]}
      isValid={p.isValid}
      handleClick={handleClick}
      personas={personas}
      currentPersonaId={p.personaId}
    />);
  });

  // outer container to be able to handle clicks outside the rows, i.e. "lose focus" type of events
  return (
    <Container>
      <NavbarHome />
      <Card
        className="p-5 border-light shadow-sm"
        style={{ borderRadius: 10 }}
        onClick={(e) => handleClick(null)}
      >
        <h2>{t("common.participants")}</h2>
        <hr />

        {loadError && <p>Error</p>}
        {isLoading && <Spinner animation="border" />}
        <ParticipantsHeader />
        {participantItems}
        <AddParticipant dispatchAddEvent={() => {
          dispatch(addParticipant());
        }}
        />
      </Card>
    </Container>
  );
};

const AddParticipant = ({ dispatchAddEvent }) => {
  const { t } = useTranslation();

  return (
    <StyledAdd onClick={dispatchAddEvent}>
      &#x2295;
      {' '}
      {t('manageParticipants.addNew')}
    </StyledAdd>
  );
};

export const StyledAdd = styled.div`
  background-color: ${COLORS.WHITE};
  margin-top: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 5px;
  padding-left: 10px;
  border:2px dashed ${COLORS.GRAY.LIGHT};
`;

export default ManageParticipants;
