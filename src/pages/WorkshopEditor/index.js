import Ajv from 'ajv';
import React from 'react';

import DataEditor from '../../components/DataEditor';
import Loading from '../../components/Loading';
import { denormalizeWorkshopWithoutClean } from '../../utils/api';
import { useWorkshop } from '../../hooks/workshop';

const Data = ({
  match: {
    params: { workshopId },
  },
}) => {
  const workshop = useWorkshop(workshopId);
  const { loadError, isLoading } = workshop;
  const denormalizedWorkshop = denormalizeWorkshopWithoutClean(workshop);
  const ajv = new Ajv({ allErrors: true, verbose: true });

  return (
    <Loading loadError={loadError} isLoading={isLoading}>
      <DataEditor
        data={denormalizedWorkshop}
        // onChange={this.handleChange}
        ajv={ajv}
      />
    </Loading>
  );
};
export default Data;
