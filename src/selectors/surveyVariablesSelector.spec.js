import { computeSurveyVariablesGridValues } from './surveyVariablesSelector';

describe('SurveyVariables selector', () => {
  const surveyVariables = {
    meatAndFishConsoPerDay: 0.4,
    eggsAndDairiesConsoPerDay: 0.5,
    fruitsAndVegetablePercentageLocal: 0.6,
    transformedProductsConsoPerWeek: 3,
    alcoholConsoGlassPerDay: 0,
    hotDrinksConsoPerDay: 1,
    juicesAndSodasConsoGlassPerDay: 2,
  };
  const expected = [
    [
      {
        value: 'John McEnroe',
        readOnly: true,
        translate: false,
        colSpan: 1,
        rowSpan: 1,
      },
      {
        value: 'common.personified',
        readOnly: true,
        translate: true,
        colSpan: 1,
        rowSpan: 1,
      },
      {
        value: 0.4,
        readOnly: false,
        translate: false,
        colSpan: 1,
        rowSpan: 1,
      },
      {
        value: 0.5,
        readOnly: false,
        translate: false,
        colSpan: 1,
        rowSpan: 1,
      },
      {
        value: 0.6,
        readOnly: false,
        translate: false,
        colSpan: 1,
        rowSpan: 1,
      },
      {
        value: 3,
        readOnly: false,
        translate: false,
        colSpan: 1,
        rowSpan: 1,
      },
      {
        value: 0,
        readOnly: false,
        translate: false,
        colSpan: 1,
        rowSpan: 1,
      },
      {
        value: '',
        readOnly: false,
        translate: false,
        colSpan: 1,
        rowSpan: 1,
      },
      {
        value: 2,
        readOnly: false,
        translate: false,
        colSpan: 1,
        rowSpan: 1,
      },
      {
        value: '',
        readOnly: false,
        translate: false,
        colSpan: 1,
        rowSpan: 1,
      },
      {
        value: '',
        readOnly: false,
        translate: false,
        colSpan: 1,
        rowSpan: 1,
      },
      {
        value: '',
        readOnly: false,
        translate: false,
        colSpan: 1,
        rowSpan: 1,
      },
      {
        value: '',
        readOnly: false,
        translate: false,
        colSpan: 1,
        rowSpan: 1,
      },
      {
        value: '',
        readOnly: false,
        translate: false,
        colSpan: 1,
        rowSpan: 1,
      },
      {
        value: '',
        readOnly: false,
        translate: false,
        colSpan: 1,
        rowSpan: 1,
      },
      {
        value: '',
        readOnly: false,
        translate: false,
        colSpan: 1,
        rowSpan: 1,
      },
      {
        value: '',
        readOnly: false,
        translate: false,
        colSpan: 1,
        rowSpan: 1,
      },
      {
        value: '',
        readOnly: false,
        translate: false,
        colSpan: 1,
        rowSpan: 1,
      },
      {
        value: '',
        readOnly: false,
        translate: false,
        colSpan: 1,
        rowSpan: 1,
      },
      {
        value: '',
        readOnly: false,
        translate: false,
        colSpan: 1,
        rowSpan: 1,
      },
      {
        value: '',
        readOnly: false,
        translate: false,
        colSpan: 1,
        rowSpan: 1,
      },
      {
        value: '',
        readOnly: false,
        translate: false,
        colSpan: 1,
        rowSpan: 1,
      },
      {
        value: '',
        readOnly: false,
        translate: false,
        colSpan: 1,
        rowSpan: 1,
      },
      {
        value: '',
        readOnly: false,
        translate: false,
        colSpan: 1,
        rowSpan: 1,
      },
      {
        value: '',
        readOnly: false,
        translate: false,
        colSpan: 1,
        rowSpan: 1,
      },
    ],
  ];
  const state = {
    workshop: {
      entities: {
        participants: {
          '1': { firstName: 'John', lastName: 'McEnroe', surveyVariables },
        },
      },
    },
  };
  test('should return SurveyVariables Grid', () => {
    const result = computeSurveyVariablesGridValues(state);
    expect(result).toEqual(expected);
  });
});
