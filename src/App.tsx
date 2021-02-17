import React, { useState } from 'react';

import './App.css';
import { AppBar,  Box, Button, Drawer, IconButton, Toolbar, Typography, Grid, makeStyles, Card, CardContent, CardActions, Fab,  Tooltip } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Add, Favorite } from '@material-ui/icons';
import { green, red } from '@material-ui/core/colors';
import { Console } from 'console';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  health:
  {
    position: 'relative',
    right: theme.spacing(2)
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
  },content: {
   
  },clientCard: {
   cursor: "pointer !important" 
  },
}));
function App() {
  const [View,setView] = useState("Clients");
  const [sideBar,setSideBar] = useState(false);
  
  var l = [];
  const classes = useStyles();
  let content;
  for (let i = 0; i < 10; i += 1) {
    let randomValue = Math.floor(Math.random() * Math.floor(2));
    l.push(
      <Grid item xs={6} style={{ maxWidth: "250px" }}>
        <Card className={classes.root + classes.clientCard} onClick={()=>setView("ClientView")}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Client {i}
            </Typography>
            <Tooltip title={randomValue === 1 ? "Online" : "Offline"} aria-label="add " placement="top">
              <Favorite className={classes.health} style={randomValue === 1 ? { color: green[500] } : { color: red[500] }}></Favorite>

            </Tooltip>


          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Grid>);
  }
  if(View === "Clients"){
    content = (
      <div className={classes.content}>
      <Fab className={classes.fab} onClick={()=>setView("NewClient")}>
      <Add />

    </Fab>
    <div className={classes.clients}>
      <Grid container spacing={3} >
        
      {l}
     
      </Grid>
      
    </div>
    </div>
    );
  }
  return (
    <div className="App">

      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu" >
            <MenuIcon onClick={()=>ToggleSideBar(sideBar,setSideBar)}/>
          </IconButton>
          <Typography variant="h6" className="title">
            {View}
    </Typography>
        </Toolbar>
      </AppBar>


      <Box component="span" m={1}>
        <Drawer anchor="left" open={sideBar} >
          <Button onClick={()=>ToggleSideBar(sideBar,setSideBar)}>Close</Button>
          <Button onClick={()=>setView("Clients")}>Back</Button>

        </Drawer>
      </Box>
      {content}


    </div>
  );
}

function clickHandler() {
  console.log("xd")
}
function ToggleSideBar(sidebarstate:boolean,sidebarstatefunc:any){
  sidebarstatefunc(!sidebarstate);
  console.log(sidebarstate);
}
export default App;


