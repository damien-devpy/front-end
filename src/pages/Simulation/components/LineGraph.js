const {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} = Recharts;
const data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
];
const SimpleLineChart = React.createClass({
  getInitialState() {
    return {
      opacity: {
        uv: 1,
        pv: 1,
        amt: 1,
      },
      dataKeys: {
        uv: "uv",
        pv: "pv",
        amt: "amt",
      },
    };
  },
  handleMouseEnter(o) {
    const { dataKey } = o;
    const { opacity } = this.state;
    const { dataKeys } = this.state;
    console.log(dataKeys);
    console.log(dataKey);
    console.log(dataKeys[dataKey.trim()].trim());
    if (dataKeys[dataKey] === dataKey) {
      this.setState({
        opacity: { ...opacity, [dataKey]: 0 },
        dataKeys: { ...dataKeys, [dataKey]: dataKeys[dataKey] + " " },
      });
    } else {
      this.setState({
        opacity: { ...opacity, [dataKey.trim()]: 1 },
        dataKeys: {
          ...dataKeys,
          [dataKey.trim()]: dataKeys[dataKey.trim()].trim(),
        },
      });
    }
  },

  render() {
    const { opacity } = this.state;
    const { dataKeys } = this.state;
    return (
      <div>
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend onClick={this.handleMouseEnter} />
          <Line
            dataKey={dataKeys.pv}
            strokeOpacity={opacity.pv}
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line
            dataKey={dataKeys.uv}
            strokeOpacity={opacity.uv}
            stroke="#82ca9d"
          />
          <Line
            dataKey={dataKeys.amt}
            strokeOpacity={opacity.amt}
            connectNulls="true"
            stroke="#82c"
          />
        </LineChart>
      </div>
    );
  },
});
