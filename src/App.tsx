import React, { useState } from 'react';
import { dialog, systemPreferences } from 'electron';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { AppBar, Box, Button, Drawer, IconButton, Toolbar, Typography, Grid, makeStyles, Card, CardContent, CardActions, Fab, Tooltip, Snackbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Add, ArrowBackIos, Favorite, Palette, AirplanemodeActive, AirplanemodeInactive, Refresh } from '@material-ui/icons';
import { green, orange, red, yellow } from '@material-ui/core/colors';
import { getClients, getStatus } from './api/Handler'
import { Client } from './interfaces/Client';
import {Settings} from './pages/settings';
import axios from 'axios';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#252525 !important',
  },
  sideBar: {
    width: "250px"
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  health:
  {
    marginBottom: "auto",
    marginTop: "auto"

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
  clientTitle: {
    fontSize: 24,
    marginBottom: 0
  },
  pos: {
    marginBottom: 12,
  }, content: {

  }, clientCard: {
    flexGrow: 1,
    cursor: "pointer !important"
  }, clientTop: {
    display: "flex",
    justifyContent: "space-between",
  }, subText: {
    textAlign: "left"
  },
  appBarContent: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
  title: {
    textAlign: "center",
    marginTop: "auto",
    marginBottom: "auto"
  }
}));

const Contents = () => {
  const Cl: Client[] = [];
  let C: Client = {};
  const [status, setStatus] = useState(false);
  const [Clients, setClients] = useState(Cl);
  const [View, setView] = useState("Clients");
  const [sideBar, setSideBar] = useState(false);
  const [SelectedClient, setClient] = useState(C);

  if (Clients.length == 0) {
    getClients()
      .then((result) => {
        setClients(result)

      })
      .catch((error) => {
        console.log(error);
      });
  }
  GetStatus(setStatus);

  var l: any[] = [];
  const classes = useStyles();
  let content;
  let x = Math.random() * 30;
  
  Clients.forEach(element => {
    l.push(
      <Grid item xs={6} style={{ maxWidth: "250px" }}>
        <Card className={classes.clientCard} onClick={() => NavigateToClient(element, setView, setClient)}>
          <CardContent>
            <div className={classes.clientTop}>
              <Typography className={classes.clientTitle} color="textPrimary" >
                {element.Name}
              </Typography>
              <Tooltip title={element.connectionState === 1 ? "Online" : "Offline"} aria-label="add " placement="top">

                <Favorite className={classes.health} style={element.connectionState === 1 ? { color: green[500] } : { color: orange[500] }}></Favorite>

              </Tooltip>
            </div >
            <Typography color="textSecondary" className={classes.subText}>{element.Adress}</Typography>

          </CardContent>

          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Grid>);
  });
  for (let i = 0; i < x; i += 1) {
    let randomValue = Math.floor(Math.random() * Math.floor(2));
    let randomValue2 = Math.floor(Math.random() * Math.floor(2));
    let colorValue = randomValue2 === 1 ? { color: red[500] } : { color: orange[500] };


  }
  if (View === "Clients") {
    content = (

      <div className={classes.content}>
        <Fab className={classes.fab} onClick={() => setView("NewClient")}>
          <Add />

        </Fab>
        <div className={classes.clients}>
          <Grid container spacing={3} >
            {l}

          </Grid>

        </div>
      </div>
    );
  } else if (View === "Client") {
    content = (
      <div className={classes.content}>
        {SelectedClient.Name}<br></br>
        {SelectedClient.Adress}<br></br>
        {SelectedClient.ConnectionStateString}<br></br>
        {SelectedClient.Baud}<br></br>
        {SelectedClient.ConnectionTypeString}<br></br>
        {SelectedClient.port}<br></br>
        {SelectedClient.guid}<br></br>
      </div>
    );
  } else if (View === "Settings"){
    content = (<Settings></Settings>)
  }
  document.title = View;

  return (
    <div className="App">

      <AppBar position="static" className={classes.appBar} >
        <Toolbar>
          <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu" onClick={() => ToggleSideBar(sideBar, setSideBar)}>
            <MenuIcon />
          </IconButton>
          <div className={classes.appBarContent}>
            <Typography variant="h6" className={classes.title}>
              {View.replace(/([a-z])([A-Z])/g, '$1 $2')}
            </Typography>
            <div >
              {View != "Clients" ?
                (<IconButton edge="start" className="menuButton" color="inherit" aria-label="menu" onClick={() => NavigateTo("Clients", setView, setSideBar)}>
                  <ArrowBackIos />
                </IconButton>)
                : (<div></div>)}
              
              {status ? (
                <div>
                <Tooltip title={"Online" } aria-label="add " placement="top">
                <AirplanemodeActive className="menuButton" style={{color: green[500]} }></AirplanemodeActive>
                </Tooltip>
                </div>):(
                  <div>
                                    <Tooltip title={"Offline" } aria-label="add " placement="top">

                <AirplanemodeInactive className="menuButton" style={{color: orange[500]} }></AirplanemodeInactive>
                </Tooltip>
                <Tooltip title={"Connect" } aria-label="add " placement="top">

                <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu" onClick={() => ReconnectToSimconnect(setStatus)}>
                  <Refresh />
                </IconButton>
                </Tooltip>
                </div>
                )
                }
            </div>
          </div>
        </Toolbar>
      </AppBar>
       
      <Box component="span" m={1} >
        <Drawer anchor="left" open={sideBar} >
          <div className={classes.sideBar}>
            <Button onClick={() => ToggleSideBar(sideBar, setSideBar)}>Close</Button>
            <Button onClick={() => NavigateTo("Clients", setView, setSideBar)}>Back</Button>
            <Button onClick={() => NavigateTo("Settings", setView, setSideBar)}>Settings</Button>

          </div>
        </Drawer>
      </Box>
      {content}


    </div>
  );
}

export default function App() {
  
  return (
    <Router>
      <Switch>
        <Route path="/" component={Contents} />
      </Switch>
    </Router>
  );
}
function ToggleSideBar(sidebarstate: boolean, sidebarstatefunc: any) {
  sidebarstatefunc(!sidebarstate);
  console.log(sidebarstate);
}
function NavigateTo(view: string, viewstatefunc: any, sidebarstatefunc: any) {
  viewstatefunc(view);
  sidebarstatefunc(false);
}


function NavigateToClient(element: Client, viewstatefunc: any, clientstatefunc: any) {
  clientstatefunc(element);
  viewstatefunc("Client");
  

}
function GetStatus(SetStatus: any) {
  getStatus().then(response => {
    SetStatus(response.SimConnection);

  }).catch((error) => {
    console.log(error);
  });
  
}
function ReconnectToSimconnect(setstatus:any): void {
   axios.post<Boolean>('http://127.0.0.1:8888/api/simconnect/connect').then(response => {setstatus(response)}).catch((error)=> console.log(error));

}

