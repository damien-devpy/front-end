export default {
  model: {
    footprintStructure: {
      transport: {
        plane: 'cf_plane',
        train: {
          urbanTrain: 'cf_urban_train',
          mainlineTrain: 'cf_country_train',
        },
        bus: {
          urbanBus: 'cf_urban_bus',
          coach: {
            coach_commute: 'cf_coach_commute',
            coach_travel: 'cf_coach_travel',
          },
        },
        car: {
          dailyCommutes: 'cf_car_commute',
          exceptionalCommutes: 'cf_car_travel',
        },
      },
      housing: {
        housingEquipment: {
          appliances: {
            smallAppliances: 'cf_small_appliances',
            bigApplicances: 'cf_big_appliances',
          },
          furnitures: {
            furnituresPerSurface: 'cf_furnitures',
            furnituresMin: 'cf_furnitures_min',
          },
        },
        constructionAndMaintenance: {
          construction: {
            houseConstruction: 'cf_house_construction',
            flatConstruction: 'cf_flat_construction',
          },
          maintenance: 'cf_maintenance',
        },
        energies: {
          water: 'cf_water',
          electricity: {
            elecHeating: 'cf_elec_heating',
            elecCooking: 'cf_elec_cooking',
            elecWaterHeating: 'cf_elec_water_heating',
            elecLightning: 'cf_elec_lightning',
          },
          gas: {
            gasHeating: 'cf_gas_heating',
            gasCooking: 'cf_gas_cooking',
            gasWaterHeating: 'cf_gas_water_heating',
          },
          fuel: {
            fuelHeating: 'cf_fuel_heating',
            fuelCooking: 'cf_fuel_cooking',
            fuelWaterHeating: 'cf_fuel_water_heating',
          },
          wood: {
            woodHeating: 'cf_wood_heating',
            woodCooking: 'cf_wood_cooking',
            woodWaterHeating: 'cf_wood_water_heating',
          },
          districtHeating: 'cf_heat_network',
        },
      },
      food: {
        drinks: {
          alcohol: 'cf_alcohol',
          hotDrinks: 'cf_hot_drinks',
          juicesAndSoda: 'cf_juices_and_sodas',
        },
        meatAndFish: 'cf_meat_and_fish',
        eggsAndDairies: 'cf_eggs_and_dairies',
        others: {
          fruitsAndVegetables: {
            localFruitsAndVegeteables: 'cf_local_fruits_and_vegetables',
            importedFruitsAndVegeteables: 'cf_imported_fruits_and_vegetables',
          },
          transformedProducts: 'cf_transformed_products',
          groceriesAndStarches: 'cf_starches_and_groceries',
        },
      },
      others: {
        clothing: 'cf_clothes',
        digital: {
          devices: {
            smallDevices: 'cf_small_devices_cradle_to_crate',
            bigDevices: 'cf_big_devices_cradle_to_crate',
          },
          internetUsage: {
            intrnetStreaming: 'cf_internet_streaming',
            intrnetOthers: 'cf_internet_others',
          },
        },
        others: {
          activities: {
            activitiesElectricity: 'cf_activities_electricity',
            activitiesGas: 'cf_activities_gas',
            activitiesWithoutEnergy: 'cf_activities_without_energy',
          },
          goods_and_services: {
            servicesElectricity: 'cf_services_electricity',
            servicesGas: 'cf_services_gas',
            servicesWithoutEnergy: 'cf_services_without_energy',
          },
        },
      },
      publicServices: 'cf_public_services',
    },
    variableFormulas: {
      // transports
      cf_car_commute: {
        '/': [
          {
            '*': [
              { var: 'km_per_day_car_commute' },
              {
                var: {
                  cat: [
                    'EI_CAR.',
                    { var: 'category_car_commute' },
                    '.',
                    { var: 'motor_type_car_commute' },
                  ],
                },
              },
              {
                var: {
                  cat: [
                    'MOTOR_AGING_FACTOR.',
                    { var: 'motor_type_car_commute' },
                    '.',
                    { var: 'age_category_car_commute' },
                  ],
                },
              },
              { var: 'DAYS_PER_YEAR' },
              { var: 'coefficient_energy_efficient_driving' },
            ],
          },
          { var: 'passengers_per_car_commute' },
        ],
      },
      cf_car_travel: {
        '/': [
          {
            '*': [
              { var: 'km_per_year_car_travel' },
              {
                var: {
                  cat: [
                    'EI_CAR.',
                    { var: 'category_car_travel' },
                    '.',
                    { var: 'motor_type_car_travel' },
                  ],
                },
              },
              {
                var: [
                  {
                    cat: [
                      'MOTOR_AGING_FACTOR.',
                      { var: 'motor_type_car_travel' },
                      '.',
                      { var: 'age_category_car_travel' },
                    ],
                  },
                  1,
                ],
              },
              { var: 'coefficient_energy_efficient_driving' },
            ],
          },
          { var: 'passengers_per_car_travel' },
        ],
      },
      cf_urban_bus: {
        '*': [
          { var: 'hours_urban_bus_per_week' },
          { var: 'EI_URBAN_BUS' },
          { var: 'MEAN_SPEED_URBAN_BUS' },
          { var: 'WEEKS_PER_YEAR' },
        ],
      },
      cf_coach_commute: {
        '*': [
          { var: 'hours_coach_commute_per_week' },
          { var: 'EI_COACH' },
          { var: 'MEAN_SPEED_COACH' },
        ],
      },
      cf_coach_travel: {
        '*': [{ var: 'km_coach_travel' }, { var: 'EI_COACH' }],
      },
      cf_urban_train: {
        '*': [
          { var: 'hours_urban_train_per_week' },
          { var: 'MEAN_SPEED_URBAN_TRAIN' },
          { var: 'EI_URBAN_TRAIN' },
          { var: 'WEEKS_PER_YEAR' },
        ],
      },
      cf_country_train: {
        '*': [{ var: 'km_country_train' }, { var: 'EI_COUNTRY_TRAIN' }],
      },
      cf_plane: {
        '*': [{ var: 'km_plane' }, { var: 'EI_PLANE' }],
      },
      // housing
      cf_small_appliances: {
        '/': [
          {
            '*': [
              { var: 'number_small_appliances' },
              { var: 'EI_SMALL_APPLIANCE' },
            ],
          },
          { var: 'residents_per_housing' },
        ],
      },
      cf_big_appliances: {
        '/': [
          {
            '*': [
              { var: 'number_big_appliances' },
              { var: 'EI_BIG_APPLIANCE' },
            ],
          },
          { var: 'residents_per_housing' },
        ],
      },
      cf_water_heater: {
        '/': [{ var: 'CF_WATER_HEATER' }, { var: 'residents_per_housing' }],
      },
      cf_furnitures: {
        '/': [
          {
            '*': [
              {
                '+': [
                  { var: 'house_surface_area' },
                  { var: 'flat_surface_area' },
                ],
              },
              { var: 'EI_FURNITURES_PER_SQUARE_METER' },
            ],
          },
          { var: 'residents_per_housing' },
        ],
      },
      cf_furnitures_min: { var: 'CF_FURNITURES_MIN_ONE_RESIDENT' },

      cf_house_construction: {
        '/': [
          {
            '*': [
              { var: 'house_surface_area' },
              { var: 'EI_CONSTRUCTION_HOUSE_PER_SQUARE_METER' },
            ],
          },
          { var: 'residents_per_housing' },
        ],
      },
      cf_flat_construction: {
        '/': [
          {
            '*': [
              { var: 'flat_surface_area' },
              { var: 'EI_CONSTRUCTION_FLAT_PER_SQUARE_METER' },
            ],
          },
          { var: 'residents_per_housing' },
        ],
      },

      cf_maintenance: {
        '/': [
          {
            '*': [
              { var: 'housing_surface_area' },
              { var: 'EI_MAINTENANCE_PER_SQUARE_METER' },
            ],
          },
          { var: 'residents_per_housing' },
        ],
      },
      cf_water: {
        '*': [
          { var: 'EI_WATER_PER_LITER' },
          { var: 'WATER_CONSO_LITER_PER_DAY_PER_PERSON' },
          { var: 'DAYS_PER_YEAR' },
        ],
      },
      cf_wood_heating: {
        '*': [{ var: 'wood_heating_kwh' }, { var: 'EI_WOOD_PER_KWH' }],
      },
      cf_wood_cooking: {
        '*': [{ var: 'wood_cooking_kwh' }, { var: 'EI_WOOD_PER_KWH' }],
      },
      cf_wood_water_heating: {
        '*': [{ var: 'wood_water_heating_kwh' }, { var: 'EI_WOOD_PER_KWH' }],
      },

      cf_gas_heating: {
        '*': [{ var: 'gas_heating_kwh' }, { var: 'EI_GAS_PER_KWH' }],
      },
      cf_gas_cooking: {
        '*': [{ var: 'gas_cooking_kwh' }, { var: 'EI_GAS_PER_KWH' }],
      },
      cf_gas_water_heating: {
        '*': [{ var: 'gas_water_heating_kwh' }, { var: 'EI_GAS_PER_KWH' }],
      },

      cf_fuel_heating: {
        '*': [{ var: 'fuel_heating_kwh' }, { var: 'EI_FUEL_OIL_PER_KWH' }],
      },
      cf_fuel_cooking: {
        '*': [{ var: 'fuel_cooking_kwh' }, { var: 'EI_FUEL_OIL_PER_KWH' }],
      },
      cf_fuel_water_heating: {
        '*': [
          { var: 'fuel_water_heating_kwh' },
          { var: 'EI_FUEL_OIL_PER_KWH' },
        ],
      },

      cf_elec_heating: {
        '*': [
          { var: 'elec_heating_kwh' },
          {
            var: {
              cat: ['EI_ELEC_PER_KWH.', { var: 'electricity_provider' }],
            },
          },
        ],
      },
      cf_elec_cooking: {
        '*': [
          { var: 'elec_cooking_kwh' },
          {
            var: {
              cat: ['EI_ELEC_PER_KWH.', { var: 'electricity_provider' }],
            },
          },
        ],
      },
      cf_elec_water_heating: {
        '*': [
          { var: 'elec_water_heating_kwh' },
          {
            var: {
              cat: ['EI_ELEC_PER_KWH.', { var: 'electricity_provider' }],
            },
          },
        ],
      },
      cf_elec_lightning: {
        '*': [
          { var: 'elec_lightning_kwh' },
          {
            var: {
              cat: ['EI_ELEC_PER_KWH.', { var: 'electricity_provider' }],
            },
          },
        ],
      },

      // food
      cf_meat_and_fish: {
        '*': [
          { var: 'meat_and_fish_conso_per_day' },
          { var: 'MEAT_AND_FISH_KG_PER_CONSO' },
          { var: 'EI_MEAT_AND_FISH' },
          { var: 'DAYS_PER_YEAR' },
        ],
      },
      cf_eggs_and_dairies: {
        '*': [
          { var: 'eggs_and_dairies_conso_per_day' },
          { var: 'EGGS_AND_DAIRIES_KG_PER_CONSO' },
          { var: 'EI_EGGS_AND_DAIRIES' },
          { var: 'DAYS_PER_YEAR' },
        ],
      },
      cf_transformed_products: {
        '*': [
          { var: 'transformed_products_conso_per_week' },
          { var: 'TRANSFORMED_PRODUCTS_KG_PER_CONSO' },
          { var: 'EI_TRANSFORMED_PRODUCTS' },
          { var: 'WEEKS_PER_YEAR' },
        ],
      },
      cf_local_fruits_and_vegetables: {
        '*': [
          {
            max: [
              {
                '*': [
                  {
                    '+': [
                      { var: 'FRUITS_AND_VEGETABLES_AVG_CONSO_KG_PER_DAY' },
                      {
                        '*': [
                          {
                            '-': [
                              { var: 'MEAT_AND_FISH_AVG_CONSO_KG_PER_DAY' },
                              {
                                '*': [
                                  { var: 'meat_and_fish_conso_per_day' },
                                  { var: 'MEAT_AND_FISH_KG_PER_CONSO' },
                                ],
                              },
                            ],
                          },
                          {
                            var:
                              'FRUITS_AND_VEGETABLES_FROM_MEAT_AND_FISH_SUBSTITION_PERCENTAGE',
                          },
                        ],
                      },
                      {
                        '*': [
                          {
                            '-': [
                              { var: 'EGGS_AND_DAIRIES_AVG_CONSO_KG_PER_DAY' },
                              {
                                '*': [
                                  { var: 'eggs_and_dairies_conso_per_day' },
                                  { var: 'EGGS_AND_DAIRIES_KG_PER_CONSO' },
                                ],
                              },
                            ],
                          },
                          {
                            var:
                              'FRUITS_AND_VEGETABLES_FROM_EGGS_AND_DAIRIES_SUBSTITION_PERCENTAGE',
                          },
                        ],
                      },
                      {
                        '*': [
                          {
                            '-': [
                              {
                                var:
                                  'TRANSFORMED_PRODUCTS_AVG_CONSO_KG_PER_DAY',
                              },
                              {
                                '*': [
                                  {
                                    '/': [
                                      {
                                        var:
                                          'transformed_products_conso_per_week',
                                      },
                                      { var: 'DAYS_PER_WEEK' },
                                    ],
                                  },
                                  { var: 'TRANSFORMED_PRODUCTS_KG_PER_CONSO' },
                                ],
                              },
                            ],
                          },
                          {
                            var:
                              'FRUITS_AND_VEGETABLES_FROM_TRANSFORMED_PRODUCTS_SUBSTITION_PERCENTAGE',
                          },
                        ],
                      },
                    ],
                  },
                  { var: 'fruits_and_vegetable_percentage_local' },
                  { var: 'EI_LOCAL_FRUITS_AND_VEGETABLES' },
                ],
              },
              {
                '*': [
                  { var: 'FRUITS_AND_VEGETABLES_MIN_CONSO_KG_PER_DAY' },
                  { var: 'fruits_and_vegetable_percentage_local' },
                ],
              },
            ],
          },
          { var: 'DAYS_PER_YEAR' },
        ],
      },
      cf_imported_fruits_and_vegetables: {
        '*': [
          {
            max: [
              {
                '*': [
                  {
                    '+': [
                      { var: 'FRUITS_AND_VEGETABLES_AVG_CONSO_KG_PER_DAY' },
                      {
                        '*': [
                          {
                            '-': [
                              { var: 'MEAT_AND_FISH_AVG_CONSO_KG_PER_DAY' },
                              {
                                '*': [
                                  { var: 'meat_and_fish_conso_per_day' },
                                  { var: 'MEAT_AND_FISH_KG_PER_CONSO' },
                                ],
                              },
                            ],
                          },
                          {
                            var:
                              'FRUITS_AND_VEGETABLES_FROM_MEAT_AND_FISH_SUBSTITION_PERCENTAGE',
                          },
                        ],
                      },
                      {
                        '*': [
                          {
                            '-': [
                              { var: 'EGGS_AND_DAIRIES_AVG_CONSO_KG_PER_DAY' },
                              {
                                '*': [
                                  { var: 'eggs_and_dairies_conso_per_day' },
                                  { var: 'EGGS_AND_DAIRIES_KG_PER_CONSO' },
                                ],
                              },
                            ],
                          },
                          {
                            var:
                              'FRUITS_AND_VEGETABLES_FROM_EGGS_AND_DAIRIES_SUBSTITION_PERCENTAGE',
                          },
                        ],
                      },
                      {
                        '*': [
                          {
                            '-': [
                              {
                                var:
                                  'TRANSFORMED_PRODUCTS_AVG_CONSO_KG_PER_DAY',
                              },
                              {
                                '*': [
                                  {
                                    '/': [
                                      {
                                        var:
                                          'transformed_products_conso_per_week',
                                      },
                                      { var: 'DAYS_PER_WEEK' },
                                    ],
                                  },
                                  { var: 'TRANSFORMED_PRODUCTS_KG_PER_CONSO' },
                                ],
                              },
                            ],
                          },
                          {
                            var:
                              'FRUITS_AND_VEGETABLES_FROM_TRANSFORMED_PRODUCTS_SUBSTITION_PERCENTAGE',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    '-': [1, { var: 'fruits_and_vegetable_percentage_local' }],
                  },
                  { var: 'EI_IMPORTED_FRUITS_AND_VEGETABLES' },
                ],
              },
              {
                '*': [
                  { var: 'FRUITS_AND_VEGETABLES_MIN_CONSO_KG_PER_DAY' },
                  {
                    '-': [1, { var: 'fruits_and_vegetable_percentage_local' }],
                  },
                ],
              },
            ],
          },
          { var: 'DAYS_PER_YEAR' },
        ],
      },
      cf_starches_and_groceries: {
        '*': [
          {
            max: [
              {
                '*': [
                  {
                    '+': [
                      { var: 'STARCHES_AND_GROCERIES_AVG_CONSO_KG_PER_DAY' },
                      {
                        '*': [
                          {
                            '-': [
                              { var: 'MEAT_AND_FISH_AVG_CONSO_KG_PER_DAY' },
                              {
                                '*': [
                                  { var: 'meat_and_fish_conso_per_day' },
                                  { var: 'MEAT_AND_FISH_KG_PER_CONSO' },
                                ],
                              },
                            ],
                          },
                          {
                            var:
                              'STARCHES_AND_GROCERIES_FROM_MEAT_AND_FISH_SUBSTITION_PERCENTAGE',
                          },
                        ],
                      },
                      {
                        '*': [
                          {
                            '-': [
                              { var: 'EGGS_AND_DAIRIES_AVG_CONSO_KG_PER_DAY' },
                              {
                                '*': [
                                  { var: 'eggs_and_dairies_conso_per_day' },
                                  { var: 'EGGS_AND_DAIRIES_KG_PER_CONSO' },
                                ],
                              },
                            ],
                          },
                          {
                            var:
                              'STARCHES_AND_GROCERIES_FROM_EGGS_AND_DAIRIES_SUBSTITION_PERCENTAGE',
                          },
                        ],
                      },
                      {
                        '*': [
                          {
                            '-': [
                              {
                                var:
                                  'TRANSFORMED_PRODUCTS_AVG_CONSO_KG_PER_DAY',
                              },
                              {
                                '*': [
                                  {
                                    '/': [
                                      {
                                        var:
                                          'transformed_products_conso_per_week',
                                      },
                                      { var: 'DAYS_PER_WEEK' },
                                    ],
                                  },
                                  { var: 'TRANSFORMED_PRODUCTS_KG_PER_CONSO' },
                                ],
                              },
                            ],
                          },
                          {
                            var:
                              'STARCHES_AND_GROCERIES_FROM_TRANSFORMED_PRODUCTS_SUBSTITION_PERCENTAGE',
                          },
                        ],
                      },
                    ],
                  },
                  { var: 'EI_STARCHES_AND_GROCERIES' },
                ],
              },
              { var: 'STARCHES_AND_GROCERIES_MIN_CONSO_KG_PER_DAY' },
            ],
          },
          { var: 'DAYS_PER_YEAR' },
        ],
      },
      cf_alcohol: {
        '*': [
          { var: 'alcohol_conso_glass_per_day' },
          { var: 'ALCOHOL_LITER_PER_GLASS' },
          { var: 'EI_ALCOHOL' },
          { var: 'DAYS_PER_YEAR' },
        ],
      },
      cf_hot_drinks: {
        '*': [
          { var: 'hot_drinks_conso_glass_per_day' },
          { var: 'HOT_DRINKS_LITER_PER_GLASS' },
          { var: 'EI_HOT_DRINKS' },
          { var: 'DAYS_PER_YEAR' },
        ],
      },
      cf_juices_and_sodas: {
        '*': [
          { var: 'juices_and_sodas_conso_glass_per_day' },
          { var: 'JUICES_AND_SODAS_LITER_PER_GLASS' },
          { var: 'EI_JUICES_AND_SODAS' },
          { var: 'DAYS_PER_YEAR' },
        ],
      },
      // public Services
      cf_public_services: { var: 'CF_PUBLIC_SERVICES' },

      // others
      cf_clothes: {
        '*': [{ var: 'clothes_new_items' }, { var: 'EI_CLOTHES_PER_ITEM' }],
      },
      cf_small_devices_cradle_to_crate: {
        '*': [{ var: 'number_small_devices' }, { var: 'EI_SMALL_DEVICES' }],
      },
      cf_big_devices_cradle_to_crate: {
        '*': [{ var: 'number_big_devices' }, { var: 'EI_BIG_DEVICES' }],
      },
      cf_internet_others: { var: 'CF_INTERNET_OTHERS' },
      cf_internet_streaming: {
        '*': [
          { var: 'internet_streaming_hours_per_week' },
          { var: 'WEEKS_PER_YEAR' },
          { var: 'EI_INTERNET_STREAMING' },
        ],
      },
      cf_services_electricity: { var: 'CF_SERVICES_ELECTRICITY' },
      cf_services_gas: { var: 'CF_SERVICES_GAS' },
      cf_services_without_energy: {
        var: 'CF_GOODS_AND_SERVICES_WITHOUT_ENERGY',
      },
      cf_activities_electricity: {
        '*': [
          { var: 'activities_per_month' },
          { var: 'MONTHS_PER_YEAR' },
          { var: 'EI_ACTIVITIES_ELEC' },
        ],
      },
      cf_activities_gas: {
        '*': [
          { var: 'activities_per_month' },
          { var: 'MONTHS_PER_YEAR' },
          { var: 'EI_ACTIVITIES_GAS' },
        ],
      },
      cf_activities_without_energy: {
        '*': [
          { var: 'activities_per_month' },
          { var: 'EI_ACTIVITIES_WITHOUT_ENERGY' },
        ],
      },
    },
    globalCarbonVariables: {
      // Global
      WEEKS_PER_YEAR: 52,
      DAYS_PER_YEAR: 365,
      DAYS_PER_WEEK: 7,
      MONTHS_PER_YEAR: 12,

      EI_URBAN_BUS: 0.15,
      MEAN_SPEED_URBAN_BUS: 12,
      EI_COACH: 0.04,
      MEAN_SPEED_COACH: 80,

      // Food
      EI_MEAT_AND_FISH: 12.89,
      MEAT_AND_FISH_KG_PER_CONSO: 0.15,
      MEAT_AND_FISH_AVG_CONSO_KG_PER_DAY: 0.13,
      EI_EGGS_AND_DAIRIES: 3.57,
      EGGS_AND_DAIRIES_KG_PER_CONSO: 0.11,
      EGGS_AND_DAIRIES_AVG_CONSO_KG_PER_DAY: 0.22,
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
      WATER_CONSO_LITER_PER_DAY_PER_PERSON: 148,
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
      },
      MOTOR_AGING_FACTOR: {
        FUEL: {
          TEN_YEARS_OR_YOUNGER: 0.943292608,
          BEETWEEN_TEN_AND_FIFTEEN_YEARS: 1.101343381,
          FIFTEEN_YEARS_OR_OLDER: 1.164876711,
        },
      },
      CF_PUBLIC_SERVICES: 1000,
    },
    actions: {
      1: {
        name: 'SE DEPLACER A PIEDS OU A VÉLO',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'TRANSPORT',
        cost: 4,
        groupId: 1,
      },
      2: {
        name: 'FAIRE PLUS DE COVOITURAGE',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'TRANSPORT',
        cost: 4,
        groupId: 1,
        operations: [
          {
            variable: 'km_per_day_car_commute',
            operation: { '*': [{ var: 'km_per_day_car_commute' }, 0.5] },
          },
        ],
      },
      3: {
        name: 'FAIRE PLUS DE TÉLÉTRAVAIL',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'TRANSPORT',
        cost: 3,
        groupId: 2,
      },
      4: {
        name: "FAIRE DE L'ECO-CONDUITE",
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'TRANSPORT',
        cost: 4,
        groupId: 3,
      },
      5: {
        name: "ARRÊTER DE PRENDRE L'AVION",
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'TRANSPORT',
        cost: 5,
        groupId: 4,
      },
      6: {
        name: 'SE DEPLACER A PIEDS OU A VÉLO',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'TRANSPORT',
        cost: 4,
        groupId: 5,
      },
      7: {
        name: 'BAISSER LE CHAUFFAGE',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'LOGEMENT',
        cost: 2,
        groupId: 5,
      },
      8: {
        name: "CONSOMMER MOINS D'EAU CHAUDE SANITAIRE",
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'LOGEMENT',
        cost: 2,
        groupId: 6,
      },
      9: {
        name: "ÉCONOMISER DE L'ÉLECTRICITÉ",
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'LOGEMENT',
        cost: 3,
        groupId: 6,
      },
      10: {
        name: 'SE FOURNIR EN ÉLECTRICITÉ ALTERNATIVE',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'LOGEMENT',
        cost: 1,
        groupId: 7,
      },
      11: {
        name: 'MUTUALISER SON LOGEMENT',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'LOGEMENT',
        cost: 4,
        groupId: 7,
      },
    },
    actionsGroups: {
      1: {
        name: 'Lot 1',
      },
      2: {
        name: 'Lot 2',
      },
      3: {
        name: 'Lot 3',
      },
      4: {
        name: 'Lot 4',
      },
      5: {
        name: 'Lot 5',
      },
      6: {
        name: 'Lot 6',
      },
      7: {
        name: 'Lot 7',
      },
    },
  },
  participants: {
    byId: {
      1: {
        surveyVariables: {
          hours_urban_bus_per_week: 5,
          km_car_commute_per_day: 25,
        },
      },
      2: {},
    },
    allIds: [1, 2],
  },
  rounds: {
    byYear: {
      2020: {
        participants: {
          1: {
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
          },
        },
      },
      2023: {
        participants: {
          1: {
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
          },
        },
      },
    },
    allYears: [2020],
  },
};
