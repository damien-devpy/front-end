export default {
  workshopId: '987654321',
  title: 'Atelier Data 4 Good',
  startAt: '2020-04-01T00:00:00.000Z',
  location: 'Data 4 Good',
  coachId: 1234567890,
  creatorId: 1234567890,
  eventUrl: 'http://www.example.com',
  startYear: 2020,
  endYear: 2050,
  currentYear: 2020,
  yearIncrement: 3,
  status: '',
  model: {
    footprintStructure: {
      name: 'totalFootprint',
      children: [
        {
          name: 'transports',
          children: [
            {
              name: 'plane',
              cfKey: 'cf_plane',
            },
            {
              name: 'train',
              children: [
                {
                  name: 'urbanTrain',
                  cfKey: 'cf_urban_train',
                },
                {
                  name: 'countryTrain',
                  cfKey: 'cf_country_train',
                },
              ],
            },
            {
              name: 'bus',
              children: [
                {
                  name: 'coachCommute',
                  cfKey: 'cf_coach_commute',
                },
                {
                  name: 'coachTravel',
                  cfKey: 'cf_coach_travel',
                },
              ],
            },
            {
              name: 'car',
              children: [
                {
                  name: 'dailyCommutes',
                  cfKey: 'cf_car_commute',
                },
                {
                  name: 'exceptionalCommutes',
                  cfKey: 'cf_car_travel',
                },
              ],
            },
          ],
        },
        {
          name: 'housing',
          children: [
            {
              name: 'housingEquipment',
              children: [
                {
                  name: 'appliances',
                  children: [
                    {
                      name: 'smallAppliances',
                      cfKey: 'cf_small_appliances',
                    },
                    {
                      name: 'bigApplicances',
                      cfKey: 'cf_big_appliances',
                    },
                  ],
                },
                {
                  name: 'furnitures',
                  children: [
                    {
                      name: 'furnituresPerSurface',
                      cfKey: 'cf_furnitures',
                    },
                    {
                      name: 'furnituresMin',
                      cfKey: 'cf_furnitures_min',
                    },
                  ],
                },
              ],
            },
            {
              name: 'constructionAndMaintenance',
              children: [
                {
                  name: 'construction',
                  children: [
                    {
                      name: 'houseConstruction',
                      cfKey: 'cf_house_construction',
                    },
                    {
                      name: 'flatConstruction',
                      cfKey: 'cf_flat_construction',
                    },
                  ],
                },
                {
                  name: 'construction',
                  cfKey: 'cf_maintenance',
                },
              ],
            },
            {
              name: 'energies',
              children: [
                {
                  name: 'water',
                  cfKey: 'cf_water',
                },
                {
                  name: 'electricity',
                  children: [
                    {
                      name: 'elecHeating',
                      cfKey: 'cf_elec_heating',
                    },
                    {
                      name: 'elecCooking',
                      cfKey: 'cf_elec_cooking',
                    },
                    {
                      name: 'elecWaterHeating',
                      cfKey: 'cf_elec_water_heating',
                    },
                    {
                      name: 'elecLightning',
                      cfKey: 'cf_elec_lightning',
                    },
                  ],
                },
                {
                  name: 'gas',
                  children: [
                    {
                      name: 'gasHeating',
                      cfKey: 'cf_gas_heating',
                    },
                    {
                      name: 'gasCooking',
                      cfKey: 'cf_gas_cooking',
                    },
                    {
                      name: 'gasWaterHeating',
                      cfKey: 'cf_gas_water_heating',
                    },
                  ],
                },
                {
                  name: 'fuel',
                  children: [
                    {
                      name: 'fuelHeating',
                      cfKey: 'cf_fuel_heating',
                    },
                    {
                      name: 'fuelCooking',
                      cfKey: 'cf_fuel_cooking',
                    },
                    {
                      name: 'fuelWaterHeating',
                      cfKey: 'cf_fuel_water_heating',
                    },
                  ],
                },
                {
                  name: 'wood',
                  children: [
                    {
                      name: 'woodHeating',
                      cfKey: 'cf_wood_heating',
                    },
                    {
                      name: 'woodCooking',
                      cfKey: 'cf_wood_cooking',
                    },
                    {
                      name: 'woodWaterHeating',
                      cfKey: 'cf_wood_water_heating',
                    },
                  ],
                },
                {
                  name: 'districtHeating',
                  cfKey: 'cf_district_heating',
                },
              ],
            },
          ],
        },
        {
          name: 'food',
          children: [
            {
              name: 'drinks',
              children: [
                {
                  name: 'alcohol',
                  cfKey: 'cf_alcohol',
                },
                {
                  name: 'hotDrinks',
                  cfKey: 'cf_hot_drinks',
                },
                {
                  name: 'juicesAndSoda',
                  cfKey: 'cf_juices_and_sodas',
                },
              ],
            },
            {
              name: 'meat',
              children: [
                {
                  name: 'red_meat',
                  cfKey: 'cf_red_meat',
                },
                {
                  name: 'white_meat',
                  cfKey: 'cf_white_meat',
                },
              ],
            },
            {
              name: 'fish',
              cfKey: 'cf_fish',
            },
            {
              name: 'eggsAndDairies',
              children: [
                {
                  name: 'eggs',
                  cfKey: 'cf_eggs',
                },
                {
                  name: 'dairies',
                  cfKey: 'cf_dairies',
                },
              ],
            },
            {
              name: 'othersFood',
              children: [
                {
                  name: 'transformedProducts',
                  cfKey: 'cf_transformed_products',
                },
                {
                  name: 'groceriesAndStarches',
                  cfKey: 'cf_starches_and_groceries',
                },
                {
                  name: 'fruitsAndVegetables',
                  children: [
                    {
                      name: 'localFruitsAndVegeteables',
                      cfKey: 'cf_local_fruits_and_vegetables',
                    },
                    {
                      name: 'importedFruitsAndVegeteables',
                      cfKey: 'cf_imported_fruits_and_vegetables',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'others',
          children: [
            {
              name: 'clothing',
              cfKey: 'cf_clothes',
            },
            {
              name: 'digital',
              children: [
                {
                  name: 'devices',
                  children: [
                    {
                      name: 'smallDevices',
                      cfKey: 'cf_small_devices_cradle_to_crate',
                    },
                    {
                      name: 'bigDevices',
                      cfKey: 'cf_big_devices_cradle_to_crate',
                    },
                  ],
                },
                {
                  name: 'internetUsage',
                  children: [
                    {
                      name: 'internetStreaming',
                      cfKey: 'cf_internet_streaming',
                    },
                    {
                      name: 'internetOthers',
                      cfKey: 'cf_internet_others',
                    },
                  ],
                },
              ],
            },
            {
              name: 'othersConso',
              children: [
                {
                  name: 'activities',
                  children: [
                    {
                      name: 'activitiesElectricity',
                      cfKey: 'cf_activities_electricity',
                    },
                    {
                      name: 'activitiesGas',
                      cfKey: 'cf_activities_gas',
                    },
                    {
                      name: 'activitiesWithoutEnergy',
                      cfKey: 'cf_activities_without_energy',
                    },
                  ],
                },
                {
                  name: 'goodsAndServices',
                  children: [
                    {
                      name: 'servicesElectricity',
                      cfKey: 'cf_services_electricity',
                    },
                    {
                      name: 'servicesGas',
                      cfKey: 'cf_services_gas',
                    },
                    {
                      name: 'servicesWithoutEnergy',
                      cfKey: 'cf_services_without_energy',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'publicServices',
          children: [
            {
              name: 'gasPublicServices',
              cfKey: 'cf_gas_public_services',
            },
            {
              name: 'elecPublicServices',
              cfKey: 'cf_elec_public_services',
            },
            {
              name: 'otherPublicServices',
              cfKey: 'cf_other_public_services',
            },
          ],
        },
      ],
      value: 0,
    },
    variableFormulas: {
      cf_plane: {
        '*': [
          {
            var: 'kmPlane',
          },
          {
            var: 'EI_PLANE',
          },
        ],
      },
      cf_car_commute: {
        '/': [
          {
            '*': [
              {
                var: 'kmCarCommutePerYear',
              },
              {
                var: {
                  cat: [
                    'EI_CAR.',
                    {
                      var: 'categoryCarCommute',
                    },
                    '.',
                    {
                      var: 'motorTypeCarCommute',
                    },
                  ],
                },
              },
              {
                var: {
                  cat: [
                    'MOTOR_AGING_FACTOR.',
                    {
                      var: 'motorTypeCarCommute',
                    },
                    '.',
                    {
                      var: 'ageCategoryCarCommute',
                    },
                  ],
                },
              },
              {
                var: 'coefficientEnergyEfficientDriving',
              },
            ],
          },
          {
            var: 'passengersPerCarCommute',
          },
        ],
      },
      cf_car_travel: {
        '/': [
          {
            '*': [
              {
                var: 'kmCarTravelPerYear',
              },
              {
                var: {
                  cat: [
                    'EI_CAR.',
                    {
                      var: 'categoryCarTravel',
                    },
                    '.',
                    {
                      var: 'motorTypeCarTravel',
                    },
                  ],
                },
              },
              {
                var: {
                  cat: [
                    'MOTOR_AGING_FACTOR.',
                    {
                      var: 'motorTypeCarTravel',
                    },
                    '.',
                    {
                      var: 'ageCategoryCarTravel',
                    },
                  ],
                },
              },
              {
                var: 'coefficientEnergyEfficientDriving',
              },
            ],
          },
          {
            var: 'passengersPerCarTravel',
          },
        ],
      },
      cf_urban_bus: {
        '*': [
          {
            var: 'kmUrbanBusPerYear',
          },
          {
            var: 'EI_URBAN_BUS',
          },
        ],
      },
      cf_coach_commute: {
        '*': [
          {
            var: 'kmCoachCommutePerYear',
          },
          {
            var: 'EI_COACH',
          },
        ],
      },

      cf_coach_travel: {
        '*': [
          {
            var: 'kmCoachTravel',
          },
          {
            var: 'EI_COACH',
          },
        ],
      },
      cf_urban_train: {
        '*': [
          {
            var: 'kmUrbanTrainPerYear',
          },
          {
            var: 'EI_URBAN_TRAIN',
          },
        ],
      },
      cf_country_train: {
        '*': [
          {
            var: 'kmCountryTrain',
          },
          {
            var: 'EI_COUNTRY_TRAIN',
          },
        ],
      },
      cf_small_appliances: {
        '/': [
          {
            '*': [
              {
                var: 'numberSmallAppliances',
              },
              {
                var: 'EI_SMALL_APPLIANCE',
              },
            ],
          },
          {
            var: 'residentsPerHousing',
          },
        ],
      },
      cf_big_appliances: {
        '/': [
          {
            '*': [
              {
                var: 'numberBigAppliances',
              },
              {
                var: 'EI_BIG_APPLIANCE',
              },
            ],
          },
          {
            var: 'residentsPerHousing',
          },
        ],
      },
      cf_water_heater: {
        '/': [
          {
            var: 'CF_WATER_HEATER',
          },
          {
            var: 'residentsPerHousing',
          },
        ],
      },
      cf_furnitures: {
        '/': [
          {
            '*': [
              {
                '+': [{ var: 'houseSurfaceArea' }, { var: 'flatSurfaceArea' }],
              },
              {
                var: 'EI_FURNITURES_PER_SQUARE_METER',
              },
            ],
          },
          {
            var: 'residentsPerHousing',
          },
        ],
      },
      cf_furnitures_min: {
        var: 'CF_FURNITURES_MIN_ONE_RESIDENT',
      },
      cf_house_construction: {
        '/': [
          {
            '*': [
              {
                var: 'houseSurfaceArea',
              },
              {
                var: 'EI_CONSTRUCTION_HOUSE_PER_SQUARE_METER',
              },
            ],
          },
          {
            var: 'residentsPerHousing',
          },
        ],
      },
      cf_flat_construction: {
        '/': [
          {
            '*': [
              {
                var: 'flatSurfaceArea',
              },
              {
                var: 'EI_CONSTRUCTION_FLAT_PER_SQUARE_METER',
              },
            ],
          },
          {
            var: 'residentsPerHousing',
          },
        ],
      },
      cf_maintenance: {
        '/': [
          {
            '*': [
              {
                '+': [{ var: 'houseSurfaceArea' }, { var: 'flatSurfaceArea' }],
              },
              {
                var: 'EI_MAINTENANCE_PER_SQUARE_METER',
              },
            ],
          },
          {
            var: 'residentsPerHousing',
          },
        ],
      },
      cf_water: {
        '*': [
          {
            var: 'EI_WATER_PER_LITER',
          },
          {
            var: 'WATER_CONSO_LITER_PER_YEAR_PER_PERSON',
          },
        ],
      },
      cf_wood_heating: {
        '*': [
          {
            var: 'woodHeatingKwh',
          },
          {
            var: 'EI_WOOD_PER_KWH',
          },
        ],
      },
      cf_wood_cooking: {
        '*': [
          {
            var: 'woodCookingKwh',
          },
          {
            var: 'EI_WOOD_PER_KWH',
          },
        ],
      },
      cf_wood_water_heating: {
        '*': [
          {
            var: 'woodWaterHeatingKwh',
          },
          {
            var: 'EI_WOOD_PER_KWH',
          },
        ],
      },
      cf_gas_heating: {
        '*': [
          {
            var: 'gasHeatingKwh',
          },
          {
            var: 'EI_GAS_PER_KWH',
          },
        ],
      },
      cf_gas_cooking: {
        '*': [
          {
            var: 'gasCookingKwh',
          },
          {
            var: 'EI_GAS_PER_KWH',
          },
        ],
      },
      cf_gas_water_heating: {
        '*': [
          {
            var: 'gasWaterHeatingKwh',
          },
          {
            var: 'EI_GAS_PER_KWH',
          },
        ],
      },
      cf_fuel_heating: {
        '*': [
          {
            var: 'fuelHeatingKwh',
          },
          {
            var: 'EI_FUEL_OIL_PER_KWH',
          },
        ],
      },
      cf_fuel_cooking: {
        '*': [
          {
            var: 'fuelCookingKwh',
          },
          {
            var: 'EI_FUEL_OIL_PER_KWH',
          },
        ],
      },
      cf_fuel_water_heating: {
        '*': [
          {
            var: 'fuelWaterHeatingKwh',
          },
          {
            var: 'EI_FUEL_OIL_PER_KWH',
          },
        ],
      },
      cf_elec_heating: {
        '*': [
          {
            var: 'elecHeatingKwh',
          },
          {
            var: {
              cat: [
                'EI_ELEC_PER_KWH.',
                {
                  var: 'electricityProvider',
                },
              ],
            },
          },
        ],
      },
      cf_elec_cooking: {
        '*': [
          {
            var: 'elecCookingKwh',
          },
          {
            var: {
              cat: [
                'EI_ELEC_PER_KWH.',
                {
                  var: 'electricityProvider',
                },
              ],
            },
          },
        ],
      },
      cf_elec_water_heating: {
        '*': [
          {
            var: 'elecWaterHeatingKwh',
          },
          {
            var: {
              cat: [
                'EI_ELEC_PER_KWH.',
                {
                  var: 'electricityProvider',
                },
              ],
            },
          },
        ],
      },
      cf_elec_lightning: {
        '*': [
          {
            var: 'elecLightningKwh',
          },
          {
            var: {
              cat: [
                'EI_ELEC_PER_KWH.',
                {
                  var: 'electricityProvider',
                },
              ],
            },
          },
        ],
      },
      cf_red_meat: {
        '*': [
          {
            var: 'redMeatKgPerYear',
          },
          {
            var: 'EI_RED_MEAT',
          },
        ],
      },
      cf_white_meat: {
        '*': [
          {
            var: 'whiteMeatKgPerYear',
          },
          {
            var: 'EI_WHITE_MEAT',
          },
        ],
      },
      cf_fish: {
        '*': [
          {
            var: 'fishKgPerYear',
          },
          {
            var: 'EI_FISH',
          },
        ],
      },
      cf_eggs: {
        '*': [
          {
            var: 'eggsKgPerYear',
          },
          {
            var: 'EI_EGGS',
          },
        ],
      },
      cf_dairies: {
        '*': [
          {
            var: 'dairiesKgPerYear',
          },
          {
            var: 'EI_DAIRIES',
          },
        ],
      },
      cf_transformed_products: {
        '*': [
          {
            var: 'transformedProductsKgPerYear',
          },
          {
            var: 'EI_TRANSFORMED_PRODUCTS',
          },
        ],
      },
      cf_starches_and_groceries: {
        '*': [
          {
            var: 'starchesAndGroceriesKgPerYear',
          },
          {
            var: 'EI_STARCHES_AND_GROCERIES',
          },
        ],
      },
      cf_local_fruits_and_vegetables: {
        '*': [
          {
            var: 'EI_LOCAL_FRUITS_AND_VEGETABLES',
          },
          {
            var: 'fruitsAndVegetablesKgPerYear',
          },
          {
            var: 'fruitsAndVegetablePercentageLocal',
          },
        ],
      },

      cf_imported_fruits_and_vegetables: {
        '*': [
          {
            var: 'EI_IMPORTED_FRUITS_AND_VEGETABLES',
          },
          {
            var: 'fruitsAndVegetablesKgPerYear',
          },
          {
            '-': [
              1,
              {
                var: 'fruitsAndVegetablePercentageLocal',
              },
            ],
          },
        ],
      },
      cf_district_heating: 0,
      cf_alcohol: {
        '*': [
          {
            var: 'alcoholConsoLitersPerYear',
          },
          {
            var: 'EI_ALCOHOL',
          },
        ],
      },
      cf_hot_drinks: {
        '*': [
          {
            var: 'hotDrinksConsoLitersPerYear',
          },
          {
            var: 'EI_HOT_DRINKS',
          },
        ],
      },
      cf_juices_and_sodas: {
        '*': [
          {
            var: 'juicesAndSodasConsoLitersPerYear',
          },
          {
            var: 'EI_JUICES_AND_SODAS',
          },
        ],
      },
      cf_small_devices_cradle_to_crate: {
        '*': [
          {
            var: 'numberSmallDevices',
          },
          {
            var: 'EI_SMALL_DEVICES',
          },
        ],
      },
      cf_big_devices_cradle_to_crate: {
        '*': [
          {
            var: 'numberBigDevices',
          },
          {
            var: 'EI_BIG_DEVICES',
          },
        ],
      },
      cf_internet_others: {
        var: 'CF_INTERNET_OTHERS',
      },
      cf_internet_streaming: {
        '*': [
          {
            var: 'internetStreamingHoursPerYear',
          },
          {
            var: 'EI_INTERNET_STREAMING',
          },
        ],
      },
      cf_clothes: {
        '*': [
          {
            var: 'clothesNewItems',
          },
          {
            var: 'EI_CLOTHES_PER_ITEM',
          },
        ],
      },
      cf_services_electricity: {
        var: 'CF_SERVICES_ELECTRICITY',
      },
      cf_services_gas: {
        var: 'CF_SERVICES_GAS',
      },
      cf_services_without_energy: {
        var: 'CF_GOODS_AND_SERVICES_WITHOUT_ENERGY',
      },
      cf_activities_electricity: {
        '*': [
          {
            var: 'activitiesPerYear',
          },
          {
            var: 'EI_ACTIVITIES_ELEC',
          },
        ],
      },
      cf_activities_gas: {
        '*': [
          {
            var: 'activitiesPerYear',
          },
          {
            var: 'EI_ACTIVITIES_GAS',
          },
        ],
      },
      cf_activities_without_energy: {
        '*': [
          {
            var: 'activitiesPerYear',
          },
          {
            var: 'EI_ACTIVITIES_WITHOUT_ENERGY',
          },
        ],
      },
      cf_other_public_services: {
        var: 'CF_OTHER_SERVICES',
      },
      cf_gas_public_services: {
        var: 'CF_GAS_SERVICES',
      },
      cf_elec_public_services: {
        var: 'CF_ELEC_SERVICES',
      },
    },
    actionCards: [
      {
        id: 1,
        name: 'SE DEPLACER A PIEDS OU A VÉLO',
        key: 'moveWalkingOrBiking',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'TRANSPORT',
        cost: 3,
        peerInspirationScore: 1,
        peerAwarenessScore: 1,
        systemicWeakSignals: 1,
        systemicPressureScore: 1,
        reluctancyForCitizens: 1,
        operations: [
          {
            variable: 'kmCarCommutePerYear',
            operation: { '*': [{ var: 'kmCarCommutePerYear' }, 0.5] },
          },
        ],
      },
      {
        id: 2,
        name: 'REMPLACER LA VOITURE PAR LES TRANSPORTS EN COMMUN',
        key: 'publicTransportsInsteadOfCar',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'TRANSPORT',
        cost: 3,
        peerInspirationScore: 1,
        peerAwarenessScore: 1,
        systemicWeakSignals: 1,
        systemicPressureScore: 1,
        reluctancyForCitizens: 1,
        operations: [
          {
            variable: 'kmCarCommutePerYear',
            operation: { '*': [{ var: 'kmCarCommutePerYear' }, 0.5] },
          },
          {
            variable: 'kmCoachCommutePerYear',
            operation: {
              '+': [
                { var: 'kmCoachCommutePerYear' },
                { '*': [0.5, { var: 'kmCarCommutePerYear' }, 0.5] },
              ],
            },
          },
          {
            variable: 'kmUrbanTrainPerYear',
            operation: {
              '+': [
                { var: 'kmUrbanTrainPerYear' },
                { '*': [0.5, { var: 'kmCarCommutePerYear' }, 0.5] },
              ],
            },
          },
        ],
      },
      {
        id: 3,
        name: 'FAIRE PLUS DE COVOITURAGE',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'TRANSPORT',
        key: 'carpooling',
        cost: 2,
        operations: [
          {
            variable: 'passengersPerCarCommute',
            operation: { max: [{ var: 'passengersPerCarCommute' }, 3] },
          },
          {
            variable: 'passengersPerCarTravel',
            operation: { max: [{ var: 'passengersPerCarTravel' }, 3] },
          },
        ],
      },
      {
        id: 4,
        name: 'FAIRE PLUS DE TÉLÉTRAVAIL',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'TRANSPORT',
        key: 'homeOffice',
        cost: 3,
        operations: [
          {
            variable: 'kmCarCommutePerYear',
            operation: { '*': [{ var: 'kmCarCommutePerYear' }, 0.7] },
          },
          {
            variable: 'kmCoachCommutePerYear',
            operation: { '*': [{ var: 'kmCoachCommutePerYear' }, 0.7] },
          },
          {
            variable: 'kmUrbanBusPerYear',
            operation: { '*': [{ var: 'kmUrbanBusPerYear' }, 0.7] },
          },
          {
            variable: 'kmUrbanTrainPerYear',
            operation: { '*': [{ var: 'kmUrbanTrainPerYear' }, 0.7] },
          },
        ],
      },
      {
        id: 5,
        name: "FAIRE DE L'ECO-CONDUITE",
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'TRANSPORT',
        key: 'efficientDriving',
        cost: 1,
        operations: [
          {
            variable: 'coefficientEnergyEfficientDriving',
            operation: 0.75,
          },
        ],
      },
      {
        id: 6,
        name: "ARRÊTER DE PRENDRE L'AVION",
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'TRANSPORT',
        key: 'stopPlane',
        cost: 1,
        operations: [
          {
            variable: 'kmPlane',
            operation: 0,
          },
        ],
      },
      {
        id: 7,
        name: 'BAISSER LE CHAUFFAGE',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'LOGEMENT',
        key: 'lowerHeating',
        cost: 1,

        peerInspirationScore: 1,
        peerAwarenessScore: 1,
        systemicWeakSignals: 1,
        systemicPressureScore: 1,
        reluctancyForCitizens: 1,
        operations: [
          {
            variable: 'woodHeatingKwh',
            operation: { '*': [{ var: 'woodHeatingKwh' }, 0.86] },
          },
          {
            variable: 'fuelHeatingKwh',
            operation: { '*': [{ var: 'fuelHeatingKwh' }, 0.86] },
          },
          {
            variable: 'elecHeatingKwh',
            operation: { '*': [{ var: 'elecHeatingKwh' }, 0.86] },
          },
          {
            variable: 'gasHeatingKwh',
            operation: { '*': [{ var: 'gasHeatingKwh' }, 0.86] },
          },
        ],
      },
      {
        id: 8,
        name: "CONSOMMER MOINS D'EAU CHAUDE SANITAIRE",
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'LOGEMENT',
        cost: 1,
        key: 'lessHotWater',
        peerInspirationScore: 1,
        peerAwarenessScore: 1,
        systemicWeakSignals: 1,
        systemicPressureScore: 1,
        reluctancyForCitizens: 1,
        operations: [
          {
            variable: 'woodWaterHeatingKwh',
            operation: { '*': [{ var: 'woodWaterHeatingKwh' }, 0.58] },
          },
          {
            variable: 'elecWaterHeatingKwh',
            operation: { '*': [{ var: 'elecWaterHeatingKwh' }, 0.58] },
          },
          {
            variable: 'gasWaterHeatingKwh',
            operation: { '*': [{ var: 'gasWaterHeatingKwh' }, 0.58] },
          },
        ],
      },
      {
        id: 9,
        name: "ÉCONOMISER DE L'ÉLECTRICITÉ",
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'LOGEMENT',
        cost: 1,

        peerInspirationScore: 1,
        peerAwarenessScore: 1,
        systemicWeakSignals: 1,
        systemicPressureScore: 1,
        reluctancyForCitizens: 1,
        key: 'electricitySaving',
        operations: [
          {
            variable: 'elecLightningKwh',
            operation: { '*': [{ var: 'elecLightningKwh' }, 0.8] },
          },
        ],
      },
      {
        id: 10,
        name: 'SE FOURNIR EN ÉLECTRICITÉ ALTERNATIVE',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'LOGEMENT',
        key: 'alternativeElectricityProvider',
        cost: 1,

        peerInspirationScore: 1,
        peerAwarenessScore: 1,
        systemicWeakSignals: 1,
        systemicPressureScore: 1,
        reluctancyForCitizens: 1,
        operations: [
          {
            variable: 'electricityProvider',
            operation: 'ALTERNATIVE',
          },
        ],
      },
      {
        id: 11,
        name: 'MUTUALISER SON LOGEMENT',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'LOGEMENT',
        key: 'houseSharing',
        cost: 3,

        peerInspirationScore: 1,
        peerAwarenessScore: 1,
        systemicWeakSignals: 1,
        systemicPressureScore: 1,
        reluctancyForCitizens: 1,
        operations: [
          {
            variable: 'residents_per_housing',
            operation: { '+': [{ var: 'residents_per_housing' }, 1] },
          },
        ],
      },
      {
        id: 12,
        name: 'ALLONGER LA DURÉE DE VIE DES APPAREILS',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'CONSO',
        cost: 2,

        peerInspirationScore: 1,
        peerAwarenessScore: 1,
        systemicWeakSignals: 1,
        systemicPressureScore: 1,
        reluctancyForCitizens: 1,
        key: 'extend_goods_life',
        operations: [
          {
            variable: 'numberSmallAppliances',
            operation: {
              '*': [{ var: 'numberSmallAppliances' }, 0.5],
            },
          },
          {
            variable: 'numberBigAppliances',
            operation: {
              '*': [{ var: 'numberBigAppliances' }, 0.5],
            },
          },
          {
            variable: 'numberSmallDevices',
            operation: {
              '*': [{ var: 'numberSmallDevices' }, 0.5],
            },
          },
          {
            variable: 'numberBigDevices',
            operation: {
              '*': [{ var: 'numberBigDevices' }, 0.5],
            },
          },
        ],
      },
      {
        id: 13,
        name: 'ACHETER MOINS DE VÊTEMENTS NEUFS',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'CONSO',
        cost: 2,

        peerInspirationScore: 1,
        peerAwarenessScore: 1,
        systemicWeakSignals: 1,
        systemicPressureScore: 1,
        reluctancyForCitizens: 1,
        key: 'lessClothes',
        operations: [
          {
            variable: 'clothesNewItems',
            operation: { '*': [{ var: 'clothesNewItems' }, 0.5] },
          },
        ],
      },
      {
        id: 14,
        name: "REDUIRE L'USAGE DU NUMERIQUE",
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'CONSO',
        cost: 1,

        peerInspirationScore: 1,
        peerAwarenessScore: 1,
        systemicWeakSignals: 1,
        systemicPressureScore: 1,
        reluctancyForCitizens: 1,
        key: 'lessStreaming',
        operations: [
          {
            variable: 'internetStreamingHoursPerYear',
            operation: { '*': [{ var: 'internetStreamingHoursPerYear' }, 0.5] },
          },
        ],
      },
      {
        id: 15,
        name: 'DEVENIR FLEXITARIEN',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'BIENS DE CONSO',
        cost: 4,

        peerInspirationScore: 1,
        peerAwarenessScore: 1,
        systemicWeakSignals: 1,
        systemicPressureScore: 1,
        reluctancyForCitizens: 1,
        key: 'semiVegetarianism',
        operations: [
          {
            variable: 'redMeatKgPerYear',
            operation: { '*': [{ var: 'redMeatKgPerYear' }, { '/': [2, 7] }] },
          },
          {
            variable: 'whiteMeatKgPerYear',
            operation: {
              '*': [{ var: 'whiteMeatKgPerYear' }, { '/': [2, 7] }],
            },
          },
          {
            variable: 'fishKgPerYear',
            operation: {
              '*': [{ var: 'fishKgPerYear' }, { '/': [2, 7] }],
            },
          },
          {
            variable: 'fruitsAndVegetablesKgPerYear',
            operation: {
              '+': [
                { var: 'fruitsAndVegetablesKgPerYear' },
                {
                  '*': [
                    0.5,
                    {
                      var:
                        'FRUITS_AND_VEGETABLES_FROM_MEAT_AND_FISH_SUBSTITION_PERCENTAGE',
                    },
                    {
                      '*': [
                        {
                          '+': [
                            { var: 'redMeatKgPerYear' },
                            { var: 'whiteMeatKgPerYear' },
                            { var: 'fishKgPerYear' },
                          ],
                        },
                        { '/': [2, 7] },
                      ],
                    },
                  ],
                },
              ],
            },
          },
          {
            variable: 'starchesAndGroceriesKgPerYear',
            operation: {
              '+': [
                { var: 'starchesAndGroceriesKgPerYear' },
                {
                  '*': [
                    0.5,
                    {
                      var:
                        'STARCHES_AND_GROCERIES_FROM_MEAT_AND_FISH_SUBSTITION_PERCENTAGE',
                    },
                    {
                      '*': [
                        {
                          '+': [
                            { var: 'redMeatKgPerYear' },
                            { var: 'whiteMeatKgPerYear' },
                            { var: 'fishKgPerYear' },
                          ],
                        },
                        { '/': [2, 7] },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
      {
        id: 16,
        name: 'REMPLACER LA VIANDE ROUGE PAR DE LA VIANDE BLANCHE',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'BIENS DE CONSO',
        key: 'lessRedMeat',
        cost: 2,

        peerInspirationScore: 1,
        peerAwarenessScore: 1,
        systemicWeakSignals: 1,
        systemicPressureScore: 1,
        reluctancyForCitizens: 1,
        operations: [
          {
            variable: 'redMeatKgPerYear',
            operation: { '*': [{ var: 'redMeatKgPerYear' }, 0.2] },
          },
          {
            variable: 'whiteMeatKgPerYear',
            operation: {
              '+': [
                { var: 'whiteMeatKgPerYear' },
                { '*': [{ var: 'redMeatKgPerYear' }, 0.8] },
              ],
            },
          },
        ],
      },
      {
        id: 17,
        name: "MANGER MOINS D'ŒUFS ET DE PRODUITS LAITIERS",
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'BIENS DE CONSO',
        cost: 4,

        peerInspirationScore: 1,
        peerAwarenessScore: 1,
        systemicWeakSignals: 1,
        systemicPressureScore: 1,
        reluctancyForCitizens: 1,
        key: 'lessEggsAndDairies',
        operations: [
          {
            variable: 'eggsKgPerYear',
            operation: { '/': [{ var: 'eggsKgPerYear' }, 3] },
          },
          {
            variable: 'dairiesKgPerYear',
            operation: { '/': [{ var: 'dairiesKgPerYear' }, 3] },
          },
          {
            variable: 'fruitsAndVegetablesKgPerYear',
            operation: {
              '+': [
                { var: 'fruitsAndVegetablesKgPerYear' },
                {
                  '*': [
                    0.5,
                    {
                      var:
                        'FRUITS_AND_VEGETABLES_FROM_EGGS_AND_DAIRIES_SUBSTITION_PERCENTAGE',
                    },
                    {
                      '/': [
                        {
                          '+': [
                            { var: 'eggsKgPerYear' },
                            { var: 'dairiesKgPerYear' },
                          ],
                        },
                        3,
                      ],
                    },
                  ],
                },
              ],
            },
          },
          {
            variable: 'starchesAndGroceriesKgPerYear',
            operation: {
              '+': [
                { var: 'starchesAndGroceriesKgPerYear' },
                {
                  '*': [
                    0.5,
                    {
                      var:
                        'STARCHES_AND_GROCERIES_FROM_EGGS_AND_DAIRIES_SUBSTITION_PERCENTAGE',
                    },
                    {
                      '/': [
                        {
                          '+': [
                            { var: 'eggsKgPerYear' },
                            { var: 'dairiesKgPerYear' },
                          ],
                        },
                        3,
                      ],
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
      {
        id: 18,
        name: 'FAIRE LA CUISINE',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'BIENS DE CONSO',
        cost: 3,

        peerInspirationScore: 1,
        peerAwarenessScore: 1,
        systemicWeakSignals: 1,
        systemicPressureScore: 1,
        reluctancyForCitizens: 1,
        key: 'houseCooking',
        operations: [
          {
            var: 'transformedProductsKgPerYear',
            operation: {
              min: [
                { var: 'transformedProductsKgPerYear' },
                {
                  '*': [
                    { var: 'TRANSFORMED_PRODUCTS_KG_PER_CONSO' },
                    { var: 'WEEKS_PER_YEAR' },
                    1,
                  ],
                },
              ],
            },
          },
          {
            var: 'starchesAndGroceriesKgPerYear',
            operation: {
              '+': [
                { var: 'starchesAndGroceriesKgPerYear' },
                {
                  '*': [
                    0.5,
                    {
                      var:
                        'STARCHES_AND_GROCERIES_FROM_TRANSFORMED_PRODUCTS_SUBSTITION_PERCENTAGE',
                    },
                    {
                      '-': [
                        { var: 'transformedProductsKgPerYear' },
                        {
                          min: [
                            { var: 'transformedProductsKgPerYear' },
                            {
                              '*': [
                                { var: 'TRANSFORMED_PRODUCTS_KG_PER_CONSO' },
                                { var: 'WEEKS_PER_YEAR' },
                                1,
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
          {
            var: 'fruitsAndVegetablesKgPerYear',
            operation: {
              '+': [
                { var: 'fruitsAndVegetablesKgPerYear' },
                {
                  '*': [
                    0.5,
                    {
                      var:
                        'FRUITS_AND_VEGETABLES_FROM_TRANSFORMED_PRODUCTS_SUBSTITION_PERCENTAGE',
                    },
                    {
                      '-': [
                        { var: 'transformedProductsKgPerYear' },
                        {
                          min: [
                            { var: 'transformedProductsKgPerYear' },
                            {
                              '*': [
                                { var: 'TRANSFORMED_PRODUCTS_KG_PER_CONSO' },
                                { var: 'WEEKS_PER_YEAR' },
                                1,
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
      {
        id: 19,
        name: 'MANGER LOCAL ET DE SAISON',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'BIENS DE CONSO',
        cost: 1,

        peerInspirationScore: 1,
        peerAwarenessScore: 1,
        systemicWeakSignals: 1,
        systemicPressureScore: 1,
        reluctancyForCitizens: 1,
        key: 'localFruitsAndVegetables',
        operations: [
          {
            variable: 'fruitsAndVegetablePercentageLocal',
            operation: {
              max: [0.9, { var: 'fruitsAndVegetablePercentageLocal' }],
            },
          },
        ],
      },
      {
        id: 20,
        name: 'CONSOMMER MOINS DE BOISSONS',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'BIENS DE CONSO',
        cost: 3,
        peerInspirationScore: 1,
        peerAwarenessScore: 1,
        systemicWeakSignals: 1,
        systemicPressureScore: 1,
        reluctancyForCitizens: 1,
        key: 'lessDrinks',
        operations: [
          {
            variable: 'alcoholConsoLitersPerYear',
            operation: {
              '*': [{ var: 'alcoholConsoLitersPerYear' }, 0.5],
            },
          },
          {
            variable: 'juicesAndSodasConsoLitersPerYear',
            operation: {
              '*': [{ var: 'juicesAndSodasConsoLitersPerYear' }, 0.5],
            },
          },
          {
            variable: 'hotDrinksConsoLitersPerYear',
            operation: {
              '*': [{ var: 'hotDrinksConsoLitersPerYear' }, 0.5],
            },
          },
        ],
      },
      {
        id: 21,
        name: 'RÉDUIRE LES EMBALLAGES ALIMENTAIRES',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'BIENS DE CONSO',
        cost: 2,

        peerInspirationScore: 1,
        peerAwarenessScore: 1,
        systemicWeakSignals: 1,
        systemicPressureScore: 1,
        reluctancyForCitizens: 1,
        key: 'lessFoodPackaging',
        operations: [
          // TODO
        ],
      },
      {
        id: 22,
        name: 'MANGER BIO',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'BIENS DE CONSO',
        key: 'organicFood',
        cost: 2,

        peerInspirationScore: 1,
        peerAwarenessScore: 1,
        systemicWeakSignals: 1,
        systemicPressureScore: 1,
        reluctancyForCitizens: 1,
        operations: [
          // TODO
        ],
      },
      {
        id: 23,
        name: "INTERDIRE L'AVION",
        type: 'everyone',
        category: 'ECOGESTES',
        subCategory: 'BIENS DE CONSO',
        key: 'forbiddenPlane',
        cost: 2,
        peerInspirationScore: 1,
        peerAwarenessScore: 1,
        systemicWeakSignals: 1,
        systemicPressureScore: 1,
        reluctancyForCitizens: 1,
        operations: [
          {
            variable: 'kmPlane',
            operation: 0,
          },
        ],
      },
      {
        id: 24,
        name: 'RENOVER LES BÂTIMENTS DU TERTIAIRE',
        type: 'global',
        category: 'ECOGESTES',
        subCategory: 'BIENS DE CONSO',
        key: 'tertiaryBuildingsRenovation',
        cost: 2,
        peerInspirationScore: 1,
        peerAwarenessScore: 1,
        systemicWeakSignals: 1,
        systemicPressureScore: 1,
        reluctancyForCitizens: 1,
        operations: [
          {
            variable: 'CF_GAS_SERVICES',
            operation: { '*': [{ var: 'CF_GAS_SERVICES' }, 0.464] },
          },
          {
            variable: 'CF_ELEC_SERVICES',
            operation: { '*': [{ var: 'CF_ELEC_SERVICES' }, 0.464] },
          },
          {
            variable: 'EI_ACTIVITIES_GAS',
            operation: { '*': [{ var: 'EI_ACTIVITIES_GAS' }, 0.464] },
          },
          {
            variable: 'EI_ACTIVITIES_ELEC',
            operation: {
              '*': [{ var: 'EI_ACTIVITIES_ELEC' }, 0.464],
            },
          },
        ],
      },
      {
        id: 25,
        name: 'VEHICULE INDIVIDUEL BAS CARBONE',
        type: 'everyone',
        category: 'ECOGESTES',
        subCategory: 'BIENS DE CONSO',
        key: 'lowCarbonVehicule',
        cost: 2,
        peerInspirationScore: 1,
        peerAwarenessScore: 1,
        systemicWeakSignals: 1,
        systemicPressureScore: 1,
        reluctancyForCitizens: 1,
        operations: [
          {
            variable: 'categoryCarCommute',
            operation: 'LOW_CARBON',
          },
          {
            variable: 'categoryCarTravel',
            operation: 'LOW_CARBON',
          },
        ],
      },
      {
        id: 26,
        name: 'DÉVELOPPER ET RÉHABILITER LE RESEAU FÉRRÉ',
        type: 'everyone',
        category: 'ECOGESTES',
        subCategory: 'BIENS DE CONSO',
        key: 'developRailways',
        cost: 2,
        peerInspirationScore: 1,
        peerAwarenessScore: 1,
        systemicWeakSignals: 1,
        systemicPressureScore: 1,
        reluctancyForCitizens: 1,
        operations: [
          {
            variable: 'kmCarCommutePerYear',
            operation: { '*': [{ var: 'kmCarCommutePerYear' }, 0.8] },
          },
          {
            variable: 'kmCarTravelPerYear',
            operation: { '*': [{ var: 'kmCarTravelPerYear' }, 0.8] },
          },
          {
            variable: 'kmUrbanTrainPerYear',
            operation: {
              '+': [
                { var: 'kmUrbanTrainPerYear' },
                { '*': [{ var: 'kmCarCommutePerYear' }, 0.2] },
              ],
            },
          },
          {
            variable: 'kmCountryTrain',
            operation: { '*': [{ var: 'kmCarTravelPerYear' }, 0.2] },
          },
        ],
      },
      {
        id: 27,
        name:
          'DÉVELOPPER UNE OFFRE DE VÉHICULES SERVICIELS ET LES AIRES DE COVOITURAGE ',
        type: 'everyone',
        category: 'ECOGESTES',
        subCategory: 'BIENS DE CONSO',
        key: 'globalCarSharing',
        cost: 2,
        peerInspirationScore: 1,
        peerAwarenessScore: 1,
        systemicWeakSignals: 1,
        systemicPressureScore: 1,
        reluctancyForCitizens: 1,
        operations: [
          {
            variable: 'passengersPerCarCommute',
            operation: { max: [{ var: 'passengersPerCarCommute' }, 2.4] },
          },
          {
            variable: 'passengersPerCarTravel',
            operation: { max: [{ var: 'passengersPerCarTravel' }, 2.4] },
          },
        ],
      },
      {
        id: 28,
        name: 'RÉNOVER LES LOGEMENTS',
        type: 'everyone',
        category: 'ECOGESTES',
        subCategory: 'BIENS DE CONSO',
        key: 'renovateHousing',
        cost: 2,
        peerInspirationScore: 1,
        peerAwarenessScore: 1,
        systemicWeakSignals: 1,
        systemicPressureScore: 1,
        reluctancyForCitizens: 1,
        operations: [
          {
            variable: 'woodHeatingKwh',
            operation: {
              min: [{ var: 'woodHeatingKwh' }, 40.0],
            },
          },
          {
            variable: 'gasHeatingKwh',
            operation: {
              min: [{ var: 'gasHeatingKwh' }, 40.0],
            },
          },
          {
            variable: 'fuelHeatingKwh',
            operation: {
              min: [{ var: 'fuelHeatingKwh' }, 40.0],
            },
          },
          {
            variable: 'elecHeatingKwh',
            operation: {
              min: [{ var: 'elecHeatingKwh' }, 40.0],
            },
          },
        ],
      },
      {
        id: 29,
        name:
          'DÉPLOYER LES SYSTEMES DE CHAUFFAGE BAS CARBONE DANS LES LOGEMENTS ',
        type: 'everyone',
        category: 'ECOGESTES',
        subCategory: 'BIENS DE CONSO',
        key: 'lowCarbonHeating',
        cost: 2,
        peerInspirationScore: 1,
        peerAwarenessScore: 1,
        systemicWeakSignals: 1,
        systemicPressureScore: 1,
        reluctancyForCitizens: 1,
        operations: [
          {
            variable: 'woodHeatingKwh',
            operation: 0,
          },
          {
            variable: 'gasHeatingKwh',
            operation: 0,
          },
          {
            variable: 'fuelHeatingKwh',
            operation: 0,
          },
          {
            variable: 'elecHeatingKwh',
            operation: {
              '+': [
                { var: 'elecHeatingKwh' },
                { var: 'woodHeatingKwh' },
                { var: 'gasHeatingKwh' },
                { var: 'fuelHeatingKwh' },
              ],
            },
          },
          {
            variable: 'woodWaterHeatingKwh',
            operation: 0,
          },
          {
            variable: 'gasWaterHeatingKwh',
            operation: 0,
          },
          {
            variable: 'fuelWaterHeatingKwh',
            operation: 0,
          },
          {
            variable: 'elecWaterHeatingKwh',
            operation: {
              '+': [
                { var: 'elecWaterHeatingKwh' },
                { var: 'woodWaterHeatingKwh' },
                { var: 'gasWaterHeatingKwh' },
                { var: 'fuelWaterHeatingKwh' },
              ],
            },
          },
        ],
      },
      {
        id: 30,
        name:
          "PRODUIRE DES APPAREILS ELECTROMENAGERS ET D'ECLAIRAGE PEU CONSOMMATEURS D'ENERGIE",
        type: 'everyone',
        category: 'ECOGESTES',
        subCategory: 'BIENS DE CONSO',
        key: 'lowCarbonAppliances',
        cost: 2,
        peerInspirationScore: 1,
        peerAwarenessScore: 1,
        systemicWeakSignals: 1,
        systemicPressureScore: 1,
        reluctancyForCitizens: 1,
        operations: [
          {
            variable: 'elecLightningKwh',
            operation: { '*': [{ var: 'elecLightningKwh' }, 0.5] },
          },
        ],
      },
      {
        id: 32,
        name: "ÉVITER LES GASPILLAGES D'ÉLECTRICITE DANS LE TERTIAIRE",
        type: 'everyone',
        category: 'ECOGESTES',
        subCategory: 'BIENS DE CONSO',
        key: 'tertiaryElectricityEconomies',
        cost: 2,
        peerInspirationScore: 1,
        peerAwarenessScore: 1,
        systemicWeakSignals: 1,
        systemicPressureScore: 1,
        reluctancyForCitizens: 1,
        operations: [
          {
            variable: 'CF_ELEC_SERVICES',
            operation: { '*': [{ var: 'CF_ELEC_SERVICES' }, 0.6] },
          },
          {
            variable: 'EI_ACTIVITIES_ELEC',
            operation: {
              '*': [{ var: 'EI_ACTIVITIES_ELEC' }, 0.6],
            },
          },
        ],
      },
      {
        id: 33,
        name: 'LUTTER CONTRE LE GASPILLAGE ALIMENTAIRE',
        type: 'global',
        category: 'ECOGESTES',
        subCategory: 'BIENS DE CONSO',
        key: 'lessFoodWaste',
        cost: 2,
        peerInspirationScore: 1,
        peerAwarenessScore: 1,
        systemicWeakSignals: 1,
        systemicPressureScore: 1,
        reluctancyForCitizens: 1,
        operations: [
          {
            variable: 'EI_RED_MEAT',
            operation: { '*': [{ var: 'EI_RED_MEAT' }, 0.98] },
          },
          {
            variable: 'EI_WHITE_MEAT',
            operation: { '*': [{ var: 'EI_WHITE_MEAT' }, 0.98] },
          },
          {
            variable: 'EI_FISH',
            operation: { '*': [{ var: 'EI_FISH' }, 0.98] },
          },
          {
            variable: 'EI_EGGS',
            operation: { '*': [{ var: 'EI_EGGS' }, 0.98] },
          },
          {
            variable: 'EI_DAIRIES',
            operation: { '*': [{ var: 'EI_DAIRIES' }, 0.98] },
          },
          {
            variable: 'EI_LOCAL_FRUITS_AND_VEGETABLES',
            operation: {
              '*': [{ var: 'EI_LOCAL_FRUITS_AND_VEGETABLES' }, 0.98],
            },
          },
          {
            variable: 'EI_IMPORTED_FRUITS_AND_VEGETABLES',
            operation: {
              '*': [{ var: 'EI_IMPORTED_FRUITS_AND_VEGETABLES' }, 0.98],
            },
          },
          {
            variable: 'EI_TRANSFORMED_PRODUCTS',
            operation: { '*': [{ var: 'EI_TRANSFORMED_PRODUCTS' }, 0.98] },
          },
          {
            variable: 'EI_STARCHES_AND_GROCERIES',
            operation: { '*': [{ var: 'EI_STARCHES_AND_GROCERIES' }, 0.98] },
          },
          {
            variable: 'EI_ALCOHOL',
            operation: { '*': [{ var: 'EI_ALCOHOL' }, 0.98] },
          },
          {
            variable: 'EI_HOT_DRINKS',
            operation: { '*': [{ var: 'EI_HOT_DRINKS' }, 0.98] },
          },
          {
            variable: 'EI_JUICES_AND_SODAS',
            operation: { '*': [{ var: 'EI_JUICES_AND_SODAS' }, 0.98] },
          },
        ],
      },
      {
        id: 34,
        name: 'DEVELOPPER LA METHANISATION',
        type: 'global',
        category: 'ECOGESTES',
        subCategory: 'BIENS DE CONSO',
        key: 'anaerobicDigestion',
        cost: 2,
        peerInspirationScore: 1,
        peerAwarenessScore: 1,
        systemicWeakSignals: 1,
        systemicPressureScore: 1,
        reluctancyForCitizens: 1,
        operations: [
          {
            variable: 'EI_GAS_PER_KWH',
            operation: {
              '*': [{ var: 'EI_GAS_PER_KWH' }, 0.1],
            },
          },
          {
            variable: 'EI_ACTIVITIES_GAS',
            operation: {
              '*': [{ var: 'EI_ACTIVITIES_ELEC' }, 0.1],
            },
          },
          {
            variable: 'CF_ELEC_SERVICES',
            operation: {
              '*': [{ var: 'CF_ELEC_SERVICES' }, 0.1],
            },
          },
        ],
      },
      {
        id: 35,
        name: 'FERMER LES CENTRALES THERMIQUES',
        type: 'global',
        category: 'ECOGESTES',
        subCategory: 'BIENS DE CONSO',
        key: 'closeThermalPowerStations',
        cost: 2,
        peerInspirationScore: 1,
        peerAwarenessScore: 1,
        systemicWeakSignals: 1,
        systemicPressureScore: 1,
        reluctancyForCitizens: 1,
        operations: [
          {
            variable: 'EI_ELEC_PER_KWH',
            operation: 0.04,
          },
          {
            variable: 'CF_ELEC_SERVICES',
            operation: { '*': [{ var: 'CF_ELEC_SERVICES' }, 0.39] },
          },
          {
            variable: 'EI_ACTIVITIES_ELEC',
            operation: {
              '*': [{ var: 'EI_ACTIVITIES_ELEC' }, 0.39],
            },
          },
        ],
      },
      {
        id: 36,
        name: 'DEVELOPPER LES ENERGIES RENOUVELABLES ELECTRIQUES',
        type: 'global',
        category: 'ECOGESTES',
        subCategory: 'BIENS DE CONSO',
        key: 'renewableElectricty',
        cost: 2,
        peerInspirationScore: 1,
        peerAwarenessScore: 1,
        systemicWeakSignals: 1,
        systemicPressureScore: 1,
        reluctancyForCitizens: 1,
        operations: [
          {
            variable: 'EI_ELEC_PER_KWH',
            operation: { '*': [{ var: 'EI_ELEC_PER_KWH' }, 1] },
          },
        ],
      },
      {
        id: 37,
        name: "INCLURE LES ENJEUX DE LA TRANSITION DANS L'ENSEIGNEMENT PUBLIC",
        type: 'global',
        category: 'ECOGESTES',
        subCategory: 'BIENS DE CONSO',
        key: 'renewableElectricty',
        cost: 2,
        peerInspirationScore: 1,
        peerAwarenessScore: 1,
        systemicWeakSignals: 1,
        systemicPressureScore: 1,
        reluctancyForCitizens: 1,
        operations: [],
      },
    ],
    actionCardBatches: [
      {
        id: 1,
        name: 'Ind1',
        type: 'individual',
        actionCardIds: [1, 2, 3],
      },
      {
        id: 2,
        name: 'Ind2',
        type: 'individual',
        actionCardIds: [4, 5, 6],
      },
      {
        id: 3,
        name: 'Ind3',
        type: 'individual',
        actionCardIds: [7, 8, 9],
      },
      {
        id: 4,
        name: 'Ind4',
        type: 'individual',
        actionCardIds: [10, 11, 12],
      },
      {
        id: 5,
        name: 'Ind5',
        type: 'individual',
        actionCardIds: [13, 14, 15],
      },
      {
        id: 6,
        name: 'Ind6',
        type: 'individual',
        actionCardIds: [16, 17, 18],
      },
      {
        id: 7,
        name: 'Ind7',
        type: 'individual',
        actionCardIds: [19, 20, 21, 22],
      },
      {
        id: 10,
        name: 'Col1',
        type: 'collective',
        actionCardIds: [23, 24, 25, 26],
      },
      {
        id: 11,
        name: 'Col2',
        type: 'collective',
        actionCardIds: [27, 28, 29, 30],
      },
      {
        id: 12,
        name: 'Col3',
        type: 'collective',
        actionCardIds: [30, 32, 33, 34],
      },
      {
        id: 13,
        name: 'Col4',
        type: 'collective',
        actionCardIds: [35, 36, 37],
      },
    ],
    globalCarbonVariables: {
      EI_URBAN_BUS: 0.15,
      MEAN_SPEED_URBAN_BUS: 12,
      EI_COACH: 0.04,
      MEAN_SPEED_COACH: 80,

      // Food
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
      EI_ELEC_PER_KWH: {
        CONVENTIONAL: 0.116,
        ALTERNATIVE: 0.013,
      },
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
    },
  },
  participants: [
    {
      id: 1,
      firstName: 'Emmanuel',
      lastName: 'Macron',
      email: 'emacron@elysees.fr',
      role: 'participant',
      status: 'registered',
      carbonFootprintId: '123456',
      surveyVariables: {
        meatAndFishConsoPerDay: 0.5,
        eggsAndDairiesConsoPerDay: 0.5,
        fruitsAndVegetablePercentageLocal: 0.5,
        transformedProductsConsoPerWeek: 3,
        alcoholConsoGlassPerDay: 1,
        hotDrinksConsoGlassPerDay: 5,
        juicesAndSodasConsoGlassPerDay: 2,

        // transports
        categoryCarCommute: 'URBAN',
        motorTypeCarCommute: 'FUEL',
        ageCategoryCarCommute: 'TEN_YEARS_OR_YOUNGER',
        kmCarCommutePerDay: 25,
        passengersPerCarCommute: 3,
        hoursUrbanBusPerWeek: 1,
        hoursCoachCommutePerWeek: 2,
        hoursUrbanTrainPerWeek: 3,

        categoryCarTravel: 'URBAN',
        motorTypeCarTravel: 'FUEL',
        ageCategoryCarTravel: 'TEN_YEARS_OR_YOUNGER',

        kmCarTravelPerYear: 8000,
        passengersPerCarTravel: 3,

        kmCoachTravel: 1000,
        kmCountryTrain: 2000,
        kmPlane: 3000,

        // housing
        residentsPerHousing: 3,
        housingSurfaceArea: 60,
        numberBigAppliances: 7,
        numberSmallAppliances: 20,
        housingType: 'HOUSE',
        electricityProvider: 'ALTERNATIVE',
        maintainanceDate: 'AFTER_2000',
        energyConsumptionKnowledge: true,
        heatingSystemEnergyType: 'GAS',
        cookingAppliancesEnergyType: 'ELECTRICITY',
        sanitoryHotWaterEnergyType: 'FUEL_OIL',

        gasKwh: 100,
        woodKwh: 100,
        fuelKwh: 100,
        elecKwh: 100,

        // others
        clothesNewItems: 30,
        activitiesPerMonth: 3,
        numberSmallDevices: 2,
        numberBigDevices: 3,
        internetStreamingHoursPerWeek: 5,
      },
    },
    {
      id: 2,
      firstName: 'Brigitte',
      lastName: 'Macron',
      email: 'bmacron@elysees.fr',
      role: 'participant',
      status: 'registered',
      carbonFootprintId: '123456678',
      surveyVariables: {
        meatAndFishConsoPerDay: 0.5,
        eggsAndDairiesConsoPerDay: 0.5,
        fruitsAndVegetablePercentageLocal: 0.5,
        transformedProductsConsoPerWeek: 3,
        alcoholConsoGlassPerDay: 1,
        hotDrinksConsoGlassPerDay: 5,
        juicesAndSodasConsoGlassPerDay: 2,

        // transports
        categoryCarCommute: 'URBAN',
        motorTypeCarCommute: 'FUEL',
        ageCategoryCarCommute: 'TEN_YEARS_OR_YOUNGER',
        kmCarCommutePerDay: 25,
        passengersPerCarCommute: 3,
        hoursUrbanBusPerWeek: 1,
        hoursCoachCommutePerWeek: 2,
        hoursUrbanTrainPerWeek: 3,

        categoryCarTravel: 'URBAN',
        motorTypeCarTravel: 'FUEL',
        ageCategoryCarTravel: 'TEN_YEARS_OR_YOUNGER',

        kmCarTravelPerYear: 8000,
        passengersPerCarTravel: 3,

        kmCoachTravel: 1000,
        kmCountryTrain: 2000,
        kmPlane: 3000,

        // housing
        residentsPerHousing: 3,
        housingSurfaceArea: 60,
        numberBigAppliances: 7,
        numberSmallAppliances: 20,
        housingType: 'HOUSE',
        electricityProvider: 'ALTERNATIVE',
        maintainanceDate: 'AFTER_2000',
        energyConsumptionKnowledge: true,
        heatingSystemEnergyType: 'GAS',
        cookingAppliancesEnergyType: 'ELECTRICITY',
        sanitoryHotWaterEnergyType: 'FUEL_OIL',

        gasKwh: 100,
        woodKwh: 100,
        fuelKwh: 100,
        elecKwh: 100,

        // others
        clothesNewItems: 30,
        activitiesPerMonth: 3,
        numberSmallDevices: 2,
        numberBigDevices: 3,
        internetStreamingHoursPerWeek: 5,
      },
    },
  ],
  personas: [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      surveyVariables: {
        meat_per_day: 9000,
        car_type: 'futuristic',
      },
      carbonVariables: {
        meat_per_day: 9000,
        car_type: 'futuristic',
      },
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      surveyVariables: {
        meat_per_day: 9000,
        car_type: 'futuristic',
      },
      carbonVariables: {
        meat_per_day: 9000,
        car_type: 'futuristic',
      },
    },
  ],
  citizens: [
    {
      id: 10,
      firstName: 'John',
      lastName: 'Doe',
      surveyVariables: {
        meat_per_day: 9000,
        car_type: 'futuristic',
      },
      carbonVariables: {
        meat_per_day: 9000,
        car_type: 'futuristic',
      },
      reluctancy: 2,
    },
    {
      id: 20,
      firstName: 'Jane',
      lastName: 'Doe',
      surveyVariables: {
        meat_per_day: 9000,
        car_type: 'futuristic',
      },
      carbonVariables: {
        meat_per_day: 9000,
        car_type: 'futuristic',
      },
      reluctancy: 20,
    },
  ],
  rounds: [
    {
      year: 2020,
      carbonVariables: [
        {
          participantId: 1,
          variables: {
            residentsPerHousing: 3,
            redMeatKgPerYear: 9.033750000000001,
            whiteMeatKgPerYear: 9.033750000000001,
            fishKgPerYear: 9.033750000000001,
            eggsKgPerYear: 10.0375,
            dairiesKgPerYear: 10.0375,
            transformedProductsKgPerYear: 45.9,
            fruitsAndVegetablesKgPerYear: 296.6928571428572,
            starchesAndGroceriesKgPerYear: 165.9707142857143,
            alcoholConsoLitersPerYear: 109.5,
            hotDrinksConsoLitersPerYear: 36.5,
            juicesAndSodasConsoLitersPerYear: 146,
            kmCarCommutePerYear: 730,
            kmUrbanBusPerYear: 612,
            kmCoachCommutePerYear: 160,
            kmUrbanTrainPerYear: 3825,
            internetStreamingHoursPerYear: 255,
            activitiesPerYear: 36,
            woodHeatingKwh: 0,
            woodCookingKwh: 0,
            woodWaterHeatingKwh: 0,
            gasHeatingKwh: 100,
            gasCookingKwh: 0,
            gasWaterHeatingKwh: 0,
            fuelHeatingKwh: 0,
            fuelCookingKwh: 0,
            fuelWaterHeatingKwh: 0,
            elecHeatingKwh: 0,
            elecCookingKwh: 20.688007644529378,
            elecLightningKwh: 79.31199235547062,
            elecWaterHeatingKwh: 0,
            fruitsAndVegetablePercentageLocal: 0.5,
            categoryCarCommute: 'URBAN',
            motorTypeCarCommute: 'FUEL',
            ageCategoryCarCommute: 'TEN_YEARS_OR_YOUNGER',
            kmCarCommutePerDay: 25,
            passengersPerCarCommute: 3,
            coefficientEnergyEfficientDriving: 1,
            categoryCarTravel: 'URBAN',
            motorTypeCarTravel: 'FUEL',
            ageCategoryCarTravel: 'TEN_YEARS_OR_YOUNGER',
            kmCarTravelPerYear: 8000,
            passengersPerCarTravel: 3,
            kmCoachTravel: 1000,
            kmCountryTrain: 2000,
            kmPlane: 3000,
            houseSurfaceArea: 60,
            flatSurfaceArea: 0,
            numberBigAppliances: 7,
            numberSmallAppliances: 20,
            electricityProvider: 'ALTERNATIVE',
            numberSmallDevices: 2,
            numberBigDevices: 3,
            clothesNewItems: 30,
          },
        },
        {
          participantId: 2,
          variables: {
            residentsPerHousing: 3,
            redMeatKgPerYear: 9.033750000000001,
            whiteMeatKgPerYear: 9.033750000000001,
            fishKgPerYear: 9.033750000000001,
            eggsKgPerYear: 10.0375,
            dairiesKgPerYear: 10.0375,
            transformedProductsKgPerYear: 45.9,
            fruitsAndVegetablesKgPerYear: 296.6928571428572,
            starchesAndGroceriesKgPerYear: 165.9707142857143,
            alcoholConsoLitersPerYear: 109.5,
            hotDrinksConsoLitersPerYear: 36.5,
            juicesAndSodasConsoLitersPerYear: 146,
            kmCarCommutePerYear: 730,
            kmUrbanBusPerYear: 612,
            kmCoachCommutePerYear: 160,
            kmUrbanTrainPerYear: 3825,
            internetStreamingHoursPerYear: 255,
            activitiesPerYear: 36,
            woodHeatingKwh: 0,
            woodCookingKwh: 0,
            woodWaterHeatingKwh: 0,
            gasHeatingKwh: 100,
            gasCookingKwh: 0,
            gasWaterHeatingKwh: 0,
            fuelHeatingKwh: 0,
            fuelCookingKwh: 0,
            fuelWaterHeatingKwh: 0,
            elecHeatingKwh: 0,
            elecCookingKwh: 20.688007644529378,
            elecLightningKwh: 79.31199235547062,
            elecWaterHeatingKwh: 0,
            fruitsAndVegetablePercentageLocal: 0.5,
            categoryCarCommute: 'URBAN',
            motorTypeCarCommute: 'FUEL',
            ageCategoryCarCommute: 'TEN_YEARS_OR_YOUNGER',
            kmCarCommutePerDay: 25,
            passengersPerCarCommute: 3,
            coefficientEnergyEfficientDriving: 1,
            categoryCarTravel: 'URBAN',
            motorTypeCarTravel: 'FUEL',
            ageCategoryCarTravel: 'TEN_YEARS_OR_YOUNGER',
            kmCarTravelPerYear: 8000,
            passengersPerCarTravel: 3,
            kmCoachTravel: 1000,
            kmCountryTrain: 2000,
            kmPlane: 3000,
            houseSurfaceArea: 60,
            flatSurfaceArea: 0,
            numberBigAppliances: 7,
            numberSmallAppliances: 20,
            electricityProvider: 'ALTERNATIVE',
            numberSmallDevices: 2,
            numberBigDevices: 3,
            clothesNewItems: 30,
          },
        },
      ],
      carbonFootprints: [
        {
          participantId: 1,
          footprint: {
            name: 'totalFootprint',
            children: [
              {
                name: 'transports',
                children: [
                  {
                    name: 'plane',
                    cfKey: 'cf_plane',
                    value: 750,
                  },
                  {
                    name: 'train',
                    children: [
                      {
                        name: 'urbanTrain',
                        cfKey: 'cf_urban_train',
                        value: 38.25,
                      },
                      {
                        name: 'countryTrain',
                        cfKey: 'cf_country_train',
                        value: 20,
                      },
                    ],
                    value: 58.25,
                  },
                  {
                    name: 'bus',
                    children: [
                      {
                        name: 'coachCommute',
                        cfKey: 'cf_coach_commute',
                        value: 6.4,
                      },
                      {
                        name: 'coachTravel',
                        cfKey: 'cf_coach_travel',
                        value: 40,
                      },
                    ],
                    value: 46.4,
                  },
                  {
                    name: 'car',
                    children: [
                      {
                        name: 'dailyCommutes',
                        cfKey: 'cf_car_commute',
                        value: 53.25201203029334,
                      },
                      {
                        name: 'exceptionalCommutes',
                        cfKey: 'cf_car_travel',
                        value: 583.5836934826667,
                      },
                    ],
                    value: 636.8357055129601,
                  },
                ],
                value: 1491.48570551296,
              },
              {
                name: 'housing',
                children: [
                  {
                    name: 'housingEquipment',
                    children: [
                      {
                        name: 'appliances',
                        children: [
                          {
                            name: 'smallAppliances',
                            cfKey: 'cf_small_appliances',
                            value: 46.666666666666664,
                          },
                          {
                            name: 'bigApplicances',
                            cfKey: 'cf_big_appliances',
                            value: 54.36666666666667,
                          },
                        ],
                        value: 101.03333333333333,
                      },
                      {
                        name: 'furnitures',
                        children: [
                          {
                            name: 'furnituresPerSurface',
                            cfKey: 'cf_furnitures',
                            value: 79,
                          },
                          {
                            name: 'furnituresMin',
                            cfKey: 'cf_furnitures_min',
                            value: 73.4044444,
                          },
                        ],
                        value: 152.4044444,
                      },
                    ],
                    value: 253.43777773333332,
                  },
                  {
                    name: 'constructionAndMaintenance',
                    children: [
                      {
                        name: 'construction',
                        children: [
                          {
                            name: 'houseConstruction',
                            cfKey: 'cf_house_construction',
                            value: 283.34,
                          },
                          {
                            name: 'flatConstruction',
                            cfKey: 'cf_flat_construction',
                            value: 0,
                          },
                        ],
                        value: 283.34,
                      },
                      {
                        name: 'construction',
                        cfKey: 'cf_maintenance',
                        value: 13.88,
                      },
                    ],
                    value: 297.21999999999997,
                  },
                  {
                    name: 'energies',
                    children: [
                      {
                        name: 'water',
                        cfKey: 'cf_water',
                        value: 9.07536,
                      },
                      {
                        name: 'electricity',
                        children: [
                          {
                            name: 'elecHeating',
                            cfKey: 'cf_elec_heating',
                            value: 0,
                          },
                          {
                            name: 'elecCooking',
                            cfKey: 'cf_elec_cooking',
                            value: 0.2689440993788819,
                          },
                          {
                            name: 'elecWaterHeating',
                            cfKey: 'cf_elec_water_heating',
                            value: 0,
                          },
                          {
                            name: 'elecLightning',
                            cfKey: 'cf_elec_lightning',
                            value: 1.031055900621118,
                          },
                        ],
                        value: 1.2999999999999998,
                      },
                      {
                        name: 'gas',
                        children: [
                          {
                            name: 'gasHeating',
                            cfKey: 'cf_gas_heating',
                            value: 22.7,
                          },
                          {
                            name: 'gasCooking',
                            cfKey: 'cf_gas_cooking',
                            value: 0,
                          },
                          {
                            name: 'gasWaterHeating',
                            cfKey: 'cf_gas_water_heating',
                            value: 0,
                          },
                        ],
                        value: 22.7,
                      },
                      {
                        name: 'fuel',
                        children: [
                          {
                            name: 'fuelHeating',
                            cfKey: 'cf_fuel_heating',
                            value: 0,
                          },
                          {
                            name: 'fuelCooking',
                            cfKey: 'cf_fuel_cooking',
                            value: 0,
                          },
                          {
                            name: 'fuelWaterHeating',
                            cfKey: 'cf_fuel_water_heating',
                            value: 0,
                          },
                        ],
                        value: 0,
                      },
                      {
                        name: 'wood',
                        children: [
                          {
                            name: 'woodHeating',
                            cfKey: 'cf_wood_heating',
                            value: 0,
                          },
                          {
                            name: 'woodCooking',
                            cfKey: 'cf_wood_cooking',
                            value: 0,
                          },
                          {
                            name: 'woodWaterHeating',
                            cfKey: 'cf_wood_water_heating',
                            value: 0,
                          },
                        ],
                        value: 0,
                      },
                      {
                        name: 'districtHeating',
                        cfKey: 'cf_district_heating',
                        value: 0,
                      },
                    ],
                    value: 33.07536,
                  },
                ],
                value: 583.7331377333334,
              },
              {
                name: 'food',
                children: [
                  {
                    name: 'drinks',
                    children: [
                      {
                        name: 'alcohol',
                        cfKey: 'cf_alcohol',
                        value: 228.855,
                      },
                      {
                        name: 'hotDrinks',
                        cfKey: 'cf_hot_drinks',
                        value: 112.42,
                      },
                      {
                        name: 'juicesAndSoda',
                        cfKey: 'cf_juices_and_sodas',
                        value: 214.62,
                      },
                    ],
                    value: 555.895,
                  },
                  {
                    name: 'meat',
                    children: [
                      {
                        name: 'red_meat',
                        cfKey: 'cf_red_meat',
                        value: 116.44503750000003,
                      },
                      {
                        name: 'white_meat',
                        cfKey: 'cf_white_meat',
                        value: 116.44503750000003,
                      },
                    ],
                    value: 232.89007500000005,
                  },
                  {
                    name: 'fish',
                    cfKey: 'cf_fish',
                    value: 116.44503750000003,
                  },
                  {
                    name: 'eggsAndDairies',
                    children: [
                      {
                        name: 'eggs',
                        cfKey: 'cf_eggs',
                        value: 35.833875,
                      },
                      {
                        name: 'dairies',
                        cfKey: 'cf_dairies',
                        value: 35.833875,
                      },
                    ],
                    value: 71.66775,
                  },
                  {
                    name: 'others',
                    children: [
                      {
                        name: 'transformedProducts',
                        cfKey: 'cf_transformed_products',
                        value: 198.288,
                      },
                      {
                        name: 'groceriesAndStarches',
                        cfKey: 'cf_starches_and_groceries',
                        value: 240.65753571428573,
                      },
                      {
                        name: 'fruitsAndVegetables',
                        children: [
                          {
                            name: 'localFruitsAndVegeteables',
                            cfKey: 'cf_local_fruits_and_vegetables',
                            value: 38.57007142857143,
                          },
                          {
                            name: 'importedFruitsAndVegeteables',
                            cfKey: 'cf_imported_fruits_and_vegetables',
                            value: 332.29600000000005,
                          },
                        ],
                        value: 370.8660714285715,
                      },
                    ],
                    value: 809.8116071428572,
                  },
                ],
                value: 1786.7094696428571,
              },
              {
                name: 'others',
                children: [
                  {
                    name: 'clothing',
                    cfKey: 'cf_clothes',
                    value: 671.4,
                  },
                  {
                    name: 'digital',
                    children: [
                      {
                        name: 'devices',
                        children: [
                          {
                            name: 'smallDevices',
                            cfKey: 'cf_small_devices_cradle_to_crate',
                            value: 25,
                          },
                          {
                            name: 'bigDevices',
                            cfKey: 'cf_big_devices_cradle_to_crate',
                            value: 143.39999999999998,
                          },
                        ],
                        value: 168.39999999999998,
                      },
                      {
                        name: 'internetUsage',
                        children: [
                          {
                            name: 'internetStreaming',
                            cfKey: 'cf_internet_streaming',
                            value: 31.875,
                          },
                          {
                            name: 'internetOthers',
                            cfKey: 'cf_internet_others',
                            value: 48.66,
                          },
                        ],
                        value: 80.535,
                      },
                    ],
                    value: 248.93499999999997,
                  },
                  {
                    name: 'others',
                    children: [
                      {
                        name: 'activities',
                        children: [
                          {
                            name: 'activitiesElectricity',
                            cfKey: 'cf_activities_electricity',
                            value: 23.76,
                          },
                          {
                            name: 'activitiesGas',
                            cfKey: 'cf_activities_gas',
                            value: 26.64,
                          },
                          {
                            name: 'activitiesWithoutEnergy',
                            cfKey: 'cf_activities_without_energy',
                            value: 23.76,
                          },
                        ],
                        value: 74.16000000000001,
                      },
                      {
                        name: 'goodsAndServices',
                        children: [
                          {
                            name: 'servicesElectricity',
                            cfKey: 'cf_services_electricity',
                            value: 62.88,
                          },
                          {
                            name: 'servicesGas',
                            cfKey: 'cf_services_gas',
                            value: 70.19,
                          },
                          {
                            name: 'servicesWithoutEnergy',
                            cfKey: 'cf_services_without_energy',
                            value: 211.92,
                          },
                        ],
                        value: 344.99,
                      },
                    ],
                    value: 419.15000000000003,
                  },
                ],
                value: 1339.485,
              },
              {
                name: 'publicServices',
                children: [
                  {
                    name: 'gasPublicServices',
                    cfKey: 'cf_gas_public_services',
                    value: 336,
                  },
                  {
                    name: 'elecPublicServices',
                    cfKey: 'cf_elec_public_services',
                    value: 301,
                  },
                  {
                    name: 'otherPublicServices',
                    cfKey: 'cf_other_public_services',
                    value: 363,
                  },
                ],
                value: 1000,
              },
            ],
            value: 6201.413312889151,
          },
        },
        {
          participantId: 2,
          footprint: {
            name: 'totalFootprint',
            children: [
              {
                name: 'transports',
                children: [
                  {
                    name: 'plane',
                    cfKey: 'cf_plane',
                    value: 750,
                  },
                  {
                    name: 'train',
                    children: [
                      {
                        name: 'urbanTrain',
                        cfKey: 'cf_urban_train',
                        value: 38.25,
                      },
                      {
                        name: 'countryTrain',
                        cfKey: 'cf_country_train',
                        value: 20,
                      },
                    ],
                    value: 58.25,
                  },
                  {
                    name: 'bus',
                    children: [
                      {
                        name: 'coachCommute',
                        cfKey: 'cf_coach_commute',
                        value: 6.4,
                      },
                      {
                        name: 'coachTravel',
                        cfKey: 'cf_coach_travel',
                        value: 40,
                      },
                    ],
                    value: 46.4,
                  },
                  {
                    name: 'car',
                    children: [
                      {
                        name: 'dailyCommutes',
                        cfKey: 'cf_car_commute',
                        value: 53.25201203029334,
                      },
                      {
                        name: 'exceptionalCommutes',
                        cfKey: 'cf_car_travel',
                        value: 583.5836934826667,
                      },
                    ],
                    value: 636.8357055129601,
                  },
                ],
                value: 1491.48570551296,
              },
              {
                name: 'housing',
                children: [
                  {
                    name: 'housingEquipment',
                    children: [
                      {
                        name: 'appliances',
                        children: [
                          {
                            name: 'smallAppliances',
                            cfKey: 'cf_small_appliances',
                            value: 46.666666666666664,
                          },
                          {
                            name: 'bigApplicances',
                            cfKey: 'cf_big_appliances',
                            value: 54.36666666666667,
                          },
                        ],
                        value: 101.03333333333333,
                      },
                      {
                        name: 'furnitures',
                        children: [
                          {
                            name: 'furnituresPerSurface',
                            cfKey: 'cf_furnitures',
                            value: 79,
                          },
                          {
                            name: 'furnituresMin',
                            cfKey: 'cf_furnitures_min',
                            value: 73.4044444,
                          },
                        ],
                        value: 152.4044444,
                      },
                    ],
                    value: 253.43777773333332,
                  },
                  {
                    name: 'constructionAndMaintenance',
                    children: [
                      {
                        name: 'construction',
                        children: [
                          {
                            name: 'houseConstruction',
                            cfKey: 'cf_house_construction',
                            value: 283.34,
                          },
                          {
                            name: 'flatConstruction',
                            cfKey: 'cf_flat_construction',
                            value: 0,
                          },
                        ],
                        value: 283.34,
                      },
                      {
                        name: 'construction',
                        cfKey: 'cf_maintenance',
                        value: 13.88,
                      },
                    ],
                    value: 297.21999999999997,
                  },
                  {
                    name: 'energies',
                    children: [
                      {
                        name: 'water',
                        cfKey: 'cf_water',
                        value: 9.07536,
                      },
                      {
                        name: 'electricity',
                        children: [
                          {
                            name: 'elecHeating',
                            cfKey: 'cf_elec_heating',
                            value: 0,
                          },
                          {
                            name: 'elecCooking',
                            cfKey: 'cf_elec_cooking',
                            value: 0.2689440993788819,
                          },
                          {
                            name: 'elecWaterHeating',
                            cfKey: 'cf_elec_water_heating',
                            value: 0,
                          },
                          {
                            name: 'elecLightning',
                            cfKey: 'cf_elec_lightning',
                            value: 1.031055900621118,
                          },
                        ],
                        value: 1.2999999999999998,
                      },
                      {
                        name: 'gas',
                        children: [
                          {
                            name: 'gasHeating',
                            cfKey: 'cf_gas_heating',
                            value: 22.7,
                          },
                          {
                            name: 'gasCooking',
                            cfKey: 'cf_gas_cooking',
                            value: 0,
                          },
                          {
                            name: 'gasWaterHeating',
                            cfKey: 'cf_gas_water_heating',
                            value: 0,
                          },
                        ],
                        value: 22.7,
                      },
                      {
                        name: 'fuel',
                        children: [
                          {
                            name: 'fuelHeating',
                            cfKey: 'cf_fuel_heating',
                            value: 0,
                          },
                          {
                            name: 'fuelCooking',
                            cfKey: 'cf_fuel_cooking',
                            value: 0,
                          },
                          {
                            name: 'fuelWaterHeating',
                            cfKey: 'cf_fuel_water_heating',
                            value: 0,
                          },
                        ],
                        value: 0,
                      },
                      {
                        name: 'wood',
                        children: [
                          {
                            name: 'woodHeating',
                            cfKey: 'cf_wood_heating',
                            value: 0,
                          },
                          {
                            name: 'woodCooking',
                            cfKey: 'cf_wood_cooking',
                            value: 0,
                          },
                          {
                            name: 'woodWaterHeating',
                            cfKey: 'cf_wood_water_heating',
                            value: 0,
                          },
                        ],
                        value: 0,
                      },
                      {
                        name: 'districtHeating',
                        cfKey: 'cf_district_heating',
                        value: 0,
                      },
                    ],
                    value: 33.07536,
                  },
                ],
                value: 583.7331377333334,
              },
              {
                name: 'food',
                children: [
                  {
                    name: 'drinks',
                    children: [
                      {
                        name: 'alcohol',
                        cfKey: 'cf_alcohol',
                        value: 228.855,
                      },
                      {
                        name: 'hotDrinks',
                        cfKey: 'cf_hot_drinks',
                        value: 112.42,
                      },
                      {
                        name: 'juicesAndSoda',
                        cfKey: 'cf_juices_and_sodas',
                        value: 214.62,
                      },
                    ],
                    value: 555.895,
                  },
                  {
                    name: 'meat',
                    children: [
                      {
                        name: 'red_meat',
                        cfKey: 'cf_red_meat',
                        value: 116.44503750000003,
                      },
                      {
                        name: 'white_meat',
                        cfKey: 'cf_white_meat',
                        value: 116.44503750000003,
                      },
                    ],
                    value: 232.89007500000005,
                  },
                  {
                    name: 'fish',
                    cfKey: 'cf_fish',
                    value: 116.44503750000003,
                  },
                  {
                    name: 'eggsAndDairies',
                    children: [
                      {
                        name: 'eggs',
                        cfKey: 'cf_eggs',
                        value: 35.833875,
                      },
                      {
                        name: 'dairies',
                        cfKey: 'cf_dairies',
                        value: 35.833875,
                      },
                    ],
                    value: 71.66775,
                  },
                  {
                    name: 'others',
                    children: [
                      {
                        name: 'transformedProducts',
                        cfKey: 'cf_transformed_products',
                        value: 198.288,
                      },
                      {
                        name: 'groceriesAndStarches',
                        cfKey: 'cf_starches_and_groceries',
                        value: 240.65753571428573,
                      },
                      {
                        name: 'fruitsAndVegetables',
                        children: [
                          {
                            name: 'localFruitsAndVegeteables',
                            cfKey: 'cf_local_fruits_and_vegetables',
                            value: 38.57007142857143,
                          },
                          {
                            name: 'importedFruitsAndVegeteables',
                            cfKey: 'cf_imported_fruits_and_vegetables',
                            value: 332.29600000000005,
                          },
                        ],
                        value: 370.8660714285715,
                      },
                    ],
                    value: 809.8116071428572,
                  },
                ],
                value: 1786.7094696428571,
              },
              {
                name: 'others',
                children: [
                  {
                    name: 'clothing',
                    cfKey: 'cf_clothes',
                    value: 671.4,
                  },
                  {
                    name: 'digital',
                    children: [
                      {
                        name: 'devices',
                        children: [
                          {
                            name: 'smallDevices',
                            cfKey: 'cf_small_devices_cradle_to_crate',
                            value: 25,
                          },
                          {
                            name: 'bigDevices',
                            cfKey: 'cf_big_devices_cradle_to_crate',
                            value: 143.39999999999998,
                          },
                        ],
                        value: 168.39999999999998,
                      },
                      {
                        name: 'internetUsage',
                        children: [
                          {
                            name: 'internetStreaming',
                            cfKey: 'cf_internet_streaming',
                            value: 31.875,
                          },
                          {
                            name: 'internetOthers',
                            cfKey: 'cf_internet_others',
                            value: 48.66,
                          },
                        ],
                        value: 80.535,
                      },
                    ],
                    value: 248.93499999999997,
                  },
                  {
                    name: 'others',
                    children: [
                      {
                        name: 'activities',
                        children: [
                          {
                            name: 'activitiesElectricity',
                            cfKey: 'cf_activities_electricity',
                            value: 23.76,
                          },
                          {
                            name: 'activitiesGas',
                            cfKey: 'cf_activities_gas',
                            value: 26.64,
                          },
                          {
                            name: 'activitiesWithoutEnergy',
                            cfKey: 'cf_activities_without_energy',
                            value: 23.76,
                          },
                        ],
                        value: 74.16000000000001,
                      },
                      {
                        name: 'goodsAndServices',
                        children: [
                          {
                            name: 'servicesElectricity',
                            cfKey: 'cf_services_electricity',
                            value: 62.88,
                          },
                          {
                            name: 'servicesGas',
                            cfKey: 'cf_services_gas',
                            value: 70.19,
                          },
                          {
                            name: 'servicesWithoutEnergy',
                            cfKey: 'cf_services_without_energy',
                            value: 211.92,
                          },
                        ],
                        value: 344.99,
                      },
                    ],
                    value: 419.15000000000003,
                  },
                ],
                value: 1339.485,
              },
              {
                name: 'publicServices',
                children: [
                  {
                    name: 'gasPublicServices',
                    cfKey: 'cf_gas_public_services',
                    value: 336,
                  },
                  {
                    name: 'elecPublicServices',
                    cfKey: 'cf_elec_public_services',
                    value: 301,
                  },
                  {
                    name: 'otherPublicServices',
                    cfKey: 'cf_other_public_services',
                    value: 363,
                  },
                ],
                value: 1000,
              },
            ],
            value: 6201.413312889151,
          },
        },
      ],
      citizenCarbonVariables: [
        {
          citizenId: 10,
          variables: {
            residentsPerHousing: 3,
            redMeatKgPerYear: 9.033750000000001,
            whiteMeatKgPerYear: 9.033750000000001,
            fishKgPerYear: 9.033750000000001,
            eggsKgPerYear: 10.0375,
            dairiesKgPerYear: 10.0375,
            transformedProductsKgPerYear: 45.9,
            fruitsAndVegetablesKgPerYear: 296.6928571428572,
            starchesAndGroceriesKgPerYear: 165.9707142857143,
            alcoholConsoLitersPerYear: 109.5,
            hotDrinksConsoLitersPerYear: 36.5,
            juicesAndSodasConsoLitersPerYear: 146,
            kmCarCommutePerYear: 730,
            kmUrbanBusPerYear: 612,
            kmCoachCommutePerYear: 160,
            kmUrbanTrainPerYear: 3825,
            internetStreamingHoursPerYear: 255,
            activitiesPerYear: 36,
            woodHeatingKwh: 0,
            woodCookingKwh: 0,
            woodWaterHeatingKwh: 0,
            gasHeatingKwh: 100,
            gasCookingKwh: 0,
            gasWaterHeatingKwh: 0,
            fuelHeatingKwh: 0,
            fuelCookingKwh: 0,
            fuelWaterHeatingKwh: 0,
            elecHeatingKwh: 0,
            elecCookingKwh: 20.688007644529378,
            elecLightningKwh: 79.31199235547062,
            elecWaterHeatingKwh: 0,
            fruitsAndVegetablePercentageLocal: 0.5,
            categoryCarCommute: 'URBAN',
            motorTypeCarCommute: 'FUEL',
            ageCategoryCarCommute: 'TEN_YEARS_OR_YOUNGER',
            kmCarCommutePerDay: 25,
            passengersPerCarCommute: 3,
            coefficientEnergyEfficientDriving: 1,
            categoryCarTravel: 'URBAN',
            motorTypeCarTravel: 'FUEL',
            ageCategoryCarTravel: 'TEN_YEARS_OR_YOUNGER',
            kmCarTravelPerYear: 8000,
            passengersPerCarTravel: 3,
            kmCoachTravel: 1000,
            kmCountryTrain: 2000,
            kmPlane: 3000,
            houseSurfaceArea: 60,
            flatSurfaceArea: 0,
            numberBigAppliances: 7,
            numberSmallAppliances: 20,
            electricityProvider: 'ALTERNATIVE',
            numberSmallDevices: 2,
            numberBigDevices: 3,
            clothesNewItems: 30,
          },
        },
        {
          citizenId: 20,
          variables: {
            residentsPerHousing: 3,
            redMeatKgPerYear: 9.033750000000001,
            whiteMeatKgPerYear: 9.033750000000001,
            fishKgPerYear: 9.033750000000001,
            eggsKgPerYear: 10.0375,
            dairiesKgPerYear: 10.0375,
            transformedProductsKgPerYear: 45.9,
            fruitsAndVegetablesKgPerYear: 296.6928571428572,
            starchesAndGroceriesKgPerYear: 165.9707142857143,
            alcoholConsoLitersPerYear: 109.5,
            hotDrinksConsoLitersPerYear: 36.5,
            juicesAndSodasConsoLitersPerYear: 146,
            kmCarCommutePerYear: 730,
            kmUrbanBusPerYear: 612,
            kmCoachCommutePerYear: 160,
            kmUrbanTrainPerYear: 3825,
            internetStreamingHoursPerYear: 255,
            activitiesPerYear: 36,
            woodHeatingKwh: 0,
            woodCookingKwh: 0,
            woodWaterHeatingKwh: 0,
            gasHeatingKwh: 100,
            gasCookingKwh: 0,
            gasWaterHeatingKwh: 0,
            fuelHeatingKwh: 0,
            fuelCookingKwh: 0,
            fuelWaterHeatingKwh: 0,
            elecHeatingKwh: 0,
            elecCookingKwh: 20.688007644529378,
            elecLightningKwh: 79.31199235547062,
            elecWaterHeatingKwh: 0,
            fruitsAndVegetablePercentageLocal: 0.5,
            categoryCarCommute: 'URBAN',
            motorTypeCarCommute: 'FUEL',
            ageCategoryCarCommute: 'TEN_YEARS_OR_YOUNGER',
            kmCarCommutePerDay: 25,
            passengersPerCarCommute: 3,
            coefficientEnergyEfficientDriving: 1,
            categoryCarTravel: 'URBAN',
            motorTypeCarTravel: 'FUEL',
            ageCategoryCarTravel: 'TEN_YEARS_OR_YOUNGER',
            kmCarTravelPerYear: 8000,
            passengersPerCarTravel: 3,
            kmCoachTravel: 1000,
            kmCountryTrain: 2000,
            kmPlane: 3000,
            houseSurfaceArea: 60,
            flatSurfaceArea: 0,
            numberBigAppliances: 7,
            numberSmallAppliances: 20,
            electricityProvider: 'ALTERNATIVE',
            numberSmallDevices: 2,
            numberBigDevices: 3,
            clothesNewItems: 30,
          },
        },
      ],
      citizenCarbonFootprints: [
        {
          citizenId: 10,
          footprint: {
            name: 'totalFootprint',
            children: [
              {
                name: 'transports',
                children: [
                  {
                    name: 'plane',
                    cfKey: 'cf_plane',
                    value: 750,
                  },
                  {
                    name: 'train',
                    children: [
                      {
                        name: 'urbanTrain',
                        cfKey: 'cf_urban_train',
                        value: 38.25,
                      },
                      {
                        name: 'countryTrain',
                        cfKey: 'cf_country_train',
                        value: 20,
                      },
                    ],
                    value: 58.25,
                  },
                  {
                    name: 'bus',
                    children: [
                      {
                        name: 'coachCommute',
                        cfKey: 'cf_coach_commute',
                        value: 6.4,
                      },
                      {
                        name: 'coachTravel',
                        cfKey: 'cf_coach_travel',
                        value: 40,
                      },
                    ],
                    value: 46.4,
                  },
                  {
                    name: 'car',
                    children: [
                      {
                        name: 'dailyCommutes',
                        cfKey: 'cf_car_commute',
                        value: 53.25201203029334,
                      },
                      {
                        name: 'exceptionalCommutes',
                        cfKey: 'cf_car_travel',
                        value: 583.5836934826667,
                      },
                    ],
                    value: 636.8357055129601,
                  },
                ],
                value: 1491.48570551296,
              },
              {
                name: 'housing',
                children: [
                  {
                    name: 'housingEquipment',
                    children: [
                      {
                        name: 'appliances',
                        children: [
                          {
                            name: 'smallAppliances',
                            cfKey: 'cf_small_appliances',
                            value: 46.666666666666664,
                          },
                          {
                            name: 'bigApplicances',
                            cfKey: 'cf_big_appliances',
                            value: 54.36666666666667,
                          },
                        ],
                        value: 101.03333333333333,
                      },
                      {
                        name: 'furnitures',
                        children: [
                          {
                            name: 'furnituresPerSurface',
                            cfKey: 'cf_furnitures',
                            value: 79,
                          },
                          {
                            name: 'furnituresMin',
                            cfKey: 'cf_furnitures_min',
                            value: 73.4044444,
                          },
                        ],
                        value: 152.4044444,
                      },
                    ],
                    value: 253.43777773333332,
                  },
                  {
                    name: 'constructionAndMaintenance',
                    children: [
                      {
                        name: 'construction',
                        children: [
                          {
                            name: 'houseConstruction',
                            cfKey: 'cf_house_construction',
                            value: 283.34,
                          },
                          {
                            name: 'flatConstruction',
                            cfKey: 'cf_flat_construction',
                            value: 0,
                          },
                        ],
                        value: 283.34,
                      },
                      {
                        name: 'construction',
                        cfKey: 'cf_maintenance',
                        value: 13.88,
                      },
                    ],
                    value: 297.21999999999997,
                  },
                  {
                    name: 'energies',
                    children: [
                      {
                        name: 'water',
                        cfKey: 'cf_water',
                        value: 9.07536,
                      },
                      {
                        name: 'electricity',
                        children: [
                          {
                            name: 'elecHeating',
                            cfKey: 'cf_elec_heating',
                            value: 0,
                          },
                          {
                            name: 'elecCooking',
                            cfKey: 'cf_elec_cooking',
                            value: 0.2689440993788819,
                          },
                          {
                            name: 'elecWaterHeating',
                            cfKey: 'cf_elec_water_heating',
                            value: 0,
                          },
                          {
                            name: 'elecLightning',
                            cfKey: 'cf_elec_lightning',
                            value: 1.031055900621118,
                          },
                        ],
                        value: 1.2999999999999998,
                      },
                      {
                        name: 'gas',
                        children: [
                          {
                            name: 'gasHeating',
                            cfKey: 'cf_gas_heating',
                            value: 22.7,
                          },
                          {
                            name: 'gasCooking',
                            cfKey: 'cf_gas_cooking',
                            value: 0,
                          },
                          {
                            name: 'gasWaterHeating',
                            cfKey: 'cf_gas_water_heating',
                            value: 0,
                          },
                        ],
                        value: 22.7,
                      },
                      {
                        name: 'fuel',
                        children: [
                          {
                            name: 'fuelHeating',
                            cfKey: 'cf_fuel_heating',
                            value: 0,
                          },
                          {
                            name: 'fuelCooking',
                            cfKey: 'cf_fuel_cooking',
                            value: 0,
                          },
                          {
                            name: 'fuelWaterHeating',
                            cfKey: 'cf_fuel_water_heating',
                            value: 0,
                          },
                        ],
                        value: 0,
                      },
                      {
                        name: 'wood',
                        children: [
                          {
                            name: 'woodHeating',
                            cfKey: 'cf_wood_heating',
                            value: 0,
                          },
                          {
                            name: 'woodCooking',
                            cfKey: 'cf_wood_cooking',
                            value: 0,
                          },
                          {
                            name: 'woodWaterHeating',
                            cfKey: 'cf_wood_water_heating',
                            value: 0,
                          },
                        ],
                        value: 0,
                      },
                      {
                        name: 'districtHeating',
                        cfKey: 'cf_district_heating',
                        value: 0,
                      },
                    ],
                    value: 33.07536,
                  },
                ],
                value: 583.7331377333334,
              },
              {
                name: 'food',
                children: [
                  {
                    name: 'drinks',
                    children: [
                      {
                        name: 'alcohol',
                        cfKey: 'cf_alcohol',
                        value: 228.855,
                      },
                      {
                        name: 'hotDrinks',
                        cfKey: 'cf_hot_drinks',
                        value: 112.42,
                      },
                      {
                        name: 'juicesAndSoda',
                        cfKey: 'cf_juices_and_sodas',
                        value: 214.62,
                      },
                    ],
                    value: 555.895,
                  },
                  {
                    name: 'meat',
                    children: [
                      {
                        name: 'red_meat',
                        cfKey: 'cf_red_meat',
                        value: 116.44503750000003,
                      },
                      {
                        name: 'white_meat',
                        cfKey: 'cf_white_meat',
                        value: 116.44503750000003,
                      },
                    ],
                    value: 232.89007500000005,
                  },
                  {
                    name: 'fish',
                    cfKey: 'cf_fish',
                    value: 116.44503750000003,
                  },
                  {
                    name: 'eggsAndDairies',
                    children: [
                      {
                        name: 'eggs',
                        cfKey: 'cf_eggs',
                        value: 35.833875,
                      },
                      {
                        name: 'dairies',
                        cfKey: 'cf_dairies',
                        value: 35.833875,
                      },
                    ],
                    value: 71.66775,
                  },
                  {
                    name: 'othersFood',
                    children: [
                      {
                        name: 'transformedProducts',
                        cfKey: 'cf_transformed_products',
                        value: 198.288,
                      },
                      {
                        name: 'groceriesAndStarches',
                        cfKey: 'cf_starches_and_groceries',
                        value: 240.65753571428573,
                      },
                      {
                        name: 'fruitsAndVegetables',
                        children: [
                          {
                            name: 'localFruitsAndVegeteables',
                            cfKey: 'cf_local_fruits_and_vegetables',
                            value: 38.57007142857143,
                          },
                          {
                            name: 'importedFruitsAndVegeteables',
                            cfKey: 'cf_imported_fruits_and_vegetables',
                            value: 332.29600000000005,
                          },
                        ],
                        value: 370.8660714285715,
                      },
                    ],
                    value: 809.8116071428572,
                  },
                ],
                value: 1786.7094696428571,
              },
              {
                name: 'others',
                children: [
                  {
                    name: 'clothing',
                    cfKey: 'cf_clothes',
                    value: 671.4,
                  },
                  {
                    name: 'digital',
                    children: [
                      {
                        name: 'devices',
                        children: [
                          {
                            name: 'smallDevices',
                            cfKey: 'cf_small_devices_cradle_to_crate',
                            value: 25,
                          },
                          {
                            name: 'bigDevices',
                            cfKey: 'cf_big_devices_cradle_to_crate',
                            value: 143.39999999999998,
                          },
                        ],
                        value: 168.39999999999998,
                      },
                      {
                        name: 'internetUsage',
                        children: [
                          {
                            name: 'internetStreaming',
                            cfKey: 'cf_internet_streaming',
                            value: 31.875,
                          },
                          {
                            name: 'internetOthers',
                            cfKey: 'cf_internet_others',
                            value: 48.66,
                          },
                        ],
                        value: 80.535,
                      },
                    ],
                    value: 248.93499999999997,
                  },
                  {
                    name: 'othersConso',
                    children: [
                      {
                        name: 'activities',
                        children: [
                          {
                            name: 'activitiesElectricity',
                            cfKey: 'cf_activities_electricity',
                            value: 23.76,
                          },
                          {
                            name: 'activitiesGas',
                            cfKey: 'cf_activities_gas',
                            value: 26.64,
                          },
                          {
                            name: 'activitiesWithoutEnergy',
                            cfKey: 'cf_activities_without_energy',
                            value: 23.76,
                          },
                        ],
                        value: 74.16000000000001,
                      },
                      {
                        name: 'goodsAndServices',
                        children: [
                          {
                            name: 'servicesElectricity',
                            cfKey: 'cf_services_electricity',
                            value: 62.88,
                          },
                          {
                            name: 'servicesGas',
                            cfKey: 'cf_services_gas',
                            value: 70.19,
                          },
                          {
                            name: 'servicesWithoutEnergy',
                            cfKey: 'cf_services_without_energy',
                            value: 211.92,
                          },
                        ],
                        value: 344.99,
                      },
                    ],
                    value: 419.15000000000003,
                  },
                ],
                value: 1339.485,
              },
              {
                name: 'publicServices',
                children: [
                  {
                    name: 'gasPublicServices',
                    cfKey: 'cf_gas_public_services',
                    value: 336,
                  },
                  {
                    name: 'elecPublicServices',
                    cfKey: 'cf_elec_public_services',
                    value: 301,
                  },
                  {
                    name: 'otherPublicServices',
                    cfKey: 'cf_other_public_services',
                    value: 363,
                  },
                ],
                value: 1000,
              },
            ],
            value: 6201.413312889151,
          },
        },
        {
          citizenId: 20,
          footprint: {
            name: 'totalFootprint',
            children: [
              {
                name: 'transports',
                children: [
                  {
                    name: 'plane',
                    cfKey: 'cf_plane',
                    value: 750,
                  },
                  {
                    name: 'train',
                    children: [
                      {
                        name: 'urbanTrain',
                        cfKey: 'cf_urban_train',
                        value: 38.25,
                      },
                      {
                        name: 'countryTrain',
                        cfKey: 'cf_country_train',
                        value: 20,
                      },
                    ],
                    value: 58.25,
                  },
                  {
                    name: 'bus',
                    children: [
                      {
                        name: 'coachCommute',
                        cfKey: 'cf_coach_commute',
                        value: 6.4,
                      },
                      {
                        name: 'coachTravel',
                        cfKey: 'cf_coach_travel',
                        value: 40,
                      },
                    ],
                    value: 46.4,
                  },
                  {
                    name: 'car',
                    children: [
                      {
                        name: 'dailyCommutes',
                        cfKey: 'cf_car_commute',
                        value: 53.25201203029334,
                      },
                      {
                        name: 'exceptionalCommutes',
                        cfKey: 'cf_car_travel',
                        value: 583.5836934826667,
                      },
                    ],
                    value: 636.8357055129601,
                  },
                ],
                value: 1491.48570551296,
              },
              {
                name: 'housing',
                children: [
                  {
                    name: 'housingEquipment',
                    children: [
                      {
                        name: 'appliances',
                        children: [
                          {
                            name: 'smallAppliances',
                            cfKey: 'cf_small_appliances',
                            value: 46.666666666666664,
                          },
                          {
                            name: 'bigApplicances',
                            cfKey: 'cf_big_appliances',
                            value: 54.36666666666667,
                          },
                        ],
                        value: 101.03333333333333,
                      },
                      {
                        name: 'furnitures',
                        children: [
                          {
                            name: 'furnituresPerSurface',
                            cfKey: 'cf_furnitures',
                            value: 79,
                          },
                          {
                            name: 'furnituresMin',
                            cfKey: 'cf_furnitures_min',
                            value: 73.4044444,
                          },
                        ],
                        value: 152.4044444,
                      },
                    ],
                    value: 253.43777773333332,
                  },
                  {
                    name: 'constructionAndMaintenance',
                    children: [
                      {
                        name: 'construction',
                        children: [
                          {
                            name: 'houseConstruction',
                            cfKey: 'cf_house_construction',
                            value: 283.34,
                          },
                          {
                            name: 'flatConstruction',
                            cfKey: 'cf_flat_construction',
                            value: 0,
                          },
                        ],
                        value: 283.34,
                      },
                      {
                        name: 'construction',
                        cfKey: 'cf_maintenance',
                        value: 13.88,
                      },
                    ],
                    value: 297.21999999999997,
                  },
                  {
                    name: 'energies',
                    children: [
                      {
                        name: 'water',
                        cfKey: 'cf_water',
                        value: 9.07536,
                      },
                      {
                        name: 'electricity',
                        children: [
                          {
                            name: 'elecHeating',
                            cfKey: 'cf_elec_heating',
                            value: 0,
                          },
                          {
                            name: 'elecCooking',
                            cfKey: 'cf_elec_cooking',
                            value: 0.2689440993788819,
                          },
                          {
                            name: 'elecWaterHeating',
                            cfKey: 'cf_elec_water_heating',
                            value: 0,
                          },
                          {
                            name: 'elecLightning',
                            cfKey: 'cf_elec_lightning',
                            value: 1.031055900621118,
                          },
                        ],
                        value: 1.2999999999999998,
                      },
                      {
                        name: 'gas',
                        children: [
                          {
                            name: 'gasHeating',
                            cfKey: 'cf_gas_heating',
                            value: 22.7,
                          },
                          {
                            name: 'gasCooking',
                            cfKey: 'cf_gas_cooking',
                            value: 0,
                          },
                          {
                            name: 'gasWaterHeating',
                            cfKey: 'cf_gas_water_heating',
                            value: 0,
                          },
                        ],
                        value: 22.7,
                      },
                      {
                        name: 'fuel',
                        children: [
                          {
                            name: 'fuelHeating',
                            cfKey: 'cf_fuel_heating',
                            value: 0,
                          },
                          {
                            name: 'fuelCooking',
                            cfKey: 'cf_fuel_cooking',
                            value: 0,
                          },
                          {
                            name: 'fuelWaterHeating',
                            cfKey: 'cf_fuel_water_heating',
                            value: 0,
                          },
                        ],
                        value: 0,
                      },
                      {
                        name: 'wood',
                        children: [
                          {
                            name: 'woodHeating',
                            cfKey: 'cf_wood_heating',
                            value: 0,
                          },
                          {
                            name: 'woodCooking',
                            cfKey: 'cf_wood_cooking',
                            value: 0,
                          },
                          {
                            name: 'woodWaterHeating',
                            cfKey: 'cf_wood_water_heating',
                            value: 0,
                          },
                        ],
                        value: 0,
                      },
                      {
                        name: 'districtHeating',
                        cfKey: 'cf_district_heating',
                        value: 0,
                      },
                    ],
                    value: 33.07536,
                  },
                ],
                value: 583.7331377333334,
              },
              {
                name: 'food',
                children: [
                  {
                    name: 'drinks',
                    children: [
                      {
                        name: 'alcohol',
                        cfKey: 'cf_alcohol',
                        value: 228.855,
                      },
                      {
                        name: 'hotDrinks',
                        cfKey: 'cf_hot_drinks',
                        value: 112.42,
                      },
                      {
                        name: 'juicesAndSoda',
                        cfKey: 'cf_juices_and_sodas',
                        value: 214.62,
                      },
                    ],
                    value: 555.895,
                  },
                  {
                    name: 'meat',
                    children: [
                      {
                        name: 'red_meat',
                        cfKey: 'cf_red_meat',
                        value: 116.44503750000003,
                      },
                      {
                        name: 'white_meat',
                        cfKey: 'cf_white_meat',
                        value: 116.44503750000003,
                      },
                    ],
                    value: 232.89007500000005,
                  },
                  {
                    name: 'fish',
                    cfKey: 'cf_fish',
                    value: 116.44503750000003,
                  },
                  {
                    name: 'eggsAndDairies',
                    children: [
                      {
                        name: 'eggs',
                        cfKey: 'cf_eggs',
                        value: 35.833875,
                      },
                      {
                        name: 'dairies',
                        cfKey: 'cf_dairies',
                        value: 35.833875,
                      },
                    ],
                    value: 71.66775,
                  },
                  {
                    name: 'othersFood',
                    children: [
                      {
                        name: 'transformedProducts',
                        cfKey: 'cf_transformed_products',
                        value: 198.288,
                      },
                      {
                        name: 'groceriesAndStarches',
                        cfKey: 'cf_starches_and_groceries',
                        value: 240.65753571428573,
                      },
                      {
                        name: 'fruitsAndVegetables',
                        children: [
                          {
                            name: 'localFruitsAndVegeteables',
                            cfKey: 'cf_local_fruits_and_vegetables',
                            value: 38.57007142857143,
                          },
                          {
                            name: 'importedFruitsAndVegeteables',
                            cfKey: 'cf_imported_fruits_and_vegetables',
                            value: 332.29600000000005,
                          },
                        ],
                        value: 370.8660714285715,
                      },
                    ],
                    value: 809.8116071428572,
                  },
                ],
                value: 1786.7094696428571,
              },
              {
                name: 'others',
                children: [
                  {
                    name: 'clothing',
                    cfKey: 'cf_clothes',
                    value: 671.4,
                  },
                  {
                    name: 'digital',
                    children: [
                      {
                        name: 'devices',
                        children: [
                          {
                            name: 'smallDevices',
                            cfKey: 'cf_small_devices_cradle_to_crate',
                            value: 25,
                          },
                          {
                            name: 'bigDevices',
                            cfKey: 'cf_big_devices_cradle_to_crate',
                            value: 143.39999999999998,
                          },
                        ],
                        value: 168.39999999999998,
                      },
                      {
                        name: 'internetUsage',
                        children: [
                          {
                            name: 'internetStreaming',
                            cfKey: 'cf_internet_streaming',
                            value: 31.875,
                          },
                          {
                            name: 'internetOthers',
                            cfKey: 'cf_internet_others',
                            value: 48.66,
                          },
                        ],
                        value: 80.535,
                      },
                    ],
                    value: 248.93499999999997,
                  },
                  {
                    name: 'othersConso',
                    children: [
                      {
                        name: 'activities',
                        children: [
                          {
                            name: 'activitiesElectricity',
                            cfKey: 'cf_activities_electricity',
                            value: 23.76,
                          },
                          {
                            name: 'activitiesGas',
                            cfKey: 'cf_activities_gas',
                            value: 26.64,
                          },
                          {
                            name: 'activitiesWithoutEnergy',
                            cfKey: 'cf_activities_without_energy',
                            value: 23.76,
                          },
                        ],
                        value: 74.16000000000001,
                      },
                      {
                        name: 'goodsAndServices',
                        children: [
                          {
                            name: 'servicesElectricity',
                            cfKey: 'cf_services_electricity',
                            value: 62.88,
                          },
                          {
                            name: 'servicesGas',
                            cfKey: 'cf_services_gas',
                            value: 70.19,
                          },
                          {
                            name: 'servicesWithoutEnergy',
                            cfKey: 'cf_services_without_energy',
                            value: 211.92,
                          },
                        ],
                        value: 344.99,
                      },
                    ],
                    value: 419.15000000000003,
                  },
                ],
                value: 1339.485,
              },
              {
                name: 'publicServices',
                children: [
                  {
                    name: 'gasPublicServices',
                    cfKey: 'cf_gas_public_services',
                    value: 336,
                  },
                  {
                    name: 'elecPublicServices',
                    cfKey: 'cf_elec_public_services',
                    value: 301,
                  },
                  {
                    name: 'otherPublicServices',
                    cfKey: 'cf_other_public_services',
                    value: 363,
                  },
                ],
                value: 1000,
              },
            ],
            value: 6201.413312889151,
          },
        },
      ],
      roundsConfig: {
        actionCardType: 'individual',
        targetedYear: 2023,
        budget: 4,
        actionCardBatchIds: [1, 2],
      },
      globalCarbonVariables: {
        EI_URBAN_BUS: 0.15,
        MEAN_SPEED_URBAN_BUS: 12,
        EI_COACH: 0.04,
        MEAN_SPEED_COACH: 80,

        // Food
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
        EI_ELEC_PER_KWH: {
          CONVENTIONAL: 0.116,
          ALTERNATIVE: 0.013,
        },
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
      },
      socialVariables: {
        socialScore: 12,
        influenceScore: 17,
      },
      // individualActionCards: [
      //   {
      //     participantId: 1,
      //     actionCardIds: [1, 2, 3],
      //   },
      //   {
      //     participantId: 2,
      //     actionCardIds: [2, 3],
      //   },
      // ],
    },
    /*
    {
      year: 2023,
      carbonInfo: [
        {
          participantId: 1,
          carbonVariables: {
            // food
            meat_and_fish_conso_per_day: 0.5,
            eggs_and_dairies_conso_per_day: 0.5,
            fruits_and_vegetable_percentage_local: 0.5,
            transformed_products_conso_per_week: 3,
            alcohol_conso_glass_per_day: 1,
            hot_drinks_conso_glass_per_day: 5,
            juices_and_sodas_conso_glass_per_day: 2,
 
            // transports
            category_car_commute: 'URBAN',
            motor_type_car_commute: 'FUEL',
            age_category_car_commute: 'TEN_YEARS_OR_YOUNGER',
            km_per_day_car_commute: 2,
            passengers_per_car_commute: 3,
            hours_urban_bus_per_week: 1,
            hours_coach_commute_per_week: 2,
            hours_urban_train_per_week: 3,
            coefficient_energy_efficient_driving: 1,
 
            category_car_travel: 'URBAN',
            motor_type_car_travel: 'FUEL',
            age_category_car_travel: 'TEN_YEARS_OR_YOUNGER',
 
            km_per_year_car_travel: 8000,
            passengers_per_car_travel: 3,
 
            km_coach_travel: 1000,
            km_country_train: 2000,
            km_plane: 3000,
            // housing
            residents_per_housing: 3,
            housing_surface_area: 60,
            house_surface_area: 60,
            flat_surface_area: 0,
            number_big_appliances: 7,
            number_small_appliances: 20,
            housing_type: 'HOUSE',
            electricity_provider: 'ALTERNATIVE',
            maintainance_date: 'AFTER_2000',
            energy_consumption_knowledge: true,
            heating_system_energy_type: 'GAS',
            cooking_appliances_energy_type: 'ELECTRICITY',
            sanitory_hot_water_energy_type: 'FUEL_OIL',
 
            elec_lightning_kwh: 100,
            elec_water_heating_kwh: 100,
            elec_cooking_kwh: 100,
            elec_heating_kwh: 100,
            fuel_water_heating_kwh: 100,
            fuel_cooking_kwh: 100,
            fuel_heating_kwh: 100,
            gas_water_heating_kwh: 100,
            gas_cooking_kwh: 100,
            gas_heating_kwh: 100,
            wood_water_heating_kwh: 100,
            wood_cooking_kwh: 100,
            wood_heating_kwh: 100,
 
            // others
            clothes_new_items: 30,
            activities_per_month: 3,
            number_small_devices: 2,
            number_big_devices: 3,
            internet_streaming_hours_per_week: 5,
          },
          carbonFootprint: {},
        },
      ],
      roundsConfig: {
        actionCardType: 'collective',
        targetedYear: 2026,
        budget: 8,
        actionCardBatchIds: [3],
      },
      collectiveActionCards: { actionCardIds: [41, 42, 43] },
    },
    {
      year: 2026,
      carbonInfo: [
        {
          participantId: 1,
          carbonVariables: {
            // food
            meat_and_fish_conso_per_day: 0.5,
            eggs_and_dairies_conso_per_day: 0.5,
            fruits_and_vegetable_percentage_local: 0.5,
            transformed_products_conso_per_week: 3,
            alcohol_conso_glass_per_day: 1,
            hot_drinks_conso_glass_per_day: 5,
            juices_and_sodas_conso_glass_per_day: 2,
 
            // transports
            category_car_commute: 'URBAN',
            motor_type_car_commute: 'FUEL',
            age_category_car_commute: 'TEN_YEARS_OR_YOUNGER',
            km_per_day_car_commute: 2,
            passengers_per_car_commute: 3,
            hours_urban_bus_per_week: 1,
            hours_coach_commute_per_week: 2,
            hours_urban_train_per_week: 3,
            coefficient_energy_efficient_driving: 1,
 
            category_car_travel: 'URBAN',
            motor_type_car_travel: 'FUEL',
            age_category_car_travel: 'TEN_YEARS_OR_YOUNGER',
 
            km_per_year_car_travel: 8000,
            passengers_per_car_travel: 3,
 
            km_coach_travel: 1000,
            km_country_train: 2000,
            km_plane: 3000,
            // housing
            residents_per_housing: 3,
            housing_surface_area: 60,
            house_surface_area: 60,
            flat_surface_area: 0,
            number_big_appliances: 7,
            number_small_appliances: 20,
            housing_type: 'HOUSE',
            electricity_provider: 'ALTERNATIVE',
            maintainance_date: 'AFTER_2000',
            energy_consumption_knowledge: true,
            heating_system_energy_type: 'GAS',
            cooking_appliances_energy_type: 'ELECTRICITY',
            sanitory_hot_water_energy_type: 'FUEL_OIL',
 
            elec_lightning_kwh: 100,
            elec_water_heating_kwh: 100,
            elec_cooking_kwh: 100,
            elec_heating_kwh: 100,
            fuel_water_heating_kwh: 100,
            fuel_cooking_kwh: 100,
            fuel_heating_kwh: 100,
            gas_water_heating_kwh: 100,
            gas_cooking_kwh: 100,
            gas_heating_kwh: 100,
            wood_water_heating_kwh: 100,
            wood_cooking_kwh: 100,
            wood_heating_kwh: 100,
 
            // others
            clothes_new_items: 30,
            activities_per_month: 3,
            number_small_devices: 2,
            number_big_devices: 3,
            internet_streaming_hours_per_week: 5,
          },
          carbonFootprint: {},
        },
        {
          participantId: 2,
          carbonVariables: {
            // food
            meat_and_fish_conso_per_day: 0.5,
            eggs_and_dairies_conso_per_day: 0.5,
            fruits_and_vegetable_percentage_local: 0.5,
            transformed_products_conso_per_week: 3,
            alcohol_conso_glass_per_day: 1,
            hot_drinks_conso_glass_per_day: 5,
            juices_and_sodas_conso_glass_per_day: 2,
 
            // transports
            category_car_commute: 'URBAN',
            motor_type_car_commute: 'FUEL',
            age_category_car_commute: 'TEN_YEARS_OR_YOUNGER',
            km_per_day_car_commute: 2,
            passengers_per_car_commute: 3,
            hours_urban_bus_per_week: 1,
            hours_coach_commute_per_week: 2,
            hours_urban_train_per_week: 3,
            coefficient_energy_efficient_driving: 1,
 
            category_car_travel: 'URBAN',
            motor_type_car_travel: 'FUEL',
            age_category_car_travel: 'TEN_YEARS_OR_YOUNGER',
 
            km_per_year_car_travel: 8000,
            passengers_per_car_travel: 3,
 
            km_coach_travel: 1000,
            km_country_train: 2000,
            km_plane: 3000,
            // housing
            residents_per_housing: 3,
            housing_surface_area: 60,
            house_surface_area: 60,
            flat_surface_area: 0,
            number_big_appliances: 7,
            number_small_appliances: 20,
            housing_type: 'HOUSE',
            electricity_provider: 'ALTERNATIVE',
            maintainance_date: 'AFTER_2000',
            energy_consumption_knowledge: true,
            heating_system_energy_type: 'GAS',
            cooking_appliances_energy_type: 'ELECTRICITY',
            sanitory_hot_water_energy_type: 'FUEL_OIL',
 
            elec_lightning_kwh: 100,
            elec_water_heating_kwh: 100,
            elec_cooking_kwh: 100,
            elec_heating_kwh: 100,
            fuel_water_heating_kwh: 100,
            fuel_cooking_kwh: 100,
            fuel_heating_kwh: 100,
            gas_water_heating_kwh: 100,
            gas_cooking_kwh: 100,
            gas_heating_kwh: 100,
            wood_water_heating_kwh: 100,
            wood_cooking_kwh: 100,
            wood_heating_kwh: 100,
 
            // others
            clothes_new_items: 30,
            activities_per_month: 3,
            number_small_devices: 2,
            number_big_devices: 3,
            internet_streaming_hours_per_week: 5,
          },
          carbonFootprint: {},
        },
      ],
      roundsConfig: {
        actionCardType: 'individual',
        targetedYear: 2029,
        budget: 8,
        actionCardBatchIds: [4, 5],
      },
      individualActionCards: [
        {
          participantId: 1,
          actionCardIds: [5, 6],
        },
        {
          participantId: 2,
          actionCardIds: [5, 7, 8],
        },
      ],
    },
    {
      year: 2029,
      carbonInfo: [
        {
          participantId: 1,
          carbonVariables: {},
          carbonFootprint: {},
        },
      ],
      roundsConfig: {
        actionCardType: 'collective',
        targetedYear: 2032,
        budget: 8,
        actionCardBatchIds: [6],
      },
      collectiveActionCards: { actionCardIds: [47, 48] },
    },
    */
  ],
};
