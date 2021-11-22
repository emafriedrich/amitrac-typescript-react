import { Button, makeStyles, Modal, TextField } from '@material-ui/core';
import { useState } from 'react';
import { connect } from 'react-redux';
import { saveTruckDriverInit } from '../../redux/affiliates/actions';

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

function AddTruckDriverModal ({ open, setOpen, selectedAffiliate, saveTruckDriverAction }) {
  const styles = useStyles();
  const [initialPassword, setInitialPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  const saveTruckDriver = () => {
    if (initialPassword && name && username) {
      saveTruckDriverAction({
        affiliateId: selectedAffiliate.id,
        initialPassword,
        name,
        username
      });
    } else {
      alert('Faltan datos, todos son necesarios');
    }
  };

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
          <h3>Nuevo camionero</h3>
          <TextField
            className={styles.marginTextField}
            variant="outlined"
            label="Nombre"
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></TextField>
          <TextField
            className={styles.marginTextField}
            variant="outlined"
            label="Nombre de usuario"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          >
          </TextField>
          <TextField
            variant="outlined"
            label="Contraseña inicial"
            value={initialPassword}
            onChange={(event) => setInitialPassword(event.target.value)}>
          </TextField>
          <Button className={styles.button} onClick={() => saveTruckDriver()}>Guardar</Button>
        </form>
    </Modal>
  )
};

const mapStateToProps = (state) => ({ selectedAffiliate: state.affiliates.selectedAffiliate });

const mapDispatchToProps = { saveTruckDriverAction: saveTruckDriverInit };

export default connect(mapStateToProps, mapDispatchToProps)(AddTruckDriverModal);