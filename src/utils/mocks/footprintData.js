const footprintData = {
  carbonFootprint: {
    name: "totalFootprint",
    children: [
      {
        name: "transport",
        children: [
          { name: "plane", cfKey: "cf_plane", value: 750 },
          {
            name: "train",
            children: [
              { name: "urbanTrain", cfKey: "cf_urban_train", value: 0 },
              { name: "countryTrain", cfKey: "cf_country_train", value: 20 },
            ],
            value: 67.3,
          },
          {
            name: "bus",
            children: [
              { name: "coachCommute", cfKey: "cf_coach_commute", value: 6.4 },
              { name: "coachTravel", cfKey: "cf_coach_travel", value: 40 },
            ],
            value: 92.80000000000001,
          },
          {
            name: "car",
            children: [
              {
                name: "dailyCommutes",
                cfKey: "cf_car_commute",
                value: 26.62600601514667,
              },
              {
                name: "exceptionalCommutes",
                cfKey: "cf_car_travel",
                value: 583.5836934826667,
              },
            ],
            value: 1220.4193989956268,
          },
        ],
        value: 3584.4290984934405,
      },
      {
        name: "housing",
        children: [
          {
            name: "housingEquipment",
            children: [
              {
                name: "appliances",
                children: [
                  {
                    name: "smallAppliances",
                    cfKey: "cf_small_appliances",
                    value: 46.666666666666664,
                  },
                  {
                    name: "bigApplicances",
                    cfKey: "cf_big_appliances",
                    value: 54.36666666666667,
                  },
                ],
                value: 202.06666666666666,
              },
              {
                name: "furnitures",
                children: [
                  {
                    name: "furnituresPerSurface",
                    cfKey: "cf_furnitures",
                    value: 79,
                  },
                  {
                    name: "furnituresMin",
                    cfKey: "cf_furnitures_min",
                    value: 73.4044444,
                  },
                ],
                value: 304.8088888,
              },
            ],
            value: 760.3133332,
          },
          {
            name: "constructionAndMaintenance",
            children: [
              {
                name: "construction",
                children: [
                  {
                    name: "houseConstruction",
                    cfKey: "cf_house_construction",
                    value: 283.34,
                  },
                  {
                    name: "flatConstruction",
                    cfKey: "cf_flat_construction",
                    value: 0,
                  },
                ],
                value: 566.68,
              },
              { name: "construction", cfKey: "cf_maintenance", value: 13.88 },
            ],
            value: 877.78,
          },
          {
            name: "energies",
            children: [
              { name: "water", cfKey: "cf_water", value: 9.07536 },
              {
                name: "electricity",
                children: [
                  { name: "elecHeating", cfKey: "cf_elec_heating", value: 1.3 },
                  { name: "elecCooking", cfKey: "cf_elec_cooking", value: 1.3 },
                  {
                    name: "elecWaterHeating",
                    cfKey: "cf_elec_water_heating",
                    value: 1.3,
                  },
                  {
                    name: "elecLightning",
                    cfKey: "cf_elec_lightning",
                    value: 1.3,
                  },
                ],
                value: 10.4,
              },
              {
                name: "gas",
                children: [
                  { name: "gasHeating", cfKey: "cf_gas_heating", value: 22.7 },
                  { name: "gasCooking", cfKey: "cf_gas_cooking", value: 22.7 },
                  {
                    name: "gasWaterHeating",
                    cfKey: "cf_gas_water_heating",
                    value: 22.7,
                  },
                ],
                value: 136.2,
              },
              {
                name: "fuel",
                children: [
                  {
                    name: "fuelHeating",
                    cfKey: "cf_fuel_heating",
                    value: 32.300000000000004,
                  },
                  {
                    name: "fuelCooking",
                    cfKey: "cf_fuel_cooking",
                    value: 32.300000000000004,
                  },
                  {
                    name: "fuelWaterHeating",
                    cfKey: "cf_fuel_water_heating",
                    value: 32.300000000000004,
                  },
                ],
                value: 193.80000000000004,
              },
              {
                name: "wood",
                children: [
                  { name: "woodHeating", cfKey: "cf_wood_heating", value: 3 },
                  { name: "woodCooking", cfKey: "cf_wood_cooking", value: 3 },
                  {
                    name: "woodWaterHeating",
                    cfKey: "cf_wood_water_heating",
                    value: 3,
                  },
                ],
                value: 18,
              },
              {
                name: "districtHeating",
                cfKey: "cf_district_heating",
                value: 0,
              },
            ],
            value: 555.7507200000001,
          },
        ],
        value: 2932.7771909333333,
      },
      {
        name: "food",
        children: [
          {
            name: "drinks",
            children: [
              {
                name: "alcohol",
                cfKey: "cf_alcohol",
                value: 228.85499999999996,
              },
              {
                name: "hotDrinks",
                cfKey: "cf_hot_drinks",
                value: 112.42000000000002,
              },
              {
                name: "juicesAndSoda",
                cfKey: "cf_juices_and_sodas",
                value: 214.61999999999998,
              },
            ],
            value: 1111.79,
          },
          { name: "meatAndFish", cfKey: "cf_meat_and_fish", value: 352.86375 },
          {
            name: "eggsAndDairies",
            cfKey: "cf_eggs_and_dairies",
            value: 71.66775,
          },
          {
            name: "others",
            children: [
              {
                name: "transformedProducts",
                cfKey: "cf_transformed_products",
                value: 202.176,
              },
              {
                name: "groceriesAndStarches",
                cfKey: "cf_starches_and_groceries",
                value: 240.65753571428573,
              },
              {
                name: "fruitsAndVegetables",
                children: [
                  {
                    name: "localFruitsAndVegeteables",
                    cfKey: "cf_local_fruits_and_vegetables",
                    value: 38.57007142857143,
                  },
                  {
                    name: "importedFruitsAndVegeteables",
                    cfKey: "cf_imported_fruits_and_vegetables",
                    value: 332.29600000000005,
                  },
                ],
                value: 741.732142857143,
              },
            ],
            value: 1998.265285714286,
          },
        ],
        value: 5328.712892857143,
      },
      {
        name: "others",
        children: [
          { name: "clothing", cfKey: "cf_clothes", value: 671.4 },
          {
            name: "digital",
            children: [
              {
                name: "devices",
                children: [
                  {
                    name: "smallDevices",
                    cfKey: "cf_small_devices_cradle_to_crate",
                    value: 25,
                  },
                  {
                    name: "bigDevices",
                    cfKey: "cf_big_devices_cradle_to_crate",
                    value: 143.39999999999998,
                  },
                ],
                value: 336.79999999999995,
              },
              {
                name: "internetUsage",
                children: [
                  {
                    name: "internetStreaming",
                    cfKey: "cf_internet_streaming",
                    value: 32.5,
                  },
                  {
                    name: "internetOthers",
                    cfKey: "cf_internet_others",
                    value: 48.66,
                  },
                ],
                value: 162.32,
              },
            ],
            value: 748.68,
          },
          {
            name: "others",
            children: [
              {
                name: "activities",
                children: [
                  {
                    name: "activitiesElectricity",
                    cfKey: "cf_activities_electricity",
                    value: 23.76,
                  },
                  {
                    name: "activitiesGas",
                    cfKey: "cf_activities_gas",
                    value: 26.64,
                  },
                  {
                    name: "activitiesWithoutEnergy",
                    cfKey: "cf_activities_without_energy",
                    value: 1.98,
                  },
                ],
                value: 104.76,
              },
              {
                name: "goodsAndServices",
                children: [
                  {
                    name: "servicesElectricity",
                    cfKey: "cf_services_electricity",
                    value: 62.88,
                  },
                  {
                    name: "servicesGas",
                    cfKey: "cf_services_gas",
                    value: 70.19,
                  },
                  {
                    name: "servicesWithoutEnergy",
                    cfKey: "cf_services_without_energy",
                    value: 211.92,
                  },
                ],
                value: 689.9799999999999,
              },
            ],
            value: 1192.11,
          },
        ],
        value: 3930.5199999999995,
      },
      {
        name: "publicServices",
        children: [
          {
            name: "gasPublicServices",
            cfKey: "cf_gas_public_services",
            value: 336,
          },
          {
            name: "elecPublicServices",
            cfKey: "cf_elec_public_services",
            value: 301,
          },
          {
            name: "otherPublicServices",
            cfKey: "cf_other_public_services",
            value: 363,
          },
        ],
        value: 2000,
      },
    ],
    value: 24081.738126657925,
  },
};

export default footprintData;
