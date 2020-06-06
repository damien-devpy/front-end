const avg = (array) => {
  var sum = 0;
  for (var i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum / array.length;
};

export const currentRound = (state) =>
  state.workshop.result && state.workshop.result.currentYear;

// const footprintStructure = (state) => state.workshop.model.footprintStructure;

const averageFootprints = (footprints, initFootprint) => {
  const keysParticipant = Object.keys(footprints);
  console.log('footprints[key]', footprints[keysParticipant[0]]);

  var weight = 1 / keysParticipant.length;

  var element;
  var footprintAverage = JSON.parse(JSON.stringify(initFootprint));

  keysParticipant.forEach((key) => {
    element = footprints[key].footprint;
    footprintAverage['value'] =
      (footprintAverage.value || 0) + element.value * weight;

    element.children.forEach((sector, i) => {
      footprintAverage.children[i]['value'] =
        (footprintAverage.children[i].value || 0) +
        Math.round(sector.value * weight);
      // var sectorAverage = { name: '', value: 0 };
      // sectorAverage.value = sectorAverage.value + Math.round(sector.value * weight);
      // sectorAverage['name'] = sector.name;
      // sectorAverage['children'] = [];
      if (sector.children) {
        // var categAverage = { name: '', value: 0 };
        sector.children.forEach((categ, j) => {
          // categAverage.value =
          //   categAverage.value + Math.round(categ.value * weightParticipant);
          // categAverage.name = categ.name;
          footprintAverage.children[i].children[j]['value'] =
            (footprintAverage.children[i].children[j].value || 0) +
            Math.round(categ.value * weight);
          // sectorAverage.children.push(categAverage);
        });
      }
      // footprintAverage.children.push(sectorAverage);
    });
  });

  console.log('footprintAverage : ', footprintAverage);
  return footprintAverage;
};

export const weightedAverage = (
  participantAverage,
  citizenAverage,
  initFootprint,
  weightParticipant
) => {
  console.log('participantAverage : ', participantAverage);
  console.log('citizenAverage : ', citizenAverage);

  var globalAverage = JSON.parse(JSON.stringify(initFootprint));
  globalAverage['value'] =
    weightParticipant * participantAverage.value +
    (1 - weightParticipant) * citizenAverage.value;
  participantAverage.children.forEach((sector, i) => {
    globalAverage.children[i]['value'] = Math.round(
      weightParticipant * sector.value +
        (1 - weightParticipant) * citizenAverage.children[i].value
    );
    if (sector.children) {
      sector.children.forEach((categ, j) => {
        globalAverage.children[i].children[j]['value'] = Math.round(
          (1 - weightParticipant) *
            citizenAverage.children[i].children[j].value +
            weightParticipant * categ.value
        );
      });
    }
  });
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
  const nbParticipants = Object.keys(carbonFootprints).length;

  const weightParticipant = 0.1;
  var allFootprints = {};

  const participantAverage = averageFootprints(
    carbonFootprints,
    footprintStructure
  );

  const citizenAverage = averageFootprints(
    citizenFootprints,
    footprintStructure
  );

  const globalAverage = weightedAverage(
    participantAverage,
    citizenAverage,
    footprintStructure,
    weightParticipant
  );
  console.log('globalAverage', globalAverage);

  return globalAverage;
};

export const participantFootprint = (
  carbonFootprints,
  participantId,
  currentRound
) => {
  const participantKey = toString(currentRound) + '-' + toString(participantId);
  return carbonFootprints[participantKey].footprint;
};

export const footprintDataToGraph = (footprintData) => {
  var footprintArray = [];

  footprintData.children.forEach((sectorData) => {
    var sectorObject = { name: sectorData.name };
    sectorData.children.forEach(
      (categData) => (sectorObject[categData.name] = categData.value)
    );
    footprintArray.push(sectorObject);
  });
  return footprintArray;
};

export const computeEvolutionGraph = (
  rounds,
  carbonFootprints,
  citizenFootprints,
  footprintStructure
) => {
  var evolutionData = [];
  var obj = {};
  var player;
  //rounds = state.workshop.entities.rounds
  // carbonFootprints = state.workshop.entities.carbonFootprints
  Object.keys(rounds).forEach((year) => {
    obj = {};
    obj['year'] = rounds[year].year;
    var roundCarbonFootprints = {};
    var roundCitizenFootprints = {};

    rounds[year].carbonFootprints.forEach((key) => {
      roundCarbonFootprints[key] = carbonFootprints[key];
      player = key.split('-')[1];
      obj[player] = carbonFootprints[key].footprint.value.toFixed(0);
    });

    rounds[year].citizenCarbonFootprints.forEach(
      (key) => (roundCitizenFootprints[key] = citizenFootprints[key])
    );

    obj['avg_participants'] = participantsAverageFootprint(
      roundCarbonFootprints,
      footprintStructure
    ).value.toFixed(0);
    obj['avg_global'] = globalAverageFootprint(
      roundCarbonFootprints,
      roundCitizenFootprints,
      footprintStructure
    ).value.toFixed(0);
    evolutionData.push(obj);
  });
  return evolutionData;
};
// var total footptints : récupérer les totaux ds footprint à partir de ceux du rounds
// var = {year: round.year, round.carbonFootprints.forEach(key=> key.split("-")[1]: state.carbonFootprints[key].footprint.value) }
