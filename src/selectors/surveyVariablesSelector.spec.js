import { selectSurveyVariablesGrid } from './surveyVariablesSelector';

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
    [{ colSpan: 7, readOnly: true, translate: true, value: 'food.food' }],
    [
      { readOnly: true, translate: true, value: 'food.meatAndFish' },
      { readOnly: true, translate: true, value: 'food.eggsAndDairies' },
      { colSpan: 2, readOnly: true, translate: true, value: 'food.other' },
      { colSpan: 3, readOnly: true, translate: true, value: 'food.drinks' },
    ],
    [
      { readOnly: true, translate: true, value: 'food.consumption' },
      { readOnly: true, translate: true, value: 'food.consumption' },
      {
        readOnly: true,
        translate: true,
        value: 'food.fruitsAndVegetableLocal',
      },
      { readOnly: true, translate: true, value: 'food.transformedProducts' },
      { readOnly: true, translate: true, value: 'food.alcohol' },
      { readOnly: true, translate: true, value: 'food.hotDrinks' },
      { readOnly: true, translate: true, value: 'food.juicesAndSodas' },
    ],
    [
      { readOnly: true, translate: true, value: 'food.consumptionPerDay' },
      { readOnly: true, translate: true, value: 'food.consumptionPerDay' },
      {
        readOnly: true,
        translate: true,
        value: 'food.percentageFruitsAndVegetableLocal',
      },
      { readOnly: true, translate: true, value: 'food.consumptionPerWeek' },
      { readOnly: true, translate: true, value: 'food.consumptionPerDay' },
      { readOnly: true, translate: true, value: 'food.consumptionPerDay' },
      { readOnly: true, translate: true, value: 'food.consumptionPerDay' },
    ],
    [
      { value: 0.4 },
      { value: 0.5 },
      { value: 0.6 },
      { value: 3 },
      { value: 0 },
      { value: 1 },
      { value: 2 },
    ],
  ];
  const state = {
    workshop: { entities: { participants: { '1': { surveyVariables } } } },
  };
  test('should return SurveyVariables Grid', () => {
    const result = selectSurveyVariablesGrid(state, '1');
    expect(result).toEqual(expected);
  });
});
