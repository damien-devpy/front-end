const footprints = {
  transport: {
    plane: 750,
    train: {
      urbanTrain: 39,
      mainlineTrain: 20,
    },
    bus: {
      urbanBus: 93.6,
      coach: {
        coach_commute: 6.4,
        coach_travel: 40,
      },
    },
    car: {
      dailyCommutes: 53.25201203029334,
      exceptionalCommutes: 583.5836934826667,
    },
  },
  housing: {
    housingEquipment: {
      appliances: {
        smallAppliances: 46.666666666666664,
        bigApplicances: 54.36666666666667,
      },
      furnitures: {
        furnituresPerSurface: 79,
        furnituresMin: 73.4044444,
      },
    },
    constructionAndMaintenance: {
      construction: {
        houseConstruction: 283.34,
        flatConstruction: 0,
      },
      maintenance: 13.88,
    },
    energies: {
      water: 9.07536,
      electricity: {
        elecHeating: 1.3,
        elecCooking: 1.3,
        elecWaterHeating: 1.3,
        elecLightning: 1.3,
      },
      gas: {
        gasHeating: 22.7,
        gasCooking: 22.7,
        gasWaterHeating: 22.7,
      },
      fuel: {
        fuelHeating: 32.300000000000004,
        fuelCooking: 32.300000000000004,
        fuelWaterHeating: 32.300000000000004,
      },
      wood: {
        woodHeating: 3,
        woodCooking: 3,
        woodWaterHeating: 3,
      },
    },
  },
  food: {
    drinks: {
      alcohol: 228.85499999999996,
      hotDrinks: 112.42000000000002,
      juicesAndSoda: 214.61999999999998,
    },
    meatAndFish: 352.86375,
    eggsAndDairies: 71.66775,
    others: {
      fruitsAndVegetables: {
        localFruitsAndVegeteables: 38.57007142857143,
        importedFruitsAndVegeteables: 332.29600000000005,
      },
      transformedProducts: 202.176,
      groceriesAndStarches: 240.65753571428573,
    },
  },
  others: {
    clothing: 671.4,
    digital: {
      devices: {
        smallDevices: 25,
        bigDevices: 143.39999999999998,
      },
      internetUsage: {
        intrnetStreaming: 32.5,
        intrnetOthers: 48.66,
      },
    },
    others: {
      activities: {
        activitiesElectricity: 23.76,
        activitiesGas: 26.64,
        activitiesWithoutEnergy: 1.98,
      },
      goods_and_services: {
        servicesElectricity: 62.88,
        servicesGas: 70.19,
        servicesWithoutEnergy: 211.92,
      },
    },
  },
  publicServices: 1000,
};

export default footprints;
