const avg = (array) => {
  var sum = 0;
  for (var i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum / array.length;
};

export const currentRound = (state) => state.workshop.result.currentYear;

const participantsAverageFootprint = (footprints) => {};
const footprintStructure = (state) => {
  state.workshop.model.footprintStructure;
};

const averageFootprints = (footprints) => {
  const initFootprint = { avg: footprintStructure };
  const nbParticipants = footprints.length;
  const keysParticipant = Object.keys(footprints);
  const reducer = (acc, element, index) => {
    acc.avg.value =
      (acc.avg.value || 0) +
      element[keysParticipant[index]].value / nbParticipants;
    element[keysParticipant[index]].children.forEach((sector, i) => {
      acc.avg.children[i].value =
        (acc.avg.children[i].value || 0) + sector.value / nbParticipants;
      if (sector.children) {
        sector.children.forEach(
          (categ, j) =>
            (acc.avg.children[i].children[j].value =
              (acc.avg.children[i].children[j].value || 0) +
              categ.value / nbParticipants)
        );
      }
    });
    return acc;
  };

  const avg_footprint = footprints.reduce(reducer, initFootprint);
  console.log('avg_footprint : ', avg_footprint);
  return avg_footprint;
};

export const globalAverageFootprint = (state) => {
  // const currentRound = (state) => state.workshop.result.currentYear;
  const carbonFootprints = state.workshop.entities.carbonFootprints;
  averageFootprints(
    carbonFootprints.filter((participant) => participant.includes(currentRound))
  );
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

// export const footprintShaped = useSelector((state) =>
//   footprintDataToGraph(state.workshop.carbonInfo[currentRound])
// );
const footprints = {
  '2020-01': {
    name: 'totalFootprint',
    value: 40,
    children: [
      {
        name: 'transport',
        value: 20,
        children: [
          { name: 'plane', value: 4 },
          { name: 'car', value: 6 },
          { name: 'bike', value: 10 },
        ],
      },
      {
        name: 'logement',
        value: 20,
        children: [
          { name: 'building', value: 4 },
          { name: 'housing', value: 6 },
          { name: 'fondations', value: 10 },
        ],
      },
    ],
  },
  '2020-02': {
    name: 'totalFootprint',
    value: 16,
    children: [
      {
        name: 'transport',
        value: 8,
        children: [
          { name: 'plane', value: 2 },
          { name: 'car', value: 1 },
          { name: 'bike', value: 5 },
        ],
      },
      {
        name: 'logement',
        value: 8,
        children: [
          { name: 'building', value: 2 },
          { name: 'housing', value: 1 },
          { name: 'fondations', value: 5 },
        ],
      },
    ],
  },
};
var footprintStructure = footprints['2020-01'];
