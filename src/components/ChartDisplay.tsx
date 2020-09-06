import React from 'react';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { Provider, createClient, useQuery, useSubscription, defaultExchanges, subscriptionExchange } from 'urql';
import ChartsData from './ChartsData';

const subscriptionClient = new SubscriptionClient('ws://react.eogresources.com/graphql', {});

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
  exchanges: [subscriptionExchange({ forwardSubscription: subs => subscriptionClient.request(subs) })],
});

const measurementQuery = `
query($input: [MeasurementQuery] ) {
  getMeasurements(input: $input) {
    metric
    at
    value
    unit
  }
}
`;

const measurement_subscription_query = `
subscription{
    newMeasurement{
        metric
        value
        unit
        at
    }
}
`;
const handleSubscription = (measurements: any = [], response: any) => {
  return [response.newMeasurement, ...measurements];
};

export default () => {
  return (
    <Provider value={client}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <ChartsDisply />
      </div>
    </Provider>
  );
};

const ChartsDisply = () => {
  const [result] = useQuery({
    query: measurementQuery,
  });

  const [res] = useSubscription({ query: measurement_subscription_query }, handleSubscription);

  return !res.data ? <h1>NO DATA</h1> : <ChartsData query={result.data} data={res.data} />;
};
