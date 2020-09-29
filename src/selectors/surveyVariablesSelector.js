import { allPass, anyPass, isEmpty, isNil, pathOr, reject } from 'ramda';

import ParticipantStatus from '../pages/Participants/components/ParticipantStatus';
import i18n from '../i18n';
import surveyVariablesSchema from '../reducers/utils/surveyVariablesSchema';
import {
  selectParticipantsEntity,
  selectPersonaEntity,
} from './workshopSelector';

const { properties: surveyVariablesSchemaProperties } = surveyVariablesSchema;

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
  className,
}) =>
  reject(anyPass([isNil, allPass([Array.isArray, isEmpty])]), {
    value,
    readOnly,
    translate,
    colSpan,
    rowSpan,
    valueViewer,
    className,
  });

const generateCellTitle = ({
  value = '',
  colSpan,
  rowSpan,
  valueViewer,
  className,
} = {}) =>
  generateCell({
    value,
    readOnly: true,
    translate: true,
    colSpan,
    rowSpan,
    valueViewer,
    className: `header ${className || ''}`,
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
}) => {
  const value = pathOr('', ['surveyVariables', surveyVariableKey], participant);
  const { enum: availableKeys = [], min, max } = pathOr(
    [],
    [surveyVariableKey],
    surveyVariablesSchemaProperties
  );
  const availableKeysValues = availableKeys.map((availableKey) => ({
    key: availableKey,
    value: i18n.t(`surveyVariables.${surveyVariableKey}.${availableKey}`),
  }));

  return reject(anyPass([isNil, allPass([Array.isArray, isEmpty])]), {
    value,
    originalValue: value,
    readOnly,
    surveyVariableKey,
    min,
    max,
    availableKeysValues,
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
const generateFoodCellTitle = (props) =>
  generateCellTitle({ ...props, className: 'food' });

const computeFoodHeaderFirstRow = () => [
  generateFoodCellTitle({ value: 'food.food', colSpan: 7 }),
];

const computeFoodHeaderSecondRow = () => [
  generateFoodCellTitle({ value: 'food.meatAndFish' }),
  generateFoodCellTitle({ value: 'food.eggsAndDairies' }),
  generateFoodCellTitle({ value: 'food.other', colSpan: 2 }),
  generateFoodCellTitle({ value: 'food.drinks', colSpan: 3 }),
];

const computeFoodHeaderThirdRow = () => [
  generateFoodCellTitle({ value: 'food.consumption' }),
  generateFoodCellTitle({ value: 'food.consumption' }),
  generateFoodCellTitle({ value: 'food.fruitsAndVegetableLocal' }),
  generateFoodCellTitle({ value: 'food.transformedProducts' }),
  generateFoodCellTitle({ value: 'food.alcohol' }),
  generateFoodCellTitle({ value: 'food.hotDrinks' }),
  generateFoodCellTitle({ value: 'food.juicesAndSodas' }),
];

const computeFoodHeaderForthRow = () => [
  generateFoodCellTitle({ value: 'food.consumptionPerDay' }),
  generateFoodCellTitle({ value: 'food.consumptionPerDay' }),
  generateFoodCellTitle({ value: 'food.percentageFruitsAndVegetableLocal' }),
  generateFoodCellTitle({ value: 'food.consumptionPerWeek' }),
  generateFoodCellTitle({ value: 'food.consumptionPerDay' }),
  generateFoodCellTitle({ value: 'food.consumptionPerDay' }),
  generateFoodCellTitle({ value: 'food.consumptionPerDay' }),
];

const computeFoodValues = (participant, readOnly) => {
  return [
    generateSurveyVariableCellValue({
      participant,
      readOnly,
      surveyVariableKey: 'meatAndFishConsoPerDay',
    }),
    generateSurveyVariableCellValue({
      participant,
      readOnly,
      surveyVariableKey: 'eggsAndDairiesConsoPerDay',
    }),
    generateSurveyVariableCellValue({
      participant,
      readOnly,
      surveyVariableKey: 'fruitsAndVegetablePercentageLocal',
    }),
    generateSurveyVariableCellValue({
      participant,
      readOnly,
      surveyVariableKey: 'transformedProductsConsoPerWeek',
    }),
    generateSurveyVariableCellValue({
      participant,
      readOnly,
      surveyVariableKey: 'alcoholConsoGlassPerDay',
    }),
    generateSurveyVariableCellValue({
      participant,
      readOnly,
      surveyVariableKey: 'hotDrinksConsoGlassPerDay',
    }),
    generateSurveyVariableCellValue({
      participant,
      readOnly,
      surveyVariableKey: 'juicesAndSodasConsoGlassPerDay',
    }),
  ];
};

// Transports
const generateTransportCellTitle = (props) =>
  generateCellTitle({ ...props, className: 'transport' });

const computeTransportHeaderFirstRow = () => [
  generateTransportCellTitle({ value: 'transports.transport', colSpan: 16 }),
];

const computeTransportHeaderSecondRow = () => [
  generateTransportCellTitle({ value: 'transports.carDaily', colSpan: 5 }),
  generateTransportCellTitle({ value: 'transports.busDaily', colSpan: 2 }),
  generateTransportCellTitle({ value: 'transports.trainDaily' }),
  generateTransportCellTitle({ value: 'transports.carTravel', colSpan: 5 }),
  generateTransportCellTitle({ value: 'transports.busTravel' }),
  generateTransportCellTitle({ value: 'transports.trainTravel' }),
  generateTransportCellTitle({ value: 'transports.plane' }),
];

const computeTransportHeaderThirdRow = () => [
  generateTransportCellTitle({ value: 'transports.carCategory' }),
  generateTransportCellTitle({ value: 'transports.carMotorType' }),
  generateTransportCellTitle({ value: 'transports.carAgeCategory' }),
  generateTransportCellTitle({ value: 'transports.distances' }),
  generateTransportCellTitle({ value: 'transports.passengers' }),
  generateTransportCellTitle({ value: 'transports.busDistances' }),
  generateTransportCellTitle({ value: 'transports.coachDistances' }),
  generateTransportCellTitle({ value: 'transports.distances' }),
  generateTransportCellTitle({ value: 'transports.carCategory' }),
  generateTransportCellTitle({ value: 'transports.carMotorType' }),
  generateTransportCellTitle({ value: 'transports.carAgeCategory' }),
  generateTransportCellTitle({ value: 'transports.distances' }),
  generateTransportCellTitle({ value: 'transports.passengers' }),
  generateTransportCellTitle({ value: 'transports.distances' }),
  generateTransportCellTitle({ value: 'transports.distances' }),
  generateTransportCellTitle({ value: 'transports.distances' }),
];

const computeTransportHeaderForthRow = () => [
  generateTransportCellTitle(),
  generateTransportCellTitle(),
  generateTransportCellTitle(),
  generateTransportCellTitle({ value: 'transports.kmPerDay' }),
  generateTransportCellTitle({ value: 'transports.number' }),
  generateTransportCellTitle({ value: 'transports.hourPerWeek' }),
  generateTransportCellTitle({ value: 'transports.hourPerWeek' }),
  generateTransportCellTitle({ value: 'transports.hourPerWeek' }),
  generateTransportCellTitle(),
  generateTransportCellTitle(),
  generateTransportCellTitle(),
  generateTransportCellTitle({ value: 'transports.kmPerYear' }),
  generateTransportCellTitle({ value: 'transports.number' }),
  generateTransportCellTitle({ value: 'transports.kmPerYear' }),
  generateTransportCellTitle({ value: 'transports.kmPerYear' }),
  generateTransportCellTitle({ value: 'transports.kmPerYear' }),
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
const generateHousingCellTitle = (props) =>
  generateCellTitle({ ...props, className: 'housing' });

const computeHousingHeaderFirstRow = () => [
  generateHousingCellTitle({ value: 'housing.housing', colSpan: 15 }),
];

const computeHousingHeaderSecondRow = () => [
  generateHousingCellTitle({ value: 'housing.transverse', colSpan: 3 }),
  generateHousingCellTitle({ value: 'housing.energy', colSpan: 11 }),
  generateHousingCellTitle({ value: 'housing.equipments', colSpan: 2 }),
];

const computeHousingHeaderThirdRow = () => [
  generateHousingCellTitle({ value: 'housing.inhabitants' }),
  generateHousingCellTitle({ value: 'housing.surface' }),
  generateHousingCellTitle({ value: 'housing.type' }),
  generateHousingCellTitle({ value: 'housing.maintainanceDate' }),
  generateHousingCellTitle({ value: 'housing.heatingSystemEnergyType' }),
  generateHousingCellTitle({ value: 'housing.sanitoryHotWaterEnergyType' }),
  generateHousingCellTitle({ value: 'housing.cookingAppliancesEnergyType' }),
  generateHousingCellTitle({ value: 'housing.electricityProvider' }),
  generateHousingCellTitle({ value: 'housing.energyConsumptionKnowledge' }),
  generateHousingCellTitle({ value: 'housing.electricityConsumption' }),
  generateHousingCellTitle({ value: 'housing.gasConsumption' }),
  generateHousingCellTitle({ value: 'housing.fuelConsumption' }),
  generateHousingCellTitle({ value: 'housing.woodConsumption' }),
  generateHousingCellTitle({ value: 'housing.heatNetworkConsumption' }),
  generateHousingCellTitle({ value: 'housing.bigAppliances' }),
  generateHousingCellTitle({ value: 'housing.smallAppliances' }),
];

const computeHousingHeaderForthRow = () => [
  generateHousingCellTitle({ value: 'housing.number' }),
  generateHousingCellTitle({ value: 'housing.squareMeter' }),
  generateHousingCellTitle(),
  generateHousingCellTitle(),
  generateHousingCellTitle(),
  generateHousingCellTitle(),
  generateHousingCellTitle(),
  generateHousingCellTitle(),
  generateHousingCellTitle(),
  generateHousingCellTitle({ value: 'housing.kwhPerYear' }),
  generateHousingCellTitle({ value: 'housing.kwhPerYear' }),
  generateHousingCellTitle({ value: 'housing.kwhPerYear' }),
  generateHousingCellTitle({ value: 'housing.kwhPerYear' }),
  generateHousingCellTitle({ value: 'housing.kwhPerYear' }),
  generateHousingCellTitle({ value: 'housing.number' }),
  generateHousingCellTitle({ value: 'housing.number' }),
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
    surveyVariableKey: 'housingSurfaceArea',
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
const generateConsumptionCellTitle = (props) =>
  generateCellTitle({ ...props, className: 'consumption' });

const computeConsumptionHeaderFirstRow = () => [
  generateConsumptionCellTitle({
    value: 'consumption.consumption',
    colSpan: 5,
  }),
];

const computeConsumptionHeaderSecondRow = () => [
  generateConsumptionCellTitle({ value: 'consumption.digital' }),
  generateConsumptionCellTitle({ value: 'consumption.digital' }),
  generateConsumptionCellTitle({ value: 'consumption.digital' }),
  generateConsumptionCellTitle({ value: 'consumption.other' }),
  generateConsumptionCellTitle({ value: 'consumption.clothes' }),
];

const computeConsumptionHeaderThirdRow = () => [
  generateConsumptionCellTitle({ value: 'consumption.bigDevices' }),
  generateConsumptionCellTitle({ value: 'consumption.smallDevices' }),
  generateConsumptionCellTitle({ value: 'consumption.streaming' }),
  generateConsumptionCellTitle({ value: 'consumption.activities' }),
  generateConsumptionCellTitle({ value: 'consumption.newItems' }),
];

const computeConsumptionHeaderForthRow = () => [
  generateConsumptionCellTitle({ value: 'consumption.number' }),
  generateConsumptionCellTitle({ value: 'consumption.number' }),
  generateConsumptionCellTitle({ value: 'consumption.hourPerWeek' }),
  generateConsumptionCellTitle({ value: 'consumption.numberPerMonth' }),
  generateConsumptionCellTitle({ value: 'consumption.numberPerYear' }),
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
