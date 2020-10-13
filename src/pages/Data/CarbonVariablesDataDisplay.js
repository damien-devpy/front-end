/* eslint-disable react/jsx-props-no-spreading */
import 'react-datasheet/lib/react-datasheet.css';
import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import CardHeader from '../../components/CardHeader';

const CfKeyInspector = ({
  footprintValue,
  globalCarbonVariables,
  carbonVariables,
  variableNames,
}) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Card className="p-5 border-light shadow-sm" style={{ borderRadius: 10 }}>
        <CardHeader>
          <h2>
            Données de la catégorie carbone, pour ce participant et cette année
          </h2>
        </CardHeader>
        <h3>
          {t('data.carbonVariablesDisplayTitle', {
            footprintValue,
          })}
        </h3>
        <h4>{t('data.individualCarbonVariablesDisplayTitle')}</h4>
        <ul>
          {variableNames
            .filter((key) => key in carbonVariables)
            .map((key) => (
              <li>
                {t(`carbonVariables.${key}`)} :{' '}
                {Math.round(carbonVariables[key] * 100) / 100}
              </li>
            ))}
        </ul>
        <h4>{t('data.globalCarbonVariablesDisplayTitle')}</h4>
        <ul>
          {variableNames
            .filter((key) => key in globalCarbonVariables)
            .map((key) => (
              <li key={key}>
                {t(`globalCarbonVariables.${key}`)} :{' '}
                {Math.round(globalCarbonVariables[key] * 100) / 100}
              </li>
            ))}
        </ul>
      </Card>
    </Container>
  );
};
export default CfKeyInspector;
