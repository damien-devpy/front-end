import React from 'react';
import { useSelector } from 'react-redux';
import {
  globalAverageFootprint
  footprintDataToGraph,
  currentRound,
} from '../../../selectors/footprintSelectors';
import FootprintGraph from './FootprintGraph';

const SpecialFootprintGraph = (type, participantId) => {
    switch (type){
        case "participantAverage":
            const carbonFootprint = useSelector(state => globalAverageFootprint(state));

        case "globalAverage":
            const carbonFootprint = useSelector(state => globalAverageFootprint(state));

        case "participant":
            const carbonFootprint = useSelector(state => participantFootprint(state, participantId));
            
    }
  return(  <FootprintGraph footprint={carbonFootprint} />
    );
};
