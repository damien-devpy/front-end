/* eslint-disable react/jsx-props-no-spreading */
import './react-datasheet.css';
import DataSheet from 'react-datasheet';
import React, { useState } from 'react';
import { Button, ButtonGroup, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import {
  mergeGrids,
  selectModifiedSurveyVariables,
  selectParticipantIdsToCheck,
} from '../../../selectors/surveyVariablesSelector';

const SurveyVariablesDataSheet = ({
  surveyVariablesGrid,
  participantsGrid,
  handleSave,
  handleValidate,
}) => {
  const { t } = useTranslation();
  const [
    editableSurveyVariablesGrid,
    setEditableSurveyVariablesGrid,
  ] = useState(surveyVariablesGrid);

  const modifiedSurveyVariables = selectModifiedSurveyVariables(
    editableSurveyVariablesGrid
  );

  const participantIds = selectParticipantIdsToCheck(participantsGrid);

  const saveSurveyVariables = () => {
    handleSave(mergeGrids(participantsGrid, editableSurveyVariablesGrid));
  };

  const validateParticipants = () => {
    handleValidate(participantIds);
  };
  return (
    <Container>
      <div style={{ display: 'flex', border: '1px solid' }}>
        <DataSheet
          data={participantsGrid}
          valueRenderer={(cell) =>
            cell.translate ? t(`${cell.value}`) : cell.value
          }
          valueViewer={({ cell, row, col, value }) => {
            const style = { height: '1.5rem', whiteSpace: 'nowrap' };
            return (
              <span className="value-viewer" style={style}>
                {value}
              </span>
            );
          }}
        />
        <div style={{ overflowX: 'auto' }}>
          {/* <div style={{ paddingBottom: '0.6rem' }}> */}
          <div>
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
                });
                setEditableSurveyVariablesGrid(grid);
              }}
              valueViewer={({ cell, row, col, value }) => {
                const style = { height: '1.5rem', whiteSpace: 'nowrap' };
                const floatValue = parseFloat(cell.value, 10);
                if (
                  cell.value &&
                  cell.originalValue &&
                  cell.value !== cell.originalValue
                ) {
                  style.backgroundColor = '#d4edda';
                }
                if (
                  (floatValue !== undefined &&
                    cell.min !== undefined &&
                    floatValue < cell.min) ||
                  (floatValue !== undefined &&
                    cell.max !== undefined &&
                    floatValue > cell.max)
                ) {
                  style.backgroundColor = 'orange';
                }
                return (
                  <span className="value-viewer" style={style}>
                    {value}
                  </span>
                );
              }}
            />
          </div>
        </div>
      </div>
      <br />
      <div className="d-flex justify-content-end">
        <ButtonGroup className="mr-2">
          <Button
            size="lg"
            disabled={modifiedSurveyVariables.length === 0}
            onClick={saveSurveyVariables}
          >
            {t('common.save')}
          </Button>
        </ButtonGroup>
        <ButtonGroup className="mr-2">
          <Button
            size="lg"
            variant="success"
            disabled={participantIds.length === 0}
            onClick={validateParticipants}
          >
            {t('common.validate')}
          </Button>
        </ButtonGroup>
      </div>
    </Container>
  );
};

export default SurveyVariablesDataSheet;
