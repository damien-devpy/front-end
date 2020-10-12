import React from 'react';
import { Form } from 'react-bootstrap';

const YearDropDown = ({ selectedYear, years, setYear }) => {
  const yearOptions = [];
  years.forEach((year) => {
    yearOptions.push(
      <option key={year} id={year} value={year}>
        {year}
      </option>
    );
  });
  return (
    <Form.Control
      custom
      as="select"
      size="sm"
      id="dropdown"
      name="year"
      value={selectedYear || null}
      onChange={(e) => setYear(e.target.value)}
    >
      <option key="intial value">Sélectionner l&rsquo;année</option>
      {yearOptions}
    </Form.Control>
  );
};

export default YearDropDown;
