import { reduce } from 'ramda';
import {
  selectOneCarbonVariablesObject,
  selectOneFootprint,
  selectVariableFormulasStructure,
} from './workshopSelector';

const isObject = (val) => typeof val === 'object' && !Array.isArray(val);
const isVar = (obj) =>
  isObject(obj) &&
  Object.keys(obj).length === 1 &&
  Object.keys(obj).includes('var');

const getAllVariablesFromFormula = (formula, variables = new Set()) => {
  if (isVar(formula)) {
    if (typeof formula.var === 'string') {
      return variables.add(formula.var);
    }
    return getAllVariablesFromFormula(formula.var, variables);
  }
  if (isObject(formula)) {
    const keys = Object.keys(formula);
    return new Set([
      ...variables,
      ...getAllVariablesFromFormula(formula[keys[0]]),
    ]);
  }
  if (Array.isArray(formula)) {
    return reduce(
      (varArray, form) =>
        new Set([...varArray, ...getAllVariablesFromFormula(form)]),
      variables,
      formula
    );
  }
  return new Set([]);
};

const selectVariableFormula = (state, cfKey) => {
  return selectVariableFormulasStructure(state)[cfKey];
};
const selectVariablesUsedInCfKey = (state, cfKey) => {
  const formula = selectVariableFormula(state, cfKey);
  return Array.from(getAllVariablesFromFormula(formula));
};

const getCategoryInCarbonFootprint = (node, name) => {
  let res;
  if (node.name === name) {
    return node.value;
  }
  if (node.children) {
    let i;
    // eslint-disable-next-line no-plusplus
    for (i = 0; i < node.children.length; i++) {
      res = getCategoryInCarbonFootprint(node.children[i], name);
      if (res !== null) {
        return res;
      }
    }
  }
  return null;
};
const selectFootprintValue = (state, participantId, year, name) => {
  const footprint = selectOneFootprint(state, participantId, year);
  return getCategoryInCarbonFootprint(footprint, name);
};

export {
  selectVariablesUsedInCfKey,
  selectFootprintValue,
  selectOneCarbonVariablesObject,
};
