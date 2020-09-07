import * as React from 'react';
import { Provider, createClient, useQuery } from 'urql';
import ReactSelect, { ValueType, OptionTypeBase, ActionMeta } from 'react-select';
import { actions } from '../store/Reducer/metricReducer';
import { useDispatch } from 'react-redux';
import { LinearProgress } from '@material-ui/core';
const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});
const query = `
   query{
     getMetrics
   }
`;
export default () => {
  return (
    <Provider value={client}>
      <MyInput />
    </Provider>
  );
};

type OptionType = {
  value: string;
  label: string;
};
const MyInput = () => {
  const [selectedOption, setSelectedOption] = React.useState<ValueType<any>>();
  const [result] = useQuery({
    query,
  });
  const dispatch = useDispatch();
  const { data, error, fetching } = result;
  if (fetching) return <LinearProgress />;

  if (error) return <h1>COULD NO FIND DATA</h1>;
  let options: OptionType[] = [];
  for (let metric of data.getMetrics) {
    options.push({ value: metric, label: metric });
  }

  const handleChange = (value: ValueType<OptionTypeBase>, actionMeta: ActionMeta<OptionTypeBase>) => {
    setSelectedOption(selectedOption as ValueType<any>);
    console.log(`Option selected:`, selectedOption);

    switch (actionMeta.action) {
      case 'select-option':
        console.log('add value the store in metrics');
        if (actionMeta.option !== undefined) dispatch(actions.addMetric(actionMeta.option.label));
        // console.log(actionMeta.option.label)

        break;
      // when select the x button
      case 'remove-value':
      case 'pop-value':
        if (actionMeta.removedValue !== undefined) {
          console.log('removes the value that is pop off');
          dispatch(actions.removeMetric(actionMeta.removedValue.label));
          // console.log(actionMeta.removedValue.label)
        }
        break;
      // remove all from the store
      case 'clear':
        console.log('trigger an action that takes away al metric');
        dispatch(actions.removeAllMetric());
        break;
    }
  };
  return (
    <div style={{ width: '700px', float: 'right', margin: '20px 20px 0 0' }}>
      <ReactSelect value={selectedOption as ValueType<any>} onChange={handleChange} options={options} isMulti={true} />
    </div>
  );
};
