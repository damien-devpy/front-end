import React from 'react';

import FootprintGraph from './FootprintGraph';
import { footprintDataToGraph } from '../../../selectors/footprintSelectors';

const FootprintGraphType = ({ carbonFootprint, legend, width, aspect }) => {
  const footprintShaped =
    carbonFootprint && footprintDataToGraph(carbonFootprint);

  return (
    <FootprintGraph
      footprint={footprintShaped}
      legend={legend}
      width={width}
      aspect={aspect}
    />
  );
};

export default FootprintGraphType;
