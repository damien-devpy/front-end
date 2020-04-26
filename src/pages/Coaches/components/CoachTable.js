import React from "react";
import { Table } from "react-bootstrap";

const CoachTable = ({ coaches, t }) => (
  <Table borderless striped hover>
    <thead>
      <tr>
        <th>{t("common.firstName")}</th>
        <th>{t("common.lastName")}</th>
        <th>{t("common.dateOfLastWorkshop")}</th>
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
          ({
            firstName,
            lastName,
            email,
            role,
            lastWorkshopDate,
            numberOfWorkshops,
            workshops,
            sensitized,
            actions,
            city
          }) => (
            <tr>
              <td>{firstName}</td>
              <td>{lastName}</td>
              <td>{lastWorkshopDate}</td>
              <td>{email}</td>
              <td>{role}</td>
              <td>{city}</td>
              <td>{workshops}</td>
              <td>{sensitized}</td>
              <td>{actions}</td>
            </tr>
          )
        )}
    </tbody>
  </Table>
);
export default CoachTable;
