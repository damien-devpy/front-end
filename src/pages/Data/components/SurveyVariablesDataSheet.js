/* eslint-disable react/jsx-props-no-spreading */
import 'react-datasheet/lib/react-datasheet.css';
import DataSheet, { ValueViewer } from 'react-datasheet';
import React, { useState } from 'react';
import { Button, ButtonGroup, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const SurveyVariablesDataSheet = ({ surveyVariablesGrid, handleSave }) => {
  const { t } = useTranslation();
  const [
    editableSurveyVariablesGrid,
    setEditableSurveyVariablesGrid,
  ] = useState(surveyVariablesGrid);

  const [modifiedRows, setModifiedRows] = useState(new Set());

  const saveSurveyVariables = () => {
    const modifiedSurveyVariablesGrid = [...modifiedRows].map((rowId) => {
      return editableSurveyVariablesGrid[rowId];
    });
    console.log('modifiedSurveyVariablesGrid', modifiedSurveyVariablesGrid);
    handleSave(modifiedSurveyVariablesGrid);
  };
  return (
    <Container>
      <DataSheet
        data={editableSurveyVariablesGrid}
        valueRenderer={(cell) =>
          cell.translate ? t(`${cell.value}`) : cell.value
        }
        onCellsChanged={(changes) => {
          const grid = editableSurveyVariablesGrid.map((row) => [...row]);
          console.log('grid', grid);
          changes.forEach(({ cell, row, col, value }) => {
            console.log(
              'DataSheet',
              `cell: ${JSON.stringify(
                cell
              )}, row: ${row}, col: ${col}, value: ${value}`
            );
            console.log(`grid[${row}][${col}] before`, grid[row][col]);
            grid[row][col] = { ...grid[row][col], value };
            console.log(`grid[${row}][${col}] after `, grid[row][col]);

            const newModifiedRows = new Set(modifiedRows);
            setModifiedRows(newModifiedRows.add(row));
          });
          setEditableSurveyVariablesGrid(grid);
        }}
        valueViewer={({ cell, row, col, value }) => {
          return cell.value &&
            cell.originalValue &&
            cell.value !== cell.originalValue ? (
            <span style={{ color: 'red' }}>{cell.value}</span>
          ) : (
            <ValueViewer cell={cell} row={row} col={col} value={value} />
          );
        }}
      />
      <br />
      <div className="d-flex justify-content-end">
        <ButtonGroup className="mr-2">
          <Button size="lg" onClick={saveSurveyVariables}>
            {t('common.saveOnly')}
          </Button>
        </ButtonGroup>
        <ButtonGroup className="mr-2">
          <Button
            size="lg"
            variant="success"
            // onClick={handleShowNewRoundModal}
          >
            {t('common.saveAndValidate')}
          </Button>
        </ButtonGroup>
      </div>
    </Container>
  );
};

export default SurveyVariablesDataSheet;
