import computeCarbonVariables, {
  computeEnergyCarbonVariables,
  computeFoodCarbonVariables,
  computeOtherCarbonVariables,
  computeTransportCarbonVariables,
  getEiForHeatingNetwork,
} from './bufferCarbonVariables';

describe('test getEiForHeatingNetwork', () => {
  test('getEiForHeatingNetwork returns correct result with existing parameter', () => {
    // Given
    const networkData = [
      {
        department: '1',
        emission_intensity: '0.1',
        location: 'city_a',
        name: 'name_a',
        type: 'hot',
      },
      {
        department: '2',
        emission_intensity: '0.2',
        location: 'city_b',
        name: 'name_b',
        type: 'hot',
      },
    ];

    const expectedRes = 0.1;

    const res = getEiForHeatingNetwork(networkData, 'name_a');

    expect(res).toStrictEqual(expectedRes);
  });
  test('getEiForHeatingNetwork returns 0 with non existing parameter', () => {
    // Given
    const networkData = [
      {
        department: '1',
        emission_intensity: '0.1',
        location: 'city_a',
        name: 'name_a',
        type: 'hot',
      },
      {
        department: '2',
        emission_intensity: '0.2',
        location: 'city_b',
        name: 'name_b',
        type: 'hot',
      },
    ];

    const expectedRes = 0;

    const res = getEiForHeatingNetwork(networkData, 'name_that_does_not_exist');

    expect(res).toStrictEqual(expectedRes);
  });
  test('getEiForHeatingNetwork returns 0 with null velue', () => {
    // Given
    const networkData = [
      {
        department: '1',
        emission_intensity: '0.1',
        location: 'city_a',
        name: 'name_a',
        type: 'hot',
      },
      {
        department: '2',
        emission_intensity: '0.2',
        location: 'city_b',
        name: 'name_b',
        type: 'hot',
      },
    ];

    const expectedRes = 0;

    const res = getEiForHeatingNetwork(networkData, null);

    expect(res).toStrictEqual(expectedRes);
  });
});

describe('test computeCarbonVariables', () => {
  test('test the whole function', () => {
    const surveyVariables = {
      meatAndFishConsoPerDay: 2,
      eggsAndDairiesConsoPerDay: 4,
      fruitsAndVegetablePercentageLocal: 0.8,
      transformedProductsConsoPerWeek: 0,
      alcoholConsoGlassPerDay: 1,
      hotDrinksConsoGlassPerDay: 2,
      juicesAndSodasConsoGlassPerDay: 0,
      categoryCarCommute: 'SPORT',
      motorTypeCarCommute: 'HYBRID',
      ageCategoryCarCommute: 'TEN_YEARS_OR_YOUNGER',
      kmCarCommutePerDay: 0,
      passengersPerCarCommute: 1,
      hoursUrbanBusPerWeek: 0,
      hoursCoachCommutePerWeek: 1000,
      hoursUrbanTrainPerWeek: 12,
      categoryCarTravel: 'SPORT',
      motorTypeCarTravel: 'HYBRID',
      ageCategoryCarTravel: 'TEN_YEARS_OR_YOUNGER',
      kmCarTravelPerYear: 1,
      passengersPerCarTravel: 0,
      kmCoachTravel: 1000,
      kmCountryTrain: 5000,
      kmPlane: 18000,
      residentsPerHousing: 4,
      housingSurfaceArea: 150,
      housingType: 'HOUSE',
      maintainanceDate: 'BEFORE_1975',
      heatingSystemEnergyType: 'WOOD',
      sanitoryHotWaterEnergyType: 'GAS',
      cookingAppliancesEnergyType: 'ELECTRICITY',
      electricityProvider: 'ALTERNATIVE',
      heatingNetworkName: 0,
      energyConsumptionKnowledge: true,
      elecKwh: 5000,
      gasKwh: 2800,
      fuelKwh: 0,
      woodKwh: 14000,
      numberBigAppliances: 2,
      numberSmallAppliances: 2,
      numberBigDevices: 2,
      numberSmallDevices: 2,
      internetStreamingHoursPerWeek: 2,
      clothesNewItems: 10,
      activitiesPerMonth: 2,
    };
    const globalVariables = {
      WEEKS_PER_YEAR: 52,
      DAYS_PER_YEAR: 365,
      DAYS_PER_WEEK: 7,
      MONTHS_PER_YEAR: 12,
      EI_URBAN_BUS: 0.15,
      MEAN_SPEED_URBAN_BUS: 12,
      EI_COACH: 0.04,
      MEAN_SPEED_COACH: 80,
      EI_MEAT_AND_FISH: 12.89,
      EI_RED_MEAT: 12.89,
      EI_WHITE_MEAT: 12.89,
      EI_FISH: 12.89,
      MEAT_AND_FISH_KG_PER_CONSO: 0.15,
      MEAT_AND_FISH_AVG_CONSO_KG_PER_DAY: 0.13,
      PART_OF_RED_MEAT: 0.33,
      PART_OF_WHITE_MEAT: 0.33,
      PART_OF_FISH: 0.33,
      EI_EGGS: 3.57,
      EI_DAIRIES: 3.57,
      EGGS_AND_DAIRIES_KG_PER_CONSO: 0.11,
      EGGS_AND_DAIRIES_AVG_CONSO_KG_PER_DAY: 0.22,
      PART_OF_EGGS: 0.5,
      PART_OF_DAIRIES: 0.5,
      EI_LOCAL_FRUITS_AND_VEGETABLES: 0.26,
      EI_IMPORTED_FRUITS_AND_VEGETABLES: 2.24,
      FRUITS_AND_VEGETABLES_MIN_CONSO_KG_PER_DAY: 0.16,
      FRUITS_AND_VEGETABLES_AVG_CONSO_KG_PER_DAY: 0.314,
      FRUITS_AND_VEGETABLES_FROM_MEAT_AND_FISH_SUBSTITION_PERCENTAGE: 2,
      FRUITS_AND_VEGETABLES_FROM_EGGS_AND_DAIRIES_SUBSTITION_PERCENTAGE: 2,
      FRUITS_AND_VEGETABLES_FROM_TRANSFORMED_PRODUCTS_SUBSTITION_PERCENTAGE: 2,
      EI_TRANSFORMED_PRODUCTS: 4.32,
      TRANSFORMED_PRODUCTS_KG_PER_CONSO: 0.3,
      TRANSFORMED_PRODUCTS_AVG_CONSO_KG_PER_DAY: 0.158,
      EI_STARCHES_AND_GROCERIES: 1.45,
      STARCHES_AND_GROCERIES_MIN_CONSO_KG_PER_DAY: 0.16,
      STARCHES_AND_GROCERIES_AVG_CONSO_KG_PER_DAY: 0.33,
      STARCHES_AND_GROCERIES_FROM_MEAT_AND_FISH_SUBSTITION_PERCENTAGE: 0.5,
      STARCHES_AND_GROCERIES_FROM_EGGS_AND_DAIRIES_SUBSTITION_PERCENTAGE: 0.5,
      STARCHES_AND_GROCERIES_FROM_TRANSFORMED_PRODUCTS_SUBSTITION_PERCENTAGE: 0.5,
      EI_ALCOHOL: 2.09,
      ALCOHOL_LITER_PER_GLASS: 0.3,
      EI_HOT_DRINKS: 3.08,
      HOT_DRINKS_LITER_PER_GLASS: 0.02,
      EI_JUICES_AND_SODAS: 1.47,
      JUICES_AND_SODAS_LITER_PER_GLASS: 0.2,
      MEAN_SPEED_URBAN_TRAIN: 25,
      EI_URBAN_TRAIN: 0.01,
      EI_COUNTRY_TRAIN: 0.01,
      PASSENGER_PER_TGV: 285,
      PASSENGER_PER_TER: 80,
      EI_PLANE: 0.25,
      EI_BIG_APPLIANCE: 23.3,
      EI_SMALL_APPLIANCE: 7,
      CF_WATER_HEATER: 102.872,
      EI_FURNITURES_PER_SQUARE_METER: 3.95,
      CF_FURNITURES_MIN_ONE_RESIDENT: 73.4044444,
      EI_CONSTRUCTION_HOUSE_PER_SQUARE_METER: 14.167,
      EI_CONSTRUCTION_FLAT_PER_SQUARE_METER: 17.5,
      DEPRECIATION_DURATION: 30,
      EI_MAINTENANCE_PER_SQUARE_METER: 0.694,
      EI_WATER_PER_LITER: 0.000168,
      WATER_CONSO_LITER_PER_YEAR_PER_PERSON: 54020,
      EI_CONVENTIONAL_ELEC_PER_KWH: 0.116,
      EI_ALTERNATIVE_ELEC_PER_KWH: 0.013,
      EI_GAS_PER_KWH: 0.227,
      EI_FUEL_OIL_PER_KWH: 0.323,
      EI_WOOD_PER_KWH: 0.03,
      LIGHTING_AND_ELECTRICAL_APPLIANCES_CONSO_KWH_PER_PERSON_PER_YEAR: 1062.4,
      SANITARY_HOT_WATER_CONSO_KWH_PER_PERSON_PER_YEAR: 711.4,
      COOKING_APPLIANCES_KWH_PER_PERSON_PER_YEAR: 346.4,
      SANITARY_HOT_WATER_REDUCTION_PERCENTAGE_PER_PERSON: 0.05,
      COOKING_APPLIANCES_REDUCTION_PERCENTAGE_PER_PERSON: 0.2,
      LIGHTING_AND_ELECTRICAL_APPLIANCES_REDUCTION_PERCENTAGE_PER_PERSON: 0,
      EI_INTERNET_STREAMING: 0.125,
      CF_INTERNET_OTHERS: 48.66,
      EI_BIG_DEVICES: 47.8,
      EI_SMALL_DEVICES: 12.5,
      CF_SERVICES_GAS: 70.19,
      CF_SERVICES_ELECTRICITY: 62.88,
      CF_GOODS_AND_SERVICES_WITHOUT_ENERGY: 211.92,
      EI_ACTIVITIES_GAS: 0.74,
      EI_ACTIVITIES_ELEC: 0.66,
      EI_ACTIVITIES_WITHOUT_ENERGY: 0.66,
      EI_CLOTHES_PER_ITEM: 22.38,
      EI_HOUSING_PER_SURFACE_AREA: {
        HOUSE: {
          BEFORE_1975: 232.5,
          BETWEEN_1975_AND_2000: 142.5,
          AFTER_2000: 72.5,
        },
        FLAT: {
          BEFORE_1975: 205.1,
          BETWEEN_1975_AND_2000: 115.1,
          AFTER_2000: 45.1,
        },
      },
      EI_CAR: {
        URBAN: {
          FUEL: 0.232,
          ELECTRIC: 0.09915,
          HYBRID: 0.171,
        },
        BIG: {
          FUEL: 0.2665,
          ELECTRIC: 0.139,
          HYBRID: 0.2245,
        },
        SPORT: {
          FUEL: 0.344,
          ELECTRIC: 0.3125,
          HYBRID: 0.3125,
        },
        LOW_CARBON: {
          FUEL: 0.1,
          ELECTRIC: 0.1,
          HYBRID: 0.1,
        },
      },
      MOTOR_AGING_FACTOR: {
        FUEL: {
          TEN_YEARS_OR_YOUNGER: 0.943292608,
          BEETWEEN_TEN_AND_FIFTEEN_YEARS: 1.101343381,
          FIFTEEN_YEARS_OR_OLDER: 1.164876711,
        },
        ELECTRIC: {
          TEN_YEARS_OR_YOUNGER: 1,
          BEETWEEN_TEN_AND_FIFTEEN_YEARS: 1,
          FIFTEEN_YEARS_OR_OLDER: 1,
        },
        HYBRID: {
          TEN_YEARS_OR_YOUNGER: 1,
          BEETWEEN_TEN_AND_FIFTEEN_YEARS: 1,
          FIFTEEN_YEARS_OR_OLDER: 1,
        },
      },
      CF_GAS_SERVICES: 336,
      CF_ELEC_SERVICES: 301,
      CF_OTHER_SERVICES: 363,
    };
    const heatingNetworkData = [
      {
        department: '1',
        emission_intensity: '0.1',
        location: 'city_a',
        name: 'name_a',
        type: 'hot',
      },
      {
        department: '2',
        emission_intensity: '0.2',
        location: 'city_b',
        name: 'name_b',
        type: 'hot',
      },
    ];

    const expectedCarbonVariables = {
      activitiesPerYear: 24,
      ageCategoryCarCommute: 'TEN_YEARS_OR_YOUNGER',
      ageCategoryCarTravel: 'TEN_YEARS_OR_YOUNGER',
      alcoholConsoLitersPerYear: 109.5,
      categoryCarCommute: 'SPORT',
      categoryCarTravel: 'SPORT',
      clothesNewItems: 10,
      coefficientEnergyEfficientDriving: 1,
      dairiesKgPerYear: 80.3,
      eggsKgPerYear: 80.3,
      eiHeatingNetwork: 0,
      elecCookingKwh: 1034.4003822264692,
      elecHeatingKwh: 0,
      elecLightningKwh: 3965.5996177735315,
      elecWaterHeatingKwh: 0,
      electricityProvider: 'ALTERNATIVE',
      fishKgPerYear: 36.135000000000005,
      flatSurfaceArea: 0,
      fruitsAndVegetablePercentageLocal: 0.8,
      fruitsAndVegetablesKgPerYear: 58.4,
      fuelCookingKwh: 0,
      fuelHeatingKwh: 0,
      fuelWaterHeatingKwh: 0,
      gasCookingKwh: 0,
      gasHeatingKwh: 0,
      gasWaterHeatingKwh: 2800,
      hotDrinksConsoLitersPerYear: 14.6,
      houseSurfaceArea: 150,
      internetStreamingHoursPerYear: 104,
      juicesAndSodasConsoLitersPerYear: 0,
      kmCarCommutePerYear: 0,
      kmCarTravelPerYear: 1,
      kmCoachCommutePerYear: 4160000,
      kmCoachTravel: 1000,
      kmCountryTrain: 5000,
      kmPlane: 18000,
      kmUrbanBusPerYear: 0,
      kmUrbanTrainPerYear: 15600,
      motorTypeCarCommute: 'HYBRID',
      motorTypeCarTravel: 'HYBRID',
      networkHeatingKwh: 0,
      numberBigAppliances: 2,
      numberBigDevices: 2,
      numberSmallAppliances: 2,
      numberSmallDevices: 2,
      passengersPerCarCommute: 1,
      passengersPerCarTravel: 1,
      redMeatKgPerYear: 36.135000000000005,
      residentsPerHousing: 4,
      starchesAndGroceriesKgPerYear: 78.11000000000001,
      transformedProductsKgPerYear: 0,
      whiteMeatKgPerYear: 36.135000000000005,
      woodCookingKwh: 0,
      woodHeatingKwh: 14000,
      woodWaterHeatingKwh: 0,
    };
    const actualCarbonVariables = computeCarbonVariables(
      surveyVariables,
      globalVariables,
      heatingNetworkData
    );
    expect(actualCarbonVariables).toStrictEqual(expectedCarbonVariables);
  });

  describe('test computeTransportCarbonVariables', () => {
    const surveyVariables = {
      passengersPerCarCommute: 0,
      kmCarCommutePerDay: 1,
      hoursCoachCommutePerWeek: 2,
      hoursUrbanTrainPerWeek: 3,
      hoursUrbanBusPerWeek: 4,

      categoryCarCommute: 13,
      motorTypeCarCommute: 13,
      ageCategoryCarCommute: 13,
      categoryCarTravel: 13,
      motorTypeCarTravel: 13,
      ageCategoryCarTravel: 13,
      kmCarTravelPerYear: 13,
      kmCoachTravel: 13,
      kmCountryTrain: 13,
      kmPlane: 13,
      passengersPerCarTravel: 13,
    };

    const globalVariables = {
      DAYS_PER_YEAR: 365,
      WEEKS_PER_YEAR: 52,
      MEAN_SPEED_COACH: 10,
      MEAN_SPEED_URBAN_TRAIN: 100,
      MEAN_SPEED_URBAN_BUS: 1000,
    };

    const expectedTransportCarbonVariables = {
      passengersPerCarCommute: 1,
      kmCarCommutePerYear: 365,
      kmCoachCommutePerYear: 1040,
      kmUrbanTrainPerYear: 15600,
      kmUrbanBusPerYear: 208000,

      coefficientEnergyEfficientDriving: 1,

      categoryCarCommute: 13,
      motorTypeCarCommute: 13,
      ageCategoryCarCommute: 13,
      categoryCarTravel: 13,
      motorTypeCarTravel: 13,
      ageCategoryCarTravel: 13,
      kmCarTravelPerYear: 13,
      kmCoachTravel: 13,
      kmCountryTrain: 13,
      kmPlane: 13,
      passengersPerCarTravel: 13,
    };

    const actualTransportCarbonVariables = computeTransportCarbonVariables(
      surveyVariables,
      globalVariables
    );

    expect(actualTransportCarbonVariables).toStrictEqual(
      expectedTransportCarbonVariables
    );
  });
  describe('test computeFoodCarbonVariables', () => {
    const surveyVariables = {
      alcoholConsoGlassPerDay: 1,
      hotDrinksConsoGlassPerDay: 2,
      juicesAndSodasConsoGlassPerDay: 3,

      meatAndFishConsoPerDay: 4,
      eggsAndDairiesConsoPerDay: 5,
      transformedProductsConsoPerWeek: 6,

      fruitsAndVegetablePercentageLocal: 13,
    };

    const globalVariables = {
      DAYS_PER_YEAR: 365,
      WEEKS_PER_YEAR: 52,
      DAYS_PER_WEEK: 7,

      MEAT_AND_FISH_KG_PER_CONSO: 10,
      PART_OF_RED_MEAT: 0.1,
      PART_OF_WHITE_MEAT: 0.2,
      PART_OF_FISH: 0.7,

      EGGS_AND_DAIRIES_KG_PER_CONSO: 20,
      PART_OF_EGGS: 0.4,
      PART_OF_DAIRIES: 0.6,

      TRANSFORMED_PRODUCTS_KG_PER_CONSO: 30,

      MEAT_AND_FISH_AVG_CONSO_KG_PER_DAY: 1,
      EGGS_AND_DAIRIES_AVG_CONSO_KG_PER_DAY: 2,
      TRANSFORMED_PRODUCTS_AVG_CONSO_KG_PER_DAY: 3,

      FRUITS_AND_VEGETABLES_AVG_CONSO_KG_PER_DAY: 60,
      FRUITS_AND_VEGETABLES_MIN_CONSO_KG_PER_DAY: 70,
      FRUITS_AND_VEGETABLES_FROM_MEAT_AND_FISH_SUBSTITION_PERCENTAGE: 2,
      FRUITS_AND_VEGETABLES_FROM_EGGS_AND_DAIRIES_SUBSTITION_PERCENTAGE: 2,
      FRUITS_AND_VEGETABLES_FROM_TRANSFORMED_PRODUCTS_SUBSTITION_PERCENTAGE: 2,

      STARCHES_AND_GROCERIES_AVG_CONSO_KG_PER_DAY: 60,
      STARCHES_AND_GROCERIES_MIN_CONSO_KG_PER_DAY: 70,
      STARCHES_AND_GROCERIES_FROM_MEAT_AND_FISH_SUBSTITION_PERCENTAGE: 2,
      STARCHES_AND_GROCERIES_FROM_EGGS_AND_DAIRIES_SUBSTITION_PERCENTAGE: 2,
      STARCHES_AND_GROCERIES_FROM_TRANSFORMED_PRODUCTS_SUBSTITION_PERCENTAGE: 2,

      ALCOHOL_LITER_PER_GLASS: 0.1,
      HOT_DRINKS_LITER_PER_GLASS: 0.01,
      JUICES_AND_SODAS_LITER_PER_GLASS: 0.001,
    };

    const expectedFoodCarbonVariables = {
      alcoholConsoLitersPerYear: 36.5,
      hotDrinksConsoLitersPerYear: 7.3,
      juicesAndSodasConsoLitersPerYear: 1.095,

      redMeatKgPerYear: 1460,
      whiteMeatKgPerYear: 2920,
      fishKgPerYear: 10220,

      eggsKgPerYear: 14600,
      dairiesKgPerYear: 21900,

      transformedProductsKgPerYear: 9360,

      fruitsAndVegetablesKgPerYear: 25550, // TODO : manual check of this
      starchesAndGroceriesKgPerYear: 25550, // TODO : manual check of this

      fruitsAndVegetablePercentageLocal: 13,
    };

    const actualFoodCarbonVariables = computeFoodCarbonVariables(
      surveyVariables,
      globalVariables
    );

    expect(actualFoodCarbonVariables).toStrictEqual(
      expectedFoodCarbonVariables
    );
  });
});
