import { isNil, pathOr, reject } from 'ramda';

import {
  selectParticipantsEntity,
  selectPersonaEntity,
} from './workshopSelector';

import ParticipantStatus from '../pages/Participants/components/ParticipantStatus';

// const selectSurveyVariablesForParticipant = (state, participantId) => {
//   const participantsEntity = selectParticipantsEntity(state);
//   const participantSurveyVariables = pathOr(
//     {},
//     [participantId, 'surveyVariables'],
//     participantsEntity
//   );
//   return participantSurveyVariables;
// };

// const foodDataSheetStructure = [
//   [{ key: 'food' }],
//   [
//     { key: 'meatAndFish' },
//     { key: 'eggsAndDairies' },
//     { key: 'other' },
//     { key: 'drinks' },
//   ],
//   [
//     { key: 'consumption' },
//     { key: 'consumption' },
//     { key: 'fruitsAndVegetableLocal' },
//     { key: 'transformedProducts' },
//     { key: 'alcohol' },
//     { key: 'hotDrinks' },
//     { key: 'juicesAndSodas' },
//   ],
//   [
//     { key: 'consumptionPerDay' },
//     { key: 'consumptionPerDay' },
//     { key: 'percentageFruitsAndVegetableLocal' },
//     { key: 'consumptionPerWeek' },
//     { key: 'consumptionPerDay' },
//     { key: 'consumptionPerDay' },
//     { key: 'consumptionPerDay' },
//   ],
// ];

const generateCell = ({
  value = '',
  readOnly = false,
  translate = false,
  colSpan = 1,
  rowSpan = 1,
  valueViewer,
}) =>
  reject(isNil, {
    value,
    readOnly,
    translate,
    colSpan,
    rowSpan,
    valueViewer,
  });

const generateCellTitle = ({
  value = '',
  colSpan,
  rowSpan,
  valueViewer,
} = {}) =>
  generateCell({
    value,
    readOnly: true,
    translate: true,
    colSpan,
    rowSpan,
    valueViewer,
  });

const generateCellValue = ({
  value,
  readOnly = false,
  translate = false,
  valueViewer,
}) => generateCell({ value, readOnly, translate, valueViewer });

const generateSurveyVariableCellValue = ({
  participant,
  readOnly,
  surveyVariableKey,
  min,
  max,
  availableValues,
}) => {
  const value = pathOr('', ['surveyVariables', surveyVariableKey], participant);
  return reject(isNil, {
    value,
    originalValue: value,
    readOnly,
    surveyVariableKey,
    min,
    max,
    availableValues,
  });
};

// Participant
const computeParticipantHeaderFirstRow = () => [
  generateCellTitle({ value: 'common.participant' }),
  generateCellTitle({ value: 'common.persona' }),
  generateCellTitle({
    value: 'manageParticipants.status',
  }),
];

const computeParticipantInformationRows = (participant, personaEntity) => {
  const { firstName = '', lastName = '', personaId, id, status } = participant;
  const persona = pathOr({}, [personaId], personaEntity);
  const { firstName: personaFirstName, lastName: personaLastname } = persona;
  return [
    // generateCellValue(`${firstName} ${lastName}`, true),
    { value: `${firstName} ${lastName}`, readOnly: true, participantId: id },
    personaFirstName
      ? generateCellValue({
          value: `${personaFirstName} ${personaLastname}`,
          readOnly: true,
        })
      : generateCellValue({
          value: 'common.personified',
          readOnly: true,
          translate: true,
        }),
    generateCellValue({
      value: status,
      readOnly: true,
      translate: true,
      valueViewer: ParticipantStatus,
    }),
  ];
};

// Food
const computeFoodHeaderFirstRow = () => [
  generateCellTitle({ value: 'food.food', colSpan: 7 }),
];

const computeFoodHeaderSecondRow = () => [
  generateCellTitle({ value: 'food.meatAndFish' }),
  generateCellTitle({ value: 'food.eggsAndDairies' }),
  generateCellTitle({ value: 'food.other', colSpan: 2 }),
  generateCellTitle({ value: 'food.drinks', colSpan: 3 }),
];

const computeFoodHeaderThirdRow = () => [
  generateCellTitle({ value: 'food.consumption' }),
  generateCellTitle({ value: 'food.consumption' }),
  generateCellTitle({ value: 'food.fruitsAndVegetableLocal' }),
  generateCellTitle({ value: 'food.transformedProducts' }),
  generateCellTitle({ value: 'food.alcohol' }),
  generateCellTitle({ value: 'food.hotDrinks' }),
  generateCellTitle({ value: 'food.juicesAndSodas' }),
];

const computeFoodHeaderForthRow = () => [
  generateCellTitle({ value: 'food.consumptionPerDay' }),
  generateCellTitle({ value: 'food.consumptionPerDay' }),
  generateCellTitle({ value: 'food.percentageFruitsAndVegetableLocal' }),
  generateCellTitle({ value: 'food.consumptionPerWeek' }),
  generateCellTitle({ value: 'food.consumptionPerDay' }),
  generateCellTitle({ value: 'food.consumptionPerDay' }),
  generateCellTitle({ value: 'food.consumptionPerDay' }),
];

const computeFoodValues = (participant, readOnly) => {
  return [
    generateSurveyVariableCellValue({
      participant,
      readOnly,
      surveyVariableKey: 'meatAndFishConsoPerDay',
      min: 0,
      max: 2,
    }),
    generateSurveyVariableCellValue({
      participant,
      readOnly,
      surveyVariableKey: 'eggsAndDairiesConsoPerDay',
      min: 0,
      max: 3,
    }),
    generateSurveyVariableCellValue({
      participant,
      readOnly,
      surveyVariableKey: 'fruitsAndVegetablePercentageLocal',
      min: 0.01,
      max: 1,
    }),
    generateSurveyVariableCellValue({
      participant,
      readOnly,
      surveyVariableKey: 'transformedProductsConsoPerWeek',
      min: 0,
      max: 10,
    }),
    generateSurveyVariableCellValue({
      participant,
      readOnly,
      surveyVariableKey: 'alcoholConsoGlassPerDay',
      min: 0,
      max: 5,
    }),
    generateSurveyVariableCellValue({
      participant,
      readOnly,
      surveyVariableKey: 'hotDrinksConsoGlassPerDay',
      min: 0,
      max: 5,
    }),
    generateSurveyVariableCellValue({
      participant,
      readOnly,
      surveyVariableKey: 'juicesAndSodasConsoGlassPerDay',
      min: 0,
      max: 5,
    }),
  ];
};

// Transports
const computeTransportHeaderFirstRow = () => [
  generateCellTitle({ value: 'transports.transport', colSpan: 16 }),
];

const computeTransportHeaderSecondRow = () => [
  generateCellTitle({ value: 'transports.carDaily', colSpan: 5 }),
  generateCellTitle({ value: 'transports.busDaily', colSpan: 2 }),
  generateCellTitle({ value: 'transports.trainDaily' }),
  generateCellTitle({ value: 'transports.carTravel', colSpan: 5 }),
  generateCellTitle({ value: 'transports.busTravel' }),
  generateCellTitle({ value: 'transports.trainTravel' }),
  generateCellTitle({ value: 'transports.plane' }),
];

const computeTransportHeaderThirdRow = () => [
  generateCellTitle({ value: 'transports.carCategory' }),
  generateCellTitle({ value: 'transports.carMotorType' }),
  generateCellTitle({ value: 'transports.carAgeCategory' }),
  generateCellTitle({ value: 'transports.distances' }),
  generateCellTitle({ value: 'transports.passengers' }),
  generateCellTitle({ value: 'transports.busDistances' }),
  generateCellTitle({ value: 'transports.coachDistances' }),
  generateCellTitle({ value: 'transports.distances' }),
  generateCellTitle({ value: 'transports.carCategory' }),
  generateCellTitle({ value: 'transports.carMotorType' }),
  generateCellTitle({ value: 'transports.carAgeCategory' }),
  generateCellTitle({ value: 'transports.distances' }),
  generateCellTitle({ value: 'transports.passengers' }),
  generateCellTitle({ value: 'transports.distances' }),
  generateCellTitle({ value: 'transports.distances' }),
  generateCellTitle({ value: 'transports.distances' }),
];

const computeTransportHeaderForthRow = () => [
  generateCellTitle(),
  generateCellTitle(),
  generateCellTitle(),
  generateCellTitle({ value: 'transports.kmPerDay' }),
  generateCellTitle({ value: 'transports.number' }),
  generateCellTitle({ value: 'transports.hourPerWeek' }),
  generateCellTitle({ value: 'transports.hourPerWeek' }),
  generateCellTitle({ value: 'transports.hourPerWeek' }),
  generateCellTitle(),
  generateCellTitle(),
  generateCellTitle(),
  generateCellTitle({ value: 'transports.kmPerYear' }),
  generateCellTitle({ value: 'transports.number' }),
  generateCellTitle({ value: 'transports.kmPerYear' }),
  generateCellTitle({ value: 'transports.kmPerYear' }),
  generateCellTitle({ value: 'transports.kmPerYear' }),
];

const computeTransportValues = (participant, readOnly) => [
  generateSurveyVariableCellValue({
    participant,
    readOnly,
    surveyVariableKey: 'categoryCarCommute',
  }),
  generateSurveyVariableCellValue({
    participant,
    readOnly,
    surveyVariableKey: 'motorTypeCarCommute',
  }),
  generateSurveyVariableCellValue({
    participant,
    readOnly,
    surveyVariableKey: 'ageCategoryCarCommute',
  }),
  generateSurveyVariableCellValue({
    participant,
    readOnly,
    surveyVariableKey: 'kmCarCommutePerDay',
  }),
  generateSurveyVariableCellValue({
    participant,
    readOnly,
    surveyVariableKey: 'passengersPerCarCommute',
  }),
  generateSurveyVariableCellValue({
    participant,
    readOnly,
    surveyVariableKey: 'hoursUrbanBusPerWeek',
  }),
  generateSurveyVariableCellValue({
    participant,
    readOnly,
    surveyVariableKey: 'hoursCoachCommutePerWeek',
  }),
  generateSurveyVariableCellValue({
    participant,
    readOnly,
    surveyVariableKey: 'hoursUrbanTrainPerWeek',
  }),
  generateSurveyVariableCellValue({
    participant,
    readOnly,
    surveyVariableKey: 'categoryCarTravel',
  }),
  generateSurveyVariableCellValue({
    participant,
    readOnly,
    surveyVariableKey: 'motorTypeCarTravel',
  }),
  generateSurveyVariableCellValue({
    participant,
    readOnly,
    surveyVariableKey: 'ageCategoryCarTravel',
  }),
  generateSurveyVariableCellValue({
    participant,
    readOnly,
    surveyVariableKey: 'kmCarTravelPerYear',
  }),
  generateSurveyVariableCellValue({
    participant,
    readOnly,
    surveyVariableKey: 'passengersPerCarTravel',
  }),
  generateSurveyVariableCellValue({
    participant,
    readOnly,
    surveyVariableKey: 'kmCoachTravel',
  }),
  generateSurveyVariableCellValue({
    participant,
    readOnly,
    surveyVariableKey: 'kmCountryTrain',
  }),
  generateSurveyVariableCellValue({
    participant,
    readOnly,
    surveyVariableKey: 'kmPlane',
  }),
];

// Housing
const computeHousingHeaderFirstRow = () => [
  generateCellTitle({ value: 'housing.housing', colSpan: 15 }),
];

const computeHousingHeaderSecondRow = () => [
  generateCellTitle({ value: 'housing.transverse', colSpan: 2 }),
  generateCellTitle({ value: 'housing.energy', colSpan: 11 }),
  generateCellTitle({ value: 'housing.equipments', colSpan: 2 }),
];

const computeHousingHeaderThirdRow = () => [
  generateCellTitle({ value: 'housing.inhabitants' }),
  generateCellTitle({ value: 'housing.surface' }),
  generateCellTitle({ value: 'housing.maintainanceDate' }),
  generateCellTitle({ value: 'housing.heatingSystemEnergyType' }),
  generateCellTitle({ value: 'housing.sanitoryHotWaterEnergyType' }),
  generateCellTitle({ value: 'housing.cookingAppliancesEnergyType' }),
  generateCellTitle({ value: 'housing.electricityProvider' }),
  generateCellTitle({ value: 'housing.energyConsumptionKnowledge' }),
  generateCellTitle({ value: 'housing.electricityConsumption' }),
  generateCellTitle({ value: 'housing.gasConsumption' }),
  generateCellTitle({ value: 'housing.fuelConsumption' }),
  generateCellTitle({ value: 'housing.woodConsumption' }),
  generateCellTitle({ value: 'housing.heatNetworkConsumption' }),
  generateCellTitle({ value: 'housing.bigAppliances' }),
  generateCellTitle({ value: 'housing.smallAppliances' }),
];

const computeHousingHeaderForthRow = () => [
  generateCellTitle({ value: 'housing.number' }),
  generateCellTitle({ value: 'housing.squareMeter' }),
  generateCellTitle(),
  generateCellTitle(),
  generateCellTitle(),
  generateCellTitle(),
  generateCellTitle(),
  generateCellTitle(),
  generateCellTitle({ value: 'housing.kwhPerYear' }),
  generateCellTitle({ value: 'housing.kwhPerYear' }),
  generateCellTitle({ value: 'housing.kwhPerYear' }),
  generateCellTitle({ value: 'housing.kwhPerYear' }),
  generateCellTitle({ value: 'housing.kwhPerYear' }),
  generateCellTitle({ value: 'housing.number' }),
  generateCellTitle({ value: 'housing.number' }),
];

const computeHousingValues = (participant, readOnly) => [
  generateSurveyVariableCellValue({
    participant,
    readOnly,
    surveyVariableKey: 'residentsPerHousing',
  }),
  generateSurveyVariableCellValue({
    participant,
    readOnly,
    surveyVariableKey: 'housingType',
  }),
  generateSurveyVariableCellValue({
    participant,
    readOnly,
    surveyVariableKey: 'maintainanceDate',
  }),
  generateSurveyVariableCellValue({
    participant,
    readOnly,
    surveyVariableKey: 'heatingSystemEnergyType',
  }),
  generateSurveyVariableCellValue({
    participant,
    readOnly,
    surveyVariableKey: 'sanitoryHotWaterEnergyType',
  }),
  generateSurveyVariableCellValue({
    participant,
    readOnly,
    surveyVariableKey: 'cookingAppliancesEnergyType',
  }),
  generateSurveyVariableCellValue({
    participant,
    readOnly,
    surveyVariableKey: 'electricityProvider',
  }),
  generateSurveyVariableCellValue({
    participant,
    readOnly,
    surveyVariableKey: 'energyConsumptionKnowledge',
  }),
  generateSurveyVariableCellValue({
    participant,
    readOnly,
    surveyVariableKey: 'elecKwh',
  }),
  generateSurveyVariableCellValue({
    participant,
    readOnly,
    surveyVariableKey: 'gasKwh',
  }),
  generateSurveyVariableCellValue({
    participant,
    readOnly,
    surveyVariableKey: 'fuelKwh',
  }),
  generateSurveyVariableCellValue({
    participant,
    readOnly,
    surveyVariableKey: 'woodKwh',
  }),
  generateSurveyVariableCellValue({
    participant,
    readOnly,
    surveyVariableKey: 'heatNetworkKwh',
  }),
  generateSurveyVariableCellValue({
    participant,
    readOnly,
    surveyVariableKey: 'numberBigAppliances',
  }),
  generateSurveyVariableCellValue({
    participant,
    readOnly,
    surveyVariableKey: 'numberSmallAppliances',
  }),
];

// Consumption
const computeConsumptionHeaderFirstRow = () => [
  generateCellTitle({ value: 'consumption.consumption', colSpan: 5 }),
];

const computeConsumptionHeaderSecondRow = () => [
  generateCellTitle({ value: 'consumption.digital' }),
  generateCellTitle({ value: 'consumption.digital' }),
  generateCellTitle({ value: 'consumption.digital' }),
  generateCellTitle({ value: 'consumption.other' }),
  generateCellTitle({ value: 'consumption.clothes' }),
];

const computeConsumptionHeaderThirdRow = () => [
  generateCellTitle({ value: 'consumption.bigDevices' }),
  generateCellTitle({ value: 'consumption.smallDevices' }),
  generateCellTitle({ value: 'consumption.streaming' }),
  generateCellTitle({ value: 'consumption.activities' }),
  generateCellTitle({ value: 'consumption.newItems' }),
];

const computeConsumptionHeaderForthRow = () => [
  generateCellTitle({ value: 'consumption.number' }),
  generateCellTitle({ value: 'consumption.number' }),
  generateCellTitle({ value: 'consumption.hourPerWeek' }),
  generateCellTitle({ value: 'consumption.numberPerMonth' }),
  generateCellTitle({ value: 'consumption.numberPerYear' }),
];

const computeConsumptionValues = (participant, readOnly) => [
  generateSurveyVariableCellValue({
    participant,
    readOnly,
    surveyVariableKey: 'numberBigDevices',
  }),
  generateSurveyVariableCellValue({
    participant,
    readOnly,
    surveyVariableKey: 'numberSmallDevices',
  }),
  generateSurveyVariableCellValue({
    participant,
    readOnly,
    surveyVariableKey: 'internetStreamingHoursPerWeek',
  }),
  generateSurveyVariableCellValue({
    participant,
    readOnly,
    surveyVariableKey: 'activitiesPerMonth',
  }),
  generateSurveyVariableCellValue({
    participant,
    readOnly,
    surveyVariableKey: 'clothesNewItems',
  }),
];

// Grid Headers
const computeSurveyVariablesGridHeaders = () => {
  return [
    [
      ...computeFoodHeaderFirstRow(),
      ...computeTransportHeaderFirstRow(),
      ...computeHousingHeaderFirstRow(),
      ...computeConsumptionHeaderFirstRow(),
    ],
    [
      ...computeFoodHeaderSecondRow(),
      ...computeTransportHeaderSecondRow(),
      ...computeHousingHeaderSecondRow(),
      ...computeConsumptionHeaderSecondRow(),
    ],
    [
      ...computeFoodHeaderThirdRow(),
      ...computeTransportHeaderThirdRow(),
      ...computeHousingHeaderThirdRow(),
      ...computeConsumptionHeaderThirdRow(),
    ],
    [
      ...computeFoodHeaderForthRow(),
      ...computeTransportHeaderForthRow(),
      ...computeHousingHeaderForthRow(),
      ...computeConsumptionHeaderForthRow(),
    ],
  ];
};

const computeParticipantGridHeaders = () => {
  return [
    [generateCellTitle(), generateCellTitle(), generateCellTitle()],
    [generateCellTitle(), generateCellTitle(), generateCellTitle()],
    [generateCellTitle(), generateCellTitle(), generateCellTitle()],
    [...computeParticipantHeaderFirstRow()],
  ];
};
// Grid values
const computeSurveyVariablesGridValuesForParticipant = (participant) => {
  const { personaId, status } = participant;
  const isPersona = personaId !== undefined;
  const areSurveyVariablesModifiables =
    status === 'data_to_check' || status === 'ready';
  const readOnly = isPersona || !areSurveyVariablesModifiables;
  return [
    ...computeFoodValues(participant, readOnly),
    ...computeTransportValues(participant, readOnly),
    ...computeHousingValues(participant, readOnly),
    ...computeConsumptionValues(participant, readOnly),
  ];
};

export const computeSurveyVariablesGridValues = (state) => {
  const participantsEntity = selectParticipantsEntity(state);

  return Object.keys(participantsEntity).map((participantId) => {
    const participant = participantsEntity[participantId];
    return computeSurveyVariablesGridValuesForParticipant(participant);
  });
};

export const computeParticipantsGridValues = (state) => {
  const participantsEntity = selectParticipantsEntity(state);
  const personaEntity = selectPersonaEntity(state);

  return Object.keys(participantsEntity).map((participantId) => {
    const participant = participantsEntity[participantId];
    return [...computeParticipantInformationRows(participant, personaEntity)];
  });
};

export const selectSurveyVariablesGrid = (state) => {
  return [
    ...computeSurveyVariablesGridHeaders(),
    ...computeSurveyVariablesGridValues(state),
  ];
};

export const selectParticipantsGrid = (state) => {
  return [
    ...computeParticipantGridHeaders(state),
    ...computeParticipantsGridValues(state),
  ];
};
export const selectSurveyVariables = (surveyVariablesRow) => {
  // The first row contains participant information
  const [participantCell] = surveyVariablesRow;
  const { participantId } = participantCell;
  const surveyVariables = surveyVariablesRow.reduce(
    (accumulator, cell) =>
      cell.surveyVariableKey
        ? { ...accumulator, [cell.surveyVariableKey]: cell.value }
        : accumulator,
    {}
  );
  return {
    participantId,
    surveyVariables,
  };
};

const isSurveyVariablesRowModified = (surveyVariablesRow) =>
  surveyVariablesRow.some(
    ({ value, originalValue, surveyVariableKey }) =>
      surveyVariableKey && value !== originalValue
  );

export const selectModifiedSurveyVariables = (surveyVariablesGrid) =>
  surveyVariablesGrid.reduce(
    (accumulator, surveyVariablesRow) =>
      isSurveyVariablesRowModified(surveyVariablesRow)
        ? [...accumulator, selectSurveyVariables(surveyVariablesRow)]
        : accumulator,
    []
  );

export const selectParticipantIdsToCheck = (participantsGrid) =>
  participantsGrid.reduce((accumulator, participantRow) => {
    const [participantCell, , participantStatusCell] = participantRow;
    const { participantId } = participantCell;
    const { value: status } = participantStatusCell;
    return status === 'data_to_check'
      ? [...accumulator, participantId]
      : accumulator;
  }, []);

export const mergeGrids = (grid1, grid2) => {
  return grid1.map((row, index) => [...row, ...grid2[index]]);
};
