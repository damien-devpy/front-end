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

// Participant
const computeParticipantHeaderFirstRow = () => [
  generateCellTitle('common.participant'),
  generateCellTitle('common.persona'),
];

const computeParticipantNameAndPersonaRows = (participant, personaEntity) => {
  const { firstName = '', lastName = '', personaId } = participant;
  const persona = pathOr({}, [personaId], personaEntity);
  const { firstName: personaFirstName, lastName: personaLastname } = persona;
  return [
    generateCellValue(`${firstName} ${lastName}`, true),
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

const computeFoodValues = (participant) => {
  const surveyVariables = pathOr({}, ['surveyVariables'], participant);
  const getValue = (key) => surveyVariables[key];
  return [
    generateCellValue(getValue('meatAndFishConsoPerDay')),
    generateCellValue(getValue('eggsAndDairiesConsoPerDay')),
    generateCellValue(getValue('fruitsAndVegetablePercentageLocal')),
    generateCellValue(getValue('transformedProductsConsoPerWeek')),
    generateCellValue(getValue('alcoholConsoGlassPerDay')),
    generateCellValue(getValue('hotDrinksConsoGlassPerDay')),
    generateCellValue(getValue('juicesAndSodasConsoGlassPerDay')),
  ];
};

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

const computeTransportValues = (participant) => {
  const surveyVariables = pathOr({}, ['surveyVariables'], participant);
  const getValue = (key) => surveyVariables[key];
  return [
    generateCellValue(getValue('categoryCarCommute')),
    generateCellValue(getValue('motorTypeCarCommute')),
    generateCellValue(getValue('ageCategoryCarCommute')),
    generateCellValue(getValue('kmCarCommutePerDay')),
    generateCellValue(getValue('passengersPerCarCommute')),
    generateCellValue(getValue('hoursUrbanBusPerWeek')),
    generateCellValue(getValue('hoursCoachCommutePerWeek')),
    generateCellValue(getValue('hoursUrbanTrainPerWeek')),
    generateCellValue(getValue('categoryCarTravel')),
    generateCellValue(getValue('motorTypeCarTravel')),
    generateCellValue(getValue('ageCategoryCarTravel')),
    generateCellValue(getValue('kmCarTravelPerYear')),
    generateCellValue(getValue('passengersPerCarTravel')),
    generateCellValue(getValue('kmCoachTravel')),
    generateCellValue(getValue('kmCountryTrain')),
    generateCellValue(getValue('kmPlane')),
  ];
};

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

// eslint-disable-next-line import/prefer-default-export
export const selectSurveyVariablesGrid = (state) => {
  return [
    ...computeSurveyVariablesGridHeaders(),
    ...computeSurveyVariablesGridValues(state),
  ];
};
