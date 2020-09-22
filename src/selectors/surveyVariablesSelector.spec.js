import {
  computeSurveyVariablesGridValues,
  mergeGrids,
  selectModifiedSurveyVariables,
  selectParticipantIdsToCheck,
  selectParticipantsGrid,
  selectSurveyVariables,
} from './surveyVariablesSelector';

describe('SurveyVariables selector', () => {
  test('should return SurveyVariables Grid', () => {
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
          participantId: 1,
          // translate: false,
          // colSpan: 1,
          // rowSpan: 1,
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
          originalValue: 0.4,
          surveyVariableKey: 'meatAndFishConsoPerDay',
        },
        {
          value: 0.5,
          originalValue: 0.5,
          surveyVariableKey: 'eggsAndDairiesConsoPerDay',
        },
        {
          value: 0.6,
          originalValue: 0.6,
          surveyVariableKey: 'fruitsAndVegetablePercentageLocal',
        },
        {
          value: 3,
          originalValue: 3,
          surveyVariableKey: 'transformedProductsConsoPerWeek',
        },
        {
          value: 0,
          originalValue: 0,
          surveyVariableKey: 'alcoholConsoGlassPerDay',
        },
        {
          value: '',
          originalValue: '',
          surveyVariableKey: 'hotDrinksConsoGlassPerDay',
        },
        {
          value: 2,
          originalValue: 2,
          surveyVariableKey: 'juicesAndSodasConsoGlassPerDay',
        },
        {
          value: '',
          originalValue: '',
          surveyVariableKey: 'categoryCarCommute',
        },
        {
          value: '',
          originalValue: '',
          surveyVariableKey: 'motorTypeCarCommute',
        },
        {
          value: '',
          originalValue: '',
          surveyVariableKey: 'ageCategoryCarCommute',
        },
        {
          value: '',
          originalValue: '',
          surveyVariableKey: 'kmCarCommutePerDay',
        },
        {
          value: '',
          originalValue: '',
          surveyVariableKey: 'passengersPerCarCommute',
        },
        {
          value: '',
          originalValue: '',
          surveyVariableKey: 'hoursUrbanBusPerWeek',
        },
        {
          value: '',
          originalValue: '',
          surveyVariableKey: 'hoursCoachCommutePerWeek',
        },
        {
          value: '',
          originalValue: '',
          surveyVariableKey: 'hoursUrbanTrainPerWeek',
        },
        {
          value: '',
          originalValue: '',
          surveyVariableKey: 'categoryCarTravel',
        },
        {
          value: '',
          originalValue: '',
          surveyVariableKey: 'motorTypeCarTravel',
        },
        {
          value: '',
          originalValue: '',
          surveyVariableKey: 'ageCategoryCarTravel',
        },
        {
          value: '',
          originalValue: '',
          surveyVariableKey: 'kmCarTravelPerYear',
        },
        {
          value: '',
          originalValue: '',
          surveyVariableKey: 'passengersPerCarTravel',
        },
        { value: '', originalValue: '', surveyVariableKey: 'kmCoachTravel' },
        { value: '', originalValue: '', surveyVariableKey: 'kmCountryTrain' },
        { value: '', originalValue: '', surveyVariableKey: 'kmPlane' },
      ],
    ];
    const state = {
      workshop: {
        entities: {
          participants: {
            '1': {
              id: 1,
              firstName: 'John',
              lastName: 'McEnroe',
              surveyVariables,
            },
          },
        },
      },
    };
    const result = computeSurveyVariablesGridValues(state);
    // console.log(result);
    expect(result).toEqual(expected);
  });
  test('should transform SurveyVariables Grid to SurveyVariables map', () => {
    const surveyVariablesRow = [
      {
        value: 'Nicolas G',
        readOnly: true,
        participantId: 1,
      },
      {
        value: 'Rodolphe Bieuville',
        readOnly: true,
        translate: false,
        colSpan: 1,
        rowSpan: 1,
      },
      {
        value: '1.5',
        originalValue: '1.5',
        surveyVariableKey: 'meatAndFishConsoPerDay',
      },
      {
        value: '2',
        originalValue: '2',
        surveyVariableKey: 'eggsAndDairiesConsoPerDay',
      },
      {
        value: '0.9',
        originalValue: '0.9',
        surveyVariableKey: 'fruitsAndVegetablePercentageLocal',
      },
      {
        value: '1',
        originalValue: '1',
        surveyVariableKey: 'transformedProductsConsoPerWeek',
      },
      {
        value: '0',
        originalValue: '0',
        surveyVariableKey: 'alcoholConsoGlassPerDay',
      },
      {
        value: '0',
        originalValue: '0',
        surveyVariableKey: 'hotDrinksConsoGlassPerDay',
      },
      {
        value: '1',
        originalValue: '1',
        surveyVariableKey: 'juicesAndSodasConsoGlassPerDay',
      },
    ];
    // [
    //   {
    //     value: 'Nicolas H',
    //     readOnly: true,
    //     translate: false,
    //     colSpan: 1,
    //     rowSpan: 1,
    //   },
    //   {
    //     value: 'Nestor Michelin',
    //     readOnly: true,
    //     translate: false,
    //     colSpan: 1,
    //     rowSpan: 1,
    //   },
    //   { value: '2', key: 'meatAndFishConsoPerDay' },
    //   { value: '2', key: 'eggsAndDairiesConsoPerDay' },
    //   { value: '0.5', key: 'fruitsAndVegetablePercentageLocal' },
    //   { value: '3', key: 'transformedProductsConsoPerWeek' },
    //   { value: '1', key: 'alcoholConsoGlassPerDay' },
    //   { value: '5', key: 'hotDrinksConsoGlassPerDay' },
    //   { value: '1', key: 'juicesAndSodasConsoGlassPerDay' },
    // ],

    const expected = {
      participantId: 1,
      surveyVariables: {
        meatAndFishConsoPerDay: '1.5',
        eggsAndDairiesConsoPerDay: '2',
        fruitsAndVegetablePercentageLocal: '0.9',
        transformedProductsConsoPerWeek: '1',
        alcoholConsoGlassPerDay: '0',
        hotDrinksConsoGlassPerDay: '0',
        juicesAndSodasConsoGlassPerDay: '1',
      },
    };
    const result = selectSurveyVariables(surveyVariablesRow);
    expect(result).toEqual(expected);
  });
  test('should return the list of modified surveyVariables', () => {
    const participant1SurveyVariablesRow = [
      {
        value: 'Participant 1',
        readOnly: true,
        participantId: 1,
      },
      {
        value: 'Rodolphe Bieuville',
        readOnly: true,
        translate: false,
        colSpan: 1,
        rowSpan: 1,
      },
      {
        value: '2',
        originalValue: '1.5',
        surveyVariableKey: 'meatAndFishConsoPerDay',
      },
      {
        value: '2',
        originalValue: '2',
        surveyVariableKey: 'eggsAndDairiesConsoPerDay',
      },
      {
        value: '0.9',
        originalValue: '0.9',
        surveyVariableKey: 'fruitsAndVegetablePercentageLocal',
      },
    ];
    const participant2SurveyVariablesRow = [
      {
        value: 'Participant 2',
        readOnly: true,
        participantId: 2,
      },
      {
        value: 'Rodolphe Bieuville',
        readOnly: true,
        translate: false,
        colSpan: 1,
        rowSpan: 1,
      },
      {
        value: '1.5',
        originalValue: '1.5',
        surveyVariableKey: 'meatAndFishConsoPerDay',
      },
      {
        value: '2',
        originalValue: '2',
        surveyVariableKey: 'eggsAndDairiesConsoPerDay',
      },
      {
        value: '0.8',
        originalValue: '0.8',
        surveyVariableKey: 'fruitsAndVegetablePercentageLocal',
      },
    ];
    const participant3SurveyVariablesRow = [
      {
        value: 'Participant 3',
        readOnly: true,
        participantId: 3,
      },
      {
        value: 'Rodolphe Bieuville',
        readOnly: true,
        translate: false,
        colSpan: 1,
        rowSpan: 1,
      },
      {
        value: '1.5',
        originalValue: '1.5',
        surveyVariableKey: 'meatAndFishConsoPerDay',
      },
      {
        value: '2',
        originalValue: '2',
        surveyVariableKey: 'eggsAndDairiesConsoPerDay',
      },
      {
        value: '0.5',
        originalValue: '0.9',
        surveyVariableKey: 'fruitsAndVegetablePercentageLocal',
      },
    ];

    const result1 = selectModifiedSurveyVariables([
      participant1SurveyVariablesRow,
      participant2SurveyVariablesRow,
    ]);
    const expected1 = [
      {
        participantId: 1,
        surveyVariables: {
          meatAndFishConsoPerDay: '2',
          eggsAndDairiesConsoPerDay: '2',
          fruitsAndVegetablePercentageLocal: '0.9',
        },
      },
    ];
    expect(result1).toEqual(expected1);

    const result2 = selectModifiedSurveyVariables([
      participant2SurveyVariablesRow,
    ]);
    expect(result2).toEqual([]);
    const result3 = selectModifiedSurveyVariables([
      participant1SurveyVariablesRow,
      participant2SurveyVariablesRow,
      participant3SurveyVariablesRow,
    ]);
    const expected3 = [
      {
        participantId: 1,
        surveyVariables: {
          meatAndFishConsoPerDay: '2',
          eggsAndDairiesConsoPerDay: '2',
          fruitsAndVegetablePercentageLocal: '0.9',
        },
      },
      {
        participantId: 3,
        surveyVariables: {
          meatAndFishConsoPerDay: '1.5',
          eggsAndDairiesConsoPerDay: '2',
          fruitsAndVegetablePercentageLocal: '0.5',
        },
      },
    ];
    expect(result3).toEqual(expected3);
  });
  test('should merge 2 grids', () => {
    const participantGrid = [
      [
        {
          value: 'Participant1',
          readOnly: true,
          participantId: 1,
        },
        {
          value: 'Persona 1',
          readOnly: true,
          translate: false,
          colSpan: 1,
          rowSpan: 1,
        },
      ],
      [
        {
          value: 'Participant2',
          readOnly: true,
          participantId: 2,
        },
        {
          value: 'Persona 2',
          readOnly: true,
          translate: false,
          colSpan: 1,
          rowSpan: 1,
        },
      ],
    ];
    const surveyVariablesGrid = [
      [
        {
          value: '1.5',
          originalValue: '1.5',
          surveyVariableKey: 'meatAndFishConsoPerDay',
        },
        {
          value: '2',
          originalValue: '2',
          surveyVariableKey: 'eggsAndDairiesConsoPerDay',
        },
      ],
      [
        {
          value: '1.5',
          originalValue: '1.5',
          surveyVariableKey: 'meatAndFishConsoPerDay',
        },
        {
          value: '2',
          originalValue: '2',
          surveyVariableKey: 'eggsAndDairiesConsoPerDay',
        },
      ],
    ];
    const expectedGrid = [
      [
        {
          value: 'Participant1',
          readOnly: true,
          participantId: 1,
        },
        {
          value: 'Persona 1',
          readOnly: true,
          translate: false,
          colSpan: 1,
          rowSpan: 1,
        },
        {
          value: '1.5',
          originalValue: '1.5',
          surveyVariableKey: 'meatAndFishConsoPerDay',
        },
        {
          value: '2',
          originalValue: '2',
          surveyVariableKey: 'eggsAndDairiesConsoPerDay',
        },
      ],
      [
        {
          value: 'Participant2',
          readOnly: true,
          participantId: 2,
        },
        {
          value: 'Persona 2',
          readOnly: true,
          translate: false,
          colSpan: 1,
          rowSpan: 1,
        },
        {
          value: '1.5',
          originalValue: '1.5',
          surveyVariableKey: 'meatAndFishConsoPerDay',
        },
        {
          value: '2',
          originalValue: '2',
          surveyVariableKey: 'eggsAndDairiesConsoPerDay',
        },
      ],
    ];
    const result = mergeGrids(participantGrid, surveyVariablesGrid);
    expect(result).toEqual(expectedGrid);
  });
  test('should return participant Ids to check', () => {
    const participantGrid = [
      [
        {
          value: 'Participant1',
          readOnly: true,
          participantId: 1,
        },
        {
          value: 'Persona 1',
          readOnly: true,
          translate: false,
          colSpan: 1,
          rowSpan: 1,
        },
        { value: 'data_to_check' },
      ],
      [
        {
          value: 'Participant2',
          readOnly: true,
          participantId: 2,
        },
        {
          value: 'Persona 2',
          readOnly: true,
          translate: false,
          colSpan: 1,
          rowSpan: 1,
        },
        { value: 'ready' },
      ],
    ];
    const expected = [1];

    const result = selectParticipantIdsToCheck(participantGrid);
    expect(result).toEqual(expected);
  });
});
