import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
const colors = [
  ["#FF0000", "#C00001", "#700001", "#C33E01", "#FFCCFF"],
  ["#1E4E79", "#2E75B6", "#7BD7EE"],
  ["#7F6001", "#B58D0D", "#DEC268", "#FFCF34"],
  ["#385723", "#70AD47", "#A9D18E"],
  ["#ED7D31"],
];

const categories = (footprint) =>
  footprint.map((sectorData) => Object.keys(sectorData).slice(1));

const footprintDataBar = (footprint, t) => {
  console.log("categs", categories(footprint));
  return categories(footprint).map((sector, s) =>
    sector.map((categ, c) => (
      <Bar
        name={t(`common.${categ}`)}
        dataKey={categ}
        stackId="a"
        fill={colors[s][c]}
      />
    ))
  );
};

const footprintGraph = (footprint, t) => (
  <BarChart
    width={600}
    height={400}
    data={footprint}
    margin={{
      top: 20,
      right: 10,
      left: 10,
      bottom: 5,
    }}
    barCategoryGap="10"
  >
    <CartesianGrid strokeDasharray="3" />
    <XAxis dataKey="sector" />
    <YAxis dataKey="" />
    <Tooltip />
    <Legend />
    {footprintDataBar(footprint, t)}
  </BarChart>
);

const Simulation = () => {
  const { t } = useTranslation();
  console.log(footprintShaped);
  return (
    <StyledSimulation>
      <h4> Empreinte Carbonne Moyenne des participants </h4>

      {footprintGraph(footprintShaped, t)}
    </StyledSimulation>
  );
};

const StyledSimulation = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  margin: 10px 0;
`;

const footprintShaped = [
  { sector: "Transport", plane: 750, train: 59, bus: 150, car: 600 },
  {
    sector: "Logement",
    housingEquipment: 500,
    constructionAndMaintenance: 300,
    energies: 216,
  },
  {
    sector: "Alimentation",
    drinks: 700,
    meatAndFish: 352.86375,
    eggsAndDairies: 71.66775,
    others_alim: 600,
  },
  { sector: "Autres", clothing: 671.4, digital: 250, others_conso: 400 },
  { sector: "Services Publics", publicServices: 1000 },
];
// const renderLegend = (props) => {
//   const { payload } = props;
//   console.log(payload);
//   const transData = payload.slice(0, 3);
//   console.log("transData", transData);
//   return (
//     <div>
//       <h5>Transport</h5>
//       <ul>
//         {transData.map((entry, index) => (
//           <li key={`item-${index}`}>{entry.value}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };
// const footprintInitial = {
//   transport: {
//     plane: 750,
//     train: {
//       urbanTrain: 39,
//       mainlineTrain: 20,
//     },
//     bus: {
//       urbanBus: 93.6,
//       coach: {
//         coach_commute: 6.4,
//         coach_travel: 40,
//       },
//     },
//     car: {
//       dailyCommutes: 53.25201203029334,
//       exceptionalCommutes: 583.5836934826667,
//     },
//   },
//   housing: {
//     housingEquipment: {
//       appliances: {
//         smallAppliances: 46.666666666666664,
//         bigApplicances: 54.36666666666667,
//       },
//       furnitures: {
//         furnituresPerSurface: 79,
//         furnituresMin: 73.4044444,
//       },
//     },
//     constructionAndMaintenance: {
//       construction: {
//         houseConstruction: 283.34,
//         flatConstruction: 0,
//       },
//       maintenance: 13.88,
//     },
//     energies: {
//       water: 9.07536,
//       electricity: {
//         elecHeating: 1.3,
//         elecCooking: 1.3,
//         elecWaterHeating: 1.3,
//         elecLightning: 1.3,
//       },
//       gas: {
//         gasHeating: 22.7,
//         gasCooking: 22.7,
//         gasWaterHeating: 22.7,
//       },
//       fuel: {
//         fuelHeating: 32.300000000000004,
//         fuelCooking: 32.300000000000004,
//         fuelWaterHeating: 32.300000000000004,
//       },
//       wood: {
//         woodHeating: 3,
//         woodCooking: 3,
//         woodWaterHeating: 3,
//       },
//     },
//   },
//   food: {
//     drinks: {
//       alcohol: 228.85499999999996,
//       hotDrinks: 112.42000000000002,
//       juicesAndSoda: 214.61999999999998,
//     },
//     meatAndFish: 352.86375,
//     eggsAndDairies: 71.66775,
//     others: {
//       fruitsAndVegetables: {
//         localFruitsAndVegeteables: 38.57007142857143,
//         importedFruitsAndVegeteables: 332.29600000000005,
//       },
//       transformedProducts: 202.176,
//       groceriesAndStarches: 240.65753571428573,
//     },
//   },
//   others: {
//     clothing: 671.4,
//     digital: {
//       devices: {
//         smallDevices: 25,
//         bigDevices: 143.39999999999998,
//       },
//       internetUsage: {
//         intrnetStreaming: 32.5,
//         intrnetOthers: 48.66,
//       },
//     },
//     others: {
//       activities: {
//         activitiesElectricity: 23.76,
//         activitiesGas: 26.64,
//         activitiesWithoutEnergy: 1.98,
//       },
//       goods_and_services: {
//         servicesElectricity: 62.88,
//         servicesGas: 70.19,
//         servicesWithoutEnergy: 211.92,
//       },
//     },
//   },
//   publicServices: 1000,
// };

export default Simulation;
