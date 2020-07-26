import React from 'react';

import FootprintGraph from './FootprintGraph';
import { footprintDataToGraph } from '../../../selectors/footprintSelectors';

const FootprintGraphType = ({ carbonFootprint }) => {
  const footprintShaped =
    carbonFootprint && footprintDataToGraph(carbonFootprint);

  return <FootprintGraph footprint={footprintShaped} />;
};

export default FootprintGraphType;
