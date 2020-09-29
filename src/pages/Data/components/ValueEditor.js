import React from 'react';

const ValueEditor = ({
  cell,
  cell: { value: valueFromGrid },
  cell: { availableKeysValues },
  col,
  row,
  onChange,
  handleCellsChanged,
}) => {
  const handleChange = ({ target: { value: newValue } }) => {
    onChange(newValue);

    handleCellsChanged([{ cell, row, col, value: newValue }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <select value={valueFromGrid} onChange={handleChange}>
        {availableKeysValues.map(({ key, value }) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
    </form>
  );
};

export default ValueEditor;
