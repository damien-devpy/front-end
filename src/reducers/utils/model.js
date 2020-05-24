import jsonLogic from 'json-logic-js';

const computeNewCarbonVariables = (oldCarbonVariables, actions) => {
  const newCarbonVariables = {};
  actions.forEach((action) => {
    action.operations.forEach((operation) => {
      newCarbonVariables[
        operation.variable
      ] = jsonLogic.apply(operation.operation, { ...oldCarbonVariables });
    });
  });
  return newCarbonVariables;
};

const applyFunctionToLeavesOfFootprintStructures = (node, func) => {
  if (!node.children) {
    return func(node);
  }
  return {
    ...node,
    children: node.children.map((child) =>
      applyFunctionToLeavesOfFootprintStructures(child, func)
    ),
  };
};

const computeFootprint = (
  footprintStructure,
  variableFormulas,
  carbonVariables,
  globalCarbonVariables
) =>
  applyFunctionToLeavesOfFootprintStructures(footprintStructure, (leave) => ({
    ...leave,
    value: jsonLogic.apply(variableFormulas[leave.cfKey], {
      ...carbonVariables,
      ...globalCarbonVariables,
    }),
  }));

const sumTree = (node, valueAccessor = (n) => n.value, key = 'value') => {
  if (!node.children) {
    return {
      ...node,
      [key]: valueAccessor(node),
    };
  }
  const newNode = {
    ...node,
    children: node.children.map((child) => sumTree(child, valueAccessor)),
  };
  newNode[key] = newNode.children.reduce((S, child) => S + child[key], 0);
  return newNode;
};
const valueOnAllLevels = (footprintStructure) => sumTree(footprintStructure);

const computeSocialVariables = (oldSocialVariables) => {
  // TODO
  return { socialScore: 2, influenceScore: 2 };
};

const computeCitizenIndividualActionCards = (socialVariables) => {
  return {
    10: {
      citizenId: 10,
      actionCardIds: [1, 2, 3],
    },
    20: {
      citizenId: 20,
      actionCardIds: [2, 3],
    },
  };
};
export {
  applyFunctionToLeavesOfFootprintStructures,
  computeNewCarbonVariables,
  computeFootprint,
  valueOnAllLevels,
  computeSocialVariables,
  computeCitizenIndividualActionCards,
};
