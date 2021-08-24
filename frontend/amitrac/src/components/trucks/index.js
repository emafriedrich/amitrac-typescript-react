import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button, Switch } from '@material-ui/core'
import { connect } from 'react-redux';
import AddTruckModal from './addTruckModal';
import { saveTruckBaseData, setActiveTruck } from '../../redux/affiliates/actions';

function Trucks({ selectedAffiliate, setActive, saveTruck }) {

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
      width: 200,
      editable: true,
    },
    {
      field: 'patentExpiration',
      headerName: 'Expiración patente',
      type: 'date',
      width: 200,
      editable: true,
    },
    {
      field: 'active',
      headerName: 'Activo',
      type: 'boolean',
      renderCell: (params) => {
        return (
          <Switch onChange={(event) => {
            setActive({ truckId: params.id, active: event.target.checked });
          }} checked={params.value} />
        );
      },
      width: 200
    },
  ];

  const rows = selectedAffiliate?.trucks || [];

  const [open, setOpen] = React.useState(false);

  const addTruck = () => {
    setOpen(true);
  }

  return (
    <div style={{ height: 400, width: '100%', marginTop: '90px' }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <h3>Camiones</h3>
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
        isCellEditable={false}
        onCellEditCommit={(params, event) => {
          if (params.field === 'vtvExpiration') {
            saveTruck({
              id: params.id,
              vtvExpiration: params.value,
            });
          }
          if (params.field === 'patentExpiration') {
            saveTruck({
              id: params.id,
              patentExpiration: params.value,
            });
          }
          if (params.field === 'assuranceExpiration') {
            saveTruck({
              id: params.id,
              assuranceExpiration: params.value,
            });
          }
          if (params.field === 'brand') {
            saveTruck({
              id: params.id,
              brand: params.value,
            });
          }
          if (params.field === 'patent') {
            saveTruck({
              id: params.id,
              patent: params.value,
            });
          }
        }}
      />
      <Button onClick={addTruck} >Agregar camion</Button>
      <AddTruckModal
        open={open}
        setOpen={setOpen}
      ></AddTruckModal>
    </div>
  );
}

const mapStateToProps = (state) => ({ selectedAffiliate: state.selectedAffiliate });

const mapDispatchToProps = { setActive: setActiveTruck, saveTruck: saveTruckBaseData };

export default connect(mapStateToProps, mapDispatchToProps)(Trucks);