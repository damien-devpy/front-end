const surveyVariablesSchema = {
  type: 'object',
  properties: {
    meatAndFishConsoPerDay: { type: 'number', default: 0, min: 0, max: 2 },
    eggsAndDairiesConsoPerDay: { type: 'number', default: 0, min: 0, max: 3 },
    fruitsAndVegetablePercentageLocal: {
      type: 'number',
      default: 0,
      min: 0.01,
      max: 1,
    },
    transformedProductsConsoPerWeek: {
      type: 'number',
      default: 0,
      min: 0,
      max: 10,
    },
    alcoholConsoGlassPerDay: { type: 'number', default: 0, min: 0, max: 5 },
    hotDrinksConsoGlassPerDay: { type: 'number', default: 0, min: 0, max: 5 },
    juicesAndSodasConsoGlassPerDay: {
      type: 'number',
      default: 0,
      min: 0,
      max: 5,
    },
    categoryCarCommute: {
      type: 'string',
      enum: ['SPORT', 'BIG', 'URBAN', 'LOW_CARBON'],
      default: 'URBAN',
    },
    motorTypeCarCommute: {
      type: 'string',
      enum: ['HYBRID', 'FUEL', 'ELECTRIC'],
      default: 'FUEL',
    },
    ageCategoryCarCommute: {
      type: 'string',
      enum: [
        'TEN_YEARS_OR_YOUNGER',
        'BEETWEEN_TEN_AND_FIFTEEN_YEARS',
        'FIFTEEN_YEARS_OR_OLDER',
      ],
      default: 'BEETWEEN_TEN_AND_FIFTEEN_YEARS',
    },
    kmCarCommutePerDay: { type: 'number', default: 0, min: 0, max: 100 },
    passengersPerCarCommute: { type: 'number', default: 1, min: 1, max: 5 },
    hoursUrbanBusPerWeek: { type: 'number', default: 0, min: 0, max: 15 },
    hoursUrbanTrainPerWeek: { type: 'number', default: 0, min: 0, max: 15 },
    categoryCarTravel: {
      type: 'string',
      enum: ['SPORT', 'BIG', 'URBAN', 'LOW_CARBON'],
      default: 'URBAN',
    },
    motorTypeCarTravel: {
      type: 'string',
      enum: ['HYBRID', 'FUEL', 'ELECTRIC'],
      default: 'FUEL',
    },
    ageCategoryCarTravel: {
      type: 'string',
      enum: [
        'TEN_YEARS_OR_YOUNGER',
        'BEETWEEN_TEN_AND_FIFTEEN_YEARS',
        'FIFTEEN_YEARS_OR_OLDER',
      ],
      default: 'BEETWEEN_TEN_AND_FIFTEEN_YEARS',
    },
    kmCarTravelPerYear: { type: 'number', default: 0, min: 0, max: 10000 },
    passengersPerCarTravel: { type: 'number', default: 0, min: 1, max: 5 },
    kmCoachTravel: { type: 'number', default: 0, min: 0, max: 10000 },
    kmCountryTrain: { type: 'number', default: 0, min: 0, max: 10000 },
    kmPlane: { type: 'number', default: 0, min: 0, max: 20000 },
    residentsPerHousing: { type: 'number', default: 1 },
    housingSurfaceArea: { type: 'number', default: 0 },
    housingType: {
      type: 'string',
      enum: ['HOUSE', 'FLAT'],
      default: 'HOUSE',
    },
    maintainanceDate: {
      type: 'string',
      enum: ['BEFORE_1975', 'BETWEEN_1975_AND_2000', 'AFTER_2000'],
      default: 'BETWEEN_1975_AND_2000',
    },
    heatingSystemEnergyType: {
      type: 'string',
      enum: ['GAS', 'FUEL_OIL', 'ELECTRICITY', 'HEAT_NETWORK', 'WOOD'],
      default: 'GAS',
    },
    sanitoryHotWaterEnergyType: {
      type: 'string',
      enum: ['GAS', 'FUEL_OIL', 'ELECTRICITY', 'HEAT_NETWORK', 'WOOD'],
      default: 'ELECTRICITY',
    },
    cookingAppliancesEnergyType: {
      type: 'string',
      enum: ['GAS', 'FUEL_OIL', 'ELECTRICITY', 'HEAT_NETWORK', 'WOOD'],
      default: 'ELECTRICITY',
    },
    electricityProvider: {
      type: 'string',
      enum: ['ALTERNATIVE', 'CONVENTIONAL'],
      default: 'CONVENTIONAL',
    },
    heatNetworkName: { type: ['string', 'null'] },
    energyConsumptionKnowledge: { type: 'boolean', default: false },
    elecKwh: { type: 'number', default: 0 },
    gasKwh: { type: 'number', default: 0 },
    fuelKwh: { type: 'number', default: 0 },
    woodKwh: { type: 'number', default: 0 },
    heatNetworkKwh: { type: 'number', default: 0 },
    numberBigAppliances: { type: 'number', default: 0 },
    numberSmallAppliances: { type: 'number', default: 0 },
    numberBigDevices: { type: 'number', default: 0, min: 0, max: 5 },
    numberSmallDevices: { type: 'number', default: 0, min: 0, max: 10 },
    internetStreamingHoursPerWeek: {
      type: 'number',
      default: 0,
      min: 2,
      max: 20,
    },
    clothesNewItems: { type: 'number', default: 0, min: 5, max: 20 },
    activitiesPerMonth: { type: 'number', default: 0, min: 5, max: 20 },
  },
};

export default surveyVariablesSchema;
