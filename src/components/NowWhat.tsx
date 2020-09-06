import React, { Fragment } from 'react';
import Input from './Input';
import ChartsDisplay from './ChartDisplay';

export default () => {
  return (
    <Fragment>
      <Input />
      <ChartsDisplay />
    </Fragment>
  );
};
