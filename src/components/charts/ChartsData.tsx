import * as React from 'react';
import { Provider, createClient, useQuery } from 'urql';
import Charts from './Charts';
import LinearProgress from '@material-ui/core/LinearProgress';
const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});
const query = `
query {
  heartBeat
}
`;
export default (props: any) => {
  return (
    <Provider value={client}>
      <ChartData {...props} />
    </Provider>
  );
};

const ChartData = (props: any) => {
  const [result] = useQuery({
    query,
  });

  const { fetching, data, error } = result;
  const Data = fetching || error || !data ? <LinearProgress /> : <Charts {...props} />;
  return Data;
};
