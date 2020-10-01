import React, { useEffect, useRef } from 'react';

const DataEditor = ({
  value,
  onKeyDown,
  onChange,
  cell: { min = 0, max = 100, type = 'string' } = {},
}) => {
  const inputRef = useRef();
  const inputMode = type === 'string' ? 'text' : 'decimal';
  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <input
      ref={inputRef}
      inputMode={inputMode}
      type={type}
      // min={min}
      // max={max}
      className="data-editor"
      value={value}
      onChange={handleChange}
      onKeyDown={onKeyDown}
    />
  );
};

export default DataEditor;
