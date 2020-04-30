import React from "react";
import { Table, Button } from "react-bootstrap";
import moment from "moment";

const WorkshopTable = ({ workshops, t, handleDelete }) => {
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
            (
              { date, workshopName, status, coachName, action },
              workshopKey
            ) => {
              return (
                <tr key={workshopKey}>
                  <td>{moment(date).format("L")}</td>
                  <td>{workshopName}</td>
                  <td>{status}</td>
                  <td>{coachName}</td>
                  <td>
                    <Button variant="light mr-1">
                      <span
                        role="img"
                        description={t("common.seeWorkshop")}
                        style={{ textAlign: "center" }}
                      >
                        👀
                      </span>
                    </Button>
                    <Button
                      variant="light"
                      onClick={() => handleDelete(workshopKey)}
                    >
                      <span role="img" description={t("common.deleteWorkshop")}>
                        ❌
                      </span>
                    </Button>
                  </td>
                </tr>
              );
            }
          )}
      </tbody>
    </Table>
  );
};

export default WorkshopTable;
