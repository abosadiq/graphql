import * as React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';
import './charts.css';
const useStyles = makeStyles({
  card: {
    margin: 'flex',
  },
});
export default ({ data }: any) => {
  const classes = useStyles();
  let arr = [];
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      arr.push(data[key]);
    }
  }

  let getTime = (x: any) => {
    let milliseconds = x.at;
    milliseconds = milliseconds - 5 * 60 * 1000;
    let date = new Date(milliseconds);
    let time = date.toLocaleString([], { hour: '2-digit', minute: '2-digit' });
    console.log(time, 'oooooo8888');
    return time;
  };

  return (
    <Card className={classes.card}>
      <LineChart width={1000} height={500} data={data}>
        <YAxis unit={data.unit} type="number" domain={['auto', 'auto']} />

        <XAxis dataKey={getTime} />
        <Legend />
        <Tooltip />
        <CartesianGrid strokeDasharray="3" fillOpacity={1} vertical={false} horizontal={false} />
        <Line
          name={data[4].metric}
          unit={data[4].unit}
          type="monotone"
          dataKey="value"
          stroke="#82ca9d"
          activeDot={{ r: 5 }}
          strokeOpacity="1"
          key="value"
          isAnimationActive={false}
          dot={false}
        />
        {/* <Line
          name={data[3].metric}
          unit={data[3].unit}
          type="monotone"
          dataKey="value"
          stroke="#82ca"
          activeDot={{ r: 5 }}
          strokeOpacity="1"
          key="value"
          isAnimationActive={false}
          dot={false}
        /> */}
      </LineChart>
    </Card>
  );
};
