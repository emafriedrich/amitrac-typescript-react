import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TruckDrivers from '../truckDrivers';
import Trucks from '../trucks';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    },
  },
  trucks: {
    marginTop: '50px !important',
    width: '100% !important'
  }
}));


function ShowAffiliate({ selectedAffiliate }) {
  const classes = useStyles();
  const [companyName, setCompanyName] = useState(selectedAffiliate?.companyName);
  const [cuit, setCuit] = useState(selectedAffiliate?.cuit);
  const [credentialNumber, setCredentialNumber] = useState(selectedAffiliate?.credentialNumber);
  const [credentialExpiration, setCredentialExpiration] = useState(selectedAffiliate?.credentialExpiration);
  const [lastAffiliate, setLastAffiliate] = useState(selectedAffiliate);

  if (!selectedAffiliate) {
    return null;
  } else if (lastAffiliate?.id !== selectedAffiliate.id) {
    setLastAffiliate(selectedAffiliate);
    setCompanyName(selectedAffiliate.companyName);
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="outlined-basic" label="Nombre del socio" variant="outlined" value={companyName} onChange={(event) => setCompanyName(event.target.value) } />
      <TextField id="outlined-basic" label="CUIT" variant="outlined" value={cuit} onChange={(event) => setCuit(event.target.value)}/>
      <TextField id="outlined-basic" label="Número de credencial" variant="outlined" value={credentialNumber} onChange={(event) => setCredentialNumber(event.target.value)}/>
      <KeyboardDatePicker  disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={credentialExpiration}
          onChange={(date) => {setCredentialExpiration(date)}} ></KeyboardDatePicker>
      <TruckDrivers></TruckDrivers>
      <div className={classes.trucks}>
        <Trucks></Trucks>
      </div>
    </form>
  );
}

const mapStateToProps = (state) => ({ selectedAffiliate: state.selectedAffiliate });

export default connect(mapStateToProps)(ShowAffiliate);