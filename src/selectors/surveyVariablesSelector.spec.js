import {
  computeSurveyVariablesGridValues,
  mergeGrids,
  selectModifiedSurveyVariables,
  selectParticipantIdsToCheck,
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
          value: 0.4,
          originalValue: 0.4,
          readOnly: true,
          surveyVariableKey: 'meatAndFishConsoPerDay',
          min: 0,
          max: 2,
          type: 'number',
        },
        {
          value: 0.5,
          originalValue: 0.5,
          readOnly: true,
          surveyVariableKey: 'eggsAndDairiesConsoPerDay',
          min: 0,
          max: 3,
          type: 'number',
        },
        {
          value: 0.6,
          originalValue: 0.6,
          readOnly: true,
          surveyVariableKey: 'fruitsAndVegetablePercentageLocal',
          min: 0.01,
          max: 1,
          type: 'number',
        },
        {
          value: 3,
          originalValue: 3,
          readOnly: true,
          surveyVariableKey: 'transformedProductsConsoPerWeek',
          min: 0,
          max: 10,
          type: 'number',
        },
        {
          value: 0,
          originalValue: 0,
          readOnly: true,
          surveyVariableKey: 'alcoholConsoGlassPerDay',
          min: 0,
          max: 5,
          type: 'number',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'hotDrinksConsoGlassPerDay',
          min: 0,
          max: 5,
          type: 'number',
        },
        {
          value: 2,
          originalValue: 2,
          readOnly: true,
          surveyVariableKey: 'juicesAndSodasConsoGlassPerDay',
          min: 0,
          max: 5,
          type: 'number',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'categoryCarCommute',
          availableKeysValues: [
            { key: 'SPORT', value: 'SPORT' },
            { key: 'BIG', value: 'MONOSPACE' },
            { key: 'URBAN', value: 'URBAINE' },
            { key: 'LOW_CARBON', value: 'BAS CARBONE' },
          ],
          type: 'string',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'motorTypeCarCommute',
          availableKeysValues: [
            { key: 'HYBRID', value: 'HYBRIDE' },
            { key: 'FUEL', value: 'ESSENCE' },
            { key: 'ELECTRIC', value: 'ELECTRIQUE' },
          ],
          type: 'string',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'ageCategoryCarCommute',
          availableKeysValues: [
            { key: 'TEN_YEARS_OR_YOUNGER', value: 'MOINS DE 10 ANS' },
            {
              key: 'BEETWEEN_TEN_AND_FIFTEEN_YEARS',
              value: 'ENTRE 10 ET 15 ANS',
            },
            { key: 'FIFTEEN_YEARS_OR_OLDER', value: 'PLUS DE 15 ANS' },
          ],
          type: 'string',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'kmCarCommutePerDay',
          min: 0,
          max: 100,
          type: 'number',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'passengersPerCarCommute',
          min: 1,
          max: 5,
          type: 'number',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'hoursUrbanBusPerWeek',
          min: 0,
          max: 15,
          type: 'number',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'hoursCoachCommutePerWeek',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'hoursUrbanTrainPerWeek',
          min: 0,
          max: 15,
          type: 'number',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'categoryCarTravel',
          availableKeysValues: [
            { key: 'SPORT', value: 'SPORT' },
            { key: 'BIG', value: 'MONOSPACE' },
            { key: 'URBAN', value: 'URBAINE' },
            { key: 'LOW_CARBON', value: 'BAS CARBONE' },
          ],
          type: 'string',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'motorTypeCarTravel',
          availableKeysValues: [
            { key: 'HYBRID', value: 'HYBRIDE' },
            { key: 'FUEL', value: 'ESSENCE' },
            { key: 'ELECTRIC', value: 'ELECTRIQUE' },
          ],
          type: 'string',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'ageCategoryCarTravel',
          availableKeysValues: [
            { key: 'TEN_YEARS_OR_YOUNGER', value: 'MOINS DE 10 ANS' },
            {
              key: 'BEETWEEN_TEN_AND_FIFTEEN_YEARS',
              value: 'ENTRE 10 ET 15 ANS',
            },
            { key: 'FIFTEEN_YEARS_OR_OLDER', value: 'PLUS DE 15 ANS' },
          ],
          type: 'string',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'kmCarTravelPerYear',
          min: 0,
          max: 10000,
          type: 'number',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'passengersPerCarTravel',
          min: 1,
          max: 5,
          type: 'number',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'kmCoachTravel',
          min: 0,
          max: 10000,
          type: 'number',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'kmCountryTrain',
          min: 0,
          max: 10000,
          type: 'number',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'kmPlane',
          min: 0,
          max: 20000,
          type: 'number',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'residentsPerHousing',
          type: 'number',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'housingSurfaceArea',
          type: 'number',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'housingType',
          availableKeysValues: [
            { key: 'HOUSE', value: 'MAISON' },
            { key: 'FLAT', value: 'APPARTEMENT' },
          ],
          type: 'string',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'maintainanceDate',
          availableKeysValues: [
            { key: 'BEFORE_1975', value: 'AVANT 1975' },
            { key: 'BETWEEN_1975_AND_2000', value: 'ENTRE 1975 ET 2000' },
            { key: 'AFTER_2000', value: 'APRES 2000' },
          ],
          type: 'string',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'heatingSystemEnergyType',
          availableKeysValues: [
            { key: 'GAS', value: 'GAZ' },
            { key: 'FUEL_OIL', value: 'FIOUL' },
            { key: 'ELECTRICITY', value: 'ELECTRICITE' },
            { key: 'HEAT_NETWORK', value: 'RESEAU DE CHALEUR' },
            { key: 'WOOD', value: 'BOIS' },
          ],
          type: 'string',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'sanitoryHotWaterEnergyType',
          availableKeysValues: [
            { key: 'GAS', value: 'GAZ' },
            { key: 'FUEL_OIL', value: 'FIOUL' },
            { key: 'ELECTRICITY', value: 'ELECTRICITE' },
            { key: 'HEAT_NETWORK', value: 'RESEAU DE CHALEUR' },
            { key: 'WOOD', value: 'BOIS' },
          ],
          type: 'string',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'cookingAppliancesEnergyType',
          availableKeysValues: [
            { key: 'GAS', value: 'GAZ' },
            { key: 'FUEL_OIL', value: 'FIOUL' },
            { key: 'ELECTRICITY', value: 'ELECTRICITE' },
            { key: 'HEAT_NETWORK', value: 'RESEAU DE CHALEUR' },
            { key: 'WOOD', value: 'BOIS' },
          ],
          type: 'string',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'electricityProvider',
          availableKeysValues: [
            { key: 'ALTERNATIVE', value: 'ALTERNATIF' },
            { key: 'CONVENTIONAL', value: 'CONVENTIONNEL' },
          ],
          type: 'string',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'energyConsumptionKnowledge',
          type: 'boolean',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'elecKwh',
          type: 'number',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'gasKwh',
          type: 'number',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'fuelKwh',
          type: 'number',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'woodKwh',
          type: 'number',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'heatNetworkKwh',
          type: 'number',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'numberBigAppliances',
          type: 'number',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'numberSmallAppliances',
          type: 'number',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'numberBigDevices',
          min: 0,
          max: 5,
          type: 'number',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'numberSmallDevices',
          min: 0,
          max: 10,
          type: 'number',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'internetStreamingHoursPerWeek',
          min: 2,
          max: 20,
          type: 'number',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'activitiesPerMonth',
          min: 5,
          max: 20,
          type: 'number',
        },
        {
          value: '',
          originalValue: '',
          readOnly: true,
          surveyVariableKey: 'clothesNewItems',
          min: 5,
          max: 20,
          type: 'number',
        },
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
    // console.log(JSON.stringify(result));
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
