import { pathOr } from 'ramda';

import {
  selectParticipantsEntity,
  selectPersonaEntity,
} from './workshopSelector';

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

const generateCell = (
  value = '',
  readOnly = false,
  translate = false,
  colSpan = 1,
  rowSpan = 1
) => ({
  value,
  readOnly,
  translate,
  colSpan,
  rowSpan,
});

const generateCellTitle = (value, colSpan, rowSpan) =>
  generateCell(value, true, true, colSpan, rowSpan);

const generateCellValue = (value, readOnly = false, translate = false) =>
  generateCell(value, readOnly, translate);

const generateSurveyVariableCellValue = (participant, surveyVariableKey) => {
  const value = pathOr('', ['surveyVariables', surveyVariableKey], participant);
  return {
    value,
    originalValue: value,
    surveyVariableKey,
  };
};

// Participant
const computeParticipantHeaderFirstRow = () => [
  generateCellTitle('common.participant'),
  generateCellTitle('common.persona'),
];

const computeParticipantNameAndPersonaRows = (participant, personaEntity) => {
  const { firstName = '', lastName = '', personaId, id } = participant;
  const persona = pathOr({}, [personaId], personaEntity);
  const { firstName: personaFirstName, lastName: personaLastname } = persona;
  return [
    // generateCellValue(`${firstName} ${lastName}`, true),
    { value: `${firstName} ${lastName}`, readOnly: true, participantId: id },
    // const generateCell = (
    //   value = '',
    //   readOnly = false,
    //   translate = false,
    //   colSpan = 1,
    //   rowSpan = 1
    // ) => ({
    //   value,
    //   readOnly,
    //   translate,
    //   colSpan,
    //   rowSpan,
    // });
    personaFirstName
      ? generateCellValue(`${personaFirstName} ${personaLastname}`, true)
      : generateCellValue('common.personified', true, true),
  ];
};

// Food
const computeFoodHeaderFirstRow = () => [generateCellTitle('food.food', 7)];

const computeFoodHeaderSecondRow = () => [
  generateCellTitle('food.meatAndFish'),
  generateCellTitle('food.eggsAndDairies'),
  generateCellTitle('food.other', 2),
  generateCellTitle('food.drinks', 3),
];

const computeFoodHeaderThirdRow = () => [
  generateCellTitle('food.consumption'),
  generateCellTitle('food.consumption'),
  generateCellTitle('food.fruitsAndVegetableLocal'),
  generateCellTitle('food.transformedProducts'),
  generateCellTitle('food.alcohol'),
  generateCellTitle('food.hotDrinks'),
  generateCellTitle('food.juicesAndSodas'),
];

const computeFoodHeaderForthRow = () => [
  generateCellTitle('food.consumptionPerDay'),
  generateCellTitle('food.consumptionPerDay'),
  generateCellTitle('food.percentageFruitsAndVegetableLocal'),
  generateCellTitle('food.consumptionPerWeek'),
  generateCellTitle('food.consumptionPerDay'),
  generateCellTitle('food.consumptionPerDay'),
  generateCellTitle('food.consumptionPerDay'),
];

const computeFoodValues = (participant) => [
  generateSurveyVariableCellValue(participant, 'meatAndFishConsoPerDay'),
  generateSurveyVariableCellValue(participant, 'eggsAndDairiesConsoPerDay'),
  generateSurveyVariableCellValue(
    participant,
    'fruitsAndVegetablePercentageLocal'
  ),
  generateSurveyVariableCellValue(
    participant,
    'transformedProductsConsoPerWeek'
  ),
  generateSurveyVariableCellValue(participant, 'alcoholConsoGlassPerDay'),
  generateSurveyVariableCellValue(participant, 'hotDrinksConsoGlassPerDay'),
  generateSurveyVariableCellValue(
    participant,
    'juicesAndSodasConsoGlassPerDay'
  ),
];

// Transports
const computeTransportHeaderFirstRow = () => [
  generateCellTitle('transports.transport', 17),
];

const computeTransportHeaderSecondRow = () => [
  generateCellTitle('transports.carDaily', 5),
  generateCellTitle('transports.busDaily', 2),
  generateCellTitle('transports.trainDaily'),
  generateCellTitle('transports.carTravel', 5),
  generateCellTitle('transports.busTravel'),
  generateCellTitle('transports.trainTravel'),
  generateCellTitle('transports.plane'),
];

const computeTransportHeaderThirdRow = () => [
  generateCellTitle('transports.carCategory'),
  generateCellTitle('transports.carMotorType'),
  generateCellTitle('transports.carAgeCategory'),
  generateCellTitle('transports.distances'),
  generateCellTitle('transports.passengers'),
  generateCellTitle('transports.busDistances'),
  generateCellTitle('transports.coachDistances'),
  generateCellTitle('transports.distances'),
  generateCellTitle('transports.carCategory'),
  generateCellTitle('transports.carMotorType'),
  generateCellTitle('transports.carAgeCategory'),
  generateCellTitle('transports.distances'),
  generateCellTitle('transports.passengers'),
  generateCellTitle('transports.distances'),
  generateCellTitle('transports.distances'),
  generateCellTitle('transports.distances'),
];

const computeTransportHeaderForthRow = () => [
  generateCellTitle(),
  generateCellTitle(),
  generateCellTitle(),
  generateCellTitle('transports.kmPerDay'),
  generateCellTitle('transports.number'),
  generateCellTitle('transports.hourPerWeek'),
  generateCellTitle('transports.hourPerWeek'),
  generateCellTitle('transports.hourPerWeek'),
  generateCellTitle(),
  generateCellTitle(),
  generateCellTitle(),
  generateCellTitle('transports.kmPerYear'),
  generateCellTitle('transports.number'),
  generateCellTitle('transports.kmPerYear'),
  generateCellTitle('transports.kmPerYear'),
  generateCellTitle('transports.kmPerYear'),
];

const computeTransportValues = (participant) => [
  generateSurveyVariableCellValue(participant, 'categoryCarCommute'),
  generateSurveyVariableCellValue(participant, 'motorTypeCarCommute'),
  generateSurveyVariableCellValue(participant, 'ageCategoryCarCommute'),
  generateSurveyVariableCellValue(participant, 'kmCarCommutePerDay'),
  generateSurveyVariableCellValue(participant, 'passengersPerCarCommute'),
  generateSurveyVariableCellValue(participant, 'hoursUrbanBusPerWeek'),
  generateSurveyVariableCellValue(participant, 'hoursCoachCommutePerWeek'),
  generateSurveyVariableCellValue(participant, 'hoursUrbanTrainPerWeek'),
  generateSurveyVariableCellValue(participant, 'categoryCarTravel'),
  generateSurveyVariableCellValue(participant, 'motorTypeCarTravel'),
  generateSurveyVariableCellValue(participant, 'ageCategoryCarTravel'),
  generateSurveyVariableCellValue(participant, 'kmCarTravelPerYear'),
  generateSurveyVariableCellValue(participant, 'passengersPerCarTravel'),
  generateSurveyVariableCellValue(participant, 'kmCoachTravel'),
  generateSurveyVariableCellValue(participant, 'kmCountryTrain'),
  generateSurveyVariableCellValue(participant, 'kmPlane'),
];

// Grid Headers
const computeSurveyVariablesGridHeaders = () => {
  return [
    [
      generateCellTitle(),
      generateCellTitle(),
      ...computeFoodHeaderFirstRow(),
      ...computeTransportHeaderFirstRow(),
    ],
    [
      generateCellTitle(),
      generateCellTitle(),
      ...computeFoodHeaderSecondRow(),
      ...computeTransportHeaderSecondRow(),
    ],
    [
      generateCellTitle(),
      generateCellTitle(),
      ...computeFoodHeaderThirdRow(),
      ...computeTransportHeaderThirdRow(),
    ],
    [
      ...computeParticipantHeaderFirstRow(),
      ...computeFoodHeaderForthRow(),
      ...computeTransportHeaderForthRow(),
    ],
  ];
};

// Grid values
const computeSurveyVariablesGridValuesForParticipant = (
  participant,
  personaEntity
) => {
  return [
    ...computeParticipantNameAndPersonaRows(participant, personaEntity),
    ...computeFoodValues(participant),
    ...computeTransportValues(participant),
  ];
};

export const computeSurveyVariablesGridValues = (state) => {
  const participantsEntity = selectParticipantsEntity(state);
  const personaEntity = selectPersonaEntity(state);

  return Object.keys(participantsEntity).map((participantId) => {
    const participant = participantsEntity[participantId];
    return computeSurveyVariablesGridValuesForParticipant(
      participant,
      personaEntity
    );
  });
};

export const selectSurveyVariablesGrid = (state) => {
  return [
    ...computeSurveyVariablesGridHeaders(),
    ...computeSurveyVariablesGridValues(state),
  ];
};

export const selectSurveyVariables = (surveyVariablesRow) => {
  // The first row contains participant information
  const [participantRow] = surveyVariablesRow;
  const { participantId } = participantRow;
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
