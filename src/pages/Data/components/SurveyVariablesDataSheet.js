/* eslint-disable react/jsx-props-no-spreading */
import 'react-datasheet/lib/react-datasheet.css';
import DataSheet from 'react-datasheet';
import React, { useState } from 'react';
import { Button, ButtonGroup, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { mergeGrids } from '../../../selectors/surveyVariablesSelector';
import { useFlexLayout } from 'react-table';

const SurveyVariablesDataSheet = ({
  surveyVariablesGrid,
  participantsGrid,
  handleSave,
}) => {
  const { t } = useTranslation();
  const [
    editableSurveyVariablesGrid,
    setEditableSurveyVariablesGrid,
  ] = useState(surveyVariablesGrid);

  const [selectedRows, setSelectedRows] = useState([]);
  const handleSelectAllChanged = (selected) => {
    const selections = selectedRows.map((s) => selected);
    setSelectedRows(selections);
  };

  const handleSelectChanged = (index, selected) => {
    const selections = [...selectedRows];
    selections[index] = selected;
    setSelectedRows(selections);
  };

  const CheckRenderer = ({ value }) => {
    return (
      <div style={{ height: '2rem', whiteSpace: 'nowrap' }}>
        <input
          type="checkbox"
          checked={value}
          //  onChange={(e) => onChange(e.target.checked)}
        />
      </div>
    );
  };

  const selectionGrid = [
    [{ value: true, valueViewer: CheckRenderer }],
    [{ value: true, valueViewer: CheckRenderer }],
    [{ value: true, valueViewer: CheckRenderer }],
  ];

  const saveSurveyVariables = () => {
    handleSave(mergeGrids(participantsGrid, editableSurveyVariablesGrid));
  };
  return (
    <Container>
      <div style={{ display: 'flex', border: '1px solid' }}>
        {/* <DataSheet
          data={selectionGrid}
          valueRenderer={(cell) =>
            cell.translate ? t(`${cell.value}`) : cell.value
          }
        /> */}
        <DataSheet
          data={participantsGrid}
          valueRenderer={(cell) =>
            cell.translate ? t(`${cell.value}`) : cell.value
          }
          valueViewer={({ cell, row, col, value }) => {
            const style = { height: '2rem', whiteSpace: 'nowrap' };
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
                const style = { height: '2rem', whiteSpace: 'nowrap' };
                const floatValue = parseFloat(cell.value, 10);
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
                if (
                  cell.value &&
                  cell.originalValue &&
                  cell.value !== cell.originalValue
                ) {
                  style.color = 'green';
                  style.fontWeight = 'bold';
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
