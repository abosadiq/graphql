import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import ColorHash from 'color-hash';
import Typography from '@material-ui/core/Typography';
//
const useStyles = makeStyles({
  root: {
    width: 200,
    fontWeight: 900,
    fontSize: 30,
    marginLeft: 10,
    height: 100,
  },
});
export default function MyCard(props: any) {
  let { metric, value } = props;

  const classes = useStyles();

  return (
    <Card className={classes.root} style={{ backgroundColor: new ColorHash().hex(metric), color: '#fff' }}>
      <CardContent>
        <Typography variant="h6" component="h6">
          {metric}
        </Typography>
        <Typography variant="h3" component="h3">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
