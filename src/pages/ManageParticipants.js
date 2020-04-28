import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { COLORS, FONT } from '../vars';
import { Form } from 'react-bootstrap';

import { setParticipantNameEmail, addParticipant } from '../actions/participants';

import { ParticipantItemForm, ParticipantsHeader } from '../components/manage_participants/ParticipantItemForm'

const ManageParticipants = ({ state, actions }) => {

    // keep track of actived rows globally 
    const [active, setActive] = useState({});

    const initActive = (state) => {
        // by default only rows that are missing required info are active
        return Object.assign({}, ...state.participants.allIds.map(
            id_ => ({ [id_]: !state.participants.byId[id_].isValid })))
    }

    useEffect(() => {
        setActive(initActive(state));
    }, [state])

    const onClick = (id) => {
        // if previously another row was activated because it was clicked it will not be now
        // (unless it misses required info)
        let active_ = Object.assign({}, ...state.participants.allIds.map(
            id_ => ({ [id_]: !state.participants.byId[id_].isValid })));
        active_[id] = true;
        setActive(active_);
    }

    const participantItems = [];
    Object.keys(state.participants.byId).forEach((id) => {
        let p = state.participants.byId[id];
        participantItems.push(<ParticipantItemForm
            id={id}
            firstName={p.firstName}
            lastName={p.lastName}
            initEmail={p.email}
            status={p.status}
            key={id}
            updateParticipant={actions.onEditNameEmail}
            isActive={active[id]}
            isValid={p.isValid}
            onClick={onClick}
        />);
    });

    return <div className="container">
        <Form>
            <ParticipantsHeader />
            {participantItems}
        </Form>
        <AddParticipant onAddNew={actions.onAddNew} />
    </div>;
};

const StyledParticipants = styled.div`
  margin: 10px 0;
`;

const AddParticipant = ({ onAddNew }) => {
    const { t } = useTranslation();

    return <StyledAdd onClick={(e) => (onAddNew())}>
        &#x2295; {t('manageParticipants.addNew')}
    </StyledAdd>
}

export const StyledAdd = styled.div`
  background-color: ${COLORS.WHITE};
  margin-top: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 5px;
  padding-left: 10px;
  border:2px dashed ${COLORS.GRAY.LIGHT};
`;

const mapStateToProps = (state) => ({
    state: state
});

const mapDispatchToProps = (dispatch) => ({
    actions: {
        onEditNameEmail: (id, name, email, valid) => {
            dispatch(setParticipantNameEmail(id, name, email, valid))
        },
        onAddNew: () => {
            dispatch(addParticipant());
        }
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ManageParticipants);

