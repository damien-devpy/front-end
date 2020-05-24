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
  var footprintAverage = footprintStructure;
  keysParticipant.forEach((key) => {
    element = footprints[key].footprint;
    // const reducer = (footprintAverage, element, index) => {
    footprintAverage.value =
      (footprintAverage.value || 0) + element.value / nbParticipants;
    element.children.forEach((sector, i) => {
      footprintAverage.children[i].value =
        (footprintAverage.children[i].value || 0) +
        Math.round(sector.value / nbParticipants);

      if (sector.children) {
        sector.children.forEach((categ, j) => {
          footprintAverage.children[i].children[j].value =
            (footprintAverage.children[i].children[j].value || 0) +
            Math.round(categ.value / nbParticipants);
        });
      }
    });
  });

  console.log('footprintAverage : ', footprintAverage);
  return footprintAverage;
};

export const participantsAverageFootprint = (
  carbonFootprints,
  footprintStructure
) => {
  //need to remove OTHERS :  carbonFootprints.filter(key!="others")

  return averageFootprints(carbonFootprints, footprintStructure);
};
export const globalAverageFootprint = (
  carbonFootprints,
  footprintStructure
) => {
  // const currentRound = (state) => state.workshop.result.currentYear;
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

export const footprintDataToEvolutionGraph = (footprints) => {
  // var rounds =  ALLER VOIR A LA PARTIE ROUNDS DU STATE POUR RECUPERER LES IDS DU ROUNDS;
  // var total footptints : récupérer les totaux ds footprint à partir de ceux du rounds
  // var = {year: round.year, round.carbonFootprints.forEach(key=> key.split("-")[1]: state.carbonFootprints[key].footprint.value) }
  var evolutionObject = [];
  Object.keys(footprints).forEach((key) =>
    evolutionObject.push({
      year: key.split('-')[0],
      participantId: key.split('-')[1],
      value: footprints[key].footprint.value,
    })
  );
  evolutionObject = groupBy(evolutionObject, (e) => e.year);
};
function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}
