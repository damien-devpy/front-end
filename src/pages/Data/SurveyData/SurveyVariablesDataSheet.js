/* eslint-disable react/jsx-props-no-spreading */
import './react-datasheet.css';
import DataSheet from 'react-datasheet';
import React, { useState } from 'react';
import { Button, ButtonGroup, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import DataEditor from './components/DataEditor';
import ValueEditor from './ValueEditor';
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

  const translateValue = (cell) => {
    if (cell.availableKeysValues && cell.value) {
      const valueObject = cell.availableKeysValues.find(
        (availableKeyValue) => availableKeyValue.key === cell.value
      );
      if (!valueObject) {
        // eslint-disable-next-line no-console
        console.info(
          `Cannot find key ${cell.value} in ${JSON.stringify(
            cell.availableKeysValues
          )}`
        );
        return '';
      }
      return valueObject.value;
    }
    return cell.translate ? t(`${cell.value}`) : cell.value;
  };

  const valueViewer = ({ cell, row, col, value }) => {
    const classes = ['value-viewer', 'text', cell.className || ''];
    if (
      cell.value !== undefined &&
      cell.originalValue !== undefined &&
      cell.value !== cell.originalValue
    ) {
      classes.push('modified');
    }
    const floatValue = parseFloat(cell.value, 10);
    if (
      (floatValue !== undefined &&
        cell.min !== undefined &&
        floatValue < cell.min) ||
      (floatValue !== undefined &&
        cell.max !== undefined &&
        floatValue > cell.max)
    ) {
      classes.push('notInRange');
    }
    return (
      <span className={classes.reduce((acc, c) => `${c} ${acc}`, '')}>
        {value}
      </span>
    );
  };

  const handleCellsChanged = (changes) => {
    const grid = editableSurveyVariablesGrid.map((row) => [...row]);
    changes.forEach(({ cell, row, col, value }) => {
      const modifiedValue =
        cell.type && cell.type === 'number' ? parseFloat(value) : value;

      grid[row][col] = { ...grid[row][col], value: modifiedValue };
    });
    setEditableSurveyVariablesGrid(grid);
  };

  return (
    <Container>
      <div style={{ display: 'flex', border: '1px solid' }}>
        <DataSheet
          data={participantsGrid}
          valueRenderer={translateValue}
          valueViewer={valueViewer}
        />
        <div style={{ overflowX: 'auto' }}>
          <DataSheet
            data={editableSurveyVariablesGrid}
            valueRenderer={translateValue}
            onCellsChanged={handleCellsChanged}
            valueViewer={valueViewer}
            dataEditor={(props) =>
              props.cell.availableKeysValues ? (
                ValueEditor({ ...props, handleCellsChanged })
              ) : (
                <DataEditor {...props} />
              )
            }
          />
        </div>
      </div>
      <br />
      <div className="d-flex justify-content-end">
        <ButtonGroup className="mr-2">
          <Button
            disabled={modifiedSurveyVariables.length === 0}
            onClick={saveSurveyVariables}
          >
            {t('common.save')}
          </Button>
        </ButtonGroup>
        <ButtonGroup className="mr-2">
          <Button
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
