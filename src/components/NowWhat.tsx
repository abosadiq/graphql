import React, { Fragment } from 'react';
import Input from './Input';
import ChartsDisplay from './ChartDisplay';
import CardDisplay from './CardDisply';
export default () => {
  return (
    <Fragment>
      <Input />
      <CardDisplay />
      <ChartsDisplay />
    </Fragment>
  );
};
