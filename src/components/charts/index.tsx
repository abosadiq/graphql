import React from 'react';
import { Provider, createClient, useQuery } from 'urql';
import { useDispatch, useSelector } from 'react-redux';
import { Legend, Tooltip, LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { IState } from '../../store';
import ColorHash from 'color-hash';
const getMetric = (state: IState) => {
  const { metric, measurement } = state;
  console.log(state, 'my state');
  return {
    metric,
    measurement,
  };
};

let getTime = (props: any) => {
  let milliseconds = props.time;
  let date = new Date(milliseconds);
  let time = date.toLocaleString([], { hour: '2-digit', minute: '2-digit' });

  return time;
};

export default () => {
  const { metric, measurement } = useSelector(getMetric);
  manipulate(measurement);
  if (metric.metrics.length === 0) return null;

  return (
    <div>
      <LineChart width={window.screen.width - 200} height={window.screen.height - 500} data={manipulate(measurement)}>
        <Legend />
        <Tooltip />
        <CartesianGrid strokeDasharray="3" fillOpacity={1} vertical={false} horizontal={false} />

        {metric.metrics.map((items: string) => (
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
        {metric.metrics.map((items: string) => (
          <YAxis key={items + 1} yAxisId={measurement[items].points[0].unit} dataKey={items} />
        ))}
        <XAxis dataKey={getTime} />
      </LineChart>
    </div>
  );
};

function manipulate(measurements: any): { [metric: string]: number; time: number }[] {
  let data: any = [];
  for (let metric in measurements) {
    let length = measurements[metric].points.length;
    for (let index = 0; index < length; index++) {
      if (data[index] === undefined) {
        data.push({
          [metric]: measurements[metric].points[index].value,
          time: measurements[metric].points[index].time,
        });
      } else {
        data[index] = { ...data[index], [metric]: measurements[metric].points[index].value };
      }
    }
  }
  return data;
}
