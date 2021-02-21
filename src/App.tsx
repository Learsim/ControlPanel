import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { AppBar, Box, Button, Drawer, IconButton, Toolbar, Typography, Grid, makeStyles, Card, CardContent, CardActions, Fab, Tooltip } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Add, ArrowBackIos, Favorite, Palette } from '@material-ui/icons';
import { green, orange, red, yellow } from '@material-ui/core/colors';
import { Console } from 'console';
import { createMuiTheme } from '@material-ui/core/styles';
import {getClients} from './api/Handler'
import { Client } from './interfaces/Client';
const themes = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#0f0f0f',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar:{
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
  appBarContent:{
display:"flex",
width:"100%",
justifyContent:"space-between",
  },
  title:{textAlign: "center",
  marginTop: "auto",
  marginBottom: "auto"
}
}));

function App() {
  const Cl:Client[] = [];
  let C:Client = {};
  const [Clients, setClients] = useState(Cl);
  const [View, setView] = useState("Clients");
  const [sideBar, setSideBar] = useState(false);
  const [SelectedClient,setClient] = useState(C);
  if(Clients.length ==0){
  getClients()
    .then((result) => {
      setClients(result)
    
    })
    .catch((error) => {
        console.log(error);
    });}
  var l:any[] = [];
  const classes = useStyles();
  let content;
  let x =  Math.random()*30;
  
  Clients.forEach(element => {
    l.push(
      <Grid item xs={6} style={{ maxWidth: "250px" }}>
        <Card className={classes.clientCard} onClick={() => NavigateToClient(element,setView,setClient)}>
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
  }else if(View === "Client"){
    content=(
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
          { View != "Clients" ? 
          (<IconButton edge="start" className="menuButton" color="inherit" aria-label="menu" onClick={() => NavigateTo("Clients",setView, setSideBar)}>
            <ArrowBackIos/>
          </IconButton>)
          : (<div></div>)}
          </div>
        </Toolbar>
      </AppBar>


      <Box component="span" m={1} >
        <Drawer anchor="left" open={sideBar} >
          <div className={classes.sideBar}>
            <Button onClick={() => ToggleSideBar(sideBar, setSideBar)}>Close</Button>
            <Button onClick={() => NavigateTo("Clients", setView, setSideBar)}>Back</Button>
          </div>
        </Drawer>
      </Box>
      {content}


    </div>
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
export default App;


function NavigateToClient(element: Client,viewstatefunc: any,clientstatefunc:any) {
  clientstatefunc(element);
  viewstatefunc("Client");
}

