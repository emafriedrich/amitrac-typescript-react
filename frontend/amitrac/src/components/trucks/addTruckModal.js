import { Button, makeStyles, Modal, TextField } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { useState } from 'react';
import { connect } from 'react-redux';
import { saveTruckInit } from '../../redux/affiliates/actions';
import { DropzoneArea } from 'material-ui-dropzone'
import { api } from '../../api/constants';

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

function AddTruckModal ({ open, setOpen, selectedAffiliate, saveTruckAction, truck }) {
  const styles = useStyles();
  const [patent, setPatent] = useState(truck?.patent || '');
  const [brand, setBrand] = useState('');
  const [vtvExpiration, setVtvExpiration] = useState(new Date());
  const [assuranceExpiration, setAssuranceExpiration] = useState(new Date());
  const [patentExpiration, setPatentExpiration] = useState(new Date());
  const [truckImage, setTruckImage] = useState('');
  const [link, setLink] = useState('');

  const saveImage = async () => {
    const formData = new FormData();
    formData.append('image', truckImage);
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  const saveTruck = async () => {
    if (!patent || !brand || !vtvExpiration || !assuranceExpiration || !patentExpiration) {
      alert('A excepcion de la foto del camión, los demás campos son obligatorios');
    } else {
      const files = await saveImage();
      saveTruckAction({
        affiliateId: selectedAffiliate.id,
        patent,
        brand,
        vtvExpiration,
        assuranceExpiration,
        patentExpiration,
        truckImage: files[0],
        link,
      });
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
          <TextField
            className={styles.marginTextField}
            variant="outlined"
            label="Link"
            value={link}
            onChange={(event) => setLink(event.target.value)}>
          </TextField>
          <label>Foto del camion</label>
          <DropzoneArea
            onChange={(files) => setTruckImage(files[0])}
            filesLimit={1}
          />
          <Button
            className={styles.button}
            onClick={() => saveTruck() }>Guardar</Button>
        </form>
    </Modal>
  )
};



const mapStateToProps = (state) => ({ selectedAffiliate: state.affiliates.selectedAffiliate });

const mapDispatchToProps = { saveTruckAction: saveTruckInit };

export default connect(mapStateToProps, mapDispatchToProps)(AddTruckModal);