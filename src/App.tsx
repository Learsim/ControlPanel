import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { AppBar, Box, Button, Drawer, IconButton, Toolbar, Typography, Grid, makeStyles, Card, CardContent, CardActions, Fab, Tooltip } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Add, Favorite } from '@material-ui/icons';
import { green, orange, red, yellow } from '@material-ui/core/colors';
import { Console } from 'console';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
  }
}));
function App() {
  const [View, setView] = useState("Clients");
  const [sideBar, setSideBar] = useState(false);

  var l = [];
  const classes = useStyles();
  let content;
  for (let i = 0; i < 10; i += 1) {
    let randomValue = Math.floor(Math.random() * Math.floor(2));
    let randomValue2 = Math.floor(Math.random() * Math.floor(2));
    let colorValue = randomValue2 === 1 ? { color: red[500] } : { color: orange[500] };

    l.push(
      <Grid item xs={6} style={{ maxWidth: "250px" }}>
        <Card className={classes.clientCard} onClick={() => setView("ClientView")}>
          <CardContent>
            <div className={classes.clientTop}>
              <Typography className={classes.clientTitle} color="textPrimary" >
                Client {i}
              </Typography>
              <Tooltip title={randomValue === 1 ? "Online" : "Offline"} aria-label="add " placement="top">

                <Favorite className={classes.health} style={randomValue === 1 ? { color: green[500] } : colorValue}></Favorite>

              </Tooltip>
            </div >
            <Typography color="textSecondary" className={classes.subText}>Client {i} subtext</Typography>

          </CardContent>

          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Grid>);
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
  }
  document.title = View;

  return (
    <div className="App">

      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu" onClick={() => ToggleSideBar(sideBar, setSideBar)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="title">
            {View.replace(/([a-z])([A-Z])/g, '$1 $2')}
          </Typography>
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


