import React from 'react';
import ColorHash from 'color-hash';
import { Legend, Tooltip, LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

let getTime = (props: any) => {
  let date = new Date(props.time);
  let time = date.toLocaleString([], { hour: '2-digit', minute: '2-digit' });
  return time;
};

class Graph extends React.Component<any> {
  shouldComponentUpdate(nextprops: any, nextstate: any) {
    if (nextprops.data.length === this.props.data.length) return false;
    return true;
  }
  render() {
    let { data: realdata, measurement, metrics }: any = this.props;
    if (metrics.length === 0) return null;

    return (
      <LineChart width={window.screen.width - 200} height={window.screen.height - 500} data={realdata}>
        <Legend />
        <Tooltip />
        <CartesianGrid strokeDasharray="3" fillOpacity={1} vertical={false} horizontal={false} />

        {metrics.map((items: string) => (
          <Line
            key={items}
            yAxisId={measurement[items].points[0].unit}
            type="monotone"
            dataKey={items}
            stroke={new ColorHash().hex(items)}
            strokeOpacity="1"
            isAnimationActive={false}
            dot={false}
          />
        ))}
        {metrics.map((items: string) => (
          <YAxis key={items + 1} yAxisId={measurement[items].points[0].unit} dataKey={items} domain={[-80, 1500]} />
        ))}
        <XAxis dataKey={getTime} />
      </LineChart>
    );
  }
}
export default Graph;
