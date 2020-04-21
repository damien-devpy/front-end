import React from "react";
import { useTranslation } from "react-i18next";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import DefaultLegendContent from 'recharts/lib/component/DefaultLegendContent';


const colors = [
  ["#FF0000", "#C00001", "#700001", "#C33E01", "#FFCCFF"],
  ["#1E4E79", "#2E75B6", "#7BD7EE"],
  ["#7F6001", "#B58D0D", "#DEC268", "#FFCF34"],
  ["#385723", "#70AD47", "#A9D18E"],
  ["#ED7D31"],
];
const categories = (footprint) =>
  footprint.map((sectorData) => Object.keys(sectorData).slice(1));

const footprintDataBar = (footprint, t) => {
  console.log("categs", categories(footprint));
  return categories(footprint).map((sector, s) =>
    sector.map((categ, c) => (
      <Bar
        name={t(`common.${categ}`)}
        dataKey={categ}
        stackId="a"
        fill={colors[s][c]}
      />
    ))
  );
};

const renderLegend = (props) => {
  const { payload, footprint } = props;
  console.log("payload", payload);
  console.log("footprint", footprint );

  var newProps = props
  newProps.layout = "vertical";
  return (
      <div className="legend" style={{display: "table-row", width:"100%" }}> 
    {footprint.map(sectorData => 
      { newProps.payload = payload.filter((entry)=> Object.keys(sectorData).includes(entry.dataKey))
     return ( <div className="legend-sector" style={{display: "table-cell", paddingRight: "20px", width: "auto", fontSize: 14}}> 
      <h6> {sectorData.sector} </h6>
      <DefaultLegendContent {...newProps} />
          </div>)}
          )
      }
      </div>
          )
          
};

const FootprintGraph = ({ footprint }) => {
  const { t } = useTranslation();

  return (
    <BarChart
      width={600}
      height={400}
      data={footprint}
      margin={{
        top: 20,
        right: 10,
        left: 10,
        bottom: 5,
      }}
      barCategoryGap="10"
    >
      <CartesianGrid strokeDasharray="3" />
      <XAxis dataKey="sector" />
      <YAxis dataKey="" />
      <Tooltip />
      <Legend layout = "vertical" footprint = {footprint} content = {renderLegend} />
      {footprintDataBar(footprint, t)}
    </BarChart>
  );
};

export default FootprintGraph;
