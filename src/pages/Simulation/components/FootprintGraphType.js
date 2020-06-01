import React from 'react';
import { useSelector } from 'react-redux';
import {
  globalAverageFootprint,
  footprintDataToGraph,
  participantsAverageFootprint,
  participantFootprint,
} from '../../../selectors/footprintSelectors';
import FootprintGraph from './FootprintGraph';

const filter_obj = (allowed, raw) => {
  var filtered = Object.keys(raw)
    .filter((key) => allowed.includes(key))
    .reduce((obj, key) => {
      obj[key] = raw[key];
      return obj;
    }, {});
  return filtered;
};

const FootprintGraphType = ({ type, participantId }) => {
  console.log('type : ', type);
  const footprintStructure = useSelector(
    (state) => state.workshop.result.model.footprintStructure
  );
  const currentRound = useSelector(
    (state) => state.workshop.result && state.workshop.result.currentYear
  );

  console.log('Current Round : ', currentRound);
  const carbonFootprints = useSelector(
    (state) =>
      state.workshop.entities && state.workshop.entities.carbonFootprints
  );
  const keysCurrentRound = Object.keys(carbonFootprints).filter((key) =>
    key.toString().includes(currentRound.toString())
  );
  // const keysCurrentRound = useSelector(
  //   (state) =>
  //     state.workshop.result &&
  //     state.workshop.result.rounds &&
  //     state.workshop.result.rounds[currentRound]
  // );
  console.log('carbonFootprints : ', carbonFootprints);

  console.log('keysCurrentRound : ', keysCurrentRound);
  console.log('keys : ', Object.keys(carbonFootprints));

  const currentCarbonFootprints =
    carbonFootprints && filter_obj(keysCurrentRound, carbonFootprints);
  console.log('currentCarbonFootprints : ', currentCarbonFootprints);
  var carbonFootprint = footprintStructure;
  switch (type) {
    case 'participantsAverage':
      carbonFootprint = participantsAverageFootprint(
        currentCarbonFootprints,
        footprintStructure
      );
      break;

    case 'globalAverage':
      carbonFootprint = globalAverageFootprint(
        currentCarbonFootprints,
        footprintStructure
      );
      break;

    case 'participant':
      carbonFootprint = participantFootprint(
        currentCarbonFootprints,
        participantId,
        currentRound
      );
      break;

    default:
      console.log('Wrong FootprintGraph Type');
  }
  const footprintShaped =
    carbonFootprint && footprintDataToGraph(carbonFootprint);
  console.log(`${toString(type)} carbonFootprint : `, carbonFootprint);
  console.log(`${type} footprintShaped : `, footprintShaped);

  return <FootprintGraph footprint={footprintShaped} />;
};

export default FootprintGraphType;
