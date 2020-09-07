import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//
const useStyles = makeStyles({
  root: {
    width: 200,
    fontWeight: 900,
    fontSize: 30,
    marginLeft: 10,
  },
});
// {metric : string, value: number}
export default function MyCard(props: any) {
  let { metric, value } = props;

  console.log(props, 'props from card');
  const classes = useStyles();
  // console.log(props);
  // const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
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
