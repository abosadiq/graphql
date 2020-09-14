import * as React from 'react';
import { Provider, createClient, useQuery } from 'urql';
import ReactSelect, { ValueType, OptionTypeBase, ActionMeta } from 'react-select';
import { actions } from '../../store/Reducer/metricReducer';
import { useDispatch } from 'react-redux';
import { LinearProgress } from '@material-ui/core';
import { ACTIONS } from '../../store/actions/actions';
const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});
const query = `
   query{
     getMetrics
   }
`;
export default (props: any) => {
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
const MyInput = (props: any) => {
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
    switch (actionMeta.action) {
      case ACTIONS.SELECT_OPTION:
        if (actionMeta.option !== undefined) dispatch(actions.addMetric(actionMeta.option.label));

        break;
      // when select the x button
      case ACTIONS.REMOVE_VALUE:
      case ACTIONS.POP_VALUE:
        if (actionMeta.removedValue !== undefined) {
          dispatch(actions.removeMetric(actionMeta.removedValue.label));
        }
        break;
      // remove all from the store
      case ACTIONS.CLEAR:
        dispatch(actions.removeAllMetric());
        break;
    }
  };
  return (
    <div style={{ width: '700px', float: 'right', margin: '20px 20px 0 0' }}>
      <ReactSelect onChange={handleChange} options={options} isMulti={true} />
    </div>
  );
};
