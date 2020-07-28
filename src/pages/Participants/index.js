/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import Papa from 'papaparse';
import React, { useState } from 'react';
import { Card, Container, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AddNewButton from '../../components/AddNewButton';
import AddParticipantModalForm from './components/AddParticipantModalForm';
import CardHeader from '../../components/CardHeader';
import FootprintGraph from '../Simulation/components/FootprintGraph';
import PrimaryButton from '../../components/PrimaryButton';
import computeCarbonVariables from '../../reducers/utils/bufferCarbonVariables';
import {
  ParticipantItemForm,
  ParticipantsHeader,
} from './components/NewParticipantItem';
import {
  addParticipant,
  deleteParticipant,
  setParticipantPersona,
} from '../../actions/participants';
import {
  changeParticipantApi,
  createParticipantApi,
  deleteParticipantApi,
  sendFormApi,
} from '../../utils/api';
import { computeFootprint, valueOnAllLevels } from '../../reducers/utils/model';
import { footprintDataToGraph } from '../../selectors/footprintSelectors';
import {
  selectCarbonFootprintsEntity,
  selectCurrentWorkshopInfo,
  selectInitialGlobalCarbonVariables,
  selectIsCurrentWorkshopSynchronized,
  selectIsWorkshopReadyForInitialization,
  selectParticipantsEntity,
  selectPersonaEntity,
} from '../../selectors/workshopSelector';
import { startWorkshop } from '../../actions/workshop';
import { throwError } from '../../actions/errors';
import { useWorkshop } from '../../hooks/workshop';

export const loadHeatingNetworksData = async () => {
  const response = await fetch('/data/heat_networks.csv');
  const text = await response.text();
  const heatingNetworksData = Papa.parse(text, { header: true });
  return heatingNetworksData.data;
};

const ManageParticipants = ({
  match: {
    params: { workshopId },
  },
}) => {
  const workshop = useWorkshop(workshopId);
  const isWorkshopReadyForInitialization = useSelector(
    selectIsWorkshopReadyForInitialization
  );
  const [showBC, setShowBC] = useState(false);
  const [showAddParticipantModal, setShowAddParticipantModal] = useState(false);
  const [footprintToShow, setFootprintToShow] = useState({});

  const isSynchronized = useSelector(selectIsCurrentWorkshopSynchronized);
  const {
    name: workshopTitle,
    status: workshopStatus,
    startYear,
    model,
  } = useSelector(selectCurrentWorkshopInfo);

  const { t } = useTranslation();
  const participants = useSelector(selectParticipantsEntity);
  const carbonFootprints = useSelector(selectCarbonFootprintsEntity);
  const globalCarbonVariables = useSelector(selectInitialGlobalCarbonVariables);

  const personas = useSelector(selectPersonaEntity);

  const dispatch = useDispatch();

  const createAsyncParticipant = (values) => (dispatchThunk) => {
    createParticipantApi({ workshopId, data: values })
      .then((data) => dispatchThunk(addParticipant(data)))
      .catch(() => {
        dispatchThunk(
          throwError(
            t('errors.createParticipant', {
              participantName: '',
            })
          )
        );
      });
  };
  const handleAddParticipant = (values) => {
    dispatch(createAsyncParticipant(values));
    // triggers rerendering
    setShowAddParticipantModal(false);
  };

  const sendFormAsync = (participantId) => (dispatchThunk) => {
    sendFormApi({ workshopId, participantId }).catch(() => {
      dispatchThunk(
        throwError(
          t('errors.sendForm', {
            participantId,
          })
        )
      );
    });
  };
  const handleSendForm = (participantId) => {
    console.log('Send form participant', participantId);
    dispatch(sendFormAsync(participantId));
  };

  const deleteAsyncParticipant = (participantId) => (dispatchThunk) => {
    deleteParticipantApi({ workshopId, participantId })
      .then(() => {
        dispatchThunk(deleteParticipant(participantId));
      })
      .catch(() => {
        dispatchThunk(
          throwError(
            t('errors.deleteParticipant', {
              // workshopName: selectWorkshopById(workshops, workshopId).name,
            })
          )
        );
      });
  };
  const handleDelete = (participantId) => {
    dispatch(deleteAsyncParticipant(participantId));
  };

  const changeAsyncParticipant = (participantId, personaId) => (
    dispatchThunk
  ) => {
    changeParticipantApi({ data: { workshopId, participantId, personaId } })
      .then((data) =>
        dispatchThunk(
          setParticipantPersona(
            data.id,
            data.personaId,
            data.status,
            data.surveyVariables
          )
        )
      )
      .catch(() => {
        dispatchThunk(
          throwError(
            t('errors.changeParticipant', {
              participantName: '',
            })
          )
        );
      });
  };
  const handleChangePersona = (participantId, personaId) => {
    dispatch(changeAsyncParticipant(participantId, personaId));
  };

  const handleShowBC = (id) => {
    // ideally
    // 1. carbon variables should be pre-computed for each persona
    // 2. add higher-level function where
    // valueOnAllLevels & computeFootprint are put together and
    // input variables are simplified, e.g. could be given as `model`
    loadHeatingNetworksData().then((heatingNetworksData) => {
      console.log(heatingNetworksData, globalCarbonVariables);
      const { footprintStructure, variableFormulas } = model;
      const footprint = participants[id].personaId
        ? valueOnAllLevels(
            computeFootprint(
              footprintStructure,
              variableFormulas,
              computeCarbonVariables(
                personas[participants[id].personaId].surveyVariables,
                globalCarbonVariables,
                heatingNetworksData
              ),
              globalCarbonVariables
            )
          )
        : carbonFootprints[`${startYear}-${id}`].footprint;

      // 3. footprintDataToGraph should be part of FootprintGraph
      const footprintShaped = footprintDataToGraph(footprint);
      setFootprintToShow(footprintShaped);
      setShowBC(true);
    });
  };

  const participantItems = [];

  participants &&
    personas &&
    Object.keys(participants).forEach((id) => {
      const p = participants[id];
      console.log('Rerender participants', p);
      participantItems.push(
        <ParticipantItemForm
          key={id}
          id={id}
          firstName={p.firstName}
          lastName={p.lastName}
          email={p.email}
          status={p.status}
          updateParticipant={(persona) => {
            handleChangePersona(id, persona);
          }}
          deleteParticipant={() => handleDelete(id)}
          personas={personas}
          currentPersonaId={p.personaId}
          handleShowBC={handleShowBC}
          handleSendForm={handleSendForm}
        />
      );
    });

  return (
    <Container>
      <h2 className="workshop-title">{workshopTitle}</h2>
      <Card className="p-5 border-light shadow-sm" style={{ borderRadius: 10 }}>
        <CardHeader>
          <h3>{t('manageParticipants.title')}</h3>
          <AddNewButton
            onClick={() => {
              setShowAddParticipantModal(true);
            }}
          >
            {t('manageParticipants.addNew')}
          </AddNewButton>
        </CardHeader>
        <hr />

        <div className="container">
          <ParticipantsHeader />
          {participantItems}
          <hr />
        </div>
        <div style={{ textAlign: 'center' }}>
          {isSynchronized && workshopStatus === 'created' && (
            <PrimaryButton
              onClick={() => dispatch(startWorkshop(2020))}
              disabled={!isWorkshopReadyForInitialization}
            >
              {t('common.launchSimulation')}
            </PrimaryButton>
          )}
          {workshopStatus === 'ongoing' && (
            <Link to={`/workshop/${workshopId}/simulation`}>
              <PrimaryButton>{t('common.continueSimulation')}</PrimaryButton>
            </Link>
          )}
        </div>
      </Card>
      <Modal
        size="md"
        centered
        show={showBC}
        onHide={() => {
          setShowBC(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Bilan carbone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FootprintGraph footprint={footprintToShow} />
        </Modal.Body>
      </Modal>
      <Modal
        size="md"
        centered
        show={showAddParticipantModal}
        onHide={() => {
          setShowAddParticipantModal(false);
        }}
      >
        <Modal.Body>
          <AddParticipantModalForm t={t} handleSubmit={handleAddParticipant} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ManageParticipants;
