// we receive values in kgs and convert them to tonnes,

import {
  selectCarbonFootprintsEntity,
  selectCitizenCarbonFootprintsEntity,
  selectCurrentWorkshopInfo,
  selectRoundConfigEntity,
  selectRoundsEntity,
  selectStartYear,
} from './workshopSelector';

const twoDigitRounded = (value) => parseFloat(value.toFixed(2));

// rounding to 2 decimal places
export const normaliseEmissionValue = (value) => Math.round(value / 10) / 100;

const averageFootprints = (footprints, initFootprint) => {
  const keysParticipant = Object.keys(footprints);
  const weight = 1 / keysParticipant.length;
  const footprintAverage = JSON.parse(JSON.stringify(initFootprint));

  keysParticipant.forEach((key) => {
    const element = footprints[key].footprint;
    if (element.value) {
      footprintAverage.value =
        (footprintAverage.value || 0) + element.value * weight;
    }
    element.children.forEach((sector, i) => {
      footprintAverage.children[i].value =
        (footprintAverage.children[i].value || 0) +
        Math.round(sector.value * weight);
      if (sector.children) {
        sector.children.forEach((categ, j) => {
          footprintAverage.children[i].children[j].value =
            (footprintAverage.children[i].children[j].value || 0) +
            Math.round(categ.value * weight);
        });
      }
    });
  });
  return footprintAverage;
};

export const weightedAverage = (
  participantAverage,
  citizenAverage,
  initFootprint,
  weightParticipant
) => {
  const globalAverage = JSON.parse(JSON.stringify(initFootprint));

  globalAverage.value =
    weightParticipant * participantAverage.value +
    (1 - weightParticipant) * citizenAverage.value;
  if (participantAverage.children) {
    participantAverage.children.forEach((sector, i) => {
      globalAverage.children[i].value = Math.round(
        weightParticipant * sector.value +
          (1 - weightParticipant) * citizenAverage.children[i].value
      );
      if (sector.children) {
        sector.children.forEach((categ, j) => {
          globalAverage.children[i].children[j].value = Math.round(
            (1 - weightParticipant) *
              citizenAverage.children[i].children[j].value +
              weightParticipant * categ.value
          );
        });
      }
    });
  }
  return globalAverage;
};

export const participantsAverageFootprint = (
  carbonFootprints,
  footprintStructure
) => {
  return averageFootprints(carbonFootprints, footprintStructure);
};

export const globalAverageFootprint = (
  carbonFootprints,
  citizenFootprints,
  footprintStructure
) => {
  // const nbParticipants = Object.keys(carbonFootprints).length;
  const initFootprint = JSON.parse(JSON.stringify(footprintStructure));
  const weightParticipant = 0.1;
  // const allFootprints = {};
  const participantAverage = averageFootprints(carbonFootprints, initFootprint);
  const citizenAverage = averageFootprints(citizenFootprints, initFootprint);
  const globalAverage = weightedAverage(
    participantAverage,
    citizenAverage,
    initFootprint,
    weightParticipant
  );
  return globalAverage;
};

export const participantFootprint = (
  carbonFootprints,
  participantId,
  currentRound
) => {
  const participantKey = `${toString(currentRound)}-${toString(participantId)}`;
  return carbonFootprints[participantKey].footprint;
};

export const footprintDataToGraph = (footprintData) => {
  const footprintArray = [];

  footprintData.children.forEach((sectorData) => {
    const sectorObject = { name: sectorData.name };
    sectorData.children.forEach((categData) => {
      sectorObject[categData.name] = normaliseEmissionValue(categData.value);
    });
    footprintArray.push(sectorObject);
  });
  return footprintArray;
};

export const computeEvolutionGraph = (
  roundsEntity,
  carbonFootprintsEntity,
  citizenFootprintsEntity,
  footprintStructure
) => {
  return Object.keys(roundsEntity).map((roundKey) => {
    const roundCarbonFootprints = {};
    const roundEntity = roundsEntity[roundKey];
    const carbonFootprintsPerYear = { year: roundEntity.year };
    const { carbonFootprints = [], citizenCarbonFootprints = [] } = roundEntity;
    carbonFootprints.forEach((carbonFootprintKey) => {
      roundCarbonFootprints[carbonFootprintKey] =
        carbonFootprintsEntity[carbonFootprintKey];
      const playerId = carbonFootprintsEntity[carbonFootprintKey].participantId;
      carbonFootprintsPerYear[playerId] = normaliseEmissionValue(
        carbonFootprintsEntity[carbonFootprintKey].footprint.value
      );
    });
    const roundCitizenFootprints = citizenCarbonFootprints.reduce(
      (accumulator, key) => ({
        ...accumulator,
        [key]: citizenFootprintsEntity[key],
      }),
      {}
    );
    carbonFootprintsPerYear.avg_participants = normaliseEmissionValue(
      participantsAverageFootprint(roundCarbonFootprints, footprintStructure)
        .value
    );
    carbonFootprintsPerYear.avg_global = normaliseEmissionValue(
      globalAverageFootprint(
        roundCarbonFootprints,
        roundCitizenFootprints,
        footprintStructure
      ).value
    );
    return carbonFootprintsPerYear;
  });
};
// var total footptints : récupérer les totaux ds footprint à partir de ceux du rounds
// var = {year: round.year, round.carbonFootprints.forEach(key=> key.split("-")[1]: state.carbonFootprints[key].footprint.value) }

const selectCarbonFootprintSum = (
  carbonFootprintIds,
  carbonFootprintsEntity
) => {
  const totalCarbonFootprint = carbonFootprintIds.reduce(
    (accumulator, carbonFootprintId) =>
      accumulator + carbonFootprintsEntity[carbonFootprintId].footprint.value,
    0
  );
  return normaliseEmissionValue(totalCarbonFootprint);
};

const selectWeightedCarbonFootprintAverage = (
  carbonFootprintSum,
  carbonFootprintPercentage,
  carbonFootprintLength,
  citizenCarbonFootprintSum,
  citizenCarbonFootprintLength
) =>
  twoDigitRounded(
    (carbonFootprintSum * carbonFootprintPercentage) /
      100 /
      carbonFootprintLength +
      (citizenCarbonFootprintSum * (100 - carbonFootprintPercentage)) /
        100 /
        citizenCarbonFootprintLength
  );

const selectCarbonFootprintIdsForParticipantId = (
  participantId,
  carbonFootprintIds,
  carbonFootprintsEntity
) =>
  carbonFootprintIds.filter(
    (carbonFootprintId) =>
      carbonFootprintsEntity[carbonFootprintId].participantId === participantId
  );
export const selectCarbonFootprintAveragesGroupByRounds = (state) => {
  const roundsEntity = selectRoundsEntity(state);
  const roundConfigEntity = selectRoundConfigEntity(state);
  const carbonFootprintsEntity = selectCarbonFootprintsEntity(state);
  const citizenCarbonFootprintsEntity = selectCitizenCarbonFootprintsEntity(
    state
  );
  const {
    rounds: roundIds = [],
    participants: participantIds,
  } = selectCurrentWorkshopInfo(state);
  return roundIds.map((roundId) => {
    const roundEntity = roundsEntity[roundId];
    const {
      year,
      roundConfig: roundConfigId,
      carbonFootprints: carbonFootprintIds,
      citizenCarbonFootprints: citizenCarbonFootprintIds,
    } = roundEntity;
    const { actionCardType, targetedYear } =
      roundConfigEntity[roundConfigId] || {};
    const carbonFootprintSum = selectCarbonFootprintSum(
      carbonFootprintIds,
      carbonFootprintsEntity
    );
    const citizenCarbonFootprintSum = selectCarbonFootprintSum(
      citizenCarbonFootprintIds,
      citizenCarbonFootprintsEntity
    );
    const participantFootprints = participantIds.reduce(
      (accumulator, participantId) => ({
        ...accumulator,
        [participantId]: selectCarbonFootprintSum(
          selectCarbonFootprintIdsForParticipantId(
            participantId,
            carbonFootprintIds,
            carbonFootprintsEntity
          ),
          carbonFootprintsEntity
        ),
      }),
      {}
    );
    return {
      year,
      actionCardType,
      targetedYear,
      ...participantFootprints,
      avgParticipants: twoDigitRounded(
        carbonFootprintSum / carbonFootprintIds.length
      ),
      avgCitizens: twoDigitRounded(
        citizenCarbonFootprintSum / citizenCarbonFootprintIds.length
      ),
      avgGlobal: selectWeightedCarbonFootprintAverage(
        carbonFootprintSum,
        10,
        carbonFootprintIds.length,
        citizenCarbonFootprintSum,
        citizenCarbonFootprintIds.length
      ),
    };
  });
};

export const selectCarbonFootprintReductionGroupByRounds = (state) => {
  const carbonFootprintAveragesGroupByRounds = selectCarbonFootprintAveragesGroupByRounds(
    state
  );
  return carbonFootprintAveragesGroupByRounds.reduce(
    (accumulator, carbonFootprintAveragesForRound, index) => {
      const {
        year,
        targetedYear,
        actionCardType,
        avgGlobal: avgGlobalCurrentRound,
        avgParticipants: avgParticipantsCurrentRound,
        avgCitizens: avgCitizensCurrentRound,
      } = carbonFootprintAveragesForRound;
      const carbonFootprintAveragesForNextRound =
        carbonFootprintAveragesGroupByRounds[index + 1];
      return carbonFootprintAveragesForNextRound
        ? [
            ...accumulator,
            {
              yearFrom: year,
              yearTo: targetedYear,
              actionCardType,
              avgGlobalReduction: twoDigitRounded(
                avgGlobalCurrentRound -
                  carbonFootprintAveragesForNextRound.avgGlobal
              ),
              avgParticipantsReduction: twoDigitRounded(
                avgParticipantsCurrentRound -
                  carbonFootprintAveragesForNextRound.avgParticipants
              ),
              avgCitizensReduction: twoDigitRounded(
                avgCitizensCurrentRound -
                  carbonFootprintAveragesForNextRound.avgCitizens
              ),
            },
          ]
        : accumulator;
    },
    []
  );
};

export const selectCarbonFootprintReductionGroupByPopulation = (state) => {
  const startYear = selectStartYear(state);
  const [
    carbonFootprintAveragesGroupByRounds = {},
  ] = selectCarbonFootprintAveragesGroupByRounds(state);
  const {
    avgGlobal = 0,
    avgParticipants = 0,
    avgCitizens = 0,
  } = carbonFootprintAveragesGroupByRounds;
  const carbonFootprintReductionGroupByRounds = selectCarbonFootprintReductionGroupByRounds(
    state
  );
  const initStructure = {
    participants: {
      name: 'participants',
      avgTotal: avgParticipants,
      avgIndividualReduction: 0,
      avgCollectiveReduction: 0,
    },

    citizens: {
      name: 'citizens',
      avgTotal: avgCitizens,
      avgIndividualReduction: 0,
      avgCollectiveReduction: 0,
    },

    global: {
      name: 'global',
      avgTotal: avgGlobal,
      avgIndividualReduction: 0,
      avgCollectiveReduction: 0,
    },
  };
  const carbonFootprintReductionGroupByPopulation = carbonFootprintReductionGroupByRounds.reduce(
    (accumulator, round) => {
      const {
        actionCardType,
        avgGlobalReduction,
        avgParticipantsReduction,
        avgCitizensReduction,
        yearTo,
      } = round;
      switch (actionCardType) {
        case 'individual': {
          return {
            ...accumulator,
            citizens: {
              ...accumulator.citizens,
              avgTotal: twoDigitRounded(
                accumulator.citizens.avgTotal - avgCitizensReduction
              ),
              avgIndividualReduction: twoDigitRounded(
                accumulator.citizens.avgIndividualReduction +
                  avgCitizensReduction
              ),
              year: yearTo,
            },
            participants: {
              ...accumulator.participants,
              avgTotal: twoDigitRounded(
                accumulator.participants.avgTotal - avgParticipantsReduction
              ),
              avgIndividualReduction: twoDigitRounded(
                accumulator.participants.avgIndividualReduction +
                  avgParticipantsReduction
              ),
              year: yearTo,
            },
            global: {
              ...accumulator.global,
              avgTotal: twoDigitRounded(
                accumulator.global.avgTotal - avgGlobalReduction
              ),
              avgIndividualReduction: twoDigitRounded(
                accumulator.global.avgIndividualReduction + avgGlobalReduction
              ),
              year: yearTo,
            },
          };
        }
        case 'collective': {
          return {
            ...accumulator,
            citizens: {
              ...accumulator.citizens,
              avgTotal: twoDigitRounded(
                accumulator.citizens.avgTotal - avgCitizensReduction
              ),
              avgCollectiveReduction: twoDigitRounded(
                accumulator.citizens.avgCollectiveReduction +
                  avgCitizensReduction
              ),
              year: yearTo,
            },
            participants: {
              ...accumulator.participants,
              avgTotal: twoDigitRounded(
                accumulator.participants.avgTotal - avgParticipantsReduction
              ),
              avgCollectiveReduction: twoDigitRounded(
                accumulator.participants.avgCollectiveReduction +
                  avgParticipantsReduction
              ),
              year: yearTo,
            },
            global: {
              ...accumulator.global,
              avgTotal: twoDigitRounded(
                accumulator.global.avgTotal - avgGlobalReduction
              ),
              avgCollectiveReduction: twoDigitRounded(
                accumulator.global.avgCollectiveReduction + avgGlobalReduction
              ),
              year: yearTo,
            },
          };
        }
        default: {
          return accumulator;
        }
      }
    },
    initStructure
  );

  return {
    participants: [
      { name: 'participants', year: startYear, avgTotal: avgParticipants },
      carbonFootprintReductionGroupByPopulation.participants,
    ],
    citizens: [
      { name: 'citizens', year: startYear, avgTotal: avgCitizens },
      carbonFootprintReductionGroupByPopulation.citizens,
    ],
    global: [
      { name: 'global', year: startYear, avgTotal: avgGlobal },
      carbonFootprintReductionGroupByPopulation.global,
    ],
  };
};
