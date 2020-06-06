const WEEKS_PER_YEAR = 51;
const DAYS_PER_YEAR = 365;
const DAYS_PER_WEEK = 7;
const MONTHS_PER_YEAR = 12;

const computeCarbonVariables = (surveyVariables, globalVariables) => {
  // =================
  // ============================ Food ============================
  // =================
  // Meat and Fish ============================
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

  // Eggs and diaries ============================
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

  // Tranformed Products ============================
  const { transformedProductsConsoPerWeek } = surveyVariables;
  const { TRANSFORMED_PRODUCTS_KG_PER_CONSO } = globalVariables;

  const transformedProductsKgPerYear =
    transformedProductsConsoPerWeek *
    TRANSFORMED_PRODUCTS_KG_PER_CONSO *
    WEEKS_PER_YEAR;
  const transformedProductsKgPerDay =
    (TRANSFORMED_PRODUCTS_KG_PER_CONSO * transformedProductsConsoPerWeek) /
    DAYS_PER_WEEK;

  // Local fruits and vegetables ============================

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
  // déjà chargés : MEAT_AND_FISH_KG_PER_CONSO, EGGS_AND_DAIRIES_KG_PER_CONSO

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

  // Starches and groceries ============================
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

  // ====================================================================================
  // ============================ Transport ============================
  // ====================================================================================

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
    hoursUrbanBusPerWeek * WEEKS_PER_YEAR * MEAN_SPEED_URBAN_BUS;

  // Coach commute
  const { hoursCoachCommutePerWeek } = surveyVariables;
  const { MEAN_SPEED_COACH } = globalVariables;
  const kmCoachCommutePerYear = hoursCoachCommutePerWeek * MEAN_SPEED_COACH;

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
  // ====================================================================================
  // ============================ INTERNET ============================
  // ====================================================================================
  const { activitiesPerMonth, internetStreamingHoursPerWeek } = surveyVariables;
  const internetStreamingHoursPerYear =
    WEEKS_PER_YEAR * internetStreamingHoursPerWeek;

  const activitiesPerYear = activitiesPerMonth * MONTHS_PER_YEAR;
  // ====================================================================================
  // ============================ ENERGY ============================
  // ====================================================================================
  // Energy
  const {
    energyConsumptionKnowledge,
    heatingSystemEnergyType,
    cookingAppliancesEnergyType,
    sanitoryHotWaterEnergyType,

    elecKwh,
    fuelKwh,
    gasKwh,
    woodKwh,

    housingType,
    housingSurfaceArea,
    maintainanceDate,
  } = surveyVariables;
  const residentsPerHousing = Math.max(residentsPerHousing, 1);
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

  // dictionnary energy type conso
  const energySurvey = {
    ELECTRICITY: elecKwh,
    FUEL_OIL: fuelKwh,
    GAS: gasKwh,
    WOOD: woodKwh,
  };

  // Average conso
  // BO12 : V_KwhMoyEcs
  const KwhMoyEcs =
    SANITARY_HOT_WATER_CONSO_KWH_PER_PERSON_PER_YEAR *
    residentsPerHousing *
    (1 - SANITARY_HOT_WATER_REDUCTION_PERCENTAGE_PER_PERSON);
  // BN12 : V_KwhMoyCh
  const KwhMoyCh =
    EI_HOUSING_PER_SURFACE_AREA[housingType][maintainanceDate] *
    housingSurfaceArea;
  // BP12 = V_KwhMoyCu
  const KwhMoyCui =
    COOKING_APPLIANCES_KWH_PER_PERSON_PER_YEAR *
    residentsPerHousing *
    (1 - COOKING_APPLIANCES_REDUCTION_PERCENTAGE_PER_PERSON);
  // BQ12 = V_KwhMoyEcEm
  const KwhMoyEcEm =
    LIGHTING_AND_ELECTRICAL_APPLIANCES_CONSO_KWH_PER_PERSON_PER_YEAR *
    residentsPerHousing *
    (1 - LIGHTING_AND_ELECTRICAL_APPLIANCES_REDUCTION_PERCENTAGE_PER_PERSON);

  // const energyConso = 0
  // KwhMoyEcs
  const partitionEcs =
    (heatingSystemEnergyType === sanitoryHotWaterEnergyType ? KwhMoyCh : 0) +
    (cookingAppliancesEnergyType === sanitoryHotWaterEnergyType
      ? KwhMoyCui
      : 0) +
    (sanitoryHotWaterEnergyType === 'ELECTRICITY' ? KwhMoyEcs : 0);

  let energyConso = energySurvey[sanitoryHotWaterEnergyType];

  let KwhEcs = 0;
  if (energyConsumptionKnowledge === true) {
    if (energyConso - partitionEcs - KwhMoyEcs > 0) {
      if (
        heatingSystemEnergyType === sanitoryHotWaterEnergyType ||
        sanitoryHotWaterEnergyType === 'ELECTRICITY'
      ) {
        KwhEcs = KwhMoyEcs;
      } else {
        KwhEcs =
          energyConso -
          (cookingAppliancesEnergyType === sanitoryHotWaterEnergyType
            ? KwhMoyCui
            : 0);
      }
    } else {
      KwhEcs = (KwhMoyEcs / (partitionEcs + KwhMoyEcs)) * energyConso;
    }
  } else {
    KwhEcs = KwhMoyEcs;
  }
  const woodWaterHeatingKwh = (sanitoryHotWaterEnergyType === 'WOOD') * KwhEcs;
  const gasWaterHeatingKwh = (sanitoryHotWaterEnergyType === 'GAS') * KwhEcs;
  const fuelWaterHeatingKwh =
    (sanitoryHotWaterEnergyType === 'FUEL_OIL') * KwhEcs;
  const elecWaterHeatingKwh =
    (sanitoryHotWaterEnergyType === 'ELECTRICITY') * KwhEcs;

  // KwhCh
  const partitionCh =
    (sanitoryHotWaterEnergyType === heatingSystemEnergyType ? KwhMoyEcs : 0) +
    (cookingAppliancesEnergyType === heatingSystemEnergyType ? KwhMoyCui : 0) +
    (heatingSystemEnergyType === 'ELECTRICITY' ? KwhMoyCh : 0);

  energyConso = energySurvey[heatingSystemEnergyType];

  let KwhCh = 0;

  if (energyConsumptionKnowledge) {
    if (energyConso - partitionCh - KwhMoyCh > 0) {
      KwhCh = energyConso;
    } else {
      KwhCh = (KwhMoyCh / (partitionCh + KwhMoyCh)) * energyConso;
    }
  } else {
    KwhCh = KwhMoyCh;
  }
  const woodHeatingKwh = (heatingSystemEnergyType === 'WOOD') * KwhCh;
  const gasHeatingKwh = (heatingSystemEnergyType === 'GAS') * KwhCh;
  const fuelHeatingKwh = (heatingSystemEnergyType === 'FUEL') * KwhCh;
  const elecHeatingKwh = (heatingSystemEnergyType === 'ELECTRICITY') * KwhCh;
  const networkHeatingKwh =
    (heatingSystemEnergyType === 'HEATING_NETWORK') * KwhCh;

  // KwhCui
  const partitionCui =
    (heatingSystemEnergyType === cookingAppliancesEnergyType ? KwhMoyCh : 0) +
    (sanitoryHotWaterEnergyType === cookingAppliancesEnergyType
      ? KwhMoyEcs
      : 0) +
    (cookingAppliancesEnergyType === 'ELECTRICITY' ? KwhMoyEcEm : 0);

  energyConso = energySurvey[cookingAppliancesEnergyType];

  let KwhCui = 0;

  if (energyConsumptionKnowledge) {
    if (energyConso - partitionCui - KwhMoyCui > 0) {
      KwhCui = energyConso;
    } else {
      KwhCui = (KwhMoyCui / (partitionCui + KwhMoyCui)) * energyConso;
    }
  } else {
    KwhCui = KwhMoyCui;
  }
  const woodCookingKwh = (cookingAppliancesEnergyType === 'WOOD') * KwhCui;
  const gasCookingKwh = (cookingAppliancesEnergyType === 'GAS') * KwhCui;
  const fuelCookingKwh = (cookingAppliancesEnergyType === 'FUEL') * KwhCui;
  const elecCookingKwh =
    (cookingAppliancesEnergyType === 'ELECTRICITY') * KwhCui;

  // KwhElec
  const partitionEcEm =
    (heatingSystemEnergyType === 'ELECTRICITY' ? KwhMoyCh : 0) +
    (sanitoryHotWaterEnergyType === 'ELECTRICITY' ? KwhMoyEcs : 0) +
    (cookingAppliancesEnergyType === 'ELECTRICITY' ? KwhMoyCui : 0);

  energyConso = energySurvey.ELECTRICITY;

  let KwhElec = 0;

  if (energyConsumptionKnowledge) {
    if (energyConso - partitionEcEm - KwhMoyEcEm > 0) {
      if (heatingSystemEnergyType === 'ELECTRICITY') {
        KwhElec = KwhMoyEcEm;
      } else {
        KwhElec = energyConso - partitionEcEm;
      }
    } else {
      KwhElec = (KwhMoyEcEm / (partitionEcEm + KwhMoyEcEm)) * energyConso;
    }
  } else {
    KwhElec = KwhMoyEcEm;
  }
  const elecLightningKwh = KwhElec;

  // variables not treated in buffer
  const {
    fruitsAndVegetablePercentageLocal,
    //
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
    //
    numberBigAppliances,
    numberSmallAppliances,
    //
    electricityProvider,
    numberSmallDevices,
    numberBigDevices,
    clothesNewItems,
  } = surveyVariables;

  const carbonVariables = {
    // Food & Drinks
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

    // Transport
    kmCarCommutePerYear,
    kmUrbanBusPerYear,
    kmCoachCommutePerYear,
    kmUrbanTrainPerYear,
    coefficientEnergyEfficientDriving,

    // other
    internetStreamingHoursPerYear,
    activitiesPerYear,

    // energy
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
    networkHeatingKwh,

    // Autre
    fruitsAndVegetablePercentageLocal,
    //
    categoryCarCommute,
    motorTypeCarCommute,
    ageCategoryCarCommute,
    passengersPerCarCommute,
    //
    categoryCarTravel,
    motorTypeCarTravel,
    ageCategoryCarTravel,
    //
    kmCarTravelPerYear,
    passengersPerCarTravel,
    //
    kmCoachTravel,
    kmCountryTrain,
    kmPlane,
    //
    residentsPerHousing,
    houseSurfaceArea,
    flatSurfaceArea,
    numberBigAppliances,
    numberSmallAppliances,
    //
    electricityProvider,
    numberSmallDevices,
    numberBigDevices,
    clothesNewItems,
  };
  console.log(carbonVariables);
  return carbonVariables;
};
export default computeCarbonVariables;
