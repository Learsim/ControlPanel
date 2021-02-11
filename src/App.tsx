import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { AppBar, Box, Breadcrumbs, Button, Drawer, IconButton, Link, Snackbar, Switch, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
function App() {
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
<Breadcrumbs aria-label="breadcrumb">
  <Link color="inherit" href="/" >
    Material-UI
  </Link>
  <Link color="inherit" href="/getting-started/installation/" >
    Core
  </Link>
  <Typography color="textPrimary">Breadcrumb</Typography>
</Breadcrumbs>
<Snackbar open={true} autoHideDuration={10}>
  <a>test</a>
</Snackbar>

    </div>
  );
}

export default App;


