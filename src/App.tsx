import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { AppBar,Paper, Box, Breadcrumbs, Button, Drawer, IconButton, Link, Snackbar, Switch, Toolbar, Typography, Grid, makeStyles, Card, CardContent, CardActions } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: "275px",
    cursor: "pointer"
  },
  clients: {
    margin: "0px 20px 0px 20px"
  }, bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

function App() {
  var l = [];
  const classes = useStyles();
  for (let i = 0; i < 10; i += 1) {
    l.push(
    <Grid item xs={4} style = {{maxWidth: "250px"}}>
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Word of the Day
        </Typography>
            <Typography variant="h5" component="h2">
              be{i}nev{i}o{i}lent
        </Typography>
            <Typography className={classes.pos} color="textSecondary">
              adjective
        </Typography>
            <Typography variant="body2" component="p">
              well meaning and kindly.
          <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
    </Grid>)
  }
  return (
    <div className="App">
      <AppBar position="static">
  <Toolbar>
    <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu" >
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" className="title">
      News
    </Typography>
    <Button color="inherit">Login</Button>
  </Toolbar>
</AppBar>
      <Box component="span" m={1}>
      <Drawer anchor="left" open={false} >
      <Button>xd</Button> 
    </Drawer>
      </Box>
      <div className={classes.clients}>
        <Grid container spacing={3} >
          
        {l}
       
      </Grid>
      </div></div>
  );
}

function clickHandler() {
  console.log("xd")
}
export default App;


