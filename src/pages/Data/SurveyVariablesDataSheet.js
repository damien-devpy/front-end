/* eslint-disable react/jsx-props-no-spreading */
import 'react-datasheet/lib/react-datasheet.css';
import DataSheet from 'react-datasheet';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const SurveyVariablesDataSheet = ({ surveyVariablesGrid }) => {
  const { t } = useTranslation();

  const [
    editableSurveyVariablesGrid,
    setEditableSurveyVariablesGrid,
  ] = useState(surveyVariablesGrid);

  return (
    <Container>
      <DataSheet
        data={editableSurveyVariablesGrid}
        valueRenderer={(cell) =>
          cell.translate ? t(`${cell.value}`) : cell.value
        }
        onCellsChanged={(changes) => {
          const grid = editableSurveyVariablesGrid.map((row) => [...row]);
          changes.forEach(({ cell, row, col, value }) => {
            grid[row][col] = { ...grid[row][col], value };
          });
          setEditableSurveyVariablesGrid(grid);
        }}
      />
    </Container>
  );
};

export default SurveyVariablesDataSheet;
