import 'jsoneditor-react/es/editor.min.css';
import Ajv from 'ajv';
import React from 'react';
import { Container } from 'react-bootstrap';
import { JsonEditor as Editor } from 'jsoneditor-react';

const DataEditor = ({ data, schema }) => {
  const ajv = new Ajv({ allErrors: true, verbose: true, coerceTypes: true });

  return (
    <Container>
      <Editor value={data} ajv={ajv} schema={schema} />
    </Container>
  );
};

export default DataEditor;
