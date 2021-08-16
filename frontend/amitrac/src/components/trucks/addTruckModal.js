import { Button, makeStyles, Modal, TextField } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { useState } from 'react';
import { connect } from 'react-redux';
import { saveTruckInit } from '../../redux/affiliates/actions';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 4, 3),
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    margin: '30px'
  },
  button: {
    width: '50%',
    margin: 'auto',
    marginTop: '30px'
  },
  marginTextField: {
    marginBottom: '15px'
  },
}));

function AddTruckModal ({ open, setOpen, selectedAffiliate, saveTruckAction }) {
  const styles = useStyles();
  const [patent, setPatent] = useState('');
  const [brand, setBrand] = useState('');
  const [vtvExpiration, setVtvExpiration] = useState(new Date());
  const [assuranceExpiration, setAssuranceExpiration] = useState(new Date());
  const [patentExpiration, setPatentExpiration] = useState(new Date());
  const saveTruck = () => {
    if (!patent || !brand) {
      alert('Todos los valores son obligatorios');
    } else {
      saveTruckAction({
        affiliateId: selectedAffiliate.id,
        patent,
        brand,
        vtvExpiration,
        assuranceExpiration,
        patentExpiration,
      })
    }
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={styles.modal}
      title="Nuevo camionero"
      >
        <form className={styles.paper} noValidate autoComplete="off">
          <h3>Nuevo camión</h3>
          <TextField
            className={styles.marginTextField}
            variant="outlined"
            label="Patente"
            value={patent}
            onChange={(event) => setPatent(event.target.value)}>
          </TextField>
          <TextField
            className={styles.marginTextField}
            variant="outlined"
            label="Marca del camión"
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
            >
          </TextField>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            inputVariant="outlined"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Fecha de expiración de la vtv"
            value={vtvExpiration}
            onChange={(date) => setVtvExpiration(date) } >
          </KeyboardDatePicker>
          <KeyboardDatePicker  disableToolbar
            variant="inline"
            inputVariant="outlined"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Fecha de expiración del seguro"
            value={assuranceExpiration}
            onChange={(date) => setAssuranceExpiration(date) } >
          </KeyboardDatePicker>
          <KeyboardDatePicker  disableToolbar
            variant="inline"
            inputVariant="outlined"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Fecha de expiración de la patente"
            value={patentExpiration}
            onChange={(date) => setPatentExpiration(date) } >
          </KeyboardDatePicker>
          <Button
            className={styles.button}
            onClick={() => saveTruck() }>Guardar</Button>
        </form>
    </Modal>
  )
};



const mapStateToProps = (state) => ({ selectedAffiliate: state.selectedAffiliate });

const mapDispatchToProps = { saveTruckAction: saveTruckInit };

export default connect(mapStateToProps, mapDispatchToProps)(AddTruckModal);