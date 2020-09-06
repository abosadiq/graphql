import * as React from 'react';
import { Provider, createClient, useQuery } from 'urql';
import ReactSelect, { ValueType } from 'react-select';
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
const MyInput = () => {
  const [selectedOption, setSelectedOption] = React.useState<ValueType<any>>();
  const [result] = useQuery({
    query,
  });

  const handleChange = (selectedOption: ValueType<any>) => {
    setSelectedOption(selectedOption as ValueType<any>);
    console.log(`Option selected:`, selectedOption);
  };
  const { data } = result;
  let arr = [];
  let myData = [];
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      arr.push(data[key]);
    }
  }

  for (let data in arr) {
    for (let i of arr[data]) {
      myData.push({ value: i, label: i });
    }
  }

  return (
    <div style={{ width: '700px', float: 'right', margin: '20px 20px 0 0' }}>
      <ReactSelect
        value={selectedOption as ValueType<any>}
        onChange={selectedOption => handleChange(selectedOption)}
        options={myData}
        isMulti={true}
      />
    </div>
  );
};
