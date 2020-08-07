import 'jsoneditor-react/es/editor.min.css';
import Ajv from 'ajv';
import React from 'react';
import { JsonEditor as Editor } from 'jsoneditor-react';
import { useSelector } from 'react-redux';

import Loading from '../../components/Loading';
import { denormalizeWorkshopWithoutClean } from '../../utils/api';
import {
  selectRoundsEntity,
  selectVariableFormulasStructure,
} from '../../selectors/workshopSelector';
import { useWorkshop } from '../../hooks/workshop';

const Model = ({
  match: {
    params: { workshopId },
  },
}) => {
  const workshop = useWorkshop(workshopId);
  const { loadError, isLoading } = workshop;
  const denormalizedWorkshop = denormalizeWorkshopWithoutClean(workshop);
  // const variableFormulas = useSelector(selectVariableFormulasStructure);
  // const rounds = useSelector(selectRoundsEntity);
  const ajv = new Ajv({ allErrors: true, verbose: true });

  return (
    <Loading loadError={loadError} isLoading={isLoading}>
      <Editor
        // value={variableFormulas}
        // value={rounds}
        value={denormalizedWorkshop}
        // onChange={this.handleChange}
        ajv={ajv}
        // schema={schema}
      />
    </Loading>
  );
};

export default Model;
