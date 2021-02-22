import { Button, TextField } from '@material-ui/core';
import React from 'react';

export class Settings extends React.Component{
render(){
    return (
    <form className="settingsForm" noValidate autoComplete="off">
    <div>
    <TextField id="outlined-basic" label="Server Adress" variant="outlined" />
    </div>
    <div>
    <Button variant="outlined">Discard</Button>
    <Button  variant="contained" color="primary">Save</Button>
    </div>


  </form>)
}
}