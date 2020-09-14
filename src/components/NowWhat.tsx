import React, { Fragment } from 'react';
import Input from './select/Input';

import CardDisplay from './card/CardDisply';
import Graph from './charts';
import ChartsData from './charts/ChartsData';
export default () => {
  return (
    <Fragment>
      <Input />
      <CardDisplay />
      <div style={{ marginLeft: '200px' }}>
        <ChartsData />
      </div>
    </Fragment>
  );
};
