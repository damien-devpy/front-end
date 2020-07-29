import Ajv from 'ajv';

import surveyVariablesSchema from './surveyVariablesSchema';

const getEiForHeatNetwork = (heatNetworkData, heatNetworkName) => {
  const matches = heatNetworkData
    ? heatNetworkData.filter((row) => row.name === heatNetworkName)
    : [];
  return matches && matches.length > 0
    ? parseFloat(matches[0].emission_intensity)
    : 0;
};

const computeFoodCarbonVariables = (surveyVariables, globalVariables) => {
  const { DAYS_PER_WEEK, DAYS_PER_YEAR, WEEKS_PER_YEAR } = globalVariables;

  // Meat and Fish
  const { meatAndFishConsoPerDay } = surveyVariables;
  const {
    MEAT_AND_FISH_KG_PER_CONSO,
    PART_OF_RED_MEAT,
    PART_OF_WHITE_MEAT,
    PART_OF_FISH,
  } = globalVariables;
  const meatAndFishKgPerYear =
    meatAndFishConsoPerDay * MEAT_AND_FISH_KG_PER_CONSO * DAYS_PER_YEAR; // conversion
  const redMeatKgPerYear = meatAndFishKgPerYear * PART_OF_RED_MEAT; // repartition
  const whiteMeatKgPerYear = meatAndFishKgPerYear * PART_OF_WHITE_MEAT;
  const fishKgPerYear = meatAndFishKgPerYear * PART_OF_FISH;

  // Eggs and diaries
  const { eggsAndDairiesConsoPerDay } = surveyVariables;
  const {
    EGGS_AND_DAIRIES_KG_PER_CONSO,
    PART_OF_EGGS,
    PART_OF_DAIRIES,
  } = globalVariables;

  const eggsAndDairiesKgPerYear =
    eggsAndDairiesConsoPerDay * EGGS_AND_DAIRIES_KG_PER_CONSO * DAYS_PER_YEAR; // conversion
  const eggsKgPerYear = eggsAndDairiesKgPerYear * PART_OF_EGGS; // repartition
  const dairiesKgPerYear = eggsAndDairiesKgPerYear * PART_OF_DAIRIES;

  // Tranformed Products
  const { transformedProductsConsoPerWeek } = surveyVariables;
  const { TRANSFORMED_PRODUCTS_KG_PER_CONSO } = globalVariables;

  const transformedProductsKgPerYear =
    transformedProductsConsoPerWeek *
    TRANSFORMED_PRODUCTS_KG_PER_CONSO *
    WEEKS_PER_YEAR;
  const transformedProductsKgPerDay =
    (TRANSFORMED_PRODUCTS_KG_PER_CONSO * transformedProductsConsoPerWeek) /
    DAYS_PER_WEEK;

  // Local fruits and vegetables
  const {
    FRUITS_AND_VEGETABLES_AVG_CONSO_KG_PER_DAY,
    FRUITS_AND_VEGETABLES_MIN_CONSO_KG_PER_DAY,

    MEAT_AND_FISH_AVG_CONSO_KG_PER_DAY,
    EGGS_AND_DAIRIES_AVG_CONSO_KG_PER_DAY,
    TRANSFORMED_PRODUCTS_AVG_CONSO_KG_PER_DAY,

    FRUITS_AND_VEGETABLES_FROM_MEAT_AND_FISH_SUBSTITION_PERCENTAGE,
    FRUITS_AND_VEGETABLES_FROM_EGGS_AND_DAIRIES_SUBSTITION_PERCENTAGE,
    FRUITS_AND_VEGETABLES_FROM_TRANSFORMED_PRODUCTS_SUBSTITION_PERCENTAGE,
  } = globalVariables;

  // conversion to kg & day
  const meatAndFishKgPerDay =
    meatAndFishConsoPerDay * MEAT_AND_FISH_KG_PER_CONSO;
  const eggsAndDairiesKgPerDay =
    eggsAndDairiesConsoPerDay * EGGS_AND_DAIRIES_KG_PER_CONSO;

  const fruitsAndVegetablesKgPerDay =
    FRUITS_AND_VEGETABLES_AVG_CONSO_KG_PER_DAY +
    (MEAT_AND_FISH_AVG_CONSO_KG_PER_DAY - meatAndFishKgPerDay) *
      FRUITS_AND_VEGETABLES_FROM_MEAT_AND_FISH_SUBSTITION_PERCENTAGE +
    (EGGS_AND_DAIRIES_AVG_CONSO_KG_PER_DAY - eggsAndDairiesKgPerDay) *
      FRUITS_AND_VEGETABLES_FROM_EGGS_AND_DAIRIES_SUBSTITION_PERCENTAGE +
    (TRANSFORMED_PRODUCTS_AVG_CONSO_KG_PER_DAY - transformedProductsKgPerDay) *
      FRUITS_AND_VEGETABLES_FROM_TRANSFORMED_PRODUCTS_SUBSTITION_PERCENTAGE;

  // conversion to year
  const fruitsAndVegetablesKgPerYear =
    DAYS_PER_YEAR *
    Math.max(
      FRUITS_AND_VEGETABLES_MIN_CONSO_KG_PER_DAY,
      fruitsAndVegetablesKgPerDay
    );

  // Starches and groceries
  const {
    STARCHES_AND_GROCERIES_AVG_CONSO_KG_PER_DAY,
    STARCHES_AND_GROCERIES_FROM_MEAT_AND_FISH_SUBSTITION_PERCENTAGE,
    STARCHES_AND_GROCERIES_FROM_EGGS_AND_DAIRIES_SUBSTITION_PERCENTAGE,
    STARCHES_AND_GROCERIES_FROM_TRANSFORMED_PRODUCTS_SUBSTITION_PERCENTAGE,
    STARCHES_AND_GROCERIES_MIN_CONSO_KG_PER_DAY,
  } = globalVariables;

  const starchesAndGroceriesKgPerDay =
    STARCHES_AND_GROCERIES_AVG_CONSO_KG_PER_DAY +
    (MEAT_AND_FISH_AVG_CONSO_KG_PER_DAY - meatAndFishKgPerDay) *
      STARCHES_AND_GROCERIES_FROM_MEAT_AND_FISH_SUBSTITION_PERCENTAGE +
    (EGGS_AND_DAIRIES_AVG_CONSO_KG_PER_DAY - eggsAndDairiesKgPerDay) *
      STARCHES_AND_GROCERIES_FROM_EGGS_AND_DAIRIES_SUBSTITION_PERCENTAGE +
    (TRANSFORMED_PRODUCTS_AVG_CONSO_KG_PER_DAY - transformedProductsKgPerDay) *
      STARCHES_AND_GROCERIES_FROM_TRANSFORMED_PRODUCTS_SUBSTITION_PERCENTAGE;
  const starchesAndGroceriesKgPerYear =
    DAYS_PER_YEAR *
    Math.max(
      STARCHES_AND_GROCERIES_MIN_CONSO_KG_PER_DAY,
      starchesAndGroceriesKgPerDay
    );

  // Drinks - Alcohol
  const {
    alcoholConsoGlassPerDay,
    hotDrinksConsoGlassPerDay,
    juicesAndSodasConsoGlassPerDay,
  } = surveyVariables;
  const {
    ALCOHOL_LITER_PER_GLASS,
    HOT_DRINKS_LITER_PER_GLASS,
    JUICES_AND_SODAS_LITER_PER_GLASS,
  } = globalVariables;

  const alcoholConsoLitersPerYear =
    alcoholConsoGlassPerDay * ALCOHOL_LITER_PER_GLASS * DAYS_PER_YEAR;
  const hotDrinksConsoLitersPerYear =
    hotDrinksConsoGlassPerDay * HOT_DRINKS_LITER_PER_GLASS * DAYS_PER_YEAR;
  const juicesAndSodasConsoLitersPerYear =
    juicesAndSodasConsoGlassPerDay *
    JUICES_AND_SODAS_LITER_PER_GLASS *
    DAYS_PER_YEAR;

  const { fruitsAndVegetablePercentageLocal } = surveyVariables;

  return {
    redMeatKgPerYear,
    whiteMeatKgPerYear,
    fishKgPerYear,

    eggsKgPerYear,
    dairiesKgPerYear,
    transformedProductsKgPerYear,

    fruitsAndVegetablesKgPerYear,
    starchesAndGroceriesKgPerYear,

    alcoholConsoLitersPerYear,
    hotDrinksConsoLitersPerYear,
    juicesAndSodasConsoLitersPerYear,

    fruitsAndVegetablePercentageLocal,
  };
};

const computeTransportCarbonVariables = (surveyVariables, globalVariables) => {
  const { DAYS_PER_YEAR, WEEKS_PER_YEAR } = globalVariables;

  // Car commute
  const { kmCarCommutePerDay } = surveyVariables;
  const kmCarCommutePerYear = kmCarCommutePerDay * DAYS_PER_YEAR;
  const coefficientEnergyEfficientDriving = 1;
  const passengersPerCarCommute = Math.max(
    surveyVariables.passengersPerCarCommute,
    1
  );

  // Urban bus
  const { hoursUrbanBusPerWeek } = surveyVariables;
  const { MEAN_SPEED_URBAN_BUS } = globalVariables;
  const kmUrbanBusPerYear =
    hoursUrbanBusPerWeek * MEAN_SPEED_URBAN_BUS * WEEKS_PER_YEAR;

  // Urban_train
  const { hoursUrbanTrainPerWeek } = surveyVariables;
  const { MEAN_SPEED_URBAN_TRAIN } = globalVariables;
  const kmUrbanTrainPerYear =
    hoursUrbanTrainPerWeek * MEAN_SPEED_URBAN_TRAIN * WEEKS_PER_YEAR;

  // Car Travel
  const passengersPerCarTravel = Math.max(
    surveyVariables.passengersPerCarTravel,
    1
  );

  const {
    categoryCarCommute,
    motorTypeCarCommute,
    ageCategoryCarCommute,
    //
    categoryCarTravel,
    motorTypeCarTravel,
    ageCategoryCarTravel,
    //
    kmCarTravelPerYear,
    //
    kmCoachTravel,
    kmCountryTrain,
    kmPlane,
  } = surveyVariables;

  return {
    kmCarCommutePerYear,
    kmUrbanBusPerYear,
    kmUrbanTrainPerYear,
    coefficientEnergyEfficientDriving,
    categoryCarCommute,
    motorTypeCarCommute,
    ageCategoryCarCommute,
    passengersPerCarCommute,
    categoryCarTravel,
    motorTypeCarTravel,
    ageCategoryCarTravel,
    kmCarTravelPerYear,
    passengersPerCarTravel,
    kmCoachTravel,
    kmCountryTrain,
    kmPlane,
  };
};

const splitConsumptions = (
  energyConsumptionKnowledge,
  energyTypes,
  populationAverageConsoKwhAdjusted,
  invoicesForEnergyTypes,
  energyType
) => {
  // First estimation based on national average
  const kwhEstimationsForEnergyType = {
    hotWater:
      energyTypes.hotWater === energyType
        ? populationAverageConsoKwhAdjusted.hotWater
        : 0,
    cooking:
      energyTypes.cooking === energyType
        ? populationAverageConsoKwhAdjusted.cooking
        : 0,
    heating:
      energyTypes.heating === energyType
        ? populationAverageConsoKwhAdjusted.heating
        : 0,
    electricalAppliances:
      energyTypes.electricalAppliances === energyType
        ? populationAverageConsoKwhAdjusted.electricalAppliances
        : 0,
  };

  if (energyConsumptionKnowledge) {
    // If the participants filled in his energy invoices,
    // check if they use more energy than the average, for the type of enery
    const kwhEstimationsTotalForEnergyType =
      kwhEstimationsForEnergyType.heating +
      kwhEstimationsForEnergyType.hotWater +
      kwhEstimationsForEnergyType.cooking +
      kwhEstimationsForEnergyType.electricalAppliances;

    const ratio =
      invoicesForEnergyTypes[energyType] / kwhEstimationsTotalForEnergyType;
    if (ratio < 1) {
      // If they use less energy than average, just compute a ratio
      kwhEstimationsForEnergyType.heating *= ratio;
      kwhEstimationsForEnergyType.hotWater *= ratio;
      kwhEstimationsForEnergyType.cooking *= ratio;
      kwhEstimationsForEnergyType.electricalAppliances *= ratio;
    } else {
      // If the use more energy than average, transfer the surplus on the
      // usageCategory with the highest variance.
      // i.e. in that order: heating, waterHeating, cooking
      const surplus =
        invoicesForEnergyTypes[energyType] - kwhEstimationsTotalForEnergyType;
      if (energyTypes.heating === energyType) {
        kwhEstimationsForEnergyType.heating += surplus;
      } else if (energyTypes.hotWater === energyType) {
        kwhEstimationsForEnergyType.hotWater += surplus;
      } else if (energyTypes.electricalAppliances === energyType) {
        kwhEstimationsForEnergyType.electricalAppliances += surplus;
      } else {
        kwhEstimationsForEnergyType.cooking += surplus;
      }
    }
  }
  return kwhEstimationsForEnergyType;
};

const computeEnergyCarbonVariables = (
  surveyVariables,
  globalVariables,
  heatNetworkData
) => {
  const {
    energyConsumptionKnowledge,
    heatingSystemEnergyType,
    cookingAppliancesEnergyType,
    sanitoryHotWaterEnergyType,

    elecKwh,
    fuelKwh,
    gasKwh,
    woodKwh,
    heatNetworkKwh,

    housingType,
    housingSurfaceArea,
    maintainanceDate,
  } = surveyVariables;

  const residentsPerHousing = Math.max(surveyVariables.residentsPerHousing, 1);
  const {
    SANITARY_HOT_WATER_CONSO_KWH_PER_PERSON_PER_YEAR,
    SANITARY_HOT_WATER_REDUCTION_PERCENTAGE_PER_PERSON,
    COOKING_APPLIANCES_KWH_PER_PERSON_PER_YEAR,
    COOKING_APPLIANCES_REDUCTION_PERCENTAGE_PER_PERSON,
    LIGHTING_AND_ELECTRICAL_APPLIANCES_CONSO_KWH_PER_PERSON_PER_YEAR,
    LIGHTING_AND_ELECTRICAL_APPLIANCES_REDUCTION_PERCENTAGE_PER_PERSON,
    EI_HOUSING_PER_SURFACE_AREA,
  } = globalVariables;

  const houseSurfaceArea = housingType === 'HOUSE' ? housingSurfaceArea : 0;
  const flatSurfaceArea = housingType === 'FLAT' ? housingSurfaceArea : 0;

  const energyTypes = {
    heating: heatingSystemEnergyType,
    cooking: cookingAppliancesEnergyType,
    hotWater: sanitoryHotWaterEnergyType,
    electricalAppliances: 'ELECTRICITY',
  };
  // dictionnary energy type conso
  const energySurvey = {
    ELECTRICITY: elecKwh,
    FUEL_OIL: fuelKwh,
    GAS: gasKwh,
    WOOD: woodKwh,
    HEAT_NETWORK: heatNetworkKwh,
    // TODO Add HEAT_NETWORK in variables
  };

  const populationAverageConsoKwhAdjusted = {
    hotWater:
      SANITARY_HOT_WATER_CONSO_KWH_PER_PERSON_PER_YEAR *
      residentsPerHousing *
      (1 -
        residentsPerHousing *
          SANITARY_HOT_WATER_REDUCTION_PERCENTAGE_PER_PERSON),
    heating:
      EI_HOUSING_PER_SURFACE_AREA[housingType][maintainanceDate] *
      housingSurfaceArea,
    cooking:
      COOKING_APPLIANCES_KWH_PER_PERSON_PER_YEAR *
      residentsPerHousing *
      (1 -
        residentsPerHousing *
          COOKING_APPLIANCES_REDUCTION_PERCENTAGE_PER_PERSON),
    electricalAppliances:
      LIGHTING_AND_ELECTRICAL_APPLIANCES_CONSO_KWH_PER_PERSON_PER_YEAR *
      residentsPerHousing *
      (1 -
        residentsPerHousing *
          LIGHTING_AND_ELECTRICAL_APPLIANCES_REDUCTION_PERCENTAGE_PER_PERSON),
  };

  const {
    heating: elecHeatingKwh,
    hotWater: elecWaterHeatingKwh,
    cooking: elecCookingKwh,
    electricalAppliances: elecLightningKwh,
  } = splitConsumptions(
    energyConsumptionKnowledge,
    energyTypes,
    populationAverageConsoKwhAdjusted,
    energySurvey,
    'ELECTRICITY'
  );
  const {
    heating: gasHeatingKwh,
    hotWater: gasWaterHeatingKwh,
    cooking: gasCookingKwh,
  } = splitConsumptions(
    energyConsumptionKnowledge,
    energyTypes,
    populationAverageConsoKwhAdjusted,
    energySurvey,
    'GAS'
  );
  const {
    heating: woodHeatingKwh,
    hotWater: woodWaterHeatingKwh,
    cooking: woodCookingKwh,
  } = splitConsumptions(
    energyConsumptionKnowledge,
    energyTypes,
    populationAverageConsoKwhAdjusted,
    energySurvey,
    'WOOD'
  );
  const {
    heating: fuelHeatingKwh,
    hotWater: fuelWaterHeatingKwh,
    cooking: fuelCookingKwh,
  } = splitConsumptions(
    energyConsumptionKnowledge,
    energyTypes,
    populationAverageConsoKwhAdjusted,
    energySurvey,
    'FUEL_OIL'
  );
  const {
    heating: heatNetworkHeatingKwh,
    hotWater: heatNetworkWaterHeatingKwh,
  } = splitConsumptions(
    energyConsumptionKnowledge,
    energyTypes,
    populationAverageConsoKwhAdjusted,
    energySurvey,
    'HEAT_NETWORK'
  );

  const eiHeatNetwork = getEiForHeatNetwork(
    heatNetworkData,
    surveyVariables.heatNetworkName
  );

  return {
    woodHeatingKwh,
    woodCookingKwh,
    woodWaterHeatingKwh,
    gasHeatingKwh,
    gasCookingKwh,
    gasWaterHeatingKwh,
    fuelHeatingKwh,
    fuelCookingKwh,
    fuelWaterHeatingKwh,
    elecHeatingKwh,
    elecCookingKwh,
    elecLightningKwh,
    elecWaterHeatingKwh,
    heatNetworkHeatingKwh,
    heatNetworkWaterHeatingKwh,
    eiHeatNetwork,

    residentsPerHousing,
    houseSurfaceArea,
    flatSurfaceArea,
  };
};

const computeOtherCarbonVariables = (surveyVariables, globalVariables) => {
  const { WEEKS_PER_YEAR, MONTHS_PER_YEAR } = globalVariables;

  const { activitiesPerMonth, internetStreamingHoursPerWeek } = surveyVariables;
  const internetStreamingHoursPerYear =
    WEEKS_PER_YEAR * internetStreamingHoursPerWeek;
  const activitiesPerYear = activitiesPerMonth * MONTHS_PER_YEAR;

  const {
    numberBigAppliances,
    numberSmallAppliances,
    electricityProvider,
    numberSmallDevices,
    numberBigDevices,
    clothesNewItems,
  } = surveyVariables;

  return {
    internetStreamingHoursPerYear,
    activitiesPerYear,

    numberBigAppliances,
    numberSmallAppliances,
    electricityProvider,
    numberSmallDevices,
    numberBigDevices,
    clothesNewItems,
  };
};

const validateAndSetDefaultsSurveyVariables = (surveyVariables) => {
  const ajv = new Ajv({ useDefaults: true, verbose: true, coerceTypes: true });
  const isValid = ajv.validate(surveyVariablesSchema, surveyVariables);
  if (!isValid) {
    console.warn(
      'Validation error for surveyVariables',
      surveyVariables,
      ajv.errors
    );
  }
  return surveyVariables;
};

const computeCarbonVariables = (
  surveyVariables,
  globalVariables,
  heatNetworkData
) => {
  const validatedSurveyVariables = validateAndSetDefaultsSurveyVariables(
    surveyVariables
  );
  const transportCarbonVariables = computeTransportCarbonVariables(
    validatedSurveyVariables,
    globalVariables
  );
  const foodCarbonVariables = computeFoodCarbonVariables(
    validatedSurveyVariables,
    globalVariables
  );
  const energyCarbonVariables = computeEnergyCarbonVariables(
    validatedSurveyVariables,
    globalVariables,
    heatNetworkData
  );
  const otherCarbonVariables = computeOtherCarbonVariables(
    validatedSurveyVariables,
    globalVariables
  );
  return {
    ...transportCarbonVariables,
    ...foodCarbonVariables,
    ...energyCarbonVariables,
    ...otherCarbonVariables,
  };
};
export default computeCarbonVariables;
export {
  getEiForHeatNetwork,
  computeTransportCarbonVariables,
  computeFoodCarbonVariables,
  computeEnergyCarbonVariables,
  computeOtherCarbonVariables,
};
