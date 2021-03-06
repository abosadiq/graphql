import React, { useEffect } from 'react';
// import { SubscriptionClient } from 'subscriptions-transport-ws';
// import { Provider, createClient, useQuery, useSubscription, subscriptionExchange } from 'urql';
// import ChartsData from './ChartsData';
// import { IState } from '../../store';
// import { actions } from '../../store/Reducer/measurement.reducer';
// import { useDispatch, useSelector } from 'react-redux';
// import { Input } from '@material-ui/core';
// const subscriptionClient = new SubscriptionClient('ws://react.eogresources.com/graphql', {});

// const client = createClient({
//   url: 'https://react.eogresources.com/graphql',
//   exchanges: [subscriptionExchange({ forwardSubscription: subs => subscriptionClient.request(subs) })],
// });

// const measurementQuery = `
// query($input: MeasurementQuery! ) {
//   getMeasurements(input: $input) {
//     metric
//       at
//     value
//     unit
//   }
// }
// `;

// const measurement_subscription_query = `
// subscription{
//     newMeasurement{
//         metric
//         value
//         unit
//         at
//     }
// }
// `;
// const handleSubscription = (measurements: any = [], response: any) => {
//   return [...measurements, response.newMeasurement];
// };
// export default (props: any): JSX.Element => {
//   const [filter, setFilter] = React.useState();
//   return (
//     <Provider value={client}>
//       <div style={{ position: 'absolute', top: '60%', left: '50%', transform: 'translate(-50%, -50%)' }}>
//         <ChartsDisply filter={filter} />
//       </div>
//     </Provider>
//   );
// };

// const ChartsDisply = (props: any) => {
//   const [result] = useQuery({
//     query: measurementQuery,
//   });

//   const dispatch = useDispatch();

//   const [{ data, error }] = useSubscription({ query: measurement_subscription_query }, handleSubscription);

//   useEffect(() => {
//     if (error) {
//       dispatch(actions.ErrorReceived({ error: error.message }));
//       return;
//     }
//     if (!data) return;
//     dispatch(actions.addLatestMetric(data[data.length - 1]));
//   }, [dispatch, data, error]);

//   return !data ? <h1>NO DATA</h1> : <ChartsData query={result.data} data={data} />;
// };
