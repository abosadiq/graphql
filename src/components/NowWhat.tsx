import React, { Fragment } from 'react';
import Input from './select/Input';
import ChartsDisplay from './charts/ChartDisplay';
import CardDisplay from './card/CardDisply';
import Graph from './charts';
export default () => {
  return (
    <Fragment>
      <Input />
      <CardDisplay />
      {/* <ChartsDisplay /> */}
      <Graph />
    </Fragment>
  );
};
