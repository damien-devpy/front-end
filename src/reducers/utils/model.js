import jsonLogic from 'json-logic-js';
import { hierarchy } from 'd3-hierarchy';


const applyOperation = (oldCarbonVariables, operation) => ({
  ...oldCarbonVariables,
  [operation.variable]: jsonLogic.apply(operation.operation, { ...oldCarbonVariables }),
});

const applyIndividualAction = (oldCarbonVariables, individualAction) => individualAction.operations.reduce(applyOperation, oldCarbonVariables);

const applyIndividualActions = (oldCarbonVariables, individualActions) => individualActions.reduce(applyIndividualAction, oldCarbonVariables);

const computeFootprint = (footprintStructure, variableFormulas, carbonVariables, globalCarbonVariables) => {
  const footprint = hierarchy(footprintStructure);
  footprint.each((node) => {
    if (node.height === 0) {
      node.data.value = jsonLogic.apply(variableFormulas[node.data.cfKey], { ...carbonVariables, ...globalCarbonVariables });
      if (node.data.value === undefined) {
        console.warn('Unable to compute cf value : ', node.data);
      }
    }
  });
  return footprint.data;
};


export { applyIndividualActions, computeFootprint };
