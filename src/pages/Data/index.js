import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import CfKeyInspector from './CarbonVariablesDataDisplay';
import CfKeySelector from './CfKeySelector';
import Loading from '../../components/Loading';
import ParticipantDropdown from './ParticipantDropdown';
import SurveyVariablesDataSheet from './SurveyVariablesDataSheet';
import YearDropDown from './YearDropDown';
import {
  selectFootprintStructure,
  selectOneGlobalCarbonVariablesObject,
  selectParticipantsEntity,
  selectRounds,
} from '../../selectors/workshopSelector';
import {
  selectFootprintValue,
  selectOneCarbonVariablesObject,
  selectVariablesUsedInCfKey,
} from '../../selectors/carbonVariablesSelector';
import { selectSurveyVariablesGrid } from '../../selectors/surveyVariablesSelector';
import { useWorkshop } from '../../hooks/workshop';

const Data = ({
  match: {
    params: { workshopId },
  },
}) => {
  const workshop = useWorkshop(workshopId);
  const { loadError, isLoading } = workshop;
  const surveyVariablesGrid = useSelector((state) =>
    selectSurveyVariablesGrid(state)
  );

  const participants = useSelector((state) => selectParticipantsEntity(state));
  const years = useSelector((state) => selectRounds(state));
  const footprintStructure = useSelector((state) =>
    selectFootprintStructure(state)
  );

  const [participantId, setParticipantId] = useState(participants[0]);
  const [year, setYear] = useState(years[0]);
  const [selectedNode, setSelectedNode] = useState(footprintStructure);

  const footprintValue = useSelector(
    (state) => (selectedParticipantId, selectedYear, categoryName) =>
      selectFootprintValue(
        state,
        selectedParticipantId,
        selectedYear,
        categoryName
      )
  )(participantId, year, selectedNode.name);

  const globalCarbonVariables = useSelector((state) =>
    selectOneGlobalCarbonVariablesObject(state, year)
  );

  const variableNames = useSelector((state) =>
    selectVariablesUsedInCfKey(state, selectedNode.cfKey)
  );

  const carbonVariables = useSelector((state) =>
    selectOneCarbonVariablesObject(state, participantId, year)
  );

  return (
    <Loading loadError={loadError} isLoading={isLoading}>
      <SurveyVariablesDataSheet
        surveyVariablesGrid={surveyVariablesGrid}
        resetOpenNodesOnDataUpdate={false}
        hasSearch={false}
        isOpen={false}
      />

      <CfKeySelector
        footprintStructure={footprintStructure}
        selectedNode={selectedNode}
        setSelectedNode={setSelectedNode}
      />

      <ParticipantDropdown
        selectedParticipantId={participantId}
        participants={participants}
        setParticipantId={setParticipantId}
      />
      <YearDropDown selectedYear={year} years={years} setYear={setYear} />
      <CfKeyInspector
        footprintValue={footprintValue}
        carbonVariables={carbonVariables}
        globalCarbonVariables={globalCarbonVariables}
        variableNames={variableNames}
      />
    </Loading>
  );
};
export default Data;
