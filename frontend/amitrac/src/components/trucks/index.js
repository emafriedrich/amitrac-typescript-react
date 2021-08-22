import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button, Switch } from '@material-ui/core'
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddTruckModal from './addTruckModal';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'patent',
    headerName: 'Patente',
    width: 150,
    editable: true,
  },
  {
    field: 'brand',
    headerName: 'Marca',
    width: 150,
    editable: true,
  },
  {
    field: 'vtvExpiration',
    headerName: 'Expiración VTV',
    type: 'date',
    width: 200,
    editable: true,
  },
  {
    field: 'assuranceExpiration',
    headerName: 'Expiración Seguro',
    type: 'date',
    width: 200
  },
  {
    field: 'patentExpiration',
    headerName: 'Expiración patente',
    type: 'date',
    width: 200,
  },
  {
    field: 'active',
    headerName: 'Activo',
    type: 'date',
    width: 200
  },
];

function Trucks({ selectedAffiliate }) {
  const rows = selectedAffiliate?.trucks || [];

  const [open, setOpen] = React.useState(false);

  const addTruck = () => {
    setOpen(true);
  }

  return (
    <div style={{ height: 400, width: '100%', marginTop: '90px' }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <h3>Camiones</h3>
        <FormControlLabel
          control={
            <Switch
              name="checkedB"
              color="primary"
            />
          }
          label="Mostrar inactivos"
        />
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(nose) => console.log(nose)}
        onCellEditCommit={(params, event) => {
          console.log(params);
        }}
      />
      <Button onClick={addTruck} >Agregar camion</Button>
      <Button onClick={addTruck}>Desactivar camiones seleccionados</Button>
      <AddTruckModal
        open={open}
        setOpen={setOpen}
      ></AddTruckModal>
    </div>
  );
}

const mapStateToProps = (state) => ({ selectedAffiliate: state.selectedAffiliate });

export default connect(mapStateToProps)(Trucks);