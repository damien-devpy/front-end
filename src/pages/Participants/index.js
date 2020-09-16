/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import Papa from 'papaparse';
import React, { useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import AddNewButton from '../../components/AddNewButton';
import AddParticipantModalForm from './components/AddParticipantModalForm';
import CardHeader from '../../components/CardHeader';
import CommonModal from '../../components/CommonModal';
import FootprintGraph from '../Simulation/components/FootprintGraph';
import Loading from '../../components/Loading';
import PrimaryButton from '../../components/PrimaryButton';
import computeCarbonVariables from '../../reducers/utils/bufferCarbonVariables';
import {
  ParticipantItemForm,
  ParticipantsHeader,
} from './components/NewParticipantItem';
import ParticipantsFootprintCards from "./components/ParticipantsFootprintCards"
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
import {
  footprintDataToGraph,
  normaliseEmissionValue,
} from '../../selectors/footprintSelectors';
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
  const { error, isLoading } = useWorkshop(workshopId);
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
    carbonFormUrl,
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
      setFootprintToShow({
        id,
        total: normaliseEmissionValue(footprint.value),
        footprint: footprintShaped,
      });
      setShowBC(true);
    });
  };

  const disableModifications = workshopStatus !== 'created';
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
          disabled={disableModifications}
        />
      );
    });

  return (
    <Loading error={error} isLoading={isLoading}>
      <Container>
        <h2 className="workshop-title">
          {workshopTitle}{' '}
          <a
            href={carbonFormUrl}
            title={t('manageParticipants.carbonForm')}
            className="badge badge-info float-right text-decoration-none"
          >
            <span className="emoji">&#x1F4C3;</span>
          </a>
        </h2>
        <Card
          className="p-5 border-light shadow-sm"
          style={{ borderRadius: 10 }}
        >
          <CardHeader>
            <h3>{t('manageParticipants.title')}</h3>

            <ParticipantsFootprintCards />
            <AddNewButton
              disabled={disableModifications}
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
              <Link to={`/workshop/${workshopId}/simulation`}>
                <PrimaryButton
                  onClick={() => dispatch(startWorkshop(2020))}
                  disabled={!isWorkshopReadyForInitialization}
                >
                  {t('common.launchSimulation')}
                </PrimaryButton>
              </Link>
            )}
            {workshopStatus === 'ongoing' && (
              <Link to={`/workshop/${workshopId}/simulation`}>
                <PrimaryButton>{t('common.continueSimulation')}</PrimaryButton>
              </Link>
            )}
          </div>
        </Card>
        {showBC && (
          <CommonModal
            size="md"
            centered
            show={showBC}
            handleClose={() => {
              setShowBC(false);
            }}
            title={t('manageParticipants.titleBCmodal', {
              name: participants[footprintToShow.id].firstName,
            })}
          >
            <h5>
              {t('manageParticipants.totalBC')} {footprintToShow.total}{' '}
              {t('manageParticipants.unitBC')}
            </h5>
            <FootprintGraph footprint={footprintToShow.footprint} />
          </CommonModal>
        )}
        <CommonModal
          size="md"
          centered
          show={showAddParticipantModal}
          handleClose={() => {
            setShowAddParticipantModal(false);
          }}
          title={t('manageParticipants.titleAddNewModal')}
        >
          <AddParticipantModalForm t={t} handleSubmit={handleAddParticipant} />
        </CommonModal>
      </Container>
    </Loading>
  );
};

export default ManageParticipants;
