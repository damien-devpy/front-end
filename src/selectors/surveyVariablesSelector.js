import { pathOr } from 'ramda';

import { selectParticipantsEntity } from './workshopSelector';

const selectSurveyVariablesForParticipant = (state, participantId) => {
  const participantsEntity = selectParticipantsEntity(state);
  const participantSurveyVariables = pathOr(
    {},
    [participantId, 'surveyVariables'],
    participantsEntity
  );
  return participantSurveyVariables;
};

const selectSurveyVariables = (state) => {
  const participantsEntity = selectParticipantsEntity(state);
  const participantSurveyVariables = '';
  return participantSurveyVariables;
};
const computeSurveyVariablesGridHeaders = () => {
  return [
    [{ value: 'food.food', colSpan: 7, readOnly: true, translate: true }],
    [
      { value: 'food.meatAndFish', readOnly: true, translate: true },
      { value: 'food.eggsAndDairies', readOnly: true, translate: true },
      { value: 'food.other', colSpan: 2, readOnly: true, translate: true },
      { value: 'food.drinks', colSpan: 3, readOnly: true, translate: true },
    ],
    [
      { value: 'food.consumption', readOnly: true, translate: true },
      { value: 'food.consumption', readOnly: true, translate: true },
      {
        value: 'food.fruitsAndVegetableLocal',
        readOnly: true,
        translate: true,
      },
      { value: 'food.transformedProducts', readOnly: true, translate: true },
      { value: 'food.alcohol', readOnly: true, translate: true },
      { value: 'food.hotDrinks', readOnly: true, translate: true },
      { value: 'food.juicesAndSodas', readOnly: true, translate: true },
    ],
    [
      { value: 'food.consumptionPerDay', readOnly: true, translate: true },
      {
        value: 'food.consumptionPerDay',
        readOnly: true,
        translate: true,
      },
      {
        value: 'food.percentageFruitsAndVegetableLocal',
        readOnly: true,
        translate: true,
      },
      {
        value: 'food.consumptionPerWeek',
        readOnly: true,
        translate: true,
      },
      {
        value: 'food.consumptionPerDay',
        readOnly: true,
        translate: true,
      },
      { value: 'food.consumptionPerDay', readOnly: true, translate: true },
      {
        value: 'food.consumptionPerDay',
        readOnly: true,
        translate: true,
      },
    ],
  ];
};

const computeSurveyVariablesGridValues = (surveyVariables) => {
  const getValue = (key) => surveyVariables[key];
  return [
    { value: getValue('meatAndFishConsoPerDay') },
    { value: getValue('eggsAndDairiesConsoPerDay') },
    { value: getValue('fruitsAndVegetablePercentageLocal') },
    { value: getValue('transformedProductsConsoPerWeek') },
    { value: getValue('alcoholConsoGlassPerDay') },
    { value: getValue('hotDrinksConsoPerDay') },
    { value: getValue('juicesAndSodasConsoGlassPerDay') },
  ];
};

// eslint-disable-next-line import/prefer-default-export
export const selectSurveyVariablesGrid = (state, participantId) => {
  return [
    ...computeSurveyVariablesGridHeaders(),
    computeSurveyVariablesGridValues(
      selectSurveyVariablesForParticipant(state, participantId)
    ),
  ];
};

// grid: [
//     [{ value: 1 }, { value: 3 }],
//     [{ value: 2 }, { value: 4 }],
//   ],
