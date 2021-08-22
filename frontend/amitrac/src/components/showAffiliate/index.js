import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TruckDrivers from '../truckDrivers';
import Trucks from '../trucks';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { saveAffiliateInit } from '../../redux/affiliates/actions';
import ChangePasswordModal from './changePasswordModal';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2)
    },
  },
  trucks: {
    marginTop: '50px !important',
    width: '100% !important'
  }
}));

function ShowAffiliate({ dispatch, selectedAffiliate }) {

  const classes = useStyles();
  const [companyName, setCompanyName] = useState(selectedAffiliate?.companyName);
  const [cuit, setCuit] = useState(selectedAffiliate?.cuit);
  const [credentialNumber, setCredentialNumber] = useState(selectedAffiliate?.credentialNumber);
  const [credentialExpiration, setCredentialExpiration] = useState(selectedAffiliate?.credentialExpiration || new Date());
  const [lastAffiliate, setLastAffiliate] = useState(selectedAffiliate);
  const [initialPassword, setInitialPassword] = useState('');
  const [username, setUsername] = useState('');
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);

  if (!selectedAffiliate) {
    return null;
  } else if (lastAffiliate?.id !== selectedAffiliate?.id) {
    setLastAffiliate(selectedAffiliate);
    setCompanyName(selectedAffiliate.companyName);
    setCuit(selectedAffiliate.cuit);
    setCredentialNumber(selectedAffiliate.credentialNumber);
    setCredentialExpiration(selectedAffiliate.credentialExpiration);
    setUsername(selectedAffiliate.user?.name);
  }

  const saveBaseData = () => {
    dispatch(saveAffiliateInit({
      id: selectedAffiliate.id,
      cuit,
      credentialNumber,
      credentialExpiration,
      companyName,
      username,
      initialPassword,
    }));
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField label="Nombre del socio" variant="outlined" value={companyName} onChange={(event) => setCompanyName(event.target.value) } />
      <TextField label="CUIT" variant="outlined" value={cuit} onChange={(event) => setCuit(event.target.value)}/>
      <TextField label="Número de credencial" variant="outlined" value={credentialNumber} onChange={(event) => setCredentialNumber(event.target.value)}/>
      { !selectedAffiliate.id &&
        <>
          <TextField
            label="Nombre de usuario inicial"
            variant="outlined"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          label="Contraseña inicial"
          variant="outlined"
          value={initialPassword}
          onChange={(event) => setInitialPassword(event.target.value)}
        />
      </>
      }
      <KeyboardDatePicker  disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Fecha expiración credencial"
          inputVariant="outlined"
          value={credentialExpiration}
          onChange={(date) => {setCredentialExpiration(date)}} >
      </KeyboardDatePicker>
      <Button onClick={saveBaseData}>Guardar</Button>
      <Button onClick={() => setOpenChangePasswordModal(true)}>Cambiar contraseña</Button>
      { selectedAffiliate.id && <TruckDrivers></TruckDrivers> }
      { selectedAffiliate.id &&
        <div className={classes.trucks}>
          <Trucks></Trucks>
        </div>
      }
      <ChangePasswordModal
        open={openChangePasswordModal}
        setOpen={setOpenChangePasswordModal}
        username={username}
      ></ChangePasswordModal>
    </form>
  );
}

const mapStateToProps = (state) => ({ selectedAffiliate: state.selectedAffiliate });

export default connect(mapStateToProps)(ShowAffiliate);