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
  const testValues = [
    { influenceScore: 0, expectedBudget: 2 },
    { influenceScore: 1.5, expectedBudget: 2 },
    { influenceScore: 5, expectedBudget: 3 },
    { influenceScore: 20, expectedBudget: 4 },
    { influenceScore: 25, expectedBudget: 4 },
    { influenceScore: 95, expectedBudget: 8 },
    { influenceScore: 1000, expectedBudget: 8 },
    { influenceScore: -1000, expectedBudget: 2 },
  ];

  testValues.forEach((params) => {
    const actualResult = computeBudget(params.influenceScore);
    expect(actualResult).toBe(params.expectedBudget);
  });
});

describe('computeSocialVariables returns correct results', () => {
  const oldSocialVariables = {
    socialScore: 1,
    influenceScore: 1,
  };

  const actionCards = {
    1: {
      peerInspirationScore: 1,
      peerAwarenessScore: 1,
      systemicWeakSignals: 1,
      systemicPressureScore: 1,
    },
    2: {
      peerInspirationScore: 1,
      peerAwarenessScore: 1,
      systemicWeakSignals: 1,
      systemicPressureScore: 1,
    },
    3: {
      peerInspirationScore: 0,
      peerAwarenessScore: 2,
      systemicWeakSignals: 0,
      systemicPressureScore: 0,
    },
  };
  const nbParticipants = 2;

  test('individualActions', () => {
    const individualActions = [
      { actionCardIds: [1, 2] },
      { actionCardIds: [1] },
    ];
    const collectiveActionCardIds = [];
    const actualSocialVariables = computeSocialVariables(
      oldSocialVariables,
      individualActions,
      collectiveActionCardIds,
      actionCards,
      nbParticipants
    );
    const expectedSocialVariables = {
      influenceScore: 1.3032608695652175,
      socialScore: 1.169927536231884,
    };
    expect(actualSocialVariables).toStrictEqual(expectedSocialVariables);
  });
  test('individualActions', () => {
    const individualActions = [];
    const collectiveActionCardIds = [3];
    const actualSocialVariables = computeSocialVariables(
      oldSocialVariables,
      individualActions,
      collectiveActionCardIds,
      actionCards,
      nbParticipants
    );
    const expectedSocialVariables = {
      influenceScore: 1,
      socialScore: 3,
    };
    expect(actualSocialVariables).toStrictEqual(expectedSocialVariables);
  });
});
