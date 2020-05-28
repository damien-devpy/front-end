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

const averageFootprints = (footprints, footprintStructure) => {
  const keysParticipant = Object.keys(footprints);
  console.log('footprints[key]', footprints[keysParticipant[0]]);

  const nbParticipants = keysParticipant.length;
  var element;
  var footprintAverage = JSON.parse(JSON.stringify(footprintStructure));
  footprintAverage['value'] = 0;

  keysParticipant.forEach((key) => {
    element = footprints[key].footprint;
    footprintAverage['value'] =
      (footprintAverage.value || 0) + element.value / nbParticipants;

    element.children.forEach((sector, i) => {
      footprintAverage.children[i]['value'] =
        (footprintAverage.children[i].value || 0) +
        Math.round(sector.value / nbParticipants);
      // var sectorAverage = { name: '', value: 0 };
      // sectorAverage.value = sectorAverage.value + Math.round(sector.value / nbParticipants);
      // sectorAverage['name'] = sector.name;
      // sectorAverage['children'] = [];
      if (sector.children) {
        // var categAverage = { name: '', value: 0 };
        sector.children.forEach((categ, j) => {
          // categAverage.value =
          //   categAverage.value + Math.round(categ.value / nbParticipants);
          // categAverage.name = categ.name;
          footprintAverage.children[i].children[j]['value'] =
            (footprintAverage.children[i].children[j].value || 0) +
            Math.round(categ.value / nbParticipants);
          // sectorAverage.children.push(categAverage);
        });
      }
      // footprintAverage.children.push(sectorAverage);
    });
  });

  console.log('footprintAverage : ', footprintAverage);
  return footprintAverage;
};

export const participantsAverageFootprint = (
  carbonFootprints,
  footprintStructure
) => {
  const participantsKeys = Object.keys(carbonFootprints).filter(
    (key) => key != 'citizen'
  );
  const participantsFootprint = carbonFootprints; //participantsKeys

  return averageFootprints(participantsFootprint, footprintStructure);
};
export const globalAverageFootprint = (
  carbonFootprints,
  footprintStructure
) => {
  return averageFootprints(carbonFootprints, footprintStructure);
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

export const computeEvolutionGraph = (rounds, carbonFootprints) => {
  var evolutionData = [];
  var obj = {};
  var player;
  //rounds = state.workshop.entities.rounds
  // carbonFootprints = state.workshop.entities.carbonFootprints
  Object.keys(rounds).forEach((year) => {
    obj = {};
    obj['year'] = rounds[year].year;
    rounds[year].carbonFootprints.forEach((key) => {
      player = key.split('-')[1];
      obj[player] = carbonFootprints[key].footprint.value.toFixed(0);
    });
    evolutionData.push(obj);
  });
  return evolutionData;
};
// var total footptints : récupérer les totaux ds footprint à partir de ceux du rounds
// var = {year: round.year, round.carbonFootprints.forEach(key=> key.split("-")[1]: state.carbonFootprints[key].footprint.value) }
