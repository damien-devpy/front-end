import React from "react";
import { Table, Button } from "react-bootstrap";

const CoachTable = ({ coaches, t }) => (
  <Table borderless className="table-responsive">
    <thead>
      <tr>
        <th>{t("common.firstName")}</th>
        <th>{t("common.lastName")}</th>
        <th>{t("common.lastWorkshop")}</th>
        <th>{t("common.email")}</th>
        <th>{t("common.role")}</th>
        <th>{t("common.city")}</th>
        <th>{t("common.workshops")}</th>
        <th>{t("common.sensitized")}</th>
        <th>{t("common.actions")}</th>
      </tr>
    </thead>
    <tbody>
      {coaches &&
        coaches.map(
          (
            {
              firstName,
              lastName,
              email,
              role,
              lastWorkshopDate,
              numberOfWorkshops,
              sensitized,
              action,
              city
            },
            coachKey
          ) => (
            <tr key={coachKey}>
              <td>{firstName}</td>
              <td>{lastName}</td>
              <td>{lastWorkshopDate}</td>
              <td>{email}</td>
              <td>{role}</td>
              <td>{city}</td>
              <td>{numberOfWorkshops}</td>
              <td>{sensitized}</td>
              <td>
                <Button variant="light">
                  <span role="img" description={t("common.editCoach")}>
                    ✏️
                  </span>
                </Button>
              </td>
            </tr>
          )
        )}
    </tbody>
  </Table>
);
export default CoachTable;
