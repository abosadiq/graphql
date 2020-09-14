import * as React from 'react';
import { createClient } from 'urql';
import { connect } from 'react-redux';
import Graph from './index';
const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});
const measurementQuery = `
query($input: [MeasurementQuery] ) {
  getMultipleMeasurements(input: $input) {
    metric
    measurements{
      at,
      value,
      unit,
    }
  }
}
`;

class ChartsData extends React.Component<any, any> {
  timer: number;
  constructor(props: any) {
    super(props);
    this.state = {
      initial: [],
      data: [],
      metrics: [],
    };
    this.timer = setInterval(this.fourSecondRule, 4000);
  }

  componentDidUpdate() {
    if (this.state.metrics.length < this.props.metrics.length) {
      this.ApiCall(this.props.metrics);
    }
  }

  fourSecondRule = () => {
    // console.log(manipulate(this.props.measurement));
    this.setState({ data: [...this.state.initial, ...manipulate(this.props.measurement)] });
  };
  ApiCall = (metrics: string[]) => {
    const current_time = new Date().valueOf();
    client
      .query(measurementQuery, {
        input: metrics.map((metricName: string) => {
          return { metricName, after: current_time - 1800000, before: current_time };
        }),
      })
      .toPromise()
      .then(({ data: { getMultipleMeasurements } }: any) => {
        let state: {
          [metric: string]: {
            name: string;
            utc: boolean;
            columns: string[];
            points: { time: number; value: number; unit: string }[];
          };
        } = {};
        for (let metricdata of getMultipleMeasurements) {
          state[metricdata.metric] = {
            name: metricdata.metric,
            utc: true,
            columns: ['time', 'value', 'unit'],
            points: metricdata.measurements.map(({ at, value, unit }: any) => {
              return { time: at, value, unit };
            }),
          };
        }
        let data = manipulate(state);
        this.setState({ initial: data, data, metrics });
      });
  };
  render() {
    const { metrics, measurement } = this.props;
    return <Graph data={this.state.data} measurement={measurement} metrics={metrics} />;
  }
}
export default connect(mapStateToProps)(ChartsData);

function mapStateToProps(state: any) {
  return {
    metrics: state.metric.metrics,
    measurement: state.measurement,
  };
}
function manipulate(measurements: any): { [metric: string]: number; time: number }[] {
  let data: { [metric: string]: number; time: number }[] = [];
  for (let metric in measurements) {
    let length = measurements[metric].points.length;
    for (let idx = 0; idx < length; idx++) {
      if (data[idx] === undefined) {
        data.push({ [metric]: measurements[metric].points[idx].value, time: measurements[metric].points[idx].time });
      } else {
        data[idx] = { ...data[idx], [metric]: measurements[metric].points[idx].value };
      }
    }
  }
  return data;
}
