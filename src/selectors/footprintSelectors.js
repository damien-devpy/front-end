const participantsAverageFootprint = (footprints) => {};

const globalAverageFootprint = (footprints) => {};

export const footprintDataToGraph = (carbonInfoEntity, round) => {
  var footprintArray = [];
  const footprintData = carbonInfoEntity && carbonInfoEntity[round];
  footprintData &&
    footprintData.carbonFootprint.children.forEach((sectorData) => {
      var sectorObject = { name: sectorData.name };
      sectorData.children.forEach(
        (categData) => (sectorObject[categData.name] = categData.value)
      );
      footprintArray.push(sectorObject);
    });
  return footprintArray;
};
