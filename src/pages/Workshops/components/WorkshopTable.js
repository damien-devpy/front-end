import React from "react";
import { Table } from "react-bootstrap";
import moment from "moment";

const WorkshopTable = ({ workshops, t }) => {
  return (
    <Table borderless striped hover>
      <thead>
        <tr>
          <th>{t("common.date")}</th>
          <th>{t("common.workshopName")}</th>
          <th>{t("common.workshopStatus")}</th>
          <th>{t("common.coach")}</th>
          <th>{t("common.actions")}</th>
        </tr>
      </thead>
      <tbody>
        {workshops &&
          workshops.map(
            ({ date, name, status, coachName, action }, workshopKey) => (
              <tr key={workshopKey}>
                <td>{moment(date).format("L")}</td>
                <td>{name}</td>
                <td>{status}</td>
                <td>{coachName}</td>
                <td>{action}</td>
              </tr>
            )
          )}
      </tbody>
    </Table>
  );
};

export default WorkshopTable;
