import Ajv from 'ajv';

import computeCarbonVariables, {
  computeFoodCarbonVariables,
  computeTransportCarbonVariables,
  getEiForHeatNetwork,
} from './bufferCarbonVariables';

import surveyVariablesSchema from './surveyVariablesSchema';

describe('test getEiForHeatNetwork', () => {
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
  it('should return correct result with existing parameter', () => {
    const res = getEiForHeatNetwork(networkData, 'name_a');
    expect(res).toBe(0.1);
  });
  it('should return 0 with non existing parameter', () => {
    const res = getEiForHeatNetwork(networkData, 'name_that_does_not_exist');
    expect(res).toBe(0);
  });
  it('should return 0 with null value', () => {
    const res = getEiForHeatNetwork(networkData, null);
    expect(res).toBe(0);
  });
  it('should return 0 with undefined value', () => {
    const res = getEiForHeatNetwork(networkData, undefined);
    expect(res).toBe(0);
  });
});

describe('test computeCarbonVariables', () => {
  const globalVariables = {
    WEEKS_PER_YEAR: 52,
    DAYS_PER_YEAR: 365,
    DAYS_PER_WEEK: 7,
    MONTHS_PER_YEAR: 12,
    MEAN_SPEED_URBAN_BUS: 12,
    MEAN_SPEED_COACH: 80,
    MEAT_AND_FISH_KG_PER_CONSO: 0.15,
    MEAT_AND_FISH_AVG_CONSO_KG_PER_DAY: 0.13,
    PART_OF_RED_MEAT: 0.33,
    PART_OF_WHITE_MEAT: 0.33,
    PART_OF_FISH: 0.33,
    EGGS_AND_DAIRIES_KG_PER_CONSO: 0.11,
    EGGS_AND_DAIRIES_AVG_CONSO_KG_PER_DAY: 0.22,
    PART_OF_EGGS: 0.5,
    PART_OF_DAIRIES: 0.5,
    FRUITS_AND_VEGETABLES_MIN_CONSO_KG_PER_DAY: 0.16,
    FRUITS_AND_VEGETABLES_AVG_CONSO_KG_PER_DAY: 0.314,
    FRUITS_AND_VEGETABLES_FROM_MEAT_AND_FISH_SUBSTITION_PERCENTAGE: 2,
    FRUITS_AND_VEGETABLES_FROM_EGGS_AND_DAIRIES_SUBSTITION_PERCENTAGE: 2,
    FRUITS_AND_VEGETABLES_FROM_TRANSFORMED_PRODUCTS_SUBSTITION_PERCENTAGE: 2,
    TRANSFORMED_PRODUCTS_KG_PER_CONSO: 0.3,
    TRANSFORMED_PRODUCTS_AVG_CONSO_KG_PER_DAY: 0.158,
    STARCHES_AND_GROCERIES_MIN_CONSO_KG_PER_DAY: 0.16,
    STARCHES_AND_GROCERIES_AVG_CONSO_KG_PER_DAY: 0.33,
    STARCHES_AND_GROCERIES_FROM_MEAT_AND_FISH_SUBSTITION_PERCENTAGE: 0.5,
    STARCHES_AND_GROCERIES_FROM_EGGS_AND_DAIRIES_SUBSTITION_PERCENTAGE: 0.5,
    STARCHES_AND_GROCERIES_FROM_TRANSFORMED_PRODUCTS_SUBSTITION_PERCENTAGE: 0.5,
    ALCOHOL_LITER_PER_GLASS: 0.3,
    HOT_DRINKS_LITER_PER_GLASS: 0.02,
    JUICES_AND_SODAS_LITER_PER_GLASS: 0.2,
    MEAN_SPEED_URBAN_TRAIN: 25,
    PASSENGER_PER_TGV: 285,
    PASSENGER_PER_TER: 80,
    DEPRECIATION_DURATION: 30,
    WATER_CONSO_LITER_PER_YEAR_PER_PERSON: 54020,
    LIGHTING_AND_ELECTRICAL_APPLIANCES_CONSO_KWH_PER_PERSON_PER_YEAR: 1062.4,
    SANITARY_HOT_WATER_CONSO_KWH_PER_PERSON_PER_YEAR: 711.4,
    COOKING_APPLIANCES_KWH_PER_PERSON_PER_YEAR: 346.4,
    SANITARY_HOT_WATER_REDUCTION_PERCENTAGE_PER_PERSON: 0.05,
    COOKING_APPLIANCES_REDUCTION_PERCENTAGE_PER_PERSON: 0.2,
    LIGHTING_AND_ELECTRICAL_APPLIANCES_REDUCTION_PERCENTAGE_PER_PERSON: 0,
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
  };
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
      heatNetworkName: null,
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
    const heatNetworkData = [
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
      eiHeatNetwork: 0,
      elecCookingKwh: 277.11999999999995,
      elecHeatingKwh: 0,
      elecLightningKwh: 4722.88,
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
      kmCoachTravel: 1000,
      kmCountryTrain: 5000,
      kmPlane: 18000,
      kmUrbanBusPerYear: 0,
      kmUrbanTrainPerYear: 15600,
      motorTypeCarCommute: 'HYBRID',
      motorTypeCarTravel: 'HYBRID',
      heatNetworkHeatingKwh: 0,
      heatNetworkWaterHeatingKwh: 0,
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
      heatNetworkData
    );
    expect(actualCarbonVariables).toStrictEqual(expectedCarbonVariables);
  });

  it('should leave these variables unchanged', () => {
    const surveyVariables = {
      fruitsAndVegetablePercentageLocal: 1,
      categoryCarCommute: 'URBAN',
      motorTypeCarCommute: 'ELECTRIC',
      ageCategoryCarCommute: 'BEETWEEN_TEN_AND_FIFTEEN_YEARS',
      categoryCarTravel: 'URBAN',
      motorTypeCarTravel: 'ELECTRIC',
      ageCategoryCarTravel: 'BEETWEEN_TEN_AND_FIFTEEN_YEARS',
      kmCarTravelPerYear: 8,
      kmCoachTravel: 9,
      kmCountryTrain: 10,
      kmPlane: 11,

      numberBigAppliances: 12,
      numberSmallAppliances: 13,
      electricityProvider: 'CONVENTIONAL',
      numberSmallDevices: 14,
      numberBigDevices: 15,
      clothesNewItems: 16,
    };
    expect(
      computeCarbonVariables({ ...surveyVariables }, globalVariables)
    ).toMatchObject(surveyVariables);
  });
  it('should create these constant variables', () => {
    expect(computeCarbonVariables({}, globalVariables)).toMatchObject({
      coefficientEnergyEfficientDriving: 1,
    });
  });
  describe('test the transport-related variables', () => {
    it('should convert kmCarCommutePerWeek to kmCarCommutePerYear', () => {
      const surveyVariables = { kmCarCommutePerDay: 10 };
      expect(
        computeCarbonVariables(surveyVariables, globalVariables)
      ).toMatchObject({
        kmCarCommutePerYear: 3650,
      });
    });
    it('tests that computeTransportCarbonVariables runs correctly', () => {
      const surveyVariables = {
        passengersPerCarCommute: 0,
        kmCarCommutePerDay: 1,
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
    it('should change passengersPerCarCommute, passengersPerCarTravel if it is 0', () => {
      const surveyVariables = {
        passengersPerCarCommute: 0,
        passengersPerCarTravel: 0,
      };
      expect(
        computeCarbonVariables({ ...surveyVariables }, globalVariables)
      ).toMatchObject({
        passengersPerCarCommute: 1,
        passengersPerCarTravel: 1,
      });
    });
    it('should convert hoursUrbanBusPerWeek to kmUrbanBusPerYear', () => {
      const surveyVariables = {
        hoursUrbanBusPerWeek: 10,
        hoursUrbanTrainPerWeek: 30,
      };
      expect(
        computeCarbonVariables(surveyVariables, {
          ...globalVariables,
          MEAN_SPEED_URBAN_BUS: 80,
          MEAN_SPEED_COACH: 90,
          MEAN_SPEED_URBAN_TRAIN: 100,
        })
      ).toMatchObject({
        kmUrbanBusPerYear: 10 * 52 * 80,
        kmUrbanTrainPerYear: 30 * 52 * 100,
      });
    });
  });
  describe('test the others-related variables', () => {
    it('should convert activitiesPerMonth to activitiesPerYear', () => {
      const surveyVariables = { activitiesPerMonth: 2 };
      expect(
        computeCarbonVariables(surveyVariables, globalVariables)
      ).toMatchObject({
        activitiesPerYear: 24,
      });
    });
    it('should convert internetStreamingHoursPerWeek to internetStreamingHoursPerYear', () => {
      const surveyVariables = { internetStreamingHoursPerWeek: 2 };
      expect(
        computeCarbonVariables(surveyVariables, globalVariables)
      ).toMatchObject({
        internetStreamingHoursPerYear: 104,
      });
    });
  });
  describe('test the food-related variables', () => {
    it('tests that computeFoodCarbonVariables runs correctly', () => {
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

        fruitsAndVegetablesKgPerYear: 25550,
        starchesAndGroceriesKgPerYear: 25550,

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
    it('should split meatAndFishConsoPerDay into redMeatKgPerYear, whiteMeatKgPerYear, and fishKgPerYear', () => {
      const surveyVariables = { meatAndFishConsoPerDay: 2 };
      const newGlobalVariables = {
        ...globalVariables,
        PART_OF_RED_MEAT: 0.1,
        PART_OF_WHITE_MEAT: 0.2,
        PART_OF_FISH: 0.7,
        MEAT_AND_FISH_KG_PER_CONSO: 3,
      };
      expect(
        computeCarbonVariables(surveyVariables, newGlobalVariables)
      ).toMatchObject({
        redMeatKgPerYear: 219,
        whiteMeatKgPerYear: 438,
        fishKgPerYear: 1533,
      });
    });
    it('should split eggsAndDairiesConsoPerDay into eggsKgPerYear and dairiesKgPerYear', () => {
      const surveyVariables = { eggsAndDairiesConsoPerDay: 2 };
      const newGlobalVariables = {
        ...globalVariables,
        PART_OF_EGGS: 0.6,
        PART_OF_DAIRIES: 0.4,
        EGGS_AND_DAIRIES_KG_PER_CONSO: 3,
      };
      expect(
        computeCarbonVariables(surveyVariables, newGlobalVariables)
      ).toMatchObject({
        eggsKgPerYear: 2 * 0.6 * 365 * 3,
        dairiesKgPerYear: 2 * 0.4 * 365 * 3,
      });
    });
    it('should convert transformedProductsConsoPerWeek to transformedProductsKgPerYear', () => {
      const surveyVariables = {
        transformedProductsConsoPerWeek: 3,
      };
      expect(
        computeCarbonVariables(surveyVariables, {
          ...globalVariables,
          TRANSFORMED_PRODUCTS_KG_PER_CONSO: 4,
        })
      ).toMatchObject({
        transformedProductsKgPerYear: 3 * 4 * 52,
      });
    });
    it('should compute fruitsAndVegetablesKgPerYear based on all other foods', () => {
      const surveyVariables = {
        meatAndFishConsoPerDay: 1,
        eggsAndDairiesConsoPerDay: 1,
        transformedProductsConsoPerWeek: 7,
      };
      const newGlobalVariables = {
        ...globalVariables,
        MEAT_AND_FISH_KG_PER_CONSO: 1,
        EGGS_AND_DAIRIES_KG_PER_CONSO: 1,
        TRANSFORMED_PRODUCTS_KG_PER_CONSO: 1,

        MEAT_AND_FISH_AVG_CONSO_KG_PER_DAY: 2,
        EGGS_AND_DAIRIES_AVG_CONSO_KG_PER_DAY: 1,
        TRANSFORMED_PRODUCTS_AVG_CONSO_KG_PER_DAY: 1,

        FRUITS_AND_VEGETABLES_AVG_CONSO_KG_PER_DAY: 0.5,
        FRUITS_AND_VEGETABLES_FROM_MEAT_AND_FISH_SUBSTITION_PERCENTAGE: 2,
        FRUITS_AND_VEGETABLES_FROM_EGGS_AND_DAIRIES_SUBSTITION_PERCENTAGE: 2,
        FRUITS_AND_VEGETABLES_FROM_TRANSFORMED_PRODUCTS_SUBSTITION_PERCENTAGE: 2,
      };
      expect(
        computeCarbonVariables(surveyVariables, newGlobalVariables)
      ).toMatchObject({
        fruitsAndVegetablesKgPerYear: 2.5 * 365,
      });
    });
    it('should compute starchesAndGroceriesKgPerYear based on all other foods', () => {
      const surveyVariables = {
        meatAndFishConsoPerDay: 1,
        eggsAndDairiesConsoPerDay: 1,
        transformedProductsConsoPerWeek: 7,
      };
      const newGlobalVariables = {
        ...globalVariables,
        MEAT_AND_FISH_KG_PER_CONSO: 1,
        EGGS_AND_DAIRIES_KG_PER_CONSO: 1,
        TRANSFORMED_PRODUCTS_KG_PER_CONSO: 1,

        MEAT_AND_FISH_AVG_CONSO_KG_PER_DAY: 2,
        EGGS_AND_DAIRIES_AVG_CONSO_KG_PER_DAY: 1,
        TRANSFORMED_PRODUCTS_AVG_CONSO_KG_PER_DAY: 1,

        STARCHES_AND_GROCERIES_AVG_CONSO_KG_PER_DAY: 0.5,
        STARCHES_AND_GROCERIES_FROM_MEAT_AND_FISH_SUBSTITION_PERCENTAGE: 2,
        STARCHES_AND_GROCERIES_FROM_EGGS_AND_DAIRIES_SUBSTITION_PERCENTAGE: 2,
        STARCHES_AND_GROCERIES_FROM_TRANSFORMED_PRODUCTS_SUBSTITION_PERCENTAGE: 2,
      };
      expect(
        computeCarbonVariables(surveyVariables, newGlobalVariables)
      ).toMatchObject({
        starchesAndGroceriesKgPerYear: 2.5 * 365,
      });
    });
    it('should set fruitsAndVegetablesKgPerYear to FRUITS_AND_VEGETABLES_MIN_CONSO_KG_PER_DAY in case I eat a lot of all other types of foods', () => {
      const surveyVariables = {
        meatAndFishConsoPerDay: 100,
      };
      const newGlobalVariables = {
        ...globalVariables,
        FRUITS_AND_VEGETABLES_MIN_CONSO_KG_PER_DAY: 17,
        STARCHES_AND_GROCERIES_MIN_CONSO_KG_PER_DAY: 18,
      };
      expect(
        computeCarbonVariables(surveyVariables, newGlobalVariables)
      ).toMatchObject({
        fruitsAndVegetablesKgPerYear: 17 * 365,
        starchesAndGroceriesKgPerYear: 18 * 365,
      });
    });
    it('should convert alcoholConsoGlassPerDay to alcoholConsoLitersPerYear', () => {
      const surveyVariables = {
        alcoholConsoGlassPerDay: 1,
        hotDrinksConsoGlassPerDay: 2,
        juicesAndSodasConsoGlassPerDay: 3,
      };
      expect(
        computeCarbonVariables(surveyVariables, {
          ...globalVariables,
          ALCOHOL_LITER_PER_GLASS: 4,
          HOT_DRINKS_LITER_PER_GLASS: 5,
          JUICES_AND_SODAS_LITER_PER_GLASS: 6,
        })
      ).toMatchObject({
        alcoholConsoLitersPerYear: 1 * 4 * 365,
        hotDrinksConsoLitersPerYear: 2 * 5 * 365,
        juicesAndSodasConsoLitersPerYear: 3 * 6 * 365,
      });
    });
  });
  describe('test the energy-related variables', () => {
    it('should change residentsPerHousing to 1 if it is 0', () => {
      const surveyVariables = {
        residentsPerHousing: 0,
      };
      expect(
        computeCarbonVariables({ ...surveyVariables }, globalVariables)
      ).toMatchObject({
        residentsPerHousing: 1,
      });
    });
    it('should set houseSurfaceArea and flatSurfaceArea depending on housingType and housingSurfaceArea', () => {
      const surveyVariables1 = {
        housingType: 'FLAT',
        housingSurfaceArea: 2,
      };
      expect(
        computeCarbonVariables({ ...surveyVariables1 }, globalVariables)
      ).toMatchObject({
        houseSurfaceArea: 0,
        flatSurfaceArea: 2,
      });
      const surveyVariables2 = {
        housingType: 'HOUSE',
        housingSurfaceArea: 2,
      };
      expect(
        computeCarbonVariables({ ...surveyVariables2 }, globalVariables)
      ).toMatchObject({
        houseSurfaceArea: 2,
        flatSurfaceArea: 0,
      });
    });
    it('should use average values if energyConsumptionKnowledge is false', () => {
      const surveyVariables = {
        energyConsumptionKnowledge: false,
        housingSurfaceArea: 100,
        housingType: 'HOUSE',
        maintainanceDate: 'BEFORE_1975',
        heatingSystemEnergyType: 'ELECTRICITY',
        cookingAppliancesEnergyType: 'WOOD',
        sanitoryHotWaterEnergyType: 'GAS',
      };
      const newGlobalVariables = {
        ...globalVariables,
        COOKING_APPLIANCES_KWH_PER_PERSON_PER_YEAR: 10,
        COOKING_APPLIANCES_REDUCTION_PERCENTAGE_PER_PERSON: 0,
        LIGHTING_AND_ELECTRICAL_APPLIANCES_CONSO_KWH_PER_PERSON_PER_YEAR: 20,
        LIGHTING_AND_ELECTRICAL_APPLIANCES_REDUCTION_PERCENTAGE_PER_PERSON: 0,
        SANITARY_HOT_WATER_CONSO_KWH_PER_PERSON_PER_YEAR: 30,
        SANITARY_HOT_WATER_REDUCTION_PERCENTAGE_PER_PERSON: 0,
        EI_HOUSING_PER_SURFACE_AREA: {
          HOUSE: {
            BEFORE_1975: 1,
          },
        },
      };
      expect(
        computeCarbonVariables(surveyVariables, newGlobalVariables)
      ).toMatchObject({
        elecHeatingKwh: 100,
        elecCookingKwh: 0,
        elecLightningKwh: 20,
        elecWaterHeatingKwh: 0,
        woodHeatingKwh: 0,
        woodCookingKwh: 10,
        woodWaterHeatingKwh: 0,
        gasHeatingKwh: 0,
        gasCookingKwh: 0,
        gasWaterHeatingKwh: 30,
        fuelHeatingKwh: 0,
        fuelCookingKwh: 0,
        fuelWaterHeatingKwh: 0,
        heatNetworkHeatingKwh: 0,
        heatNetworkWaterHeatingKwh: 0,
      });
    });
    it('should split elec invoice into average ratios in case the consumption is lower than average', () => {
      const surveyVariables = {
        energyConsumptionKnowledge: true,
        elecKwh: 100,
        housingSurfaceArea: 100,
        housingType: 'HOUSE',
        maintainanceDate: 'BEFORE_1975',
        residentsPerHousing: 1,
        heatingSystemEnergyType: 'ELECTRICITY',
        cookingAppliancesEnergyType: 'ELECTRICITY',
        sanitoryHotWaterEnergyType: 'GAS',
      };
      const newGlobalVariables = {
        ...globalVariables,
        COOKING_APPLIANCES_KWH_PER_PERSON_PER_YEAR: 200,
        COOKING_APPLIANCES_REDUCTION_PERCENTAGE_PER_PERSON: 0,
        LIGHTING_AND_ELECTRICAL_APPLIANCES_CONSO_KWH_PER_PERSON_PER_YEAR: 100,
        LIGHTING_AND_ELECTRICAL_APPLIANCES_REDUCTION_PERCENTAGE_PER_PERSON: 0,
        EI_HOUSING_PER_SURFACE_AREA: {
          HOUSE: {
            BEFORE_1975: 1,
          },
        },
      };
      expect(
        computeCarbonVariables(surveyVariables, newGlobalVariables)
      ).toMatchObject({
        elecHeatingKwh: 25,
        elecCookingKwh: 50,
        elecLightningKwh: 25,
        elecWaterHeatingKwh: 0,
      });
    });
    it('should attribute elec surplus to heating in case the consumption is higher than average', () => {
      const surveyVariables = {
        energyConsumptionKnowledge: true,
        elecKwh: 1000,
        housingSurfaceArea: 100,
        housingType: 'HOUSE',
        maintainanceDate: 'BEFORE_1975',
        residentsPerHousing: 1,
        heatingSystemEnergyType: 'ELECTRICITY',
        cookingAppliancesEnergyType: 'ELECTRICITY',
        sanitoryHotWaterEnergyType: 'GAS',
      };
      const newGlobalVariables = {
        ...globalVariables,
        COOKING_APPLIANCES_KWH_PER_PERSON_PER_YEAR: 200,
        COOKING_APPLIANCES_REDUCTION_PERCENTAGE_PER_PERSON: 0,
        LIGHTING_AND_ELECTRICAL_APPLIANCES_CONSO_KWH_PER_PERSON_PER_YEAR: 100,
        LIGHTING_AND_ELECTRICAL_APPLIANCES_REDUCTION_PERCENTAGE_PER_PERSON: 0,
        EI_HOUSING_PER_SURFACE_AREA: {
          HOUSE: {
            BEFORE_1975: 1,
          },
        },
      };
      expect(
        computeCarbonVariables(surveyVariables, newGlobalVariables)
      ).toMatchObject({
        elecHeatingKwh: 700,
        elecCookingKwh: 200,
        elecLightningKwh: 100,
        elecWaterHeatingKwh: 0,
      });
    });
    it('should also works with HEAT_NETWORK', () => {
      const surveyVariables = {
        energyConsumptionKnowledge: true,
        elecKwh: 100,
        heatNetworkKwh: 200,
        housingSurfaceArea: 100,
        housingType: 'HOUSE',
        maintainanceDate: 'BEFORE_1975',
        residentsPerHousing: 1,
        heatingSystemEnergyType: 'HEAT_NETWORK',
        cookingAppliancesEnergyType: 'GAS',
        sanitoryHotWaterEnergyType: 'HEAT_NETWORK',
      };
      const newGlobalVariables = {
        ...globalVariables,
        COOKING_APPLIANCES_KWH_PER_PERSON_PER_YEAR: 200,
        COOKING_APPLIANCES_REDUCTION_PERCENTAGE_PER_PERSON: 0,
        LIGHTING_AND_ELECTRICAL_APPLIANCES_CONSO_KWH_PER_PERSON_PER_YEAR: 100,
        LIGHTING_AND_ELECTRICAL_APPLIANCES_REDUCTION_PERCENTAGE_PER_PERSON: 0,
        SANITARY_HOT_WATER_CONSO_KWH_PER_PERSON_PER_YEAR: 30,
        SANITARY_HOT_WATER_REDUCTION_PERCENTAGE_PER_PERSON: 0,
        EI_HOUSING_PER_SURFACE_AREA: {
          HOUSE: {
            BEFORE_1975: 1,
          },
        },
      };
      expect(
        computeCarbonVariables(surveyVariables, newGlobalVariables)
      ).toMatchObject({
        elecHeatingKwh: 0,
        elecCookingKwh: 0,
        elecLightningKwh: 100,
        elecWaterHeatingKwh: 0,
        heatNetworkHeatingKwh: 170,
        heatNetworkWaterHeatingKwh: 30,
      });
    });
  });
});

describe('test validateSurveyVariables', () => {
  const ajv = new Ajv({ useDefaults: true, verbose: true });
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
  const isValid = ajv.validate(surveyVariablesSchema, surveyVariables);
  expect(isValid).toBe(true);
});
