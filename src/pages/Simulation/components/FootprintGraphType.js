import FootprintGraph from './FootprintGraph';
import React from 'react';
import {
  footprintDataToGraph,
  globalAverageFootprint,
  participantFootprint,
  participantsAverageFootprint,
} from '../../../selectors/footprintSelectors';
import { pathOr } from 'ramda';
import { useSelector } from 'react-redux';

const filter_obj = (allowed, raw) => {
  const filtered = Object.keys(raw)
    .filter((key) => allowed.includes(key.toString()))
    .reduce((obj, key) => {
      obj[key] = raw[key];
      return obj;
    }, {});
  return filtered;
};

const FootprintGraphType = ({ type, participantId }) => {
  const footprintStructure = useSelector((state) =>
    pathOr([], ['workshop', 'result', 'model', 'footprintStructure'], state)
  );

  const currentRound = useSelector((state) =>
    pathOr(0, ['workshop', 'result', 'currentYear'], state)
  );

  const carbonFootprints = useSelector((state) =>
    pathOr({}, ['workshop', 'entities', 'carbonFootprints'], state)
  );
  const citizenFootprints = useSelector((state) =>
    pathOr({}, ['workshop', 'entities', 'citizenCarbonFootprints'], state)
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

  const currentCarbonFootprints =
    carbonFootprints &&
    filter_obj(participantsKeysCurrentRound, carbonFootprints);

  const currentCitizenFootprints =
    citizenFootprints &&
    filter_obj(citizensKeysCurrentRound, citizenFootprints);

  let carbonFootprint = {};
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
      // eslint-disable-next-line no-console
      console.log('Wrong FootprintGraph Type');
  }
  const footprintShaped =
    carbonFootprint && footprintDataToGraph(carbonFootprint);

  return <FootprintGraph footprint={footprintShaped} />;
};

export default FootprintGraphType;
