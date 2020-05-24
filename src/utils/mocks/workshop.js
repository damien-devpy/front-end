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
              name: 'others',
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
              name: 'others',
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
    },
    variableFormulas: {
      // ====================================================================================
      // ============================ TRANSPORT ============================
      // ====================================================================================

      cf_plane: {
        '*': [{
          var: 'kmPlane'
        }, {
          var: 'EI_PLANE'
        }]
      },

      //==============================================================
      cf_car_commute: {
        '/': [{
          '*': [{
            var: 'kmPerYearCarCommute'
          },
          {
            var: {
              cat: ['EI_CAR.', {
                var: 'categoryCarCommute'
              }, '.', {
                  var: 'motorTypeCarCommute'
                }]
            }
          },
          {
            var: {
              cat: ['MOTOR_AGING_FACTOR.', {
                var: 'motorTypeCarCommute'
              }, '.', {
                  var: 'ageCategoryCarCommute'
                }]
            }
          },
          {
            var: 'coefficientEnergyEfficientDriving'
          },
          ],
        },
        {
          var: 'passengersPerCarCommute'
        },
        ],
      },

      cf_car_travel: {
        '/': [{
          '*': [{
            var: 'kmPerYearCarTravel'
          },
          {
            var: {
              cat: ['EI_CAR.', {
                var: 'categoryCarTravel'
              }, '.', {
                  var: 'motorTypeCarTravel'
                }]
            }
          },
          {
            var: {
              cat: ['MOTOR_AGING_FACTOR.', {
                var: 'motorTypeCarTravel'
              }, '.', {
                  var: 'ageCategoryCarTravel'
                }]
            }
          },
          {
            var: 'coefficientEnergyEfficientDriving'
          },
          ],
        },
        {
          var: 'passengersPerCarTravel'
        },
        ],
      },

      //==============================================================

      cf_urban_bus: {
        '*': [{
          var: 'distanceUrbanBusPerYear'
        }, {
          var: 'EI_URBAN_BUS'
        }]
      },

      cf_coach_commute: {
        '*': [{
          var: 'distanceCoachCommitPerYear'
        }, {
          var: 'EI_COACH'
        }]
      },

      cf_coach_travel: {
        '*': [{
          var: 'kmCoachTravel'
        }, {
          var: 'EI_COACH'
        }]
      },

      //==============================================================

      cf_urban_train: {
        '*': [{
          var: 'distanceUrbanTrainPerYear'
        }, {
          var: 'EI_URBAN_TRAIN'
        }]
      },

      cf_country_train: {
        '*': [{
          var: 'kmCountryTrain'
        }, {
          var: 'EI_COUNTRY_TRAIN'
        }]
      },

      // ====================================================================================
      // ============================ HOUSING ============================
      // ====================================================================================

      // housing
      cf_small_appliances: {
        '/': [{
          '*': [{
            var: 'numberSmallAppliances'
          }, {
            var: 'EI_SMALL_APPLIANCE'
          }]
        },
        {
          var: 'residentsPerHousing'
        },
        ],
      },
      cf_big_appliances: {
        '/': [{
          '*': [{
            var: 'numberBigAppliances'
          }, {
            var: 'EI_BIG_APPLIANCE'
          }]
        },
        {
          var: 'residentsPerHousing'
        },
        ],
      },
      cf_water_heater: {
        '/': [{
          var: 'CF_WATER_HEATER'
        }, {
          var: 'residentsPerHousing'
        }]
      },
      //==============================================================

      cf_furnitures: {
        '/': [{
          '*': [{
            var: 'housingSurfaceArea'
          },
          {
            var: 'EI_FURNITURES_PER_SQUARE_METER'
          }
          ],
        },
        {
          var: 'residentsPerHousing'
        },
        ],
      },
      cf_furnitures_min: {
        var: 'CF_FURNITURES_MIN_ONE_RESIDENT'
      },

      //==============================================================

      cf_house_construction: {
        '/': [{
          '*': [{
            var: 'houseSurfaceArea'
          },
          {
            var: 'EI_CONSTRUCTION_HOUSE_PER_SQUARE_METER'
          }
          ],
        },
        {
          var: 'residentsPerHousing'
        }
        ],
      },
      cf_flat_construction: {
        '/': [{
          '*': [{
            var: 'flatSurfaceArea'
          },
          {
            var: 'EI_CONSTRUCTION_FLAT_PER_SQUARE_METER'
          }
          ],
        },
        {
          var: 'residentsPerHousing'
        }
        ],
      },

      //==============================================================
      cf_maintenance: {
        '/': [{
          '*': [{
            var: 'housingSurfaceArea'
          },
          {
            var: 'EI_MAINTENANCE_PER_SQUARE_METER'
          }
          ],
        },
        {
          var: 'residentsPerHousing'
        }
        ],
      },

      //==============================================================

      cf_water: {
        '*': [{
          var: 'EI_WATER_PER_LITER'
        },
        {
          var: 'WATER_CONSO_LITER_PER_YEAR_PER_PERSON'
        }
        ]
      },

      //==============================================================

      cf_wood_heating: {
        '*': [{
          var: 'woodHeatingKwh'
        },
        {
          var: 'EI_WOOD_PER_KWH'
        },
        ],
      },

      cf_wood_cooking: {
        '*': [{
          var: 'woodCookingKwh'
        },
        {
          var: 'EI_WOOD_PER_KWH'
        },
        ],
      },

      cf_wood_water_heating: {
        '*': [{
          var: 'woodWaterHeatingKwh'
        },
        {
          var: 'EI_WOOD_PER_KWH'
        },
        ],
      },

      cf_gas_heating: {
        '*': [{
          var: 'gasHeatingKwh'
        },
        {
          var: 'EI_GAS_PER_KWH'
        },
        ],
      },

      cf_gas_cooking: {
        '*': [{
          var: 'gasCookingKwh'
        },
        {
          var: 'EI_GAS_PER_KWH'
        },
        ],
      },

      cf_gas_water_heating: {
        '*': [{
          var: 'gasWaterHeatingKwh'
        },
        {
          var: 'EI_GAS_PER_KWH'
        },
        ],
      },

      cf_fuel_heating: {
        '*': [{
          var: 'fuelHeatingKwh'
        },
        {
          var: 'EI_FUEL_OIL_PER_KWH'
        },
        ],
      },

      cf_fuel_cooking: {
        '*': [{
          var: 'fuelCookingKwh'
        },
        {
          var: 'EI_FUEL_OIL_PER_KWH'
        },
        ],
      },

      cf_fuel_water_heating: {
        '*': [{
          var: 'fuelWaterHeatingKwh'
        },
        {
          var: 'EI_FUEL_OIL_PER_KWH'
        },
        ],
      },

      cf_elec_heating: {
        '*': [{
          var: 'elecHeatingKwh'
        },
        {
          var: {
            cat: ['EI_ELEC_PER_KWH.', {
              var: 'electricityProvider'
            }],
          },
        },
        ],
      },

      cf_elec_cooking: {
        '*': [{
          var: 'elecCookingKwh'
        },
        {
          var: {
            cat: ['EI_ELEC_PER_KWH.', {
              var: 'electricityProvider'
            }],
          },
        },
        ],
      },

      cf_elec_water_heating: {
        '*': [{
          var: 'elecWaterHeatingKwh'
        },
        {
          var: {
            cat: ['EI_ELEC_PER_KWH.', {
              var: 'electricityProvider'
            }],
          },
        },
        ],
      },

      cf_elec_lightning: {
        '*': [{
          var: 'elecLightningKwh'
        },
        {
          var: {
            cat: ['EI_ELEC_PER_KWH.', {
              var: 'electricityProvider'
            }],
          },
        },
        ],
      },

      // ====================================================================================
      // ============================ FOOD ============================
      // ====================================================================================

      cf_red_meat: {
        '*': [{
          var: 'redMeatKgPerYear'
        }, {
          var: 'EI_RED_MEAT'
        }]
      },
      cf_white_meat: {
        '*': [{
          var: 'whiteMeatKgPerYear'
        }, {
          var: 'EI_WHITE_MEAT'
        }]
      },
      cf_fish: {
        '*': [{
          var: 'fishKgPerYear'
        }, {
          var: 'EI_FISH'
        }]
      },

      // cf_meat_and_fish: {
      //   '+': [{
      //     '*': [{
      //       var: 'redMeatKgPerYear'
      //     }, {
      //       var: 'EI_RED_MEAT'
      //     }]
      //   },
      //   {
      //     '*': [{
      //       var: 'whiteMeatKgPerYear'
      //     }, {
      //       var: 'EI_WHITE_MEAT'
      //     }]
      //   },
      //   {
      //     '*': [{
      //       var: 'fishKgPerYear'
      //     }, {
      //       var: 'EI_FISH'
      //     }]
      //   }
      //   ]
      // },

      //==============================================================

      // cf_eggs_and_dairies: {
      //   '*': [
      //     { var: 'eggsAndDairiesConsoPerDay' },
      //     { var: 'EGGS_AND_DAIRIES_KG_PER_CONSO' },
      //     { var: 'EI_EGGS_AND_DAIRIES' },
      //     { var: 'DAYS_PER_YEAR' }],
      // },

      cf_eggs: {
        '*': [{
          var: 'eggsKgPerYear'
        }, {
          var: 'EI_EGGS'
        }]
      },

      cf_dairies: {
        '*': [{
          var: 'dairiesKgPerYear'
        }, {
          var: 'EI_DAIRIES'
        }]
      },
      //==============================================================

      // cf_eggs_and_dairies: {
      //   '+': [{
      //     '*': [{
      //       var: 'eggsKgPerYear'
      //     }, {
      //       var: 'EI_EGGS'
      //     }]
      //   },
      //   {
      //     '*': [{
      //       var: 'dairiesKgPerYear'
      //     }, {
      //       var: 'EI_DAIRIES'
      //     }]
      //   },
      //   ]
      // },

      cf_transformed_products: {
        '*': [{
          var: 'transformedProductsKgPerYear'
        }, {
          var: 'EI_TRANSFORMED_PRODUCTS'
        }]
      },

      cf_starches_and_groceries: {
        '*': [{
          var: 'starchesAndGroceriesKgPerYear'
        }, {
          var: 'EI_STARCHES_AND_GROCERIES'
        }]
      },
      //==============================================================

      // cf_local_fruits_and_vegetables: {
      //   '*': [
      //     {
      //       max: [
      //         {
      //           '*': [
      //             {
      //               '+': [
      //                 { var: 'FRUITS_AND_VEGETABLES_AVG_CONSO_KG_PER_DAY' },
      //                 {
      //                   '*': [
      //                     {
      //                       '-': [
      //                         { var: 'MEAT_AND_FISH_AVG_CONSO_KG_PER_DAY' },
      //                         {
      //                           '*': [
      //                             { var: 'meatAndFishConsoPerDay' },
      //                             { var: 'MEAT_AND_FISH_KG_PER_CONSO' },
      //                           ],
      //                         },
      //                       ],
      //                     },
      //                     { var: 'FRUITS_AND_VEGETABLES_FROM_MEAT_AND_FISH_SUBSTITION_PERCENTAGE' },
      //                   ],
      //                 },
      //                 {
      //                   '*': [
      //                     {
      //                       '-': [
      //                         { var: 'EGGS_AND_DAIRIES_AVG_CONSO_KG_PER_DAY' },
      //                         {
      //                           '*': [
      //                             { var: 'eggsAndDairiesConsoPerDay' },
      //                             { var: 'EGGS_AND_DAIRIES_KG_PER_CONSO' },
      //                           ],
      //                         },
      //                       ],
      //                     },
      //                     { var: 'FRUITS_AND_VEGETABLES_FROM_EGGS_AND_DAIRIES_SUBSTITION_PERCENTAGE' },
      //                   ],
      //                 },
      //                 {
      //                   '*': [
      //                     {
      //                       '-': [
      //                         { var: 'TRANSFORMED_PRODUCTS_AVG_CONSO_KG_PER_DAY' },
      //                         {
      //                           '*': [
      //                             { '/': [{ var: 'transformedProductsConsoPerWeek' }, { var: 'DAYS_PER_WEEK' }] },
      //                             { var: 'TRANSFORMED_PRODUCTS_KG_PER_CONSO' },
      //                           ],
      //                         }],
      //                     },
      //                     { var: 'FRUITS_AND_VEGETABLES_FROM_TRANSFORMED_PRODUCTS_SUBSTITION_PERCENTAGE' },
      //                   ],
      //                 },
      //               ],
      //             },
      //             { var: 'fruitsAndVegetablePercentageLocal' },
      //             { var: 'EI_LOCAL_FRUITS_AND_VEGETABLES' },
      //           ],
      //         },
      //         {
      //           '*': [
      //             { var: 'FRUITS_AND_VEGETABLES_MIN_CONSO_KG_PER_DAY' },
      //             { var: 'fruitsAndVegetablePercentageLocal' },
      //           ],
      //         },
      //       ],
      //     },
      //     { var: 'DAYS_PER_YEAR' },
      //   ],
      // },
      // cf_local_fruits_and_vegetables: {
      //   // peut-être voudra-t-on changer la part de fruits importés
      //   '*':[
      //     {var : 'fruitsAndVegetablesKgPerYear'},
      //     { '+' : [
      //       {'*' : [{var : 'EI_LOCAL_FRUITS_AND_VEGETABLES'}, {var : 'fruitsAndVegetablePercentageLocal'}]},
      //       {'*' : [{var : 'EI_IMPORTED_FRUITS_AND_VEGETABLES'}, {'-' : [1, {var :'fruitsAndVegetablePercentageLocal'}]}]}
      //     ]}]
      // },  

      // cf_local_fruits_and_vegetables: {
      //   '*': [{
      //     max: [{
      //       '*': [{
      //         var: 'EI_LOCAL_FRUITS_AND_VEGETABLES'
      //       }, {
      //         var: 'fruitsAndVegetablesKgPerYear'
      //       }]
      //     },
      //     {
      //       var: 'FRUITS_AND_VEGETABLES_MIN_CONSO_KG_PER_YEAR'
      //     }
      //     ]
      //   },
      //   {
      //     var: 'fruitsAndVegetablePercentageLocal'
      //   }
      //   ]
      // },

      cf_local_fruits_and_vegetables: {
        '*': [{
          var: 'EI_LOCAL_FRUITS_AND_VEGETABLES'
        }, {
          var: 'fruitsAndVegetablesKgPerYear'
        }, {
          var: 'fruitsAndVegetablePercentageLocal'
        }]
      },

      cf_imported_fruits_and_vegetables: {
        '*': [{
          var: 'EI_IMPORTED_FRUITS_AND_VEGETABLES'
        }, {
          var: 'fruitsAndVegetablesKgPerYear'
        }, {
          '-': [1, {
            var: 'fruitsAndVegetablePercentageLocal'
          }]
        }]
      },

      // cf_imported_fruits_and_vegetables: {
      //   '*': [{
      //     max: [{
      //       '*': [{
      //         var: 'EI_IMPORTED_FRUITS_AND_VEGETABLES'
      //       }, {
      //         var: 'fruitsAndVegetablesKgPerYear'
      //       }]
      //     },
      //     {
      //       var: 'FRUITS_AND_VEGETABLES_MIN_CONSO_KG_PER_YEAR'
      //     }
      //     ]
      //   },
      //   {
      //     '-': [1, {
      //       var: 'fruitsAndVegetablePercentageLocal'
      //     }]
      //   }
      //   ]
      // },

      // cf_imported_fruits_and_vegetables: {
      //   '*': [
      //     {
      //       max: [
      //         {
      //           '*': [
      //             {
      //               '+': [
      //                 { var: 'FRUITS_AND_VEGETABLES_AVG_CONSO_KG_PER_DAY' },
      //                 {
      //                   '*': [
      //                     {
      //                       '-': [
      //                         { var: 'MEAT_AND_FISH_AVG_CONSO_KG_PER_DAY' },
      //                         {
      //                           '*': [
      //                             { var: 'meatAndFishConsoPerDay' },
      //                             { var: 'MEAT_AND_FISH_KG_PER_CONSO' },
      //                           ],
      //                         },
      //                       ],
      //                     },
      //                     { var: 'FRUITS_AND_VEGETABLES_FROM_MEAT_AND_FISH_SUBSTITION_PERCENTAGE' },
      //                   ],
      //                 },
      //                 {
      //                   '*': [
      //                     {
      //                       '-': [
      //                         { var: 'EGGS_AND_DAIRIES_AVG_CONSO_KG_PER_DAY' },
      //                         {
      //                           '*': [
      //                             { var: 'eggsAndDairiesConsoPerDay' },
      //                             { var: 'EGGS_AND_DAIRIES_KG_PER_CONSO' },
      //                           ],
      //                         },
      //                       ],
      //                     },
      //                     { var: 'FRUITS_AND_VEGETABLES_FROM_EGGS_AND_DAIRIES_SUBSTITION_PERCENTAGE' },
      //                   ],
      //                 },
      //                 {
      //                   '*': [
      //                     {
      //                       '-': [
      //                         { var: 'TRANSFORMED_PRODUCTS_AVG_CONSO_KG_PER_DAY' },
      //                         {
      //                           '*': [
      //                             { '/': [{ var: 'transformedProductsConsoPerWeek' }, { var: 'DAYS_PER_WEEK' }] },
      //                             { var: 'TRANSFORMED_PRODUCTS_KG_PER_CONSO' },
      //                           ],
      //                         }],
      //                     },
      //                     { var: 'FRUITS_AND_VEGETABLES_FROM_TRANSFORMED_PRODUCTS_SUBSTITION_PERCENTAGE' },
      //                   ],
      //                 },
      //               ],
      //             },
      //             { '-': [1, { var: 'fruitsAndVegetablePercentageLocal' }] },
      //             { var: 'EI_IMPORTED_FRUITS_AND_VEGETABLES' },
      //           ],
      //         },
      //         {
      //           '*': [
      //             { var: 'FRUITS_AND_VEGETABLES_MIN_CONSO_KG_PER_DAY' },
      //             { '-': [1, { var: 'fruitsAndVegetablePercentageLocal' }] },
      //           ],
      //         },
      //       ],
      //     },
      //     { var: 'DAYS_PER_YEAR' },
      //   ],
      // },

      // cf_starches_and_groceries: {
      //   '*': [
      //     {
      //       max: [
      //         {
      //           '*': [
      //             {
      //               '+': [
      //                 { var: 'STARCHES_AND_GROCERIES_AVG_CONSO_KG_PER_DAY' },
      //                 {
      //                   '*': [
      //                     {
      //                       '-': [
      //                         { var: 'MEAT_AND_FISH_AVG_CONSO_KG_PER_DAY' },
      //                         {
      //                           '*': [
      //                             { var: 'meatAndFishConsoPerDay' },
      //                             { var: 'MEAT_AND_FISH_KG_PER_CONSO' },
      //                           ],
      //                         },
      //                       ],
      //                     },
      //                     { var: 'STARCHES_AND_GROCERIES_FROM_MEAT_AND_FISH_SUBSTITION_PERCENTAGE' },
      //                   ],
      //                 },
      //                 {
      //                   '*': [
      //                     {
      //                       '-': [
      //                         { var: 'EGGS_AND_DAIRIES_AVG_CONSO_KG_PER_DAY' },
      //                         {
      //                           '*': [
      //                             { var: 'eggsAndDairiesConsoPerDay' },
      //                             { var: 'EGGS_AND_DAIRIES_KG_PER_CONSO' },
      //                           ],
      //                         },
      //                       ],
      //                     },
      //                     { var: 'STARCHES_AND_GROCERIES_FROM_EGGS_AND_DAIRIES_SUBSTITION_PERCENTAGE' },
      //                   ],
      //                 },
      //                 {
      //                   '*': [
      //                     {
      //                       '-': [
      //                         { var: 'TRANSFORMED_PRODUCTS_AVG_CONSO_KG_PER_DAY' },
      //                         {
      //                           '*': [
      //                             { '/': [{ var: 'transformedProductsConsoPerWeek' }, { var: 'DAYS_PER_WEEK' }] },
      //                             { var: 'TRANSFORMED_PRODUCTS_KG_PER_CONSO' },
      //                           ],
      //                         }],
      //                     },
      //                     { var: 'STARCHES_AND_GROCERIES_FROM_TRANSFORMED_PRODUCTS_SUBSTITION_PERCENTAGE' },
      //                   ],
      //                 },
      //               ],
      //             },
      //             { var: 'EI_STARCHES_AND_GROCERIES' },
      //           ],
      //         },
      //         { var: 'STARCHES_AND_GROCERIES_MIN_CONSO_KG_PER_DAY' },
      //       ],
      //     },
      //     { var: 'DAYS_PER_YEAR' },
      //   ],
      // },


      //==============================================================

      cf_alcohol: {
        '*': [{
          var: 'alcoholConsoKgPerYear'
        }, {
          var: 'EI_ALCOHOL'
        }]
      },
      cf_hot_drinks: {
        '*': [{
          var: 'hotDrinksConsoKgPerYear'
        }, {
          var: 'EI_HOT_DRINKS'
        }]
      },
      cf_juices_and_sodas: {
        '*': [{
          var: 'juicesAndSodasConsoKgPerYear'
        }, {
          var: 'EI_JUICES_AND_SODAS'
        }]
      },


      //==============================================================

      cf_small_devices_cradle_to_crate: {
        '*': [{
          var: 'numberSmallDevices'
        },
        {
          var: 'EI_SMALL_DEVICES'
        },
        ],
      },
      cf_big_devices_cradle_to_crate: {
        '*': [{
          var: 'numberBigDevices'
        },
        {
          var: 'EI_BIG_DEVICES'
        },
        ],
      },

      //==============================================================


      cf_internet_others: {
        var: 'CF_INTERNET_OTHERS'
      },
      cf_internet_streaming: {
        '*': [{
          var: 'internetStreamingHoursPerYear'
        },
        {
          var: 'EI_INTERNET_STREAMING'
        }
        ],
      },

      //==============================================================

      // others
      cf_clothes: {
        '*': [{
          var: 'clothesNewItems'
        },
        {
          var: 'EI_CLOTHES_PER_ITEM'
        },
        ],
      },

      //==============================================================

      cf_services_electricity: {
        var: 'CF_SERVICES_ELECTRICITY'
      },
      cf_services_gas: {
        var: 'CF_SERVICES_GAS'
      },
      cf_services_without_energy: {
        var: 'CF_GOODS_AND_SERVICES_WITHOUT_ENERGY'
      },
      cf_activities_electricity: {
        '*': [{
          var: 'activitiesPerYear'
        },
        {
          var: 'EI_ACTIVITIES_ELEC'
        },

        ],
      },
      cf_activities_gas: {
        '*': [{
          var: 'activitiesPerYear'
        },
        {
          var: 'EI_ACTIVITIES_GAS'
        },
        ],
      },
      cf_activities_without_energy: {
        '*': [{
          var: 'activitiesPerYear'
        },
        {
          var: 'EI_ACTIVITIES_WITHOUT_ENERGY'
        },
        ],
      },


      //==============================================================

      // public Services
      cf_public_services: {
        var: 'CF_PUBLIC_SERVICES'
      },


      //==============================================================
    },
    actionCards: [
      {
        id: 1,
        name: 'SE DEPLACER A PIEDS OU A VÉLO',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'TRANSPORT',
        cost: 3,
        operations: [],
      },
      {
        id: 2,
        name: 'REMPLACER LA VOITURE PAR LES TRANSPORTS EN COMMUN',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'TRANSPORT',
        cost: 3,
        operations: [],
      },
      {
        id: 3,
        name: 'FAIRE PLUS DE COVOITURAGE',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'TRANSPORT',
        cost: 2,
        operations: [
          {
            variable: 'km_per_day_car_commute',
            operation: { '*': [{ var: 'km_per_day_car_commute' }, 0.5] },
          },
        ],
      },
      {
        id: 4,
        name: 'FAIRE PLUS DE TÉLÉTRAVAIL',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'TRANSPORT',
        cost: 3,
        operations: [
          {
            variable: 'km_car_commute_per_day',
            operation: { '*': [{ var: 'km_car_commute_per_day' }, 0.7] },
          },
          {
            variable: 'hours_urban_bus_per_week',
            operation: { '*': [{ var: 'hours_urban_bus_per_week' }, 0.7] },
          },
          {
            variable: 'hours_urban_train_per_week',
            operation: { '*': [{ var: 'hours_urban_train_per_week' }, 0.7] },
          },
        ],
      },
      {
        id: 5,
        name: "FAIRE DE L'ECO-CONDUITE",
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'TRANSPORT',
        cost: 1,
        operations: [
          {
            variable: 'km_car_commute_per_day',
            operation: { '-': [{ var: 'km_car_commute_per_day' }, 0.5] },
          },
          {
            variable: 'hours_urban_bus_per_week',
            operation: {
              '+': [
                { var: 'hours_urban_bus_per_week' },
                {
                  '/': [
                    {
                      '*': [
                        { var: 'km_car_commute_per_day' },
                        0.25,
                        { var: 'DAY_PER_WEEK' },
                      ],
                    },
                    { var: 'MEAN_SPEED_URBAN_BUS' },
                  ],
                },
              ],
            },
          },
          {
            variable: 'hours_urban_train_per_week',
            operation: {
              '+': [
                { var: 'hours_urban_train_per_week' },
                {
                  '/': [
                    {
                      '*': [
                        { var: 'km_car_commute_per_day' },
                        0.25,
                        { var: 'DAY_PER_WEEK' },
                      ],
                    },
                    { var: 'MEAN_SPEED_URBAN_TRAIN' },
                  ],
                },
              ],
            },
          },
        ],
      },
      {
        id: 6,
        name: "ARRÊTER DE PRENDRE L'AVION",
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'TRANSPORT',
        cost: 1,
        operations: [],
      },
      {
        id: 7,
        name: 'BAISSER LE CHAUFFAGE',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'LOGEMENT',
        cost: 1,
        operations: [],
      },
      {
        id: 8,
        name: "CONSOMMER MOINS D'EAU CHAUDE SANITAIRE",
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'LOGEMENT',
        cost: 1,
        operations: [],
      },
      {
        id: 9,
        name: "ÉCONOMISER DE L'ÉLECTRICITÉ",
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'LOGEMENT',
        cost: 1,
        operations: [],
      },
      {
        id: 10,
        name: 'SE FOURNIR EN ÉLECTRICITÉ ALTERNATIVE',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'LOGEMENT',
        cost: 1,
        operations: [],
      },
      {
        id: 11,
        name: 'MUTUALISER SON LOGEMENT',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'LOGEMENT',
        cost: 3,
        operations: [],
      },
      {
        id: 12,
        name: 'ALLONGER LA DURÉE DE VIE DES APPAREILS',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'CONSO',
        cost: 2,
        operations: [],
      },
      {
        id: 13,
        name: 'ACHETER MOINS DE VÊTEMENTS NEUFS',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'CONSO',
        cost: 2,
        operations: [],
      },
      {
        id: 14,
        name: "REDUIRE L'USAGE DU NUMERIQUE",
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'CONSO',
        cost: 1,
        operations: [],
      },
      {
        id: 15,
        name: 'DEVENIR FLEXITARIEN',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'BIENS DE CONSO',
        cost: 4,
        operations: [],
      },
      {
        id: 16,
        name: 'REMPLACER LA VIANDE ROUGE PAR DE LA VIANDE BLANCHE',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'BIENS DE CONSO',
        cost: 2,
        operations: [],
      },
      {
        id: 17,
        name: "MANGER MOINS D'ŒUFS ET DE PRODUITS LAITIERS",
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'BIENS DE CONSO',
        cost: 4,
        operations: [],
      },
      {
        id: 18,
        name: 'FAIRE LA CUISINE',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'BIENS DE CONSO',
        cost: 3,
        operations: [],
      },
      {
        id: 19,
        name: 'MANGER LOCAL ET DE SAISON',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'BIENS DE CONSO',
        cost: 1,
        operations: [],
      },
      {
        id: 20,
        name: 'CONSOMMER MOINS DE BOISSONS',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'BIENS DE CONSO',
        cost: 3,
        operations: [],
      },
      {
        id: 21,
        name: 'RÉDUIRE LES EMBALLAGES ALIMENTAIRES',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'BIENS DE CONSO',
        cost: 2,
        operations: [],
      },
      {
        id: 22,
        name: 'MANGER BIO',
        type: 'individual',
        category: 'ECOGESTES',
        subCategory: 'BIENS DE CONSO',
        cost: 2,
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
        id: 10,
        name: 'Col1',
        type: 'collective',
        actionCardIds: [20, 21],
      },
    ],
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
        kmPerDayCarCommute: 2,
        kmCarCommutePerDay: 25,
        passengersPerCarCommute: 3,
        hoursUrbanBusPerWeek: 1,
        hoursCoachCommutePerWeek: 2,
        hoursUrbanTrainPerWeek: 3,
        coefficientEnergyEfficientDriving: 1,

        categoryCarTravel: 'URBAN',
        motorTypeCarTravel: 'FUEL',
        ageCategoryCarTravel: 'TEN_YEARS_OR_YOUNGER',

        kmPerYearCarTravel: 8000,
        passengersPerCarTravel: 3,

        kmCoachTravel: 1000,
        kmCountryTrain: 2000,
        kmPlane: 3000,

        // housing
        residentsPerHousing: 3,
        housingSurfaceArea: 60,
        houseSurfaceArea: 60,
        flatSurfaceArea: 0,
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
        kmPerDayCarCommute: 2,
        kmCarCommutePerDay: 25,
        passengersPerCarCommute: 3,
        hoursUrbanBusPerWeek: 1,
        hoursCoachCommutePerWeek: 2,
        hoursUrbanTrainPerWeek: 3,
        coefficientEnergyEfficientDriving: 1,

        categoryCarTravel: 'URBAN',
        motorTypeCarTravel: 'FUEL',
        ageCategoryCarTravel: 'TEN_YEARS_OR_YOUNGER',

        kmPerYearCarTravel: 8000,
        passengersPerCarTravel: 3,

        kmCoachTravel: 1000,
        kmCountryTrain: 2000,
        kmPlane: 3000,

        // housing
        residentsPerHousing: 3,
        housingSurfaceArea: 60,
        houseSurfaceArea: 60,
        flatSurfaceArea: 0,
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
  rounds: [
    {
      year: 2020,
      carbonVariables: [
        {
          participantId: 1,
          variables: {
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
        {
          participantId: 2,
          variables: {
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
                        value: 39,
                      },
                      {
                        name: 'countryTrain',
                        cfKey: 'cf_country_train',
                        value: 20,
                      },
                    ],
                    value: 59,
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
                value: 1492.23570551296,
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
                            value: 1.3,
                          },
                          {
                            name: 'elecCooking',
                            cfKey: 'cf_elec_cooking',
                            value: 1.3,
                          },
                          {
                            name: 'elecWaterHeating',
                            cfKey: 'cf_elec_water_heating',
                            value: 1.3,
                          },
                          {
                            name: 'elecLightning',
                            cfKey: 'cf_elec_lightning',
                            value: 1.3,
                          },
                        ],
                        value: 5.2,
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
                            value: 22.7,
                          },
                          {
                            name: 'gasWaterHeating',
                            cfKey: 'cf_gas_water_heating',
                            value: 22.7,
                          },
                        ],
                        value: 68.1,
                      },
                      {
                        name: 'fuel',
                        children: [
                          {
                            name: 'fuelHeating',
                            cfKey: 'cf_fuel_heating',
                            value: 32.300000000000004,
                          },
                          {
                            name: 'fuelCooking',
                            cfKey: 'cf_fuel_cooking',
                            value: 32.300000000000004,
                          },
                          {
                            name: 'fuelWaterHeating',
                            cfKey: 'cf_fuel_water_heating',
                            value: 32.300000000000004,
                          },
                        ],
                        value: 96.9,
                      },
                      {
                        name: 'wood',
                        children: [
                          {
                            name: 'woodHeating',
                            cfKey: 'cf_wood_heating',
                            value: 3,
                          },
                          {
                            name: 'woodCooking',
                            cfKey: 'cf_wood_cooking',
                            value: 3,
                          },
                          {
                            name: 'woodWaterHeating',
                            cfKey: 'cf_wood_water_heating',
                            value: 3,
                          },
                        ],
                        value: 9,
                      },
                      {
                        name: 'districtHeating',
                        cfKey: 'cf_district_heating',
                        value: 0,
                      },
                    ],
                    value: 188.27536,
                  },
                ],
                value: 738.9331377333333,
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
                        value: 228.85499999999996,
                      },
                      {
                        name: 'hotDrinks',
                        cfKey: 'cf_hot_drinks',
                        value: 112.42000000000002,
                      },
                      {
                        name: 'juicesAndSoda',
                        cfKey: 'cf_juices_and_sodas',
                        value: 214.61999999999998,
                      },
                    ],
                    value: 555.895,
                  },
                  {
                    name: 'meatAndFish',
                    cfKey: 'cf_meat_and_fish',
                    value: 352.86375,
                  },
                  {
                    name: 'eggsAndDairies',
                    cfKey: 'cf_eggs_and_dairies',
                    value: 71.66775,
                  },
                  {
                    name: 'others',
                    children: [
                      {
                        name: 'transformedProducts',
                        cfKey: 'cf_transformed_products',
                        value: 202.176,
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
                    value: 813.6996071428573,
                  },
                ],
                value: 1794.126107142857,
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
                            value: 32.5,
                          },
                          {
                            name: 'internetOthers',
                            cfKey: 'cf_internet_others',
                            value: 48.66,
                          },
                        ],
                        value: 81.16,
                      },
                    ],
                    value: 249.55999999999997,
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
                            value: 1.98,
                          },
                        ],
                        value: 52.38,
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
                    value: 397.37,
                  },
                ],
                value: 1318.33,
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
            value: 6343.62495038915,
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
                        value: 39,
                      },
                      {
                        name: 'countryTrain',
                        cfKey: 'cf_country_train',
                        value: 20,
                      },
                    ],
                    value: 59,
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
                value: 1492.23570551296,
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
                            value: 1.3,
                          },
                          {
                            name: 'elecCooking',
                            cfKey: 'cf_elec_cooking',
                            value: 1.3,
                          },
                          {
                            name: 'elecWaterHeating',
                            cfKey: 'cf_elec_water_heating',
                            value: 1.3,
                          },
                          {
                            name: 'elecLightning',
                            cfKey: 'cf_elec_lightning',
                            value: 1.3,
                          },
                        ],
                        value: 5.2,
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
                            value: 22.7,
                          },
                          {
                            name: 'gasWaterHeating',
                            cfKey: 'cf_gas_water_heating',
                            value: 22.7,
                          },
                        ],
                        value: 68.1,
                      },
                      {
                        name: 'fuel',
                        children: [
                          {
                            name: 'fuelHeating',
                            cfKey: 'cf_fuel_heating',
                            value: 32.300000000000004,
                          },
                          {
                            name: 'fuelCooking',
                            cfKey: 'cf_fuel_cooking',
                            value: 32.300000000000004,
                          },
                          {
                            name: 'fuelWaterHeating',
                            cfKey: 'cf_fuel_water_heating',
                            value: 32.300000000000004,
                          },
                        ],
                        value: 96.9,
                      },
                      {
                        name: 'wood',
                        children: [
                          {
                            name: 'woodHeating',
                            cfKey: 'cf_wood_heating',
                            value: 3,
                          },
                          {
                            name: 'woodCooking',
                            cfKey: 'cf_wood_cooking',
                            value: 3,
                          },
                          {
                            name: 'woodWaterHeating',
                            cfKey: 'cf_wood_water_heating',
                            value: 3,
                          },
                        ],
                        value: 9,
                      },
                      {
                        name: 'districtHeating',
                        cfKey: 'cf_district_heating',
                        value: 0,
                      },
                    ],
                    value: 188.27536,
                  },
                ],
                value: 738.9331377333333,
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
                        value: 228.85499999999996,
                      },
                      {
                        name: 'hotDrinks',
                        cfKey: 'cf_hot_drinks',
                        value: 112.42000000000002,
                      },
                      {
                        name: 'juicesAndSoda',
                        cfKey: 'cf_juices_and_sodas',
                        value: 214.61999999999998,
                      },
                    ],
                    value: 555.895,
                  },
                  {
                    name: 'meatAndFish',
                    cfKey: 'cf_meat_and_fish',
                    value: 352.86375,
                  },
                  {
                    name: 'eggsAndDairies',
                    cfKey: 'cf_eggs_and_dairies',
                    value: 71.66775,
                  },
                  {
                    name: 'others',
                    children: [
                      {
                        name: 'transformedProducts',
                        cfKey: 'cf_transformed_products',
                        value: 202.176,
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
                    value: 813.6996071428573,
                  },
                ],
                value: 1794.126107142857,
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
                            value: 32.5,
                          },
                          {
                            name: 'internetOthers',
                            cfKey: 'cf_internet_others',
                            value: 48.66,
                          },
                        ],
                        value: 81.16,
                      },
                    ],
                    value: 249.55999999999997,
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
                            value: 1.98,
                          },
                        ],
                        value: 52.38,
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
                    value: 397.37,
                  },
                ],
                value: 1318.33,
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
            value: 6343.62495038915,
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
        ALCOHOL_LITER_PER_GLASS: 0.30,
        DENSITY_ALCOHOL: 1,
        EI_HOT_DRINKS: 3.08,
        HOT_DRINKS_LITER_PER_GLASS: 0.02,
        DENSITY_HOT_DRINKS: 1,
        EI_JUICES_AND_SODAS: 1.47,
        JUICES_AND_SODAS_LITER_PER_GLASS: 0.2,
        DENSITY_JUICES_SODA: 1,

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
        COOKING_APPLIANCES_REDUCTION_PERCENTAGE_PER_PERSON: 0.20,
        LIGHTING_AND_ELECTRICAL_APPLIANCES_REDUCTION_PERCENTAGE_PER_PERSON: 0,
        EI_INTERNET_STREAMING: 0.125,
        CF_INTERNET_OTHERS: 48.66,
        EI_BIG_DEVICES: 47.80,
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
        CF_PUBLIC_SERVICES: 1000,
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
