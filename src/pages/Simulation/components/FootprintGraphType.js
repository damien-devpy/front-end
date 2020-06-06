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
    .filter((key) => allowed.includes(key.toString()))
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
  const citizenFootprints = useSelector(
    (state) =>
      state.workshop.entities && state.workshop.entities.citizenCarbonFootprints
  );

  const participantsKeysCurrentRound = Object.keys(
    carbonFootprints
  ).filter((key) => key.includes(currentRound.toString()));
  const citizensKeysCurrentRound = Object.keys(
    citizenFootprints
  ).filter((key) => key.includes(currentRound.toString()));
  // const keysCurrentRound = useSelector(
  //   (state) =>
  //     state.workshop.result &&
  //     state.workshop.result.rounds &&
  //     state.workshop.result.rounds[currentRound]
  // );

  console.log('keys : ', Object.keys(carbonFootprints));

  const currentCarbonFootprints =
    carbonFootprints &&
    filter_obj(participantsKeysCurrentRound, carbonFootprints);
  console.log('currentCarbonFootprints : ', currentCarbonFootprints);

  const currentCitizenFootprints =
    citizenFootprints &&
    filter_obj(citizensKeysCurrentRound, citizenFootprints);

  console.log('currentCitizenFootprints', currentCitizenFootprints);

  var carbonFootprint = {};
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
        currentCitizenFootprints,
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
