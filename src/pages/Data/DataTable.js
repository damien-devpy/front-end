/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Card, Container, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTable } from 'react-table';
import { useTranslation } from 'react-i18next';

import CardHeader from '../../components/CardHeader';
import Loading from '../../components/Loading';
import { selectParticipantsEntity } from '../../selectors/workshopSelector';
import { useWorkshop } from '../../hooks/workshop';

function CustomTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <Table {...getTableProps()} borderless responsive>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

const Data = ({
  match: {
    params: { workshopId },
  },
}) => {
  const { t } = useTranslation();
  const { error, isLoading } = useWorkshop(workshopId);

  const participants = useSelector(selectParticipantsEntity);

  const surveyVariablesFields =
    participants &&
    Object.keys(participants)[0] &&
    Object.keys(participants[Object.keys(participants)[0]].surveyVariables);

  const data = Object.keys(participants).map((p) => ({
    participant: `${participants[p].firstName} ${participants[p].lastName[0]}.`,
    ...participants[p].surveyVariables,
  }));

  const columns = surveyVariablesFields && [
    {
      Header: 'Participant',
      accessor: 'participant',
    },
    ...surveyVariablesFields.map((field) => ({
      Header: field,
      accessor: field, // accessor is the "key" in the data
    })),
  ];

  return (
    <Loading error={error} isLoading={isLoading}>
      <Container>
        <Card
          className="p-5 border-light shadow-sm"
          style={{ borderRadius: 10 }}
        >
          <CardHeader>
            <h2>{t('common.data')}</h2>
          </CardHeader>
          <hr />
          {participants && surveyVariablesFields && (
            <CustomTable columns={columns} data={data} />
          )}
        </Card>
      </Container>
    </Loading>
  );
};

export default Data;
