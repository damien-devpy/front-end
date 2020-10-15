import 'react-datasheet/lib/react-datasheet.css';
import React from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const CfKeyInspector = ({
  footprintValue,
  globalCarbonVariables,
  carbonVariables,
  variableNames,
}) => {
  const { t } = useTranslation();

  const formatVariableValue = (value) => {
    return Number.isNaN(Number(value))
      ? String(value)
      : Math.round(value * 100) / 100;
  };
  return (
    <Container>
      <h2>
        {t('data.carbonVariablesDisplayTitle', {
          footprintValue: Number.isNaN(footprintValue) ? '-' : footprintValue,
        })}
      </h2>
      <h5>{t('data.individualCarbonVariablesDisplayTitle')}</h5>
      <ul>
        {variableNames
          .filter((key) => key in carbonVariables)
          .map((key) => (
            <li>
              {t(`carbonVariables.${key}`)} :{' '}
              <b>{formatVariableValue(carbonVariables[key])}</b>
            </li>
          ))}
      </ul>
      <h5>{t('data.globalCarbonVariablesDisplayTitle')}</h5>
      <ul>
        {variableNames
          .filter((key) => key in globalCarbonVariables)
          .map((key) => (
            <li key={key}>
              {t(`globalCarbonVariables.${key}`)} :{' '}
              <b>{formatVariableValue(globalCarbonVariables[key])}</b>
            </li>
          ))}
      </ul>
    </Container>
  );
};
export default CfKeyInspector;
