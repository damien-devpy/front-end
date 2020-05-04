import React from 'react';
import { useTranslation } from 'react-i18next';
import Footprint from './Footprint.js'
import { useWorkshop } from '../../../hooks/workshop';
import { useSelector, useDispatch } from 'react-redux';
import {validateRound} from '../../../actions/workshop.js'

const Workshop = (workshopId) => {
  const { t } = useTranslation();
  useWorkshop(workshopId)
  const dispatch = useDispatch()
  const participantIds = useSelector(state => {if (state.workshop.participants) {return state.workshop.participants.allIds} else return []})
  const year = 2020
  const yearTo = 2023
  return <div>
      <h1>{t('common.simulation')}</h1>
      <div>
        <button onClick={() => dispatch((validateRound(year)))}> Valider le tour {year} </button>
        {participantIds.map(participantId => <Footprint participantId={participantId} yearFrom={year}  yearTo={yearTo} />)}
        {/* <Footprint participantId={participantId} yearFrom={yearFrom}  yearTo={yearTo} /> */}
      </div>
    </div>;
};


export default Workshop;
