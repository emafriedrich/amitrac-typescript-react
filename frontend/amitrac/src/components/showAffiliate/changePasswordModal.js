import { Button, makeStyles, Modal, TextField } from '@material-ui/core';
import { useState } from 'react';
import { connect } from 'react-redux';
import { changePasswordAction } from '../../redux/affiliates/actions';

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

function ChangePasswordModal ({ open, setOpen, username, selectedAffiliate, dispatchChangePassword }) {
  const styles = useStyles();
  const [password, setPassword] = useState('');

  const changePassword = () => {
    if (password) {
      dispatchChangePassword({
        affiliateId: selectedAffiliate.id,
        password,
      });
    } else {
      alert('Falta escribir una contraseña');
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={styles.modal}
      title="Cambiar password"
      >
        <form className={styles.paper} noValidate autoComplete="off">
          <h3>Cambiar password</h3>
          <TextField
            className={styles.marginTextField}
            variant="outlined"
            label="Nombre de usuario"
            value={username}
            disabled
          >
          </TextField>
          <TextField
            variant="outlined"
            label="Nueva contraseña"
            value={password}
            onChange={(event) => setPassword(event.target.value)}>
          </TextField>
          <Button className={styles.button} onClick={() => changePassword()}>Guardar</Button>
        </form>
    </Modal>
  )
};

const mapStateToProps = (state) => ({ selectedAffiliate: state.affiliates.selectedAffiliate });

const mapDispatchToProps = { dispatchChangePassword: changePasswordAction };

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordModal);