import {
  applyFunctionToLeavesOfFootprintStructures,
  computeBudget,
  computeFootprint,
  computeSocialVariables,
  valueOnAllLevels,
} from './model';

test('applyFunctionToLeavesOfFootprintStructures returns correct result', () => {
  const inputTree = {
    name: 'node1',
    children: [
      { name: 'node2' },
      {
        name: 'node3',
        children: [{ name: 'node4' }],
      },
    ],
  };
  const expectedTree = {
    name: 'node1',
    children: [
      { name: 'node2', value: 2 },
      {
        name: 'node3',
        children: [{ name: 'node4', value: 2 }],
      },
    ],
  };
  const resultTree = applyFunctionToLeavesOfFootprintStructures(
    inputTree,
    (leave) => ({ ...leave, value: 2 })
  );
  expect(resultTree).toStrictEqual(expectedTree);
});

test('computeFootprint returns the footprint structure with computed values on all leaves', () => {
  const footprintStructure = {
    name: 'root',
    children: [
      { name: '1', cfKey: 'cf_1' },
      { name: '2', cfKey: 'cf_2' },
    ],
  };
  const formulas = {
    cf_1: 2,
    cf_2: { '*': [3, { var: 'var=2' }] },
  };
  const variables = { 'var=2': 2 };
  const expectedResult = {
    name: 'root',
    children: [
      { name: '1', cfKey: 'cf_1', value: 2 },
      { name: '2', cfKey: 'cf_2', value: 6 },
    ],
  };
  const result = computeFootprint(footprintStructure, formulas, variables, {});
  expect(result).toStrictEqual(expectedResult);
});

describe('valueOnAllLevels', () => {
  test('valueOnAllLevels for one node tree structure', () => {
    const footprintStructure = {
      name: 'root',
      value: 2,
    };
    const expectedResult = {
      name: 'root',
      value: 2,
    };
    const result = valueOnAllLevels(footprintStructure);
    expect(result).toStrictEqual(expectedResult);
  });

  test('valueOnAllLevels for one level tree structure', () => {
    const footprintStructure = {
      name: 'root',
      children: [
        { name: 'level_1', value: 2 },
        { name: 'level_1', value: 4 },
      ],
    };
    const expectedResult = {
      name: 'root',
      value: 6,
      children: [
        { name: 'level_1', value: 2 },
        { name: 'level_1', value: 4 },
      ],
    };
    const result = valueOnAllLevels(footprintStructure);
    expect(result).toStrictEqual(expectedResult);
  });

  test('valueOnAllLevels for two levels tree structure', () => {
    const footprintStructure = {
      name: 'root',
      children: [
        {
          name: 'level_1',
          children: [{ name: 'level_2', value: 4 }],
        },
      ],
    };
    const expectedResult = {
      name: 'root',
      value: 4,
      children: [
        {
          name: 'level_1',
          value: 4,
          children: [{ name: 'level_2', value: 4 }],
        },
      ],
    };
    const result = valueOnAllLevels(footprintStructure);
    expect(result).toStrictEqual(expectedResult);
  });

  test('valueOnAllLevels for complex levels tree structure', () => {
    const footprintStructure = {
      name: 'root',
      children: [
        {
          name: '1',
          cfKey: 'cf_1',
          children: [
            { name: '3', cfKey: 'cf_3', value: 5 },
            { name: '3', cfKey: 'cf_3', value: 7 },
          ],
        },
        { name: '2', cfKey: 'cf_2', value: 3 },
      ],
    };
    const expectedResult = {
      name: 'root',
      value: 15,
      children: [
        {
          name: '1',
          cfKey: 'cf_1',
          value: 12,
          children: [
            { name: '3', cfKey: 'cf_3', value: 5 },
            { name: '3', cfKey: 'cf_3', value: 7 },
          ],
        },
        { name: '2', cfKey: 'cf_2', value: 3 },
      ],
    };
    const result = valueOnAllLevels(footprintStructure);
    expect(result).toStrictEqual(expectedResult);
  });
});

describe('computeBudget returns correct results', () => {
  const actionCards = { '1': { cost: 2 } };
  const testValues = [
    { influenceScore: 0, expectedBudget: 3 },
    { influenceScore: 0.015, expectedBudget: 3 },
    { influenceScore: 0.05, expectedBudget: 4 },
    { influenceScore: 0.1, expectedBudget: 4 },
    { influenceScore: 0.2, expectedBudget: 4 },
    { influenceScore: 0.25, expectedBudget: 5 },
    { influenceScore: 0.95, expectedBudget: 8 },
    { influenceScore: 1000, expectedBudget: 8 },
    { influenceScore: -1000, expectedBudget: 3 },
    { influenceScore: 0, oldBudget: 3, expectedBudget: 6 },
    {
      influenceScore: 0,
      oldBudget: 3,
      collectiveActionCardIds: [1],
      expectedBudget: 4,
    },
    {
      influenceScore: 1000,
      oldBudget: 3,
      roundType: 'individual',
      expectedBudget: 3,
    },
  ];
  testValues.forEach((params) => {
    const actualResult = computeBudget(
      params.influenceScore,
      params.oldBudget,
      params.collectiveActionCardIds,
      actionCards,
      params.roundType
    );
    expect(actualResult).toBe(params.expectedBudget);
  });
});

describe('computeSocialVariables returns correct results', () => {
  const oldSocialVariables = {
    socialScore: 2,
    influenceScore: 1,
  };

  const actionCards = {
    1: {
      // individual
      peerInspirationScore: 1,
      peerAwarenessScore: 1,
      systemicWeakSignals: 1,
      systemicPressureScore: 1,
    },
    2: {
      // individual
      peerInspirationScore: 1,
      peerAwarenessScore: 1,
      systemicWeakSignals: 1,
      systemicPressureScore: 1,
    },
    3: {
      // collective
      peerInspirationScore: 50,
      peerAwarenessScore: 2,
      systemicWeakSignals: 50,
      systemicPressureScore: 50,
    },
  };
  const nbParticipants = 2;

  test('individualActions', () => {
    const participantIndividualChoices = [{ actionCardIds: [1, 2] }];
    const citizenIndividualChoices = [{ actionCardIds: [1] }];

    const collectiveActionCardIds = [];
    const actualSocialVariables = computeSocialVariables(
      oldSocialVariables,
      participantIndividualChoices,
      citizenIndividualChoices,
      collectiveActionCardIds,
      actionCards,
      nbParticipants
    );
    const expectedSocialVariables = {
      // 2 + ((1 + 1 + 1) / (24 * 20) / 2) + ((1 + 1 + 1) / 20)
      // scoreInitial + (inspirationScore + inspirationScore + inspirationScore)
      //                      / (NB_MAX_HEARTS * nbTotalPersonsSimulated) / 2
      //              + (awarenessScore + awarenessScore + awarenessScore)
      //                      / (nbTotalPersonsSimulated)
      socialScore: 2.153125,
      // 1 + ((1 + 1 + 1) / (24 * 20) / 2) + ((1 + 1 + 1) / (2 * 10 * 2))
      // scoreInitial + (weakSignals + weakSignals + weakSignals)
      //                    / (NB_MAX_HEARTS * nbTotalPersonsSimulated) / 2
      //              + (systemicPressure + systemicPressure + systemicPressure)
      //                    / (nbParticipants * MAX_INFLUENCE_SCORE) / 2
      influenceScore: 1.078125,
    };
    expect(actualSocialVariables.socialScore).toBeCloseTo(
      expectedSocialVariables.socialScore
    );
    expect(actualSocialVariables.influenceScore).toBeCloseTo(
      expectedSocialVariables.influenceScore
    );
  });
  test('individualActions', () => {
    const participantIndividualChoices = [];
    const citizenIndividualChoices = [];
    const collectiveActionCardIds = [3];
    const actualSocialVariables = computeSocialVariables(
      oldSocialVariables,
      participantIndividualChoices,
      citizenIndividualChoices,
      collectiveActionCardIds,
      actionCards,
      nbParticipants
    );
    const expectedSocialVariables = {
      // unchanged
      influenceScore: 1,
      // 2 + 2
      socialScore: 4,
    };
    expect(actualSocialVariables).toStrictEqual(expectedSocialVariables);
  });
});
